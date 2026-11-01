import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, HeartHandshake, ShieldCheck, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 bg-white">
      {/* Hero Header (Dhani-Soft Section) */}
      <section className="relative pt-12 md:pt-16 pb-12 bg-[#EEF5D8]/40 border-b border-[#E3E8F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF5D8] border border-[#B5D56A]/50 text-[#14213D] text-xs uppercase tracking-wider font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#6E8F1F]" />
            <span>Our Foundation & Leadership</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-[#14213D] font-bold leading-tight">
            About Ji Le Zara
          </h1>
          <p className="font-heading text-xl sm:text-2xl text-[#14213D]/90 italic">
            “Soch se Shanti Tak” — From Overthinking to Peaceful Presence
          </p>
          <p className="text-base text-[#5B6784] max-w-2xl mx-auto leading-relaxed">
            Founded and guided by <strong>Dr. Nilambari Dave, PhD</strong>, Ji Le Zara is a compassionate space dedicated to interpersonal dynamics, domestic tranquility, life stages, and personal growth.
          </p>
        </div>
      </section>

      {/* Founder Story & Philosophy (White Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="card-themed rounded-3xl p-4 bg-white border border-[#E3E8F2] shadow-soft relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#EEF5D8] shadow-inner">
                <img
                  src="/dr_nilambari_portrait.jpg"
                  alt="Dr. Nilambari Dave, PhD"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-heading text-xl font-bold text-[#14213D]">Dr. Nilambari Dave, PhD</h3>
                <p className="text-xs text-[#6E8F1F] font-semibold uppercase tracking-wider mt-0.5">
                  Founder & Principal Guidance Mentor
                </p>
                <p className="text-xs text-[#5B6784] mt-1 font-medium">
                  Doctorate in Human Development & Family Studies · Former Vice-Chancellor & Dean · 38+ Years Leadership
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#6E8F1F] font-bold">
              Leadership Narrative
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#14213D] font-bold leading-tight">
              A Lifelong Dedication to Human Relationships and Gentle Healing
            </h2>
            <p className="text-base text-[#5B6784] leading-relaxed">
              Throughout her academic research and extensive community mentorship spanning over three decades, Dr. Nilambari Dave observed a profound gap in modern society:
            </p>
            <p className="text-base text-[#14213D] leading-relaxed italic border-l-3 border-[#6E8F1F] pl-4 bg-[#EEF5D8] py-3 rounded-r-xl">
              “Most human pain does not stem from clinical psychiatric pathology. It stems from unspoken loneliness, generational communication friction between family members, domestic emotional exhaustion, and paralyzing crossroads where one feels completely unheard.”
            </p>
            <p className="text-sm text-[#5B6784] leading-relaxed">
              Ji Le Zara was established to fill this vital sanctuary. Not as a clinical psychiatric hospital, but as a dignified, thoughtful environment where students, homemakers, working professionals, and elders can pause, reflect without being judged, realign their priorities, and discover a path back to peace.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E3E8F2]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6E8F1F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#14213D]">Dignified Respect</h4>
                  <p className="text-xs text-[#5B6784]">Every story is held with absolute discretion, empathy, and honor.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6E8F1F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#14213D]">Practical Clarity</h4>
                  <p className="text-xs text-[#5B6784]">Actionable steps to de-escalate domestic conflict and restore peace.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Guidance vs Clinical Psychiatry (Dhani-Soft Alternate Section) */}
      <section className="bg-[#EEF5D8]/40 py-16 border-y border-[#E3E8F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <h2 className="font-heading text-3xl text-[#14213D] font-bold">
              What Social Guidance Means at Ji Le Zara
            </h2>
            <p className="text-sm text-[#5B6784]">
              Understanding the clear and respectful distinction between social-emotional mentorship and clinical psychiatric treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white border border-[#E3E8F2] shadow-sm space-y-3 hover:border-[#B5D56A] transition-colors">
              <span className="px-3 py-1 rounded-full bg-[#EEF5D8] text-[#14213D] text-xs font-bold uppercase">
                What We Focus On
              </span>
              <ul className="space-y-2 text-xs text-[#1B2440] pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#6E8F1F] font-bold">✓</span>
                  <span><strong>Family & Spousal Dynamics:</strong> Resolving persistent communication gaps, in-law friction, and parenting differences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6E8F1F] font-bold">✓</span>
                  <span><strong>Self-Worth & Identity:</strong> Overcoming persistent self-doubt, social comparison, and emotional isolation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6E8F1F] font-bold">✓</span>
                  <span><strong>Life Transitions:</strong> Relocation, career contemplation, retirement readiness, empty-nest syndrome.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6E8F1F] font-bold">✓</span>
                  <span><strong>Quiet Reflection:</strong> Turning racing thoughts into tranquil, well-reasoned choices (Soch se Shanti Tak).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#EEF5D8]/50 border border-[#E3E8F2] space-y-3 hover:border-[#B5D56A] transition-colors">
              <span className="px-3 py-1 rounded-full bg-white text-[#14213D] text-xs font-bold uppercase shadow-xs">
                What We Do Not Provide
              </span>
              <ul className="space-y-2 text-xs text-[#5B6784] pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Clinical psychiatric medication or pharmacological prescriptions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Formal diagnostic labeling of acute mental illness or psychiatric hospitalizations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>24/7 emergency suicide crisis response (clients in immediate danger are directed to emergency services).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Guaranteed or magically promised life outcomes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Core Tenets (White Section with White Cards, Navy Icons, Dhani Number Badge) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#6E8F1F] font-bold">
            The Brand Tagline Unfolded
          </p>
          <h2 className="font-heading text-3xl text-[#14213D] font-bold mt-1">
            “Pause · Reflect · Realign · Live Fully”
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            {
              word: 'Pause',
              meaning: 'Stepping off the wheel of involuntary reaction. Creating space between what happens to you and how you respond.',
              icon: <Compass className="w-5 h-5 text-[#14213D]" />
            },
            {
              word: 'Reflect',
              meaning: 'Looking inward with kindness rather than self-condemnation. Listening to the quiet truth beneath your surface feelings.',
              icon: <Sparkles className="w-5 h-5 text-[#14213D]" />
            },
            {
              word: 'Realign',
              meaning: 'Gently adjusting boundaries, habits, and relationship patterns so they reflect your genuine values.',
              icon: <HeartHandshake className="w-5 h-5 text-[#14213D]" />
            },
            {
              word: 'Live Fully',
              meaning: 'Reclaiming joy, domestic calm, and inner peace in the present moment — living with gratitude and purpose.',
              icon: <ShieldCheck className="w-5 h-5 text-[#14213D]" />
            },
          ].map((t, i) => (
            <div key={t.word} className="card-themed rounded-2xl p-6 bg-white border border-[#E3E8F2] shadow-soft space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-[#B5D56A] text-[#14213D] font-bold text-xs flex items-center justify-center shadow-xs">
                  0{i + 1}
                </span>
                <div className="p-2 rounded-xl bg-[#EEF5D8]">
                  {t.icon}
                </div>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#14213D]">{t.word}</h3>
              <p className="text-xs text-[#5B6784] leading-relaxed">{t.meaning}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/book"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm"
          >
            <span>Schedule a Confidential Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#14213D]" />
          </Link>
        </div>
      </section>
    </div>
  );
};
