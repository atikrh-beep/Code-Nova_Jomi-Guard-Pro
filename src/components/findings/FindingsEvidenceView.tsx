import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  FileText, 
  Paperclip, 
  CheckCircle2, 
  AlertCircle, 
  Send,
  Building,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FindingItem } from '../../types';

export const FindingsEvidenceView: React.FC = () => {
  const { 
    currentUser, 
    activeCase, 
    addFindingToCase, 
    deleteFindingFromCase, 
    setActiveTab,
    submitCaseForReview
  } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FindingItem['category']>('Area Computation');
  const [description, setDescription] = useState('');
  const [sourceReference, setSourceReference] = useState('');
  const [fieldExamined, setFieldExamined] = useState('');
  const [evidenceReference, setEvidenceReference] = useState('');
  const [officerAssessment, setOfficerAssessment] = useState('');
  const [recommendation, setRecommendation] = useState('');

  if (!activeCase) {
    return (
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-8 text-center text-xs">
        <h2 className="text-sm font-bold text-[#14263A]">No Case Selected</h2>
        <p className="text-[#526174] mt-1">Select an active case to manage findings and evidence.</p>
        <button
          onClick={() => setActiveTab('cases')}
          className="mt-3 px-4 py-2 bg-[#087F79] text-white font-semibold rounded-lg"
        >
          View Cases
        </button>
      </div>
    );
  }

  const handleAddFinding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addFindingToCase(activeCase.id, {
      title: title.trim(),
      category,
      description: description.trim(),
      sourceReference: sourceReference.trim() || 'RS Khatian / Registered Deed Archive',
      fieldExamined: fieldExamined.trim() || 'General Title Specification',
      evidenceReference: evidenceReference.trim() || 'Exhibit A-1 Certified Copy',
      officerAssessment: officerAssessment.trim() || 'Requires review during senior officer inspection.',
      recommendation: recommendation.trim() || 'Further verification recommended.',
      status: 'draft',
    });

    setTitle('');
    setDescription('');
    setSourceReference('');
    setFieldExamined('');
    setEvidenceReference('');
    setOfficerAssessment('');
    setRecommendation('');
    setModalOpen(false);
  };

  const isOfficer = currentUser?.role === 'officer';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#14263A] bg-[#F4F7FA] px-2.5 py-1 rounded border border-[#D6DEE7]">
              {activeCase.reference}
            </span>
            <span className="text-xs font-semibold text-[#087F79]">
              Mouza {activeCase.mouza}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#14263A] tracking-tight mt-1.5 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#087F79]" />
            <span>Findings and Evidence</span>
          </h1>
          <p className="text-xs text-[#526174] mt-1">
            Administrative findings and supporting evidence records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isOfficer && (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-[#087F79] hover:bg-[#066661] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record New Finding</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className="px-4 py-2 bg-[#14263A] hover:bg-[#1E3752] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Proceed to Reports</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-4">
        {activeCase.findings.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#D6DEE7] p-8 text-center text-xs text-[#526174]">
            No administrative findings recorded for this case yet.
            {isOfficer && (
              <div className="mt-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-3.5 py-1.5 bg-[#E6F5F4] text-[#087F79] font-semibold rounded border border-[#087F79]/30"
                >
                  Add Initial Finding
                </button>
              </div>
            )}
          </div>
        ) : (
          activeCase.findings.map((f) => (
            <div 
              key={f.id}
              className="bg-white rounded-xl border border-[#D6DEE7] shadow-xs p-5 space-y-3.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F79] bg-[#E6F5F4] px-2 py-0.5 rounded border border-[#087F79]/30">
                      {f.category}
                    </span>
                    <span className="text-xs text-[#526174]">
                      Recorded on {f.createdAt.split('T')[0]}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#14263A]">
                    {f.title}
                  </h3>
                </div>

                {isOfficer && (
                  <button
                    type="button"
                    onClick={() => deleteFindingFromCase(activeCase.id, f.id)}
                    className="p-1.5 text-[#526174] hover:text-red-600 rounded transition-colors"
                    title="Delete Finding"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-xs text-[#172638] leading-relaxed">
                {f.description}
              </p>

              {/* Finding Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7] text-xs">
                <div>
                  <span className="text-[10px] text-[#526174] uppercase font-bold block">Source Examined:</span>
                  <span className="text-[#172638] font-medium">{f.sourceReference}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#526174] uppercase font-bold block">Field Subject:</span>
                  <span className="text-[#172638] font-medium">{f.fieldExamined}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#526174] uppercase font-bold block">Evidence Exhibit:</span>
                  <span className="text-[#172638] font-medium">{f.evidenceReference}</span>
                </div>
              </div>

              {/* Assessment & Recommendation */}
              <div className="text-xs space-y-1">
                <div className="text-[#172638]">
                  <strong className="text-[#14263A]">Assessment:</strong> {f.officerAssessment}
                </div>
                <div className="text-[#087F79]">
                  <strong className="text-[#14263A]">Recommendation:</strong> {f.recommendation}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submission Card for Officer */}
      {isOfficer && (activeCase.status === 'draft' || activeCase.status === 'under_review' || activeCase.status === 'returned') && (
        <div className="p-5 bg-white rounded-xl border border-[#D6DEE7] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-[#14263A] uppercase tracking-wider">
              Ready to Submit for Senior Officer Oversight?
            </h4>
            <p className="text-xs text-[#526174] mt-0.5">
              Submitting advances this case file to the Senior Officer review queue for formal approval.
            </p>
          </div>
          <button
            type="button"
            onClick={() => submitCaseForReview(activeCase.id)}
            className="px-5 py-2.5 bg-[#087F79] hover:bg-[#066661] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Submit Screening Package</span>
          </button>
        </div>
      )}

      {/* Add Finding Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-[#14263A] mb-1">
              Record Administrative Finding
            </h3>
            <p className="text-xs text-[#526174] mb-4">
              Add structured observation backed by record references and physical exhibits.
            </p>

            <form onSubmit={handleAddFinding} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                  Finding Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Land Area Variance Between Deed and RS Volume"
                  className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FindingItem['category'])}
                    className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
                  >
                    <option value="Area Computation">Area Computation</option>
                    <option value="Ownership Chain">Ownership Chain</option>
                    <option value="Cadastral Boundary">Cadastral Boundary</option>
                    <option value="Mutation Record">Mutation Record</option>
                    <option value="Registration Validity">Registration Validity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                    Field Examined
                  </label>
                  <input
                    type="text"
                    value={fieldExamined}
                    onChange={(e) => setFieldExamined(e.target.value)}
                    placeholder="e.g. Area Quantity (Decimal)"
                    className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                  Source Reference
                </label>
                <input
                  type="text"
                  value={sourceReference}
                  onChange={(e) => setSourceReference(e.target.value)}
                  placeholder="e.g. RS Porcha No. 892 vs Deed 1284/1994"
                  className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                  Evidentiary Exhibit Reference
                </label>
                <input
                  type="text"
                  value={evidenceReference}
                  onChange={(e) => setEvidenceReference(e.target.value)}
                  placeholder="e.g. Exhibit A-1 (Certified Settlement Extract)"
                  className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                  Detailed Observation Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide precise neutral description of the observed record alignment or variance."
                  className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#172638] uppercase mb-1">
                  Officer Assessment & Recommendation
                </label>
                <input
                  type="text"
                  value={officerAssessment}
                  onChange={(e) => setOfficerAssessment(e.target.value)}
                  placeholder="e.g. Applicant must furnish supplementary certified mutation sheet."
                  className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#D6DEE7] text-[#526174]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#087F79] hover:bg-[#066661] text-white font-semibold"
                >
                  Record Finding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
