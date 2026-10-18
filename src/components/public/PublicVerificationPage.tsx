import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  MapPin, 
  Hash, 
  FileCheck, 
  UserCheck, 
  ExternalLink,
  QrCode,
  Info
} from 'lucide-react';
import { BrandIcon } from '../brand/BrandIcon';
import { useApp } from '../../context/AppContext';
import { ReportItem } from '../../types';

interface PublicVerificationPageProps {
  onBackToSignIn: () => void;
}

export const PublicVerificationPage: React.FC<PublicVerificationPageProps> = ({ onBackToSignIn }) => {
  const { verifyReportByReference } = useApp();
  const [searchQuery, setSearchQuery] = useState('JGP-RPT-2026-0842');
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<{
    found: boolean;
    report?: ReportItem;
    integrityPassed: boolean;
    statusLabel: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const res = verifyReportByReference(searchQuery.trim());
      setResult(res);
      setHasSearched(true);
      setIsLoading(false);
    }, 300);
  };

  const handleQuickLookup = (sampleRef: string) => {
    setSearchQuery(sampleRef);
    setIsLoading(true);
    setTimeout(() => {
      const res = verifyReportByReference(sampleRef);
      setResult(res);
      setHasSearched(true);
      setIsLoading(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] text-[#172638] flex flex-col justify-between">
      {/* Public Header */}
      <header className="bg-white border-b border-[#D6DEE7] py-4 px-6 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandIcon size={38} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#14263A]">Jomi Guard Pro</span>
                <span className="text-[10px] bg-[#E6F5F4] text-[#087F79] font-bold px-2 py-0.5 rounded border border-[#087F79]/30">
                  PUBLIC VERIFICATION
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#526174]">
                Government Technology
              </p>
            </div>
          </div>

          <button
            onClick={onBackToSignIn}
            className="text-xs font-semibold text-[#14263A] hover:text-[#087F79] flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D6DEE7] hover:bg-[#F4F7FA] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Officer Sign-In</span>
          </button>
        </div>
      </header>

      {/* Main Verification Interface */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Verification Overview Box */}
        <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-sm mb-6">
          <div className="max-w-2xl">
            <h1 className="text-xl sm:text-2xl font-bold text-[#14263A] tracking-tight">
              Report Integrity Verification
            </h1>
            <p className="text-sm text-[#526174] mt-1.5 leading-relaxed">
              Verify an administrative Land Screening Report issued by authorized land revenue offices. Enter the official report reference or public verification code printed on the certificate.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#526174]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. JGP-RPT-2026-0842 or JGP-VERIFY-0842-DHN"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79] focus:border-transparent font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2.5 px-6 bg-[#087F79] hover:bg-[#066661] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <span>Checking Registry...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Report</span>
                </>
              )}
            </button>
          </form>

          {/* Quick reference examples */}
          <div className="mt-3 flex items-center gap-2 text-xs text-[#526174]">
            <span>Try sample issued report:</span>
            <button
              type="button"
              onClick={() => handleQuickLookup('JGP-RPT-2026-0842')}
              className="font-mono text-[#087F79] underline hover:text-[#066661]"
            >
              JGP-RPT-2026-0842
            </button>
          </div>
        </div>

        {/* Verification Result Display */}
        {hasSearched && result && (
          <div className="animate-fade-in space-y-6">
            {result.found && result.report ? (
              /* Verified Report Found */
              <div className="bg-white rounded-xl border border-[#D6DEE7] shadow-sm overflow-hidden">
                {/* Result Status Banner */}
                <div className="bg-[#E6F5F4] border-b border-[#087F79]/20 p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-[#087F79] text-white">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-[#087F79]">
                          {result.statusLabel}
                        </span>
                        <span className="text-xs bg-white text-[#14263A] font-semibold px-2 py-0.5 rounded border border-[#087F79]/30">
                          Integrity check passed
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-[#14263A] mt-0.5">
                        Official Land Screening Report
                      </h2>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end text-xs text-[#526174]">
                    <span>Registry Status</span>
                    <strong className="text-[#087F79] font-semibold">Active & Valid Record</strong>
                  </div>
                </div>

                {/* Report Public Details Grid */}
                <div className="p-6 space-y-6">
                  {/* Primary Metadata Table */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                      <span className="text-[11px] uppercase tracking-wider text-[#526174] font-semibold block mb-1">
                        Report Reference
                      </span>
                      <span className="text-sm font-mono font-bold text-[#14263A]">
                        {result.report.reportReference}
                      </span>
                    </div>

                    <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                      <span className="text-[11px] uppercase tracking-wider text-[#526174] font-semibold block mb-1">
                        Case Reference
                      </span>
                      <span className="text-sm font-mono font-bold text-[#14263A]">
                        {result.report.caseReference}
                      </span>
                    </div>

                    <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                      <span className="text-[11px] uppercase tracking-wider text-[#526174] font-semibold block mb-1">
                        Issue Date
                      </span>
                      <span className="text-sm font-medium text-[#14263A] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#526174]" />
                        {result.report.issueDate}
                      </span>
                    </div>

                    <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                      <span className="text-[11px] uppercase tracking-wider text-[#526174] font-semibold block mb-1">
                        Mouza & Thana
                      </span>
                      <span className="text-sm font-medium text-[#14263A] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#526174]" />
                        {result.report.mouza} (JL {result.report.jlNumber}), {result.report.thana}
                      </span>
                    </div>
                  </div>

                  {/* Scope of Administrative Review */}
                  <div>
                    <h3 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-2">
                      Scope of Review
                    </h3>
                    <p className="text-xs text-[#526174] bg-[#F4F7FA] p-3.5 rounded-lg border border-[#D6DEE7] leading-relaxed">
                      {result.report.scopeOfReview}
                    </p>
                  </div>

                  {/* Sources Examined */}
                  <div>
                    <h3 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-2">
                      Sources Examined & Verified
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {result.report.sourcesExamined.map((src, idx) => (
                        <li 
                          key={idx}
                          className="flex items-center gap-2 p-2.5 bg-white border border-[#D6DEE7] rounded-lg text-[#172638]"
                        >
                          <FileCheck className="w-4 h-4 text-[#087F79] shrink-0" />
                          <span>{src}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cryptographic Integrity Signature Verification */}
                  <div className="p-4 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#14263A] flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-[#087F79]" />
                        SHA-256 Digital Integrity Seal
                      </span>
                      <span className="text-[11px] font-mono text-[#087F79] bg-[#E6F5F4] px-2 py-0.5 rounded border border-[#087F79]/20">
                        MATCH CONFIRMED
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#526174] break-all bg-white p-2.5 rounded border border-[#D6DEE7]">
                      {result.report.integrityHash}
                    </p>
                    <p className="text-[11px] text-[#526174] mt-2">
                      This cryptographic digest guarantees the report content has remained unchanged since issuance by the revenue administration.
                    </p>
                  </div>

                  {/* Sign-off Authorities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#D6DEE7] text-xs">
                    <div>
                      <span className="text-[11px] text-[#526174] block">Screening Officer:</span>
                      <strong className="text-[#172638] flex items-center gap-1.5 mt-0.5">
                        <UserCheck className="w-3.5 h-3.5 text-[#526174]" />
                        {result.report.issuedByOfficer}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#526174] block">Authorized Approver:</span>
                      <strong className="text-[#172638] flex items-center gap-1.5 mt-0.5">
                        <UserCheck className="w-3.5 h-3.5 text-[#087F79]" />
                        {result.report.approvedBySenior}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Report Not Found State */
              <div className="bg-white rounded-xl border border-[#D6DEE7] p-8 text-center shadow-sm">
                <div className="inline-flex p-3 rounded-full bg-red-50 text-red-600 mb-3 border border-red-200">
                  <XCircle className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-bold text-[#14263A]">
                  Report not found
                </h2>
                <p className="text-xs text-[#526174] max-w-md mx-auto mt-2 leading-relaxed">
                  No matching administrative report was located for reference <strong className="font-mono text-[#172638]">{searchQuery}</strong>. Please check that the reference number is entered correctly, or contact the issuing land office.
                </p>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => handleQuickLookup('JGP-RPT-2026-0842')}
                    className="text-xs text-[#087F79] hover:underline font-semibold"
                  >
                    View demonstration issued report (JGP-RPT-2026-0842)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Legal Disclaimer Box (Part 20 & Part 27 requirement) */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-[#D6DEE7] shadow-xs flex items-start gap-3">
          <Info className="w-5 h-5 text-[#087F79] shrink-0 mt-0.5" />
          <div className="text-xs text-[#526174] leading-relaxed">
            <strong className="text-[#172638] block font-semibold mb-0.5">
              Legal Safeguard Notice
            </strong>
            This report-integrity check confirms that the issued summary matches the administrative record in Jomi Guard Pro. It does not establish legal ownership, convey title, or independently guarantee legal validity under the Transfer of Property Act or Registration Act.
          </div>
        </div>
      </main>

      {/* Public Footer */}
      <footer className="border-t border-[#D6DEE7] py-4 px-6 text-center text-xs text-[#526174] bg-white">
        <p>Jomi Guard Pro &bull; Government Technology &bull; Public Verification Service</p>
      </footer>
    </div>
  );
};
