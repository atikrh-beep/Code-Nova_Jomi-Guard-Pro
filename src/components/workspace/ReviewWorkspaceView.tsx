import React, { useState } from 'react';
import { 
  SearchCheck, 
  FileText, 
  Check, 
  X, 
  Edit3, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  Scale, 
  FileCheck,
  ChevronDown,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExtractedField, FieldStatus, DiscrepancyItem, DiscrepancyLabel } from '../../types';

export const ReviewWorkspaceView: React.FC = () => {
  const { 
    currentUser, 
    cases, 
    activeCaseId, 
    setActiveCaseId, 
    activeCase, 
    updateExtractedField, 
    setActiveTab,
    submitCaseForReview
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'fields' | 'discrepancies'>('fields');
  
  // Field editing modal state
  const [editingField, setEditingField] = useState<ExtractedField | null>(null);
  const [editedValue, setEditedValue] = useState('');
  const [officerNote, setOfficerNote] = useState('');

  if (!activeCase) {
    return (
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-8 text-center">
        <h2 className="text-sm font-bold text-[#14263A]">No Case Selected</h2>
        <p className="text-xs text-[#526174] mt-1">Please select a case to begin document and discrepancy review.</p>
        <button
          onClick={() => setActiveTab('cases')}
          className="mt-4 px-4 py-2 bg-[#087F79] text-white text-xs font-semibold rounded-lg"
        >
          Go to Cases
        </button>
      </div>
    );
  }

  const handleOpenEditModal = (field: ExtractedField) => {
    setEditingField(field);
    setEditedValue(field.normalizedValue || field.extractedValue);
    setOfficerNote(field.officerComment || '');
  };

  const handleSaveFieldEdit = () => {
    if (!editingField || !activeCase) return;
    updateExtractedField(activeCase.id, editingField.id, 'edited', officerNote, editedValue);
    setEditingField(null);
  };

  const getDiscrepancyBadge = (label: DiscrepancyLabel) => {
    switch (label) {
      case 'Data mismatch detected':
        return { color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle };
      case 'Information missing':
        return { color: 'bg-amber-50 text-amber-800 border-amber-200', icon: Info };
      case 'Further verification recommended':
        return { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Scale };
      case 'No discrepancy detected in the fields checked':
        return { color: 'bg-[#E6F5F4] text-[#087F79] border-[#087F79]/30', icon: CheckCircle2 };
    }
  };

  const isOfficer = currentUser?.role === 'officer';

  return (
    <div className="space-y-6">
      {/* Case Header & Quick Switcher */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#14263A] bg-[#F4F7FA] px-2.5 py-1 rounded border border-[#D6DEE7]">
                {activeCase.reference}
              </span>
              <span className="text-[11px] font-semibold text-[#087F79] bg-[#E6F5F4] px-2 py-0.5 rounded border border-[#087F79]/30">
                Mouza {activeCase.mouza} &bull; Plot {activeCase.dagPlotNumber}
              </span>
            </div>
            <h1 className="text-lg font-bold text-[#14263A] tracking-tight mt-1.5">
              {activeCase.title}
            </h1>
            <p className="text-xs text-[#526174]">
              Khatian: <strong className="font-mono text-[#172638]">{activeCase.khatianType}-{activeCase.khatianNumber}</strong> &bull; Deed: <strong className="font-mono text-[#172638]">{activeCase.deedNumber}</strong> &bull; Area: <strong className="text-[#172638]">{activeCase.landArea} {activeCase.landUnit}</strong>
            </p>
          </div>

          {/* Switch Case Selector */}
          <div className="flex items-center gap-2 self-start lg:self-center">
            <span className="text-xs text-[#526174] font-medium hidden sm:inline">Active File:</span>
            <select
              value={activeCase.id}
              onChange={(e) => setActiveCaseId(e.target.value)}
              className="px-3 py-1.5 text-xs bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.reference} — {c.mouza} ({c.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Workspace Tab Bar */}
        <div className="mt-5 pt-4 border-t border-[#D6DEE7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTabSub('fields')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeTabSub === 'fields'
                  ? 'bg-[#14263A] text-white shadow-xs'
                  : 'bg-[#F4F7FA] text-[#526174] hover:bg-[#E6F5F4] hover:text-[#14263A]'
              }`}
            >
              <FileCheck className="w-4 h-4 text-[#087F79]" />
              <span>Extracted Fields Review ({activeCase.extractedFields.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTabSub('discrepancies')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeTabSub === 'discrepancies'
                  ? 'bg-[#14263A] text-white shadow-xs'
                  : 'bg-[#F4F7FA] text-[#526174] hover:bg-[#E6F5F4] hover:text-[#14263A]'
              }`}
            >
              <Scale className="w-4 h-4 text-[#087F79]" />
              <span>Discrepancy Evaluation Matrix ({activeCase.discrepancies.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('findings')}
            className="text-xs font-semibold text-[#087F79] hover:text-[#066661] flex items-center gap-1 cursor-pointer"
          >
            <span>Proceed to Findings & Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subtab 1: Extracted Fields Review */}
      {activeTabSub === 'fields' && (
        <div className="bg-white rounded-xl border border-[#D6DEE7] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#D6DEE7] bg-[#F4F7FA]/50 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#087F79]" />
                <span>Field Extraction Review</span>
              </h2>
              <p className="text-xs text-[#526174] mt-0.5">
                Review candidate values extracted from scanned documents.
              </p>
            </div>
            <span className="text-xs font-mono text-[#526174]">
              {activeCase.extractedFields.filter((f) => f.status === 'accepted').length} / {activeCase.extractedFields.length} Accepted
            </span>
          </div>

          {activeCase.extractedFields.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#526174]">
              No extracted fields indexed for this case dossier yet.
            </div>
          ) : (
            <div className="divide-y divide-[#D6DEE7]">
              {activeCase.extractedFields.map((field) => {
                const isAccepted = field.status === 'accepted';
                const isEdited = field.status === 'edited';
                const isRejected = field.status === 'rejected';

                return (
                  <div key={field.id} className="p-4 sm:p-5 hover:bg-[#F4F7FA]/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      
                      {/* Field Details */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#14263A]">
                            {field.fieldName}
                          </span>
                          <span className="text-[10px] text-[#526174] bg-[#F4F7FA] px-2 py-0.5 rounded border border-[#D6DEE7]">
                            {field.sourceDocumentTitle}
                          </span>
                          <span className="text-[10px] font-mono text-[#087F79] bg-[#E6F5F4] px-1.5 py-0.5 rounded">
                            {field.confidence}% Match
                          </span>
                        </div>

                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="text-xs text-[#526174]">Extracted Candidate:</span>
                          <strong className="text-sm font-mono text-[#172638]">
                            {field.normalizedValue || field.extractedValue}
                          </strong>
                        </div>

                        {field.officerComment && (
                          <div className="text-[11px] text-[#526174] italic bg-[#F4F7FA] px-2.5 py-1 rounded border border-[#D6DEE7]/60 inline-block">
                            Officer Note: {field.officerComment}
                          </div>
                        )}
                      </div>

                      {/* Acceptance Controls */}
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <button
                          type="button"
                          onClick={() => updateExtractedField(activeCase.id, field.id, 'accepted')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isAccepted
                              ? 'bg-[#087F79] text-white shadow-xs'
                              : 'bg-[#F4F7FA] text-[#14263A] hover:bg-[#E6F5F4] border border-[#D6DEE7]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isAccepted ? 'Accepted' : 'Accept'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(field)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isEdited
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-[#F4F7FA] text-[#14263A] hover:bg-amber-50 border border-[#D6DEE7]'
                          }`}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{isEdited ? 'Edited' : 'Edit'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => updateExtractedField(activeCase.id, field.id, 'rejected')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isRejected
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-[#F4F7FA] text-[#14263A] hover:bg-red-50 border border-[#D6DEE7]'
                          }`}
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>{isRejected ? 'Flagged' : 'Reject'}</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Discrepancy Evaluation Matrix */}
      {activeTabSub === 'discrepancies' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#D6DEE7] p-5 shadow-xs">
            <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#087F79]" />
              <span>Discrepancy Evaluation</span>
            </h2>
          </div>

          {activeCase.discrepancies.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#D6DEE7] p-8 text-center text-xs text-[#526174]">
              No discrepancy records indexed for this case.
            </div>
          ) : (
            activeCase.discrepancies.map((item) => {
              const badge = getDiscrepancyBadge(item.label);
              const BadgeIcon = badge.icon;

              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-xl border border-[#D6DEE7] shadow-xs p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D6DEE7]">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg border ${badge.color}`}>
                        <BadgeIcon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#14263A]">
                        {item.title}
                      </h3>
                    </div>

                    {/* Exact Mandated Discrepancy Result Label */}
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.color}`}>
                      {item.label}
                    </span>
                  </div>

                  <p className="text-xs text-[#172638] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Two Source Comparison Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                      <span className="text-[10px] uppercase font-bold text-[#526174] block mb-1">
                        Source A: {item.sourceA.documentTitle}
                      </span>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[#526174]">{item.sourceA.field}:</span>
                        <strong className="font-mono text-[#14263A]">{item.sourceA.value}</strong>
                      </div>
                    </div>

                    {item.sourceB ? (
                      <div className="p-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                        <span className="text-[10px] uppercase font-bold text-[#526174] block mb-1">
                          Source B: {item.sourceB.documentTitle}
                        </span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-[#526174]">{item.sourceB.field}:</span>
                          <strong className="font-mono text-[#14263A]">{item.sourceB.value}</strong>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7] flex items-center justify-center text-[11px] text-[#526174] italic">
                        No secondary comparison source required
                      </div>
                    )}
                  </div>

                  {/* Officer Assessment & Recommendation */}
                  <div className="pt-2 text-xs space-y-1">
                    {item.officerAssessment && (
                      <div className="text-[#526174]">
                        <strong className="text-[#172638]">Officer Assessment:</strong> {item.officerAssessment}
                      </div>
                    )}
                    <div className="text-[#087F79]">
                      <strong className="text-[#14263A]">Recommended Next Step:</strong> {item.recommendation}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Field Edit Dialog Modal */}
      {editingField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-[#14263A] mb-1">
              Edit Extracted Value
            </h3>
            <p className="text-xs text-[#526174] mb-4">
              Correct or normalize candidate field "{editingField.fieldName}" from {editingField.sourceDocumentTitle}.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#172638] uppercase tracking-wider mb-1">
                  Normalized Value
                </label>
                <input
                  type="text"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                  className="w-full p-2.5 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#172638] uppercase tracking-wider mb-1">
                  Reason for Amendment / Officer Note
                </label>
                <textarea
                  rows={3}
                  value={officerNote}
                  onChange={(e) => setOfficerNote(e.target.value)}
                  placeholder="e.g. Corrected to match verified settlement volume register."
                  className="w-full p-2.5 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setEditingField(null)}
                className="px-3.5 py-1.5 rounded-lg border border-[#D6DEE7] text-[#526174]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveFieldEdit}
                className="px-4 py-1.5 rounded-lg bg-[#087F79] hover:bg-[#066661] text-white font-semibold"
              >
                Save Field Amendment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
