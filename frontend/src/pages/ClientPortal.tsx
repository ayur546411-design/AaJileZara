import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  Video, 
  PhoneCall, 
  Clock, 
  FileText, 
  CheckCircle, 
  UploadCloud, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ClientPortal: React.FC = () => {
  const { currentUser, role } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Student verification form state
  const [studentDocUrl, setStudentDocUrl] = useState('');
  const [docUploaded, setDocUploaded] = useState(false);

  useEffect(() => {
    if (currentUser) {
      Promise.all([
        api.getMyBookings(),
        api.getMyAdvisoryRequests(),
      ])
        .then(([bRes, rRes]) => {
          if (bRes.success) setBookings(bRes.bookings || []);
          if (rRes.success) setRequests(rRes.requests || []);
        })
        .catch((err) => console.warn('Portal load error:', err))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-wine/10 text-brand-wine flex items-center justify-center mx-auto text-2xl font-serif font-bold">
          JZ
        </div>
        <h2 className="font-serif text-3xl font-bold text-brand-charcoal">Client Sanctuary Portal</h2>
        <p className="text-xs text-brand-charcoal/70 leading-relaxed">
          Please log in or select a demo client account from the floating perspective pill at the bottom right to access your upcoming consultations and personal session cards.
        </p>
        <div className="p-4 rounded-xl bg-brand-blush/40 border border-brand-wine/15 text-xs text-brand-charcoal/80">
          💡 <strong>Tip for testing:</strong> Click the pill button in the bottom right corner and choose <em>"Aarav Sharma (Student)"</em> or <em>"Sunita Patel (Homemaker)"</em>.
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'SCHEDULED');
  const pastBookings = bookings.filter((b) => b.status === 'COMPLETED' || b.status === 'CANCELLED');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      {/* Welcome Banner */}
      <div className="editorial-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-white via-brand-cream to-white border border-brand-wine/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-brand-gold font-bold">
            Private Client Portal
          </span>
          <h1 className="font-serif text-3xl font-bold text-brand-wine">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-xs text-brand-charcoal/70">
            Client Category: <strong className="capitalize">{currentUser.clientCategory?.toLowerCase()}</strong>
            {currentUser.isVerifiedStudent && (
              <span className="ml-2 inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ Student Discount Verified
              </span>
            )}
          </p>
        </div>

        <Link
          to="/book"
          className="px-6 py-2.5 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all shadow-sm"
        >
          Book Another Session
        </Link>
      </div>

      {/* Upcoming Sessions & Digital Session Cards */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-charcoal">
          Upcoming Scheduled Sessions
        </h2>

        {upcomingBookings.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-brand-wine/10 text-center text-xs text-gray-500 space-y-2">
            <p>You have no upcoming sessions scheduled.</p>
            <Link to="/book" className="text-brand-wine font-semibold hover:underline block">
              Schedule a guidance session now →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingBookings.map((b) => (
              <div
                key={b.id}
                className="editorial-card rounded-2xl p-6 bg-white border-2 border-brand-wine/15 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-blush text-brand-wine font-mono text-[11px] font-bold">
                      {b.bookingRef}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                      Confirmed
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                    {b.category?.name || 'Personal Guidance Session'}
                  </h3>

                  <div className="space-y-1.5 text-xs text-brand-charcoal/75">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" />
                      <span>
                        {new Date(b.scheduledAt).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        at{' '}
                        {new Date(b.scheduledAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        IST
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Counselor: <strong>{b.advisor?.user?.name || 'Assigned Senior Advisor'}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      {b.sessionType === 'LIVE_VIDEO' ? (
                        <>
                          <Video className="w-3.5 h-3.5 text-brand-wine" />
                          <span>Live Video Session</span>
                        </>
                      ) : (
                        <>
                          <PhoneCall className="w-3.5 h-3.5 text-brand-wine" />
                          <span>Private Telephone Call</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-wine/10 flex items-center justify-between">
                  <Link
                    to={`/session/${b.sessionUid}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all shadow-sm"
                  >
                    <span>Open Live Session Card</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <span className="text-[11px] text-gray-400 font-mono">
                    ID: {b.sessionUid.slice(0, 12)}...
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Plan B Advisory Requests & Action Recommendations */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-charcoal">
          Plan B Advisory Guidance Requests
        </h2>

        {requests.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white border border-brand-wine/10 text-xs text-gray-500">
            No pending advisory requests. If you are uncertain about what path to take, you can submit a request on our Plans page.
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="editorial-card rounded-2xl p-5 bg-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-brand-gold">
                      {req.requestRef}
                    </span>
                    <span className="ml-2 font-semibold text-xs text-brand-charcoal">
                      {req.category?.name || 'General Advisory Assessment'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-blush text-brand-wine text-[10px] font-bold uppercase">
                    Status: {req.status}
                  </span>
                </div>

                {req.clientRecommendations ? (
                  <div className="p-3.5 rounded-xl bg-brand-cream/60 border border-brand-gold/20 text-xs text-brand-charcoal leading-relaxed">
                    <p className="font-semibold text-brand-gold-muted mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                      Advisor Recommendations & Roadmap:
                    </p>
                    <p className="italic">{req.clientRecommendations}</p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    Our authorized intake coordinator is currently reviewing your circumstance. You will receive tailored guidance notes here shortly.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional Student Discount Verification Upload */}
      {currentUser.clientCategory === 'STUDENT' && !currentUser.isVerifiedStudent && (
        <div className="editorial-card rounded-2xl p-6 bg-brand-blush/30 border border-brand-wine/15 space-y-3">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-brand-wine" />
            <h3 className="font-serif text-base font-bold text-brand-charcoal">
              Optional Student Verification
            </h3>
          </div>
          <p className="text-xs text-brand-charcoal/70 leading-relaxed">
            To maintain our ₹500 student rate, please submit a link or scan of your university / college ID card. This is kept strictly private and only verified once by an administrator.
          </p>

          {docUploaded ? (
            <p className="text-xs text-emerald-700 font-semibold">
              ✓ Document submitted for administrative verification.
            </p>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Paste link to student ID card or portal (Google Drive / PDF / Image)"
                value={studentDocUrl}
                onChange={(e) => setStudentDocUrl(e.target.value)}
                className="w-full sm:w-96 px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none bg-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (studentDocUrl) setDocUploaded(true);
                }}
                className="w-full sm:w-auto px-5 py-2 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-colors"
              >
                Submit for Verification
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
