"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Current User Details
router.get('/me', async (req, res) => {
    if (!req.user) {
        res.json({
            success: true,
            authenticated: false,
            user: null,
        });
        return;
    }
    const dbUser = await prisma_js_1.default.user.findUnique({
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
router.get('/demo-accounts', async (_req, res) => {
    const users = await prisma_js_1.default.user.findMany({
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
router.post('/sync', async (req, res) => {
    try {
        const { clerkId, email, name, phone, clientCategory } = req.body;
        if (!email || !name) {
            res.status(400).json({ success: false, message: 'Email and name are required' });
            return;
        }
        const user = await prisma_js_1.default.user.upsert({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Verify Student Status (Admin only)
router.patch('/verify-student/:userId', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const { userId } = req.params;
        const { isVerified } = req.body;
        const updated = await prisma_js_1.default.user.update({
            where: { id: userId },
            data: { isVerifiedStudent: Boolean(isVerified) },
        });
        // Audit log
        await prisma_js_1.default.auditLog.create({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.default = router;
