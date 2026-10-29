import { Router, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// Public: List active packages
router.get('/', async (_req, res: Response) => {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true, isApproved: true },
      orderBy: { basePrice: 'asc' },
    });

    res.json({
      success: true,
      packages,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: List all packages (including unapproved/draft)
router.get('/all', requireAuth, requireRole(['ADMIN']), async (_req, res: Response) => {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      packages,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Create package
router.post('/', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      name,
      slug,
      planType,
      description,
      basePrice,
      studentPrice,
      homemakerPrice,
      professionalPrice,
      durationMinutes,
      sessionsCount,
      validityDays,
      isActive,
      isApproved,
    } = req.body;

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const pkg = await prisma.package.create({
      data: {
        name,
        slug: finalSlug,
        planType: planType || 'DIRECT_GUIDANCE',
        description,
        basePrice: Number(basePrice) || 1500,
        studentPrice: Number(studentPrice) || 500,
        homemakerPrice: Number(homemakerPrice) || 1000,
        professionalPrice: Number(professionalPrice) || 2000,
        durationMinutes: Number(durationMinutes) || 60,
        sessionsCount: Number(sessionsCount) || 1,
        validityDays: Number(validityDays) || 30,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        isApproved: isApproved !== undefined ? Boolean(isApproved) : true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: req.user?.id,
        actorRole: req.user?.role,
        action: 'PACKAGE_CREATED',
        entityType: 'PACKAGE',
        entityId: pkg.id,
        details: JSON.stringify({ name, planType, studentPrice, homemakerPrice }),
      },
    });

    res.status(201).json({ success: true, package: pkg });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Update package & category-based pricing
router.put('/:id', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.package.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.slug && { slug: data.slug }),
        ...(data.planType && { planType: data.planType }),
        ...(data.description && { description: data.description }),
        ...(data.basePrice !== undefined && { basePrice: Number(data.basePrice) }),
        ...(data.studentPrice !== undefined && { studentPrice: Number(data.studentPrice) }),
        ...(data.homemakerPrice !== undefined && { homemakerPrice: Number(data.homemakerPrice) }),
        ...(data.professionalPrice !== undefined && { professionalPrice: Number(data.professionalPrice) }),
        ...(data.durationMinutes !== undefined && { durationMinutes: Number(data.durationMinutes) }),
        ...(data.sessionsCount !== undefined && { sessionsCount: Number(data.sessionsCount) }),
        ...(data.validityDays !== undefined && { validityDays: Number(data.validityDays) }),
        ...(data.isActive !== undefined && { isActive: Boolean(data.isActive) }),
        ...(data.isApproved !== undefined && { isApproved: Boolean(data.isApproved) }),
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: req.user?.id,
        actorRole: req.user?.role,
        action: 'PACKAGE_UPDATED',
        entityType: 'PACKAGE',
        entityId: id,
        details: JSON.stringify(data),
      },
    });

    res.json({ success: true, package: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Delete package
router.delete('/:id', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.package.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        actorId: req.user?.id,
        actorRole: req.user?.role,
        action: 'PACKAGE_DELETED',
        entityType: 'PACKAGE',
        entityId: id,
      },
    });

    res.json({ success: true, message: 'Package deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
