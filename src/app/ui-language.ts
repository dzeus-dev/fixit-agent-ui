import type {
  Priority,
  ResidentStatus,
  ResolutionStatus,
  Status,
  TaskStatus,
} from "./data";

export type UiRole = "bql" | "technician" | "resident";
export type StatusContext = "incident" | "ticket";
export type SlaState = "On track" | "At risk" | "Breached";

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
  statuses: {
    Open: "Mới tiếp nhận",
    "Pending Approval": "Chờ BQL phê duyệt",
    Assigned: "Đã phân công",
    "In Progress": "Đang xử lý",
    "Resolution Review": "Chờ BQL xác nhận",
    "Under Review": "Đang xem xét",
    Resolved: "Đã xử lý",
  } satisfies Record<Status, string>,
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
