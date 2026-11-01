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
      <section className="bg-[#EEF5D8]/40 py-16 border-b border-[#E3E8F2] text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#B5D56A] text-xs uppercase tracking-wider font-semibold text-[#14213D] shadow-xs">
            <Clock className="w-3.5 h-3.5 text-[#6E8F1F]" />
            <span>The Guidance Journey</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-[#14213D] font-bold leading-tight">
            How Ji Le Zara Works
          </h1>
          <p className="text-base sm:text-lg text-[#5B6784] max-w-2xl mx-auto leading-relaxed">
            Step-by-step clarity from your initial thought to lasting inner peace. We have designed every interaction to feel safe, respectful, and free of technical confusion.
          </p>

          {/* Plan Toggle */}
          <div className="pt-6">
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E3E8F2] shadow-sm">
              <button
                onClick={() => setActivePlanTab('planA')}
                className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activePlanTab === 'planA'
                    ? 'bg-[#14213D] text-white shadow-sm'
                    : 'text-[#5B6784] hover:bg-[#EEF5D8]'
                }`}
              >
                Plan A: Direct Guidance Journey
              </button>
              <button
                onClick={() => setActivePlanTab('planB')}
                className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activePlanTab === 'planB'
                    ? 'bg-[#14213D] text-white shadow-sm'
                    : 'text-[#5B6784] hover:bg-[#EEF5D8]'
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
              <span className="text-xs uppercase font-bold text-[#6E8F1F] tracking-wider">
                Plan A Workflow
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl text-[#14213D] font-bold">
                Direct Guidance: 5 Simple Steps
              </h2>
              <p className="text-xs text-[#5B6784]">
                Ideal if you have identified your area of life and wish to choose your counselor right away.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  title: 'Select Life Stage',
                  desc: 'Pick from the 7 Stages of Life (e.g. Relationships, Transitions, Emotional Clarity).',
                  icon: <FileText className="w-5 h-5 text-[#14213D]" />,
                },
                {
                  step: '02',
                  title: 'Choose Counselor',
                  desc: 'Pick Dr. Nilambari Dave or an advisor matched with your language preferences.',
                  icon: <CheckCircle className="w-5 h-5 text-[#6E8F1F]" />,
                },
                {
                  step: '03',
                  title: 'Calendar Slot',
                  desc: 'Select your preferred appointment date and time. Built-in buffer prevents overlaps.',
                  icon: <Calendar className="w-5 h-5 text-[#2C4A8A]" />,
                },
                {
                  step: '04',
                  title: 'Brief Intake & Fee',
                  desc: 'Complete confidential intake (word limit enforced) and pay category rate (e.g. Student ₹500).',
                  icon: <Lock className="w-5 h-5 text-[#14213D]" />,
                },
                {
                  step: '05',
                  title: 'Live Session Card',
                  desc: 'Receive your secure Digital Live Session ID Card with click-to-call or video link.',
                  icon: <Video className="w-5 h-5 text-[#2C4A8A]" />,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl p-5 bg-white border border-[#E3E8F2] hover:border-[#B5D56A] shadow-soft hover:shadow-card transition-all duration-200 text-left space-y-3 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-[#B5D56A] text-[#14213D] font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                        {item.step}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-[#EEF5D8] flex items-center justify-center group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="font-heading text-base font-bold text-[#14213D] mt-3 group-hover:text-[#2C4A8A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5B6784] leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                to="/book?plan=direct"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-[#B5D56A] text-[#14213D] hover:bg-[#a5c758] hover:-translate-y-0.5 transition-all shadow-md"
              >
                Book Your Direct Session Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold text-[#6E8F1F] tracking-wider">
                Plan B Workflow
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl text-[#14213D] font-bold">
                Advisory Team Support: 5 Guided Steps
              </h2>
              <p className="text-xs text-[#5B6784]">
                Ideal if your situation is complex, emotionally heavy, or involves multiple family members.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  title: 'Submit Intake',
                  desc: 'Share a summary of your circumstances (up to 250 words) with your category details.',
                  icon: <MessageSquare className="w-5 h-5 text-[#14213D]" />,
                },
                {
                  step: '02',
                  title: 'Authorized Review',
                  desc: 'A senior intake coordinator reviews your context within 24 hours with complete discretion.',
                  icon: <ShieldCheck className="w-5 h-5 text-[#6E8F1F]" />,
                },
                {
                  step: '03',
                  title: 'Mentor Synergy',
                  desc: 'We match you with the counselor whose background and languages best suit your story.',
                  icon: <CheckCircle className="w-5 h-5 text-[#2C4A8A]" />,
                },
                {
                  step: '04',
                  title: 'Introductory Call',
                  desc: 'Connect in an exploratory consultation to unpack key themes without feeling rushed.',
                  icon: <PhoneCall className="w-5 h-5 text-[#14213D]" />,
                },
                {
                  step: '05',
                  title: 'Action Roadmap',
                  desc: 'Receive personalized written guidance recommendations in your portal for future steps.',
                  icon: <FileText className="w-5 h-5 text-[#2C4A8A]" />,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl p-5 bg-white border border-[#E3E8F2] hover:border-[#B5D56A] shadow-soft hover:shadow-card transition-all duration-200 text-left space-y-3 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-[#B5D56A] text-[#14213D] font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                        {item.step}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-[#EEF5D8] flex items-center justify-center group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="font-heading text-base font-bold text-[#14213D] mt-3 group-hover:text-[#2C4A8A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5B6784] leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                to="/plans#request-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-[#B5D56A] text-[#14213D] hover:bg-[#a5c758] hover:-translate-y-0.5 transition-all shadow-md"
              >
                Submit Advisory Support Request <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Reassurance FAQ / Policies */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-6 sm:p-10 bg-white border border-[#E3E8F2] shadow-soft space-y-6 text-left">
          <h3 className="font-heading text-2xl font-bold text-[#14213D]">
            What to Expect in Every Session
          </h3>

          <div className="space-y-4 text-xs text-[#5B6784] leading-relaxed">
            <div className="p-4 rounded-2xl bg-[#EEF5D8]/40 border border-[#B5D56A]/30">
              <h4 className="font-bold text-[#14213D] text-sm mb-1">
                Zero Judgment & Safe Atmosphere
              </h4>
              <p>
                You are encouraged to speak openly in whichever language you feel most comfortable (Hindi, English, Gujarati, Marathi, Bengali). There are no right or wrong answers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#EEF5D8]/40 border border-[#B5D56A]/30">
              <h4 className="font-bold text-[#14213D] text-sm mb-1">
                Session Recording Is Disabled By Default
              </h4>
              <p>
                In alignment with our Recording Consent Policy, video calls are never recorded unless both client and counselor explicitly provide opt-in consent. If recording is declined, an unrecorded session proceeds identically with zero compromise.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#EEF5D8]/40 border border-[#B5D56A]/30">
              <h4 className="font-bold text-[#14213D] text-sm mb-1">
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
