import type {
  AffectedAreaConfirmation,
  Priority,
  ResidentStatus,
  ResolutionStatus,
  Status,
  TaskStatus,
} from "./data";

export type UiRole = "bql" | "technician" | "resident";
export type StatusContext = "incident" | "ticket";
export type SlaState = "On track" | "At risk" | "Breached";
export type CorrelationStatus = "Linked" | "Candidate" | "Excluded";
export type AssessmentLevel = "High" | "Medium" | "Low";

export const uiLabels = {
  organization: "Ban Quản lý (BQL)",
  terminology: {
    ticket: "Phản ánh",
    incident: "Sự cố",
    assignment: "Phân công",
    routing: "Điều phối",
    correlation: "Liên kết phản ánh",
    relatedReports: "Các phản ánh liên quan",
    technician: "Nhân viên kỹ thuật",
    maintenanceTeam: "Đội kỹ thuật",
    resident: "Cư dân",
    bql: "BQL",
    aiUnderstanding: "AI phân tích",
    aiRecommendation: "Đề xuất của AI",
    systemVerification: "Kiểm tra điều kiện hệ thống",
    systemRecord: "Ghi nhận của hệ thống",
    humanDecision: "Quyết định của BQL",
    priority: "Mức độ ưu tiên",
    risk: "Rủi ro",
    affectedArea: "Phạm vi ảnh hưởng",
    officialLocation: "Vị trí ghi nhận",
    resolution: "Kết quả xử lý",
    followUp: "Cần xử lý tiếp",
    approval: "Phê duyệt",
    sla: "SLA",
  },
  roles: {
    bql: "BQL",
    bqlIntro: "Ban Quản lý (BQL)",
    technician: "Nhân viên kỹ thuật",
    resident: "Cư dân",
  } satisfies Record<UiRole, string> & { bqlIntro: string },
  navigation: {
    overview: "Tổng quan",
    dashboard: "Bảng điều khiển",
    operations: "Vận hành",
    tickets: "Phản ánh",
    incidents: "Sự cố",
    system: "Hệ thống",
    notifications: "Thông báo",
    soon: "Sắp có",
    settings: "Cài đặt",
    workspace: "Không gian làm việc",
    tasks: "Công việc của tôi",
    residentPortal: "Cổng cư dân",
    reports: "Phản ánh của tôi",
    trackReport: "Theo dõi phản ánh",
    switchWorkspace: "Chuyển không gian làm việc",
    closeNavigation: "Đóng menu",
    residentSearch: "Tìm phản ánh của bạn...",
    sharedSearch: "Tìm sự cố, phản ánh...",
  },
  titles: {
    operationsDashboard: "Tổng quan vận hành",
    residentTickets: "Phản ánh của cư dân",
    incidentQueue: "Danh sách sự cố",
    tasks: "Công việc của tôi",
    report: "Gửi phản ánh",
    correlationReview: "Xem xét liên kết phản ánh",
    routingRecommendation: "Đề xuất điều phối",
    approvalReview: "Xem xét phê duyệt",
    incidentDetail: "Chi tiết sự cố",
    taskDetail: "Chi tiết công việc",
    reportStatus: "Trạng thái phản ánh",
  },
  priorities: {
    Critical: "Khẩn cấp",
    High: "Cao",
    Medium: "Trung bình",
    Low: "Thấp",
  } satisfies Record<Priority, string>,
  assessmentLevels: {
    High: "Cao",
    Medium: "Trung bình",
    Low: "Thấp",
  } satisfies Record<AssessmentLevel, string>,
  correlationStatuses: {
    Linked: "Đã liên kết",
    Candidate: "Đề xuất liên kết",
    Excluded: "Không liên kết",
  } satisfies Record<CorrelationStatus, string>,
  statuses: {
    Open: "Mới tiếp nhận",
    "Pending Approval": "Chờ BQL phê duyệt",
    Assigned: "Đã phân công",
    "In Progress": "Đang xử lý",
    "Resolution Review": "Chờ BQL xác nhận",
    "Under Review": "Đang xem xét",
    Resolved: "Đã xử lý",
  } satisfies Record<Status, string>,
  affectedAreaConfirmations: {
    Yes: "Có",
    No: "Không",
    "Needs further inspection": "Cần kiểm tra thêm",
  } satisfies Record<AffectedAreaConfirmation, string>,
  taskStatuses: {
    Assigned: "Đã phân công",
    "In Progress": "Đang thực hiện",
    Resolved: "Đã ghi nhận hoàn tất",
    "Needs Follow-up": "Cần xử lý tiếp",
  } satisfies Record<TaskStatus, string>,
  resolutionStatuses: {
    Resolved: "Đã xử lý",
    "Unable to resolve": "Chưa xử lý được",
    "Requires follow-up": "Cần xử lý tiếp",
  } satisfies Record<ResolutionStatus, string>,
  residentStatuses: {
    "Report received": "Đã nhận phản ánh",
    "Being reviewed": "Phản ánh đang được xem xét",
    "Maintenance team assigned": "Đã sắp xếp nhân viên kỹ thuật",
    "Maintenance team is working on it": "Nhân viên kỹ thuật đang xử lý",
    "Resolution is being reviewed": "BQL đang xem xét kết quả xử lý",
    "Issue resolved": "Đã xử lý xong",
    "Follow-up required": "Cần xử lý thêm",
    "More information needed": "Cần thêm thông tin",
    "Additional safety review required": "Cần kiểm tra an toàn thêm",
  } satisfies Record<ResidentStatus, string>,
  sla: {
    label: "SLA",
    states: {
      "On track": "Đang trong hạn",
      "At risk": "Có nguy cơ trễ hạn",
      Breached: "Quá hạn SLA",
    } satisfies Record<SlaState, string>,
  },
  provenance: {
    "AI-generated": "Do AI đề xuất",
    "AI-generated interpretation": "AI phân tích",
    "AI-extracted": "AI trích xuất",
    "AI + rules": "AI và quy tắc",
    "AI recommendation": "Đề xuất của AI",
    "System record": "Ghi nhận của hệ thống",
    "System verification": "Kiểm tra điều kiện hệ thống",
    "Human decision": "Quyết định của BQL",
    "Human override": "BQL điều chỉnh đề xuất",
    "Human-approved assignment": "Phân công được BQL phê duyệt",
    "BQL-approved assignment": "Phân công được BQL phê duyệt",
    "Technician action": "Nhân viên kỹ thuật ghi nhận",
    "Correlation-derived": "Suy ra từ liên kết phản ánh",
    "Resident-provided information": "Thông tin bạn cung cấp",
    "Local prototype": "Bản mẫu cục bộ",
  } satisfies Record<string, string>,
  bqlDemo: {
    categories: {
      Plumbing: "Cấp thoát nước",
      Elevator: "Thang máy",
      Electrical: "Điện",
      HVAC: "Điều hòa không khí",
      Mechanical: "Cơ khí",
    },
    teams: {
      "Technical — Plumbing": "Đội kỹ thuật — Cấp thoát nước",
      "Vertical Transport": "Đội kỹ thuật — Thang máy",
      Electrical: "Đội kỹ thuật — Điện",
      "Technical — Electrical": "Đội kỹ thuật — Điện",
      "Technical — HVAC": "Đội kỹ thuật — Điều hòa không khí",
      "Technical — General Maintenance": "Đội kỹ thuật — Bảo trì tổng hợp",
      "Building Engineering": "Đội kỹ thuật tòa nhà",
    },
    locations: {
      "Tower A / Unit A-1204": "Tòa A / Căn A-1204",
      "Tower A / Unit A-1206": "Tòa A / Căn A-1206",
      "Tower A / Unit A-1302": "Tòa A / Căn A-1302",
      "Tower A / Unit A-1306": "Tòa A / Căn A-1306",
      "Tower A / Unit A-1402": "Tòa A / Căn A-1402",
      "Tower A / Unit A-1404": "Tòa A / Căn A-1404",
      "Tower A / Unit 08-14": "Tòa A / Căn 08-14",
      "Tower A / Floor 12": "Tòa A / Tầng 12",
      "Tower A / Floors 12–14": "Tòa A / Tầng 12–14",
      "Tower A / Floor 8": "Tòa A / Tầng 8",
      "Tower B": "Tòa B",
      "Tower B / Lobby": "Tòa B / Sảnh",
      "Tower B · Main elevator": "Tòa B · Thang máy chính",
      "Tower C / Floor 6": "Tòa C / Tầng 6",
      "Tower A · Floor 12": "Tòa A · Tầng 12",
      "Tower A · Floor 8": "Tòa A · Tầng 8",
      "Tower C · Floor 6": "Tòa C · Tầng 6",
      "Tower C · Lobby": "Tòa C · Sảnh",
      "Tower A": "Tòa A",
      "Floors 12–14": "Tầng 12–14",
      "Adjacent units / nearby service area": "Các căn hộ liền kề / khu vực kỹ thuật lân cận",
    },
    incidentTitles: {
      "Water leak affecting multiple units": "Rò rỉ nước ảnh hưởng nhiều căn hộ",
      "Elevator Failure": "Sự cố thang máy",
      "Elevator failure": "Sự cố thang máy",
      "Electrical Issue": "Sự cố điện",
      "Electrical issue in common area": "Sự cố điện tại khu vực chung",
      "HVAC Temperature Alert": "Cảnh báo nhiệt độ điều hòa",
      "HVAC temperature alert": "Cảnh báo nhiệt độ điều hòa",
    },
    ticketIssues: {
      "Water is leaking from the kitchen ceiling": "Nước rò rỉ từ trần bếp",
      "Water is dripping into the hallway": "Nước nhỏ giọt xuống hành lang",
      "Ceiling is wet with active dripping": "Trần nhà bị ướt và đang nhỏ giọt",
      "Elevator doors not opening": "Cửa thang máy không mở",
      "Power outlet sparking": "Ổ cắm điện phát tia lửa",
      "Water marks spreading across the bedroom ceiling": "Vết nước loang rộng trên trần phòng ngủ",
      "Active dripping near the service riser": "Nước đang nhỏ giọt gần trục kỹ thuật",
      "Water visible outside the utility closet": "Có thể thấy nước bên ngoài tủ kỹ thuật",
    },
    relativeTimes: {
      "Just now": "Vừa xong",
      "Just now · prototype state": "Vừa xong · trạng thái bản mẫu",
      Now: "Vừa xong",
      "1 hr ago": "1 giờ trước",
      "2 hrs ago": "2 giờ trước",
      "8 min ago": "8 phút trước",
      "24 min ago": "24 phút trước",
    },
    decisionReasons: {
      "Insufficient information": "Chưa đủ thông tin",
      "Wrong category": "Nhóm vấn đề chưa phù hợp",
      "Wrong team recommendation": "Đội được đề xuất chưa phù hợp",
      "Location requires verification": "Cần xác minh vị trí",
      Other: "Lý do khác",
      "BQL approved the recommended routing.": "BQL đã phê duyệt đề xuất điều phối.",
    },
  },
} as const;

