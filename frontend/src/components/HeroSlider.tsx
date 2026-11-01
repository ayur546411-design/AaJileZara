import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── slide data ─────────────────────────────────────────────── */
interface HeroSlide {
  image: string;
  alt: string;
  tagline: string;
  heading: string;
  headingAccent: string;
  bullets: string[];
  cta: { label: string; to: string };
}

const slides: HeroSlide[] = [
  {
    image: '/hero_slide_1.jpg',
    alt: 'Personalised mentoring session with Dr. Nilambari Dave',
    tagline: 'Pause · Reflect · Realign · Live Fully',
    heading: 'Personalised',
    headingAccent: 'Life Coaching',
    bullets: [
      'One-on-One Mentoring by Dr. Nilambari Dave, PhD',
      '38+ Years of Academic Leadership & Experience',
      'Confidential Online Sessions by Appointment',
      'Subsidised Rates for Students & Homemakers',
    ],
    cta: { label: 'Book Free Discovery Call', to: '/book?package=discovery' },
  },
  {
    image: '/hero_slide_2.jpg',
    alt: 'Family guidance and parenting support',
    tagline: 'Soch se Shanti Tak',
    heading: 'Stronger Families,',
    headingAccent: 'Deeper Bonds',
    bullets: [
      'Couples & Relationship Guidance',
      'Parenting 4.0 — Digital-Age Parenting',
      'Parent–Child Communication Repair',
      'Family Dynamics & Boundary Building',
    ],
    cta: { label: 'Explore Family Guidance', to: '/plans' },
  },
  {
    image: '/hero_slide_3.jpg',
    alt: 'Personal growth and self-reflection',
    tagline: 'Every Age · Every Stage · Every New Beginning',
    heading: 'Clarity, Confidence &',
    headingAccent: 'Self-Growth',
    bullets: [
      '7 Stages of Life Structured Journey',
      'Emotional Balance & Mental Clarity',
      'Career Transitions & Workplace Success',
      'Purpose, Meaning & Joyful Living',
    ],
    cta: { label: 'Start Your Journey', to: '/stages-of-life' },
  },
];

const AUTOPLAY_MS = 6000;

/* ─── component ──────────────────────────────────────────────── */
export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + slides.length) % slides.length);
  }, []);

  /* autoplay */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [current, isPaused, goTo]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#14213D] via-[#1A2C52] to-[#2C4A8A]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Soft Dhani Glow / Blob behind heading ─────────────────────────── */}
      <div 
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#B5D56A]/15 blur-3xl pointer-events-none z-10"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-[#2C4A8A]/40 blur-3xl pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* ── main slider container ─────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-20">
        <div className="relative rounded-3xl overflow-hidden my-6 sm:my-8 lg:my-10 shadow-elevated border border-white/10">
          
          {/* background gradient overlay layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/95 via-[#14213D]/85 to-transparent z-10 pointer-events-none lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#14213D]/40 to-transparent z-10 pointer-events-none hidden lg:block" />

          {/* ── slide image (full background) ─────────────── */}
          <div className="relative h-[520px] sm:h-[560px] lg:h-[520px]">
            {slides.map((s, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: idx === current ? 1 : 0 }}
              >
                <img
                  src={s.image}
                  alt={s.alt}
                  className="w-full h-full object-cover object-center"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

          {/* ── text overlay (left side) ──────────────────── */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="w-full lg:w-[58%] px-6 sm:px-10 lg:px-14 py-10">
              {/* tagline */}
              <div
                key={`tag-${current}`}
                className="inline-block text-[11px] uppercase tracking-[2.5px] font-bold text-[#B5D56A] mb-4 animate-fadeInUp"
              >
                {slide.tagline}
              </div>

              {/* heading */}
              <h1
                key={`h-${current}`}
                className="font-heading text-3xl sm:text-4xl lg:text-[2.8rem] text-white font-bold leading-[1.15] mb-6 animate-fadeInUp"
                style={{ animationDelay: '100ms' }}
              >
                {slide.heading}
                <br />
                <span className="text-[#B5D56A] italic font-normal">
                  {slide.headingAccent}
                </span>
              </h1>

              {/* bullet points */}
              <ul
                key={`ul-${current}`}
                className="space-y-2.5 mb-7 animate-fadeInUp"
                style={{ animationDelay: '200ms' }}
              >
                {slide.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={18}
                      className="text-[#B5D56A] mt-0.5 shrink-0"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm sm:text-[15px] font-medium text-white/95 leading-snug">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button: Dhani bg, Navy text, Bold, Hover lift */}
              <div
                key={`cta-${current}`}
                className="animate-fadeInUp"
                style={{ animationDelay: '300ms' }}
              >
                <Link
                  to={slide.cta.to}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-[#B5D56A] text-[#14213D] hover:bg-[#a8cc58] hover:-translate-y-0.5 hover:shadow-dhani active:translate-y-0 transition-all shadow-md"
                >
                  <span>{slide.cta.label}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── arrow buttons ─────────────────────────────── */}
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#14213D]/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#B5D56A] hover:text-[#14213D] hover:border-[#B5D56A] transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#14213D]/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#B5D56A] hover:text-[#14213D] hover:border-[#B5D56A] transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ── bottom indicator dots ─────────────────────────── */}
      <div className="flex justify-center gap-2 pb-6 relative z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-[#B5D56A]' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
