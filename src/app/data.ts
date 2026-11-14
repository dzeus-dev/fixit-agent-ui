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

export const tasks = [
  {
    id: "TASK-102",
    incident: "Water Leakage",
    incidentId: "INC-024",
    location: "Tower A / Floor 12",
    priority: "High" as Priority,
    status: "Assigned" as Status,
    issue: "Inspect the service riser and isolate the source of the active leak.",
  },
  {
    id: "TASK-098",
    incident: "Electrical Issue",
    incidentId: "INC-026",
    location: "Tower B / Floor 8",
    priority: "High" as Priority,
    status: "In Progress" as Status,
    issue: "Inspect breaker panel and affected corridor fixtures.",
  },
  {
    id: "TASK-095",
    incident: "Lobby Door Sensor",
    incidentId: "INC-021",
    location: "Tower C / Lobby",
    priority: "Medium" as Priority,
    status: "Assigned" as Status,
    issue: "Test and recalibrate the automatic door sensor.",
  },
];
