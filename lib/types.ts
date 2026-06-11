export type UserRole =
  | "super_admin"
  | "nodal_officer"
  | "screening_team"
  | "patient";

export type EMROutcome = "normal" | "spectacles" | "teleconsult" | "referral";
export type EMRStatus = "draft" | "submitted" | "approved" | "rejected";
export type CampStatus = "scheduled" | "active" | "completed";
export type CampType =
  | "village"
  | "tribal"
  | "urban_slum"
  | "school"
  | "industrial";
export type SpectacleStatus =
  | "Pending"
  | "Manufacturing"
  | "QA"
  | "Dispatched"
  | "Delivered";
export type TeleconsultStatus =
  | "scheduled"
  | "waiting"
  | "active"
  | "completed"
  | "cancelled";
export type ReferralStatus = "pending" | "verified" | "completed" | "rejected";

export type PatientCampStatus = "Registered" | "EMR Done" | "Submitted";

export interface Patient {
  id: string;
  abhaNumber?: string;
  mobile: string;
  name: string;
  age: number;
  gender: string;
  district: string;
  mandal: string;
  village: string;
  campId?: string;
  status?: PatientCampStatus;
  registeredAt?: string;
}

export interface EMR {
  id: string;
  patientId: string;
  patientName: string;
  campId: string;
  campName: string;
  screeningTeamId: string;
  screeningTeamName?: string;
  district?: string;
  diminishedVisionDistance: boolean;
  diminishedVisionNear: boolean;
  redness: boolean;
  watering: boolean;
  pain: boolean;
  blurredVision: boolean;
  photophobia: boolean;
  flashersFloaters: boolean;
  diplopia: boolean;
  digitalEyeStrain: boolean;
  diabetes: boolean;
  hypertension: boolean;
  thyroid: boolean;
  glaucomaHistory: boolean;
  cataractHistory: boolean;
  ocularTrauma: boolean;
  previousSurgery: boolean;
  existingGlassesPower: string;
  rightEyeUCDVA: string;
  rightEyeBCDVA: string;
  rightEyePH: string;
  leftEyeUCDVA: string;
  leftEyeBCDVA: string;
  leftEyePH: string;
  rightEyeUCNVA: string;
  leftEyeUCNVA: string;
  rightEyeSph: number;
  rightEyeCyl: number;
  rightEyeAxis: number;
  leftEyeSph: number;
  leftEyeCyl: number;
  leftEyeAxis: number;
  addPowerRight: number;
  addPowerLeft: number;
  muscleFunctionTest: string;
  iop: string;
  colorVision: string;
  cupToDiscRatio: string;
  opticDiscPallor: boolean;
  macularEdema: boolean;
  amd: boolean;
  diabeticRetinopathyGrade: string;
  hypertensiveRetinopathyGrade: string;
  outcome: EMROutcome;
  status: EMRStatus;
  nodalOfficerNote?: string;
  createdAt: string;
  submittedAt?: string;
}

export interface Camp {
  id: string;
  name: string;
  type: CampType;
  district: string;
  mandal: string;
  village: string;
  lat: number;
  lng: number;
  scheduledDate: string;
  teamId: string;
  teamName: string;
  nodalOfficerId: string;
  status: CampStatus;
  patientCount: number;
  screenedCount: number;
}

export interface SpectacleOrder {
  id: string;
  patientId: string;
  patientName: string;
  emrId: string;
  district: string;
  vendorId: string;
  vendorName: string;
  orderedAt: string;
  status: SpectacleStatus;
  expectedDelivery: string;
  actualDelivery?: string;
  slaDays: number;
  daysElapsed: number;
  slaBreached: boolean;
  prescription: {
    rightSph: number;
    rightCyl: number;
    rightAxis: number;
    rightAdd: number;
    leftSph: number;
    leftCyl: number;
    leftAxis: number;
    leftAdd: number;
  };
}

export interface TeleconsultSession {
  id: string;
  patientId: string;
  patientName: string;
  emrId: string;
  ophthalmologistName: string;
  status: TeleconsultStatus;
  roomId: string;
  scheduledAt: string;
  clinicalNotes?: string;
  diagnosis?: string;
  followUpRequired?: boolean;
}

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  emrId: string;
  emrDate: string;
  district: string;
  hospital: string;
  department: string;
  condition: string;
  priority: "Critical" | "High" | "Routine";
  status: "Pending" | "Appointment Booked" | "Visited" | "Follow-up";
  appointmentDate?: string;
  daysPending: number;
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  contact: string;
  email: string;
  orders: number;
  delivered: number;
  slaPct: number;
  breaches: number;
  rating: number;
  status: "active" | "inactive" | "suspended";
  onboardedDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  district?: string;
  status: "active" | "inactive";
  lastLogin?: string;
}

export interface AuditLog {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  performedBy: string;
  performedByRole: string;
  timestamp: string;
  ipAddress: string;
  summary: string;
}

export interface AIHotspot {
  district: string;
  burdenScore: number;
  drPrevalence: number;
  cataractRisk: number;
  glaucomaRisk: number;
  refractiveError: number;
  predictedDemand: number;
  riskLevel: "Critical" | "High" | "Moderate" | "Low";
}

export interface ReferralPriority {
  id: string;
  patientName: string;
  district: string;
  condition: string;
  hospital: string;
  priority: "Critical" | "High" | "Routine";
  daysPending: number;
  status: "Pending" | "Appointment Booked" | "Visited" | "Follow-up";
}

export interface ScreeningTeam {
  id: string;
  name: string;
  district: string;
  mandal: string;
  leadName: string;
  members: { name: string; role: string }[];
  assignedCampId?: string;
  assignedCampName?: string;
  patientsScreenedToday: number;
  status: "active" | "idle" | "offline";
}

export interface DistrictKPI {
  district: string;
  screened: number;
  target: number;
  spectacles: number;
  referrals: number;
  slaBreaches: number;
  camps: number;
  lat: number;
  lng: number;
  diseaseBurden: number;
}

export interface StateKPIs {
  totalScreened: number;
  totalSpectacles: number;
  totalReferrals: number;
  slaBreaches: number;
  activeCamps: number;
  completedCamps: number;
  teleconsultSessions: number;
  abhaLinked: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

/** M3 HIU prior health summary for EMR pre-fill (ABDM FHIR parse) */
export interface PriorHealthSummary {
  diabetes: { confirmed: boolean; hba1c?: number; lastTestedAt?: string };
  hypertension: { confirmed: boolean; lastBpReading?: string };
  previousEyeConditions: string[];
  previousSurgeries: string[];
  currentMedications: string[];
  existingSpectaclePrescription?: {
    rightEye: { sph: number; cyl: number; axis: number };
    leftEye: { sph: number; cyl: number; axis: number };
    prescribedAt: string;
    prescribingProvider: string;
  };
  previousVisualAcuity?: {
    rightEye: string;
    leftEye: string;
    measuredAt: string;
  };
}

export interface ABHAProfile {
  abhaNumber: string;
  abhaAddress: string;
  name: string;
  dob: string;
  gender: string;
  mobile: string;
  address?: string;
}
