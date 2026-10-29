import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { 
  Check, 
  HelpCircle, 
  ArrowRight, 
  Calendar, 
  MessageSquare, 
  GraduationCap, 
  Home as HomeIcon, 
  Briefcase, 
  User, 
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react';

export const Plans: React.FC = () => {
  const [selectedUserCategory, setSelectedUserCategory] = useState<'STUDENT' | 'HOMEMAKER' | 'PROFESSIONAL' | 'OTHER'>('HOMEMAKER');

  // Plan B Submission state
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    categoryId: '',
    concernSummary: '',
    preferredLanguage: 'Hindi',
    preferredContact: 'Phone',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const wordCount = formData.concernSummary.trim().split(/\s+/).filter(Boolean).length;
  const maxWords = 250;

  const handlePlanBSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (wordCount > maxWords) {
      setSubmitError(`Word limit exceeded: Maximum ${maxWords} words allowed (current: ${wordCount} words).`);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitAdvisoryRequest({
        ...formData,
        clientCategory: selectedUserCategory,
      });

      if (res.success) {
        setSubmitSuccess(res.message || 'Your advisory request has been submitted successfully.');
        setFormData({
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          categoryId: '',
          concernSummary: '',
          preferredLanguage: 'Hindi',
          preferredContact: 'Phone',
        });
      } else {
        setSubmitError(res.message || 'Failed to submit request.');
      }
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pricing based on active user category selection
  const pricing = {
    STUDENT: {
      label: 'Student / Youth',
      badge: 'Inclusive Rate (Verification Required)',
      planAPrice: '₹500',
      planBPrice: '₹800',
      seriesPrice: '₹1,800',
      note: 'Student ID or university enrollment verification collected only for discount approval.',
    },
    HOMEMAKER: {
      label: 'Homemaker / Housewife',
      badge: 'Subsidized Dedicated Community Tier',
      planAPrice: '₹1,000',
      planBPrice: '₹1,500',
      seriesPrice: '₹3,500',
      note: 'Honoring mothers and homemakers who nurture families every single day.',
    },
    PROFESSIONAL: {
      label: 'Working Professional',
      badge: 'Standard Executive Tier',
      planAPrice: '₹2,000',
      planBPrice: '₹2,800',
      seriesPrice: '₹6,500',
      note: 'Focusing on career-life balance, stress decompression, and mindful personal alignment.',
    },
    OTHER: {
      label: 'Other Individuals / Elders',
      badge: 'Standard Tier',
      planAPrice: '₹1,500',
      planBPrice: '₹2,200',
      seriesPrice: '₹5,000',
      note: 'General individuals, retirees, and crossroads seekers.',
    },
  };

  const activePricing = pricing[selectedUserCategory];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-brand-blush/30 py-16 border-b border-brand-wine/10 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-badge text-xs uppercase tracking-wider font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Honest, Transparent Guidance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-wine font-bold leading-tight">
            Coaching & Guidance Plans
          </h1>
          <p className="text-base sm:text-lg text-brand-charcoal/80 max-w-2xl mx-auto leading-relaxed">
            Every human journey is unique. We provide two structured guidance paths with category-based fair pricing for students, homemakers, and professionals.
          </p>

          {/* Interactive User Category Switcher */}
          <div className="pt-6">
            <p className="text-xs uppercase tracking-wider text-brand-charcoal/60 font-semibold mb-3">
              Select Your Category to View Tailored Starting Prices:
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-brand-wine/20 shadow-sm">
              <button
                onClick={() => setSelectedUserCategory('STUDENT')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedUserCategory === 'STUDENT'
                    ? 'bg-brand-wine text-white shadow-sm'
                    : 'text-brand-charcoal hover:bg-brand-blush/40'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </button>

              <button
                onClick={() => setSelectedUserCategory('HOMEMAKER')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedUserCategory === 'HOMEMAKER'
                    ? 'bg-brand-wine text-white shadow-sm'
                    : 'text-brand-charcoal hover:bg-brand-blush/40'
                }`}
              >
                <HomeIcon className="w-4 h-4" />
                <span>Homemaker / Housewife</span>
              </button>

              <button
                onClick={() => setSelectedUserCategory('PROFESSIONAL')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedUserCategory === 'PROFESSIONAL'
                    ? 'bg-brand-wine text-white shadow-sm'
                    : 'text-brand-charcoal hover:bg-brand-blush/40'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Working Professional</span>
              </button>

              <button
                onClick={() => setSelectedUserCategory('OTHER')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedUserCategory === 'OTHER'
                    ? 'bg-brand-wine text-white shadow-sm'
                    : 'text-brand-charcoal hover:bg-brand-blush/40'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Other Individual</span>
              </button>
            </div>
            <p className="text-xs text-brand-gold-muted mt-2 italic">
              Currently viewing proposed rates for: <strong>{activePricing.label}</strong> ({activePricing.badge})
            </p>
          </div>
        </div>
      </section>

      {/* Two Main Plans Comparison Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Plan A: Direct Guidance */}
          <div className="editorial-card rounded-3xl p-8 bg-white border-2 border-brand-wine/15 flex flex-col justify-between text-left relative">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-brand-wine/10">
                <div>
                  <span className="px-3 py-1 rounded-full bg-brand-blush text-brand-wine text-xs font-bold uppercase tracking-wider">
                    Plan A
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-2">
                    Direct Guidance
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Proposed Price</span>
                  <span className="font-serif text-3xl font-bold text-brand-wine">
                    {activePricing.planAPrice}
                  </span>
                  <span className="text-[11px] text-gray-400 block">/ 60-min session</span>
                </div>
              </div>

              <p className="text-sm text-brand-charcoal/75 leading-relaxed">
                For individuals who know what they are seeking and prefer to select an available counselor directly, schedule their calendar slot, and begin immediately.
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-wine">
                  What is Included:
                </h4>
                <ul className="space-y-2.5 text-xs text-brand-charcoal/80">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Select from the 7 Stages of Life directly.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Choose an available coach or mentor from our directory.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Choose between Private Phone Call or Secure Live Video Session.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Complete a brief intake form with character/word counting.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Instant Digital Live Session ID Card with join link & details.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Buffer time between sessions preventing rushed conversations.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-6">
              <Link
                to={`/book?plan=direct&category=${selectedUserCategory}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all shadow-soft"
              >
                <Calendar className="w-4 h-4 text-brand-gold-light" />
                Book Direct Guidance ({activePricing.planAPrice})
              </Link>
            </div>
          </div>

          {/* Plan B: Advisory Team Support */}
          <div className="editorial-card rounded-3xl p-8 bg-white border-2 border-brand-gold/50 shadow-gold flex flex-col justify-between text-left relative">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-brand-gold/20">
                <div>
                  <span className="px-3 py-1 rounded-full gold-badge text-brand-gold-muted text-xs font-bold uppercase tracking-wider">
                    Plan B · Recommended
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-2">
                    Advisory Team Support
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-brand-gold block">Proposed Price</span>
                  <span className="font-serif text-3xl font-bold text-brand-wine">
                    {activePricing.planBPrice}
                  </span>
                  <span className="text-[11px] text-gray-400 block">/ 2-session guided path</span>
                </div>
              </div>

              <p className="text-sm text-brand-charcoal/75 leading-relaxed">
                For individuals navigating layered relationship or family complexities who need guidance identifying the root cause, selecting the right mentor, and planning follow-up steps.
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  What is Included:
                </h4>
                <ul className="space-y-2.5 text-xs text-brand-charcoal/80">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>Submit confidential request with your concern summary.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>Authorized senior team member reviews circumstances in 24h.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>Direct match with the advisor possessing highest domain synergy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>Introductory exploratory conversation + actionable roadmap.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>Backend follow-up coordination & progress check-in.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>Full request status tracking in your client dashboard.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-6">
              <a
                href="#request-form"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold bg-brand-charcoal text-white hover:bg-brand-wine transition-all shadow-soft"
              >
                <MessageSquare className="w-4 h-4 text-brand-gold-light" />
                Submit Plan B Request ({activePricing.planBPrice})
              </a>
            </div>
          </div>

        </div>

        {/* Category Pricing Transparency Note */}
        <div className="max-w-4xl mx-auto mt-12 p-6 rounded-2xl bg-brand-blush/40 border border-brand-wine/15 text-left text-xs leading-relaxed text-brand-charcoal/80">
          <p className="font-semibold text-brand-wine mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            Transparent Category-Based Pricing Policy
          </p>
          <p>
            The amounts listed above are proposed category-based starting figures pending final administrative review. Ji Le Zara firmly believes in inclusive access: students and homemakers receive subsidized access so financial constraints never prevent someone from seeking life clarity. Discounted student pricing involves a minimal verification check, which is kept strictly confidential and never publicly displayed.
          </p>
        </div>
      </section>

      {/* Comprehensive Coaching Packages & Journeys */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="px-3 py-1 rounded-full gold-badge text-brand-gold text-xs font-bold uppercase tracking-wider">
            Curated Mentorship Packages
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-wine font-bold">
            All Journey & Session Options
          </h2>
          <p className="text-xs sm:text-sm text-brand-charcoal/70">
            Choose a single deep-dive clarity session or commit to a multi-week transformational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {[
            {
              name: 'Discovery Call',
              duration: '20 min',
              price: 'FREE',
              tag: 'First Step',
              highlight: false,
              desc: 'Introductory chemistry check to discuss your current challenges and determine if Ji Le Zara is right for you.',
              features: ['One-on-one phone consultation', 'Understand your core concerns', 'Recommendation for best guidance path', 'No obligation commitment'],
            },
            {
              name: 'Clarity Session',
              duration: '50 min',
              price: '₹1,499',
              tag: 'Single Focus',
              highlight: false,
              desc: 'Focused single session addressing an immediate decision, conflict, or overwhelming thought loop.',
              features: ['Deep dive into one specific life challenge', 'Practical mindset shifts & perspective', 'Actionable takeaways worksheet', 'Direct guidance from Dr. Dave or Senior Mentor'],
            },
            {
              name: 'Personal Coaching',
              duration: '60 min',
              price: '₹2,499',
              tag: 'Most Popular Single',
              highlight: true,
              desc: 'Intensive one-on-one session with Dr. Nilambari Dave focusing on deep emotional clarity and personal realignments.',
              features: ['Direct 1:1 with Dr. Nilambari Dave, PhD', 'Comprehensive life stage mapping', 'Personalized reflection exercises', 'Digital Live Session ID Card access'],
            },
            {
              name: 'Starter Journey',
              duration: '4 Sessions',
              price: '₹8,999',
              tag: '1 Month Path',
              highlight: false,
              desc: 'Four structured weekly sessions to build steady momentum, emotional resilience, and healthier boundary habits.',
              features: ['4 x 60-min private sessions', 'Weekly reflective homework & exercises', 'Email & WhatsApp follow-up check-ins', 'Progress review after 30 days'],
            },
            {
              name: 'Transformation Journey',
              duration: '8 Sessions',
              price: '₹16,999',
              tag: 'Complete Reset',
              highlight: true,
              desc: 'Comprehensive two-month program for deep personal evolution, healing domestic relationships, and restoring calm.',
              features: ['8 x 60-min intensive guidance sessions', 'In-depth root cause and family pattern analysis', 'Between-session priority guidance support', 'Lifelong personalized peace blueprint'],
            },
            {
              name: '7 Stages Journey',
              duration: '12 Sessions',
              price: '₹23,999',
              tag: 'Mastery Level',
              highlight: false,
              desc: 'The complete signature curriculum traversing all 7 Stages of Life from clarity to enduring purpose.',
              features: ['12 x 60-min signature sessions', 'Holistic coverage of all 7 Life Stages', 'Lifetime access to session notes & resources', 'Bi-monthly alumni check-in calls'],
            },
          ].map((pkg, idx) => (
            <div
              key={idx}
              className={`editorial-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-elevated ${
                pkg.highlight ? 'bg-white border-2 border-brand-wine shadow-soft ring-1 ring-brand-wine/10' : 'bg-white border border-brand-wine/10'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    pkg.highlight ? 'bg-brand-wine text-white' : 'bg-brand-blush text-brand-wine'
                  }`}>
                    {pkg.tag}
                  </span>
                  <span className="text-xs text-brand-charcoal/60 font-medium">
                    {pkg.duration}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-charcoal">{pkg.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-serif text-3xl font-bold text-brand-wine">{pkg.price}</span>
                    {pkg.price !== 'FREE' && <span className="text-xs text-gray-500">total</span>}
                  </div>
                </div>

                <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                  {pkg.desc}
                </p>

                <ul className="space-y-2 pt-2 border-t border-brand-wine/10 text-xs text-brand-charcoal/80">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6">
                <Link
                  to="/book"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold transition-all ${
                    pkg.highlight
                      ? 'bg-brand-wine text-white hover:bg-brand-wine-dark shadow-sm'
                      : 'bg-brand-blush/60 text-brand-wine hover:bg-brand-wine hover:text-white'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Plan B Request Submission Form */}
      <section id="request-form" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-28">
        <div className="editorial-card rounded-3xl p-6 sm:p-10 bg-white border border-brand-wine/20 shadow-elevated text-left">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="px-3 py-1 rounded-full gold-badge text-brand-gold-muted text-xs font-bold uppercase tracking-wider">
              Advisory Intake Desk
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-wine font-bold">
              Submit a Request for Advisory Team Support
            </h3>
            <p className="text-xs text-brand-charcoal/70">
              Tell us a little about your personal or relational circumstance. An authorized team member will review your details with complete discretion.
            </p>
          </div>

          {submitSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
              <p className="font-bold">✓ Request Successfully Received!</p>
              <p className="mt-1">{submitSuccess}</p>
              <p className="mt-2 font-medium">You can track this request anytime in your Client Portal.</p>
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              <p className="font-bold">Notice:</p>
              <p className="mt-1">{submitError}</p>
            </div>
          )}

          <form onSubmit={handlePlanBSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Meera Sharma"
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
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                  Preferred Language
                </label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none bg-white"
                >
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Bengali">Bengali</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                  Preferred Contact
                </label>
                <select
                  value={formData.preferredContact}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none bg-white"
                >
                  <option value="Phone">Telephone Call</option>
                  <option value="Live Video">Live Video Consultation</option>
                </select>
              </div>
            </div>

            {/* Free-text concern with live word counter */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-brand-charcoal">
                  Describe what you are navigating (up to 250 words) *
                </label>
                <span className={`text-[11px] font-mono ${wordCount > maxWords ? 'text-rose-600 font-bold' : 'text-gray-400'}`}>
                  {wordCount} / {maxWords} words
                </span>
              </div>
              <textarea
                required
                rows={4}
                value={formData.concernSummary}
                onChange={(e) => setFormData({ ...formData, concernSummary: e.target.value })}
                placeholder="Share a brief overview of your current family tension, personal dilemma, or emotional state so our senior intake team can evaluate the best guidance approach..."
                className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                  wordCount > maxWords
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                    : 'border-gray-200 focus:ring-brand-wine'
                }`}
              />
              {wordCount > maxWords && (
                <p className="text-[11px] text-rose-600 mt-1">
                  Please edit your message to be under {maxWords} words. Concise descriptions allow our advisory team to quickly identify key themes.
                </p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-brand-cream/60 border border-brand-wine/10 text-[11px] text-brand-charcoal/70 flex items-start gap-2">
              <input type="checkbox" required id="consentAdv" className="mt-0.5 rounded text-brand-wine focus:ring-brand-wine" />
              <label htmlFor="consentAdv">
                I understand that Ji Le Zara provides social guidance and interpersonal coaching, not psychiatric diagnosis or emergency psychiatric intervention.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || wordCount > maxWords}
              className="w-full py-3.5 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4 text-brand-gold-light" />
              {isSubmitting ? 'Submitting to Advisory Intake...' : 'Submit Request for Advisory Team Review'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