const resolvedStatusLabels: Record<StatusContext, string> = {
  ticket: "Đã xử lý",
  incident: "Đã đóng",
};

export function getStatusLabel(status: Status, context: StatusContext) {
  return status === "Resolved" ? resolvedStatusLabels[context] : uiLabels.statuses[status];
}

export function getTaskStatusLabel(status: TaskStatus) {
  return uiLabels.taskStatuses[status];
}

export function getAffectedAreaLabel(value: AffectedAreaConfirmation) {
  return uiLabels.affectedAreaConfirmations[value];
}

export function getResolutionStatusLabel(status: ResolutionStatus) {
  return uiLabels.resolutionStatuses[status];
}

export function getResidentStatusLabel(status: ResidentStatus) {
  return uiLabels.residentStatuses[status];
}

export function getSlaStateLabel(state: SlaState) {
  return uiLabels.sla.states[state];
}

export function formatSlaText(value: string) {
  const localized = value.replace(
    /\b(On track|At risk|Breached)\b/g,
    (state) => uiLabels.sla.states[state as SlaState],
  );

  return localized
    .replace(
      /\b(\d+)\s*h\s*(\d+)\s*m\s*(?:left|remaining)\b/gi,
      (_match, hours: string, minutes: string) =>
        "Còn " + hours + " giờ " + minutes + " phút",
    )
    .replace(/\b(\d+)\s*m\s*(?:left|remaining)\b/gi, (_match, minutes: string) =>
      "Còn " + minutes + " phút",
    )
    .replace(
      /\b(\d+)\s*m\s+over target\b/gi,
      (_match, minutes: string) => "Trễ " + minutes + " phút",
    )
    .replace(/\b(\d+)\s*h\s*(\d+)\s*m\b/gi, (_match, hours: string, minutes: string) =>
      hours + " giờ " + minutes + " phút",
    )
    .replace(/\b(\d+)\s*m\b/gi, (_match, minutes: string) => minutes + " phút");
}

