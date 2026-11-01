"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
const auth_js_1 = require("../middleware/auth.js");
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
// 1. Get available time slots for a given advisor and date
router.get('/available-slots', async (req, res) => {
    try {
        const { advisorId, date, sessionType } = req.query;
        if (!date) {
            res.status(400).json({ success: false, message: 'Date parameter is required (YYYY-MM-DD).' });
            return;
        }
        // Standard business hours: 10:00 AM to 7:00 PM IST (hourly slots)
        const slotTimes = [
            '10:00', '11:15', '12:30', '14:00', '15:15', '16:30', '17:45', '19:00'
        ];
        const targetDate = new Date(date);
        const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
        // Find already booked slots on that date
        const existingBookings = await prisma_js_1.default.booking.findMany({
            where: {
                ...(advisorId ? { advisorId: advisorId } : {}),
                scheduledAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                status: { in: ['SCHEDULED', 'CONFIRMED'] },
            },
            select: {
                scheduledAt: true,
                endAt: true,
                advisorId: true,
                sessionType: true,
            },
        });
        const slots = slotTimes.map((timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            const slotStart = new Date(date);
            slotStart.setHours(hours, minutes, 0, 0);
            const slotEnd = new Date(slotStart);
            slotEnd.setMinutes(slotEnd.getMinutes() + 60);
            // Check collision with existing bookings (considering 15-minute buffer)
            const isBooked = existingBookings.some((b) => {
                const bookingStart = new Date(b.scheduledAt).getTime();
                const bookingEndWithBuffer = new Date(b.endAt).getTime() + (15 * 60 * 1000);
                const checkStart = slotStart.getTime();
                const checkEndWithBuffer = slotEnd.getTime() + (15 * 60 * 1000);
                return (checkStart < bookingEndWithBuffer && checkEndWithBuffer > bookingStart);
            });
            return {
                time: timeStr,
                scheduledAt: slotStart.toISOString(),
                endAt: slotEnd.toISOString(),
                isAvailable: !isBooked,
                sessionType: sessionType || 'LIVE_VIDEO',
            };
        });
        res.json({
            success: true,
            date,
            slots,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 2. Create a new booking with double-booking prevention & Live Session ID Card generation
router.post('/book', async (req, res) => {
    try {
        const { clientName, clientEmail, clientPhone, clientCategory, advisorId, packageId, categoryId, sessionType, scheduledAt, intakeAnswers, timezone, notes, } = req.body;
        if (!clientEmail || !clientName || !scheduledAt) {
            res.status(400).json({ success: false, message: 'Name, email and appointment time are required.' });
            return;
        }
        const scheduledDate = new Date(scheduledAt);
        if (isNaN(scheduledDate.getTime())) {
            res.status(400).json({ success: false, message: 'Invalid scheduledAt date format.' });
            return;
        }
        const endDate = new Date(scheduledDate);
        endDate.setMinutes(endDate.getMinutes() + 60);
        // Double booking check: Ensure advisor does not have a conflicting booking
        let chosenAdvisorId = advisorId;
        if (!chosenAdvisorId) {
            // Pick first active advisor if none specified
            const activeAdvisor = await prisma_js_1.default.advisor.findFirst({ where: { active: true } });
            chosenAdvisorId = activeAdvisor?.id;
        }
        if (chosenAdvisorId) {
            const bufferMs = 15 * 60 * 1000;
            const targetStart = scheduledDate.getTime();
            const targetEndWithBuffer = endDate.getTime() + bufferMs;
            const conflicting = await prisma_js_1.default.booking.findFirst({
                where: {
                    advisorId: chosenAdvisorId,
                    status: { in: ['SCHEDULED', 'CONFIRMED'] },
                    AND: [
                        {
                            scheduledAt: {
                                lt: new Date(targetEndWithBuffer),
                            },
                        },
                        {
                            endAt: {
                                gt: new Date(targetStart - bufferMs),
                            },
                        },
                    ],
                },
            });
            if (conflicting) {
                res.status(409).json({
                    success: false,
                    code: 'DOUBLE_BOOKING_PREVENTED',
                    message: 'The selected advisor already has a session or buffer scheduled during this time slot. Please choose another time.',
                });
                return;
            }
        }
        // Find or create Client User
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
        // Generate unique human-readable Booking Ref (e.g. JLZ-2026-XXXX)
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const bookingRef = `JLZ-2026-${randomSuffix}`;
        const sessionUid = `ses_${crypto_1.default.randomBytes(6).toString('hex')}`;
        const sessionCardUid = `CARD-${bookingRef}-${crypto_1.default.randomBytes(3).toString('hex').toUpperCase()}`;
        // Create the booking
        const booking = await prisma_js_1.default.booking.create({
            data: {
                bookingRef,
                sessionUid,
                clientId: client.id,
                advisorId: chosenAdvisorId,
                packageId: packageId || undefined,
                categoryId: categoryId || undefined,
                sessionType: sessionType || 'LIVE_VIDEO',
                scheduledAt: scheduledDate,
                endAt: endDate,
                status: 'CONFIRMED',
                bufferMinutes: 15,
                intakeAnswers: intakeAnswers ? JSON.stringify(intakeAnswers) : null,
                timezone: timezone || 'Asia/Kolkata',
                notes,
                clientPhone,
                clientEmail,
            },
            include: {
                advisor: {
                    include: {
                        user: { select: { name: true, email: true, avatarUrl: true } },
                    },
                },
                category: true,
                package: true,
            },
        });
        // Create Live Session Room / Digital Session ID Card
        const roomExpiresAt = new Date(endDate);
        roomExpiresAt.setHours(roomExpiresAt.getHours() + 2);
        const roomName = `jilezara-${bookingRef.toLowerCase()}`;
        const roomUrl = sessionType === 'PHONE_CALL'
            ? `tel:${booking.advisor?.user?.name ? '+919825012345' : ''}`
            : `https://jilezara.daily.co/${roomName}`;
        const liveRoom = await prisma_js_1.default.liveSessionRoom.create({
            data: {
                bookingId: booking.id,
                roomName,
                roomUrl,
                dailyRoomId: `daily_${bookingRef.toLowerCase()}`,
                sessionCardUid,
                tokenExpiresAt: roomExpiresAt,
                recordingConsentGiven: false,
                recordingStatus: 'DISABLED',
            },
        });
        // Calculate applied price based on category
        let finalPrice = 1500;
        if (booking.package) {
            if (clientCategory === 'STUDENT')
                finalPrice = booking.package.studentPrice;
            else if (clientCategory === 'HOMEMAKER')
                finalPrice = booking.package.homemakerPrice;
            else if (clientCategory === 'PROFESSIONAL')
                finalPrice = booking.package.professionalPrice;
            else
                finalPrice = booking.package.basePrice;
        }
        // Create Payment Record
        const payment = await prisma_js_1.default.payment.create({
            data: {
                bookingId: booking.id,
                clientId: client.id,
                amount: finalPrice,
                currency: 'INR',
                status: 'COMPLETED',
                transactionRef: `PAY_${bookingRef}_${Date.now()}`,
                gateway: 'RAZORPAY_AZURE',
                verifiedAt: new Date(),
            },
        });
        // Audit log
        await prisma_js_1.default.auditLog.create({
            data: {
                actorId: client.id,
                actorRole: 'CLIENT',
                action: 'BOOKING_CONFIRMED',
                entityType: 'BOOKING',
                entityId: booking.id,
                details: JSON.stringify({
                    bookingRef,
                    sessionType,
                    scheduledAt: scheduledDate.toISOString(),
                    finalPrice,
                }),
            },
        });
        res.status(201).json({
            success: true,
            booking: {
                ...booking,
                liveRoom,
                payment,
            },
            sessionCard: {
                sessionCardUid,
                bookingRef,
                sessionUid,
                clientName: client.name,
                clientCategory: client.clientCategory,
                advisorName: booking.advisor?.user.name || 'Assigned Senior Advisor',
                categoryName: booking.category?.name || 'Personal Guidance',
                sessionType: booking.sessionType,
                scheduledAt: booking.scheduledAt,
                endAt: booking.endAt,
                status: booking.status,
                roomUrl: liveRoom.roomUrl,
                joinUrl: `/session/${booking.sessionUid}`,
            },
        });
    }
    catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
// 3. Get digital session ID card by sessionUid (Safe public/client view - no admin secrets)
router.get('/session-card/:sessionUid', async (req, res) => {
    try {
        const { sessionUid } = req.params;
        const booking = await prisma_js_1.default.booking.findUnique({
            where: { sessionUid },
            include: {
                client: { select: { id: true, name: true, clientCategory: true } },
                advisor: {
                    include: {
                        user: { select: { name: true, avatarUrl: true } },
                    },
                },
                category: true,
                liveRoom: true,
            },
        });
        if (!booking) {
            res.status(404).json({ success: false, message: 'Session card not found.' });
            return;
        }
        res.json({
            success: true,
            card: {
                bookingRef: booking.bookingRef,
                sessionUid: booking.sessionUid,
                sessionCardUid: booking.liveRoom?.sessionCardUid,
                clientName: booking.client.name,
                clientCategory: booking.client.clientCategory,
                advisorName: booking.advisor?.user.name || 'Advisory Team',
                advisorAvatar: booking.advisor?.user.avatarUrl,
                categoryName: booking.category?.name || 'General Guidance',
                sessionType: booking.sessionType,
                scheduledAt: booking.scheduledAt,
                endAt: booking.endAt,
                status: booking.status,
                roomUrl: booking.liveRoom?.roomUrl,
                recordingConsentGiven: booking.liveRoom?.recordingConsentGiven,
                recordingStatus: booking.liveRoom?.recordingStatus,
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 4. Client Portal: Get my bookings
router.get('/my-bookings', auth_js_1.requireAuth, async (req, res) => {
    try {
        const bookings = await prisma_js_1.default.booking.findMany({
            where: { clientId: req.user?.id },
            include: {
                advisor: {
                    include: {
                        user: { select: { name: true, avatarUrl: true } },
                    },
                },
                category: true,
                liveRoom: true,
                package: true,
            },
            orderBy: { scheduledAt: 'desc' },
        });
        res.json({
            success: true,
            bookings,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 5. Admin / Advisor: Get all bookings with filtering & audit logs
router.get('/all', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADVISOR', 'ADMIN']), async (req, res) => {
    try {
        const isAdvisor = req.user?.role === 'ADVISOR';
        // If advisor, filter by their assigned ID
        let advisorFilter = {};
        if (isAdvisor) {
            const adv = await prisma_js_1.default.advisor.findUnique({ where: { userId: req.user?.id } });
            if (adv)
                advisorFilter = { advisorId: adv.id };
        }
        const bookings = await prisma_js_1.default.booking.findMany({
            where: advisorFilter,
            include: {
                client: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        clientCategory: true,
                        isVerifiedStudent: true,
                    },
                },
                advisor: {
                    include: {
                        user: { select: { name: true, email: true } },
                    },
                },
                category: true,
                package: true,
                liveRoom: true,
                payments: true,
            },
            orderBy: { scheduledAt: 'desc' },
        });
        res.json({
            success: true,
            bookings,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// 6. Update booking status / Reschedule / Cancel with audit trail
router.patch('/:id/status', auth_js_1.requireAuth, (0, auth_js_1.requireRole)(['ADVISOR', 'ADMIN']), async (req, res) => {
    try {
        const { id } = req.params;
        const { status, scheduledAt, advisorId, notes } = req.body;
        const existing = await prisma_js_1.default.booking.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ success: false, message: 'Booking not found' });
            return;
        }
        const updateData = {};
        if (status)
            updateData.status = status;
        if (advisorId)
            updateData.advisorId = advisorId;
        if (notes)
            updateData.notes = notes;
        if (scheduledAt) {
            const newScheduled = new Date(scheduledAt);
            const newEnd = new Date(newScheduled);
            newEnd.setMinutes(newEnd.getMinutes() + 60);
            // Verify no collision
            const checkAdvisor = advisorId || existing.advisorId;
            if (checkAdvisor) {
                const bufferMs = 15 * 60 * 1000;
                const collision = await prisma_js_1.default.booking.findFirst({
                    where: {
                        id: { not: id },
                        advisorId: checkAdvisor,
                        status: { in: ['SCHEDULED', 'CONFIRMED'] },
                        scheduledAt: { lt: new Date(newEnd.getTime() + bufferMs) },
                        endAt: { gt: new Date(newScheduled.getTime() - bufferMs) },
                    },
                });
                if (collision) {
                    res.status(409).json({
                        success: false,
                        message: 'Rescheduling failed: Selected advisor has a schedule conflict at this new time.',
                    });
                    return;
                }
            }
            updateData.scheduledAt = newScheduled;
            updateData.endAt = newEnd;
        }
        const updated = await prisma_js_1.default.booking.update({
            where: { id },
            data: updateData,
            include: {
                client: true,
                advisor: { include: { user: true } },
            },
        });
        await prisma_js_1.default.auditLog.create({
            data: {
                actorId: req.user?.id,
                actorRole: req.user?.role,
                action: `BOOKING_${status || 'RESCHEDULED'}`,
                entityType: 'BOOKING',
                entityId: id,
                details: JSON.stringify({ previousStatus: existing.status, updateData }),
            },
        });
        res.json({
            success: true,
            booking: updated,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.default = router;
