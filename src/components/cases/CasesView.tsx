import React, { useState, useMemo } from 'react';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  FileCheck, 
  MapPin, 
  Calendar, 
  UserCheck, 
  FileText, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LandCase, CaseStatus } from '../../types';

export const CasesView: React.FC = () => {
  const { 
    currentUser, 
    cases, 
    activeCaseId, 
    setActiveCaseId, 
    setActiveTab,
    submitCaseForReview,
    approveCase,
    returnCaseForCorrection,
    requestAdditionalEvidence,
    issueReport
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCaseModal, setSelectedCaseModal] = useState<LandCase | null>(null);

  // Modals for Senior Officer actions
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [evidenceNote, setEvidenceNote] = useState('');

  const isOfficer = currentUser?.role === 'officer';
  const isSenior = currentUser?.role === 'senior_officer';
  const isAuditor = currentUser?.role === 'auditor';

  // Filter cases
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchRef = c.reference.toLowerCase().includes(q);
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchMouza = c.mouza.toLowerCase().includes(q);
        const matchKhatian = c.khatianNumber.toLowerCase().includes(q);
        const matchPlot = c.dagPlotNumber.toLowerCase().includes(q);
        const matchParty = c.parties.some((p) => p.name.toLowerCase().includes(q));
        if (!matchRef && !matchTitle && !matchMouza && !matchKhatian && !matchPlot && !matchParty) {
          return false;
        }
      }
      return true;
    });
  }, [cases, searchQuery, statusFilter]);

  const handleOpenCaseDetail = (c: LandCase) => {
    setActiveCaseId(c.id);
    setSelectedCaseModal(c);
  };

  const handleGoToWorkspace = (c: LandCase) => {
    setActiveCaseId(c.id);
    setSelectedCaseModal(null);
    setActiveTab('review_workspace');
  };

  const handleGoToFindings = (c: LandCase) => {
    setActiveCaseId(c.id);
    setSelectedCaseModal(null);
    setActiveTab('findings');
  };

  const handleGoToReports = (c: LandCase) => {
    setActiveCaseId(c.id);
    setSelectedCaseModal(null);
    setActiveTab('reports');
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
      {/* Header and Controls */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#14263A] tracking-tight flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-[#087F79]" />
              <span>Cases</span>
            </h1>
            <p className="text-xs text-[#526174] mt-1 leading-relaxed">
              Screening files and administrative review records.
            </p>
          </div>

          {isOfficer && (
            <button
              type="button"
              onClick={() => setActiveTab('new_intake')}
              className="px-4 py-2 bg-[#087F79] hover:bg-[#066661] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Intake</span>
            </button>
          )}
        </div>

        {/* Search & Filters */}
        <div className="mt-6 pt-5 border-t border-[#D6DEE7] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#526174]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by case reference, mouza, khatian, plot, or owner name..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79] focus:border-transparent transition-all"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
            >
              <option value="all">All Statuses ({cases.length})</option>
              <option value="draft">Drafts</option>
              <option value="under_review">Under Review</option>
              <option value="submitted">Submitted for Review</option>
              <option value="returned">Returned for Correction</option>
              <option value="approved">Approved</option>
              <option value="issued">Report Issued</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map((c) => {
          const badge = getStatusBadge(c.status);
          const isSelected = activeCaseId === c.id;

          return (
            <div
              key={c.id}
              className={`bg-white rounded-xl border p-5 shadow-xs transition-all ${
                isSelected ? 'border-[#087F79] ring-1 ring-[#087F79]' : 'border-[#D6DEE7] hover:border-[#1E3752]'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <span className="font-mono text-xs font-bold text-[#14263A] bg-[#F4F7FA] px-2.5 py-1 rounded border border-[#D6DEE7]">
                    {c.reference}
                  </span>
                  <span className="text-[11px] text-[#526174] block mt-1">
                    Mouza: <strong className="text-[#172638]">{c.mouza}</strong> (JL {c.jlNumber}), {c.thana}
                  </span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase shrink-0 ${badge.bg}`}>
                  {badge.label}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#172638] line-clamp-1 mb-1">
                {c.title}
              </h3>
              <p className="text-xs text-[#526174] line-clamp-2 leading-relaxed mb-4">
                {c.purpose}
              </p>

              {/* Particulars Pill Grid */}
              <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7] text-[11px] mb-4">
                <div>
                  <span className="text-[#526174] block">Khatian</span>
                  <strong className="font-mono text-[#172638]">{c.khatianType}-{c.khatianNumber}</strong>
                </div>
                <div>
                  <span className="text-[#526174] block">Dag Plot</span>
                  <strong className="font-mono text-[#172638]">{c.dagPlotNumber}</strong>
                </div>
                <div>
                  <span className="text-[#526174] block">Area</span>
                  <strong className="text-[#172638]">{c.landArea} {c.landUnit}</strong>
                </div>
              </div>

              {/* Returned reason preview if applicable */}
              {c.status === 'returned' && c.returnReason && (
                <div className="mb-4 p-2.5 rounded bg-amber-50 border border-amber-200 text-xs text-amber-800">
                  <strong className="block text-amber-900 font-semibold mb-0.5">Return Reason:</strong>
                  {c.returnReason}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[#D6DEE7] text-xs">
                <span className="text-[11px] text-[#526174]">
                  Officer: {c.assignedOfficerName.split(' ')[0]}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenCaseDetail(c)}
                    className="px-2.5 py-1 text-[#14263A] bg-[#F4F7FA] hover:bg-[#E6F5F4] rounded border border-[#D6DEE7] font-semibold transition-colors"
                  >
                    View File
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGoToWorkspace(c)}
                    className="px-2.5 py-1 text-white bg-[#14263A] hover:bg-[#1E3752] rounded font-semibold transition-colors"
                  >
                    Screening
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Details Modal */}
      {selectedCaseModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px] animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-[#D6DEE7] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#D6DEE7] flex items-start justify-between bg-[#F4F7FA]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-[#D6DEE7] text-[#14263A]">
                    {selectedCaseModal.reference}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${getStatusBadge(selectedCaseModal.status).bg}`}>
                    {getStatusBadge(selectedCaseModal.status).label}
                  </span>
                </div>
                <h2 className="text-base font-bold text-[#14263A] mt-2">
                  {selectedCaseModal.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCaseModal(null)}
                className="text-[#526174] hover:text-[#172638] text-sm p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 text-xs">
              {/* Land Particulars Table */}
              <div>
                <h3 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-2">
                  Land Administration Particulars
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#F4F7FA] p-3.5 rounded-lg border border-[#D6DEE7]">
                  <div>
                    <span className="text-[#526174] block">Mouza & JL</span>
                    <strong className="text-[#172638]">{selectedCaseModal.mouza} (JL {selectedCaseModal.jlNumber})</strong>
                  </div>
                  <div>
                    <span className="text-[#526174] block">Thana & District</span>
                    <strong className="text-[#172638]">{selectedCaseModal.thana}, {selectedCaseModal.district}</strong>
                  </div>
                  <div>
                    <span className="text-[#526174] block">Khatian & Dag</span>
                    <strong className="font-mono text-[#172638]">{selectedCaseModal.khatianType}-{selectedCaseModal.khatianNumber} / {selectedCaseModal.dagPlotNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[#526174] block">Area Dimension</span>
                    <strong className="text-[#172638]">{selectedCaseModal.landArea} {selectedCaseModal.landUnit}</strong>
                  </div>
                </div>
              </div>

              {/* Recorded Parties */}
              <div>
                <h3 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-2">
                  Recorded Title Parties & Ownership Shares
                </h3>
                <div className="space-y-1.5">
                  {selectedCaseModal.parties.map((p) => (
                    <div key={p.id} className="p-2.5 rounded border border-[#D6DEE7] bg-white flex items-center justify-between">
                      <div>
                        <strong className="text-[#172638] block">{p.name}</strong>
                        <span className="text-[11px] text-[#526174]">Relation: {p.fatherOrHusbandName} {p.nidNumber ? `| NID: ${p.nidNumber}` : ''}</span>
                      </div>
                      <span className="font-mono text-xs font-semibold bg-[#F4F7FA] px-2 py-0.5 rounded border border-[#D6DEE7]">
                        Share: {p.share}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attached Documents */}
              <div>
                <h3 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-2">
                  Attached Administrative Records ({selectedCaseModal.documents.length})
                </h3>
                <div className="space-y-1.5">
                  {selectedCaseModal.documents.map((doc) => (
                    <div key={doc.id} className="p-2.5 rounded border border-[#D6DEE7] bg-[#F4F7FA] flex items-center justify-between">
                      <div>
                        <strong className="text-[#172638] block">{doc.title}</strong>
                        <span className="text-[11px] text-[#526174]">{doc.issuingAuthority} &bull; {doc.issueDate}</span>
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-[#087F79] bg-[#E6F5F4] px-2 py-0.5 rounded border border-[#087F79]/20">
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Senior Officer Decision Panel (For Senior Officer role) */}
              {isSenior && selectedCaseModal.status === 'submitted' && (
                <div className="mt-4 p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                  <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    <span>Senior Officer Oversight Decision</span>
                  </h3>
                  <p className="text-xs text-blue-800 mb-3">
                    As Senior Assistant Commissioner (Land), select an administrative action for case {selectedCaseModal.reference}.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        approveCase(selectedCaseModal.id);
                        setSelectedCaseModal(null);
                      }}
                      className="px-3 py-1.5 bg-[#087F79] hover:bg-[#066661] text-white font-semibold rounded shadow-xs"
                    >
                      Approve Case
                    </button>

                    <button
                      type="button"
                      onClick={() => setReturnModalOpen(true)}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded shadow-xs"
                    >
                      Return for Correction
                    </button>

                    <button
                      type="button"
                      onClick={() => setEvidenceModalOpen(true)}
                      className="px-3 py-1.5 bg-[#14263A] hover:bg-[#1E3752] text-white font-semibold rounded shadow-xs"
                    >
                      Request Additional Evidence
                    </button>
                  </div>
                </div>
              )}

              {/* Submit for Review (For Officer on draft/returned case) */}
              {isOfficer && (selectedCaseModal.status === 'draft' || selectedCaseModal.status === 'returned' || selectedCaseModal.status === 'under_review') && (
                <div className="p-3.5 rounded-lg bg-[#E6F5F4] border border-[#087F79]/30 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#14263A] block">Ready for submission?</span>
                    <span className="text-[11px] text-[#526174]">Send this case dossier to Senior Officer for formal oversight.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      submitCaseForReview(selectedCaseModal.id);
                      setSelectedCaseModal(null);
                    }}
                    className="px-3.5 py-1.5 bg-[#087F79] hover:bg-[#066661] text-white font-semibold rounded flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit to Senior Officer</span>
                  </button>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#D6DEE7] bg-[#F4F7FA] flex items-center justify-between">
              <span className="text-[11px] text-[#526174]">
                Assigned Officer: {selectedCaseModal.assignedOfficerName}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleGoToFindings(selectedCaseModal)}
                  className="px-3 py-1.5 bg-white text-[#14263A] border border-[#D6DEE7] rounded font-semibold text-xs hover:bg-[#F4F7FA]"
                >
                  Findings ({selectedCaseModal.findings.length})
                </button>
                <button
                  type="button"
                  onClick={() => handleGoToWorkspace(selectedCaseModal)}
                  className="px-3 py-1.5 bg-[#14263A] text-white rounded font-semibold text-xs hover:bg-[#1E3752]"
                >
                  Open Workspace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return for Correction Modal */}
      {returnModalOpen && selectedCaseModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-[#14263A] mb-1">
              Return Case for Correction
            </h3>
            <p className="text-xs text-[#526174] mb-4">
              Enter mandatory administrative reason for returning case {selectedCaseModal.reference} to the screening officer.
            </p>
            <textarea
              rows={4}
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              placeholder="e.g. Certified CS chain porcha is required before proceeding to approval."
              className="w-full p-3 text-xs border border-[#D6DEE7] rounded-lg bg-[#F4F7FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
            />
            <div className="mt-4 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setReturnModalOpen(false)}
                className="px-3 py-1.5 rounded border border-[#D6DEE7] text-[#526174]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!returnReason.trim()}
                onClick={() => {
                  returnCaseForCorrection(selectedCaseModal.id, returnReason.trim());
                  setReturnModalOpen(false);
                  setSelectedCaseModal(null);
                }}
                className="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold disabled:opacity-50"
              >
                Confirm Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Evidence Modal */}
      {evidenceModalOpen && selectedCaseModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-[#14263A] mb-1">
              Request Additional Evidence
            </h3>
            <p className="text-xs text-[#526174] mb-4">
              Specify supplementary documents or field traces needed for case {selectedCaseModal.reference}.
            </p>
            <textarea
              rows={4}
              value={evidenceNote}
              onChange={(e) => setEvidenceNote(e.target.value)}
              placeholder="e.g. Request certified field demarcation trace sketch from Union Land Assistant Officer."
              className="w-full p-3 text-xs border border-[#D6DEE7] rounded-lg bg-[#F4F7FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
            />
            <div className="mt-4 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setEvidenceModalOpen(false)}
                className="px-3 py-1.5 rounded border border-[#D6DEE7] text-[#526174]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!evidenceNote.trim()}
                onClick={() => {
                  requestAdditionalEvidence(selectedCaseModal.id, evidenceNote.trim());
                  setEvidenceModalOpen(false);
                  setSelectedCaseModal(null);
                }}
                className="px-4 py-1.5 rounded bg-[#14263A] hover:bg-[#1E3752] text-white font-semibold disabled:opacity-50"
              >
                Submit Evidence Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
