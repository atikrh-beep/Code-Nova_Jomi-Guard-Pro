import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BrandIcon } from '../brand/BrandIcon';
import { useApp } from '../../context/AppContext';
import { DEMO_CREDENTIALS } from '../../data/mockData';

interface SignInPageProps {
  onOpenPublicVerification: () => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({ onOpenPublicVerification }) => {
  const { login, showRestrictionNotice, fillDemoCredentials } = useApp();
  
  const [username, setUsername] = useState('officer.rahman');
  const [password, setPassword] = useState('demo-officer-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRoleForDemo, setSelectedRoleForDemo] = useState<'officer' | 'senior_officer' | 'auditor'>('officer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !password) {
      setErrorMessage('Please provide both username and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = login(username, password);
      setIsSubmitting(false);
      if (!result.success) {
        setErrorMessage(result.message || 'Authentication failed. Please verify credentials.');
      }
    }, 250);
  };

  const handleApplyDemoCredentials = (role: 'officer' | 'senior_officer' | 'auditor') => {
    setSelectedRoleForDemo(role);
    const cred = fillDemoCredentials(role);
    setUsername(cred.username);
    setPassword(cred.password);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F7FA] text-[#172638] selection:bg-[#087F79] selection:text-white">

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Card Surface */}
          <div className="bg-white rounded-xl shadow-lg border border-[#D6DEE7] p-6 sm:p-8">
            
            {/* Header with Brand Icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#F4F7FA] border border-[#D6DEE7] mb-3 shadow-xs">
                <BrandIcon size={44} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#14263A]">
                Jomi Guard <span className="text-[#087F79]">Pro</span>
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#526174] mt-0.5">
                Government Technology
              </p>
              <h2 className="text-base font-medium text-[#172638] mt-4">
                Sign in to your account
              </h2>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div 
                className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2 animate-fade-in"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div>
                <label 
                  htmlFor="login-username" 
                  className="block text-xs font-semibold text-[#172638] uppercase tracking-wider mb-1.5"
                >
                  Username / Login ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#526174]">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    id="login-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. officer.rahman"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D6DEE7] rounded-lg text-[#172638] placeholder-[#526174]/50 focus:outline-none focus:ring-2 focus:ring-[#087F79] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label 
                  htmlFor="login-password" 
                  className="block text-xs font-semibold text-[#172638] uppercase tracking-wider mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#526174]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security key"
                    className="w-full pl-9 pr-10 py-2 text-sm bg-white border border-[#D6DEE7] rounded-lg text-[#172638] placeholder-[#526174]/50 focus:outline-none focus:ring-2 focus:ring-[#087F79] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#526174] hover:text-[#172638] focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-2.5 px-4 bg-[#14263A] hover:bg-[#1E3752] text-white text-sm font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#087F79] focus:ring-offset-2 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Forgot password link directly below sign-in button */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={showRestrictionNotice}
                  className="text-xs text-[#087F79] hover:text-[#066661] hover:underline font-medium focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
            </form>

            {/* Demo Credentials Selector Panel */}
            <div className="mt-6 pt-5 border-t border-[#D6DEE7]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#526174] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#087F79]" />
                  Use Demo Credentials
                </span>
                <span className="text-[10px] bg-[#F4F7FA] text-[#526174] px-1.5 py-0.5 rounded border border-[#D6DEE7]">
                  Synthetic Sample
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => handleApplyDemoCredentials('officer')}
                  className={`py-1.5 px-2 rounded border text-left flex flex-col transition-all ${
                    selectedRoleForDemo === 'officer'
                      ? 'border-[#087F79] bg-[#E6F5F4] text-[#14263A] font-semibold'
                      : 'border-[#D6DEE7] bg-white text-[#526174] hover:bg-[#F4F7FA]'
                  }`}
                >
                  <span className="truncate">Officer</span>
                  <span className="text-[10px] text-[#526174] font-normal truncate">Intake & Review</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyDemoCredentials('senior_officer')}
                  className={`py-1.5 px-2 rounded border text-left flex flex-col transition-all ${
                    selectedRoleForDemo === 'senior_officer'
                      ? 'border-[#087F79] bg-[#E6F5F4] text-[#14263A] font-semibold'
                      : 'border-[#D6DEE7] bg-white text-[#526174] hover:bg-[#F4F7FA]'
                  }`}
                >
                  <span className="truncate">Senior Officer</span>
                  <span className="text-[10px] text-[#526174] font-normal truncate">Approve & Issue</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyDemoCredentials('auditor')}
                  className={`py-1.5 px-2 rounded border text-left flex flex-col transition-all ${
                    selectedRoleForDemo === 'auditor'
                      ? 'border-[#087F79] bg-[#E6F5F4] text-[#14263A] font-semibold'
                      : 'border-[#D6DEE7] bg-white text-[#526174] hover:bg-[#F4F7FA]'
                  }`}
                >
                  <span className="truncate">Auditor</span>
                  <span className="text-[10px] text-[#526174] font-normal truncate">Audit Trail</span>
                </button>
              </div>

              <div className="mt-2 text-[11px] text-[#526174] flex items-center justify-between px-1">
                <span>Account: <strong className="font-mono text-[#172638]">{DEMO_CREDENTIALS[selectedRoleForDemo].username}</strong></span>
                <span className="text-[#087F79] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready to sign in
                </span>
              </div>
            </div>

          </div>

          {/* Public Report Verification Entry Point (Near bottom of sign-in page) */}
          <div className="mt-6 bg-white rounded-xl border border-[#D6DEE7] p-4 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#E6F5F4] text-[#087F79] border border-[#087F79]/20 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#14263A] uppercase tracking-wider">
                  Public Report Verification
                </h3>
                <p className="text-xs text-[#526174]">
                  Check an issued report using its reference number or QR code.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenPublicVerification}
              className="shrink-0 text-xs font-semibold text-[#087F79] hover:text-[#066661] bg-[#F4F7FA] hover:bg-[#E6F5F4] border border-[#D6DEE7] px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Verify a Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </main>

      {/* Footer disclaimer */}
      <footer className="w-full border-t border-[#D6DEE7] py-3 px-6 text-center text-xs text-[#526174] bg-[#F4F7FA]">
        <p>
          Jomi Guard Pro is an administrative technology platform for land-record screening and report integrity verification.
        </p>
      </footer>
    </div>
  );
};
