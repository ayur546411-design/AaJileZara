"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// 1. Admin Only: Get infrastructure cost breakdown and budget alerts
router.get('/', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (_req, res) => {
    try {
        const costEntries = await prisma_js_1.default.costEntry.findMany({
            orderBy: { estimatedMonthlyInr: 'desc' },
        });
        const totalEstimatedMonthly = costEntries.reduce((sum, item) => sum + item.estimatedMonthlyInr, 0);
        const totalActualBilled = costEntries.reduce((sum, item) => sum + (item.actualBilledInr || item.estimatedMonthlyInr), 0);
        const totalBudgetLimit = costEntries.reduce((sum, item) => sum + item.budgetLimitInr, 0);
        const projectedAnnualOperatingCost = totalEstimatedMonthly * 12;
        // Identify categories with alert (> 80% of budget limit)
        const alerts = [];
        costEntries.forEach((entry) => {
            const current = entry.actualBilledInr || entry.estimatedMonthlyInr;
            const pct = Math.round((current / entry.budgetLimitInr) * 100);
            if (pct >= 80) {
                alerts.push({
                    category: entry.category,
                    serviceName: entry.serviceName,
                    pct,
                    message: `${entry.serviceName} has reached ${pct}% of its ₹${entry.budgetLimitInr} budget threshold.`,
                });
            }
        });
        res.json({
            success: true,
            summary: {
                totalEstimatedMonthly: Math.round(totalEstimatedMonthly),
                totalActualBilled: Math.round(totalActualBilled),
                totalBudgetLimit: Math.round(totalBudgetLimit),
                projectedAnnualOperatingCost: Math.round(projectedAnnualOperatingCost),
                domain3YearCapitalExpense: 3204, // Verified ₹3,204 for 3 years
                alerts,
            },
            entries: costEntries,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 2. Admin Only: Update or add a cost worksheet entry
router.post('/entry', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADMIN']), async (req, res) => {
    try {
        const { id, category, serviceName, estimatedMonthlyInr, actualBilledInr, usageQuantity, monthYear, notes, budgetLimitInr, isActualInvoice, } = req.body;
        let entry;
        if (id) {
            entry = await prisma_js_1.default.costEntry.update({
                where: { id },
                data: {
                    category,
                    serviceName,
                    estimatedMonthlyInr: Number(estimatedMonthlyInr),
                    actualBilledInr: actualBilledInr !== undefined ? Number(actualBilledInr) : null,
                    usageQuantity,
                    monthYear,
                    notes,
                    budgetLimitInr: Number(budgetLimitInr) || 5000,
                    isActualInvoice: Boolean(isActualInvoice),
                },
            });
        }
        else {
            entry = await prisma_js_1.default.costEntry.create({
                data: {
                    category,
                    serviceName,
                    estimatedMonthlyInr: Number(estimatedMonthlyInr),
                    actualBilledInr: actualBilledInr !== undefined ? Number(actualBilledInr) : null,
                    usageQuantity,
                    monthYear: monthYear || '2026-10',
                    notes,
                    budgetLimitInr: Number(budgetLimitInr) || 5000,
                    isActualInvoice: Boolean(isActualInvoice),
                },
            });
        }
        await prisma_js_1.default.auditLog.create({
            data: {
                actorId: req.user?.id,
                actorRole: req.user?.role,
                action: 'COST_WORKSHEET_UPDATED',
                entityType: 'INFRASTRUCTURE_COST',
                entityId: entry.id,
                details: JSON.stringify({ serviceName, estimatedMonthlyInr, actualBilledInr }),
            },
        });
        res.json({ success: true, entry });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.default = router;
