"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Public: List all active categories in order
router.get('/', async (_req, res) => {
    try {
        const categories = await prisma_js_1.default.serviceCategory.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        res.json({
            success: true,
            categories,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Admin: List all categories (including inactive/hidden)
router.get('/all', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (_req, res) => {
    try {
        const categories = await prisma_js_1.default.serviceCategory.findMany({
            orderBy: { sortOrder: 'asc' },
        });
        res.json({
            success: true,
            categories,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Admin: Create new category
router.post('/', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const { name, slug, description, sortOrder, isActive, icon } = req.body;
        if (!name || !description) {
            res.status(400).json({ success: false, message: 'Name and description are required.' });
            return;
        }
        const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const category = await prisma_js_1.default.serviceCategory.create({
            data: {
                name,
                slug: finalSlug,
                description,
                sortOrder: sortOrder || 0,
                isActive: isActive !== undefined ? Boolean(isActive) : true,
                icon: icon || 'Compass',
            },
        });
        await prisma_js_1.default.auditLog.create({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Admin: Update category (edit, hide/show, reorder)
router.put('/:id', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, description, sortOrder, isActive, icon } = req.body;
        const updated = await prisma_js_1.default.serviceCategory.update({
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
        await prisma_js_1.default.auditLog.create({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Admin: Delete category
router.delete('/:id', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_js_1.default.serviceCategory.delete({
            where: { id },
        });
        await prisma_js_1.default.auditLog.create({
            data: {
                actorId: req.user?.id,
                actorRole: req.user?.role,
                action: 'CATEGORY_DELETED',
                entityType: 'SERVICE_CATEGORY',
                entityId: id,
            },
        });
        res.json({ success: true, message: 'Category removed successfully.' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.default = router;
