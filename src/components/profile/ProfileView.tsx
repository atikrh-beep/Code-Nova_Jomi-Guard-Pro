import React from 'react';
import { 
  User as UserIcon, 
  Lock, 
  Building2, 
  Mail, 
  ShieldCheck, 
  KeyRound, 
  AlertCircle,
  FileText,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileView: React.FC = () => {
  const { currentUser, showRestrictionNotice } = useApp();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#14263A] text-white flex items-center justify-center font-bold text-lg">
            {currentUser?.name.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#14263A] tracking-tight">
              Profile
            </h1>
            <p className="text-xs text-[#526174]">
              Account credentials and station jurisdiction.
            </p>
          </div>
        </div>
      </div>

      {/* Main Profile Particulars */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-xs space-y-6 text-xs">
        
        {/* User Identity Section */}
        <div>
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <UserIcon className="w-4 h-4 text-[#087F79]" />
            <span>Identity & Office</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                readOnly
                value={currentUser?.name || ''}
                className="w-full p-2.5 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                Designation
              </label>
              <input
                type="text"
                readOnly
                value={currentUser?.designation || ''}
                className="w-full p-2.5 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                Official Email
              </label>
              <input
                type="email"
                readOnly
                value={currentUser?.email || ''}
                className="w-full p-2.5 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                Station / Office
              </label>
              <input
                type="text"
                readOnly
                value={currentUser?.office || ''}
                className="w-full p-2.5 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-medium"
              />
            </div>
          </div>
        </div>

        {/* Security & Credentials Section */}
        <div className="pt-5 border-t border-[#D6DEE7]">
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#087F79]" />
            <span>Authentication Credentials</span>
          </h2>

          <div className="space-y-4">
            {/* Username Field (Read-only as required) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-[#172638] uppercase">
                  Username / Login ID
                </label>
                <span className="text-[10px] text-[#526174] bg-[#F4F7FA] px-2 py-0.5 rounded border border-[#D6DEE7]">
                  Read-Only Policy
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={currentUser?.username || ''}
                  onClick={showRestrictionNotice}
                  className="w-full p-2.5 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-mono cursor-not-allowed"
                />
              </div>
              <p className="text-[11px] text-[#526174] mt-1">
                System usernames are locked to digital government personnel records.
              </p>
            </div>

            {/* Password Section (Triggers restriction notice) */}
            <div className="p-4 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong className="text-[#14263A] block font-semibold text-xs">
                  Account Password & Security Key
                </strong>
                <span className="text-[11px] text-[#526174]">
                  Last rotated in accordance with digital security standards.
                </span>
              </div>
              <button
                type="button"
                onClick={showRestrictionNotice}
                className="px-3.5 py-2 bg-white hover:bg-[#E6F5F4] text-[#14263A] text-xs font-semibold rounded-lg border border-[#D6DEE7] transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#087F79]" />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </div>

        {/* Assigned System Role & Permissions */}
        <div className="pt-5 border-t border-[#D6DEE7]">
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-2">
            Assigned Role & Operational Authority
          </h2>
          <div className="p-3.5 rounded-lg border border-[#D6DEE7] bg-white flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#14263A] capitalize block">
                {currentUser?.role.replace('_', ' ')}
              </span>
              <span className="text-[11px] text-[#526174]">
                Digital signature & administrative review permissions active.
              </span>
            </div>
            <span className="text-[10px] font-bold text-[#087F79] bg-[#E6F5F4] px-2.5 py-1 rounded border border-[#087F79]/30 uppercase">
              Authorized
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
