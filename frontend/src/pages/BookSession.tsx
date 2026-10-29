import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  PhoneCall, 
  Video, 
  User, 
  GraduationCap, 
  Home as HomeIcon, 
  Briefcase, 
  ShieldCheck, 
  Lock, 
  ArrowRight,
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react';

export const BookSession: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Wizard Steps
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [categoryId, setCategoryId] = useState<string>('');
  const [advisorId, setAdvisorId] = useState<string>('');
  const [sessionType, setSessionType] = useState<'LIVE_VIDEO' | 'PHONE_CALL'>('LIVE_VIDEO');
  const [userCategory, setUserCategory] = useState<'STUDENT' | 'HOMEMAKER' | 'PROFESSIONAL' | 'OTHER'>('HOMEMAKER');
  
  // Date & Slot
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Intake Form
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('Hindi');
  const [concernSummary, setConcernSummary] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [medicalAcknowledged, setMedicalAcknowledged] = useState(false);
  const [recordingConsent, setRecordingConsent] = useState(false);

  // Data from backend
  const [categories, setCategories] = useState<any[]>([]);
  const [advisors, setAdvisors] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);

  // Submission & Result
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedCard, setConfirmedCard] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const wordCount = concernSummary.trim().split(/\s+/).filter(Boolean).length;
  const maxWords = 250;

  // Initialize data
  useEffect(() => {
    Promise.all([
      api.getCategories(),
      api.getAdvisors(),
      api.getPackages(),
    ]).then(([catRes, advRes, pkgRes]) => {
      if (catRes.success) setCategories(catRes.categories);
      if (advRes.success) setAdvisors(advRes.advisors);
      if (pkgRes.success) setPackages(pkgRes.packages);

      // Check URL parameters
      const urlCat = searchParams.get('category');
      if (urlCat && catRes.categories) {
        const found = catRes.categories.find((c: any) => c.slug === urlCat || c.id === urlCat);
        if (found) setCategoryId(found.id);
      }

      const urlAdv = searchParams.get('advisorId');
      if (urlAdv) setAdvisorId(urlAdv);
    });
  }, [searchParams]);

  // Load slots when date or advisor changes
  useEffect(() => {
    if (selectedDate) {
      setLoadingSlots(true);
      setSelectedSlot(null);
      api.getAvailableSlots(selectedDate, advisorId || undefined, sessionType)
        .then((res) => {
          if (res.success && res.slots) {
            setAvailableSlots(res.slots);
          }
        })
        .catch((err) => console.warn('Could not load slots:', err))
        .finally(() => setLoadingSlots(false));
    }
  }, [selectedDate, advisorId, sessionType]);

  // Dynamic price calculation
  const directPackage = packages.find((p) => p.planType === 'DIRECT_GUIDANCE') || {
    studentPrice: 500,
    homemakerPrice: 1000,
    professionalPrice: 2000,
    basePrice: 1500,
  };

  let applicablePrice = 1500;
  if (userCategory === 'STUDENT') applicablePrice = directPackage.studentPrice;
  else if (userCategory === 'HOMEMAKER') applicablePrice = directPackage.homemakerPrice;
  else if (userCategory === 'PROFESSIONAL') applicablePrice = directPackage.professionalPrice;
  else applicablePrice = directPackage.basePrice;

  // Handle Booking Submission
  const handleBookingSubmit = async () => {
    setErrorMessage(null);

    if (!selectedSlot) {
      setErrorMessage('Please select an available time slot.');
      return;
    }

    if (wordCount > maxWords) {
      setErrorMessage(`Word count exceeds ${maxWords} words. Current: ${wordCount} words.`);
      return;
    }

    if (!ageConfirmed || !medicalAcknowledged) {
      setErrorMessage('Please confirm the age eligibility and guidance acknowledgement checkboxes.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        clientName,
        clientEmail,
        clientPhone,
        clientCategory: userCategory,
        advisorId: advisorId || undefined,
        packageId: directPackage.id,
        categoryId: categoryId || undefined,
        sessionType,
        scheduledAt: selectedSlot.scheduledAt,
        intakeAnswers: {
          clientCategory: userCategory,
          preferredLanguage,
          preferredContact: sessionType,
          concernSummary,
          ageConfirmed,
          medicalAcknowledged,
          recordingConsent,
        },
        timezone: 'Asia/Kolkata',
      };

      const res = await api.createBooking(payload);

      if (res.success && res.sessionCard) {
        setConfirmedCard(res.sessionCard);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#790C35', '#B08032', '#F9E9E7'],
        });
      } else {
        setErrorMessage(res.message || 'Failed to complete booking. Please try another slot.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while confirming booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCardLink = () => {
    if (confirmedCard) {
      const fullUrl = `${window.location.origin}/session/${confirmedCard.sessionUid}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-brand-blush/30 py-12 border-b border-brand-wine/10 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          <span className="px-3 py-1 rounded-full gold-badge text-brand-gold text-xs font-bold uppercase tracking-wider">
            Booking & Scheduling Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-wine font-bold">
            Schedule a Confidential Guidance Session
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal/70">
            Choose your area of life, select a convenient time, and receive your Digital Live Session ID Card instantly.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* If Confirmed: Digital Live Session ID Card View */}
        {confirmedCard ? (
          <div className="editorial-card rounded-3xl p-6 sm:p-10 bg-white border-2 border-brand-wine/20 text-left space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-brand-wine/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-bold block">
                    Session Confirmed & Saved in Backend
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
                    Your Digital Live Session ID Card
                  </h2>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-brand-blush text-brand-wine text-xs font-mono font-bold">
                {confirmedCard.sessionCardUid}
              </span>
            </div>

            {/* The Digital Card Visual */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-wine to-brand-wine-dark text-white relative shadow-elevated overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none font-serif text-9xl">
                JZ
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-brand-gold-light font-semibold">
                      Ji Le Zara · Social Guidance Platform
                    </p>
                    <p className="font-serif text-xl font-bold">
                      {confirmedCard.categoryName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-brand-cream/70 block uppercase">Booking Reference</span>
                    <span className="font-mono text-sm font-bold text-brand-gold-light">
                      {confirmedCard.bookingRef}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-white/60 block text-[10px]">Client Name</span>
                    <strong className="text-sm font-semibold">{confirmedCard.clientName}</strong>
                    <span className="text-[10px] text-brand-gold-light block capitalize mt-0.5">
                      Category: {confirmedCard.clientCategory}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/60 block text-[10px]">Assigned Advisor</span>
                    <strong className="text-sm font-semibold">{confirmedCard.advisorName}</strong>
                  </div>

                  <div>
                    <span className="text-white/60 block text-[10px]">Date & Time</span>
                    <strong className="text-sm font-semibold">
                      {new Date(confirmedCard.scheduledAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </strong>
                    <span className="text-[10px] text-brand-cream/80 block">
                      {new Date(confirmedCard.scheduledAt).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })} IST
                    </span>
                  </div>

                  <div>
                    <span className="text-white/60 block text-[10px]">Session Format</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium mt-1">
                      {confirmedCard.sessionType === 'LIVE_VIDEO' ? (
                        <>
                          <Video className="w-3.5 h-3.5 text-brand-gold-light" /> Live Video
                        </>
                      ) : (
                        <>
                          <PhoneCall className="w-3.5 h-3.5 text-brand-gold-light" /> Telephone
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Session Access Action */}
                <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-white/80">
                    <span>Session Status: </span>
                    <span className="font-bold text-emerald-300">CONFIRMED</span>
                    <span className="mx-2">•</span>
                    <span>15-min buffer protected</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {confirmedCard.sessionType === 'LIVE_VIDEO' ? (
                      <button
                        onClick={() => navigate(`/session/${confirmedCard.sessionUid}`)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold bg-brand-cream text-brand-wine hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Join Live Video Session Room
                      </button>
                    ) : (
                      <a
                        href={confirmedCard.roomUrl}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold bg-brand-cream text-brand-wine hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <PhoneCall className="w-4 h-4" />
                        Click to Connect Call
                      </a>
                    )}

                    <button
                      onClick={copyCardLink}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Copy Session Link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {copied && (
              <p className="text-xs text-center text-emerald-600 font-medium">
                ✓ Session link copied to clipboard!
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 text-xs">
              <button
                onClick={() => {
                  setConfirmedCard(null);
                  setCurrentStep(1);
                }}
                className="text-brand-wine hover:underline font-semibold"
              >
                ← Book Another Session
              </button>

              <button
                onClick={() => navigate('/portal')}
                className="px-5 py-2.5 rounded-full bg-brand-charcoal text-white hover:bg-brand-wine transition-colors"
              >
                Go to My Client Portal
              </button>
            </div>
          </div>
        ) : (
          /* Step-by-Step Booking Wizard */
          <div className="editorial-card rounded-3xl p-6 sm:p-10 bg-white text-left space-y-8">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-6 border-b border-brand-wine/10 text-xs">
              <span className={`font-semibold ${currentStep === 1 ? 'text-brand-wine' : 'text-gray-400'}`}>
                1. Stage & Category
              </span>
              <span className="text-gray-300">→</span>
              <span className={`font-semibold ${currentStep === 2 ? 'text-brand-wine' : 'text-gray-400'}`}>
                2. Advisor & Time
              </span>
              <span className="text-gray-300">→</span>
              <span className={`font-semibold ${currentStep === 3 ? 'text-brand-wine' : 'text-gray-400'}`}>
                3. Intake & Confirm
              </span>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Booking Notice:</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* STEP 1: Area of Life & User Category */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-1">
                    Select the Area of Life for Guidance
                  </h3>
                  <p className="text-xs text-brand-charcoal/70">
                    Which stage best describes the challenges or transitions you wish to explore?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryId(cat.id)}
                      className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${
                        categoryId === cat.id
                          ? 'border-brand-wine bg-brand-blush/60 font-semibold shadow-sm'
                          : 'border-gray-200 hover:border-brand-wine/30 bg-white'
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-brand-wine mt-1.5 shrink-0"></div>
                      <div>
                        <strong className="block text-brand-charcoal">{cat.name}</strong>
                        <span className="text-[11px] text-brand-charcoal/70 font-normal line-clamp-1">
                          {cat.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* User Category Selection & Live Price */}
                <div className="pt-4 border-t border-brand-wine/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                        Your Client Category & Subsidized Pricing
                      </h4>
                      <p className="text-[11px] text-brand-charcoal/60">
                        We offer dedicated subsidized tiers for students and homemakers.
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500 uppercase block">Calculated Fee</span>
                      <strong className="font-serif text-2xl font-bold text-brand-wine">
                        ₹{applicablePrice}
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { key: 'STUDENT', label: 'Student', price: '₹500', icon: <GraduationCap className="w-4 h-4" /> },
                      { key: 'HOMEMAKER', label: 'Homemaker', price: '₹1,000', icon: <HomeIcon className="w-4 h-4" /> },
                      { key: 'PROFESSIONAL', label: 'Professional', price: '₹2,000', icon: <Briefcase className="w-4 h-4" /> },
                      { key: 'OTHER', label: 'Other Individual', price: '₹1,500', icon: <User className="w-4 h-4" /> },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setUserCategory(item.key as any)}
                        className={`p-3 rounded-xl border text-center text-xs transition-all ${
                          userCategory === item.key
                            ? 'border-brand-wine bg-brand-wine text-white font-semibold shadow-sm'
                            : 'border-gray-200 hover:border-brand-wine/30 bg-white text-brand-charcoal'
                        }`}
                      >
                        <div className="flex justify-center mb-1">{item.icon}</div>
                        <p className="font-medium">{item.label}</p>
                        <p className={`text-[11px] mt-0.5 ${userCategory === item.key ? 'text-brand-gold-light' : 'text-brand-wine font-semibold'}`}>
                          {item.price}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!categoryId) {
                        setErrorMessage('Please choose an area of life to proceed.');
                        return;
                      }
                      setErrorMessage(null);
                      setCurrentStep(2);
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all flex items-center gap-2"
                  >
                    <span>Continue to Advisor & Calendar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Advisor, Mode & Slot Selection */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-0.5">
                      Choose Advisor & Appointment Slot
                    </h3>
                    <p className="text-xs text-brand-charcoal/70">
                      Slots are strictly timezone-aware with automatic 15-minute buffer periods.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-brand-wine hover:underline font-medium"
                  >
                    ← Back to Stage
                  </button>
                </div>

                {/* Advisor Selector */}
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal mb-2">
                    Select Guidance Counselor:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAdvisorId('')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-3 ${
                        advisorId === ''
                          ? 'border-brand-wine bg-brand-blush/60 font-semibold'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-wine/10 flex items-center justify-center text-brand-wine font-bold text-xs">
                        Auto
                      </div>
                      <div>
                        <strong className="block text-brand-charcoal">Any Available Senior Mentor</strong>
                        <span className="text-[11px] text-gray-500 font-normal">Next available specialist in this area</span>
                      </div>
                    </button>

                    {advisors.map((adv) => (
                      <button
                        key={adv.id}
                        type="button"
                        onClick={() => setAdvisorId(adv.id)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-3 ${
                          advisorId === adv.id
                            ? 'border-brand-wine bg-brand-blush/60 font-semibold'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <img
                          src={adv.avatarUrl}
                          alt={adv.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0"
                        />
                        <div>
                          <strong className="block text-brand-charcoal">{adv.name}</strong>
                          <span className="text-[11px] text-gray-500 font-normal line-clamp-1">{adv.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Session Mode Selector */}
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal mb-2">
                    Session Format:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSessionType('LIVE_VIDEO')}
                      className={`p-3 rounded-xl border text-center text-xs flex items-center justify-center gap-2 transition-all ${
                        sessionType === 'LIVE_VIDEO'
                          ? 'border-brand-wine bg-brand-blush text-brand-wine font-semibold'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <Video className="w-4 h-4 text-brand-wine" />
                      <span>Live Video Session</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSessionType('PHONE_CALL')}
                      className={`p-3 rounded-xl border text-center text-xs flex items-center justify-center gap-2 transition-all ${
                        sessionType === 'PHONE_CALL'
                          ? 'border-brand-wine bg-brand-blush text-brand-wine font-semibold'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <PhoneCall className="w-4 h-4 text-brand-wine" />
                      <span>Private Telephone Call</span>
                    </button>
                  </div>
                </div>

                {/* Calendar Date & Slot Picker */}
                <div className="pt-2 border-t border-brand-wine/10 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <label className="block text-xs font-semibold text-brand-charcoal">
                      Select Date (IST Timezone):
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-brand-charcoal block mb-2">
                      Available Time Slots:
                    </span>
                    {loadingSlots ? (
                      <p className="text-xs text-gray-400 italic">Checking schedule & collision buffers...</p>
                    ) : availableSlots.length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No available slots for this date. Please pick another date.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {availableSlots.map((slot) => {
                          const isSelected = selectedSlot?.time === slot.time;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!slot.isAvailable}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                                !slot.isAvailable
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'bg-brand-wine text-white border-brand-wine shadow-sm font-semibold'
                                  : 'bg-white hover:bg-brand-blush/40 text-brand-charcoal border-gray-200'
                              }`}
                            >
                              <div className="flex items-center justify-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{slot.time} IST</span>
                              </div>
                              <span className="text-[10px] block opacity-80">
                                {slot.isAvailable ? 'Available' : 'Booked'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-gray-500 hover:text-brand-wine"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedSlot) {
                        setErrorMessage('Please click an available time slot to proceed.');
                        return;
                      }
                      setErrorMessage(null);
                      setCurrentStep(3);
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all flex items-center gap-2"
                  >
                    <span>Proceed to Intake Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Intake Form & Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-0.5">
                      Confidential Intake Details
                    </h3>
                    <p className="text-xs text-brand-charcoal/70">
                      Answers are accessible strictly to your assigned guidance counselor.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-brand-wine hover:underline font-medium"
                  >
                    ← Back to Calendar
                  </button>
                </div>

                {/* Client Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none"
                    />
                  </div>
                </div>

                {/* Free Text Concern with Word Limit Counter */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-brand-charcoal">
                      Brief description of your concern (Max 250 words) *
                    </label>
                    <span className={`text-[11px] font-mono ${wordCount > maxWords ? 'text-rose-600 font-bold' : 'text-gray-400'}`}>
                      {wordCount} / {maxWords} words
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={concernSummary}
                    onChange={(e) => setConcernSummary(e.target.value)}
                    placeholder="Briefly describe what you are feeling stuck on or what family conversation you wish to navigate..."
                    className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                      wordCount > maxWords
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-gray-200 focus:ring-brand-wine'
                    }`}
                  />
                </div>

                {/* Mandatory Consent Checkboxes */}
                <div className="space-y-3 pt-2 border-t border-brand-wine/10 text-xs text-brand-charcoal/80">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="ageCheck"
                      checked={ageConfirmed}
                      onChange={(e) => setAgeConfirmed(e.target.checked)}
                      className="mt-0.5 rounded text-brand-wine focus:ring-brand-wine"
                    />
                    <label htmlFor="ageCheck">
                      I confirm that I am 18 years of age or older.
                    </label>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="medicalCheck"
                      checked={medicalAcknowledged}
                      onChange={(e) => setMedicalAcknowledged(e.target.checked)}
                      className="mt-0.5 rounded text-brand-wine focus:ring-brand-wine"
                    />
                    <label htmlFor="medicalCheck">
                      I understand that Ji Le Zara provides social guidance and interpersonal coaching, not psychiatric diagnosis or emergency psychiatric intervention.
                    </label>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-brand-cream/60 border border-brand-wine/10 text-[11px]">
                    <input
                      type="checkbox"
                      id="recCheck"
                      checked={recordingConsent}
                      onChange={(e) => setRecordingConsent(e.target.checked)}
                      className="mt-0.5 rounded text-brand-wine focus:ring-brand-wine"
                    />
                    <label htmlFor="recCheck">
                      <strong>Optional Recording Consent:</strong> I permit recording strictly for mentor session review. I understand recordings are private, never public, and auto-deleted in 90 days. (Leave unchecked for an unrecorded session).
                    </label>
                  </div>
                </div>

                {/* Final Booking & Payment CTA */}
                <div className="p-4 rounded-2xl bg-brand-blush/40 border border-brand-wine/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-brand-charcoal/70 block">
                      Total Payable Fee ({userCategory}):
                    </span>
                    <strong className="font-serif text-2xl font-bold text-brand-wine">
                      ₹{applicablePrice} INR
                    </strong>
                    <span className="text-[10px] text-gray-500 block">
                      Verified server-side via Razorpay & Azure
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={isSubmitting || wordCount > maxWords || !clientName || !clientEmail}
                    onClick={handleBookingSubmit}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-soft"
                  >
                    <CheckCircle className="w-4 h-4 text-brand-gold-light" />
                    {isSubmitting ? 'Securing Booking...' : `Confirm Booking & Issue Live Card`}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
