import { Router, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// 1. Admin Dashboard High-Level Metrics Overview
router.get('/metrics', requireAuth, requireRole(['ADMIN']), async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Today's sessions
    const todaysSessions = await prisma.booking.findMany({
      where: {
        scheduledAt: { gte: today, lt: tomorrow },
        status: { in: ['SCHEDULED', 'CONFIRMED'] },
      },
      include: {
        client: { select: { name: true, clientCategory: true } },
        advisor: { include: { user: { select: { name: true } } } },
        category: { select: { name: true } },
      },
    });

    // Upcoming sessions (next 7 days)
    const next7Days = new Date(today);
    next7Days.setDate(next7Days.getDate() + 7);
    const upcomingCount = await prisma.booking.count({
      where: {
        scheduledAt: { gte: tomorrow, lte: next7Days },
        status: { in: ['SCHEDULED', 'CONFIRMED'] },
      },
    });

    // Pending Plan B advisory requests
    const pendingRequestsCount = await prisma.advisoryRequest.count({
      where: { status: { in: ['NEW', 'REVIEWED'] } },
    });

    // Client category distribution
    const clientsByCategory = await prisma.user.groupBy({
      by: ['clientCategory'],
      where: { role: 'CLIENT' },
      _count: { id: true },
    });

    // Financial totals
    const payments = await prisma.payment.findMany({
      where: { status: 'COMPLETED' },
      select: { amount: true },
    });
    const totalRevenueInr = payments.reduce((sum, p) => sum + p.amount, 0);

    // Recordings & consent count
    const totalRecordings = await prisma.sessionRecording.count();
    const activeConsents = await prisma.liveSessionRoom.count({
      where: { recordingConsentGiven: true },
    });

    // Recent audit logs
    const recentAuditLogs = await prisma.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      metrics: {
        todaysSessionsCount: todaysSessions.length,
        todaysSessions,
        upcomingCount,
        pendingRequestsCount,
        clientsByCategory: clientsByCategory.map((c) => ({
          category: c.clientCategory,
          count: c._count.id,
        })),
        totalRevenueInr,
        totalRecordings,
        activeConsents,
        recentAuditLogs,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Client Management: List and search clients
router.get('/clients', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { search, category } = req.query;

    const clients = await prisma.user.findMany({
      where: {
        role: 'CLIENT',
        ...(category ? { clientCategory: category as string } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search as string } },
                { email: { contains: search as string } },
                { phone: { contains: search as string } },
              ],
            }
          : {}),
      },
      include: {
        clientBookings: {
          include: {
            category: true,
            package: true,
            advisor: { include: { user: { select: { name: true } } } },
          },
          orderBy: { scheduledAt: 'desc' },
        },
        advisoryRequests: {
          include: { category: true },
          orderBy: { createdAt: 'desc' },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, clients });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Payments overview & refunds
router.get('/payments', requireAuth, requireRole(['ADMIN']), async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        client: { select: { name: true, email: true, clientCategory: true } },
        booking: {
          select: {
            bookingRef: true,
            sessionType: true,
            scheduledAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, payments });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Process Refund (Admin only)
router.post('/payments/:id/refund', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      res.status(404).json({ success: false, message: 'Payment record not found.' });
      return;
    }

    const updated = await prisma.payment.update({
      where: { id },
      data: { status: 'REFUNDED' },
    });

    await prisma.auditLog.create({
      data: {
        actorId: req.user?.id,
        actorRole: req.user?.role,
        action: 'PAYMENT_REFUNDED',
        entityType: 'PAYMENT',
        entityId: id,
        details: JSON.stringify({ amount: payment.amount, reason: reason || 'Client requested refund under policy' }),
      },
    });

    res.json({ success: true, message: 'Refund processed successfully.', payment: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
