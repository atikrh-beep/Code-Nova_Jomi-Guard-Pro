import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Hash, 
  QrCode, 
  ExternalLink,
  Building,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { BrandIcon } from '../brand/BrandIcon';
import { useApp } from '../../context/AppContext';
import { LandCase, ReportItem } from '../../types';

export const ReportsView: React.FC = () => {
  const { 
    currentUser, 
    cases, 
    activeCase, 
    setActiveCaseId, 
    issueReport,
    setActiveTab
  } = useApp();

  const [selectedCaseId, setSelectedCaseId] = useState<string>(activeCase?.id || cases[0]?.id || '');

  const currentCase = cases.find((c) => c.id === selectedCaseId) || activeCase || cases[0];
  const isSenior = currentUser?.role === 'senior_officer';

  const handlePrint = () => {
    window.print();
  };

  const handleIssueReport = () => {
    if (!currentCase) return;
    issueReport(currentCase.id);
  };

  const report = currentCase?.report;

  return (
    <div className="space-y-6">
      {/* Top Header & Selector (Hidden in print) */}
      <div className="no-print bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#14263A] tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#087F79]" />
            <span>Reports</span>
          </h1>
          <p className="text-xs text-[#526174] mt-1">
            Screening summaries with cryptographic integrity seals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Select Case to view report */}
          <select
            value={currentCase?.id}
            onChange={(e) => {
              setSelectedCaseId(e.target.value);
              setActiveCaseId(e.target.value);
            }}
            className="px-3 py-2 text-xs bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.reference} — {c.mouza} ({c.report ? 'Report Issued' : c.status})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-[#F4F7FA] hover:bg-[#E6F5F4] text-[#14263A] text-xs font-semibold rounded-lg border border-[#D6DEE7] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#087F79]" />
            <span>Print Report</span>
          </button>

          {isSenior && currentCase && currentCase.status === 'approved' && !report && (
            <button
              type="button"
              onClick={handleIssueReport}
              className="px-4 py-2 bg-[#087F79] hover:bg-[#066661] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Issue Official Report</span>
            </button>
          )}
        </div>
      </div>

      {/* Case not yet approved notice if applicable (Hidden in print) */}
      {!report && currentCase?.status !== 'approved' && (
        <div className="no-print p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-900 block font-semibold">
              Draft Report Preview Mode
            </strong>
            This case is currently <strong className="font-semibold uppercase">{currentCase?.status}</strong>. Official report issuance and cryptographic SHA-256 seal registration require Senior Officer approval.
          </div>
        </div>
      )}

      {/* Structured Official Report Card / Print Layout */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] shadow-sm p-6 sm:p-10 max-w-4xl mx-auto space-y-8 text-[#172638]">
        
        {/* Official Header */}
        <div className="border-b-2 border-[#14263A] pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <BrandIcon size={48} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#14263A]">Jomi Guard Pro</span>
                <span className="text-[10px] bg-[#E6F5F4] text-[#087F79] font-bold px-2 py-0.5 rounded border border-[#087F79]/30">
                  ADMINISTRATIVE SCREENING REPORT
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#526174] mt-0.5">
                Government Technology
              </p>
              <p className="text-[11px] text-[#526174] mt-1">
                Land Records & Title Concordance Assessment Portfolio
              </p>
            </div>
          </div>

          <div className="text-right sm:self-center font-mono text-xs">
            <div className="bg-[#F4F7FA] p-3 rounded-lg border border-[#D6DEE7] inline-block text-left">
              <span className="text-[10px] uppercase text-[#526174] font-bold block">Report Identifier</span>
              <strong className="text-sm text-[#14263A] block">
                {report ? report.reportReference : `DRAFT-${currentCase?.reference}`}
              </strong>
              <span className="text-[10px] text-[#526174] block mt-0.5">
                Date: {report ? report.issueDate : new Date().toISOString().substring(0, 10)}
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Subject Case Particulars */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider border-b border-[#D6DEE7] pb-1.5">
            1. Subject Record Particulars
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F4F7FA] p-4 rounded-lg border border-[#D6DEE7] text-xs">
            <div>
              <span className="text-[#526174] block text-[11px]">Case Reference</span>
              <strong className="font-mono text-[#14263A]">{currentCase?.reference}</strong>
            </div>
            <div>
              <span className="text-[#526174] block text-[11px]">Mouza & JL</span>
              <strong className="text-[#14263A]">{currentCase?.mouza} (JL {currentCase?.jlNumber})</strong>
            </div>
            <div>
              <span className="text-[#526174] block text-[11px]">Thana & District</span>
              <strong className="text-[#14263A]">{currentCase?.thana}, {currentCase?.district}</strong>
            </div>
            <div>
              <span className="text-[#526174] block text-[11px]">Khatian & Dag Plot</span>
              <strong className="font-mono text-[#14263A]">{currentCase?.khatianType}-{currentCase?.khatianNumber} / {currentCase?.dagPlotNumber}</strong>
            </div>
            <div>
              <span className="text-[#526174] block text-[11px]">Deed Number</span>
              <strong className="font-mono text-[#14263A]">{currentCase?.deedNumber}</strong>
            </div>
            <div>
              <span className="text-[#526174] block text-[11px]">Sub-Registry Office</span>
              <strong className="text-[#14263A]">{currentCase?.subRegistryOffice}</strong>
            </div>
            <div>
              <span className="text-[#526174] block text-[11px]">Registration Date</span>
              <strong className="text-[#14263A]">{currentCase?.registrationDate}</strong>
            </div>
            <div>
              <span className="text-[#526174] block text-[11px]">Recorded Land Area</span>
              <strong className="text-[#14263A]">{currentCase?.landArea} {currentCase?.landUnit}</strong>
            </div>
          </div>
        </section>

        {/* Section 2: Scope of Review */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider border-b border-[#D6DEE7] pb-1.5">
            2. Scope of Administrative Examination
          </h2>
          <p className="text-xs text-[#172638] leading-relaxed bg-[#F4F7FA]/60 p-3.5 rounded-lg border border-[#D6DEE7]">
            {report 
              ? report.scopeOfReview 
              : `Statutory examination of ${currentCase?.khatianType} settlement record No. ${currentCase?.khatianNumber}, Dag Plot ${currentCase?.dagPlotNumber}, Registered Saf Kabala deed ${currentCase?.deedNumber}, and associated revenue tax archives for Mouza ${currentCase?.mouza}.`}
          </p>
        </section>

        {/* Section 3: Sources Examined */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider border-b border-[#D6DEE7] pb-1.5">
            3. Sources & Archives Examined ({currentCase?.documents.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {currentCase?.documents.map((doc, idx) => (
              <div key={idx} className="p-2.5 rounded border border-[#D6DEE7] bg-white flex items-center justify-between">
                <div>
                  <strong className="text-[#14263A] block">{doc.title}</strong>
                  <span className="text-[11px] text-[#526174]">{doc.issuingAuthority} &bull; {doc.issueDate}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#087F79] bg-[#E6F5F4] px-1.5 py-0.5 rounded">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Discrepancy Evaluation Summary */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider border-b border-[#D6DEE7] pb-1.5">
            4. Discrepancy Evaluation Matrix
          </h2>
          {currentCase?.discrepancies.length === 0 ? (
            <p className="text-xs text-[#526174] italic">No discrepancy records entered for this dossier.</p>
          ) : (
            <div className="space-y-2 text-xs">
              {currentCase?.discrepancies.map((d) => (
                <div key={d.id} className="p-3 rounded border border-[#D6DEE7] bg-[#F4F7FA] flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <strong className="text-[#14263A] block">{d.title}</strong>
                    <p className="text-[11px] text-[#526174]">{d.description}</p>
                    <div className="text-[11px] text-[#087F79] font-medium pt-1">
                      Resolution Note: {d.recommendation}
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-[#14263A] border border-[#D6DEE7]">
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 5: Cryptographic Integrity Registration */}
        <section className="p-4 bg-[#F4F7FA] rounded-xl border border-[#D6DEE7] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#14263A] flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#087F79]" />
              <span>Digital Registry Hash (SHA-256)</span>
            </span>
            <span className="text-[10px] font-mono text-[#087F79] font-bold bg-[#E6F5F4] px-2 py-0.5 rounded border border-[#087F79]/20">
              {report ? 'ACTIVE REGISTRATION' : 'PENDING APPROVAL'}
            </span>
          </div>
          <p className="font-mono text-xs text-[#526174] break-all bg-white p-2.5 rounded border border-[#D6DEE7]">
            {report?.integrityHash || 'SHA-256 hash will be generated and signed upon Senior Officer approval.'}
          </p>
          <div className="flex items-center justify-between text-[11px] text-[#526174] pt-1">
            <span>Public Code: <strong className="font-mono text-[#172638]">{report?.publicVerificationCode || 'JGP-VERIFY-PENDING'}</strong></span>
            <span>Check at: jomiguard.gov.bd/verify</span>
          </div>
        </section>

        {/* Section 6: Official Sign-off Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t-2 border-[#14263A] text-xs">
          <div>
            <div className="border-b border-dashed border-[#526174] pb-8 mb-2"></div>
            <strong className="text-[#14263A] block">{currentCase?.assignedOfficerName}</strong>
            <span className="text-[#526174] text-[11px]">Assistant Land Records Officer</span>
            <span className="text-[#526174] text-[10px] block">Tejgaon Circle Land Office</span>
          </div>
          <div>
            <div className="border-b border-dashed border-[#526174] pb-8 mb-2"></div>
            <strong className="text-[#14263A] block">
              {report?.approvedBySenior || 'Nazmul Ahmed'}
            </strong>
            <span className="text-[#526174] text-[11px]">Senior Assistant Commissioner (Land)</span>
            <span className="text-[#526174] text-[10px] block">Dhaka Collectorate Revenue Administration</span>
          </div>
        </div>

        {/* Statutory Safeguard Disclaimer (Part 27 requirement) */}
        <div className="pt-4 border-t border-[#D6DEE7] text-[10px] text-[#526174] leading-relaxed">
          <strong>Administrative Notice:</strong> This document represents an administrative screening and discrepancy-detection report issued for record synchronization purposes. It does not constitute a judicial determination of ownership, title warranty, or guarantee under the Transfer of Property Act 1882 or Registration Act 1908.
        </div>

      </div>
    </div>
  );
};
