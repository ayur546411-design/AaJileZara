import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Calendar, 
  Users, 
  Package as PackageIcon, 
  FileText, 
  CreditCard, 
  Video, 
  DollarSign, 
  Settings, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Play, 
  RefreshCw,
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { role, currentUser } = useAuth();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'sessions' | 'users' | 'advisors' | 'packages' | 'forms' | 'payments' | 'recordings' | 'costs'
  >('overview');

  // Loading & Data States
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any | null>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [advisors, setAdvisors] = useState<any[]>([]);
  const [workload, setWorkload] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [recordings, setRecordings] = useState<any[]>([]);
  const [costSummary, setCostSummary] = useState<any | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Search & Filters
  const [userSearch, setUserSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Editing Modals / Actions
  const [editingPackage, setEditingPackage] = useState<any | null>(null);
  const [newCostEntry, setNewCostEntry] = useState<any | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Load all dashboard data
  const refreshDashboard = async () => {
    setLoading(true);
    try {
      const [mRes, cRes, bRes, wRes, pRes, rRes, costRes, payRes, catRes] = await Promise.all([
        api.getAdminMetrics(),
        api.getClients(),
        api.getAllBookings(),
        api.getAdvisorsWorkload(),
        api.getAllPackages(),
        api.getRecordings(),
        api.getCostSummary(),
        api.getPayments(),
        api.getAllCategories(),
      ]);

      if (mRes.success) setMetrics(mRes.metrics);
      if (cRes.success) setClients(cRes.clients || []);
      if (bRes.success) setBookings(bRes.bookings || []);
      if (wRes.success) setWorkload(wRes.workload || []);
      if (pRes.success) setPackages(pRes.packages || []);
      if (rRes.success) setRecordings(rRes.recordings || []);
      if (costRes.success) setCostSummary(costRes);
      if (payRes.success) setPayments(payRes.payments || []);
      if (catRes.success) setCategories(catRes.categories || []);
    } catch (err: any) {
      console.error('Admin load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Student discount verification toggle
  const handleVerifyStudent = async (userId: string, isVerified: boolean) => {
    try {
      const res = await api.verifyStudent(userId, isVerified);
      if (res.success) {
        showNotice(`Student discount status updated for user.`);
        refreshDashboard();
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // Toggle advisor status
  const handleToggleAdvisor = async (advisorId: string) => {
    try {
      const res = await api.toggleAdvisorActive(advisorId);
      if (res.success) {
        showNotice(`Advisor active status toggled.`);
        refreshDashboard();
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // Recording admin access simulation
  const handleAccessRecording = async (recId: string) => {
    try {
      const res = await api.accessRecording(recId);
      if (res.success) {
        showNotice(`Playback authorized for 15 minutes. Access event logged to security audit.`);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // Recording confirmed purge
  const handleDeleteRecording = async (recId: string) => {
    if (!confirm('Are you sure you want to permanently purge this session recording? This action is irrevocable and logged in the audit trail.')) return;
    try {
      const res = await api.deleteRecording(recId, 'Admin manual deletion');
      if (res.success) {
        showNotice(res.message);
        refreshDashboard();
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // Process refund
  const handleRefund = async (paymentId: string) => {
    if (!confirm('Issue a verified refund for this transaction?')) return;
    try {
      const res = await api.refundPayment(paymentId, 'Administrative approved refund');
      if (res.success) {
        showNotice('Refund processed and audited.');
        refreshDashboard();
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  if (role !== 'ADMIN') {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center mx-auto text-xl font-bold">
          🛡️
        </div>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
          Admin Credentials Required
        </h2>
        <p className="text-xs text-brand-charcoal/70 leading-relaxed">
          Access to the central administration control plane requires an Administrator account.
        </p>
        <div className="p-4 rounded-xl bg-brand-cream border border-brand-wine/15 text-xs text-brand-charcoal/80">
          💡 Click the floating pill button at the bottom right and select <strong>"Dr. Nilambari Dave, PhD (Admin)"</strong> to view all 9 modules immediately.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-brand-wine/10">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            <span className="text-xs uppercase font-bold text-brand-gold tracking-wider">
              Ji Le Zara Administrative Control Plane
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-brand-wine mt-1">
            Central Management Dashboard
          </h1>
          <p className="text-xs text-brand-charcoal/70">
            Director: <strong>Dr. Nilambari Dave, PhD</strong> · Azure App Service & PostgreSQL Cloud
          </p>
        </div>

        <button
          onClick={refreshDashboard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-brand-wine/20 text-brand-charcoal hover:bg-brand-blush/40 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 animate-in fade-in flex items-center justify-between">
          <span>✓ {actionNotice}</span>
          <button onClick={() => setActionNotice(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* 9 Modules Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-gray-200 text-xs font-medium no-scrollbar">
        {[
          { key: 'overview', label: '1. Overview', icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { key: 'sessions', label: '2. Sessions & Calling', icon: <Calendar className="w-3.5 h-3.5" /> },
          { key: 'users', label: '3. Users & Verification', icon: <Users className="w-3.5 h-3.5" /> },
          { key: 'advisors', label: '4. Advisory Team', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
          { key: 'packages', label: '5. Plans & Pricing', icon: <PackageIcon className="w-3.5 h-3.5" /> },
          { key: 'forms', label: '6. Intake & Word Limits', icon: <FileText className="w-3.5 h-3.5" /> },
          { key: 'payments', label: '7. Payments & Refunds', icon: <CreditCard className="w-3.5 h-3.5" /> },
          { key: 'recordings', label: '8. Secure Recording Vault', icon: <Video className="w-3.5 h-3.5" /> },
          { key: 'costs', label: '9. Infrastructure & Azure Costs', icon: <DollarSign className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-brand-wine text-white font-semibold shadow-sm'
                : 'text-brand-charcoal/80 hover:bg-brand-blush/40 hover:text-brand-wine'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* MODULE 1: OVERVIEW METRICS */}
      {/* ======================================================== */}
      {activeTab === 'overview' && metrics && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="editorial-card rounded-2xl p-5 bg-white border border-brand-wine/10">
              <span className="text-[11px] uppercase text-gray-500 font-semibold block">Today's Sessions</span>
              <strong className="font-serif text-3xl font-bold text-brand-wine">
                {metrics.todaysSessionsCount}
              </strong>
              <span className="text-[10px] text-gray-400 block mt-1">Live Video & Phone</span>
            </div>

            <div className="editorial-card rounded-2xl p-5 bg-white border border-brand-wine/10">
              <span className="text-[11px] uppercase text-gray-500 font-semibold block">Upcoming (7 Days)</span>
              <strong className="font-serif text-3xl font-bold text-brand-charcoal">
                {metrics.upcomingCount}
              </strong>
              <span className="text-[10px] text-emerald-600 block mt-1">Buffer-protected</span>
            </div>

            <div className="editorial-card rounded-2xl p-5 bg-white border border-brand-wine/10">
              <span className="text-[11px] uppercase text-gray-500 font-semibold block">Pending Plan B Requests</span>
              <strong className="font-serif text-3xl font-bold text-brand-gold">
                {metrics.pendingRequestsCount}
              </strong>
              <span className="text-[10px] text-gray-400 block mt-1">Awaiting coordinator review</span>
            </div>

            <div className="editorial-card rounded-2xl p-5 bg-white border border-brand-wine/10">
              <span className="text-[11px] uppercase text-gray-500 font-semibold block">Total Revenue</span>
              <strong className="font-serif text-3xl font-bold text-brand-wine">
                ₹{metrics.totalRevenueInr?.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-gray-400 block mt-1">Verified transactions</span>
            </div>
          </div>

          {/* Client Category Distribution & Recording Consent Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category breakdown */}
            <div className="editorial-card rounded-2xl p-6 bg-white space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                Clients by Category (Pricing Tier)
              </h3>
              <div className="space-y-2.5">
                {metrics.clientsByCategory?.map((item: any) => (
                  <div key={item.category} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-brand-cream/50">
                    <span className="font-medium capitalize text-brand-charcoal">
                      {item.category?.toLowerCase()}
                    </span>
                    <span className="font-mono font-bold text-brand-wine">
                      {item.count} registered
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recording & Infrastructure Summary */}
            <div className="editorial-card rounded-2xl p-6 bg-white space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                Security & Retention Health
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-brand-blush/40">
                  <span>Sessions with Recording Opt-In:</span>
                  <strong className="font-mono text-brand-wine">{metrics.activeConsents} sessions</strong>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-brand-cream/50">
                  <span>Recordings in Azure Blob Storage:</span>
                  <strong className="font-mono text-brand-charcoal">{metrics.totalRecordings} files</strong>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
                  <span>Retention Compliance Policy:</span>
                  <strong>90-Day Auto Purge Active</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Security Audit Logs */}
          <div className="editorial-card rounded-2xl p-6 bg-white space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-charcoal">
              Recent System & Security Audit Logs
            </h3>
            <div className="space-y-2 max-h-56 overflow-y-auto text-xs">
              {metrics.recentAuditLogs?.map((log: any) => (
                <div key={log.id} className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-mono font-bold text-brand-wine mr-2">{log.action}</span>
                    <span className="text-gray-500">[{log.entityType}]</span>
                  </div>
                  <span className="text-gray-400">
                    {new Date(log.createdAt).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 2: SESSIONS & CALLING SCHEDULE */}
      {/* ======================================================== */}
      {activeTab === 'sessions' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
                Session Management & Calling Schedule
              </h2>
              <p className="text-xs text-brand-charcoal/70">
                Track all live consultations, buffer integrity, advisor assignments, and secure session bridges.
              </p>
            </div>
            <a
              href="/book"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule Session on Behalf of Client</span>
            </a>
          </div>

          <div className="editorial-card rounded-2xl bg-white overflow-hidden border border-brand-wine/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-blush/40 text-brand-charcoal font-semibold border-b border-brand-wine/10">
                  <tr>
                    <th className="p-3.5">Ref & ID</th>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Advisor</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Format</th>
                    <th className="p-3.5">Scheduled (IST)</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-brand-cream/30 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-brand-wine">
                        {b.bookingRef}
                      </td>
                      <td className="p-3.5">
                        <strong className="block text-brand-charcoal">{b.client?.name}</strong>
                        <span className="text-[10px] text-gray-400">{b.client?.email}</span>
                      </td>
                      <td className="p-3.5 font-medium text-brand-charcoal">
                        {b.advisor?.user?.name || 'Unassigned'}
                      </td>
                      <td className="p-3.5 text-brand-charcoal/80">
                        {b.category?.name || 'General'}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-brand-blush text-brand-wine text-[10px] font-medium">
                          {b.sessionType === 'LIVE_VIDEO' ? 'Live Video' : 'Telephone'}
                        </span>
                      </td>
                      <td className="p-3.5 text-gray-600">
                        {new Date(b.scheduledAt).toLocaleString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <a
                          href={`/session/${b.sessionUid}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-brand-wine/10 text-brand-wine hover:bg-brand-wine hover:text-white transition-colors"
                        >
                          Bridge Card
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 3: USER & DISCOUNT VERIFICATION */}
      {/* ======================================================== */}
      {activeTab === 'users' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
                Client Directory & Student Verification
              </h2>
              <p className="text-xs text-brand-charcoal/70">
                Search clients, review discount eligibility, and manage data rights with complete confidentiality.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search name, email, or phone..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs w-full sm:w-64 focus:ring-2 focus:ring-brand-wine focus:outline-none bg-white"
              />
            </div>
          </div>

          <div className="editorial-card rounded-2xl bg-white overflow-hidden border border-brand-wine/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-blush/40 text-brand-charcoal font-semibold border-b border-brand-wine/10">
                  <tr>
                    <th className="p-3.5">Client Name</th>
                    <th className="p-3.5">Email & Phone</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Student Verification</th>
                    <th className="p-3.5">Past Bookings</th>
                    <th className="p-3.5 text-right">Verification Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {clients
                    .filter((c) => 
                      !userSearch || 
                      c.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                      c.email.toLowerCase().includes(userSearch.toLowerCase())
                    )
                    .map((client) => (
                      <tr key={client.id} className="hover:bg-brand-cream/30 transition-colors">
                        <td className="p-3.5 font-semibold text-brand-charcoal">
                          {client.name}
                        </td>
                        <td className="p-3.5 text-gray-600">
                          <div>{client.email}</div>
                          <div className="text-[10px] text-gray-400">{client.phone || 'No phone'}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="capitalize font-medium text-brand-charcoal">
                            {client.clientCategory?.toLowerCase()}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {client.clientCategory === 'STUDENT' ? (
                            client.isVerifiedStudent ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                                ✓ Verified (₹500 eligible)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200">
                                Pending Approval
                              </span>
                            )
                          ) : (
                            <span className="text-gray-400 text-[11px]">N/A (Standard)</span>
                          )}
                        </td>
                        <td className="p-3.5 font-mono text-brand-wine">
                          {client.clientBookings?.length || 0} sessions
                        </td>
                        <td className="p-3.5 text-right">
                          {client.clientCategory === 'STUDENT' && (
                            <button
                              onClick={() => handleVerifyStudent(client.id, !client.isVerifiedStudent)}
                              className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                                client.isVerifiedStudent
                                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                              }`}
                            >
                              {client.isVerifiedStudent ? 'Revoke Discount' : 'Approve Student ₹500'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 4: ADVISORY TEAM MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'advisors' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
                Advisory Team Members & Workload
              </h2>
              <p className="text-xs text-brand-charcoal/70">
                Track advisor capacity, active cases, specializations, and availability status.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workload.map((adv) => (
              <div
                key={adv.id}
                className="editorial-card rounded-2xl p-6 bg-white space-y-4 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                      {adv.name}
                    </h3>
                    <p className="text-xs text-brand-wine font-medium">{adv.title}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    adv.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {adv.active ? 'Active' : 'Deactivated'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="p-2 rounded-xl bg-brand-cream/60">
                    <span className="text-[10px] text-gray-500 block">Weekly Cap</span>
                    <strong className="font-mono text-brand-charcoal">{adv.maxWeeklyHours} hrs</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-brand-cream/60">
                    <span className="text-[10px] text-gray-500 block">Active Bookings</span>
                    <strong className="font-mono text-brand-wine">{adv.activeBookingsCount}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-brand-cream/60">
                    <span className="text-[10px] text-gray-500 block">Pending Plan B</span>
                    <strong className="font-mono text-brand-gold">{adv.pendingRequestsCount}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-gray-600">
                  <strong>Languages:</strong> {adv.languages?.join(', ')}
                </div>

                <div className="pt-2 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => handleToggleAdvisor(adv.id)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-semibold transition-colors ${
                      adv.active ? 'text-rose-600 hover:bg-rose-50' : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    {adv.active ? 'Deactivate Advisor' : 'Activate Advisor'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 5: PLANS & PRICING CONFIGURATION */}
      {/* ======================================================== */}
      {activeTab === 'packages' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
              Package Management & Category Rates
            </h2>
            <p className="text-xs text-brand-charcoal/70">
              Configure student rates, homemaker pricing, session durations, and package publication status.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="editorial-card rounded-2xl p-6 bg-white space-y-4 text-left border border-brand-wine/15"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-blush text-brand-wine font-mono text-[10px] font-bold">
                    {pkg.planType}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold">
                    ● Approved & Published
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-brand-charcoal">
                  {pkg.name}
                </h3>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Rates Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-brand-cream/60">
                    <span className="text-[10px] text-gray-500 block">Student</span>
                    <strong className="font-serif text-brand-wine font-bold text-sm">
                      ₹{pkg.studentPrice}
                    </strong>
                  </div>
                  <div className="p-2 rounded-xl bg-brand-cream/60">
                    <span className="text-[10px] text-gray-500 block">Homemaker</span>
                    <strong className="font-serif text-brand-wine font-bold text-sm">
                      ₹{pkg.homemakerPrice}
                    </strong>
                  </div>
                  <div className="p-2 rounded-xl bg-brand-cream/60">
                    <span className="text-[10px] text-gray-500 block">Professional</span>
                    <strong className="font-serif text-brand-wine font-bold text-sm">
                      ₹{pkg.professionalPrice}
                    </strong>
                  </div>
                  <div className="p-2 rounded-xl bg-brand-cream/60">
                    <span className="text-[10px] text-gray-500 block">Standard</span>
                    <strong className="font-serif text-brand-wine font-bold text-sm">
                      ₹{pkg.basePrice}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-gray-500 flex justify-between">
                  <span>Duration: <strong>{pkg.durationMinutes} mins</strong></span>
                  <span>Sessions: <strong>{pkg.sessionsCount} included</strong></span>
                  <span>Validity: <strong>{pkg.validityDays} days</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 6: INTAKE FORMS & WORD LIMITS */}
      {/* ======================================================== */}
      {activeTab === 'forms' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
              Intake Form Builder & Free-Text Word Limits
            </h2>
            <p className="text-xs text-brand-charcoal/70">
              Configure required fields, server-side word count boundaries, and consent policies.
            </p>
          </div>

          <div className="editorial-card rounded-2xl p-6 bg-white space-y-6">
            <div className="p-4 rounded-xl bg-brand-blush/30 border border-brand-wine/10 space-y-2 text-xs">
              <h4 className="font-bold text-brand-wine">Active Word Limit Constraints:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-3 rounded-lg bg-white border border-brand-wine/10">
                  <span className="text-gray-500 block">Concern Summary Field:</span>
                  <strong className="text-sm font-mono text-brand-charcoal">Maximum 250 Words</strong>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">Live counter + backend validator active</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-brand-wine/10">
                  <span className="text-gray-500 block">Previous Counseling History:</span>
                  <strong className="text-sm font-mono text-brand-charcoal">Maximum 100 Words</strong>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">Optional field constraint</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-brand-charcoal">
                Intake Form Mandatory Disclaimers
              </h4>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
                  <span>1. Age Eligibility Confirmation (18+ years required)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">MANDATORY</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
                  <span>2. Non-Medical Guidance Acknowledgement (Not psychiatric emergency service)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">MANDATORY</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
                  <span>3. Optional Recording Opt-In Consent (Gated dual consent)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">OPTIONAL DEFAULT OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 7: PAYMENTS & REFUNDS */}
      {/* ======================================================== */}
      {activeTab === 'payments' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
              Financial Transactions & Refund Management
            </h2>
            <p className="text-xs text-brand-charcoal/70">
              Verified Razorpay gateway transactions, category pricing audit, and policy refund processing.
            </p>
          </div>

          <div className="editorial-card rounded-2xl bg-white overflow-hidden border border-brand-wine/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-blush/40 text-brand-charcoal font-semibold border-b border-brand-wine/10">
                  <tr>
                    <th className="p-3.5">Txn Reference</th>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-brand-cream/30 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-brand-wine">
                        {p.transactionRef}
                      </td>
                      <td className="p-3.5 font-medium text-brand-charcoal">
                        {p.client?.name}
                      </td>
                      <td className="p-3.5 font-serif font-bold text-sm text-brand-charcoal">
                        ₹{p.amount} {p.currency}
                      </td>
                      <td className="p-3.5 capitalize text-gray-600">
                        {p.client?.clientCategory?.toLowerCase()}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.status === 'COMPLETED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-gray-500">
                        {new Date(p.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="p-3.5 text-right">
                        {p.status === 'COMPLETED' ? (
                          <button
                            onClick={() => handleRefund(p.id)}
                            className="px-2.5 py-1 rounded text-[10px] font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200"
                          >
                            Process Refund
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-400">Refunded</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 8: LIVE SESSION & SECURE RECORDING VAULT */}
      {/* ======================================================== */}
      {activeTab === 'recordings' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
                Admin Recording Vault & 90-Day Retention
              </h2>
              <p className="text-xs text-brand-charcoal/70">
                Client accounts can never view this vault. Only authorized administrators can audit playback or confirm deletions.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Retention Rule: Cloud storage permanently purges recordings after 90 days.</span>
            </div>
          </div>

          <div className="editorial-card rounded-2xl bg-white overflow-hidden border border-brand-wine/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-blush/40 text-brand-charcoal font-semibold border-b border-brand-wine/10">
                  <tr>
                    <th className="p-3.5">Blob Name</th>
                    <th className="p-3.5">Session Ref</th>
                    <th className="p-3.5">Duration</th>
                    <th className="p-3.5">Consent Verified</th>
                    <th className="p-3.5">Retention Countdown</th>
                    <th className="p-3.5">Vault Status</th>
                    <th className="p-3.5 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recordings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-400 italic">
                        No private recordings in vault. Recordings remain disabled unless explicit dual consent is granted.
                      </td>
                    </tr>
                  ) : (
                    recordings.map((r) => (
                      <tr key={r.id} className="hover:bg-brand-cream/30 transition-colors">
                        <td className="p-3.5 font-mono text-[11px] text-brand-charcoal">
                          {r.blobName}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-brand-wine">
                          {r.bookingRef}
                        </td>
                        <td className="p-3.5 font-mono">{r.durationMinutes} mins</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
                            Dual Opt-In Verified
                          </span>
                        </td>
                        <td className="p-3.5">
                          {r.status === 'DELETED' ? (
                            <span className="text-gray-400">Purged</span>
                          ) : (
                            <span className="font-semibold text-brand-gold">
                              {r.daysUntilDeletion} days remaining
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            r.status === 'RECORDED' ? 'bg-blue-50 text-blue-800' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          {r.status === 'RECORDED' && (
                            <>
                              <button
                                onClick={() => handleAccessRecording(r.id)}
                                className="px-2.5 py-1 rounded bg-brand-wine text-white text-[10px] font-semibold hover:bg-brand-wine-dark"
                              >
                                Play (Audit Log)
                              </button>
                              <button
                                onClick={() => handleDeleteRecording(r.id)}
                                className="px-2.5 py-1 rounded text-rose-600 hover:bg-rose-50 text-[10px] font-semibold border border-rose-200"
                              >
                                Purge Now
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 9: INFRASTRUCTURE & AZURE COST MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'costs' && costSummary && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
              Infrastructure & Azure Operating Cost Dashboard
            </h2>
            <p className="text-xs text-brand-charcoal/70">
              Real planning budget and actual Azure invoices across all 9 infrastructure tiers.
            </p>
          </div>

          {/* Budget KPI Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="editorial-card rounded-2xl p-5 bg-white border border-brand-wine/10">
              <span className="text-[11px] text-gray-500 font-semibold block uppercase">Est. Monthly Operating</span>
              <strong className="font-serif text-3xl font-bold text-brand-wine">
                ₹{costSummary.summary?.totalEstimatedMonthly?.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-gray-400 block mt-1">Across 9 services</span>
            </div>

            <div className="editorial-card rounded-2xl p-5 bg-white border border-brand-wine/10">
              <span className="text-[11px] text-gray-500 font-semibold block uppercase">Actual Billed (Oct 2026)</span>
              <strong className="font-serif text-3xl font-bold text-brand-charcoal">
                ₹{costSummary.summary?.totalActualBilled?.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-emerald-600 block mt-1">Under ₹10,000 threshold</span>
            </div>

            <div className="editorial-card rounded-2xl p-5 bg-white border border-brand-wine/10">
              <span className="text-[11px] text-gray-500 font-semibold block uppercase">Projected Annual Cost</span>
              <strong className="font-serif text-3xl font-bold text-brand-gold">
                ₹{costSummary.summary?.projectedAnnualOperatingCost?.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-gray-400 block mt-1">12 Months operating</span>
            </div>

            <div className="editorial-card rounded-2xl p-5 bg-white border border-brand-wine/10">
              <span className="text-[11px] text-gray-500 font-semibold block uppercase">Domain (3-Yr Capital)</span>
              <strong className="font-serif text-3xl font-bold text-brand-charcoal">
                ₹{costSummary.summary?.domain3YearCapitalExpense?.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-gray-400 block mt-1">₹89/mo amortized, not Azure fee</span>
            </div>
          </div>

          {/* Budget Alerts if spending approaches limit */}
          {costSummary.summary?.alerts?.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
              <p className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                Budget Threshold Alert (Approaching 80%+ limit):
              </p>
              {costSummary.summary.alerts.map((alt: any, idx: number) => (
                <p key={idx} className="ml-5 list-disc">{alt.message}</p>
              ))}
            </div>
          )}

          {/* 9 Categories Cost Breakdown Worksheet */}
          <div className="editorial-card rounded-2xl bg-white overflow-hidden border border-brand-wine/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-blush/40 text-brand-charcoal font-semibold border-b border-brand-wine/10">
                  <tr>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Component & Service Name</th>
                    <th className="p-3.5">Usage Quantity</th>
                    <th className="p-3.5">Est. Monthly</th>
                    <th className="p-3.5">Actual Billed</th>
                    <th className="p-3.5">Budget Limit</th>
                    <th className="p-3.5">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {costSummary.entries?.map((entry: any) => (
                    <tr key={entry.id} className="hover:bg-brand-cream/30 transition-colors">
                      <td className="p-3.5 font-mono text-[11px] font-bold text-brand-wine">
                        {entry.category}
                      </td>
                      <td className="p-3.5 font-medium text-brand-charcoal">
                        {entry.serviceName}
                      </td>
                      <td className="p-3.5 text-gray-600">{entry.usageQuantity}</td>
                      <td className="p-3.5 font-serif font-bold text-brand-charcoal">
                        ₹{entry.estimatedMonthlyInr}
                      </td>
                      <td className="p-3.5 font-serif font-bold text-emerald-700">
                        ₹{entry.actualBilledInr || '—'}
                      </td>
                      <td className="p-3.5 font-mono text-gray-500">
                        ₹{entry.budgetLimitInr}
                      </td>
                      <td className="p-3.5 text-[11px] text-gray-500 max-w-xs">
                        {entry.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
