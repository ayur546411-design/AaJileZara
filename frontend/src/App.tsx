import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RoleSwitcher } from './components/RoleSwitcher';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { StagesOfLife } from './pages/StagesOfLife';
import { Plans } from './pages/Plans';
import { Advisors } from './pages/Advisors';
import { HowItWorks } from './pages/HowItWorks';
import { BookSession } from './pages/BookSession';
import { SessionRoom } from './pages/SessionRoom';
import { ClientPortal } from './pages/ClientPortal';
import { AdvisoryPortal } from './pages/AdvisoryPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { ClientForms } from './pages/ClientForms';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { CancellationRefundPolicy } from './pages/CancellationRefundPolicy';
import { RecordingConsentPolicy } from './pages/RecordingConsentPolicy';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-brand-cream text-brand-charcoal selection:bg-brand-blush selection:text-brand-wine">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/stages-of-life" element={<StagesOfLife />} />
              <Route path="/areas-of-life" element={<StagesOfLife />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/advisors" element={<Advisors />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/book" element={<BookSession />} />
              <Route path="/session/:sessionUid" element={<SessionRoom />} />
              <Route path="/portal" element={<ClientPortal />} />
              <Route path="/advisory-portal" element={<AdvisoryPortal />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/client-forms" element={<ClientForms />} />
              
              {/* Policies & Compliance */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/cancellation-refund" element={<CancellationRefundPolicy />} />
              <Route path="/recording-consent" element={<RecordingConsentPolicy />} />
            </Routes>
          </main>

          <Footer />

          {/* Floating perspective switcher for testing all roles */}
          <RoleSwitcher />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
