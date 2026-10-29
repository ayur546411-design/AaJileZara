import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { HeroSlider } from '../components/HeroSlider';
import { 
  ArrowRight, 
  Check, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Video, 
  PhoneCall, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Home as HomeIcon, 
  Sparkles, 
  Award,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  Compass
} from 'lucide-react';

export const Home: React.FC = () => {
  const [selectedUserCategory, setSelectedUserCategory] = useState<'ALL' | 'STUDENT' | 'HOMEMAKER' | 'PROFESSIONAL'>('ALL');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const audiences = [
    {
      icon: <GraduationCap className="w-6 h-6 text-brand-wine" />,
      title: 'Students & Youth',
      desc: 'Career clarity, confidence, self-worth, decision frameworks, and emotional resilience.',
      badge: 'Subsidized from ₹500',
      link: '/book?category=student',
    },
    {
      icon: <Briefcase className="w-6 h-6 text-brand-wine" />,
      title: 'Working Professionals',
      desc: 'Leadership dilemmas, career transitions, work-life boundaries, and workplace calm.',
      badge: 'Executive & Career Tier',
      link: '/book?category=professional',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-brand-gold" />,
      title: 'Women at Every Stage',
      desc: 'Reclaiming personal voice, identity evolution, empty-nest transitions, and self-assurance.',
      badge: 'Homemaker Tier from ₹1,000',
      link: '/book?category=homemaker',
    },
    {
      icon: <Heart className="w-6 h-6 text-brand-wine" />,
      title: 'Couples & Relationships',
      desc: 'Interpersonal understanding, resolving emotional friction, pre-marital & domestic harmony.',
      badge: 'Couples Guidance Session',
      link: '/book?category=relationships',
    },
    {
      icon: <HomeIcon className="w-6 h-6 text-brand-wine" />,
      title: 'Parents & Families',
      desc: 'Parenting in a hyper-connected digital world (Parenting 4.0) and intergenerational calm.',
      badge: 'Family Consultation',
      link: '/book?category=parenting',
    },
    {
      icon: <Award className="w-6 h-6 text-brand-gold" />,
      title: 'Seniors & Retirees',
      desc: 'Navigating life transitions, rediscovering purpose, intergenerational joy, and peace of mind.',
      badge: 'Senior Life Transition',
      link: '/book?category=seniors',
    },
  ];

  const stages = [
    {
      num: 1,
      icon: <Sparkles className="w-5 h-5 text-brand-wine" />,
      title: 'Mental Clarity & Emotional Balance',
      desc: 'Manage thoughts, reduce overthinking, and build calm through Soch se Shanti Tak.',
    },
    {
      num: 2,
      icon: <Heart className="w-5 h-5 text-brand-wine" />,
      title: 'Meaningful Relationships',
      desc: 'Nurture healthier connections with family, friends, and loved ones without resentment.',
    },
    {
      num: 3,
      icon: <Compass className="w-5 h-5 text-brand-gold" />,
      title: 'Relationship Clarity',
      desc: 'Reflect on compatibility, personal values, and emotional readiness before major decisions.',
    },
    {
      num: 4,
      icon: <UserCheck className="w-5 h-5 text-brand-wine" />,
      title: 'Confidence & Self-Growth',
      desc: 'Build communication skills, release comparison, and discover grounded self-assurance.',
    },
    {
      num: 5,
      icon: <Briefcase className="w-5 h-5 text-brand-gold" />,
      title: 'Career & Workplace Success',
      desc: 'Navigate leadership dilemmas, workplace transitions, and balanced professional growth.',
    },
    {
      num: 6,
      icon: <HomeIcon className="w-5 h-5 text-brand-wine" />,
      title: 'Parenting 4.0',
      desc: 'Explore screen time, digital well-being, and peaceful parent-adolescent understanding.',
    },
    {
      num: 7,
      icon: <Award className="w-6 h-6 text-brand-gold" />,
      title: 'Purpose & Meaning of Life',
      desc: 'Reflect on personal priorities, future roadmap, and designing a peaceful, fulfilling life.',
    },
  ];

  const packages = [
    {
      tag: '15 Minutes',
      icon: <Calendar className="w-6 h-6 text-brand-gold-light" />,
      title: 'Discovery Call',
      desc: 'A zero-obligation, introductory conversation to discuss what you are navigating and explore mentorship fit.',
      price: 'FREE',
      featured: true,
      buttonText: 'Book Free Discovery',
      link: '/book?package=discovery',
    },
    {
      tag: '45 Minutes',
      icon: <Sparkles className="w-6 h-6 text-brand-wine" />,
      title: 'Clarity Session',
      desc: 'Focused single-session clarity on an immediate emotional, relational, or family transition dilemma.',
      price: '₹1,499',
      studentPrice: '₹500',
      homemakerPrice: '₹1,000',
      featured: false,
      buttonText: 'Enquire / Book',
      link: '/book?package=clarity',
    },
    {
      tag: '60 Minutes',
      icon: <UserCheck className="w-6 h-6 text-brand-wine" />,
      title: 'Personal Coaching',
      desc: 'One-to-one deep dive guidance with Dr. Nilambari Dave or a dedicated senior advisory counselor.',
      price: '₹2,499',
      studentPrice: '₹800',
      homemakerPrice: '₹1,500',
      featured: false,
      buttonText: 'Enquire / Book',
      link: '/book?package=personal',
    },
    {
      tag: '4 × 60-min sessions',
      icon: <Compass className="w-6 h-6 text-brand-wine" />,
      title: 'Starter Journey',
      desc: 'Build lasting reflective habits, emotional calm, and steady life momentum through continuous mentorship.',
      price: '₹8,999',
      featured: false,
      buttonText: 'Enquire / Book',
      link: '/book?package=starter',
    },
    {
      tag: '8 × 60-min sessions',
      icon: <Award className="w-6 h-6 text-brand-wine" />,
      title: 'Transformation Journey',
      desc: 'A comprehensive, multi-month guided roadmap for navigating major domestic, relational, or career transitions.',
      price: '₹16,999',
      featured: false,
      buttonText: 'Enquire / Book',
      link: '/book?package=transformation',
    },
    {
      tag: '12 × 60-min sessions',
      icon: <Sparkles className="w-6 h-6 text-brand-gold" />,
      title: '7 Stages of Life',
      desc: 'Our flagship signature curriculum exploring all 7 foundational life dimensions for enduring peace of mind.',
      price: '₹23,999',
      featured: true,
      buttonText: 'Enquire / Book',
      link: '/book?package=7stages',
    },
    {
      tag: '60 Minutes',
      icon: <Heart className="w-6 h-6 text-brand-wine" />,
      title: 'Couples / Parent–Child',
      desc: 'Joint session for interpersonal reconciliation, boundary repair, and collaborative family communication.',
      price: '₹2,999',
      featured: false,
      buttonText: 'Enquire / Book',
      link: '/book?package=couples',
    },
  ];

  const faqs = [
    {
      q: 'Is this counselling or therapy?',
      a: 'No. Ji Le Zara provides coaching and mentoring for personal development, relationships, and life transitions. It does not diagnose or treat medical or psychiatric mental-health conditions.',
    },
    {
      q: 'Are sessions online?',
      a: 'Yes. Sessions are conducted via secure live video or private telephone appointments according to your preference.',
    },
    {
      q: 'Will my session be recorded?',
      a: 'Recordings are strictly disabled by default. A session is recorded only after explicit opt-in consent from all participants. Consented recordings are held in private Azure cloud storage and automatically deleted after 90 days. You may always choose an unrecorded consultation.',
    },
    {
      q: 'How do I book and pay?',
      a: 'Select your preferred guidance package or free discovery call through our online booking wizard. Available calendar slots and instant payment verification are provided with transparent category pricing.',
    },
  ];

  return (
    <div className="space-y-24 pb-20 text-left">
      {/* ======================================================== */}
      {/* 1. HERO SLIDER (Skytercel-style carousel) */}
      {/* ======================================================== */}
      <HeroSlider />

      {/* ======================================================== */}
      {/* 2. MEET YOUR MENTOR (Skytercel Split Section) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-[2.5px] font-bold text-brand-wine">
              Meet your mentor
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-bold leading-tight">
              Dr. Nilambari Dave, PhD
            </h2>
            <p className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
              Former Vice-Chancellor · Former Dean, School of Home Science
            </p>
            <p className="text-base text-[#574b48] leading-relaxed">
              With <strong>38+ years of academic and leadership experience</strong>, Dr. Dave offers a thoughtful, experience-led approach to mentoring and life coaching for people navigating personal, professional and relationship decisions.
            </p>

            {/* Fact Pills */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="bg-white border border-[#e8d6c5] px-4 py-2.5 rounded-xl text-xs font-bold text-brand-charcoal shadow-sm">
                38+ Years of Experience
              </span>
              <span className="bg-white border border-[#e8d6c5] px-4 py-2.5 rounded-xl text-xs font-bold text-brand-charcoal shadow-sm">
                Academic Leadership
              </span>
              <span className="bg-white border border-[#e8d6c5] px-4 py-2.5 rounded-xl text-xs font-bold text-brand-charcoal shadow-sm">
                Personalised Guidance
              </span>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold border border-brand-wine text-brand-wine hover:bg-brand-blush transition-colors"
              >
                <span>Read Dr. Dave's Background & Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Large Editorial Quote Card */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#fffaf5] border-l-4 border-brand-gold border border-[#ecdcd0] shadow-soft space-y-4">
              <blockquote className="font-serif italic text-2xl sm:text-3xl text-brand-wine leading-snug">
                “Life doesn’t stop at any age. Sometimes, it simply asks us to begin again.”
              </blockquote>
              <div className="pt-2">
                <strong className="block text-sm text-brand-charcoal">— Dr. Nilambari Dave, PhD</strong>
                <span className="text-xs text-brand-charcoal/70">Founder & Principal Mentor, Ji Le Zara</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. WHO CAN BENEFIT? (Skytercel-Inspired Card Architecture) */}
      {/* ======================================================== */}
      <section className="bg-[#f8eee8]/60 py-24 border-y border-[#ecdcd0] relative overflow-hidden">
        {/* Subtle decorative background flourishes inspired by Skytercel */}
        <div className="absolute top-10 left-4 text-brand-gold/15 text-7xl select-none pointer-events-none font-serif">
          🌿
        </div>
        <div className="absolute bottom-10 right-4 text-brand-gold/15 text-7xl select-none pointer-events-none font-serif rotate-180">
          🌿
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-xs uppercase tracking-[2.5px] font-bold text-brand-wine">
              For Every Stage of Life
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-bold">
              Who Can Benefit?
            </h2>

            {/* Skytercel botanical accent divider */}
            <div className="flex items-center justify-center gap-3 my-2">
              <span className="h-px w-16 bg-brand-gold/40" />
              <span className="text-brand-gold text-base">✦ 🌿 ✦</span>
              <span className="h-px w-16 bg-brand-gold/40" />
            </div>

            <p className="text-base text-[#675b59] leading-relaxed">
              A supportive, confidential sanctuary to pause, reflect, find clarity, and move forward with grounded confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 pt-4">
            {audiences.map((aud) => (
              <Card
                key={aud.title}
                icon={aud.icon}
                title={aud.title}
                description={aud.desc}
                badge={aud.badge}
                link={aud.link}
                buttonText="Enquire / Book"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. THE 7 STAGES OF LIFE (Skytercel-Inspired Signature Architecture) */}
      {/* ======================================================== */}
      <section className="py-24 border-b border-[#ecdcd0] relative overflow-hidden bg-[#fffdfa]">
        {/* Subtle decorative background leaves inspired by Skytercel */}
        <div className="absolute top-12 left-4 text-brand-gold/15 text-7xl select-none pointer-events-none font-serif">
          🌿
        </div>
        <div className="absolute bottom-12 right-4 text-brand-gold/15 text-7xl select-none pointer-events-none font-serif rotate-180">
          🌿
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="text-xs uppercase tracking-[2.5px] font-bold text-brand-wine">
              Signature Programme
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-bold">
              The 7 Stages of Life
            </h2>

            {/* Botanical Accent Divider */}
            <div className="flex items-center justify-center gap-3 my-2">
              <span className="h-px w-16 bg-brand-gold/40" />
              <span className="text-brand-gold text-base">✦ 🌿 ✦</span>
              <span className="h-px w-16 bg-brand-gold/40" />
            </div>

            <p className="text-base text-[#675b59] leading-relaxed">
              A reflective, holistic coaching curriculum from Overthinking to Peaceful Presence (<em>Soch se Shanti Tak</em>) — structured personal development across every milestone of adult life.
            </p>
          </div>

          {/* Cards Grid: Stages 1 to 6 in a 3-column balanced grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {stages.slice(0, 6).map((st) => (
              <div
                key={st.num}
                className="rounded-[22px] bg-white border border-[#ecdcd0] p-6 sm:p-7 shadow-soft hover:shadow-elevated hover:border-brand-gold/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blush text-brand-wine flex items-center justify-center group-hover:bg-brand-wine group-hover:text-white transition-all duration-300 shadow-xs">
                      {st.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-brand-cream border border-brand-gold/30 text-brand-gold">
                      Stage 0{st.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-charcoal group-hover:text-brand-wine transition-colors mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#675b59] leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#ecdcd0]/40 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-brand-wine group-hover:text-brand-gold transition-colors">
                    Dimension 0{st.num}
                  </span>
                  <div className="w-10 h-1 bg-brand-wine/50 rounded-full group-hover:w-16 group-hover:bg-brand-gold transition-all duration-300" />
                </div>
              </div>
            ))}

            {/* Stage 7: Full-Width Pinnacle Milestone Card */}
            {stages[6] && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 rounded-[24px] p-7 sm:p-9 bg-gradient-to-r from-[#FFFDF9] via-[#FFF7EC] to-[#FFFDF9] border-2 border-brand-gold shadow-gold flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-elevated transition-all duration-300 group">
                <div className="flex items-start sm:items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-wine to-[#9B1B4A] text-brand-gold-light flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    {stages[6].icon}
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-wine text-white mb-1 shadow-xs">
                      <span>Stage 07 · The Pinnacle Milestone</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal group-hover:text-brand-wine transition-colors">
                      {stages[6].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#675b59] max-w-2xl leading-relaxed">
                      {stages[6].desc}
                    </p>
                  </div>
                </div>

                <Link
                  to="/stages-of-life"
                  className="px-6 py-3 rounded-full text-xs font-bold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all shadow-sm shrink-0 inline-flex items-center gap-2 hover:shadow-soft"
                >
                  <span>Explore All 7 Stages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Skytercel-Inspired 3-Step Guided Path */}
          <div className="mt-16 pt-10 border-t border-[#ecdcd0]/60 max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="h-px w-20 bg-brand-gold/40" />
              <span className="text-xs uppercase tracking-[2px] font-bold text-brand-gold font-serif">
                A Simple 3-Step Path to Peaceful Presence
              </span>
              <span className="h-px w-20 bg-brand-gold/40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#ecdcd0] shadow-xs hover:border-brand-gold/60 transition-colors">
                <div className="w-11 h-11 rounded-full bg-brand-wine text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  1
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-brand-charcoal">Connect & Discovery</h4>
                  <p className="text-xs text-[#675b59] mt-1 leading-relaxed">
                    Begin with a complimentary 20-minute call to share your journey and explore alignment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#ecdcd0] shadow-xs hover:border-brand-gold/60 transition-colors">
                <div className="w-11 h-11 rounded-full bg-brand-gold text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  2
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-brand-charcoal">Reflect & Realign</h4>
                  <p className="text-xs text-[#675b59] mt-1 leading-relaxed">
                    Engage in structured, one-on-one sessions applying Dr. Dave's research-backed frameworks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#ecdcd0] shadow-xs hover:border-brand-gold/60 transition-colors">
                <div className="w-11 h-11 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  3
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-brand-charcoal">Soch se Shanti Tak</h4>
                  <p className="text-xs text-[#675b59] mt-1 leading-relaxed">
                    Return to mental stillness, renewed self-worth, and domestic calm in daily living.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. COACHING PACKAGES & TRANSPARENT PRICING */}
      {/* ======================================================== */}
      <section className="bg-[#f8eee8] py-20 border-y border-[#ecdcd0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs uppercase tracking-[2.5px] font-bold text-brand-wine">
              Invest in yourself
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-bold">
              Coaching Packages
            </h2>
            <p className="text-base text-[#675b59] leading-relaxed">
              Choose a session or a structured journey that fits your needs. Subsidized student rates from ₹500 and homemaker rates from ₹1,000 available.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 pt-4">
            {packages.map((pkg) => (
              <Card
                key={pkg.title}
                icon={pkg.icon}
                tag={pkg.tag}
                title={pkg.title}
                description={pkg.desc}
                price={pkg.price}
                secondaryPrice={
                  pkg.studentPrice
                    ? `Subsidized: Student ${pkg.studentPrice} · Homemaker ${pkg.homemakerPrice}`
                    : undefined
                }
                link={pkg.link}
                buttonText={pkg.buttonText}
                featured={pkg.featured}
              />
            ))}
          </div>

          <p className="text-xs text-center text-[#735e59] mt-8">
            Prices shown in INR. Subsidized rates for students (₹500) and homemakers (₹1,000) configured directly in our booking desk.
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. BOOKING SECTION (Skytercel Wine Gradient Card) */}
      {/* ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-[24px] bg-gradient-to-br from-[#6e0c32] to-[#971b4b] p-8 sm:p-14 text-white shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Reassurance */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-[2.5px] font-bold text-[#efc991]">
                Your next chapter starts here
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Book a Free 15-Minute Discovery Call
              </h2>
              <p className="text-sm text-[#f8dce6] leading-relaxed">
                Tell us a little about what you would like to explore. We will connect you directly with Dr. Nilambari Dave or an assigned mentor for a confidential conversation.
              </p>

              <div className="space-y-2 pt-2 text-xs text-[#f8dce6]">
                <p><strong>Online coaching only:</strong> Video or audio by appointment</p>
                <p>For enquiries: <a href="mailto:hello@jilezara.com" className="underline text-brand-gold-light">hello@jilezara.com</a></p>
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs text-[#f8dce6]/90">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold-light" /> No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold-light" /> Instant confirmation
                </span>
              </div>
            </div>

            {/* Right Column: Instant Booking Launch Card */}
            <div className="lg:col-span-6 bg-[#fffaf5] text-brand-charcoal rounded-[22px] p-6 sm:p-8 space-y-5 shadow-lg">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-wine">
                  Request Your Session
                </h3>
                <p className="text-xs text-brand-charcoal/70 mt-0.5">
                  Schedule directly with real-time calendar slot selection and instant Digital Live Session ID Card generation.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-brand-cream border border-brand-wine/10 flex items-center justify-between">
                  <span>Selected Mentor:</span>
                  <strong>Dr. Nilambari Dave, PhD</strong>
                </div>
                <div className="p-3 rounded-xl bg-brand-cream border border-brand-wine/10 flex items-center justify-between">
                  <span>Consultation Fee:</span>
                  <strong className="text-emerald-700 font-bold">100% Free Discovery (15 Mins)</strong>
                </div>
                <div className="p-3 rounded-xl bg-brand-cream border border-brand-wine/10 flex items-center justify-between">
                  <span>Session Formats:</span>
                  <span>Secure Live Video or Telephone</span>
                </div>
              </div>

              <Link
                to="/book?package=discovery"
                className="w-full py-3.5 rounded-full text-xs font-bold tracking-wide bg-brand-wine text-white hover:bg-brand-wine-dark transition-all flex items-center justify-center gap-2 shadow-soft"
              >
                <Calendar className="w-4 h-4 text-brand-gold-light" />
                <span>Launch Interactive Booking Desk →</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      {/* ======================================================== */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="text-center mb-10 space-y-2">
          <div className="text-xs uppercase tracking-[2.5px] font-bold text-brand-wine">
            Common Inquiries
          </div>
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[#e8d6c5] rounded-2xl bg-white overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full p-5 text-left text-sm font-bold text-brand-charcoal flex items-center justify-between hover:bg-brand-cream/40"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-brand-wine transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === i && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#544a46] leading-relaxed border-t border-[#e8d6c5]/50 transition-all duration-200 ease-out">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-brand-blush/60 text-brand-wine hover:bg-brand-wine hover:text-white transition-all shadow-sm"
          >
            <span>Have more questions? Visit our complete FAQ & Legal Knowledge Base</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. POLICIES & CLIENT INFORMATION PANEL */}
      {/* ======================================================== */}
      <section className="bg-[#f8eee8] py-16 border-t border-[#ecdcd0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Policies & Client Information
            </h2>
            <p className="text-xs text-[#675b59]">
              Ethical clarity, confidentiality, and data rights governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white border border-[#ecdcd0] p-6 rounded-2xl space-y-2">
              <h3 className="font-serif text-base font-bold text-brand-wine">Terms of Service</h3>
              <p className="text-[#544a46] leading-relaxed">
                Services are provided by Dr. Nilambari Dave, PhD, operating Ji Le Zara as a mentoring service. Coaching is educational and developmental, not a substitute for medical or psychiatric treatment.
              </p>
            </div>

            <div className="bg-white border border-[#ecdcd0] p-6 rounded-2xl space-y-2">
              <h3 className="font-serif text-base font-bold text-brand-wine">Privacy & Confidentiality</h3>
              <p className="text-[#544a46] leading-relaxed">
                Enquiry details are used strictly to provide services. Intake answers are held under strict discretion and never sold or shared with third-party advertisers.
              </p>
            </div>

            <div className="bg-white border border-[#ecdcd0] p-6 rounded-2xl space-y-2">
              <h3 className="font-serif text-base font-bold text-brand-wine">Recording & Consent (90-Day)</h3>
              <p className="text-[#544a46] leading-relaxed">
                Sessions are unrecorded by default. Recording occurs only upon separate prior consent from each participant and is permanently purged after 90 days.
              </p>
            </div>

            <div className="bg-white border border-[#ecdcd0] p-6 rounded-2xl space-y-2">
              <h3 className="font-serif text-base font-bold text-brand-wine">Cancellation & Refunds</h3>
              <p className="text-[#544a46] leading-relaxed">
                Rescheduling is accommodated with at least 24 hours’ notice. Cancellations made with advance notice receive prompt refunds processed through our verified gateway.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
