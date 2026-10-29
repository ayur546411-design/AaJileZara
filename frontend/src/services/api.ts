// API Client for Ji Le Zara Social Guidance Platform

function getHeaders(customHeaders: Record<string, string> = {}) {
  const userId = localStorage.getItem('jilezara_user_id');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  if (userId) {
    headers['x-user-id'] = userId;
  }
  return headers;
}

export const api = {
  // Service Categories (7 Stages of Life)
  async getCategories() {
    const res = await fetch('/api/categories');
    return res.json();
  },
  async getAllCategories() {
    const res = await fetch('/api/categories/all', { headers: getHeaders() });
    return res.json();
  },
  async updateCategory(id: string, data: any) {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async createCategory(data: any) {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async deleteCategory(id: string) {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Packages & Category Pricing
  async getPackages() {
    const res = await fetch('/api/packages');
    return res.json();
  },
  async getAllPackages() {
    const res = await fetch('/api/packages/all', { headers: getHeaders() });
    return res.json();
  },
  async updatePackage(id: string, data: any) {
    const res = await fetch(`/api/packages/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async createPackage(data: any) {
    const res = await fetch('/api/packages', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Advisors
  async getAdvisors() {
    const res = await fetch('/api/advisors');
    return res.json();
  },
  async getAdvisorsWorkload() {
    const res = await fetch('/api/advisors/workload', { headers: getHeaders() });
    return res.json();
  },
  async saveAdvisor(data: any) {
    const res = await fetch('/api/advisors', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async toggleAdvisorActive(id: string) {
    const res = await fetch(`/api/advisors/${id}/toggle-active`, {
      method: 'PATCH',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Available Slots & Bookings
  async getAvailableSlots(date: string, advisorId?: string, sessionType?: string) {
    const params = new URLSearchParams({ date });
    if (advisorId) params.append('advisorId', advisorId);
    if (sessionType) params.append('sessionType', sessionType);
    const res = await fetch(`/api/bookings/available-slots?${params.toString()}`);
    return res.json();
  },
  async createBooking(bookingData: any) {
    const res = await fetch('/api/bookings/book', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(bookingData),
    });
    return res.json();
  },
  async getSessionCard(sessionUid: string) {
    const res = await fetch(`/api/bookings/session-card/${sessionUid}`);
    return res.json();
  },
  async getMyBookings() {
    const res = await fetch('/api/bookings/my-bookings', { headers: getHeaders() });
    return res.json();
  },
  async getAllBookings() {
    const res = await fetch('/api/bookings/all', { headers: getHeaders() });
    return res.json();
  },
  async updateBookingStatus(id: string, data: any) {
    const res = await fetch(`/api/bookings/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Plan B Advisory Requests
  async submitAdvisoryRequest(data: any) {
    const res = await fetch('/api/advisory-requests/submit', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async getMyAdvisoryRequests() {
    const res = await fetch('/api/advisory-requests/my-requests', { headers: getHeaders() });
    return res.json();
  },
  async getAllAdvisoryRequests() {
    const res = await fetch('/api/advisory-requests/all', { headers: getHeaders() });
    return res.json();
  },
  async reviewAdvisoryRequest(id: string, data: any) {
    const res = await fetch(`/api/advisory-requests/${id}/review`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Daily.co Video Room & Recording Consent
  async getRoomToken(sessionUid: string, participantName?: string) {
    const res = await fetch('/api/daily/room-token', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ sessionUid, participantName }),
    });
    return res.json();
  },
  async setRecordingConsent(sessionUid: string, consentGiven: boolean, consentedBy?: string) {
    const res = await fetch('/api/daily/recording-consent', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ sessionUid, consentGiven, consentedBy }),
    });
    return res.json();
  },

  // Admin Recordings Vault
  async getRecordings() {
    const res = await fetch('/api/recordings', { headers: getHeaders() });
    return res.json();
  },
  async accessRecording(id: string) {
    const res = await fetch(`/api/recordings/${id}/access`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return res.json();
  },
  async deleteRecording(id: string, reason?: string) {
    const res = await fetch(`/api/recordings/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify({ reason }),
    });
    return res.json();
  },

  // Infrastructure Costs Worksheet
  async getCostSummary() {
    const res = await fetch('/api/costs', { headers: getHeaders() });
    return res.json();
  },
  async saveCostEntry(entry: any) {
    const res = await fetch('/api/costs/entry', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(entry),
    });
    return res.json();
  },

  // Admin Metrics & Management
  async getAdminMetrics() {
    const res = await fetch('/api/admin/metrics', { headers: getHeaders() });
    return res.json();
  },
  async getClients(search?: string, category?: string) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    const res = await fetch(`/api/admin/clients?${params.toString()}`, { headers: getHeaders() });
    return res.json();
  },
  async verifyStudent(userId: string, isVerified: boolean) {
    const res = await fetch(`/api/auth/verify-student/${userId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ isVerified }),
    });
    return res.json();
  },
  async getPayments() {
    const res = await fetch('/api/admin/payments', { headers: getHeaders() });
    return res.json();
  },
  async refundPayment(id: string, reason?: string) {
    const res = await fetch(`/api/admin/payments/${id}/refund`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ reason }),
    });
    return res.json();
  },

  // Intake Form Config
  async getIntakeConfig() {
    const res = await fetch('/api/intake-forms/config');
    return res.json();
  },
  async saveIntakeConfig(fields: any, wordLimits: any) {
    const res = await fetch('/api/intake-forms/config', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ fields, wordLimits }),
    });
    return res.json();
  },
};
