export type Priority = "Critical" | "High" | "Medium" | "Low";
export type Status =
  | "Open"
  | "Pending Approval"
  | "Assigned"
  | "In Progress"
  | "Under Review"
  | "Resolved";

export interface Ticket {
  id: string;
  issue: string;
  location: string;
  category: string;
  priority: Priority;
  status: Status;
  created: string;
  incident?: string;
}

export interface Incident {
  id: string;
  title: string;
  officialLocation: string;
  correlatedAffectedArea?: string;
  tickets: number;
  priority: Priority;
  status: Status;
  currentTeam: string;
  recommendedTeam: string;
  sla: string;
  slaTone: "safe" | "warning" | "danger";
}

export type TaskStatus = "Assigned" | "In Progress" | "Resolved" | "Needs Follow-up";
export type ResolutionStatus = "Resolved" | "Unable to resolve" | "Requires follow-up";
export type AffectedAreaConfirmation = "Yes" | "No" | "Needs further inspection";

export interface TechnicianTask {
  id: string;
  sourceTicketId: string;
  incidentId: string;
  incidentTitle: string;
  title: string;
  location: string;
  assignedTeam: string;
  status: TaskStatus;
  priority: Priority;
  assignmentSource: "BQL";
  sla: string;
  startedAt?: string;
  resolvedAt?: string;
  resolutionStatus?: ResolutionStatus;
  resolutionNote?: string;
  finding?: string;
  affectedAreaConfirmed?: AffectedAreaConfirmation;
  escalationReason?: string;
}

export type ResidentStatus =
  | "Report received"
  | "Being reviewed"
  | "Maintenance team assigned"
  | "Maintenance team is working on it"
  | "Resolution is being reviewed"
  | "Issue resolved"
  | "Follow-up required"
  | "More information needed"
  | "Additional safety review required";

export interface ResidentTimelineEvent {
  label: string;
  timestamp: string;
}

export interface ResidentTicketView {
  ticketId: string;
  issue: string;
  location: string;
  additionalDetails?: string;
  photoName?: string;
  residentStatus: ResidentStatus;
  relatedIncident: boolean;
  relatedIncidentMessage?: string;
  timeline: ResidentTimelineEvent[];
  clarificationAnswer?: string;
  resolutionSummary?: string;
  feedback?: "Resolved" | "Still happening";
}

export const tickets: Ticket[] = [
  {
    id: "TKT-1024",
    issue: "Water is leaking from the kitchen ceiling",
    location: "Tower A / Unit A-1204",
    category: "Plumbing",
    priority: "High",
    status: "Under Review",
    created: "14:03",
    incident: "INC-024",
  },
  {
    id: "TKT-1025",
    issue: "Water is dripping into the hallway",
    location: "Tower A / Unit A-1206",
    category: "Plumbing",
    priority: "Medium",
    status: "Under Review",
    created: "14:08",
    incident: "INC-024",
  },
  {
    id: "TKT-1026",
    issue: "Ceiling is wet with active dripping",
    location: "Tower A / Unit A-1302",
    category: "Plumbing",
    priority: "High",
    status: "Under Review",
    created: "14:12",
    incident: "INC-024",
  },
  {
    id: "TKT-1027",
    issue: "Elevator doors not opening",
    location: "Tower B / Lobby",
    category: "Elevator",
    priority: "Critical",
    status: "Assigned",
    created: "1 hr ago",
    incident: "INC-025",
  },
  {
    id: "TKT-1028",
    issue: "Power outlet sparking",
    location: "Tower A / Unit 08-14",
    category: "Electrical",
    priority: "High",
    status: "Open",
    created: "2 hrs ago",
  },
  {
    id: "TKT-1029",
    issue: "Water marks spreading across the bedroom ceiling",
    location: "Tower A / Unit A-1306",
    category: "Plumbing",
    priority: "High",
    status: "Under Review",
    created: "14:13",
    incident: "INC-024",
  },
  {
    id: "TKT-1030",
    issue: "Active dripping near the service riser",
    location: "Tower A / Unit A-1402",
    category: "Plumbing",
    priority: "High",
    status: "Under Review",
    created: "14:14",
    incident: "INC-024",
  },
  {
    id: "TKT-1031",
    issue: "Water visible outside the utility closet",
    location: "Tower A / Unit A-1404",
    category: "Plumbing",
    priority: "Medium",
    status: "Under Review",
    created: "14:15",
    incident: "INC-024",
  },
];

export const incidents: Incident[] = [
  {
    id: "INC-024",
    title: "Water leak affecting multiple units",
    officialLocation: "Tower A / Floor 12",
    correlatedAffectedArea: "Tower A / Floors 12–14",
    tickets: 6,
    priority: "Critical",
    status: "Pending Approval",
    currentTeam: "Technical — Plumbing",
    recommendedTeam: "Technical — Plumbing",
    sla: "1h 42m left",
    slaTone: "warning",
  },
  {
    id: "INC-025",
    title: "Elevator Failure",
    officialLocation: "Tower B",
    tickets: 2,
    priority: "Critical",
    status: "Assigned",
    currentTeam: "Vertical Transport",
    recommendedTeam: "Vertical Transport",
    sla: "28m left",
    slaTone: "danger",
  },
  {
    id: "INC-026",
    title: "Electrical Issue",
    officialLocation: "Tower A / Floor 8",
    tickets: 2,
    priority: "High",
    status: "In Progress",
    currentTeam: "Electrical",
    recommendedTeam: "Technical — Electrical",
    sla: "3h 15m left",
    slaTone: "safe",
  },
  {
    id: "INC-027",
    title: "HVAC Temperature Alert",
    officialLocation: "Tower C / Floor 6",
    tickets: 4,
    priority: "Medium",
    status: "Pending Approval",
    currentTeam: "Technical — HVAC",
    recommendedTeam: "Technical — HVAC",
    sla: "5h 08m left",
    slaTone: "safe",
  },
];

export const tasks: TechnicianTask[] = [
  {
    id: "TASK-102",
    sourceTicketId: "TKT-1024",
    incidentId: "INC-024",
    incidentTitle: "Water leak affecting multiple units",
    title: "Investigate active water leak",
    location: "Tower A · Floor 12",
    assignedTeam: "Technical — Plumbing",
    status: "Assigned",
    priority: "Critical",
    assignmentSource: "BQL",
    sla: "At risk · 1h 42m",
  },
  {
    id: "TASK-098",
    sourceTicketId: "TKT-1018",
    incidentId: "INC-026",
    incidentTitle: "Electrical issue",
    title: "Inspect corridor electrical circuit",
    location: "Tower B · Floor 8",
    assignedTeam: "Technical — Electrical",
    status: "In Progress",
    priority: "High",
    assignmentSource: "BQL",
    sla: "On track · 3h 15m",
    startedAt: "Earlier today · prototype state",
  },
  {
    id: "TASK-095",
    sourceTicketId: "TKT-1009",
    incidentId: "INC-021",
    incidentTitle: "Lobby door sensor",
    title: "Test and recalibrate door sensor",
    location: "Tower C · Lobby",
    assignedTeam: "Technical — General Maintenance",
    status: "Assigned",
    priority: "Medium",
    assignmentSource: "BQL",
    sla: "On track · 5h 30m",
  },
];
