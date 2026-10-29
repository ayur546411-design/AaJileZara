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
    <div className="space-y-16 pb-20 text-left">
      {/* Header */}
      <section className="bg-brand-blush/30 py-16 border-b border-brand-wine/10 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="px-3 py-1 rounded-full gold-badge text-brand-gold text-xs font-bold uppercase tracking-wider">
            Warm Outreach
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-wine font-bold leading-tight">
            Connect with Ji Le Zara
          </h1>
          <p className="text-base text-brand-charcoal/80 max-w-xl mx-auto leading-relaxed">
            Have questions about our guidance categories, plans, or advisor matching? We are here to listen with patience and dignity.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="editorial-card rounded-3xl p-6 sm:p-8 bg-white space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-wine">
                  Sanctuary Office & Desk
                </h3>
                <p className="text-xs text-brand-charcoal/70 mt-1">
                  Guided by Dr. Nilambari Dave, PhD
                </p>
              </div>

              <div className="space-y-4 text-xs text-brand-charcoal/80">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Email Outreach</span>
                    <strong>care@jilezara.com</strong>
                    <span className="text-[10px] text-gray-500 block">Proposed domain: www.jilezara.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Telephone Calling Desk</span>
                    <strong>+91 98250 12345</strong>
                    <span className="text-[10px] text-gray-500 block">Mon - Sat: 10:00 AM - 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Consultation Response Time</span>
                    <strong>Within 24 Hours</strong>
                    <span className="text-[10px] text-gray-500 block">Advisory intake review turnaround</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="p-4 rounded-2xl bg-brand-cream border border-brand-wine/15 text-xs text-brand-charcoal/80 space-y-1.5">
              <p className="font-semibold text-brand-wine flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-brand-gold" />
                Emergency Crisis Notice
              </p>
              <p className="leading-relaxed">
                Ji Le Zara does not operate a 24/7 emergency suicide helpline. If you are experiencing acute psychiatric crisis or danger, please dial <strong>112</strong> (National Emergency) or contact the Kiran Mental Health Helpline at <strong>1800-599-0019</strong> immediately.
              </p>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="editorial-card rounded-3xl p-6 sm:p-10 bg-white space-y-6">
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal">
                Send Us a Note
              </h3>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-2">
                  <p className="font-bold text-sm">✓ Thank you for reaching out.</p>
                  <p>Our team has received your message and will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Radhika Verma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="radhika@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                      Message or Inquiry *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we assist you today? Let us know what guidance questions you have..."
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-4 h-4 text-brand-gold-light" />
                    <span>Send Message to Ji Le Zara</span>
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
