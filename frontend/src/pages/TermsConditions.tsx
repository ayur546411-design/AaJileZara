import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';

export const TermsConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-left">
      <div className="text-center space-y-3 pb-8 border-b border-brand-wine/10">
        <span className="px-3 py-1 rounded-full gold-badge text-brand-gold text-xs font-bold uppercase tracking-wider">
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-wine font-bold">
          Terms & Conditions
        </h1>
        <p className="text-xs text-brand-charcoal/70">
          Last Updated: October 2026 · Governing use of www.jilezara.com
        </p>
      </div>

      <div className="space-y-8 text-xs text-brand-charcoal/80 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            1. Scope of Social Guidance & Non-Medical Nature
          </h2>
          <p>
            Ji Le Zara provides mentorship, life stage reflection, social counseling, and family communication guidance. <strong>It does not provide clinical psychiatric therapy, clinical psychological diagnosis, pharmaceutical treatment, or crisis psychiatric intervention.</strong>
          </p>
          <p>
            By booking a session or submitting a Plan B guidance request, you acknowledge that our mentors are social and personal advisors, and that consultations do not establish a doctor-patient clinical relationship.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            2. Age Eligibility
          </h2>
          <p>
            Clients must be at least 18 years of age to book sessions independently. Individuals under 18 years seeking guidance on adolescent transitions must have written consent from a parent or legal guardian.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            3. Client Responsibilities & Mutual Respect
          </h2>
          <p>
            Consultations require an environment of mutual respect, dignity, and courteous discourse. Ji Le Zara reserves the right to terminate any session or decline service if a participant displays verbal abuse, threats, harassment, or intoxication.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
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
