import React, { useState } from 'react';
import { useAuth, UserAccount } from '../context/AuthContext';
import { Users, ChevronUp, ChevronDown, CheckCircle, Shield, GraduationCap, Home, Briefcase, Award } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, role, demoAccounts, switchUser } = useAuth();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Expanded Modal / Menu */}
      {isOpen && (
        <div className="mb-2 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-elevated border border-brand-wine/20 w-80 text-brand-charcoal animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <p className="text-xs uppercase tracking-wider text-brand-gold font-bold">
                Platform Perspective Switcher
              </p>
              <p className="text-xs text-gray-500">Test platform from any user lens</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-1.5 max-h-72 overflow-y-auto">
            {/* Public Visitor */}
            <button
              onClick={() => {
                switchUser(null);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                role === 'VISITOR'
                  ? 'bg-brand-blush text-brand-wine font-semibold border border-brand-wine/20'
                  : 'hover:bg-brand-cream text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="font-medium">Public Visitor</p>
                  <p className="text-[10px] text-gray-400">Anonymous visitor viewing public site</p>
                </div>
              </div>
              {role === 'VISITOR' && <CheckCircle className="w-4 h-4 text-brand-wine" />}
            </button>

            {/* Seeded Accounts */}
            {demoAccounts.map((account) => {
              const isSelected = currentUser?.id === account.id;

              let icon = <Users className="w-4 h-4 text-gray-400" />;
              let subtitle: string = account.role;

              if (account.role === 'ADMIN') {
                icon = <Shield className="w-4 h-4 text-brand-wine" />;
                subtitle = 'Admin · Dr. Nilambari Dave, PhD';
              } else if (account.role === 'ADVISOR') {
                icon = <Award className="w-4 h-4 text-brand-gold" />;
                subtitle = account.advisorProfile?.title || 'Senior Advisor';
              } else if (account.clientCategory === 'STUDENT') {
                icon = <GraduationCap className="w-4 h-4 text-blue-600" />;
                subtitle = 'Verified Student (₹500 rate)';
              } else if (account.clientCategory === 'HOMEMAKER') {
                icon = <Home className="w-4 h-4 text-pink-600" />;
                subtitle = 'Homemaker (₹1,000 rate)';
              } else if (account.clientCategory === 'PROFESSIONAL') {
                icon = <Briefcase className="w-4 h-4 text-emerald-600" />;
                subtitle = 'Working Professional';
              }

              return (
                <button
                  key={account.id}
                  onClick={() => {
                    switchUser(account);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-brand-blush text-brand-wine font-semibold border border-brand-wine/20'
                      : 'hover:bg-brand-cream text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-[10px] text-gray-500">{subtitle}</p>
                    </div>
                  </div>
                  {isSelected && <CheckCircle className="w-4 h-4 text-brand-wine" />}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 text-center">
            Role changes update backend authorization headers instantly.
          </div>
        </div>
      )}

      {/* Floating Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-charcoal text-white text-xs font-medium shadow-elevated border border-brand-gold/30 hover:bg-brand-wine transition-all"
        title="Switch user perspective"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold text-brand-gold-light">
          {role === 'VISITOR' ? 'Public Visitor' : currentUser?.name?.split(' ')[0]}
        </span>
        <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white/90">
          {role}
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
