import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  Lock, 
  Eye, 
  FileText, 
  Send,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const AdvisoryPortal: React.FC = () => {
  const { currentUser, role } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'requests' | 'bookings'>('requests');
  const [isLoading, setIsLoading] = useState(true);

  // Active Review Modal / Drawer
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [clientRecommendations, setClientRecommendations] = useState('');
  const [status, setStatus] = useState('REVIEWED');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      Promise.all([
        api.getAllAdvisoryRequests(),
        api.getAllBookings(),
      ])
        .then(([reqRes, bookRes]) => {
          if (reqRes.success) setRequests(reqRes.requests || []);
          if (bookRes.success) setBookings(bookRes.bookings || []);
        })
        .catch((err) => console.warn('Advisory portal load error:', err))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (role !== 'ADVISOR' && role !== 'ADMIN') {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-brand-wine/10 text-brand-wine flex items-center justify-center mx-auto font-bold">
          !
        </div>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal">Advisor Space Protected</h2>
        <p className="text-xs text-brand-charcoal/70 leading-relaxed">
          This portal is reserved for authorized Advisory Team mentors. Please switch to an Advisor account (e.g. <em>Prof. Ananya Sengupta</em>) using the floating perspective pill at the bottom right.
        </p>
      </div>
    );
  }

  const handleOpenReview = (req: any) => {
    setSelectedRequest(req);
    setInternalNotes(req.internalNotes || '');
    setClientRecommendations(req.clientRecommendations || '');
    setStatus(req.status || 'REVIEWED');
    setSaveSuccess(false);
  };

  const handleSaveReview = async () => {
    if (!selectedRequest) return;
    try {
      const res = await api.reviewAdvisoryRequest(selectedRequest.id, {
        status,
        internalNotes,
        clientRecommendations,
      });

      if (res.success) {
        setSaveSuccess(true);
        // Update local list
        setRequests(requests.map((r) => (r.id === selectedRequest.id ? res.request : r)));
        setTimeout(() => {
          setSelectedRequest(null);
          setSaveSuccess(false);
        }, 1500);
      }
    } catch (err: any) {
      console.error('Save review error:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Advisor Header */}
      <div className="editorial-card rounded-3xl p-6 sm:p-8 bg-white border border-brand-wine/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-brand-gold font-bold">
            Advisory Team Portal · Internal Space
          </span>
          <h1 className="font-serif text-3xl font-bold text-brand-wine">
            Welcome, {currentUser?.name}
          </h1>
          <p className="text-xs text-brand-charcoal/70">
            Role: <strong>{role}</strong> · Review assigned client intakes, add confidential internal notes, and recommend roadmap steps.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-brand-cream border border-brand-wine/15">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'requests'
                ? 'bg-brand-wine text-white shadow-sm'
                : 'text-brand-charcoal hover:bg-white'
            }`}
          >
            Advisory Requests ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'bookings'
                ? 'bg-brand-wine text-white shadow-sm'
                : 'text-brand-charcoal hover:bg-white'
            }`}
          >
            Assigned Bookings ({bookings.length})
          </button>
        </div>
      </div>

      {/* Main Content View */}
      {activeTab === 'requests' ? (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-brand-charcoal">
            Plan B Guidance Requests
          </h2>

          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="editorial-card rounded-2xl p-6 bg-white border border-brand-wine/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-wine">
                      {req.requestRef}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="font-semibold text-xs text-brand-charcoal">
                      {req.client?.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-blush text-brand-wine font-medium">
                      {req.client?.clientCategory}
                    </span>
                  </div>

                  <p className="text-xs text-brand-charcoal/80 line-clamp-2">
                    "{req.concernSummary}"
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-1">
                    <span>Lang: <strong>{req.preferredLanguage}</strong></span>
                    <span>Contact: <strong>{req.preferredContact}</strong></span>
                    <span>Area: <strong>{req.category?.name || 'General'}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    req.status === 'NEW'
                      ? 'bg-amber-100 text-amber-800'
                      : req.status === 'REVIEWED'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {req.status}
                  </span>

                  <button
                    onClick={() => handleOpenReview(req)}
                    className="px-4 py-2 rounded-full text-xs font-semibold bg-brand-charcoal text-white hover:bg-brand-wine transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Review & Advise</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Bookings View */
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-brand-charcoal">
            Upcoming & Assigned Consultations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="editorial-card rounded-2xl p-5 bg-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-wine">
                    {b.bookingRef}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {b.status}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-brand-charcoal">
                  {b.client?.name}
                </h3>
                <p className="text-xs text-brand-charcoal/70">
                  {b.category?.name} · {b.sessionType === 'LIVE_VIDEO' ? 'Live Video' : 'Telephone'}
                </p>

                <div className="p-3 rounded-xl bg-brand-cream/50 text-[11px] text-brand-charcoal/75 space-y-1">
                  <p>
                    <strong>Scheduled:</strong> {new Date(b.scheduledAt).toLocaleString('en-IN')}
                  </p>
                  <p>
                    <strong>Phone:</strong> {b.client?.phone || 'Not supplied'}
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href={`/session/${b.sessionUid}`}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-colors"
                  >
                    Open Session Bridge
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-gold uppercase">
                  {selectedRequest.requestRef}
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-charcoal">
                  Review Client Intake & Craft Guidance
                </h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                ✓ Guidance notes and status updated successfully.
              </div>
            )}

            {/* Client Context Box */}
            <div className="p-4 rounded-xl bg-brand-blush/30 border border-brand-wine/10 text-xs space-y-2">
              <div className="flex justify-between font-semibold text-brand-wine">
                <span>Client: {selectedRequest.client?.name}</span>
                <span>Category: {selectedRequest.client?.clientCategory}</span>
              </div>
              <p className="text-brand-charcoal/80 leading-relaxed italic">
                "{selectedRequest.concernSummary}"
              </p>
            </div>

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                Update Case Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-wine focus:outline-none bg-white"
              >
                <option value="NEW">NEW - Unreviewed</option>
                <option value="REVIEWED">REVIEWED - Intake Assessed</option>
                <option value="INTRO_SCHEDULED">INTRO_SCHEDULED - Introductory Call Booked</option>
                <option value="RECOMMENDED">RECOMMENDED - Care Plan Issued</option>
                <option value="CLOSED">CLOSED - Engagement Completed</option>
              </select>
            </div>

            {/* Internal Confidential Notes (Advisor/Admin ONLY) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-brand-wine flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-brand-wine" />
                  <span>Confidential Internal Notes (Team Only - Hidden from Client)</span>
                </label>
              </div>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Record clinical-social observations, sensitive family dynamics, or reassignment recommendations..."
                className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-wine"
              />
            </div>

            {/* Client Visible Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-brand-charcoal flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Client-Visible Guidance Recommendations (Shown in Client Portal)</span>
                </label>
              </div>
              <textarea
                rows={3}
                value={clientRecommendations}
                onChange={(e) => setClientRecommendations(e.target.value)}
                placeholder="Write caring, actionable suggestions or recommended next packages for the client..."
                className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-wine"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 rounded-full text-xs text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveReview}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-colors"
              >
                Save Guidance Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
