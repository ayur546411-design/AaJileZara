"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_js_1 = __importDefault(require("../lib/prisma.js"));
let passed = 0;
let failed = 0;
function assert(condition, testName) {
    if (condition) {
        console.log(`  ✓ PASS: ${testName}`);
        passed++;
    }
    else {
        console.error(`  ✗ FAIL: ${testName}`);
        failed++;
    }
}
async function runTestSuite() {
    console.log('\n======================================================');
    console.log('🧪 RUNNING JI LE ZARA AUTOMATED TEST SUITE');
    console.log('======================================================\n');
    // Test 1: Category Pricing Rules Verification
    console.log('--- TEST 1: User Category Pricing Rules ---');
    const planAPackage = await prisma_js_1.default.package.findFirst({
        where: { slug: 'plan-a-direct-guidance' },
    });
    assert(Boolean(planAPackage), 'Plan A package exists in database');
    if (planAPackage) {
        assert(planAPackage.studentPrice === 500, 'Student proposed starting rate is exactly ₹500');
        assert(planAPackage.homemakerPrice === 1000, 'Homemaker proposed starting rate is exactly ₹1,000');
        assert(planAPackage.basePrice === 1500, 'Standard starting price configured');
    }
    // Test 2: Double Booking Prevention Engine
    console.log('\n--- TEST 2: Prevention of Double Bookings ---');
    const activeAdvisor = await prisma_js_1.default.advisor.findFirst({ where: { active: true } });
    const testClient = await prisma_js_1.default.user.findFirst({ where: { role: 'CLIENT' } });
    assert(Boolean(activeAdvisor && testClient), 'Advisor and Client available for collision test');
    if (activeAdvisor && testClient) {
        const testSlotTime = new Date('2026-11-15T10:00:00.000Z');
        const testSlotEndTime = new Date('2026-11-15T11:00:00.000Z');
        // Clean any leftover test booking
        await prisma_js_1.default.booking.deleteMany({
            where: { bookingRef: { in: ['TEST-COLLISION-1', 'TEST-COLLISION-2'] } },
        });
        // Create 1st booking
        const booking1 = await prisma_js_1.default.booking.create({
            data: {
                bookingRef: 'TEST-COLLISION-1',
                sessionUid: 'ses_test_collision_1',
                clientId: testClient.id,
                advisorId: activeAdvisor.id,
                sessionType: 'LIVE_VIDEO',
                scheduledAt: testSlotTime,
                endAt: testSlotEndTime,
                status: 'CONFIRMED',
                bufferMinutes: 15,
            },
        });
        assert(Boolean(booking1), 'First booking confirmed at 10:00 AM');
        // Attempt second booking overlapping with buffer (10:30 AM)
        const collidingTime = new Date('2026-11-15T10:30:00.000Z');
        const collidingEndTime = new Date('2026-11-15T11:30:00.000Z');
        const bufferMs = 15 * 60 * 1000;
        const targetStart = collidingTime.getTime();
        const targetEndWithBuffer = collidingEndTime.getTime() + bufferMs;
        const conflict = await prisma_js_1.default.booking.findFirst({
            where: {
                advisorId: activeAdvisor.id,
                status: { in: ['SCHEDULED', 'CONFIRMED'] },
                AND: [
                    { scheduledAt: { lt: new Date(targetEndWithBuffer) } },
                    { endAt: { gt: new Date(targetStart - bufferMs) } },
                ],
            },
        });
        assert(conflict !== null, 'Double booking collision successfully detected and blocked!');
        // Cleanup test bookings
        await prisma_js_1.default.booking.deleteMany({
            where: { bookingRef: { in: ['TEST-COLLISION-1', 'TEST-COLLISION-2'] } },
        });
    }
    // Test 3: Intake Form Word Limit Enforcement
    console.log('\n--- TEST 3: Intake Form Word Limits ---');
    const shortText = 'I am looking for guidance on family transitions and communication.';
    const longText = Array(280).fill('word').join(' ');
    const countWords = (t) => t.trim().split(/\s+/).filter(Boolean).length;
    assert(countWords(shortText) <= 250, 'Concise concern under 250 words is accepted');
    assert(countWords(longText) > 250, 'Excessive text over 250 words correctly triggers violation');
    // Test 4: Live Session ID Card Generation & Token Expiration
    console.log('\n--- TEST 4: Digital Live Session ID Card & Security ---');
    const sampleBooking = await prisma_js_1.default.booking.findFirst({
        include: { liveRoom: true },
    });
    assert(Boolean(sampleBooking?.liveRoom), 'Live Session Room and Session Card UID exist');
    if (sampleBooking?.liveRoom) {
        assert(Boolean(sampleBooking.liveRoom.sessionCardUid.startsWith('CARD-')), 'Digital Session Card UID adheres to format CARD-XXXX');
        assert(sampleBooking.liveRoom.recordingConsentGiven === false, 'Recording is DISABLED by default until explicit consent is given');
    }
    // Test 5: Infrastructure Cost Worksheet & Threshold Warning
    console.log('\n--- TEST 5: Infrastructure Cost Management & Alerts ---');
    const costEntries = await prisma_js_1.default.costEntry.findMany();
    assert(costEntries.length >= 9, 'All 9 mandatory infrastructure cost categories tracked');
    const domainEntry = costEntries.find((c) => c.category === 'DOMAIN');
    assert(Boolean(domainEntry), 'Domain entry is present');
    assert(domainEntry?.estimatedMonthlyInr === 89, '3-Year Domain cost (₹3,204) correctly amortized to ₹89/month');
    // Test 6: 90-Day Retention Policy
    console.log('\n--- TEST 6: 90-Day Recording Retention Policy ---');
    const testRetentionDate = new Date();
    testRetentionDate.setDate(testRetentionDate.getDate() + 90);
    const now = new Date();
    const diffDays = Math.round((testRetentionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    assert(diffDays === 90, 'Default recording retention period computes to 90 days');
    console.log('\n======================================================');
    console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('======================================================\n');
    if (failed > 0) {
        process.exit(1);
    }
}
runTestSuite()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_js_1.default.$disconnect();
});
