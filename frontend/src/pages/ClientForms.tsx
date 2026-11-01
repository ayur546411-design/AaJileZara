import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  Clock
} from 'lucide-react';

export const ClientForms: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#EEF5D8]/40 py-16 border-b border-[#E3E8F2] text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#B5D56A] text-xs uppercase tracking-wider font-semibold text-[#14213D] shadow-xs">
            <FileText className="w-3.5 h-3.5 text-[#6E8F1F]" />
            <span>Official Client Documents</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-[#14213D] font-bold leading-tight">
            Client Intake & Coaching Agreement
          </h1>
          <p className="text-base sm:text-lg text-[#5B6784] max-w-2xl mx-auto leading-relaxed">
            Transparent legal documentation, ethical non-medical boundaries, and 90-day recording retention policies for Ji Le Zara | Life Coaching with Nilambari.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/Ji_Le_Zara_Client_Forms.pdf"
              download="Ji_Le_Zara_Client_Forms.pdf"
              className="px-6 py-3 rounded-full text-xs font-bold bg-[#B5D56A] text-[#14213D] hover:bg-[#a5c758] hover:-translate-y-0.5 transition-all shadow-md inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#14213D]" />
              <span>Download Official PDF Document</span>
            </a>

            <Link
              to="/book"
              className="px-6 py-3 rounded-full text-xs font-bold bg-white text-[#14213D] hover:bg-[#14213D] hover:text-white border-1.5 border-[#14213D] transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span>Proceed to Booking Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Document Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Document Metadata Banner */}
        <div className="p-6 rounded-2xl bg-white border border-[#E3E8F2] shadow-soft text-left mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E8F1F] block">
              Official Service Provider
            </span>
            <h2 className="font-heading text-xl font-bold text-[#14213D]">
              Dr. Nilambari Dave, PhD
            </h2>
            <p className="text-xs text-[#5B6784]">
              Ji Le Zara • Contact: hello@jilezara.com • Applicable Law: Republic of India
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#EEF5D8] text-[#14213D] text-xs font-bold border border-[#B5D56A]/50">
            Form Version 2026.1 • Active
          </span>
        </div>

        {/* FORM 1: Client Intake & Coaching Agreement */}
        <div className="rounded-3xl p-6 sm:p-10 bg-white border border-[#E3E8F2] shadow-soft text-left space-y-8">
          <div className="border-b border-[#E3E8F2] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6E8F1F]">Form 01</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#14213D] mt-1">
              Client Intake & Coaching Agreement
            </h3>
            <p className="text-xs text-[#5B6784] mt-1">
              Please complete before your first session. Only provide information relevant to your coaching goals.
            </p>
          </div>

          {/* Section A */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-[#14213D] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EEF5D8] text-[#14213D] text-xs font-bold flex items-center justify-center border border-[#B5D56A]/40">A</span>
              <span>Client Information</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#EEF5D8]/30 border border-[#E3E8F2]">
                <strong className="text-[#14213D]">Full Legal Name *</strong>
                <p className="text-[#5B6784] mt-0.5">Required for client record and identity validation.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#EEF5D8]/30 border border-[#E3E8F2]">
                <strong className="text-[#14213D]">Preferred Name</strong>
                <p className="text-[#5B6784] mt-0.5">How you wish to be addressed in sessions.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#EEF5D8]/30 border border-[#E3E8F2]">
                <strong className="text-[#14213D]">Email Address *</strong>
                <p className="text-[#5B6784] mt-0.5">Used for calendar confirmation and Session ID pass.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#EEF5D8]/30 border border-[#E3E8F2]">
                <strong className="text-[#14213D]">WhatsApp / Phone Number *</strong>
                <p className="text-[#5B6784] mt-0.5">For direct guidance calls and session coordination.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#EEF5D8]/30 border border-[#E3E8F2]">
                <strong className="text-[#14213D]">City and Country</strong>
                <p className="text-[#5B6784] mt-0.5">To align scheduling and timezone expectations.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#EEF5D8]/30 border border-[#E3E8F2]">
                <strong className="text-[#14213D]">Age Confirmation * (18 or older: Yes / No)</strong>
                <p className="text-[#5B6784] mt-0.5">Coaching requires participants to be 18+ years of age.</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#EEF5D8]/30 border border-[#E3E8F2] text-xs">
              <strong className="text-[#14213D]">Emergency Contact (optional)</strong>
              <p className="text-[#5B6784] mt-0.5">Collected only in rare safety circumstances, as explained before collection.</p>
            </div>
          </div>

          {/* Section B */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-[#14213D] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EEF5D8] text-[#14213D] text-xs font-bold flex items-center justify-center border border-[#B5D56A]/40">B</span>
              <span>Coaching Preferences & Goals</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#5B6784]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6E8F1F] shrink-0 mt-0.5" />
                <span><strong className="text-[#14213D]">Selected Service / Package:</strong> Discovery Call, Single Clarity Session, Personal Coaching, or Multi-Week Journey.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6E8F1F] shrink-0 mt-0.5" />
                <span><strong className="text-[#14213D]">Preferred Language:</strong> Hindi, English, Gujarati, Marathi, or Bengali.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6E8F1F] shrink-0 mt-0.5" />
                <span><strong className="text-[#14213D]">Main Goals for Coaching:</strong> Up to 250 words outlining what you are navigating.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6E8F1F] shrink-0 mt-0.5" />
                <span><strong className="text-[#14213D]">Desired Shift:</strong> What you would like to be different after coaching.</span>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-[#EEF5D8]/50 border border-[#B5D56A]/40 text-xs text-[#14213D] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#6E8F1F] shrink-0 mt-0.5" />
              <p>
                <strong>Important Privacy Notice:</strong> Please avoid entering diagnoses, medical records, or other sensitive details unless specifically needed and separately requested with an appropriate privacy notice.
              </p>
            </div>
          </div>

          {/* Section C */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-[#14213D] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EEF5D8] text-[#14213D] text-xs font-bold flex items-center justify-center border border-[#B5D56A]/40">C</span>
              <span>Coaching Agreement Clauses</span>
            </h4>
            <div className="space-y-3 text-xs text-[#5B6784]">
              <div className="p-3.5 rounded-xl bg-white border border-[#E3E8F2]">
                1. <strong className="text-[#14213D]">Non-Medical Scope:</strong> Coaching provides personal development, reflection, mentoring and goal-setting support; it is not medical care, psychotherapy, psychological diagnosis, crisis intervention or a guaranteed outcome.
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E3E8F2]">
                2. <strong className="text-[#14213D]">Personal Responsibility:</strong> I remain responsible for my choices and actions. I may ask questions and discontinue coaching subject to the published cancellation and refund policy.
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E3E8F2]">
                3. <strong className="text-[#14213D]">Privacy & Non-Distribution:</strong> I will attend from a reasonably private location and will not record, reproduce or share sessions or materials without permission.
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E3E8F2]">
                4. <strong className="text-[#14213D]">Confidentiality Exceptions:</strong> I understand that confidentiality has limited exceptions where disclosure is required by law or necessary to respond to a serious and imminent safety concern.
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E3E8F2]">
                5. <strong className="text-[#14213D]">Policy Access:</strong> I have received or can access the Terms of Service, Privacy Policy and Cancellation & Refund Policy before booking.
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E3E8F2]">
                6. <strong className="text-[#14213D]">Joint & Minor Sessions:</strong> For couple or joint sessions, each adult participant must separately agree to the coaching and recording terms. Services involving minors require a separate safeguarding and parent/guardian consent process.
              </div>
            </div>
          </div>

          {/* Section D */}
          <div className="space-y-4 pt-2 border-t border-[#E3E8F2]">
            <h4 className="font-heading text-lg font-bold text-[#14213D] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EEF5D8] text-[#14213D] text-xs font-bold flex items-center justify-center border border-[#B5D56A]/40">D</span>
              <span>Acknowledgement & E-Signature</span>
            </h4>
            <p className="text-xs text-[#5B6784] leading-relaxed">
              When booking online, typing your full legal name serves as your electronic signature, establishing a binding and mutual agreement under the Information Technology Act of India.
            </p>
            <div className="p-3.5 rounded-xl bg-[#EEF5D8]/50 border border-[#B5D56A]/40 text-xs text-[#14213D] font-medium">
              Note: This intake form does not itself authorize session recording. Session recording is governed by the separate Session Recording Consent Form below.
            </div>
          </div>
        </div>

        {/* FORM 2: Session Recording Consent Form */}
        <div className="mt-12 rounded-3xl p-6 sm:p-10 bg-white border-2 border-[#B5D56A] shadow-dhani text-left space-y-8">
          <div className="border-b border-[#E3E8F2] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6E8F1F]">Form 02</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#14213D] mt-1">
              Session Recording Consent Form
            </h3>
            <p className="text-xs text-[#5B6784] mt-1">
              For online audio/video coaching sessions. Complete separately for each participant before any recording starts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#EEF5D8]/40 border border-[#B5D56A]/30 space-y-1.5">
              <div className="font-bold text-[#14213D] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#6E8F1F]" />
                <span>1. What is Recorded & Why</span>
              </div>
              <p className="text-[#5B6784] leading-relaxed">
                Recording (audio and/or video) supports continuity, review of coaching discussions, and secure record-keeping. Recording is NOT necessary for receiving guidance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#EEF5D8]/40 border border-[#B5D56A]/30 space-y-1.5">
              <div className="font-bold text-[#14213D] flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#6E8F1F]" />
                <span>2. Storage & 90-Day Purge</span>
              </div>
              <p className="text-[#5B6784] leading-relaxed">
                Recordings are held in access-controlled storage accessible strictly to Dr. Nilambari Dave. Recordings are <strong>permanently deleted 90 days</strong> after the final session in the booked engagement.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#EEF5D8]/40 border border-[#B5D56A]/30 space-y-1.5">
              <div className="font-bold text-[#14213D] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#6E8F1F]" />
                <span>3. Never Shared or Public</span>
              </div>
              <p className="text-[#5B6784] leading-relaxed">
                Recordings will NEVER be published, used as marketing testimonials, or shared with third parties without separate, specific, written permission.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#EEF5D8]/40 border border-[#B5D56A]/30 space-y-1.5">
              <div className="font-bold text-[#14213D] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#6E8F1F]" />
                <span>4. Your Choice & Withdrawal</span>
              </div>
              <p className="text-[#5B6784] leading-relaxed">
                Recording requires your separate, affirmative consent. You may decline recording or withdraw consent at any time. An unrecorded session will always be honored.
              </p>
            </div>
          </div>

          {/* Website Booking Implementation Requirement from PDF */}
          <div className="p-4 rounded-2xl bg-[#EEF5D8]/50 border border-[#B5D56A]/40 text-xs text-[#14213D] space-y-2">
            <strong className="text-[#14213D] block">Single-Choice Yes/No Field Implementation:</strong>
            <p className="text-[#5B6784]">
              In strict compliance with Form 02 guidelines: our booking engine uses a required single-choice Yes/No selection (not a pre-ticked checkbox). Recording cannot commence unless every participant has explicitly submitted their consent.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E3E8F2]">
            <span className="text-xs text-[#5B6784]">
              Need a physical signed copy for your records?
            </span>
            <a
              href="/Ji_Le_Zara_Client_Forms.pdf"
              download="Ji_Le_Zara_Client_Forms.pdf"
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#14213D] text-white hover:bg-[#2C4A8A] transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Printable PDF</span>
            </a>
          </div>
        </div>

      </section>
    </div>
  );
};
