"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// 1. Admin Dashboard High-Level Metrics Overview
router.get('/metrics', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (_req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        // Today's sessions
        const todaysSessions = await prisma_js_1.default.booking.findMany({
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
        const upcomingCount = await prisma_js_1.default.booking.count({
            where: {
                scheduledAt: { gte: tomorrow, lte: next7Days },
                status: { in: ['SCHEDULED', 'CONFIRMED'] },
            },
        });
        // Pending Plan B advisory requests
        const pendingRequestsCount = await prisma_js_1.default.advisoryRequest.count({
            where: { status: { in: ['NEW', 'REVIEWED'] } },
        });
        // Client category distribution
        const clientsByCategory = await prisma_js_1.default.user.groupBy({
            by: ['clientCategory'],
            where: { role: 'CLIENT' },
            _count: { id: true },
        });
        // Financial totals
        const payments = await prisma_js_1.default.payment.findMany({
            where: { status: 'COMPLETED' },
            select: { amount: true },
        });
        const totalRevenueInr = payments.reduce((sum, p) => sum + p.amount, 0);
        // Recordings & consent count
        const totalRecordings = await prisma_js_1.default.sessionRecording.count();
        const activeConsents = await prisma_js_1.default.liveSessionRoom.count({
            where: { recordingConsentGiven: true },
        });
        // Recent audit logs
        const recentAuditLogs = await prisma_js_1.default.auditLog.findMany({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 2. Client Management: List and search clients
router.get('/clients', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const { search, category } = req.query;
        const clients = await prisma_js_1.default.user.findMany({
            where: {
                role: 'CLIENT',
                ...(category ? { clientCategory: category } : {}),
                ...(search
                    ? {
                        OR: [
                            { name: { contains: search } },
                            { email: { contains: search } },
                            { phone: { contains: search } },
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 3. Payments overview & refunds
router.get('/payments', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (_req, res) => {
    try {
        const payments = await prisma_js_1.default.payment.findMany({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 4. Process Refund (Admin only)
router.post('/payments/:id/refund', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const payment = await prisma_js_1.default.payment.findUnique({ where: { id } });
        if (!payment) {
            res.status(404).json({ success: false, message: 'Payment record not found.' });
            return;
        }
        const updated = await prisma_js_1.default.payment.update({
            where: { id },
            data: { status: 'REFUNDED' },
        });
        await prisma_js_1.default.auditLog.create({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.default = router;
