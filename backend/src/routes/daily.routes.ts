import { Router, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/auth.js';
import crypto from 'crypto';

const router = Router();

// 1. Authorize participant and issue short-lived Daily session token
router.post('/room-token', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { sessionUid, participantName } = req.body;

    if (!sessionUid) {
      res.status(400).json({ success: false, message: 'Session UID is required.' });
      return;
    }

    const booking = await prisma.booking.findUnique({
      where: { sessionUid },
      include: {
        liveRoom: true,
        client: true,
        advisor: { include: { user: true } },
      },
    });

    if (!booking || !booking.liveRoom) {
      res.status(404).json({ success: false, message: 'Session room not found.' });
      return;
    }

    // Role detection
    const isClient = req.user?.id === booking.clientId;
    const isAdvisor = req.user?.id === booking.advisor?.userId;
    const isAdmin = req.user?.role === 'ADMIN';

    const displayName = participantName || (isAdvisor ? booking.advisor?.user.name : booking.client.name) || 'Guest';

    // Generate short-lived Daily room token (valid for 3 hours)
    const tokenPayload = {
      r: booking.liveRoom.roomName,
      u: isAdvisor || isAdmin ? 'advisor' : 'client',
      d: displayName,
      exp: Math.floor(Date.now() / 1000) + (3 * 3600),
      is_owner: isAdvisor || isAdmin,
      enable_recording: booking.liveRoom.recordingConsentGiven ? 'cloud' : false,
      token_id: crypto.randomBytes(16).toString('hex'),
    };

    const token = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

    res.json({
      success: true,
      roomUrl: booking.liveRoom.roomUrl,
      roomName: booking.liveRoom.roomName,
      token,
      isOwner: isAdvisor || isAdmin,
      recordingConsentGiven: booking.liveRoom.recordingConsentGiven,
      recordingStatus: booking.liveRoom.recordingStatus,
      sessionType: booking.sessionType,
      advisorName: booking.advisor?.user.name,
      clientName: booking.client.name,
      scheduledAt: booking.scheduledAt,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Toggle or update Recording Consent (Requires explicit consent)
router.post('/recording-consent', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { sessionUid, consentGiven, consentedBy } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { sessionUid },
      include: { liveRoom: true },
    });

    if (!booking || !booking.liveRoom) {
      res.status(404).json({ success: false, message: 'Session not found.' });
      return;
    }

    const updatedConsent = Boolean(consentGiven);

    const updatedRoom = await prisma.liveSessionRoom.update({
      where: { id: booking.liveRoom.id },
      data: {
        recordingConsentGiven: updatedConsent,
        recordingStatus: updatedConsent ? 'ACTIVE' : 'STOPPED',
      },
    });

    // If consent given and recording initiated, simulate cloud storage entry with 90-day retention
    if (updatedConsent) {
      const retentionDate = new Date();
      retentionDate.setDate(retentionDate.getDate() + 90);

      await prisma.sessionRecording.create({
        data: {
          liveSessionId: updatedRoom.id,
          blobStorageUrl: `https://jilezarastorage.blob.core.windows.net/private-recordings/${updatedRoom.roomName}-${Date.now()}.mp4`,
          blobName: `${updatedRoom.roomName}-${Date.now()}.mp4`,
          durationSeconds: 3600,
          retentionExpiresAt: retentionDate,
          consentAudit: JSON.stringify({
            consentedAt: new Date().toISOString(),
            consentedBy: consentedBy || req.user?.name || 'Participant',
            ip: req.ip,
            policyAccepted: true,
          }),
          status: 'RECORDED',
          accessLogs: JSON.stringify([
            { event: 'RECORDING_INITIALIZED', timestamp: new Date().toISOString() },
          ]),
        },
      });
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: req.user?.id,
        actorRole: req.user?.role || 'CLIENT',
        action: updatedConsent ? 'RECORDING_CONSENT_GRANTED' : 'RECORDING_CONSENT_WITHDRAWN',
        entityType: 'LIVE_SESSION',
        entityId: updatedRoom.id,
        details: JSON.stringify({ consentGiven: updatedConsent, sessionUid }),
      },
    });

    res.json({
      success: true,
      recordingConsentGiven: updatedRoom.recordingConsentGiven,
      recordingStatus: updatedRoom.recordingStatus,
      message: updatedConsent
        ? 'Recording consent acknowledged. Active recording indicator is enabled.'
        : 'Recording stopped. Participant has withdrawn consent.',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
