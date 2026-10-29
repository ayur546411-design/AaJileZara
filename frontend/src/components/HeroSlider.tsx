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
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffdf7] via-[#fdf7ee] to-[#f8ebdf]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── main slider container ─────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative rounded-2xl overflow-hidden my-6 sm:my-8 lg:my-10 shadow-elevated border border-[#ecdcd0]/60">
          
          {/* background gradient overlay layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fffaf1]/95 via-[#fffaf1]/80 to-transparent z-10 pointer-events-none lg:w-[55%]" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#fffaf1]/30 to-transparent z-10 pointer-events-none hidden lg:block" />

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
            <div className="w-full lg:w-[55%] px-6 sm:px-10 lg:px-14 py-10">
              {/* tagline */}
              <div
                key={`tag-${current}`}
                className="inline-block text-[11px] uppercase tracking-[2.5px] font-bold text-brand-wine mb-4 animate-fadeInUp"
              >
                {slide.tagline}
              </div>

              {/* heading */}
              <h1
                key={`h-${current}`}
                className="font-serif text-3xl sm:text-4xl lg:text-[2.8rem] text-brand-charcoal font-bold leading-[1.15] mb-6 animate-fadeInUp"
                style={{ animationDelay: '100ms' }}
              >
                {slide.heading}
                <br />
                <span className="text-brand-wine italic font-normal">
                  {slide.headingAccent}
                </span>
              </h1>

              {/* bullet points (Skytercel checkmark style) */}
              <ul
                key={`ul-${current}`}
                className="space-y-2.5 mb-7 animate-fadeInUp"
                style={{ animationDelay: '200ms' }}
              >
                {slide.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={18}
                      className="text-brand-wine mt-0.5 shrink-0"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm sm:text-[15px] font-semibold text-brand-charcoal leading-snug">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div
                key={`cta-${current}`}
                className="animate-fadeInUp"
                style={{ animationDelay: '300ms' }}
              >
                <Link
                  to={slide.cta.to}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-brand-wine text-white hover:bg-brand-wine-dark shadow-soft hover:shadow-elevated transition-all"
                >
                  {slide.cta.label}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── arrow buttons ─────────────────────────────── */}
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#ecdcd0] flex items-center justify-center text-brand-charcoal hover:bg-brand-wine hover:text-white hover:border-brand-wine transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#ecdcd0] flex items-center justify-center text-brand-charcoal hover:bg-brand-wine hover:text-white hover:border-brand-wine transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ── dot navigation ──────────────────────────────── */}
      <div className="flex justify-center gap-2.5 pb-6">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === current
                ? 'w-8 h-3 bg-brand-wine'
                : 'w-3 h-3 bg-[#d4bfb0] hover:bg-brand-gold'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
