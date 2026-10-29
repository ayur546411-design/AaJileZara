import { Router, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// Current User Details
router.get('/me', async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.json({
      success: true,
      authenticated: false,
      user: null,
    });
    return;
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      advisorProfile: true,
    },
  });

  res.json({
    success: true,
    authenticated: true,
    user: dbUser,
  });
});

// Demo accounts for quick testing and pairing
router.get('/demo-accounts', async (_req, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      clientCategory: true,
      isVerifiedStudent: true,
      avatarUrl: true,
      advisorProfile: {
        select: {
          title: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  res.json({
    success: true,
    accounts: users,
  });
});

// Sync Clerk user with PostgreSQL / local database
router.post('/sync', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { clerkId, email, name, phone, clientCategory } = req.body;

    if (!email || !name) {
      res.status(400).json({ success: false, message: 'Email and name are required' });
      return;
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        clerkId: clerkId || undefined,
        name,
        phone: phone || undefined,
        clientCategory: clientCategory || undefined,
      },
      create: {
        clerkId,
        email,
        name,
        phone,
        clientCategory: clientCategory || 'OTHER',
        role: email.includes('admin') ? 'ADMIN' : 'CLIENT',
      },
    });

    res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify Student Status (Admin only)
router.patch(
  '/verify-student/:userId',
  requireAuth,
  requireRole(['ADMIN']),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { userId } = req.params;
      const { isVerified } = req.body;

      const updated = await prisma.user.update({
        where: { id: userId },
        data: { isVerifiedStudent: Boolean(isVerified) },
      });

      // Audit log
      await prisma.auditLog.create({
        data: {
          actorId: req.user?.id,
          actorRole: req.user?.role,
          action: 'STUDENT_VERIFICATION_UPDATED',
          entityType: 'USER',
          entityId: userId,
          details: JSON.stringify({ isVerified }),
        },
      });

      res.json({
        success: true,
        user: updated,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
