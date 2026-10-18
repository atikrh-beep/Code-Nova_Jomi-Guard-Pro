import React from 'react';
import { 
  FolderKanban, 
  FilePlus2, 
  SearchCheck, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  Building,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CaseStatus } from '../../types';

export const DashboardView: React.FC = () => {
  const { currentUser, cases, setActiveTab, setActiveCaseId } = useApp();

  const isOfficer = currentUser?.role === 'officer';
  const isSenior = currentUser?.role === 'senior_officer';
  const isAuditor = currentUser?.role === 'auditor';

  // Metrics
  const totalCases = cases.length;
  const underReviewCount = cases.filter((c) => c.status === 'under_review' || c.status === 'draft').length;
  const submittedCount = cases.filter((c) => c.status === 'submitted').length;
  const returnedCount = cases.filter((c) => c.status === 'returned').length;
  const approvedCount = cases.filter((c) => c.status === 'approved' || c.status === 'issued').length;

  const handleOpenCase = (id: string, tab: 'cases' | 'review_workspace' | 'findings' | 'reports' = 'cases') => {
    setActiveCaseId(id);
    setActiveTab(tab);
  };

  const getStatusBadge = (status: CaseStatus) => {
    switch (status) {
      case 'submitted':
        return { label: 'Submitted for Review', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'returned':
        return { label: 'Returned for Correction', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'approved':
        return { label: 'Approved', bg: 'bg-[#E6F5F4] text-[#087F79] border-[#087F79]/30' };
      case 'issued':
        return { label: 'Report Issued', bg: 'bg-[#E6F5F4] text-[#087F79] border-[#087F79]/40' };
      case 'under_review':
        return { label: 'Under Review', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      default:
        return { label: 'Draft', bg: 'bg-gray-100 text-gray-700 border-gray-300' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#087F79]">
              {currentUser?.designation || 'Land Records Administration'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#14263A] tracking-tight mt-1">
            Welcome back, {currentUser?.name}
          </h1>
          <p className="text-xs text-[#526174] mt-1 flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-[#526174]" />
            <span>Station: {currentUser?.office}</span>
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {isOfficer && (
            <button
              type="button"
              onClick={() => setActiveTab('new_intake')}
              className="px-4 py-2 bg-[#087F79] hover:bg-[#066661] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FilePlus2 className="w-4 h-4" />
              <span>New Intake</span>
            </button>
          )}

          {isSenior && (
            <button
              type="button"
              onClick={() => setActiveTab('cases')}
              className="px-4 py-2 bg-[#14263A] hover:bg-[#1E3752] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-[#087F79]" />
              <span>Review Queue ({submittedCount})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('audit_trail')}
            className="px-4 py-2 bg-[#F4F7FA] hover:bg-[#E6F5F4] text-[#14263A] text-xs font-semibold rounded-lg border border-[#D6DEE7] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Audit Trail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#D6DEE7] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#526174]">
              Total Cases
            </span>
            <FolderKanban className="w-4 h-4 text-[#14263A]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#14263A]">{totalCases}</span>
            <span className="text-[11px] text-[#526174]">registered</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#D6DEE7] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#526174]">
              {isSenior ? 'Pending Approval' : 'Submitted Queue'}
            </span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-700">{submittedCount}</span>
            <span className="text-[11px] text-[#526174]">for review</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#D6DEE7] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#526174]">
              Returned Cases
            </span>
            <RotateCcw className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-700">{returnedCount}</span>
            <span className="text-[11px] text-[#526174]">require correction</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#D6DEE7] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#526174]">
              Approved & Issued
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#087F79]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#087F79]">{approvedCount}</span>
            <span className="text-[11px] text-[#526174]">cleared</span>
          </div>
        </div>
      </div>

      {/* Role-Specific Alert Notification */}
      {returnedCount > 0 && isOfficer && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-xs font-bold text-amber-900">
              Action Required: Returned Case in Your Jurisdiction
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Case JGP-CS-2026-0205 has been returned by Senior Officer Nazmul Ahmed with review notes requiring certified CS chain porcha.
            </p>
            <button
              onClick={() => handleOpenCase('case_003', 'cases')}
              className="mt-2 text-xs font-bold text-amber-900 underline hover:text-amber-950"
            >
              Open Returned Case →
            </button>
          </div>
        </div>
      )}

      {/* Recent Cases Table */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#D6DEE7] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#14263A] uppercase tracking-wider">
              {isSenior ? 'Review Queue' : isAuditor ? 'Case Registry' : 'Assigned Cases'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('cases')}
            className="text-xs font-semibold text-[#087F79] hover:text-[#066661] flex items-center gap-1"
          >
            <span>View all cases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F4F7FA] border-b border-[#D6DEE7] text-[#526174] uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Case Reference</th>
                <th className="py-3 px-4">Title & Location</th>
                <th className="py-3 px-4">Khatian / Plot</th>
                <th className="py-3 px-4">Area</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D6DEE7]">
              {cases.map((c) => {
                const badge = getStatusBadge(c.status);
                return (
                  <tr key={c.id} className="hover:bg-[#F4F7FA]/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#14263A]">
                      {c.reference}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#172638]">{c.title}</div>
                      <div className="text-[11px] text-[#526174]">
                        Mouza: {c.mouza} (JL {c.jlNumber}), {c.thana}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#526174]">
                      {c.khatianType}-{c.khatianNumber} / Plot {c.dagPlotNumber}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#172638]">
                      {c.landArea} {c.landUnit}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-medium border ${badge.bg}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenCase(c.id, 'cases')}
                          className="px-2.5 py-1 bg-[#F4F7FA] hover:bg-[#E6F5F4] text-[#14263A] hover:text-[#087F79] rounded border border-[#D6DEE7] font-semibold text-[11px] transition-colors"
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenCase(c.id, 'review_workspace')}
                          className="px-2.5 py-1 bg-[#14263A] hover:bg-[#1E3752] text-white rounded font-semibold text-[11px] transition-colors"
                        >
                          Screening
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
