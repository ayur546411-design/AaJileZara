import { Router, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// Public: List active advisors with credentials and languages
router.get('/', async (_req, res: Response) => {
  try {
    const advisors = await prisma.advisor.findMany({
      where: { active: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });

    const formatted = advisors.map((a) => ({
      id: a.id,
      userId: a.userId,
      name: a.user.name,
      avatarUrl: a.user.avatarUrl,
      title: a.title,
      bio: a.bio,
      specializations: JSON.parse(a.specializations || '[]'),
      languages: JSON.parse(a.languages || '[]'),
      active: a.active,
    }));

    res.json({
      success: true,
      advisors: formatted,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: List all advisors with workload metrics
router.get('/workload', requireAuth, requireRole(['ADMIN']), async (_req, res: Response) => {
  try {
    const advisors = await prisma.advisor.findMany({
      include: {
        user: true,
        assignedBookings: {
          where: {
            status: { in: ['SCHEDULED', 'CONFIRMED'] },
          },
        },
        assignedRequests: {
          where: {
            status: { in: ['NEW', 'REVIEWED', 'ASSIGNED', 'INTRO_SCHEDULED'] },
          },
        },
      },
    });

    const workload = advisors.map((a) => ({
      id: a.id,
      name: a.user.name,
      email: a.user.email,
      title: a.title,
      active: a.active,
      maxWeeklyHours: a.maxWeeklyHours,
      activeBookingsCount: a.assignedBookings.length,
      pendingRequestsCount: a.assignedRequests.length,
      specializations: JSON.parse(a.specializations || '[]'),
      languages: JSON.parse(a.languages || '[]'),
    }));

    res.json({
      success: true,
      workload,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Add or update advisor
router.post('/', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, email, phone, title, bio, specializations, languages, maxWeeklyHours } = req.body;

    // Check if user exists or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          role: 'ADVISOR',
          clientCategory: 'OTHER',
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'ADVISOR', name, phone },
      });
    }

    const advisor = await prisma.advisor.upsert({
      where: { userId: user.id },
      update: {
        title,
        bio,
        specializations: JSON.stringify(specializations || []),
        languages: JSON.stringify(languages || []),
        maxWeeklyHours: Number(maxWeeklyHours) || 20,
        active: true,
      },
      create: {
        userId: user.id,
        title,
        bio,
        specializations: JSON.stringify(specializations || []),
        languages: JSON.stringify(languages || []),
        maxWeeklyHours: Number(maxWeeklyHours) || 20,
        active: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: req.user?.id,
        actorRole: req.user?.role,
        action: 'ADVISOR_CONFIGURED',
        entityType: 'ADVISOR',
        entityId: advisor.id,
        details: JSON.stringify({ name, email, title }),
      },
    });

    res.status(201).json({ success: true, advisor });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Toggle active status
router.patch('/:id/toggle-active', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const advisor = await prisma.advisor.findUnique({ where: { id } });
    if (!advisor) {
      res.status(404).json({ success: false, message: 'Advisor not found' });
      return;
    }

    const updated = await prisma.advisor.update({
      where: { id },
      data: { active: !advisor.active },
    });

    res.json({ success: true, advisor: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
