import React from 'react';
import { Calendar, RefreshCw, Clock } from 'lucide-react';

export const CancellationRefundPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-left">
      <div className="text-center space-y-3 pb-8 border-b border-brand-wine/10">
        <span className="px-3 py-1 rounded-full gold-badge text-brand-gold text-xs font-bold uppercase tracking-wider">
          Fair Rescheduling & Transparency
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-wine font-bold">
          Cancellation and Refund Policy
        </h1>
        <p className="text-xs text-brand-charcoal/70">
          Last Updated: October 2026
        </p>
      </div>

      <div className="space-y-8 text-xs text-brand-charcoal/80 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            1. Rescheduling Guidelines
          </h2>
          <p>
            Life brings unforeseen emergencies. If you need to reschedule a booked telephone or live video consultation:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>More than 24 Hours in Advance:</strong> You may reschedule your session directly through the Client Portal or by contacting our team with zero penalty or fee.</li>
            <li><strong>Within 24 Hours of Appointment:</strong> Rescheduling requests within 24 hours are accommodated at advisor discretion, subject to mentor calendar availability and buffer constraints.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            2. Cancellation and Refunds
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Eligible Full Refunds:</strong> If you cancel your session more than 24 hours prior to the scheduled start time, a full refund will be processed back to your original payment method.</li>
            <li><strong>Advisor Unavailability:</strong> In the rare event an assigned advisor is unavailable due to an unexpected emergency, we will offer you an immediate choice of priority rescheduling with another senior mentor or a prompt 100% refund.</li>
            <li><strong>No-Shows:</strong> If a client fails to attend a confirmed live session or answer a scheduled telephone consultation without prior notice, the session is recorded as a "No-Show" and is non-refundable.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-brand-charcoal">
            3. Processing Timelines
          </h2>
          <p>
            Approved refunds are initiated via our backend payment verification engine within 2 business days. Depending on your banking institution or card issuer, funds typically reflect in your account within 5 to 7 business days.
          </p>
        </section>
      </div>
    </div>
  );
};
