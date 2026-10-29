import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  UserCircle, 
  Calendar, 
  ShieldCheck, 
  HeartHandshake, 
  ChevronDown, 
  Sparkles,
  Compass,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guidanceDropdownOpen, setGuidanceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { role } = useAuth();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setGuidanceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setGuidanceDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isGuidanceActive = [
    '/stages-of-life',
    '/how-it-works',
    '/advisors',
    '/client-forms'
  ].some(p => location.pathname === p);

  const guidanceItems = [
    {
      label: '7 Stages of Life',
      path: '/stages-of-life',
      desc: 'Holistic reflection across childhood to senior life',
      icon: <Sparkles className="w-4 h-4 text-brand-gold" />
    },
    {
      label: 'How It Works',
      path: '/how-it-works',
      desc: '4-step confidential social guidance framework',
      icon: <Compass className="w-4 h-4 text-brand-wine" />
    },
    {
      label: 'Advisory Mentors',
      path: '/advisors',
      desc: 'Dr. Nilambari Dave, PhD and senior counselors',
      icon: <HeartHandshake className="w-4 h-4 text-brand-gold" />
    },
    {
      label: 'Client Forms & Legal',
      path: '/client-forms',
      desc: 'Official intake & 90-day recording consent policy',
      icon: <FileText className="w-4 h-4 text-brand-wine" />
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fffdfa]/95 backdrop-blur-md border-b border-[#ebdcd0] shadow-[0_2px_16px_-3px_rgba(121,12,53,0.05)] transition-all">
      {/* Top Notice Bar */}
      <div className="bg-brand-wine text-white text-[11px] sm:text-xs tracking-wider border-b border-brand-gold/20 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-2 text-brand-gold-light/95 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
            <span>“Pause · Reflect · Realign · Live Fully”</span>
          </div>

          <div className="flex-1 text-center font-serif italic text-brand-gold-light whitespace-nowrap">
            Soch se Shanti Tak — Mentoring with Dr. Nilambari Dave, PhD
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-[#f7e9e7]/90 whitespace-nowrap">
            <span>Intake Desk: <a href="mailto:hello@jilezara.com" className="text-brand-gold-light hover:underline font-mono">hello@jilezara.com</a></span>
            <span className="text-brand-gold-light/40">•</span>
            <span className="text-brand-gold-light font-medium">Subsidized Tiers Available</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center shrink-0 group py-1">
            <img
              src="/JILeZara.jpeg"
              alt="Ji Le Zara — Coaching with Nilambari"
              className="h-11 sm:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-150 ${
                isActive('/')
                  ? 'text-brand-wine bg-brand-blush/80 font-semibold shadow-xs'
                  : 'text-brand-charcoal/80 hover:text-brand-wine hover:bg-brand-blush/40'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-150 ${
                isActive('/about')
                  ? 'text-brand-wine bg-brand-blush/80 font-semibold shadow-xs'
                  : 'text-brand-charcoal/80 hover:text-brand-wine hover:bg-brand-blush/40'
              }`}
            >
              About
            </Link>

            {/* Guidance Dropdown */}
            <div 
              ref={dropdownRef} 
              className="relative"
              onMouseEnter={() => setGuidanceDropdownOpen(true)}
              onMouseLeave={() => setGuidanceDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setGuidanceDropdownOpen(!guidanceDropdownOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-150 ${
                  isGuidanceActive || guidanceDropdownOpen
                    ? 'text-brand-wine bg-brand-blush/80 font-semibold shadow-xs'
                    : 'text-brand-charcoal/80 hover:text-brand-wine hover:bg-brand-blush/40'
                }`}
              >
                <span>Guidance & Offerings</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${guidanceDropdownOpen ? 'rotate-180 text-brand-wine' : 'text-brand-charcoal/60'}`} />
              </button>

              {/* Dropdown Card */}
              {guidanceDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-white border border-brand-wine/15 shadow-elevated p-2.5 z-50 transition-all duration-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-gold px-3 pt-1 pb-1.5 border-b border-brand-wine/10">
                    Platform Offerings
                  </div>
                  <div className="space-y-1 pt-1.5">
                    {guidanceItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setGuidanceDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                          isActive(item.path)
                            ? 'bg-brand-blush text-brand-wine font-semibold'
                            : 'hover:bg-brand-cream/60 text-brand-charcoal'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-brand-blush/60 shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-brand-charcoal leading-snug">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-[#675b59] font-normal leading-tight mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/plans"
              className={`px-3 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-150 ${
                isActive('/plans')
                  ? 'text-brand-wine bg-brand-blush/80 font-semibold shadow-xs'
                  : 'text-brand-charcoal/80 hover:text-brand-wine hover:bg-brand-blush/40'
              }`}
            >
              Packages & Pricing
            </Link>

            <Link
              to="/faq"
              className={`px-3 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-150 ${
                isActive('/faq')
                  ? 'text-brand-wine bg-brand-blush/80 font-semibold shadow-xs'
                  : 'text-brand-charcoal/80 hover:text-brand-wine hover:bg-brand-blush/40'
              }`}
            >
              FAQs
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-150 ${
                isActive('/contact')
                  ? 'text-brand-wine bg-brand-blush/80 font-semibold shadow-xs'
                  : 'text-brand-charcoal/80 hover:text-brand-wine hover:bg-brand-blush/40'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs (Right Column) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {role === 'ADMIN' ? (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-brand-charcoal text-brand-cream hover:bg-brand-wine transition-all shadow-xs whitespace-nowrap"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-light" />
                <span>Admin Space</span>
              </Link>
            ) : role === 'ADVISOR' ? (
              <Link
                to="/advisory-portal"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-brand-wine text-white hover:bg-brand-wine-dark transition-all shadow-xs whitespace-nowrap"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-brand-gold-light" />
                <span>Advisor Space</span>
              </Link>
            ) : (
              <Link
                to="/portal"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase text-brand-wine border border-brand-wine/25 hover:border-brand-wine hover:bg-brand-blush/50 transition-all whitespace-nowrap shadow-xs"
              >
                <UserCircle className="w-4 h-4 text-brand-gold" />
                <span>Client Portal</span>
              </Link>
            )}

            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-brand-wine via-[#8B1340] to-brand-wine text-white hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shadow-soft"
            >
              <Calendar className="w-3.5 h-3.5 text-brand-gold-light" />
              <span>Book a Free Call</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-brand-wine hover:bg-brand-blush focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#ebdcd0] bg-[#fffaf5] px-4 pt-3 pb-6 space-y-3 shadow-elevated animate-in fade-in">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-medium ${
                isActive('/') ? 'bg-brand-blush text-brand-wine font-semibold' : 'text-brand-charcoal hover:bg-brand-blush/40'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-medium ${
                isActive('/about') ? 'bg-brand-blush text-brand-wine font-semibold' : 'text-brand-charcoal hover:bg-brand-blush/40'
              }`}
            >
              About Dr. Nilambari Dave
            </Link>
            <Link
              to="/plans"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-medium ${
                isActive('/plans') ? 'bg-brand-blush text-brand-wine font-semibold' : 'text-brand-charcoal hover:bg-brand-blush/40'
              }`}
            >
              Packages & Pricing
            </Link>
            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-medium ${
                isActive('/faq') ? 'bg-brand-blush text-brand-wine font-semibold' : 'text-brand-charcoal hover:bg-brand-blush/40'
              }`}
            >
              FAQs & Knowledge Base
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-medium ${
                isActive('/contact') ? 'bg-brand-blush text-brand-wine font-semibold' : 'text-brand-charcoal hover:bg-brand-blush/40'
              }`}
            >
              Contact Our Desk
            </Link>
          </div>

          {/* Mobile Guidance Sub-links */}
          <div className="pt-2 border-t border-brand-wine/10">
            <div className="text-[10px] uppercase tracking-wider font-bold text-brand-gold px-3 mb-1.5">
              Guidance & Offerings
            </div>
            <div className="space-y-1">
              {guidanceItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
                    isActive(item.path) ? 'bg-brand-blush text-brand-wine font-semibold' : 'text-brand-charcoal hover:bg-brand-blush/30'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="pt-3 border-t border-brand-wine/10 flex flex-col gap-2">
            <Link
              to="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full text-xs font-semibold text-center uppercase tracking-wider border border-brand-wine text-brand-wine hover:bg-brand-blush transition-all"
            >
              Open Client Portal
            </Link>
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full text-xs font-bold text-center uppercase tracking-wider bg-brand-wine text-white shadow-soft"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
