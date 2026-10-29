import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-left">
      <div className="text-center space-y-3 pb-8 border-b border-brand-wine/10">
        <span className="px-3 py-1 rounded-full gold-badge text-brand-gold text-xs font-bold uppercase tracking-wider">
          Data Governance & Privacy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-wine font-bold">
          Privacy Policy
        </h1>
        <p className="text-xs text-brand-charcoal/70">
          Last Updated: October 2026 · Compliant with India Digital Personal Data Protection (DPDP) Act
        </p>
      </div>

      <div className="space-y-8 text-xs text-brand-charcoal/80 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            1. Our Commitment to Your Sanctuary
          </h2>
          <p>
            At <strong>Ji Le Zara</strong>, led by Dr. Nilambari Dave, PhD, we recognize that the personal challenges, domestic discussions, and emotional reflections you share with us are deeply sensitive. We hold your personal details under the highest standard of confidentiality and data security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            2. Minimum Information We Collect
          </h2>
          <p>
            We strictly limit the data we collect to only what is necessary to deliver our guidance services:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Contact Identity:</strong> Name, email address, and mobile number for appointment reminders and calendar coordination.</li>
            <li><strong>Guidance Context:</strong> Brief concern summaries submitted via our configurable intake form, constrained to reasonable word limits (e.g. 250 words) to prevent unnecessary disclosure of private trivia.</li>
            <li><strong>Category Eligibility:</strong> In cases where subsidized rates are requested (e.g. Student ₹500 tier), minimal proof of enrollment is reviewed once and never stored publicly.</li>
            <li><strong>Payment Logs:</strong> Verified transaction references processed via server-side payment gateways; we never store raw credit/debit card numbers or CVVs.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            3. Azure Cloud Architecture & Storage
          </h2>
          <p>
            Our backend infrastructure resides on Microsoft Azure in secure Central India datacenters. Database records are stored within Azure Database for PostgreSQL with encryption-at-rest (AES-256) and automated snapshots.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            4. Absolute Prohibition on Sale of Data
          </h2>
          <p>
            Ji Le Zara does not sell, rent, or trade your personal information, intake answers, or contact details to third-party advertisers, data brokers, or marketing syndicates under any circumstances.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            5. Your Rights: Correction and Erasure
          </h2>
          <p>
            You have the full right to review your saved profile information, request corrections, or ask for the deletion of past intake forms by emailing <strong>care@jilezara.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
