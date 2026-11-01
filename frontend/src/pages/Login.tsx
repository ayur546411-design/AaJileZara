import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserAccount } from '../context/AuthContext';
import { 
  LogIn, 
  ShieldCheck, 
  HeartHandshake, 
  UserCircle, 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle, 
  Sparkles,
  Info
} from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, demoAccounts, switchUser, role } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle manual login submission
  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    // Match with existing demo accounts or create fallback
    const found = demoAccounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (found) {
      switchUser(found);
      redirectToPortal(found.role);
    } else {
      // Default to general client account
      const fallbackClient: UserAccount = {
        id: 'client-user',
        name: email.split('@')[0] || 'Client Member',
        email,
        role: 'CLIENT',
        clientCategory: 'OTHER',
        isVerifiedStudent: false,
      };
      switchUser(fallbackClient);
      navigate('/portal');
    }
  };

  const handleQuickLogin = (account: UserAccount) => {
    switchUser(account);
    redirectToPortal(account.role);
  };

  const redirectToPortal = (targetRole: string) => {
    if (targetRole === 'ADMIN') {
      navigate('/admin');
    } else if (targetRole === 'ADVISOR') {
      navigate('/advisory-portal');
    } else {
      navigate('/portal');
    }
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Brand Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blush text-brand-wine text-xs font-semibold uppercase tracking-wider border border-brand-wine/15">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Ji Le Zara Platform Access</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal">
          Sign In to Your Space
        </h1>
        <p className="text-sm text-brand-charcoal/75 font-sans leading-relaxed">
          Access your private consultation sanctuary, session cards, and mentoring roadmap.
        </p>
      </div>

      {/* Already Logged In Notice */}
      {currentUser && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-brand-blush/60 border border-brand-wine/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-wine text-white flex items-center justify-center font-bold font-serif">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-brand-charcoal/70">Currently signed in as:</p>
              <p className="text-sm font-bold text-brand-charcoal">{currentUser.name} ({currentUser.role})</p>
              <p className="text-xs text-brand-charcoal/60">{currentUser.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => redirectToPortal(role)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-wine text-white hover:bg-brand-wine-dark transition-all flex items-center justify-center gap-1.5 shadow-soft"
            >
              <span>Go to My Space</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => switchUser(null)}
              className="px-3 py-2 rounded-full text-xs font-semibold text-brand-wine hover:bg-brand-blush border border-brand-wine/20 transition-all"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Email & Password Login */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-brand-wine/15 shadow-soft">
          <h2 className="text-lg font-bold font-serif text-brand-charcoal mb-1">
            Account Login
          </h2>
          <p className="text-xs text-brand-charcoal/70 mb-6">
            Enter your email and password to access your bookings or dashboard.
          </p>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
              <Info className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-wine/20 text-sm focus:outline-none focus:border-brand-wine focus:ring-1 focus:ring-brand-wine/20 bg-brand-cream/30 text-brand-charcoal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-wine/20 text-sm focus:outline-none focus:border-brand-wine focus:ring-1 focus:ring-brand-wine/20 bg-brand-cream/30 text-brand-charcoal"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-wine text-white hover:bg-brand-wine-dark transition-all flex items-center justify-center gap-2 shadow-soft hover:scale-[1.01] active:scale-[0.99]"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-brand-wine/10 flex items-center justify-between text-xs text-brand-charcoal/70">
            <span>Don't have an account yet?</span>
            <Link to="/book" className="text-brand-wine font-bold hover:underline">
              Book a Free Call
            </Link>
          </div>
        </div>

        {/* Right Column: Instant Role / Demo Access */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-brand-sand/50 p-6 rounded-3xl border border-brand-wine/15 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                Quick Access
              </span>
              <h3 className="text-sm font-bold text-brand-charcoal mt-0.5">
                One-Click Test Accounts
              </h3>
              <p className="text-xs text-brand-charcoal/70 mt-1">
                Select any registered role to immediately explore its workspace:
              </p>
            </div>

            <div className="space-y-2">
              {demoAccounts.map((account) => {
                let badgeClass = 'bg-brand-blush text-brand-wine';
                let icon = <UserCircle className="w-4 h-4 text-brand-wine" />;

                if (account.role === 'ADMIN') {
                  badgeClass = 'bg-brand-charcoal text-brand-cream';
                  icon = <ShieldCheck className="w-4 h-4 text-brand-gold-light" />;
                } else if (account.role === 'ADVISOR') {
                  badgeClass = 'bg-brand-wine text-white';
                  icon = <HeartHandshake className="w-4 h-4 text-brand-gold-light" />;
                }

                return (
                  <button
                    key={account.id}
                    onClick={() => handleQuickLogin(account)}
                    className="w-full text-left p-3 rounded-2xl bg-white hover:bg-brand-blush/50 border border-brand-wine/10 hover:border-brand-wine/30 transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-brand-cream">
                        {icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-brand-charcoal group-hover:text-brand-wine transition-colors">
                            {account.name}
                          </p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide ${badgeClass}`}>
                            {account.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-charcoal/60 truncate max-w-[170px]">
                          {account.advisorProfile?.title || account.clientCategory || account.email}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-wine/50 group-hover:text-brand-wine group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-white/80 border border-brand-wine/10 text-[11px] text-brand-charcoal/70 space-y-1">
              <div className="flex items-center gap-1.5 text-brand-wine font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-brand-wine" />
                <span>Confidential & Safe</span>
              </div>
              <p>
                All consultations remain strictly encrypted under our 90-day retention and client privilege charter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

