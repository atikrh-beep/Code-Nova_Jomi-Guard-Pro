import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { StartupAnimation } from './components/brand/StartupAnimation';
import { SignInPage } from './components/auth/SignInPage';
import { PublicVerificationPage } from './components/public/PublicVerificationPage';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardView } from './components/dashboard/DashboardView';
import { CasesView } from './components/cases/CasesView';
import { NewIntakeView } from './components/cases/NewIntakeView';
import { ReviewWorkspaceView } from './components/workspace/ReviewWorkspaceView';
import { FindingsEvidenceView } from './components/findings/FindingsEvidenceView';
import { ReportsView } from './components/reports/ReportsView';
import { AuditTrailView } from './components/audit/AuditTrailView';
import { SystemGuideView } from './components/guide/SystemGuideView';
import { ProfileView } from './components/profile/ProfileView';
import { RestrictionModal } from './components/common/RestrictionModal';

const AppContent: React.FC = () => {
  const { isAuthenticated, activeTab } = useApp();

  const [startupCompleted, setStartupCompleted] = useState<boolean>(() => {
    return sessionStorage.getItem('jomi_startup_done') === 'true';
  });

  const [isPublicVerificationOpen, setIsPublicVerificationOpen] = useState(false);

  const handleStartupDone = () => {
    sessionStorage.setItem('jomi_startup_done', 'true');
    setStartupCompleted(true);
  };

  // 1. Show startup animation once per session
  if (!startupCompleted) {
    return <StartupAnimation onComplete={handleStartupDone} />;
  }

  // 2. Standalone Public Verification Route
  if (isPublicVerificationOpen) {
    return (
      <>
        <PublicVerificationPage onBackToSignIn={() => setIsPublicVerificationOpen(false)} />
        <RestrictionModal />
      </>
    );
  }

  // 3. Unauthenticated Sign In Page
  if (!isAuthenticated) {
    return (
      <>
        <SignInPage onOpenPublicVerification={() => setIsPublicVerificationOpen(true)} />
        <RestrictionModal />
      </>
    );
  }

  // 4. Authenticated Internal Portals
  return (
    <AppLayout>
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'cases' && <CasesView />}
      {activeTab === 'new_intake' && <NewIntakeView />}
      {activeTab === 'review_workspace' && <ReviewWorkspaceView />}
      {activeTab === 'findings' && <FindingsEvidenceView />}
      {activeTab === 'reports' && <ReportsView />}
      {activeTab === 'audit_trail' && <AuditTrailView />}
      {activeTab === 'system_guide' && <SystemGuideView />}
      {activeTab === 'profile' && <ProfileView />}

      <RestrictionModal />
    </AppLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
