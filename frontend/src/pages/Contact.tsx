import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Shield, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20 text-left bg-white">
      {/* Header (Dhani-Soft Alternate Section) */}
      <section className="bg-[#EEF5D8]/40 py-16 border-b border-[#E3E8F2] text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="px-3 py-1 rounded-full bg-[#EEF5D8] text-[#14213D] border border-[#B5D56A]/50 text-xs font-bold uppercase tracking-wider">
            Warm Outreach
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl text-[#14213D] font-bold leading-tight">
            Connect with Ji Le Zara
          </h1>
          <p className="text-base text-[#5B6784] max-w-xl mx-auto leading-relaxed">
            Have questions about our guidance categories, plans, or advisor matching? We are here to listen with patience and dignity.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-themed rounded-3xl p-6 sm:p-8 bg-white border border-[#E3E8F2] shadow-soft space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#14213D]">
                  Sanctuary Office & Desk
                </h3>
                <p className="text-xs text-[#5B6784] mt-1">
                  Guided by Dr. Nilambari Dave, PhD
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#1B2440]">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#6E8F1F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#5B6784] block text-[10px] uppercase">Email Outreach</span>
                    <strong className="text-[#14213D]">care@jilezara.com</strong>
                    <span className="text-[10px] text-[#5B6784] block">Proposed domain: www.jilezara.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#6E8F1F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#5B6784] block text-[10px] uppercase">Telephone Calling Desk</span>
                    <strong className="text-[#14213D]">+91 98250 12345</strong>
                    <span className="text-[10px] text-[#5B6784] block">Mon - Sat: 10:00 AM - 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#6E8F1F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#5B6784] block text-[10px] uppercase">Consultation Response Time</span>
                    <strong className="text-[#14213D]">Within 24 Hours</strong>
                    <span className="text-[10px] text-[#5B6784] block">Advisory intake review turnaround</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="p-4 rounded-2xl bg-[#EEF5D8]/50 border border-[#E3E8F2] text-xs text-[#1B2440] space-y-1.5">
              <p className="font-semibold text-[#14213D] flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#6E8F1F]" />
                Emergency Crisis Notice
              </p>
              <p className="leading-relaxed text-[#5B6784]">
                Ji Le Zara does not operate a 24/7 emergency suicide helpline. If you are experiencing acute psychiatric crisis or danger, please dial <strong>112</strong> (National Emergency) or contact the Kiran Mental Health Helpline at <strong>1800-599-0019</strong> immediately.
              </p>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="card-themed rounded-3xl p-6 sm:p-10 bg-white border border-[#E3E8F2] shadow-soft space-y-6">
              <h3 className="font-heading text-2xl font-bold text-[#14213D]">
                Send Us a Note
              </h3>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#EEF5D8] border border-[#B5D56A] text-xs text-[#14213D] space-y-2">
                  <p className="font-bold text-sm text-[#6E8F1F]">✓ Thank you for reaching out.</p>
                  <p>Our team has received your message and will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#14213D] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Radhika Verma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3E8F2] bg-white text-xs text-[#1B2440] focus:border-[#B5D56A] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14213D] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="radhika@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3E8F2] bg-white text-xs text-[#1B2440] focus:border-[#B5D56A] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14213D] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3E8F2] bg-white text-xs text-[#1B2440] focus:border-[#B5D56A] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14213D] mb-1">
                      Your Message / Enquiry *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share what kind of guidance you are looking for (personal, couple, family, student)..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3E8F2] bg-white text-xs text-[#1B2440] focus:border-[#B5D56A] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3.5 px-6 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-[#14213D]" />
                    <span>Send Message Directly to Sanctuary Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