export function getProvenanceLabel(label: string) {
  return uiLabels.provenance[label as keyof typeof uiLabels.provenance] ?? label;
}

export function getAssessmentLevelLabel(level: AssessmentLevel) {
  return uiLabels.assessmentLevels[level];
}

export function getCorrelationStatusLabel(status: CorrelationStatus) {
  return uiLabels.correlationStatuses[status];
}

export function getBqlCategoryLabel(category: string) {
  return uiLabels.bqlDemo.categories[category as keyof typeof uiLabels.bqlDemo.categories] ?? category;
}

export function getBqlTeamLabel(team: string) {
  return uiLabels.bqlDemo.teams[team as keyof typeof uiLabels.bqlDemo.teams] ?? team;
}

export function getBqlLocationLabel(location: string) {
  return uiLabels.bqlDemo.locations[location as keyof typeof uiLabels.bqlDemo.locations] ?? location;
}

export function getBqlIncidentTitle(title: string) {
  return uiLabels.bqlDemo.incidentTitles[title as keyof typeof uiLabels.bqlDemo.incidentTitles] ?? title;
}

export function getBqlTicketIssue(issue: string) {
  return uiLabels.bqlDemo.ticketIssues[issue as keyof typeof uiLabels.bqlDemo.ticketIssues] ?? issue;
}

export function getBqlRelativeTime(time: string) {
  return uiLabels.bqlDemo.relativeTimes[time as keyof typeof uiLabels.bqlDemo.relativeTimes] ?? time;
}

export function getBqlDecisionReasonLabel(reason: string) {
  const changedTeam = reason.match(/^BQL changed the recommended team from (.+) to (.+)\.$/);
  if (changedTeam) {
    return `BQL đã đổi đội được đề xuất từ ${getBqlTeamLabel(changedTeam[1])} thành ${getBqlTeamLabel(changedTeam[2])}.`;
  }

  return uiLabels.bqlDemo.decisionReasons[
    reason as keyof typeof uiLabels.bqlDemo.decisionReasons
  ] ?? reason;
}
