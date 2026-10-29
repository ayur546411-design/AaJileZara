import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  PhoneCall,
  Video,
  Clock,
  HeartHandshake
} from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category: 'general' | 'coaching_vs_therapy' | 'packages_pricing' | 'recording_privacy' | 'booking_sessions';
}

export const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'general',
      q: 'Who is Dr. Nilambari Dave, PhD?',
      a: 'Dr. Nilambari Dave is an esteemed academician, former Vice-Chancellor and Dean, with over 38 years of experience in higher education, human development, family studies, and social guidance. At Ji Le Zara, she brings warmth, academic rigor, and grounded life wisdom to help individuals, couples, and families navigate emotional and interpersonal transitions.',
    },
    {
      category: 'general',
      q: 'What is the philosophy “Soch se Shanti Tak”?',
      a: '“Soch se Shanti Tak” translates from “Overthinking to Peaceful Presence”. It represents our core mentorship goal: helping you pause mental chatter and emotional exhaustion, reflect on underlying values, realign choices, and return to everyday domestic calm.',
    },
    {
      category: 'coaching_vs_therapy',
      q: 'How is social guidance and coaching different from clinical therapy or psychiatry?',
      a: 'Ji Le Zara provides educational, developmental, and social guidance for life crossroads, relational friction, self-worth, and communication. We do NOT provide psychiatric medical treatment, clinical diagnoses, or pharmacological prescriptions. If someone is experiencing acute clinical psychiatric distress or suicidal crisis, we refer them to licensed medical facilities or emergency helplines.',
    },
    {
      category: 'coaching_vs_therapy',
      q: 'Can I discuss domestic, in-law, or marriage conflicts?',
      a: 'Yes. Intergenerational family friction, spousal communication barriers, parenting dilemmas, and domestic boundary challenges form our primary domain of expertise. Our frameworks are non-judgmental, dignified, and rooted in decades of family development research.',
    },
    {
      category: 'packages_pricing',
      q: 'Are there subsidized rates for students and homemakers?',
      a: 'Yes. Ji Le Zara firmly believes in inclusive, fair access. Students can book guidance sessions starting at ₹500 with minimal verification. Homemakers have a dedicated community tier starting at ₹1,000 to honor their invaluable daily contribution to family life.',
    },
    {
      category: 'packages_pricing',
      q: 'What is the difference between Plan A and Plan B?',
      a: 'Plan A (Direct Guidance) is for individuals who know their focus area and want to book a single 60-min session directly with an available coach or Dr. Dave immediately. Plan B (Advisory Team Support) is for complex, multi-layered family situations where our senior intake desk reviews your situation within 24 hours, pairs you with the best mentor, and structures a two-session guided path.',
    },
    {
      category: 'packages_pricing',
      q: 'What is included in the FREE 20-minute Discovery Call?',
      a: 'The Discovery Call is a zero-obligation, introductory conversation to discuss what you are navigating, answer your questions, and determine whether Ji Le Zara is the right sanctuary for your needs.',
    },
    {
      category: 'booking_sessions',
      q: 'How do online sessions work?',
      a: 'Sessions are conducted via private telephone call or secure HD video conference. When you book, you receive an instant Digital Live Session ID Card with your private link, mentor details, and calendar invite. No complex app downloads are necessary.',
    },
    {
      category: 'booking_sessions',
      q: 'What is your rescheduling and cancellation policy?',
      a: 'You can reschedule your appointment at no extra charge with at least 24 hours’ advance notice. Cancellations made with 24 hours’ notice are eligible for full refunds through our payment gateway.',
    },
    {
      category: 'recording_privacy',
      q: 'Are coaching sessions recorded?',
      a: 'By default, sessions are strictly UNRECORDED. In compliance with our official Client Agreement, recording only occurs if you explicitly select "YES" on the single-choice Recording Consent form. Recordings are stored in access-controlled vaults accessible only to Dr. Dave for review, never shared or used in marketing, and permanently deleted after 90 days.',
    },
    {
      category: 'recording_privacy',
      q: 'Where can I review the official Client Intake & Recording Consent Form?',
      a: 'You can view and download the official PDF at any time via our Client Forms portal, or review each section during Step 3 of the booking flow. You can also download the signed PDF for your personal records.',
    },
    {
      category: 'booking_sessions',
      q: 'What if I am outside India? What timezone do you follow?',
      a: 'All sessions are scheduled in Indian Standard Time (IST - UTC+05:30). Our interactive booking scheduler automatically displays IST time slots and handles timezone adjustments for international clients.',
    },
    {
      category: 'booking_sessions',
      q: 'What are the requirements for couples or joint family coaching sessions?',
      a: 'In accordance with our official Client Agreement, for couple or joint sessions, each adult participant must independently review the agreement and separately submit their own Recording Consent choice. Services involving minors require a separate safeguarding and parent/guardian consent procedure.',
    },
    {
      category: 'recording_privacy',
      q: 'Can I withdraw my recording consent after booking or during a package?',
      a: 'Yes. Recording requires separate, affirmative consent and is never mandatory. You may decline recording or withdraw consent for future sessions at any time by emailing hello@jilezara.com. Recording will stop immediately upon withdrawal, and an unrecorded session will be conducted.',
    },
    {
      category: 'recording_privacy',
      q: 'What are the legal exceptions to confidentiality under Indian law?',
      a: 'All coaching discussions remain strictly confidential between you and Dr. Dave / your advisory coach. As set forth in Section C of our Client Agreement, confidentiality has limited statutory exceptions where disclosure is required by law or strictly necessary to respond to a serious and imminent safety concern.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General & Leadership' },
    { id: 'coaching_vs_therapy', label: 'Guidance vs Therapy' },
    { id: 'packages_pricing', label: 'Pricing & Subsidies' },
    { id: 'booking_sessions', label: 'Booking & Sessions' },
    { id: 'recording_privacy', label: '90-Day Privacy & Recording' },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-brand-blush/30 py-16 border-b border-brand-wine/10 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-badge text-xs uppercase tracking-wider font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-brand-gold" />
            <span>Client Help Desk & Knowledge Base</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-wine font-bold leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-brand-charcoal/80 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Dr. Nilambari Dave’s coaching philosophy, packages, confidentiality safeguards, and appointment logistics.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions (e.g., student subsidy, recording, therapy)..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-brand-wine/20 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-wine focus:outline-none shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-wine text-white shadow-sm'
                  : 'bg-white text-brand-charcoal/80 border border-brand-wine/15 hover:bg-brand-blush/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300 p-8">
            <p className="text-sm text-gray-500">No matching questions found for "{searchTerm}".</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs font-bold text-brand-wine hover:underline"
            >
              Clear filters and view all questions
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-[#e8d6c5] rounded-2xl bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left text-sm sm:text-base font-bold text-brand-charcoal flex items-center justify-between hover:bg-brand-cream/30 gap-4"
                >
                  <span className="font-serif">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-wine shrink-0 transition-transform duration-200 ${
                      openIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === idx && (
                  <div className="px-5 pb-6 pt-1 text-xs sm:text-sm text-[#544a46] leading-relaxed border-t border-[#e8d6c5]/50 transition-all duration-200 ease-out">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Official Client Forms Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-brand-blush/40 border border-brand-wine/20 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-wine text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4 text-brand-gold" />
              <span>Official Legal Compliance</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal">
              Client Intake & Recording Consent Documents
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal/80 max-w-xl leading-relaxed">
              Review our complete Client Intake & Coaching Agreement, non-medical disclosure, and 90-day recording retention policies in accordance with Indian regulations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/client-forms"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all shadow-sm text-center"
            >
              View Client Forms Online
            </Link>
            <a
              href="/Ji_Le_Zara_Client_Forms.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-brand-charcoal hover:bg-brand-cream border border-brand-wine/20 transition-all text-center"
            >
              Download PDF Form
            </a>
          </div>
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-white border border-brand-wine/10 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-brand-wine">
            Have a Specific Question About Your Circumstances?
          </h3>
          <p className="text-xs sm:text-sm text-brand-charcoal/70 max-w-xl mx-auto leading-relaxed">
            Book a complimentary 20-minute Discovery Call with Dr. Nilambari Dave or send our advisory intake desk a confidential note.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="px-6 py-3 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all shadow-soft inline-flex items-center gap-2"
            >
              <span>Book a Free Discovery Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full text-xs font-semibold bg-brand-blush/60 text-brand-wine hover:bg-brand-wine hover:text-white transition-all"
            >
              Contact Our Desk
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
};
