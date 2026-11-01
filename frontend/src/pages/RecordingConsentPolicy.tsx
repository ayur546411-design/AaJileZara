import React from 'react';

export const RecordingConsentPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-left">
      <div className="text-center space-y-3 pb-8 border-b border-[#E3E8F2]">
        <span className="px-3 py-1 rounded-full bg-[#EEF5D8] text-[#14213D] border border-[#B5D56A]/40 text-xs font-bold uppercase tracking-wider">
          Dual Consent & Private Archival
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl text-[#14213D] font-bold">
          Recording Consent Policy
        </h1>
        <p className="text-xs text-[#5B6784]">
          Last Updated: October 2026 · Enforced across all Live Video & Telephone Sessions
        </p>
      </div>

      <div className="space-y-8 text-xs text-[#5B6784] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#14213D]">
            1. Disabled by Default
          </h2>
          <p>
            At Ji Le Zara, privacy is not an afterthought; it is our default architecture. <strong className="text-[#14213D]">All live video and telephone sessions are strictly unrecorded by default.</strong> No automated recording begins when you enter a consultation room.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#14213D]">
            2. Dual Explicit Opt-In Consent
          </h2>
          <p>
            Recording is only initiated if and when <strong className="text-[#14213D]">both</strong> the client and the assigned advisor provide active, explicit, opt-in consent.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-[#14213D]">Visible Indicator:</strong> When recording is enabled by mutual consent, a clear, persistent visual recording indicator with an active status badge is displayed on screen to all participants.</li>
            <li><strong className="text-[#14213D]">Immediate Right to Withdraw:</strong> Either participant has the unconditional right to withdraw consent at any moment during the consultation. Clicking "Withdraw Recording Consent" immediately halts the cloud stream.</li>
            <li><strong className="text-[#14213D]">Unrecorded Alternative:</strong> If a client declines recording, the consultation proceeds identically with full attentiveness and care. Declining recording never impacts the quality or availability of your guidance.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#14213D]">
            3. Private Azure Blob Storage & Administrator-Only Access
          </h2>
          <p>
            Consented recordings are encrypted and transmitted directly to private containers within Microsoft Azure Blob Storage.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-[#14213D]">No Client Portal Exposure:</strong> Session recordings are never published, shared, or made downloadable in client portals or public URLs.</li>
            <li><strong className="text-[#14213D]">Restricted Admin Playback:</strong> Access is limited exclusively to authorized supervisory administrators (such as Dr. Nilambari Dave) for mentor quality review and supervision. Every administrative access event generates an immutable entry in the platform security audit log.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-[#14213D]">
            4. 90-Day Retention & Confirmed Deletion Policy
          </h2>
          <p>
            Recordings are subject to a mandatory <strong className="text-[#14213D]">90-day retention countdown</strong> starting from the final session date. Upon reaching the 90-day threshold, the recording file is permanently purged from Azure cloud storage.
          </p>
          <p>
            In strict compliance with our ethical guidelines: <em>Ji Le Zara never pretends a recording was deleted unless deletion has been confirmed and logged in our backend audit verification engine.</em>
          </p>
        </section>
      </div>
    </div>
  );
};
