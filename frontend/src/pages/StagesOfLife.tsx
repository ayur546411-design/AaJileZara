import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { 
  Sparkles, 
  HeartHandshake, 
  Home as HomeIcon, 
  SunMedium, 
  Compass, 
  Users, 
  ShieldCheck, 
  Calendar, 
  ArrowRight,
  Shield,
  CheckCircle2
} from 'lucide-react';

export const StagesOfLife: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getCategories()
      .then((data) => {
        if (data.success && data.categories) {
          setCategories(data.categories);
        }
      })
      .catch((err) => console.warn('Could not load categories:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const categoryDetails: Record<string, {
    symptoms: string[];
    guidanceApproach: string;
    targetAudiences: string[];
  }> = {
    'self-discovery-growth': {
      symptoms: [
        'Feeling disconnected from what you actually want in life',
        'Persistent habit of comparing yourself to peers, colleagues, or family expectations',
        'Quiet sense of unworthiness or impostor syndrome despite external accomplishments',
      ],
      guidanceApproach: 'Non-judgmental self-inquiry, values clarification, releasing inherited guilt, and anchoring self-worth in internal integrity.',
      targetAudiences: ['Young adults', 'Students', 'Individuals facing identity fatigue'],
    },
    'relationships-family': {
      symptoms: [
        'Recurring circular arguments with spouse or partner that never resolve',
        'Tension between in-laws, married children, or extended relatives',
        'Feeling unappreciated or walking on eggshells at home',
      ],
      guidanceApproach: 'De-escalation dialogue frameworks, respectful assertiveness, healthy relational boundaries, and bridging generational values without resentment.',
      targetAudiences: ['Married couples', 'Daughters-in-law / Parents', 'Siblings'],
    },
    'parenting-home-life': {
      symptoms: [
        'Exhaustion from constant battles over screen-time, studies, and adolescent rebellion',
        'Guilt over losing temper or feeling like a failing parent',
        'Difficulties aligning parenting styles between co-parents',
      ],
      guidanceApproach: 'Empathetic parent-child communication, peaceful limit-setting, validating adolescent emotions, and establishing a calm household rhythm.',
      targetAudiences: ['Mothers', 'Fathers', 'Parents of teenagers and young children'],
    },
    'emotional-wellbeing-clarity': {
      symptoms: [
        'Racing mental thoughts, chronic overthinking, and waking up with dread',
        'Carrying unprocessed grief, emotional fatigue, or feelings of inadequacy',
        'Inability to relax even in safe, quiet environments',
      ],
      guidanceApproach: 'Soch se Shanti Tak: Structured emotional unburdening, grounding practices, mindful cognitive reframing, and cultivating serene stillness.',
      targetAudiences: ['Anyone overwhelmed by mental clutter or stress'],
    },
    'life-transitions-decisions': {
      symptoms: [
        'Paralyzing fear before choosing between two major life choices',
        'Empty-nest emptiness after children leave home',
        'Anxiety around mid-life career change, relocation, or retirement readiness',
      ],
      guidanceApproach: 'Systematic decision mapping, honoring the grief of what ends, and building courage for the upcoming life chapter.',
      targetAudiences: ['Mid-life individuals', 'Retirees', 'Relocating families'],
    },
    'social-connections-communication': {
      symptoms: [
        'Feeling lonely or misunderstood even in crowded social circles',
        'Difficulty saying no to social obligations without feeling terrible guilt',
        'Social anxiety or hesitation to voice authentic opinions',
      ],
      guidanceApproach: 'Assertive yet graceful communication, cultivating authentic companionship, and releasing performative social people-pleasing.',
      targetAudiences: ['Introverts', 'Professionals', 'Homemakers seeking community'],
    },
    'purpose-balance-future': {
      symptoms: [
        'Sense that life has become a monotonous routine without deeper meaning',
        'Conflict between professional ambition and personal spiritual peace',
        'Existential restlessness about what your next decade should stand for',
      ],
      guidanceApproach: 'Holistic life ecosystem audit, aligning daily habits with personal meaning, and crafting a sustainable peace-centered roadmap.',
      targetAudiences: ['Working professionals', 'Elders', 'Crossroad seekers'],
    },
  };

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'self-discovery-growth': return <Sparkles className="w-6 h-6 text-[#6E8F1F]" />;
      case 'relationships-family': return <HeartHandshake className="w-6 h-6 text-[#14213D]" />;
      case 'parenting-home-life': return <HomeIcon className="w-6 h-6 text-[#2C4A8A]" />;
      case 'emotional-wellbeing-clarity': return <SunMedium className="w-6 h-6 text-[#6E8F1F]" />;
      case 'life-transitions-decisions': return <Compass className="w-6 h-6 text-[#14213D]" />;
      case 'social-connections-communication': return <Users className="w-6 h-6 text-[#2C4A8A]" />;
      case 'purpose-balance-future': return <ShieldCheck className="w-6 h-6 text-[#6E8F1F]" />;
      default: return <Compass className="w-6 h-6 text-[#14213D]" />;
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#EEF5D8]/40 py-16 border-b border-[#E3E8F2] text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#B5D56A] text-xs uppercase tracking-wider font-semibold text-[#14213D] shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#6E8F1F]" />
            <span>Human-Centered Framework</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-[#14213D] font-bold leading-tight">
            The Stages & Areas of Life
          </h1>
          <p className="text-base sm:text-lg text-[#5B6784] max-w-2xl mx-auto leading-relaxed">
            Replacing rigid or esoteric concepts with grounded, relatable life dimensions. Explore each area to understand how we guide you from friction to tranquility.
          </p>

          <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#E3E8F2] text-xs text-[#5B6784] shadow-xs">
            <Shield className="w-4 h-4 text-[#6E8F1F] shrink-0" />
            <span>These stages represent social guidance themes, not medical treatments or psychiatric diagnoses.</span>
          </div>
        </div>
      </section>

      {/* Main Categories List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {categories.map((cat, index) => {
            const details = categoryDetails[cat.slug] || {
              symptoms: ['Overwhelm or uncertainty in this life domain'],
              guidanceApproach: 'Compassionate, structured listening and actionable guidance.',
              targetAudiences: ['Individuals seeking clarity'],
            };

            return (
              <div
                key={cat.id}
                id={cat.slug}
                className="rounded-3xl p-6 sm:p-10 bg-white border border-[#E3E8F2] hover:border-[#B5D56A] shadow-soft hover:shadow-card transition-all duration-200 scroll-mt-28 relative group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Stage Info */}
                  <div className="lg:col-span-7 space-y-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#EEF5D8] flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getIcon(cat.slug)}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-[#6E8F1F] font-bold uppercase tracking-wider">
                          Stage 0{index + 1}
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14213D]">
                          {cat.name}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base text-[#5B6784] leading-relaxed pt-2">
                      {cat.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#14213D]">
                        Common Signs You May Need Guidance Here:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#5B6784]">
                        {details.symptoms.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#6E8F1F] font-bold mt-0.5">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#14213D]">
                        Our Guidance Approach:
                      </h4>
                      <p className="text-xs text-[#5B6784] leading-relaxed italic bg-[#EEF5D8]/40 p-3.5 rounded-xl border border-[#B5D56A]/30 mt-1">
                        {details.guidanceApproach}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Audience & Booking CTA */}
                  <div className="lg:col-span-5 bg-[#EEF5D8]/30 rounded-2xl p-6 border border-[#E3E8F2] space-y-5 text-left">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#6E8F1F] font-bold mb-2">
                        Who This Is For:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {details.targetAudiences.map((aud, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-white text-[11px] font-medium text-[#14213D] border border-[#E3E8F2] shadow-xs"
                          >
                            {aud}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#E3E8F2] space-y-2">
                      <p className="text-xs font-semibold text-[#14213D]">
                        Session Formats Available:
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#5B6784]">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#6E8F1F]" /> Private Phone Call
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#6E8F1F]" /> Secure Live Video
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link
                        to={`/book?category=${cat.id}&plan=direct`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold bg-[#B5D56A] text-[#14213D] hover:bg-[#a5c758] hover:-translate-y-0.5 transition-all shadow-md"
                      >
                        <Calendar className="w-4 h-4 text-[#14213D]" />
                        Book Session in this Stage
                      </Link>

                      <Link
                        to={`/plans#request-form`}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold border-1.5 border-[#14213D] text-[#14213D] hover:bg-[#14213D] hover:text-white transition-all"
                      >
                        Request Advisory Assessment
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Summary */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 rounded-3xl bg-[#EEF5D8]/50 border border-[#B5D56A]/40 space-y-4">
          <h3 className="font-heading text-2xl font-bold text-[#14213D]">
            Not sure which stage is right for you?
          </h3>
          <p className="text-sm text-[#5B6784] max-w-xl mx-auto">
            Our authorized Advisory Team is designed specifically to help you unburden your thoughts and identify the ideal guidance mentor.
          </p>
          <Link
            to="/plans#request-form"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-[#14213D] text-white hover:bg-[#2C4A8A] transition-all shadow-md"
          >
            Explore Plan B Advisory Support <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
