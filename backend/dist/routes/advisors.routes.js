"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Public: List active advisors with credentials and languages
router.get('/', async (_req, res) => {
    try {
        const advisors = await prisma_js_1.default.advisor.findMany({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Admin: List all advisors with workload metrics
router.get('/workload', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (_req, res) => {
    try {
        const advisors = await prisma_js_1.default.advisor.findMany({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Admin: Add or update advisor
router.post('/', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const { name, email, phone, title, bio, specializations, languages, maxWeeklyHours } = req.body;
        // Check if user exists or create user
        let user = await prisma_js_1.default.user.findUnique({ where: { email } });
        if (!user) {
            user = await prisma_js_1.default.user.create({
                data: {
                    name,
                    email,
                    phone,
                    role: 'ADVISOR',
                    clientCategory: 'OTHER',
                },
            });
        }
        else {
            await prisma_js_1.default.user.update({
                where: { id: user.id },
                data: { role: 'ADVISOR', name, phone },
            });
        }
        const advisor = await prisma_js_1.default.advisor.upsert({
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
        await prisma_js_1.default.auditLog.create({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Admin: Toggle active status
router.patch('/:id/toggle-active', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const { id } = req.params;
        const advisor = await prisma_js_1.default.advisor.findUnique({ where: { id } });
        if (!advisor) {
            res.status(404).json({ success: false, message: 'Advisor not found' });
            return;
        }
        const updated = await prisma_js_1.default.advisor.update({
            where: { id },
            data: { active: !advisor.active },
        });
        res.json({ success: true, advisor: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.default = router;
