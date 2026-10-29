import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2d1420] text-[#f7e9e7] pt-16 pb-12 border-t border-brand-wine/20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-14 py-0.5 bg-white rounded-xl p-1 inline-block">
                <img
                  src="/JILeZara.jpeg"
                  alt="Ji Le Zara"
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-[#f7e9e7]/80 leading-relaxed max-w-sm">
              Experience-led personal life coaching and social guidance with <strong>Dr. Nilambari Dave, PhD</strong> — bringing 38+ years of academic and leadership wisdom to every new beginning.
            </p>
            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-brand-gold-light font-semibold">
                Brand Philosophy
              </p>
              <p className="font-serif text-base italic text-brand-cream">
                “Soch se Shanti Tak” — Pause · Reflect · Realign · Live Fully
              </p>
              <p className="text-xs text-brand-gold-muted mt-1">
                Clarity · Confidence · Relationships · Purpose · Joyful Living
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base text-white font-semibold tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#f7e9e7]/80">
              <li>
                <Link to="/" className="hover:text-brand-gold-light transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-gold-light transition-colors">Meet Dr. Dave</Link>
              </li>
              <li>
                <Link to="/stages-of-life" className="hover:text-brand-gold-light transition-colors">7 Stages of Life</Link>
              </li>
              <li>
                <Link to="/plans" className="hover:text-brand-gold-light transition-colors">Coaching Packages</Link>
              </li>
              <li>
                <Link to="/advisors" className="hover:text-brand-gold-light transition-colors">Advisory Mentors</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-brand-gold-light transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-gold-light transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Stages of Life */}
          <div className="space-y-3">
            <h4 className="font-serif text-base text-white font-semibold tracking-wide">
              Who We Help
            </h4>
            <ul className="space-y-2 text-sm text-[#f7e9e7]/80">
              <li>Students & Youth</li>
              <li>Working Professionals</li>
              <li>Women at Every Stage</li>
              <li>Couples & Relationships</li>
              <li>Parents & Families</li>
              <li>Seniors & Retirees</li>
            </ul>
          </div>

          {/* Contact & Legal Policies */}
          <div className="space-y-3">
            <h4 className="font-serif text-base text-white font-semibold tracking-wide">
              Policies & Contact
            </h4>
            <ul className="space-y-2 text-sm text-[#f7e9e7]/80">
              <li>
                <Link to="/client-forms" className="hover:text-brand-gold-light transition-colors font-medium text-brand-gold-light">Client Forms & Agreements</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-brand-gold-light transition-colors">Privacy & Confidentiality</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-gold-light transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cancellation-refund" className="hover:text-brand-gold-light transition-colors">Cancellation & Refunds</Link>
              </li>
              <li>
                <Link to="/recording-consent" className="hover:text-brand-gold-light transition-colors">Recording & Consent (90-Day)</Link>
              </li>
              <li className="pt-2 text-xs text-[#f7e9e7]/90">
                Email: <a href="mailto:hello@jilezara.com" className="text-brand-gold-light hover:underline font-mono">hello@jilezara.com</a>
              </li>
              <li className="text-xs text-[#f7e9e7]/90">
                Website: <span className="text-brand-gold-light font-mono">www.jilezara.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Ethical Non-Medical Disclaimer */}
        <div className="my-8 p-4 rounded-xl bg-brand-wine/20 border border-brand-wine/40 text-xs leading-relaxed text-[#f7e9e7]/80">
          <p className="font-semibold text-brand-gold-light mb-1 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-brand-gold" />
            Social Guidance & Educational Mentoring Notice
          </p>
          <p>
            Ji Le Zara provides personalized life coaching, social guidance, and interpersonal mentoring. Coaching is developmental and educational, not a substitute for medical, psychiatric, or clinical psychological diagnosis or emergency intervention. If you or someone you know is in immediate crisis, please contact emergency services (112 in India) or a specialized helpline.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#f7e9e7]/60 pt-4">
          <p>© {new Date().getFullYear()} Ji Le Zara. All rights reserved. Directed by Dr. Nilambari Dave, PhD.</p>
          <p className="mt-2 sm:mt-0 font-light">
            Every age. Every stage. Every new beginning.
          </p>
        </div>
      </div>
    </footer>
  );
};
