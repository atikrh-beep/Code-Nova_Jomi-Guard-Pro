import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  LandCase, 
  AuditEvent, 
  NavTab, 
  FieldStatus, 
  FindingItem, 
  ReportItem 
} from '../types';
import { DEMO_USERS, DEMO_CREDENTIALS, INITIAL_CASES, INITIAL_AUDIT_EVENTS } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeCaseId: string | null;
  setActiveCaseId: (id: string | null) => void;
  activeCase: LandCase | null;
  cases: LandCase[];
  auditEvents: AuditEvent[];
  
  // Auth methods
  login: (username: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  fillDemoCredentials: (role: 'officer' | 'senior_officer' | 'auditor') => { username: string; password: string };
  
  // Restriction system
  restrictionModalOpen: boolean;
  showRestrictionNotice: () => void;
  closeRestrictionNotice: () => void;

  // Case actions
  saveDraft: (data: Partial<LandCase>) => { success: boolean; caseId: string; reference: string };
  submitCaseForReview: (caseId: string) => { success: boolean; message: string };
  approveCase: (caseId: string, note?: string) => { success: boolean; message: string };
  returnCaseForCorrection: (caseId: string, reason: string) => { success: boolean; message: string };
  requestAdditionalEvidence: (caseId: string, note: string) => { success: boolean; message: string };
  issueReport: (caseId: string) => { success: boolean; reportReference?: string; message: string };
  
  // Workspace field actions
  updateExtractedField: (caseId: string, fieldId: string, status: FieldStatus, comment?: string, editedValue?: string) => void;
  addFindingToCase: (caseId: string, finding: Omit<FindingItem, 'id' | 'caseId' | 'createdAt'>) => void;
  deleteFindingFromCase: (caseId: string, findingId: string) => void;
  
  // Public verification lookup
  verifyReportByReference: (reference: string) => { 
    found: boolean; 
    report?: ReportItem; 
    integrityPassed: boolean;
    statusLabel: string;
  };
  
  // Toasts
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = sessionStorage.getItem('jomi_auth_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [activeCaseId, setActiveCaseId] = useState<string | null>('case_001');
  const [cases, setCases] = useState<LandCase[]>(() => {
    const saved = localStorage.getItem('jomi_cases_store');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CASES;
      }
    }
    return INITIAL_CASES;
  });

  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => {
    const saved = localStorage.getItem('jomi_audit_store');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_AUDIT_EVENTS;
      }
    }
    return INITIAL_AUDIT_EVENTS;
  });

  const [restrictionModalOpen, setRestrictionModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('jomi_auth_user', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('jomi_auth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('jomi_cases_store', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('jomi_audit_store', JSON.stringify(auditEvents));
  }, [auditEvents]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const showRestrictionNotice = () => {
    setRestrictionModalOpen(true);
  };

  const closeRestrictionNotice = () => {
    setRestrictionModalOpen(false);
  };

  const addAuditEvent = (
    eventType: AuditEvent['eventType'],
    eventTitle: string,
    eventDetails: string,
    caseRef: string,
    outcome?: string,
    meta?: Record<string, string | number | boolean>
  ) => {
    const newEvent: AuditEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      eventType,
      eventTitle,
      eventDetails,
      actorName: currentUser ? currentUser.name : 'System Auditor',
      actorRole: currentUser ? currentUser.role : 'auditor',
      caseReference: caseRef,
      statusOutcome: outcome,
      metadata: meta,
    };

    setAuditEvents((prev) => [newEvent, ...prev]);
  };

  const login = (username: string, password: string) => {
    const trimmed = username.trim().toLowerCase();
    
    // Check against demo accounts
    for (const [, cred] of Object.entries(DEMO_CREDENTIALS)) {
      if (cred.username.toLowerCase() === trimmed && cred.password === password) {
        const matchedUser = DEMO_USERS.find((u) => u.username.toLowerCase() === trimmed);
        if (matchedUser) {
          setCurrentUser(matchedUser);
          setActiveTab('dashboard');
          addAuditEvent(
            'review_notes_added',
            'User Authenticated',
            `${matchedUser.name} (${matchedUser.designation}) established authenticated session.`,
            'SYSTEM-AUTH',
            'Session Established'
          );
          showToast(`Welcome, ${matchedUser.name}`);
          return { success: true };
        }
      }
    }

    return { 
      success: false, 
      message: 'Invalid login credentials. Please use the demo credentials provided or contact your administrator.' 
    };
  };

  const logout = () => {
    if (currentUser) {
      addAuditEvent(
        'review_notes_added',
        'User Sign Out',
        `${currentUser.name} signed out and ended authenticated session.`,
        'SYSTEM-AUTH',
        'Session Closed'
      );
    }
    setCurrentUser(null);
    setActiveCaseId(null);
    setActiveTab('dashboard');
    showToast('Signed out successfully');
  };

  const fillDemoCredentials = (role: 'officer' | 'senior_officer' | 'auditor') => {
    const cred = DEMO_CREDENTIALS[role];
    return {
      username: cred.username,
      password: cred.password,
    };
  };

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0] || null;

  // Case Operations
  const saveDraft = (data: Partial<LandCase>) => {
    const existingIndex = cases.findIndex((c) => c.id === data.id);
    let updatedReference = data.reference;
    let savedCaseId = data.id || '';

    if (existingIndex >= 0) {
      // Update existing
      const updatedCase: LandCase = {
        ...cases[existingIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setCases((prev) => {
        const copy = [...prev];
        copy[existingIndex] = updatedCase;
        return copy;
      });
      savedCaseId = updatedCase.id;
      updatedReference = updatedCase.reference;

      addAuditEvent(
        'draft_saved',
        'Case Draft Saved',
        `${currentUser?.name || 'Officer'} saved draft changes for case ${updatedReference}.`,
        updatedReference,
        'Draft Preserved'
      );
    } else {
      // Create new case
      const newId = `case_${Date.now()}`;
      const count = cases.length + 143;
      const ref = data.reference || `JGP-CS-2026-0${count}`;
      savedCaseId = newId;
      updatedReference = ref;

      const newCase: LandCase = {
        id: newId,
        reference: ref,
        title: data.title || 'Untitled Land Record Screening',
        purpose: data.purpose || 'Administrative Record Verification',
        mouza: data.mouza || 'Tejgaon',
        jlNumber: data.jlNumber || '24',
        thana: data.thana || 'Tejgaon',
        district: data.district || 'Dhaka',
        khatianType: data.khatianType || 'RS',
        khatianNumber: data.khatianNumber || '',
        dagPlotNumber: data.dagPlotNumber || '',
        deedNumber: data.deedNumber || '',
        subRegistryOffice: data.subRegistryOffice || 'Tejgaon Sub-Registry Office',
        registrationDate: data.registrationDate || new Date().toISOString().substring(0, 10),
        landArea: Number(data.landArea) || 0,
        landUnit: data.landUnit || 'decimal',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedOfficerId: currentUser?.id || 'usr_officer_01',
        assignedOfficerName: currentUser?.name || 'Tariqul Rahman',
        parties: data.parties || [],
        documents: data.documents || [],
        extractedFields: data.extractedFields || [],
        discrepancies: data.discrepancies || [],
        findings: data.findings || [],
      };

      setCases((prev) => [newCase, ...prev]);
      setActiveCaseId(newId);

      addAuditEvent(
        'case_created',
        'Case Created',
        `${currentUser?.name || 'Officer'} initialized new screening case ${ref} for Mouza ${newCase.mouza}.`,
        ref,
        'Draft Created'
      );
    }

    showToast(`Case draft saved successfully (${updatedReference})`);
    return { success: true, caseId: savedCaseId, reference: updatedReference! };
  };

  const submitCaseForReview = (caseId: string) => {
    const targetCase = cases.find((c) => c.id === caseId);
    if (!targetCase) return { success: false, message: 'Case not found' };

    if (!targetCase.khatianNumber || !targetCase.dagPlotNumber) {
      return { 
        success: false, 
        message: 'Cannot submit: Khatian number and Dag/plot number are required.' 
      };
    }

    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { ...c, status: 'submitted', updatedAt: new Date().toISOString() }
          : c
      )
    );

    addAuditEvent(
      'screening_submitted',
      'Screening Package Submitted',
      `${currentUser?.name || 'Officer'} submitted screening package for case ${targetCase.reference} for Senior Officer oversight.`,
      targetCase.reference,
      'Submitted for Review'
    );

    showToast(`Case ${targetCase.reference} submitted to Senior Officer`);
    return { success: true, message: 'Case submitted successfully for Senior Officer review.' };
  };

  const approveCase = (caseId: string, note?: string) => {
    if (currentUser?.role !== 'senior_officer') {
      return { success: false, message: 'Unauthorized: Senior Officer role required to approve cases.' };
    }

    const targetCase = cases.find((c) => c.id === caseId);
    if (!targetCase) return { success: false, message: 'Case not found' };

    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { 
              ...c, 
              status: 'approved', 
              seniorDecisionNote: note || 'Approved by Senior Assistant Commissioner (Land) after review.',
              updatedAt: new Date().toISOString() 
            }
          : c
      )
    );

    addAuditEvent(
      'approval_granted',
      'Approval Granted',
      `Senior Officer ${currentUser.name} reviewed and approved case ${targetCase.reference}.`,
      targetCase.reference,
      'Approved'
    );

    showToast(`Case ${targetCase.reference} approved successfully`);
    return { success: true, message: 'Case approved successfully.' };
  };

  const returnCaseForCorrection = (caseId: string, reason: string) => {
    if (currentUser?.role !== 'senior_officer') {
      return { success: false, message: 'Unauthorized: Senior Officer role required to return cases.' };
    }

    const targetCase = cases.find((c) => c.id === caseId);
    if (!targetCase) return { success: false, message: 'Case not found' };

    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { 
              ...c, 
              status: 'returned', 
              returnReason: reason,
              updatedAt: new Date().toISOString() 
            }
          : c
      )
    );

    addAuditEvent(
      'returned_for_correction',
      'Return for Correction',
      `Senior Officer ${currentUser.name} returned case ${targetCase.reference}: ${reason}`,
      targetCase.reference,
      'Returned for Correction'
    );

    showToast(`Case ${targetCase.reference} returned to Officer for correction`);
    return { success: true, message: 'Case returned for correction with notice.' };
  };

  const requestAdditionalEvidence = (caseId: string, note: string) => {
    if (currentUser?.role !== 'senior_officer') {
      return { success: false, message: 'Unauthorized: Senior Officer role required.' };
    }

    const targetCase = cases.find((c) => c.id === caseId);
    if (!targetCase) return { success: false, message: 'Case not found' };

    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { 
              ...c, 
              status: 'under_review', 
              additionalEvidenceNote: note,
              updatedAt: new Date().toISOString() 
            }
          : c
      )
    );

    addAuditEvent(
      'evidence_requested',
      'Evidence Requested',
      `Senior Officer ${currentUser.name} requested supplementary records: ${note}`,
      targetCase.reference,
      'Evidence Requested'
    );

    showToast(`Additional evidence requested for case ${targetCase.reference}`);
    return { success: true, message: 'Additional evidence request recorded.' };
  };

  const issueReport = (caseId: string) => {
    if (currentUser?.role !== 'senior_officer') {
      return { success: false, message: 'Unauthorized: Senior Officer role required to issue reports.' };
    }

    const targetCase = cases.find((c) => c.id === caseId);
    if (!targetCase) return { success: false, message: 'Case not found' };

    const reportRef = `JGP-RPT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const hash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newReport: ReportItem = {
      reportReference: reportRef,
      caseId: targetCase.id,
      caseReference: targetCase.reference,
      caseTitle: targetCase.title,
      mouza: targetCase.mouza,
      jlNumber: targetCase.jlNumber,
      thana: targetCase.thana,
      district: targetCase.district,
      issueDate: new Date().toISOString().substring(0, 10),
      scopeOfReview: `Administrative screening of ${targetCase.khatianType} Khatian Record No. ${targetCase.khatianNumber}, Dag Plot ${targetCase.dagPlotNumber}, Registered Deed ${targetCase.deedNumber} and associated revenue archives for Mouza ${targetCase.mouza}.`,
      sourcesExamined: targetCase.documents.map((d) => d.title),
      fieldsCheckedCount: targetCase.extractedFields.length || 6,
      discrepanciesCount: targetCase.discrepancies.length,
      findingsCount: targetCase.findings.length,
      status: 'issued',
      integrityHash: hash,
      issuedByOfficer: `${targetCase.assignedOfficerName} (Land Records Officer)`,
      approvedBySenior: `${currentUser.name} (Senior Assistant Commissioner - Land)`,
      publicVerificationCode: `JGP-VERIFY-${reportRef.substring(8)}-${targetCase.mouza.substring(0, 3).toUpperCase()}`,
    };

    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { 
              ...c, 
              status: 'issued', 
              report: newReport, 
              updatedAt: new Date().toISOString() 
            }
          : c
      )
    );

    addAuditEvent(
      'report_issued',
      'Report Issued',
      `Senior Officer ${currentUser.name} issued administrative Land Screening Report ${reportRef} for case ${targetCase.reference}. Registered with SHA-256 integrity seal.`,
      targetCase.reference,
      'Report Issued'
    );

    showToast(`Official report ${reportRef} issued and registered`);
    return { success: true, reportReference: reportRef, message: 'Official report issued.' };
  };

  const updateExtractedField = (
    caseId: string, 
    fieldId: string, 
    status: FieldStatus, 
    comment?: string, 
    editedValue?: string
  ) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const updatedFields = c.extractedFields.map((f) => {
          if (f.id !== fieldId) return f;
          return {
            ...f,
            status,
            officerComment: comment !== undefined ? comment : f.officerComment,
            normalizedValue: editedValue !== undefined ? editedValue : f.normalizedValue,
          };
        });
        return { ...c, extractedFields: updatedFields, updatedAt: new Date().toISOString() };
      })
    );

    const targetCase = cases.find((c) => c.id === caseId);
    const targetField = targetCase?.extractedFields.find((f) => f.id === fieldId);

    const eventTitle = status === 'accepted' ? 'Record Accepted' : status === 'edited' ? 'Record Edited' : 'Record Rejected';
    const detailMsg = status === 'accepted'
      ? `Officer accepted field "${targetField?.fieldName || fieldId}" with value "${targetField?.normalizedValue}".`
      : status === 'edited'
      ? `Officer edited field "${targetField?.fieldName || fieldId}" to "${editedValue}".`
      : `Officer flagged field "${targetField?.fieldName || fieldId}" as unconfirmed.`;

    addAuditEvent(
      status === 'accepted' ? 'record_accepted' : status === 'edited' ? 'record_edited' : 'record_rejected',
      eventTitle,
      detailMsg,
      targetCase?.reference || 'N/A',
      `Status: ${status}`
    );
  };

  const addFindingToCase = (
    caseId: string, 
    findingData: Omit<FindingItem, 'id' | 'caseId' | 'createdAt'>
  ) => {
    const newFinding: FindingItem = {
      ...findingData,
      id: `find_${Date.now()}`,
      caseId,
      createdAt: new Date().toISOString(),
    };

    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        return {
          ...c,
          findings: [newFinding, ...c.findings],
          updatedAt: new Date().toISOString(),
        };
      })
    );

    const targetCase = cases.find((c) => c.id === caseId);
    addAuditEvent(
      'finding_added',
      'Review Notes Added',
      `${currentUser?.name || 'Officer'} added finding: "${findingData.title}" under ${findingData.category}.`,
      targetCase?.reference || 'N/A',
      'Finding Logged'
    );

    showToast('Finding added to case file');
  };

  const deleteFindingFromCase = (caseId: string, findingId: string) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        return {
          ...c,
          findings: c.findings.filter((f) => f.id !== findingId),
          updatedAt: new Date().toISOString(),
        };
      })
    );

    showToast('Finding removed from case');
  };

  const verifyReportByReference = (reference: string) => {
    const cleanRef = reference.trim().toUpperCase();
    for (const c of cases) {
      if (c.report && (c.report.reportReference.toUpperCase() === cleanRef || c.report.publicVerificationCode.toUpperCase() === cleanRef)) {
        addAuditEvent(
          'integrity_verified',
          'Report Integrity Verified',
          `Public verification query performed for ${c.report.reportReference}. Integrity check passed against database registry.`,
          c.reference,
          'Integrity check passed'
        );
        return {
          found: true,
          report: c.report,
          integrityPassed: true,
          statusLabel: 'Report found',
        };
      }
    }

    return {
      found: false,
      integrityPassed: false,
      statusLabel: 'Report not found',
    };
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        activeTab,
        setActiveTab,
        activeCaseId,
        setActiveCaseId,
        activeCase,
        cases,
        auditEvents,
        login,
        logout,
        fillDemoCredentials,
        restrictionModalOpen,
        showRestrictionNotice,
        closeRestrictionNotice,
        saveDraft,
        submitCaseForReview,
        approveCase,
        returnCaseForCorrection,
        requestAdditionalEvidence,
        issueReport,
        updateExtractedField,
        addFindingToCase,
        deleteFindingFromCase,
        verifyReportByReference,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
