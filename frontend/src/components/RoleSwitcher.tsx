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
        <div className="mb-2 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-elevated border border-[#E3E8F2] w-80 text-[#1B2440] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8F2]">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#6E8F1F] font-bold">
                Platform Perspective Switcher
              </p>
              <p className="text-xs text-[#5B6784]">Test platform from any user lens</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#5B6784] hover:text-[#14213D] p-1"
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
                  ? 'bg-[#EEF5D8] text-[#14213D] font-bold border border-[#B5D56A]'
                  : 'hover:bg-[#EEF5D8]/50 text-[#1B2440]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#5B6784]" />
                <div>
                  <p className="font-medium">Public Visitor</p>
                  <p className="text-[10px] text-[#5B6784]">Anonymous visitor viewing public site</p>
                </div>
              </div>
              {role === 'VISITOR' && <CheckCircle className="w-4 h-4 text-[#6E8F1F]" />}
            </button>

            {/* Seeded Accounts */}
            {demoAccounts.map((account) => {
              const isSelected = currentUser?.id === account.id;

              let icon = <Users className="w-4 h-4 text-gray-400" />;
              let subtitle: string = account.role;

              if (account.role === 'ADMIN') {
                icon = <Shield className="w-4 h-4 text-[#14213D]" />;
                subtitle = 'Admin · Dr. Nilambari Dave, PhD';
              } else if (account.role === 'ADVISOR') {
                icon = <Award className="w-4 h-4 text-[#6E8F1F]" />;
                subtitle = account.advisorProfile?.title || 'Senior Advisor';
              } else if (account.clientCategory === 'STUDENT') {
                icon = <GraduationCap className="w-4 h-4 text-[#2C4A8A]" />;
                subtitle = 'Verified Student (₹500 rate)';
              } else if (account.clientCategory === 'HOMEMAKER') {
                icon = <Home className="w-4 h-4 text-[#6E8F1F]" />;
                subtitle = 'Homemaker (₹1,000 rate)';
              } else if (account.clientCategory === 'PROFESSIONAL') {
                icon = <Briefcase className="w-4 h-4 text-[#14213D]" />;
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
                      ? 'bg-[#EEF5D8] text-[#14213D] font-bold border border-[#B5D56A]'
                      : 'hover:bg-[#EEF5D8]/50 text-[#1B2440]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-[10px] text-[#5B6784]">{subtitle}</p>
                    </div>
                  </div>
                  {isSelected && <CheckCircle className="w-4 h-4 text-[#6E8F1F]" />}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-[#E3E8F2] text-[10px] text-[#5B6784] text-center">
            Role changes update backend authorization headers instantly.
          </div>
        </div>
      )}

      {/* Floating Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#14213D] text-white text-xs font-medium shadow-elevated border border-[#B5D56A]/50 hover:bg-[#0B132B] transition-all"
        title="Switch user perspective"
      >
        <span className="w-2 h-2 rounded-full bg-[#B5D56A] animate-pulse"></span>
        <span className="font-semibold text-[#B5D56A]">
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
