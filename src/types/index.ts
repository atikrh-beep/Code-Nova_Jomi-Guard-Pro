export type UserRole = 'officer' | 'senior_officer' | 'auditor';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  office: string;
  avatarUrl?: string;
}

export type CaseStatus = 
  | 'draft' 
  | 'under_review' 
  | 'submitted' 
  | 'returned' 
  | 'approved' 
  | 'issued';

export type KhatianType = 'RS' | 'CS' | 'SA' | 'BS';
export type LandUnit = 'decimal' | 'acre' | 'katha';

export interface RecordedParty {
  id: string;
  name: string;
  fatherOrHusbandName: string;
  share: string; // e.g. "0.50" or "8 Anna"
  nidNumber?: string;
  address?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  documentType: 'RS Khatian' | 'Registered Deed' | 'Mutation Khatian (Namjari)' | 'Land Tax Dakhila' | 'Cadastral Map Trace' | 'CS Khatian';
  documentNumber: string;
  issueDate: string;
  issuingAuthority: string;
  fileSize: string;
  pages: number;
  status: 'processed' | 'pending';
  summary?: string;
}

export type FieldStatus = 'accepted' | 'edited' | 'rejected' | 'pending';

export interface ExtractedField {
  id: string;
  fieldName: string;
  fieldCategory: 'party' | 'khatian_dag' | 'area' | 'deed' | 'mouza';
  sourceDocumentId: string;
  sourceDocumentTitle: string;
  extractedValue: string;
  normalizedValue: string;
  confidence: number; // 0-100
  status: FieldStatus;
  officerComment?: string;
}

export type DiscrepancyLabel = 
  | 'Data mismatch detected'
  | 'Information missing'
  | 'Further verification recommended'
  | 'No discrepancy detected in the fields checked';

export interface DiscrepancyItem {
  id: string;
  title: string;
  category: 'party_name' | 'land_area' | 'khatian_dag' | 'mutation_record' | 'registration_date';
  label: DiscrepancyLabel;
  description: string;
  sourceA: {
    documentTitle: string;
    field: string;
    value: string;
  };
  sourceB?: {
    documentTitle: string;
    field: string;
    value: string;
  };
  officerAssessment?: string;
  recommendation: string;
  status: 'open' | 'addressed' | 'deferred';
}

export interface FindingItem {
  id: string;
  caseId: string;
  title: string;
  category: 'Ownership Chain' | 'Cadastral Boundary' | 'Mutation Record' | 'Area Computation' | 'Registration Validity';
  description: string;
  sourceReference: string;
  fieldExamined: string;
  evidenceReference: string;
  officerAssessment: string;
  recommendation: string;
  status: 'draft' | 'verified' | 'flagged';
  createdAt: string;
}

export interface ReportItem {
  reportReference: string; // e.g. "JGP-RPT-2026-0842"
  caseId: string;
  caseReference: string;
  caseTitle: string;
  mouza: string;
  jlNumber: string;
  thana: string;
  district: string;
  issueDate: string;
  scopeOfReview: string;
  sourcesExamined: string[];
  fieldsCheckedCount: number;
  discrepanciesCount: number;
  findingsCount: number;
  status: 'draft' | 'under_review' | 'approved' | 'issued';
  integrityHash: string; // SHA-256 verifiable hash
  issuedByOfficer: string;
  approvedBySenior: string;
  publicVerificationCode: string;
}

export interface LandCase {
  id: string;
  reference: string; // e.g. "JGP-CS-2026-0142"
  title: string;
  purpose: string;
  mouza: string;
  jlNumber: string;
  thana: string;
  district: string;
  khatianType: KhatianType;
  khatianNumber: string;
  dagPlotNumber: string;
  deedNumber: string;
  subRegistryOffice: string;
  registrationDate: string;
  parties: RecordedParty[];
  landArea: number;
  landUnit: LandUnit;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  assignedOfficerId: string;
  assignedOfficerName: string;
  reviewNotes?: string;
  returnReason?: string;
  additionalEvidenceNote?: string;
  seniorDecisionNote?: string;
  documents: DocumentItem[];
  extractedFields: ExtractedField[];
  discrepancies: DiscrepancyItem[];
  findings: FindingItem[];
  report?: ReportItem;
}

export type EventType = 
  | 'case_created' 
  | 'draft_saved' 
  | 'screening_submitted' 
  | 'review_notes_added' 
  | 'record_accepted' 
  | 'record_edited'
  | 'record_rejected'
  | 'discrepancy_flagged' 
  | 'finding_added' 
  | 'returned_for_correction' 
  | 'evidence_requested' 
  | 'approval_granted' 
  | 'report_issued' 
  | 'integrity_verified';

export interface AuditEvent {
  id: string;
  timestamp: string;
  eventType: EventType;
  eventTitle: string;
  eventDetails: string;
  actorName: string;
  actorRole: UserRole;
  caseReference: string;
  statusOutcome?: string;
  metadata?: Record<string, string | number | boolean>;
}

export type NavTab = 
  | 'dashboard' 
  | 'cases' 
  | 'new_intake' 
  | 'review_workspace' 
  | 'findings' 
  | 'reports' 
  | 'audit_trail' 
  | 'system_guide' 
  | 'profile';
