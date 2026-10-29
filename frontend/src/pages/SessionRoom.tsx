import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { 
  Video, 
  PhoneCall, 
  ShieldCheck, 
  Radio, 
  Mic, 
  MicOff, 
  VideoOff, 
  Copy, 
  Calendar, 
  CheckCircle,
  AlertTriangle,
  FileText
} from 'lucide-react';

export const SessionRoom: React.FC = () => {
  const { sessionUid } = useParams<{ sessionUid: string }>();
  const [sessionCard, setSessionCard] = useState<any | null>(null);
  const [roomAuth, setRoomAuth] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Video UI states
  const [inCall, setInCall] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [recordingConsentGiven, setRecordingConsentGiven] = useState(false);
  const [recordingNotice, setRecordingNotice] = useState<string | null>(null);
  const [sessionNotes, setSessionNotes] = useState('');

  // Fetch session card & authorized room token
  useEffect(() => {
    if (sessionUid) {
      api.getSessionCard(sessionUid)
        .then((res) => {
          if (res.success && res.card) {
            setSessionCard(res.card);
            setRecordingConsentGiven(res.card.recordingConsentGiven || false);

            // Fetch room token
            return api.getRoomToken(sessionUid);
          } else {
            throw new Error(res.message || 'Session not found.');
          }
        })
        .then((authRes) => {
          if (authRes && authRes.success) {
            setRoomAuth(authRes);
          }
        })
        .catch((err) => {
          setErrorMessage(err.message || 'Failed to load session details.');
        })
        .finally(() => setIsLoading(false));
    }
  }, [sessionUid]);

  // Toggle recording consent
  const handleConsentToggle = async (grant: boolean) => {
    if (!sessionUid) return;
    try {
      const res = await api.setRecordingConsent(sessionUid, grant);
      if (res.success) {
        setRecordingConsentGiven(grant);
        setRecordingNotice(res.message);
        setTimeout(() => setRecordingNotice(null), 4000);
      }
    } catch (err: any) {
      console.error('Consent error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-xl text-brand-wine">Connecting to secure session bridge...</p>
        <p className="text-xs text-gray-500 mt-2">Verifying participant authorization & room credentials.</p>
      </div>
    );
  }

  if (errorMessage || !sessionCard) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
          !
        </div>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal">Session Not Found</h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          {errorMessage || 'This session identifier is invalid or has expired.'}
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-full text-xs font-semibold bg-brand-wine text-white"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner with Session ID and Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-brand-wine/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider">
              {sessionCard.sessionCardUid || sessionCard.bookingRef}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-wine mt-0.5">
            {sessionCard.categoryName} Guidance Session
          </h1>
          <p className="text-xs text-brand-charcoal/70">
            Mentor: <strong>{sessionCard.advisorName}</strong> · Client: <strong>{sessionCard.clientName}</strong>
          </p>
        </div>

        {/* Live Recording Status Badge */}
        <div className="flex items-center gap-2">
          {recordingConsentGiven ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold animate-pulse">
              <Radio className="w-3.5 h-3.5" />
              <span>Recording Active (Dual Consent Verified)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Recording Disabled (Private Session)</span>
            </div>
          )}
        </div>
      </div>

      {recordingNotice && (
        <div className="p-3 rounded-xl bg-brand-cream border border-brand-gold/30 text-xs text-brand-charcoal animate-in fade-in">
          {recordingNotice}
        </div>
      )}

      {/* Main Grid: Video Consultation Room & In-Session Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Video Screen Area */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-3xl bg-brand-charcoal aspect-[16/10] overflow-hidden shadow-elevated flex flex-col justify-between p-6 text-white border-2 border-brand-wine/20">
            
            {/* Top Room Bar */}
            <div className="flex items-center justify-between text-xs text-white/80 z-10">
              <span className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                <Video className="w-3.5 h-3.5 text-brand-gold-light" />
                <span>Daily Video SDK Bridge (Central India)</span>
              </span>
              <span className="bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                Encrypted Peer SFU Room
              </span>
            </div>

            {/* Video Content Canvas */}
            <div className="flex-1 flex items-center justify-center relative my-4">
              {!inCall ? (
                <div className="text-center space-y-4 max-w-sm">
                  <div className="w-20 h-20 rounded-full bg-brand-wine/40 border border-brand-wine flex items-center justify-center mx-auto text-3xl font-serif">
                    🌸
                  </div>
                  <h3 className="font-serif text-xl font-bold">Ready to Enter Consultation?</h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Ensure you are in a quiet, undisturbed space. Take three deep breaths and step in with an open mind.
                  </p>
                  <button
                    onClick={() => setInCall(true)}
                    className="px-8 py-3 rounded-full text-xs font-bold bg-brand-cream text-brand-wine hover:bg-white transition-all shadow-gold"
                  >
                    Enter Live Video Room
                  </button>
                </div>
              ) : (
                /* Active Simulated Interactive Video Tile */
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Advisor Video Tile */}
                  <div className="rounded-2xl overflow-hidden bg-stone-900 border border-white/10 relative flex items-center justify-center">
                    <img
                      src={sessionCard.advisorAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'}
                      alt={sessionCard.advisorName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>{sessionCard.advisorName} (Mentor)</span>
                    </div>
                  </div>

                  {/* Client Video Tile */}
                  <div className="rounded-2xl overflow-hidden bg-stone-900 border border-white/10 relative flex items-center justify-center">
                    {isVideoMuted ? (
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 rounded-full bg-brand-wine flex items-center justify-center mx-auto font-serif text-xl">
                          {sessionCard.clientName?.[0] || 'U'}
                        </div>
                        <p className="text-xs text-white/60">Camera Paused</p>
                      </div>
                    ) : (
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                        alt="Your Video Stream"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>{sessionCard.clientName} (You)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls Bar */}
            {inCall && (
              <div className="flex items-center justify-center gap-4 z-10 bg-black/50 py-3 px-6 rounded-full backdrop-blur-md max-w-md mx-auto">
                <button
                  onClick={() => setIsMicMuted(!isMicMuted)}
                  className={`p-3 rounded-full transition-colors ${
                    isMicMuted ? 'bg-rose-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                >
                  {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className={`p-3 rounded-full transition-colors ${
                    isVideoMuted ? 'bg-rose-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title={isVideoMuted ? 'Enable Camera' : 'Turn Off Camera'}
                >
                  {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setInCall(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                >
                  Leave Call
                </button>
              </div>
            )}
          </div>

          {/* Recording Consent Panel (Dual Opt-in Control) */}
          <div className="editorial-card rounded-2xl p-5 bg-white space-y-3 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <h4 className="font-serif text-sm font-bold text-brand-charcoal">
                  Recording Consent Management
                </h4>
              </div>
              <span className="text-[11px] text-gray-500">
                Rule: Disabled unless explicitly consented
              </span>
            </div>

            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              In strict accordance with our Recording Consent Policy, video calls are completely private by default. If both you and your mentor agree, session audio/video can be recorded to private Azure Blob Storage for 90 days for mentor review.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleConsentToggle(!recordingConsentGiven)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  recordingConsentGiven
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-brand-blush text-brand-wine border border-brand-wine/20 hover:bg-brand-blush/80'
                }`}
              >
                {recordingConsentGiven ? 'Withdraw Recording Consent (Stop)' : 'Grant Explicit Recording Consent'}
              </button>
              <Link to="/recording-consent" className="text-xs text-brand-wine hover:underline">
                Read 90-Day Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar: Digital Card Overview & In-Session Notepad */}
        <div className="lg:col-span-4 space-y-6 text-left">
          {/* Summary Card */}
          <div className="editorial-card rounded-2xl p-6 bg-white space-y-4">
            <h3 className="font-serif text-base font-bold text-brand-charcoal border-b border-gray-100 pb-2">
              Appointment Details
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">Session Ref:</span>
                <span className="font-mono font-bold text-brand-wine">{sessionCard.bookingRef}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px]">Date & Time (IST):</span>
                <span className="font-semibold text-brand-charcoal">
                  {new Date(sessionCard.scheduledAt).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  at{' '}
                  {new Date(sessionCard.scheduledAt).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px]">Format:</span>
                <span className="capitalize font-semibold text-brand-charcoal">
                  {sessionCard.sessionType?.toLowerCase().replace('_', ' ')}
                </span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px]">Assigned Counselor:</span>
                <span className="font-semibold text-brand-charcoal">{sessionCard.advisorName}</span>
              </div>
            </div>
          </div>

          {/* Personal Reflection Notepad (Private to User) */}
          <div className="editorial-card rounded-2xl p-6 bg-white space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-gold" />
              <h4 className="font-serif text-sm font-bold text-brand-charcoal">
                Private In-Session Notes
              </h4>
            </div>
            <p className="text-[11px] text-gray-500">
              Jot down thoughts, insights, or realizations during the conversation. These notes remain strictly local on your device.
            </p>
            <textarea
              rows={6}
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Write personal takeaways or action reflections here..."
              className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-wine"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
