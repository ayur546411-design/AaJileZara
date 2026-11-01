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
  ArrowRight,
  LogIn,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guidanceDropdownOpen, setGuidanceDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { currentUser, role, switchUser } = useAuth();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setGuidanceDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setGuidanceDropdownOpen(false);
    setUserMenuOpen(false);
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
      icon: <Sparkles className="w-4 h-4 text-[#6E8F1F]" />
    },
    {
      label: 'How It Works',
      path: '/how-it-works',
      desc: '4-step confidential social guidance framework',
      icon: <Compass className="w-4 h-4 text-[#14213D]" />
    },
    {
      label: 'Advisory Mentors',
      path: '/advisors',
      desc: 'Dr. Nilambari Dave, PhD and senior counselors',
      icon: <HeartHandshake className="w-4 h-4 text-[#6E8F1F]" />
    },
    {
      label: 'Client Forms & Legal',
      path: '/client-forms',
      desc: 'Official intake & 90-day recording consent policy',
      icon: <FileText className="w-4 h-4 text-[#14213D]" />
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#14213D]/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_-4px_rgba(11,19,43,0.4)] transition-all text-white">
      {/* Top Notice Bar */}
      <div className="bg-[#0B132B] text-white text-[11px] sm:text-xs tracking-wider border-b border-white/10 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-2 text-[#B5D56A] whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-[#B5D56A]" />
            <span>“Pause · Reflect · Realign · Live Fully”</span>
          </div>

          <div className="flex-1 text-center font-serif italic text-white/90 whitespace-nowrap">
            Soch se Shanti Tak — Mentoring with Dr. Nilambari Dave, PhD
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-white/80 whitespace-nowrap">
            <span>Intake Desk: <a href="mailto:hello@jilezara.com" className="text-[#B5D56A] hover:underline font-mono">hello@jilezara.com</a></span>
            <span className="text-white/30">•</span>
            <span className="text-[#B5D56A] font-medium">Subsidized Tiers Available</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center shrink-0 group py-1">
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-xs transition-transform duration-200 group-hover:scale-[1.02]">
              <img
                src="/JILeZara.jpeg"
                alt="Ji Le Zara — Coaching with Nilambari"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`relative px-3.5 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                isActive('/')
                  ? 'text-[#B5D56A] bg-white/10 font-bold border-b-2 border-[#B5D56A]'
                  : 'text-white/90 hover:text-[#B5D56A] hover:bg-white/5'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`relative px-3.5 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                isActive('/about')
                  ? 'text-[#B5D56A] bg-white/10 font-bold border-b-2 border-[#B5D56A]'
                  : 'text-white/90 hover:text-[#B5D56A] hover:bg-white/5'
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
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                  isGuidanceActive || guidanceDropdownOpen
                    ? 'text-[#B5D56A] bg-white/10 font-bold border-b-2 border-[#B5D56A]'
                    : 'text-white/90 hover:text-[#B5D56A] hover:bg-white/5'
                }`}
              >
                <span>Guidance & Offerings</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${guidanceDropdownOpen ? 'rotate-180 text-[#B5D56A]' : 'text-white/70'}`} />
              </button>

              {/* Dropdown Card */}
              {guidanceDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-white border border-[#E3E8F2] shadow-elevated p-2.5 z-50 transition-all duration-200 text-[#1B2440]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6E8F1F] px-3 pt-1 pb-1.5 border-b border-[#E3E8F2]">
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
                            ? 'bg-[#EEF5D8] text-[#14213D] font-semibold'
                            : 'hover:bg-[#EEF5D8]/50 text-[#1B2440]'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-[#EEF5D8] shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#14213D] leading-snug">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-[#5B6784] font-normal leading-tight mt-0.5">
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
              className={`relative px-3.5 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                isActive('/plans')
                  ? 'text-[#B5D56A] bg-white/10 font-bold border-b-2 border-[#B5D56A]'
                  : 'text-white/90 hover:text-[#B5D56A] hover:bg-white/5'
              }`}
            >
              Packages & Pricing
            </Link>

            <Link
              to="/faq"
              className={`relative px-3.5 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                isActive('/faq')
                  ? 'text-[#B5D56A] bg-white/10 font-bold border-b-2 border-[#B5D56A]'
                  : 'text-white/90 hover:text-[#B5D56A] hover:bg-white/5'
              }`}
            >
              FAQs
            </Link>

            <Link
              to="/contact"
              className={`relative px-3.5 py-2 rounded-full text-[13px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                isActive('/contact')
                  ? 'text-[#B5D56A] bg-white/10 font-bold border-b-2 border-[#B5D56A]'
                  : 'text-white/90 hover:text-[#B5D56A] hover:bg-white/5'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs (Right Column) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase text-white border border-white/40 hover:border-white hover:bg-white/15 transition-all whitespace-nowrap shadow-xs"
                >
                  <UserCircle className="w-4 h-4 text-[#B5D56A] shrink-0" />
                  <span>{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white border border-[#E3E8F2] shadow-elevated p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-[#1B2440]">
                    <div className="px-3 py-2 border-b border-[#E3E8F2]">
                      <p className="text-xs font-bold text-[#14213D] truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-[#6E8F1F] font-semibold uppercase tracking-wider">{currentUser.role}</p>
                    </div>
                    <Link
                      to={role === 'ADMIN' ? '/admin' : role === 'ADVISOR' ? '/advisory-portal' : '/portal'}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 mt-1 rounded-xl text-xs font-medium text-[#1B2440] hover:bg-[#EEF5D8] transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#6E8F1F] shrink-0" />
                      <span>{role === 'ADMIN' ? 'Admin Dashboard' : role === 'ADVISOR' ? 'Advisor Space' : 'Client Portal'}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        switchUser(null);
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5 shrink-0" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase text-white border border-white/40 hover:border-white hover:bg-white/15 transition-all whitespace-nowrap shadow-xs"
              >
                <LogIn className="w-4 h-4 text-white shrink-0" />
                <span>Login</span>
              </Link>
            )}

            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#B5D56A] text-[#14213D] hover:bg-[#a5c758] hover:-translate-y-0.5 hover:shadow-dhani active:translate-y-0 transition-all whitespace-nowrap shadow-soft"
            >
              <Calendar className="w-4 h-4 text-[#14213D] shrink-0" />
              <span>Book a Free Call</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#14213D] px-4 pt-3 pb-6 space-y-3 shadow-elevated animate-in fade-in text-white">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-medium ${
                isActive('/') ? 'bg-[#B5D56A] text-[#14213D] font-bold' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-medium ${
                isActive('/about') ? 'bg-[#B5D56A] text-[#14213D] font-bold' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              About Dr. Nilambari Dave
            </Link>
            <Link
              to="/plans"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-medium ${
                isActive('/plans') ? 'bg-[#B5D56A] text-[#14213D] font-bold' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              Packages & Pricing
            </Link>
            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-medium ${
                isActive('/faq') ? 'bg-[#B5D56A] text-[#14213D] font-bold' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              FAQs & Knowledge Base
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-medium ${
                isActive('/contact') ? 'bg-[#B5D56A] text-[#14213D] font-bold' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              Contact Our Desk
            </Link>
          </div>

          {/* Mobile Guidance Sub-links */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-[10px] uppercase tracking-wider font-bold text-[#B5D56A] px-3 mb-1.5">
              Guidance & Offerings
            </div>
            <div className="space-y-1">
              {guidanceItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
                    isActive(item.path) ? 'bg-[#B5D56A] text-[#14213D] font-bold' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-white/10 shrink-0">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            {currentUser ? (
              <>
                <Link
                  to={role === 'ADMIN' ? '/admin' : role === 'ADVISOR' ? '/advisory-portal' : '/portal'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-full text-xs font-bold text-center uppercase tracking-wider border border-white/40 text-white hover:bg-white/10 transition-all"
                >
                  My Space ({currentUser.name.split(' ')[0]})
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    switchUser(null);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-4 rounded-full text-xs font-medium text-center text-red-400 hover:bg-red-500/10 transition-all"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-full text-xs font-bold text-center uppercase tracking-wider border border-white/40 text-white hover:bg-white/10 transition-all"
              >
                Login
              </Link>
            )}
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-full text-xs font-bold text-center uppercase tracking-wider bg-[#B5D56A] text-[#14213D] shadow-soft"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
