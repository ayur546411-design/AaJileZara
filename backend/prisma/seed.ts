import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Ji Le Zara database...');

  // Clean existing data
  await prisma.auditLog.deleteMany({});
  await prisma.costEntry.deleteMany({});
  await prisma.intakeFormConfig.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.sessionRecording.deleteMany({});
  await prisma.liveSessionRoom.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.advisoryRequest.deleteMany({});
  await prisma.package.deleteMany({});
  await prisma.serviceCategory.deleteMany({});
  await prisma.advisor.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Core Users (Admin, Advisors, Clients)
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@jilezara.com',
      clerkId: 'user_admin_nilambari',
      name: 'Dr. Nilambari Dave, PhD',
      phone: '+91 98250 12345',
      role: 'ADMIN',
      clientCategory: 'OTHER',
      avatarUrl: '/dr_nilambari_portrait.jpg',
    },
  });

  const advisorUser1 = await prisma.user.create({
    data: {
      email: 'ananya@jilezara.com',
      clerkId: 'user_advisor_ananya',
      name: 'Prof. Ananya Sengupta',
      phone: '+91 98110 54321',
      role: 'ADVISOR',
      clientCategory: 'OTHER',
      avatarUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=600',
    },
  });

  const advisorUser2 = await prisma.user.create({
    data: {
      email: 'rajesh@jilezara.com',
      clerkId: 'user_advisor_rajesh',
      name: 'Rajesh K. Mehta',
      phone: '+91 99040 67890',
      role: 'ADVISOR',
      clientCategory: 'OTHER',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    },
  });

  const advisorUser3 = await prisma.user.create({
    data: {
      email: 'meera@jilezara.com',
      clerkId: 'user_advisor_meera',
      name: 'Meera Deshmukh',
      phone: '+91 98200 98765',
      role: 'ADVISOR',
      clientCategory: 'OTHER',
      avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=600',
    },
  });

  // Sample Clients
  const clientStudent = await prisma.user.create({
    data: {
      email: 'aarav.sharma@university.edu',
      clerkId: 'user_client_aarav',
      name: 'Aarav Sharma',
      phone: '+91 97123 45678',
      role: 'CLIENT',
      clientCategory: 'STUDENT',
      isVerifiedStudent: true,
      studentDocUrl: 'https://university.edu/verify/aarav_id.pdf',
    },
  });

  const clientHomemaker = await prisma.user.create({
    data: {
      email: 'sunita.patel@gmail.com',
      clerkId: 'user_client_sunita',
      name: 'Sunita Patel',
      phone: '+91 98980 11223',
      role: 'CLIENT',
      clientCategory: 'HOMEMAKER',
      isVerifiedStudent: false,
    },
  });

  const clientProfessional = await prisma.user.create({
    data: {
      email: 'vikram.singh@techcorp.com',
      clerkId: 'user_client_vikram',
      name: 'Vikram Singh',
      phone: '+91 99887 66554',
      role: 'CLIENT',
      clientCategory: 'PROFESSIONAL',
      isVerifiedStudent: false,
    },
  });

  // 2. Create Advisor Profiles
  const advisorProfileDrNilambari = await prisma.advisor.create({
    data: {
      userId: adminUser.id,
      title: 'Founder & Principal Guidance Mentor (PhD, Former Vice-Chancellor & Dean)',
      bio: 'Over 38 years in academic leadership, human development, and family studies. Former Vice-Chancellor, Dean, and Doctor of Philosophy in Human Development and Family Studies. Dedicated to guiding individuals and families through transformative life stages with warmth, wisdom, and deep emotional clarity (Soch se Shanti Tak).',
      specializations: JSON.stringify(['Self-Discovery', 'Relationships & Family', 'Life Transitions', 'Parenting 4.0']),
      languages: JSON.stringify(['Hindi', 'Gujarati', 'English']),
      maxWeeklyHours: 25,
      active: true,
    },
  });

  const advisorProfileAnanya = await prisma.advisor.create({
    data: {
      userId: advisorUser1.id,
      title: 'Senior Family Dynamics & Transitions Advisor',
      bio: 'Former educator and social mentor with 18+ years experience counseling mothers, couples, and youth in navigating cross-generational harmony and boundary setting.',
      specializations: JSON.stringify(['Relationships & Family', 'Parenting and Home Life', 'Social Connections']),
      languages: JSON.stringify(['Hindi', 'Bengali', 'English']),
      maxWeeklyHours: 20,
      active: true,
    },
  });

  const advisorProfileRajesh = await prisma.advisor.create({
    data: {
      userId: advisorUser2.id,
      title: 'Life Transitions & Mindful Reflection Guide',
      bio: 'Specialist in mid-life realignment, retirement readiness, and balancing personal identity amidst rapid social expectations. Deep grounding in contemplative inquiry.',
      specializations: JSON.stringify(['Life Transitions', 'Purpose, Balance and Future Planning', 'Self-Discovery']),
      languages: JSON.stringify(['Gujarati', 'Hindi', 'English']),
      maxWeeklyHours: 15,
      active: true,
    },
  });

  const advisorProfileMeera = await prisma.advisor.create({
    data: {
      userId: advisorUser3.id,
      title: 'Emotional Well-being & Communication Counselor',
      bio: 'Focusing on peaceful conflict de-escalation, emotional unburdening, and mindful expression within domestic and social environments.',
      specializations: JSON.stringify(['Emotional Well-being and Clarity', 'Social Connections and Communication']),
      languages: JSON.stringify(['Marathi', 'Hindi', 'English']),
      maxWeeklyHours: 20,
      active: true,
    },
  });

  // 3. Service Categories (7 Stages / Areas of Life)
  const categoriesData = [
    {
      name: 'Self-Discovery and Personal Growth',
      slug: 'self-discovery-growth',
      description: 'Understanding your authentic self, building grounded self-worth, releasing comparison, and realigning with what genuinely matters to your heart.',
      sortOrder: 1,
      icon: 'Sparkles',
    },
    {
      name: 'Relationships and Family',
      slug: 'relationships-family',
      description: 'Strengthening interpersonal bonds, healing communication barriers between spouses, siblings, and in-laws, and fostering mutual respect at home.',
      sortOrder: 2,
      icon: 'HeartHandshake',
    },
    {
      name: 'Parenting and Home Life',
      slug: 'parenting-home-life',
      description: 'Navigating the delicate phases of parenthood, adolescent transitions, screen-time balance, and establishing a peaceful, emotionally secure household.',
      sortOrder: 3,
      icon: 'Home',
    },
    {
      name: 'Emotional Well-being and Clarity',
      slug: 'emotional-wellbeing-clarity',
      description: 'Finding calm amidst emotional turbulence, processing grief and subtle anxieties, moving from chronic mental clutter into grounded stillness (Soch se Shanti Tak).',
      sortOrder: 4,
      icon: 'SunMedium',
    },
    {
      name: 'Life Transitions and Personal Decisions',
      slug: 'life-transitions-decisions',
      description: 'Support through marriage, relocation, empty-nest syndrome, midlife recalibration, retirement, or major crossroads without fear.',
      sortOrder: 5,
      icon: 'Compass',
    },
    {
      name: 'Social Connections and Communication',
      slug: 'social-connections-communication',
      description: 'Developing gentle assertiveness, setting healthy social boundaries, overcoming isolation, and building meaningful, lasting companionship.',
      sortOrder: 6,
      icon: 'Users',
    },
    {
      name: 'Purpose, Balance and Future Planning',
      slug: 'purpose-balance-future',
      description: 'Harmonizing personal aspirations with family duties, overcoming existential restlessness, and designing a purposeful, peaceful life roadmap.',
      sortOrder: 7,
      icon: 'ShieldCheck',
    },
  ];

  const createdCategories = [];
  for (const cat of categoriesData) {
    const c = await prisma.serviceCategory.create({ data: cat });
    createdCategories.push(c);
  }

  // 4. Packages & Two Main Plans
  const packagePlanA = await prisma.package.create({
    data: {
      name: 'Plan A: Direct Guidance Session',
      slug: 'plan-a-direct-guidance',
      planType: 'DIRECT_GUIDANCE',
      description: 'One-on-one direct guidance with your chosen mentor. Includes intake form review, 60-minute private phone or video consultation, and digital session card.',
      basePrice: 1500,
      studentPrice: 500,
      homemakerPrice: 1000,
      professionalPrice: 2000,
      durationMinutes: 60,
      sessionsCount: 1,
      validityDays: 30,
      isActive: true,
      isApproved: true,
    },
  });

  const packagePlanB = await prisma.package.create({
    data: {
      name: 'Plan B: Advisory Team Support & Care Navigation',
      slug: 'plan-b-advisory-support',
      planType: 'ADVISORY_SUPPORT',
      description: 'Comprehensive guided support: Our senior intake team reviews your personal context, matches you with the ideal mentor, schedules an introductory consultation, and crafts an actionable personalized roadmap.',
      basePrice: 2200,
      studentPrice: 800,
      homemakerPrice: 1500,
      professionalPrice: 2800,
      durationMinutes: 75,
      sessionsCount: 2,
      validityDays: 60,
      isActive: true,
      isApproved: true,
    },
  });

  const packageDeepSeries = await prisma.package.create({
    data: {
      name: 'Deep Realignment Journey (4 Sessions)',
      slug: 'deep-realignment-journey',
      planType: 'DIRECT_GUIDANCE',
      description: 'A 4-week structured social and personal well-being path with continuous advisor reflection notes between sessions.',
      basePrice: 5000,
      studentPrice: 1800,
      homemakerPrice: 3500,
      professionalPrice: 6500,
      durationMinutes: 60,
      sessionsCount: 4,
      validityDays: 90,
      isActive: true,
      isApproved: true,
    },
  });

  // 5. Configurable Intake Forms with Word Limits
  await prisma.intakeFormConfig.create({
    data: {
      categoryId: createdCategories[1].id, // Relationships & Family
      version: 1,
      isActive: true,
      fieldsConfig: JSON.stringify([
        { id: 'fullName', label: 'Full Legal Name', type: 'text', required: true },
        { id: 'phone', label: 'WhatsApp / Mobile Number', type: 'tel', required: true },
        { id: 'ageEligibility', label: 'I confirm I am 18 years of age or older', type: 'checkbox', required: true },
        { id: 'clientCategory', label: 'Client Category', type: 'select', options: ['Student', 'Homemaker / Housewife', 'Working Professional', 'Other Individual'], required: true },
        { id: 'preferredLanguage', label: 'Preferred Language for Session', type: 'select', options: ['Hindi', 'English', 'Gujarati', 'Marathi'], required: true },
        { id: 'preferredContact', label: 'Preferred Session Mode', type: 'select', options: ['Live Video Call', 'Telephone Call'], required: true },
        { id: 'concernSummary', label: 'What life challenge or relationship dynamic would you like guidance on?', type: 'textarea', required: true, maxWords: 200 },
        { id: 'previousCounseling', label: 'Have you explored social guidance or counseling before?', type: 'textarea', required: false, maxWords: 100 },
        { id: 'recordingConsent', label: 'Recording Consent (Optional: strictly for advisor notes, auto-deleted in 90 days)', type: 'checkbox', required: false },
        { id: 'medicalDisclaimer', label: 'I acknowledge that Ji Le Zara provides social and personal guidance, not psychiatric or emergency medical treatment.', type: 'checkbox', required: true },
      ]),
      wordLimits: JSON.stringify({
        concernSummary: 200,
        previousCounseling: 100,
      }),
    },
  });

  // 6. Sample Confirmed Bookings with Digital Live Session ID Cards
  const scheduledDate1 = new Date();
  scheduledDate1.setDate(scheduledDate1.getDate() + 2);
  scheduledDate1.setHours(15, 0, 0, 0);

  const endDate1 = new Date(scheduledDate1);
  endDate1.setMinutes(endDate1.getMinutes() + 60);

  const booking1 = await prisma.booking.create({
    data: {
      bookingRef: 'JLZ-2026-9041',
      sessionUid: 'ses_7f21a8d9_live_video',
      clientId: clientStudent.id,
      advisorId: advisorProfileDrNilambari.id,
      packageId: packagePlanA.id,
      categoryId: createdCategories[0].id, // Self-Discovery
      sessionType: 'LIVE_VIDEO',
      scheduledAt: scheduledDate1,
      endAt: endDate1,
      status: 'CONFIRMED',
      bufferMinutes: 15,
      clientPhone: clientStudent.phone,
      clientEmail: clientStudent.email,
      timezone: 'Asia/Kolkata',
      notes: 'Initial session for university life transition and grounded focus.',
      intakeAnswers: JSON.stringify({
        clientCategory: 'Student',
        preferredLanguage: 'Hindi',
        preferredContact: 'Live Video Call',
        concernSummary: 'Navigating intense expectations around upcoming academic milestones and struggling with persistent self-doubt. Seeking clarity and emotional grounding.',
        ageEligibility: true,
        medicalDisclaimer: true,
      }),
    },
  });

  // Create Digital Live Session Room for Booking 1
  const tokenExpires1 = new Date(endDate1);
  tokenExpires1.setHours(tokenExpires1.getHours() + 1);

  const room1 = await prisma.liveSessionRoom.create({
    data: {
      bookingId: booking1.id,
      roomName: 'jilezara-ses-9041-selfdiscovery',
      roomUrl: 'https://jilezara.daily.co/jilezara-ses-9041-selfdiscovery',
      dailyRoomId: 'daily_room_9041_prod',
      sessionCardUid: 'CARD-JLZ-9041-SECURE',
      tokenExpiresAt: tokenExpires1,
      recordingConsentGiven: false,
      recordingStatus: 'DISABLED',
    },
  });

  // Booking 2: Homemaker Phone Consultation
  const scheduledDate2 = new Date();
  scheduledDate2.setDate(scheduledDate2.getDate() + 4);
  scheduledDate2.setHours(11, 30, 0, 0);

  const endDate2 = new Date(scheduledDate2);
  endDate2.setMinutes(endDate2.getMinutes() + 60);

  const booking2 = await prisma.booking.create({
    data: {
      bookingRef: 'JLZ-2026-9042',
      sessionUid: 'ses_b9102c4e_phone_call',
      clientId: clientHomemaker.id,
      advisorId: advisorProfileAnanya.id,
      packageId: packagePlanA.id,
      categoryId: createdCategories[1].id, // Relationships & Family
      sessionType: 'PHONE_CALL',
      scheduledAt: scheduledDate2,
      endAt: endDate2,
      status: 'CONFIRMED',
      bufferMinutes: 15,
      clientPhone: clientHomemaker.phone,
      clientEmail: clientHomemaker.email,
      timezone: 'Asia/Kolkata',
      notes: 'Family dynamics consultation over phone.',
      intakeAnswers: JSON.stringify({
        clientCategory: 'Homemaker / Housewife',
        preferredLanguage: 'Hindi',
        preferredContact: 'Telephone Call',
        concernSummary: 'Seeking gentle guidance to express my feelings openly with my spouse and in-laws without escalating tensions at home.',
        ageEligibility: true,
        medicalDisclaimer: true,
      }),
    },
  });

  await prisma.liveSessionRoom.create({
    data: {
      bookingId: booking2.id,
      roomName: 'phone-bridge-9042',
      roomUrl: 'tel:+919811054321',
      sessionCardUid: 'CARD-JLZ-9042-PHONE',
      tokenExpiresAt: tokenExpires1,
      recordingConsentGiven: false,
      recordingStatus: 'DISABLED',
    },
  });

  // 7. Plan B Advisory Requests
  await prisma.advisoryRequest.create({
    data: {
      requestRef: 'REQ-ADV-2026-001',
      clientId: clientProfessional.id,
      assignedAdvisorId: advisorProfileRajesh.id,
      categoryId: createdCategories[4].id, // Life Transitions
      concernSummary: 'Considering a major mid-career pivot and city relocation. Feeling anxious about balance with aging parents. Need assistance picking the right long-term guidance path.',
      preferredLanguage: 'English',
      preferredContact: 'Phone',
      status: 'REVIEWED',
      internalNotes: 'Applicant has multiple competing life transitions. Rajesh K. Mehta is ideal mentor due to extensive background in mid-life recalibration and eldercare harmony. Introductory 20-min call scheduled.',
      clientRecommendations: 'We recommend starting with our 2-session Advisory Team Support plan under Rajesh K. Mehta, focusing first on family alignment before taking the professional leap.',
    },
  });

  // 8. Sample Payment Records
  await prisma.payment.create({
    data: {
      bookingId: booking1.id,
      clientId: clientStudent.id,
      amount: 500, // Discounted student rate
      currency: 'INR',
      status: 'COMPLETED',
      transactionRef: 'PAY_RZP_2026_STU_500_01',
      gateway: 'RAZORPAY_AZURE',
      verifiedAt: new Date(),
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: booking2.id,
      clientId: clientHomemaker.id,
      amount: 1000, // Homemaker rate
      currency: 'INR',
      status: 'COMPLETED',
      transactionRef: 'PAY_RZP_2026_HMK_1000_02',
      gateway: 'RAZORPAY_AZURE',
      verifiedAt: new Date(),
    },
  });

  // 9. Infrastructure Cost Entries (Actual planning data as requested in prompt)
  const currentMonth = '2026-10';
  const costData = [
    {
      category: 'DOMAIN',
      serviceName: 'www.jilezara.com (3-Year Registration, Amortized Monthly)',
      estimatedMonthlyInr: 89.0, // ₹3,204 / 36 months
      actualBilledInr: 89.0,
      usageQuantity: '1 Domain (3yr term paid ₹3,204)',
      monthYear: currentMonth,
      notes: 'Total ₹3,204 for 3 years as per project owner quotation. Verified not included as recurring Azure compute charge.',
      budgetLimitInr: 100,
      isActualInvoice: true,
    },
    {
      category: 'APP_SERVICE',
      serviceName: 'Azure App Service (Linux B1 Basic Tier, Central India)',
      estimatedMonthlyInr: 1850.0,
      actualBilledInr: 1780.4,
      usageQuantity: '730 Hours / month',
      monthYear: currentMonth,
      notes: 'Hosts Node.js backend & static React bundle with automated SSL and staging slots.',
      budgetLimitInr: 2500,
      isActualInvoice: true,
    },
    {
      category: 'DATABASE',
      serviceName: 'Azure Database for PostgreSQL (Flexible Server, B1ms, 32GB)',
      estimatedMonthlyInr: 2100.0,
      actualBilledInr: 2045.0,
      usageQuantity: '1 vCPU, 2GB RAM, 32GB Storage',
      monthYear: currentMonth,
      notes: 'Automated daily snapshots with 35-day point-in-time recovery enabled.',
      budgetLimitInr: 3000,
      isActualInvoice: true,
    },
    {
      category: 'BLOB_STORAGE',
      serviceName: 'Azure Blob Storage (Hot & Cool Tiers, Private Container)',
      estimatedMonthlyInr: 320.0,
      actualBilledInr: 280.0,
      usageQuantity: '45 GB Stored, LRS Redundancy',
      monthYear: currentMonth,
      notes: 'Contains private admin-only session recordings subject to 90-day retention purge.',
      budgetLimitInr: 800,
      isActualInvoice: true,
    },
    {
      category: 'VIDEO_SESSIONS',
      serviceName: 'Daily Video SDK (Interactive Rooms & Mesh/SFU Calling)',
      estimatedMonthlyInr: 750.0,
      actualBilledInr: 620.0,
      usageQuantity: '1,420 Participant Minutes',
      monthYear: currentMonth,
      notes: 'First 1,000 minutes covered under developer tier, excess billed at $0.004/min.',
      budgetLimitInr: 1500,
      isActualInvoice: true,
    },
    {
      category: 'RECORDINGS',
      serviceName: 'Cloud Recording Processing & Encryption (Optional / Consent Gated)',
      estimatedMonthlyInr: 450.0,
      actualBilledInr: 210.0,
      usageQuantity: '6 Recorded Sessions (with dual consent)',
      monthYear: currentMonth,
      notes: 'Strictly gated behind mutual consent. Zero fee for non-consenting sessions.',
      budgetLimitInr: 1000,
      isActualInvoice: true,
    },
    {
      category: 'BANDWIDTH',
      serviceName: 'Azure Egress Bandwidth & Content Delivery',
      estimatedMonthlyInr: 250.0,
      actualBilledInr: 185.0,
      usageQuantity: '38 GB Outbound Traffic',
      monthYear: currentMonth,
      notes: 'Static assets and encrypted stream data transmission.',
      budgetLimitInr: 600,
      isActualInvoice: true,
    },
    {
      category: 'NOTIFICATIONS',
      serviceName: 'Transactional Email (SendGrid) & WhatsApp Cloud API',
      estimatedMonthlyInr: 380.0,
      actualBilledInr: 290.0,
      usageQuantity: '480 Email Reminders + 120 WhatsApp Confirmations',
      monthYear: currentMonth,
      notes: 'Appointment confirmations, calendar invites, and 24-hr reminder pings.',
      budgetLimitInr: 800,
      isActualInvoice: true,
    },
    {
      category: 'MONITORING',
      serviceName: 'Azure Monitor & Application Insights Log Analytics',
      estimatedMonthlyInr: 220.0,
      actualBilledInr: 165.0,
      usageQuantity: '1.8 GB Ingested Logs',
      monthYear: currentMonth,
      notes: 'Real-time telemetry, error tracking, and performance latency alerting.',
      budgetLimitInr: 500,
      isActualInvoice: true,
    },
  ];

  for (const c of costData) {
    await prisma.costEntry.create({ data: c });
  }

  // 10. Audit Log Initial Events
  await prisma.auditLog.create({
    data: {
      actorId: adminUser.id,
      actorRole: 'ADMIN',
      action: 'SYSTEM_INITIALIZED',
      entityType: 'PLATFORM',
      entityId: 'SYS-INIT',
      details: JSON.stringify({
        version: '1.0.0',
        message: 'Ji Le Zara platform initialized with 7 Stages of Life and Two Guidance Plans.',
      }),
      ipAddress: '127.0.0.1',
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
