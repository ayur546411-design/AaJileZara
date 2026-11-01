import React from 'react';

export const TermsConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-left">
      <div className="text-center space-y-3 pb-8 border-b border-[#E3E8F2]">
        <span className="px-3 py-1 rounded-full bg-[#EEF5D8] text-[#14213D] border border-[#B5D56A]/40 text-xs font-bold uppercase tracking-wider">
          Legal Agreement
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl text-[#14213D] font-bold">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[#5B6784]">
          Last Updated: October 2026 · Governing use of www.jilezara.com
        </p>
      </div>

      <div className="space-y-8 text-xs text-[#5B6784] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#14213D]">
            1. Scope of Social Guidance & Non-Medical Nature
          </h2>
          <p>
            Ji Le Zara provides mentorship, life stage reflection, social counseling, and family communication guidance. <strong className="text-[#14213D]">It does not provide clinical psychiatric therapy, clinical psychological diagnosis, pharmaceutical treatment, or crisis psychiatric intervention.</strong>
          </p>
          <p>
            By booking a session or submitting a Plan B guidance request, you acknowledge that our mentors are social and personal advisors, and that consultations do not establish a doctor-patient clinical relationship.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#14213D]">
            2. Age Eligibility
          </h2>
          <p>
            Clients must be at least 18 years of age to book sessions independently. Individuals under 18 years seeking guidance on adolescent transitions must have written consent from a parent or legal guardian.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#14213D]">
            3. Client Responsibilities & Mutual Respect
          </h2>
          <p>
            Consultations require an environment of mutual respect, dignity, and courteous discourse. Ji Le Zara reserves the right to terminate any session or decline service if a participant displays verbal abuse, threats, harassment, or intoxication.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#14213D]">
            4. No Guaranteed Life Outcomes
          </h2>
          <p>
            While our mentors apply proven methodologies developed over decades of social guidance by Dr. Nilambari Dave, PhD, personal growth and relational harmony require individual action and self-reflection. Ji Le Zara makes no promises or guarantees of specific life outcomes.
          </p>
        </section>
      </div>
    </div>
  );
};
