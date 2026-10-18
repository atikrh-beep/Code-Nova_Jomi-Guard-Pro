import React, { useState } from 'react';
import { 
  FilePlus2, 
  Save, 
  ArrowRight, 
  Plus, 
  Trash2, 
  FileText, 
  UploadCloud, 
  CheckCircle2,
  AlertCircle,
  Building,
  MapPin,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { KhatianType, LandUnit, RecordedParty, DocumentItem } from '../../types';

export const NewIntakeView: React.FC = () => {
  const { saveDraft, submitCaseForReview, setActiveCaseId, setActiveTab } = useApp();

  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [mouza, setMouza] = useState('Tejgaon');
  const [jlNumber, setJlNumber] = useState('24');
  const [thana, setThana] = useState('Tejgaon');
  const [district, setDistrict] = useState('Dhaka');
  const [khatianType, setKhatianType] = useState<KhatianType>('RS');
  const [khatianNumber, setKhatianNumber] = useState('');
  const [dagPlotNumber, setDagPlotNumber] = useState('');
  const [deedNumber, setDeedNumber] = useState('');
  const [subRegistryOffice, setSubRegistryOffice] = useState('Tejgaon Sub-Registry Office');
  const [registrationDate, setRegistrationDate] = useState('1998-05-12');
  const [landArea, setLandArea] = useState<number | ''>(15.5);
  const [landUnit, setLandUnit] = useState<LandUnit>('decimal');

  // Parties list
  const [parties, setParties] = useState<RecordedParty[]>([
    {
      id: 'p_new_1',
      name: 'Mohammad Faruk Hossain',
      fatherOrHusbandName: 'Late Nurul Hossain',
      share: '1.00 (100%)',
      nidNumber: '19792692019000551',
      address: 'Plot 88, Tejgaon Industrial Area, Dhaka',
    },
  ]);

  // Documents list
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'doc_new_1',
      title: 'RS Khatian Porcha (Record Sheet)',
      documentType: 'RS Khatian',
      documentNumber: 'RS-712',
      issueDate: '1990-08-15',
      issuingAuthority: 'DLRS Tejgaon Settlement',
      fileSize: '2.1 MB',
      pages: 2,
      status: 'processed',
      summary: 'Certified settlement extract for Dag Plot 3902.',
    },
    {
      id: 'doc_new_2',
      title: 'Registered Saf Kabala Deed No. 2011/1998',
      documentType: 'Registered Deed',
      documentNumber: 'Deed-2011/1998',
      issueDate: '1998-05-12',
      issuingAuthority: 'Tejgaon Sub-Registry Office',
      fileSize: '4.2 MB',
      pages: 6,
      status: 'processed',
      summary: 'Conveyance deed executed in favor of primary title applicant.',
    },
  ]);

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleAddParty = () => {
    setParties([
      ...parties,
      {
        id: `p_new_${Date.now()}`,
        name: '',
        fatherOrHusbandName: '',
        share: '0.50 (50%)',
        nidNumber: '',
        address: '',
      },
    ]);
  };

  const handleRemoveParty = (id: string) => {
    if (parties.length <= 1) return;
    setParties(parties.filter((p) => p.id !== id));
  };

  const handlePartyChange = (id: string, field: keyof RecordedParty, value: string) => {
    setParties(
      parties.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSaveDraft = (continueToWorkspace = false) => {
    setValidationError(null);

    if (!title.trim()) {
      setValidationError('Case title is required to register an intake file.');
      return;
    }

    const result = saveDraft({
      title: title.trim(),
      purpose: purpose.trim() || 'Administrative Title Screening',
      mouza,
      jlNumber,
      thana,
      district,
      khatianType,
      khatianNumber: khatianNumber.trim() || 'RS-PENDING',
      dagPlotNumber: dagPlotNumber.trim() || 'PLOT-PENDING',
      deedNumber: deedNumber.trim() || 'DEED-PENDING',
      subRegistryOffice,
      registrationDate,
      landArea: Number(landArea) || 0,
      landUnit,
      parties: parties.filter((p) => p.name.trim()),
      documents,
      status: 'draft',
      extractedFields: [
        {
          id: `ef_init_1`,
          fieldName: 'Recorded Primary Party',
          fieldCategory: 'party',
          sourceDocumentId: documents[0]?.id || 'doc_new_1',
          sourceDocumentTitle: documents[0]?.title || 'RS Khatian',
          extractedValue: parties[0]?.name || 'Mohammad Faruk Hossain',
          normalizedValue: parties[0]?.name || 'Mohammad Faruk Hossain',
          confidence: 97,
          status: 'accepted',
        },
        {
          id: `ef_init_2`,
          fieldName: 'Dag Plot Number',
          fieldCategory: 'khatian_dag',
          sourceDocumentId: documents[0]?.id || 'doc_new_1',
          sourceDocumentTitle: documents[0]?.title || 'RS Khatian',
          extractedValue: dagPlotNumber || '3902',
          normalizedValue: dagPlotNumber || '3902',
          confidence: 99,
          status: 'accepted',
        },
      ],
      discrepancies: [
        {
          id: `disc_init_1`,
          title: 'Initial Screening Concordance Check',
          category: 'party_name',
          label: 'No discrepancy detected in the fields checked',
          description: `Primary identifiers align between submitted RS Khatian record and registered deed for Mouza ${mouza}.`,
          sourceA: {
            documentTitle: 'RS Khatian Record',
            field: 'Party & Plot',
            value: `${parties[0]?.name || 'Applicant'}, Plot ${dagPlotNumber || '3902'}`,
          },
          recommendation: 'Proceed with field comparison in Review Workspace.',
          status: 'addressed',
        },
      ],
      findings: [],
    });

    if (result.success) {
      setActiveCaseId(result.caseId);
      if (continueToWorkspace) {
        setActiveTab('review_workspace');
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#14263A] tracking-tight flex items-center gap-2">
            <FilePlus2 className="w-5 h-5 text-[#087F79]" />
            <span>New Intake</span>
          </h1>
          <p className="text-xs text-[#526174] mt-1">
            Register a screening case with cadastral particulars and records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSaveDraft(false)}
            className="px-4 py-2 bg-white hover:bg-[#F4F7FA] text-[#14263A] text-xs font-semibold rounded-lg border border-[#D6DEE7] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#087F79]" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleSaveDraft(true)}
            className="px-4 py-2 bg-[#087F79] hover:bg-[#066661] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Proceed to Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {validationError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Main Form Body */}
      <div className="bg-white rounded-xl border border-[#D6DEE7] p-6 shadow-xs space-y-6 text-xs">
        
        {/* Section 1: Case Identification */}
        <div>
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-[#087F79]" />
            <span>1. Case Identification & Purpose</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] uppercase tracking-wider mb-1">
                Case Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Tejgaon Industrial Plot 3902 Mutation Screening"
                className="w-full p-2.5 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] uppercase tracking-wider mb-1">
                Screening Purpose
              </label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Statutory verification for title lease assignment"
                className="w-full p-2.5 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087F79]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Mouza & Cadastral Jurisdiction */}
        <div className="pt-4 border-t border-[#D6DEE7]">
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#087F79]" />
            <span>2. Cadastral Jurisdiction (Mouza & Settlement)</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                Mouza
              </label>
              <input
                type="text"
                value={mouza}
                onChange={(e) => setMouza(e.target.value)}
                className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                JL Number
              </label>
              <input
                type="text"
                value={jlNumber}
                onChange={(e) => setJlNumber(e.target.value)}
                className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                Thana / Upazila
              </label>
              <input
                type="text"
                value={thana}
                onChange={(e) => setThana(e.target.value)}
                className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                District
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Khatian, Plot, and Deed References */}
        <div className="pt-4 border-t border-[#D6DEE7]">
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-[#087F79]" />
            <span>3. Record Particulars & Dimensions</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                Khatian Survey Type
              </label>
              <select
                value={khatianType}
                onChange={(e) => setKhatianType(e.target.value as KhatianType)}
                className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
              >
                <option value="RS">RS (Revisional Survey)</option>
                <option value="CS">CS (Cadastral Survey)</option>
                <option value="SA">SA (State Acquisition)</option>
                <option value="BS">BS / City Survey</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                Khatian Number
              </label>
              <input
                type="text"
                value={khatianNumber}
                onChange={(e) => setKhatianNumber(e.target.value)}
                placeholder="e.g. 712"
                className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                Dag / Plot Number
              </label>
              <input
                type="text"
                value={dagPlotNumber}
                onChange={(e) => setDagPlotNumber(e.target.value)}
                placeholder="e.g. 3902"
                className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                Land Dimension & Unit
              </label>
              <div className="flex gap-1">
                <input
                  type="number"
                  step="0.01"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="15.5"
                  className="w-2/3 p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-mono"
                />
                <select
                  value={landUnit}
                  onChange={(e) => setLandUnit(e.target.value as LandUnit)}
                  className="w-1/3 p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
                >
                  <option value="decimal">Dec</option>
                  <option value="acre">Acre</option>
                  <option value="katha">Katha</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                Deed Number
              </label>
              <input
                type="text"
                value={deedNumber}
                onChange={(e) => setDeedNumber(e.target.value)}
                placeholder="e.g. 2011/1998"
                className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638] font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                Sub-Registry Office
              </label>
              <input
                type="text"
                value={subRegistryOffice}
                onChange={(e) => setSubRegistryOffice(e.target.value)}
                className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172638] mb-1">
                Registration Date
              </label>
              <input
                type="date"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
                className="w-full p-2 bg-[#F4F7FA] border border-[#D6DEE7] rounded-lg text-[#172638]"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Recorded Parties */}
        <div className="pt-4 border-t border-[#D6DEE7]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider">
              4. Recorded Title Parties
            </h2>
            <button
              type="button"
              onClick={handleAddParty}
              className="text-xs font-semibold text-[#087F79] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Party</span>
            </button>
          </div>

          <div className="space-y-3">
            {parties.map((p, idx) => (
              <div key={p.id} className="p-3.5 rounded-lg border border-[#D6DEE7] bg-[#F4F7FA] relative">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-[#526174] uppercase font-semibold mb-1">
                      Party Full Name
                    </label>
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => handlePartyChange(p.id, 'name', e.target.value)}
                      placeholder="e.g. Mohammad Faruk Hossain"
                      className="w-full p-2 bg-white border border-[#D6DEE7] rounded text-[#172638]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#526174] uppercase font-semibold mb-1">
                      Father/Husband Name
                    </label>
                    <input
                      type="text"
                      value={p.fatherOrHusbandName}
                      onChange={(e) => handlePartyChange(p.id, 'fatherOrHusbandName', e.target.value)}
                      placeholder="e.g. Late Nurul Hossain"
                      className="w-full p-2 bg-white border border-[#D6DEE7] rounded text-[#172638]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#526174] uppercase font-semibold mb-1">
                      Recorded Share
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={p.share}
                        onChange={(e) => handlePartyChange(p.id, 'share', e.target.value)}
                        placeholder="1.00 (100%)"
                        className="w-full p-2 bg-white border border-[#D6DEE7] rounded text-[#172638] font-mono"
                      />
                      {parties.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveParty(p.id)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Attached Documents */}
        <div className="pt-4 border-t border-[#D6DEE7]">
          <h2 className="text-xs font-bold text-[#14263A] uppercase tracking-wider mb-2">
            5. Attached Source Records ({documents.length})
          </h2>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="p-3 bg-[#F4F7FA] rounded-lg border border-[#D6DEE7] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-[#087F79]" />
                  <div>
                    <strong className="text-[#172638] block">{doc.title}</strong>
                    <span className="text-[11px] text-[#526174]">Type: {doc.documentType} &bull; {doc.fileSize} &bull; {doc.pages} pages</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#087F79] bg-[#E6F5F4] px-2 py-0.5 rounded border border-[#087F79]/30">
                  Ready for OCR & Screening
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => handleSaveDraft(false)}
          className="px-5 py-2.5 bg-white hover:bg-[#F4F7FA] text-[#14263A] text-xs font-semibold rounded-lg border border-[#D6DEE7] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4 text-[#087F79]" />
          <span>Save Draft Dossier</span>
        </button>

        <button
          type="button"
          onClick={() => handleSaveDraft(true)}
          className="px-5 py-2.5 bg-[#087F79] hover:bg-[#066661] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>Save and Proceed to Review Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
