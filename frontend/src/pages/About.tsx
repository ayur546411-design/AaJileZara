import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, HeartHandshake, ShieldCheck, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="relative pt-12 md:pt-16 pb-12 bg-brand-blush/30 border-b border-brand-wine/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-badge text-xs uppercase tracking-wider font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Our Foundation & Leadership</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-wine font-bold leading-tight">
            About Ji Le Zara
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-brand-charcoal/80 italic">
            “Soch se Shanti Tak” — From Overthinking to Peaceful Presence
          </p>
          <p className="text-base text-brand-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Founded and guided by <strong>Dr. Nilambari Dave, PhD</strong>, Ji Le Zara is a compassionate space dedicated to interpersonal dynamics, domestic tranquility, life stages, and personal growth.
          </p>
        </div>
      </section>

      {/* Founder Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="editorial-card rounded-3xl p-4 bg-white relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-brand-blush/40 shadow-inner">
                <img
                  src="/dr_nilambari_portrait.jpg"
                  alt="Dr. Nilambari Dave, PhD"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-serif text-xl font-bold text-brand-wine">Dr. Nilambari Dave, PhD</h3>
                <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider mt-0.5">
                  Founder & Principal Guidance Mentor
                </p>
                <p className="text-xs text-brand-charcoal/70 mt-1 font-medium">
                  Doctorate in Human Development & Family Studies · Former Vice-Chancellor & Dean · 38+ Years Leadership
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold font-bold">
              Leadership Narrative
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-bold leading-tight">
              A Lifelong Dedication to Human Relationships and Gentle Healing
            </h2>
            <p className="text-base text-brand-charcoal/80 leading-relaxed">
              Throughout her academic research and extensive community mentorship spanning over three decades, Dr. Nilambari Dave observed a profound gap in modern society:
            </p>
            <p className="text-base text-brand-charcoal/80 leading-relaxed italic border-l-2 border-brand-gold pl-4 bg-brand-cream/40 py-2">
              “Most human pain does not stem from clinical psychiatric pathology. It stems from unspoken loneliness, generational communication friction between family members, domestic emotional exhaustion, and paralyzing crossroads where one feels completely unheard.”
            </p>
            <p className="text-sm text-brand-charcoal/75 leading-relaxed">
              Ji Le Zara was established to fill this vital sanctuary. Not as a clinical psychiatric hospital, but as a dignified, thoughtful environment where students, homemakers, working professionals, and elders can pause, reflect without being judged, realign their priorities, and discover a path back to peace.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-wine/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-brand-charcoal">Dignified Respect</h4>
                  <p className="text-xs text-brand-charcoal/70">Every story is held with absolute discretion, empathy, and honor.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-brand-charcoal">Practical Clarity</h4>
                  <p className="text-xs text-brand-charcoal/70">Actionable steps to de-escalate domestic conflict and restore peace.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Guidance vs Clinical Psychiatry */}
      <section className="bg-brand-cream/80 py-16 border-y border-brand-wine/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <h2 className="font-serif text-3xl text-brand-wine font-bold">
              What Social Guidance Means at Ji Le Zara
            </h2>
            <p className="text-sm text-brand-charcoal/70">
              Understanding the clear and respectful distinction between social-emotional mentorship and clinical psychiatric treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white border border-brand-wine/15 shadow-sm space-y-3">
              <span className="px-3 py-1 rounded-full bg-brand-blush text-brand-wine text-xs font-bold uppercase">
                What We Focus On
              </span>
              <ul className="space-y-2 text-xs text-brand-charcoal/80 pt-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Family & Spousal Dynamics:</strong> Resolving persistent communication gaps, in-law friction, and parenting differences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Self-Worth & Identity:</strong> Overcoming persistent self-doubt, social comparison, and emotional isolation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Life Transitions:</strong> Relocation, career contemplation, retirement readiness, empty-nest syndrome.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Quiet Reflection:</strong> Turning racing thoughts into tranquil, well-reasoned choices (Soch se Shanti Tak).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-brand-blush/30 border border-brand-wine/10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-white text-brand-charcoal text-xs font-bold uppercase">
                What We Do Not Provide
              </span>
              <ul className="space-y-2 text-xs text-brand-charcoal/70 pt-2">
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

      {/* The 4 Core Tenets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-brand-gold font-bold">
            The Brand Tagline Unfolded
          </p>
          <h2 className="font-serif text-3xl text-brand-wine font-bold mt-1">
            “Pause · Reflect · Realign · Live Fully”
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            {
              word: 'Pause',
              meaning: 'Stepping off the wheel of involuntary reaction. Creating space between what happens to you and how you respond.',
            },
            {
              word: 'Reflect',
              meaning: 'Looking inward with kindness rather than self-condemnation. Listening to the quiet truth beneath your surface feelings.',
            },
            {
              word: 'Realign',
              meaning: 'Gently adjusting boundaries, habits, and relationship patterns so they reflect your genuine values.',
            },
            {
              word: 'Live Fully',
              meaning: 'Reclaiming joy, domestic calm, and inner peace in the present moment — living with gratitude and purpose.',
            },
          ].map((t, i) => (
            <div key={t.word} className="editorial-card rounded-2xl p-6 bg-white space-y-2">
              <span className="text-xs font-mono text-brand-gold font-bold">Tenet 0{i + 1}</span>
              <h3 className="font-serif text-2xl font-bold text-brand-wine">{t.word}</h3>
              <p className="text-xs text-brand-charcoal/75 leading-relaxed">{t.meaning}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all shadow-soft"
          >
            Schedule a Confidential Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
