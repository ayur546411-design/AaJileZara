import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Video, 
  PhoneCall, 
  FileText, 
  CheckCircle, 
  Lock, 
  ArrowRight,
  Clock
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activePlanTab, setActivePlanTab] = useState<'planA' | 'planB'>('planA');

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-brand-blush/30 py-16 border-b border-brand-wine/10 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-badge text-xs uppercase tracking-wider font-semibold">
            <Clock className="w-3.5 h-3.5 text-brand-gold" />
            <span>The Guidance Journey</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-wine font-bold leading-tight">
            How Ji Le Zara Works
          </h1>
          <p className="text-base sm:text-lg text-brand-charcoal/80 max-w-2xl mx-auto leading-relaxed">
            Step-by-step clarity from your initial thought to lasting inner peace. We have designed every interaction to feel safe, respectful, and free of technical confusion.
          </p>

          {/* Plan Toggle */}
          <div className="pt-6">
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-brand-wine/20 shadow-sm">
              <button
                onClick={() => setActivePlanTab('planA')}
                className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activePlanTab === 'planA'
                    ? 'bg-brand-wine text-white shadow-sm'
                    : 'text-brand-charcoal hover:bg-brand-blush/40'
                }`}
              >
                Plan A: Direct Guidance Journey
              </button>
              <button
                onClick={() => setActivePlanTab('planB')}
                className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activePlanTab === 'planB'
                    ? 'bg-brand-wine text-white shadow-sm'
                    : 'text-brand-charcoal hover:bg-brand-blush/40'
                }`}
              >
                Plan B: Advisory Team Guided Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Steps Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {activePlanTab === 'planA' ? (
          <div className="space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold text-brand-gold">
                Plan A Workflow
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-bold">
                Direct Guidance: 5 Simple Steps
              </h2>
              <p className="text-xs text-brand-charcoal/70">
                Ideal if you have identified your area of life and wish to choose your counselor right away.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  title: 'Select Life Stage',
                  desc: 'Pick from the 7 Stages of Life (e.g. Relationships, Transitions, Emotional Clarity).',
                  icon: <FileText className="w-5 h-5 text-brand-gold" />,
                },
                {
                  step: '02',
                  title: 'Choose Counselor',
                  desc: 'Pick Dr. Nilambari Dave or an advisor matched with your language preferences.',
                  icon: <CheckCircle className="w-5 h-5 text-brand-wine" />,
                },
                {
                  step: '03',
                  title: 'Calendar Slot',
                  desc: 'Select your preferred appointment date and time. Built-in buffer prevents overlaps.',
                  icon: <Calendar className="w-5 h-5 text-brand-wine-dark" />,
                },
                {
                  step: '04',
                  title: 'Brief Intake & Fee',
                  desc: 'Complete confidential intake (word limit enforced) and pay category rate (e.g. Student ₹500).',
                  icon: <Lock className="w-5 h-5 text-emerald-700" />,
                },
                {
                  step: '05',
                  title: 'Live Session Card',
                  desc: 'Receive your secure Digital Live Session ID Card with click-to-call or video link.',
                  icon: <Video className="w-5 h-5 text-teal-700" />,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="editorial-card rounded-2xl p-5 bg-white text-left space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-brand-gold">
                        {item.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-brand-blush/60 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="font-serif text-base font-bold text-brand-charcoal mt-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-charcoal/75 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                to="/book?plan=direct"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all shadow-soft"
              >
                Book Your Direct Session Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold text-brand-gold">
                Plan B Workflow
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-bold">
                Advisory Team Support: 5 Guided Steps
              </h2>
              <p className="text-xs text-brand-charcoal/70">
                Ideal if your situation is complex, emotionally heavy, or involves multiple family members.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  title: 'Submit Intake',
                  desc: 'Share a summary of your circumstances (up to 250 words) with your category details.',
                  icon: <MessageSquare className="w-5 h-5 text-brand-gold" />,
                },
                {
                  step: '02',
                  title: 'Authorized Review',
                  desc: 'A senior intake coordinator reviews your context within 24 hours with complete discretion.',
                  icon: <ShieldCheck className="w-5 h-5 text-brand-wine" />,
                },
                {
                  step: '03',
                  title: 'Mentor Synergy',
                  desc: 'We match you with the counselor whose background and languages best suit your story.',
                  icon: <CheckCircle className="w-5 h-5 text-emerald-700" />,
                },
                {
                  step: '04',
                  title: 'Introductory Call',
                  desc: 'Connect in an exploratory consultation to unpack key themes without feeling rushed.',
                  icon: <PhoneCall className="w-5 h-5 text-brand-wine-dark" />,
                },
                {
                  step: '05',
                  title: 'Action Roadmap',
                  desc: 'Receive personalized written guidance recommendations in your portal for future steps.',
                  icon: <FileText className="w-5 h-5 text-teal-700" />,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="editorial-card rounded-2xl p-5 bg-white text-left space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-brand-gold">
                        {item.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-brand-cream flex items-center justify-center border border-brand-gold/30">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="font-serif text-base font-bold text-brand-charcoal mt-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-charcoal/75 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                to="/plans#request-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-brand-charcoal text-white hover:bg-brand-wine transition-all shadow-soft"
              >
                Submit Advisory Support Request <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Reassurance FAQ / Policies */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="editorial-card rounded-3xl p-6 sm:p-10 bg-white space-y-6 text-left">
          <h3 className="font-serif text-2xl font-bold text-brand-wine">
            What to Expect in Every Session
          </h3>

          <div className="space-y-4 text-xs text-brand-charcoal/80 leading-relaxed">
            <div className="p-4 rounded-xl bg-brand-cream/50 border border-brand-wine/10">
              <h4 className="font-bold text-brand-charcoal mb-1">
                Zero Judgment & Safe Atmosphere
              </h4>
              <p>
                You are encouraged to speak openly in whichever language you feel most comfortable (Hindi, English, Gujarati, Marathi, Bengali). There are no right or wrong answers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-cream/50 border border-brand-wine/10">
              <h4 className="font-bold text-brand-charcoal mb-1">
                Session Recording Is Disabled By Default
              </h4>
              <p>
                In alignment with our Recording Consent Policy, video calls are never recorded unless both client and counselor explicitly provide opt-in consent. If recording is declined, an unrecorded session proceeds identically with zero compromise.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-cream/50 border border-brand-wine/10">
              <h4 className="font-bold text-brand-charcoal mb-1">
                15-Minute Buffer Between Consultations
              </h4>
              <p>
                Our scheduling engine automatically enforces a 15-minute buffer period after every consultation. This guarantees your advisor is refreshed, calm, and fully attentive for your session.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
