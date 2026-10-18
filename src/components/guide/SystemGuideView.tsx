import React, { useState } from 'react';
import { 
  BookOpen, 
  FolderKanban, 
  FilePlus2, 
  SearchCheck, 
  FileSpreadsheet, 
  FileText, 
  History, 
  ShieldCheck, 
  HelpCircle,
  Scale,
  Building,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const SystemGuideView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('workflow');

  const sections = [
    { id: 'workflow', label: '1. End-to-End Workflow', icon: Scale },
    { id: 'modules', label: '2. Portal Modules Overview', icon: FolderKanban },
    { id: 'discrepancy', label: '3. Discrepancy Taxonomy & Labels', icon: SearchCheck },
    { id: 'bangladesh_land', label: '4. Bangladesh Land Records Guide', icon: Building },
    { id: 'roles_security', label: '5. Roles & Policy Restrictions', icon: Lock },
    { id: 'public_verification', label: '6. Public Report Integrity', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#14263A] text-white">
            <BookOpen className="w-5 h-5 text-[#087F79]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#14263A] tracking-tight">
              System Guide
            </h1>
            <p className="text-xs text-[#526174] mt-0.5">
              Operating procedures, discrepancy taxonomies, role policies, and land record specifications.
            </p>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="mt-5 pt-4 border-t border-[#D6DEE7] flex flex-wrap gap-2">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#14263A] text-white shadow-xs'
                    : 'bg-[#F4F7FA] text-[#526174] hover:bg-[#E6F5F4] hover:text-[#14263A]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#087F79]' : 'text-[#526174]'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Guide Content Area */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 sm:p-8 shadow-xs text-xs space-y-6 text-[#172638] leading-relaxed">
        
        {/* Section 1: End-to-End Workflow */}
        {activeSection === 'workflow' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-sm font-bold text-[#14263A] uppercase tracking-wider border-b border-[#D6DEE7] pb-2">
              End-to-End Administrative Workflow Lifecycle
            </h2>
            <p className="text-[#526174]">
              Jomi Guard Pro coordinates the administrative review of land documents across multiple government roles to ensure consistent title screening:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              <div className="p-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <span className="font-mono text-xs font-bold text-[#087F79] block mb-1">STAGE 1</span>
                <strong className="text-[#14263A] block mb-1">New Intake</strong>
                <p className="text-[11px] text-[#526174]">Officer creates or drafts case with Mouza, Khatian, Dag plot, Deed particulars, and scanned documents.</p>
              </div>

              <div className="p-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <span className="font-mono text-xs font-bold text-[#087F79] block mb-1">STAGE 2</span>
                <strong className="text-[#14263A] block mb-1">Review Workspace</strong>
                <p className="text-[11px] text-[#526174]">Candidate values extracted from documents are reviewed (Accept, Edit, Reject) and discrepancies evaluated.</p>
              </div>

              <div className="p-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <span className="font-mono text-xs font-bold text-[#087F79] block mb-1">STAGE 3</span>
                <strong className="text-[#14263A] block mb-1">Findings & Evidence</strong>
                <p className="text-[11px] text-[#526174]">Officer documents observations, links evidentiary exhibits, and submits the completed dossier for oversight.</p>
              </div>

              <div className="p-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <span className="font-mono text-xs font-bold text-[#087F79] block mb-1">STAGE 4</span>
                <strong className="text-[#14263A] block mb-1">Senior Oversight</strong>
                <p className="text-[11px] text-[#526174]">Senior Officer evaluates the case: Approves, Returns for correction with mandatory reason, or requests evidence.</p>
              </div>

              <div className="p-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <span className="font-mono text-xs font-bold text-[#087F79] block mb-1">STAGE 5</span>
                <strong className="text-[#14263A] block mb-1">Report & Verify</strong>
                <p className="text-[11px] text-[#526174]">Approved cases receive an official report with SHA-256 seal, verifiable on the public portal.</p>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Portal Modules */}
        {activeSection === 'modules' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-sm font-bold text-[#14263A] uppercase tracking-wider border-b border-[#D6DEE7] pb-2">
              Overview of Internal Modules
            </h2>
            <div className="space-y-3">
              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] text-xs block mb-1">1. Dashboard</strong>
                <p className="text-[#526174]">Central operational monitoring center displaying assigned workload, review queues, returned cases, and recent actions.</p>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] text-xs block mb-1">2. Cases</strong>
                <p className="text-[#526174]">Master case directory with multi-field search (Mouza, Khatian, Plot, Deed, Party), status filtering, and file inspection drawer.</p>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] text-xs block mb-1">3. New Intake</strong>
                <p className="text-[#526174]">Entry form for new screening dossiers. Supports saving drafts without submitting and seamless progression to review.</p>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] text-xs block mb-1">4. Review Workspace</strong>
                <p className="text-[#526174]">Two-phase analytical engine: field extraction verification (Accept, Edit, Reject) and multi-source discrepancy evaluation.</p>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] text-xs block mb-1">5. Findings and Evidence</strong>
                <p className="text-[#526174]">Structured catalog for recording administrative observations backed by document references and exhibit identifiers.</p>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] text-xs block mb-1">6. Reports</strong>
                <p className="text-[#526174]">Generates official administrative screening reports with cryptographic SHA-256 seal registration and print layout.</p>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] text-xs block mb-1">7. Audit Trail</strong>
                <p className="text-[#526174]">Full-width chronological list of system events, actors, timestamps, and case links with CSV export.</p>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] text-xs block mb-1">8. System Guide</strong>
                <p className="text-[#526174]">Final sidebar module providing statutory guidelines, standard operating procedures, and taxonomy references.</p>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Discrepancy Taxonomy */}
        {activeSection === 'discrepancy' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-sm font-bold text-[#14263A] uppercase tracking-wider border-b border-[#D6DEE7] pb-2">
              Standard Discrepancy Taxonomy & Exact Labels
            </h2>
            <p className="text-[#526174]">
              In accordance with administrative fairness policies, Jomi Guard Pro uses strict neutral, evidence-based labels. Never use speculative or accusatory wording.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-xs font-bold text-red-800 uppercase block mb-1">
                  1. “Data mismatch detected”
                </span>
                <p className="text-red-900 text-[11px]">
                  Applied when direct mathematical, textual, or identifier divergence exists between primary sources (e.g. Registered Deed claims 25 decimals but RS Settlement record reflects 20 decimals).
                </p>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="text-xs font-bold text-amber-800 uppercase block mb-1">
                  2. “Information missing”
                </span>
                <p className="text-amber-900 text-[11px]">
                  Applied when a statutory archival link or certified document is absent from the submitted dossier (e.g. Namjari subdivision lacks certified field demarcation trace sketch).
                </p>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-xs font-bold text-blue-800 uppercase block mb-1">
                  3. “Further verification recommended”
                </span>
                <p className="text-blue-900 text-[11px]">
                  Applied when archival ambiguity requires physical inspection of district collectorate record room settlement volumes or field Kanungo survey.
                </p>
              </div>

              <div className="p-3.5 bg-[#E6F5F4] border border-[#087F79]/30 rounded-lg">
                <span className="text-xs font-bold text-[#087F79] uppercase block mb-1">
                  4. “No discrepancy detected in the fields checked”
                </span>
                <p className="text-[#14263A] text-[11px]">
                  Applied when all checked fields (Party Name, Dag Plot, Khatian, Area, and consideration) align across submitted settlement and registration records.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Bangladesh Land Records Guide */}
        {activeSection === 'bangladesh_land' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-sm font-bold text-[#14263A] uppercase tracking-wider border-b border-[#D6DEE7] pb-2">
              Bangladesh Land Administration Reference
            </h2>
            <p className="text-[#526174]">
              Understanding the historical sequence of cadastral surveys and revenue records in Bangladesh:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] block mb-1">CS (Cadastral Survey)</strong>
                <p className="text-[11px] text-[#526174]">Conducted between 1888 and 1940 under the Bengal Tenancy Act 1885. The foundational cadastral survey mapping each plot (Dag) and tenant right.</p>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] block mb-1">SA (State Acquisition Survey)</strong>
                <p className="text-[11px] text-[#526174]">Prepared in 1956–1962 pursuant to the East Bengal State Acquisition and Tenancy Act 1950, abolishing intermediary zamindari rent-receiving interests.</p>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] block mb-1">RS (Revisional Survey)</strong>
                <p className="text-[11px] text-[#526174]">Modern revisional survey initiated under Section 144 of the 1950 Act. Primary reference standard for present title and possession.</p>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] block mb-1">Namjari (Mutation Khatian)</strong>
                <p className="text-[11px] text-[#526174]">Administrative process by which a new owner's name is registered in the revenue record upon purchase, inheritance, or partition decree.</p>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Roles & Policy Restrictions */}
        {activeSection === 'roles_security' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-sm font-bold text-[#14263A] uppercase tracking-wider border-b border-[#D6DEE7] pb-2">
              Role Permissions & System Restrictions
            </h2>
            <div className="space-y-3">
              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] block mb-1">Role Separation:</strong>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-[#526174]">
                  <li><strong>Land Records Officer:</strong> Case intake, field verification, discrepancy flagging, findings documentation, submission. Cannot approve or issue reports.</li>
                  <li><strong>Senior Assistant Commissioner (Land):</strong> Review queue oversight, case approval, return for correction, evidence requests, official report issuance.</li>
                  <li><strong>Auditor:</strong> Read-only inspection of case history, full audit trail analysis, report hash integrity verification.</li>
                </ul>
              </div>

              <div className="p-3.5 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7]">
                <strong className="text-[#14263A] block mb-1">Account & Credential Restrictions:</strong>
                <p className="text-[11px] text-[#526174]">
                  In compliance with administrative security policies, username editing and self-service password recovery are restricted on this terminal. Attempting these actions triggers the notice:
                </p>
                <div className="mt-2 p-2.5 rounded bg-white border border-[#D6DEE7] font-semibold text-[#14263A]">
                  “This function is under restriction. Maybe you can use it later.”
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 6: Public Report Integrity */}
        {activeSection === 'public_verification' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-sm font-bold text-[#14263A] uppercase tracking-wider border-b border-[#D6DEE7] pb-2">
              Public Report Integrity & Legal Safeguards
            </h2>
            <p className="text-[#526174]">
              Public report verification operates as a standalone public route accessible without internal credentials.
            </p>
            <div className="p-3.5 bg-[#E6F5F4] rounded-lg border border-[#087F79]/30 space-y-2">
              <strong className="text-[#14263A] block">Digital Digest Mechanism:</strong>
              <p className="text-[11px] text-[#526174]">
                Each issued report is cryptographically sealed with a 64-character SHA-256 hash. Public queries verify that the certificate matches the authoritative record in the database.
              </p>
              <div className="pt-2 border-t border-[#087F79]/20 text-[10px] text-[#526174]">
                <strong>Legal Notice:</strong> Public verification confirms document authenticity against administrative records. It does not certify legal ownership or replace judicial title investigation under the Transfer of Property Act.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
