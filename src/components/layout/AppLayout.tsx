import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FilePlus2, 
  SearchCheck, 
  FileSpreadsheet, 
  FileText, 
  History, 
  BookOpen, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';
import { BrandIcon } from '../brand/BrandIcon';
import { useApp } from '../../context/AppContext';
import { NavTab } from '../../types';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    logout, 
    activeCase, 
    toastMessage 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact 8 internal items in specified order
  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cases', label: 'Cases', icon: FolderKanban },
    { id: 'new_intake', label: 'New Intake', icon: FilePlus2 },
    { id: 'review_workspace', label: 'Review Workspace', icon: SearchCheck },
    { id: 'findings', label: 'Findings and Evidence', icon: FileSpreadsheet },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'audit_trail', label: 'Audit Trail', icon: History },
    { id: 'system_guide', label: 'System Guide', icon: BookOpen },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const getPageTitle = (tab: NavTab) => {
    const item = navItems.find((i) => i.id === tab);
    if (item) return item.label;
    if (tab === 'profile') return 'Profile';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FA] text-[#172638] selection:bg-[#087F79] selection:text-white" dir="ltr">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div 
          className="fixed bottom-5 right-5 z-50 bg-[#14263A] text-white px-4 py-2.5 rounded-lg shadow-xl border border-[#1E3752] text-xs font-medium flex items-center gap-2 animate-bounce-subtle"
          role="status"
        >
          <span className="w-2 h-2 rounded-full bg-[#087F79]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ONE UNIFIED TOP NAVIGATION BAR (Consolidates branding, active page context, and account controls) */}
      <header className="sticky top-0 z-40 w-full h-16 bg-[#14263A] text-white border-b border-[#1E3752] px-4 sm:px-6 flex items-center justify-between shadow-xs select-none">
        {/* Left: Mobile Drawer Trigger + Jomi Guard Pro Branding (Displayed ONCE) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 -ml-1 rounded-lg text-[#D6DEE7]/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 shrink-0">
            <BrandIcon size={40} className="shrink-0" />
            <div className="flex flex-col justify-center">
              <span className="text-base font-bold tracking-tight text-white leading-tight flex items-center gap-1.5 whitespace-nowrap">
                Jomi Guard <span className="text-[#087F79]">Pro</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D6DEE7]/70 whitespace-nowrap">
                Government Technology
              </span>
            </div>
          </div>
        </div>

        {/* Center: Contextual Active Page Title */}
        <div className="hidden md:flex items-center gap-2 text-xs">
          <span className="font-semibold text-white tracking-wide">
            {getPageTitle(activeTab)}
          </span>
          {activeCase && (
            <span className="text-[11px] font-mono text-[#087F79] bg-[#E6F5F4]/10 border border-[#087F79]/40 px-2 py-0.5 rounded">
              {activeCase.reference}
            </span>
          )}
        </div>

        {/* Right: Account & Sign Out Controls */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#087F79] text-white'
                : 'text-[#D6DEE7]/90 hover:text-white hover:bg-white/10'
            }`}
            title="View Profile"
          >
            <div className="w-6 h-6 rounded-md bg-[#087F79] text-white flex items-center justify-center font-bold text-[11px]">
              {currentUser?.name.charAt(0) || 'U'}
            </div>
            <span className="font-medium hidden sm:inline">{currentUser?.name}</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* BODY SHELL: Left Sidebar directly below Unified Top Bar + Right Main Content */}
      <div className="flex-1 flex flex-row min-w-0 relative">
        {/* Desktop Left Sidebar: Begins immediately with first functional navigation item */}
        <aside 
          className="hidden lg:flex lg:flex-col w-60 bg-[#14263A] text-[#D6DEE7] border-r border-[#1E3752] shrink-0 select-none sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-30"
          aria-label="Sidebar Navigation"
        >
          {/* Functional Menu Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#087F79] text-white shadow-xs font-semibold'
                      : 'text-[#D6DEE7]/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#D6DEE7]/60'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Left Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
            {/* Backdrop overlay */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Left Drawer Container */}
            <div className="relative w-72 max-w-[80vw] bg-[#14263A] text-[#D6DEE7] flex flex-col h-full shadow-2xl border-r border-[#1E3752] z-50">
              <div className="p-4 border-b border-[#1E3752] flex items-center justify-between">
                <div className="flex items-center gap-3 shrink-0">
                  <BrandIcon size={36} className="shrink-0" />
                  <div className="flex flex-col justify-center">
                    <span className="text-sm font-bold text-white leading-tight">Jomi Guard <span className="text-[#087F79]">Pro</span></span>
                    <span className="text-[9px] uppercase tracking-wider text-[#D6DEE7]/70 font-semibold">Government Technology</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-[#D6DEE7]/70 hover:text-white hover:bg-white/10 cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                        isActive ? 'bg-[#087F79] text-white font-semibold shadow-xs' : 'text-[#D6DEE7]/80 hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#D6DEE7]/60'}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-3 border-t border-[#1E3752] space-y-1">
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                    activeTab === 'profile' ? 'bg-[#087F79] text-white' : 'text-[#D6DEE7]/80 hover:bg-white/5'
                  }`}
                >
                  <UserIcon className="w-4 h-4 text-[#D6DEE7]/60" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-300 hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area: directly right of sidebar and below unified top bar */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
