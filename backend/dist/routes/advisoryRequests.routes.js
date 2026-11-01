"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// 1. Submit a Plan B Guidance Request (Public or Client)
router.post('/submit', async (req, res) => {
    try {
        const { clientName, clientEmail, clientPhone, clientCategory, categoryId, concernSummary, preferredLanguage, preferredContact, } = req.body;
        if (!clientEmail || !clientName || !concernSummary) {
            res.status(400).json({ success: false, message: 'Name, email and concern summary are required.' });
            return;
        }
        // Word count server validation
        const words = concernSummary.trim().split(/\s+/).filter(Boolean);
        if (words.length > 250) {
            res.status(400).json({
                success: false,
                message: `Word limit exceeded: Maximum 250 words allowed (current: ${words.length} words).`,
            });
            return;
        }
        // Find or create user
        let client = await prisma_js_1.default.user.findUnique({ where: { email: clientEmail } });
        if (!client) {
            client = await prisma_js_1.default.user.create({
                data: {
                    email: clientEmail,
                    name: clientName,
                    phone: clientPhone,
                    role: 'CLIENT',
                    clientCategory: clientCategory || 'OTHER',
                },
            });
        }
        const randomSuffix = Math.floor(100 + Math.random() * 900);
        const requestRef = `REQ-ADV-2026-${randomSuffix}`;
        const request = await prisma_js_1.default.advisoryRequest.create({
            data: {
                requestRef,
                clientId: client.id,
                categoryId: categoryId || undefined,
                concernSummary,
                preferredLanguage: preferredLanguage || 'Hindi',
                preferredContact: preferredContact || 'Phone',
                status: 'NEW',
            },
            include: {
                category: true,
            },
        });
        // Audit log
        await prisma_js_1.default.auditLog.create({
            data: {
                actorId: client.id,
                actorRole: 'CLIENT',
                action: 'ADVISORY_REQUEST_SUBMITTED',
                entityType: 'ADVISORY_REQUEST',
                entityId: request.id,
                details: JSON.stringify({ requestRef, categoryId }),
            },
        });
        res.status(201).json({
            success: true,
            message: 'Your guidance request has been received. Our senior advisory intake team will review it within 24 hours.',
            request,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 2. Client Portal: View my requests
router.get('/my-requests', auth_js_1.requireAuth, async (req, res) => {
    try {
        const requests = await prisma_js_1.default.advisoryRequest.findMany({
            where: { clientId: req.user?.id },
            include: {
                category: true,
                assignedAdvisor: {
                    include: {
                        user: { select: { name: true, avatarUrl: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        // Strip internal notes from client response
        const sanitized = requests.map((r) => ({
            id: r.id,
            requestRef: r.requestRef,
            category: r.category,
            assignedAdvisor: r.assignedAdvisor,
            status: r.status,
            clientRecommendations: r.clientRecommendations,
            preferredLanguage: r.preferredLanguage,
            preferredContact: r.preferredContact,
            createdAt: r.createdAt,
        }));
        res.json({ success: true, requests: sanitized });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 3. Admin / Advisor: View all requests
router.get('/all', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADVISOR', 'ADMIN']), async (req, res) => {
    try {
        const isAdvisor = req.user?.role === 'ADVISOR';
        let filter = {};
        if (isAdvisor) {
            const adv = await prisma_js_1.default.advisor.findUnique({ where: { userId: req.user?.id } });
            if (adv)
                filter = { assignedAdvisorId: adv.id };
        }
        const requests = await prisma_js_1.default.advisoryRequest.findMany({
            where: filter,
            include: {
                client: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        clientCategory: true,
                    },
                },
                category: true,
                assignedAdvisor: {
                    include: {
                        user: { select: { name: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json({ success: true, requests });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 4. Admin / Advisor: Update status, assign advisor, add internal notes vs client recommendations
router.patch('/:id/review', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADVISOR', 'ADMIN']), async (req, res) => {
    try {
        const { id } = req.params;
        const { assignedAdvisorId, status, internalNotes, clientRecommendations } = req.body;
        const existing = await prisma_js_1.default.advisoryRequest.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ success: false, message: 'Request not found' });
            return;
        }
        const updated = await prisma_js_1.default.advisoryRequest.update({
            where: { id },
            data: {
                ...(assignedAdvisorId && { assignedAdvisorId }),
                ...(status && { status }),
                ...(internalNotes !== undefined && { internalNotes }),
                ...(clientRecommendations !== undefined && { clientRecommendations }),
            },
            include: {
                client: true,
                assignedAdvisor: { include: { user: true } },
            },
        });
        await prisma_js_1.default.auditLog.create({
            data: {
                actorId: req.user?.id,
                actorRole: req.user?.role,
                action: 'ADVISORY_REQUEST_UPDATED',
                entityType: 'ADVISORY_REQUEST',
                entityId: id,
                details: JSON.stringify({ status, assignedAdvisorId }),
            },
        });
        res.json({ success: true, request: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.default = router;
