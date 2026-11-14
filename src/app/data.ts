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
  location: string;
  tickets: number;
  priority: Priority;
  status: Status;
  team: string;
  sla: string;
  slaTone: "safe" | "warning" | "danger";
}

export const tickets: Ticket[] = [
  {
    id: "TKT-1024",
    issue: "Ceiling leaking",
    location: "Tower A / Floor 12",
    category: "Water",
    priority: "High",
    status: "Under Review",
    created: "18 min ago",
    incident: "INC-024",
  },
  {
    id: "TKT-1025",
    issue: "Wet wall near service duct",
    location: "Tower A / Floor 12",
    category: "Water",
    priority: "Medium",
    status: "Under Review",
    created: "31 min ago",
    incident: "INC-024",
  },
  {
    id: "TKT-1026",
    issue: "Water on corridor",
    location: "Tower A / Floor 12",
    category: "Water",
    priority: "High",
    status: "Under Review",
    created: "42 min ago",
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
];

export const incidents: Incident[] = [
  {
    id: "INC-024",
    title: "Water leak affecting multiple units",
    location: "Tower A / Floor 12",
    tickets: 3,
    priority: "Critical",
    status: "Pending Approval",
    team: "Technical — Plumbing",
    sla: "1h 42m left",
    slaTone: "warning",
  },
  {
    id: "INC-025",
    title: "Elevator Failure",
    location: "Tower B",
    tickets: 2,
    priority: "Critical",
    status: "Assigned",
    team: "Vertical Transport",
    sla: "28m left",
    slaTone: "danger",
  },
  {
    id: "INC-026",
    title: "Electrical Issue",
    location: "Tower A / Floor 8",
    tickets: 2,
    priority: "High",
    status: "In Progress",
    team: "Electrical",
    sla: "3h 15m left",
    slaTone: "safe",
  },
  {
    id: "INC-027",
    title: "HVAC Temperature Alert",
    location: "Tower C / Floor 6",
    tickets: 4,
    priority: "Medium",
    status: "Pending Approval",
    team: "Technical — HVAC",
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
