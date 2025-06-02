import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TenantProvider } from './context/TenantContext';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import CaseList from './pages/Cases/CaseList';
import LoginPage from './features/auth/pages/LoginPage';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import ResetPasswordPage from './features/auth/pages/ResetPasswordPage';
const EmailVerificationPage = lazy(() => import('./features/auth/pages/EmailVerificationPage'));
const ResendVerificationPage = lazy(() => import('./features/auth/pages/ResendVerificationPage'));
const MfaSetupPage = lazy(() => import('./features/auth/pages/MfaSetupPage'));
const MfaVerifyPage = lazy(() => import('./features/auth/pages/MfaVerifyPage'));
const MfaRecoveryPage = lazy(() => import('./features/auth/pages/MfaRecoveryPage'));
const SettingsPage = lazy(() => import('./features/settings/pages/SettingsPage'));

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route path="/resend-verification" element={<ResendVerificationPage />} />
      <Route path="/mfa-setup" element={<MfaSetupPage />} />
      <Route path="/mfa-verify" element={<MfaVerifyPage />} />
      <Route path="/mfa-recovery" element={<MfaRecoveryPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="cases" element={<CaseList />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TenantProvider>
          <AppContent />
        </TenantProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
