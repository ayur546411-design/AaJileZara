import { Router, Response } from 'express';
import prisma from '../lib/prisma.js';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// Public: List all active categories in order
router.get('/', async (_req, res: Response) => {
  try {
    const categories = await prisma.serviceCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    res.json({
      success: true,
      categories,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: List all categories (including inactive/hidden)
router.get('/all', requireAuth, requireRole(['ADMIN']), async (_req, res: Response) => {
  try {
    const categories = await prisma.serviceCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    res.json({
      success: true,
      categories,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Create new category
router.post('/', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, slug, description, sortOrder, isActive, icon } = req.body;

    if (!name || !description) {
      res.status(400).json({ success: false, message: 'Name and description are required.' });
      return;
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const category = await prisma.serviceCategory.create({
      data: {
        name,
        slug: finalSlug,
        description,
        sortOrder: sortOrder || 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        icon: icon || 'Compass',
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: req.user?.id,
        actorRole: req.user?.role,
        action: 'CATEGORY_CREATED',
        entityType: 'SERVICE_CATEGORY',
        entityId: category.id,
        details: JSON.stringify({ name, slug: finalSlug }),
      },
    });

    res.status(201).json({ success: true, category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Update category (edit, hide/show, reorder)
router.put('/:id', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, sortOrder, isActive, icon } = req.body;

    const updated = await prisma.serviceCategory.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description && { description }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
        ...(icon && { icon }),
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: req.user?.id,
        actorRole: req.user?.role,
        action: 'CATEGORY_UPDATED',
        entityType: 'SERVICE_CATEGORY',
        entityId: id,
        details: JSON.stringify(req.body),
      },
    });

    res.json({ success: true, category: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Delete category
router.delete('/:id', requireAuth, requireRole(['ADMIN']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.serviceCategory.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        actorId: req.user?.id,
        actorRole: req.user?.role,
        action: 'CATEGORY_DELETED',
        entityType: 'SERVICE_CATEGORY',
        entityId: id,
      },
    });

    res.json({ success: true, message: 'Category removed successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
