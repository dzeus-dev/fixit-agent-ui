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
export type ResolutionLabelContext = "bql" | "technician";
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
    tasks: "Công việc được phân công",
    residentPortal: "Cổng cư dân",
    reports: "Phản ánh của tôi",
    trackReport: "Theo dõi phản ánh",
    switchWorkspace: "Chuyển không gian làm việc",
    closeNavigation: "Đóng menu",
    openNavigation: "Mở menu",
    residentSearch: "Tìm phản ánh của bạn...",
    sharedSearch: "Tìm sự cố, phản ánh...",
  },
  titles: {
    operationsDashboard: "Tổng quan vận hành",
    residentTickets: "Phản ánh của cư dân",
    incidentQueue: "Danh sách sự cố",
    tasks: "Công việc được phân công",
    report: "Gửi phản ánh",
    correlationReview: "Xem xét liên kết phản ánh",
    routingRecommendation: "Đề xuất điều phối",
    approvalReview: "Xem xét phê duyệt",
    incidentDetail: "Chi tiết sự cố",
    taskDetail: "Chi tiết công việc",
    reportStatus: "Trạng thái phản ánh",
  },
  errors: {
    notFoundTitle: "Không tìm thấy trang",
    notFoundDescription: "Đường dẫn không gian làm việc bạn yêu cầu không tồn tại.",
    returnToRoleSelector: "Quay lại chọn vai trò",
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
    "In Progress": "Đang xử lý",
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
  resident: {
    report: {
      eyebrow: "Gửi phản ánh",
      title: "Gửi phản ánh",
      description:
        "Mô tả vấn đề bạn đang gặp phải để Ban Quản lý có thể tiếp nhận và xử lý.",
      issueLabel: "Nội dung phản ánh",
      issuePlaceholder: "Mô tả điều bạn nhận thấy và thời điểm vấn đề bắt đầu.",
      locationLabel: "Vị trí",
      locationPlaceholder: "Ví dụ: Tòa A · Căn A-1204",
      additionalDetailsLabel: "Thông tin thêm",
      optional: "(không bắt buộc)",
      additionalDetailsPlaceholder: "Bạn có thông tin nào khác muốn gửi Ban Quản lý không?",
      photoLabel: "Hình ảnh",
      addPhoto: "Thêm hình ảnh",
      photoSize: "PNG hoặc JPG, tối đa 10 MB",
      submit: "Gửi phản ánh",
    },
    clarification: {
      eyebrow: "Bổ sung thông tin",
      title: "Vui lòng cung cấp thêm thông tin",
      description: "Thông tin bạn cung cấp sẽ giúp Ban Quản lý hiểu rõ hơn về vấn đề.",
      drippingQuestion: "Hiện nước có đang nhỏ giọt không?",
      waterLocationQuestion: "Nước xuất hiện ở đâu?",
      back: "Quay lại",
      updateReport: "Cập nhật phản ánh",
      provideDetails: "Cung cấp thêm thông tin",
      options: {
        "Yes, actively dripping": "Có, nước đang nhỏ giọt",
        "No, only visible water marks": "Không, chỉ thấy vết nước",
        "Not sure": "Tôi chưa rõ",
        Ceiling: "Trần nhà",
        Wall: "Tường",
        Floor: "Sàn nhà",
        Other: "Vị trí khác",
      },
    },
    preview: {
      title: "Cảm ơn bạn — chúng tôi đã nhận phản ánh.",
      description: "Dưới đây là thông tin chúng tôi ghi nhận. Ban Quản lý sẽ xem xét phản ánh này.",
      updated: "Cảm ơn bạn. Phản ánh đã được cập nhật.",
      aiHeading: "AI đã phân tích phản ánh của bạn",
      understoodAs: "Thông tin được ghi nhận:",
      issueType: "Thông tin về vấn đề",
      activeWaterLeak: "Có dấu hiệu rò rỉ nước",
      status: "Trạng thái",
      underReview: "Đang được xem xét",
      aiDisclaimer:
        "Phân tích này dựa trên mô tả của bạn, không phải kết luận về nguyên nhân thực tế.",
      relatedIncidentTitle: "Phản ánh này có thể liên quan đến một sự cố đang được xử lý",
      relatedIncidentDescription:
        "Khi phù hợp, phản ánh của bạn sẽ được xem xét cùng với sự cố liên quan. Ban Quản lý sẽ xác nhận cách xử lý.",
      viewStatus: "Theo dõi phản ánh",
    },
    ticket: {
      yourReport: "Phản ánh của bạn",
      currentStatus: "Trạng thái hiện tại",
      whatHappensNext: "Tiếp theo sẽ thế nào?",
      relatedIncidentTitle: "Thông tin về sự cố liên quan",
      relatedIncidentDescription:
        "Phản ánh này đang được xử lý cùng với một sự cố liên quan.",
      moreInformationTitle: "Cần thêm thông tin",
      moreInformationDescription:
        "Vui lòng cung cấp thêm thông tin để Ban Quản lý có thể tiếp tục xem xét phản ánh.",
      safetyTitle: "Cần kiểm tra an toàn thêm",
      safetyDescription:
        "Cần kiểm tra thêm về an toàn trước khi tiếp tục xử lý. Vui lòng tránh khu vực bị ảnh hưởng nếu bạn thấy không an toàn.",
      safetyGuidance: "Cổng cư dân không hỗ trợ điều phối tình huống khẩn cấp.",
      followUpTitle: "Cần xử lý thêm",
      followUpDescription:
        "Vấn đề cần được xử lý thêm. Ban Quản lý đang xem xét bước tiếp theo.",
      feedbackFollowUp:
        "Cảm ơn bạn đã phản hồi. Ban Quản lý sẽ tiếp tục xem xét vấn đề này.",
      noCompletionTime: "Hiện chưa có thời gian hoàn tất cụ thể.",
      resolutionReviewTitle: "Nhân viên kỹ thuật đã ghi nhận kết quả",
      resolutionReviewDescription:
        "Ban Quản lý đang xem xét kết quả xử lý trước khi hoàn tất phản ánh.",
      resolutionTitle: "Kết quả xử lý",
      feedbackQuestion: "Vấn đề đã được xử lý ổn chưa?",
      feedbackConfirmed: "Cảm ơn bạn đã xác nhận vấn đề đã được xử lý.",
      feedbackResolved: "Đã xử lý xong",
      feedbackStillHappening: "Vẫn còn vấn đề",
      progressUpdates: "Cập nhật tiến độ",
      description: "Nội dung phản ánh",
      location: "Vị trí",
      additionalDetails: "Thông tin thêm",
      photo: "Hình ảnh",
      photoAttached: "Đã gửi kèm hình ảnh",
      noPhoto: "Chưa gửi hình ảnh",
      clarification: "Thông tin bổ sung",
      demoControl: "Trạng thái bản mẫu",
      demoHelper: "Xem trước các trạng thái hiển thị cho cư dân.",
    },
    statusContent: {
      "Report received": {
        title: "Đã nhận phản ánh",
        description: "Phản ánh của bạn đã được ghi nhận.",
        next: "Ban Quản lý sẽ xem xét thông tin bạn cung cấp.",
      },
      "Being reviewed": {
        title: "Phản ánh đang được xem xét",
        description: "Ban Quản lý đang xem xét phản ánh của bạn.",
        next: "Ban Quản lý đang xác định bước xử lý phù hợp.",
      },
      "Maintenance team assigned": {
        title: "Đã sắp xếp nhân viên kỹ thuật",
        description: "Ban Quản lý đã sắp xếp nhân viên kỹ thuật để xử lý vấn đề.",
        next: "Nhân viên kỹ thuật sẽ bắt đầu công việc khi có thể tiếp cận vị trí và điều kiện phù hợp.",
      },
      "Maintenance team is working on it": {
        title: "Nhân viên kỹ thuật đang xử lý",
        description: "Công việc xử lý đang được thực hiện.",
        next: "Chúng tôi sẽ cập nhật phản ánh sau khi nhân viên kỹ thuật ghi nhận kết quả.",
      },
      "Resolution is being reviewed": {
        title: "BQL đang xem xét kết quả xử lý",
        description: "Nhân viên kỹ thuật đã ghi nhận kết quả xử lý.",
        next: "BQL đang xem xét kết quả trước khi hoàn tất phản ánh.",
      },
      "Issue resolved": {
        title: "Đã xử lý xong",
        description: "BQL đã hoàn tất việc xem xét kết quả.",
        next: "Vui lòng cho chúng tôi biết nếu vấn đề vẫn còn.",
      },
      "Follow-up required": {
        title: "Cần xử lý thêm",
        description: "Vấn đề cần được xử lý thêm.",
        next: "BQL đang xem xét bước tiếp theo. Hiện chưa có thời gian hoàn tất cụ thể.",
      },
      "More information needed": {
        title: "Cần thêm thông tin",
        description: "Cần thêm thông tin để Ban Quản lý tiếp tục xem xét phản ánh.",
        next: "Vui lòng trả lời câu hỏi bên dưới để phản ánh được tiếp tục xem xét.",
      },
      "Additional safety review required": {
        title: "Cần kiểm tra an toàn thêm",
        description: "Cần kiểm tra thêm về an toàn trước khi tiếp tục xử lý.",
        next: "Vui lòng tránh khu vực bị ảnh hưởng nếu bạn thấy không an toàn.",
      },
    } satisfies Record<ResidentStatus, { title: string; description: string; next: string }>,
    issueText: {
      "Water is leaking from my kitchen ceiling.": "Nước đang rò rỉ từ trần bếp nhà tôi.",
      "Water is leaking from the kitchen ceiling": "Nước rò rỉ từ trần bếp",
      "Water leakage was addressed by the maintenance team.":
        "Nhân viên kỹ thuật đã xử lý tình trạng rò rỉ nước.",
    },
    locationText: {
      "Tower A · Unit A-1204": "Tòa A · Căn A-1204",
    },
    timeline: {
      "Your report is being reviewed": "Phản ánh đang được xem xét",
      "Maintenance work started": "Nhân viên kỹ thuật bắt đầu xử lý",
      "Maintenance work completed": "Nhân viên kỹ thuật đã ghi nhận kết quả",
      "Maintenance visit completed": "Nhân viên kỹ thuật đã kiểm tra",
      "Additional work is required": "Cần xử lý thêm",
      "More information requested": "Ban Quản lý cần thêm thông tin",
      "Additional details received": "Đã nhận thêm thông tin",
      "Resident reported the issue is still happening": "Bạn cho biết vấn đề vẫn còn",
      "Building management review requested": "Đã chuyển đến Ban Quản lý để xem xét",
    },
    clarificationAnswers: {
      "Yes, actively dripping; water appearing on ceiling":
        "Có, nước đang nhỏ giọt; nước xuất hiện ở trần nhà.",
      "Yes, actively dripping; water appearing on wall":
        "Có, nước đang nhỏ giọt; nước xuất hiện ở tường.",
      "Yes, actively dripping; water appearing on floor":
        "Có, nước đang nhỏ giọt; nước xuất hiện ở sàn nhà.",
      "Yes, actively dripping; water appearing on other":
        "Có, nước đang nhỏ giọt; nước xuất hiện ở vị trí khác.",
      "No, only visible water marks; water appearing on ceiling":
        "Không, chỉ thấy vết nước; nước xuất hiện ở trần nhà.",
      "No, only visible water marks; water appearing on wall":
        "Không, chỉ thấy vết nước; nước xuất hiện ở tường.",
      "No, only visible water marks; water appearing on floor":
        "Không, chỉ thấy vết nước; nước xuất hiện ở sàn nhà.",
      "No, only visible water marks; water appearing on other":
        "Không, chỉ thấy vết nước; nước xuất hiện ở vị trí khác.",
      "Not sure; water appearing on ceiling": "Tôi chưa rõ; nước xuất hiện ở trần nhà.",
      "Not sure; water appearing on wall": "Tôi chưa rõ; nước xuất hiện ở tường.",
      "Not sure; water appearing on floor": "Tôi chưa rõ; nước xuất hiện ở sàn nhà.",
      "Not sure; water appearing on other": "Tôi chưa rõ; nước xuất hiện ở vị trí khác.",
    },
    now: "Vừa xong",
  },
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
    "BQL-approved routing": "Điều phối được BQL phê duyệt",
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
      "Electrical issue": "Sự cố điện",
      "Electrical issue in common area": "Sự cố điện tại khu vực chung",
      "Lobby door sensor": "Cảm biến cửa sảnh",
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
      "Earlier today · prototype state": "Hôm nay · trạng thái bản mẫu",
      "Prototype state": "Trạng thái bản mẫu",
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
  technician: {
    taskTitles: {
      "Investigate active water leak": "Kiểm tra và xử lý rò rỉ nước đang xảy ra",
      "Inspect corridor electrical circuit": "Kiểm tra mạch điện hành lang",
      "Test and recalibrate door sensor": "Kiểm tra và hiệu chỉnh lại cảm biến cửa",
    },
    checklistItems: {
      "Confirm active leak": "Xác nhận vị trí nước đang rò rỉ",
      "Identify visible source": "Xác định vị trí có thể quan sát thấy nguồn rò rỉ",
      "Check affected area": "Kiểm tra phạm vi ảnh hưởng",
      "Assess immediate property damage": "Đánh giá hư hại tài sản hiện có",
      "Check nearby units / common area": "Kiểm tra các căn hộ lân cận / khu vực chung",
    },
    escalationReasons: {
      "Requires specialist": "Cần nhân viên chuyên môn",
      "Access unavailable": "Chưa thể tiếp cận vị trí",
      "Source not identified": "Chưa xác định được điểm cần xử lý",
      "Safety concern": "Có rủi ro an toàn",
      "Requires BQL review": "Cần BQL xem xét",
      Other: "Lý do khác",
    },
    resolutionStatusOverrides: {
      "Unable to resolve": "Chưa thể xử lý",
    } satisfies Partial<Record<ResolutionStatus, string>>,
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

export function getResolutionStatusLabel(
  status: ResolutionStatus,
  context: ResolutionLabelContext = "bql",
) {
  if (context === "technician") {
    const technicianOverrides = uiLabels.technician.resolutionStatusOverrides as Partial<
      Record<ResolutionStatus, string>
    >;
    const technicianLabel = technicianOverrides[status];
    if (technicianLabel) return technicianLabel;
  }

  return uiLabels.resolutionStatuses[status];
}

export function getTechnicianTaskTitle(title: string) {
  return (
    uiLabels.technician.taskTitles[title as keyof typeof uiLabels.technician.taskTitles] ?? title
  );
}

export function getTechnicianChecklistLabel(item: string) {
  return uiLabels.technician.checklistItems[
    item as keyof typeof uiLabels.technician.checklistItems
  ] ?? item;
}

export function getTechnicianEscalationReasonLabel(reason: string) {
  return uiLabels.technician.escalationReasons[
    reason as keyof typeof uiLabels.technician.escalationReasons
  ] ?? reason;
}

export function getResidentStatusLabel(status: ResidentStatus) {
  return uiLabels.residentStatuses[status];
}

export function getResidentStatusContent(status: ResidentStatus) {
  return uiLabels.resident.statusContent[status];
}

export function getResidentQuestionOptionLabel(option: string) {
  return uiLabels.resident.clarification.options[
    option as keyof typeof uiLabels.resident.clarification.options
  ] ?? option;
}

export function getResidentIssueText(issue: string) {
  return uiLabels.resident.issueText[issue as keyof typeof uiLabels.resident.issueText] ?? issue;
}

export function getResidentLocationText(location: string) {
  return uiLabels.resident.locationText[
    location as keyof typeof uiLabels.resident.locationText
  ] ?? location;
}

export function getResidentTimelineLabel(label: string) {
  if (Object.prototype.hasOwnProperty.call(uiLabels.residentStatuses, label)) {
    return getResidentStatusLabel(label as ResidentStatus);
  }

  return uiLabels.resident.timeline[label as keyof typeof uiLabels.resident.timeline] ?? label;
}

export function getResidentTimelineTime(timestamp: string) {
  return timestamp === "Just now" ? uiLabels.resident.now : timestamp;
}

export function getResidentClarificationAnswer(answer: string) {
  const fullAnswer =
    uiLabels.resident.clarificationAnswers[
      answer as keyof typeof uiLabels.resident.clarificationAnswers
    ];
  return fullAnswer ?? getResidentQuestionOptionLabel(answer);
}

export function getResidentResolutionSummary(summary: string) {
  return uiLabels.resident.issueText[summary as keyof typeof uiLabels.resident.issueText] ?? summary;
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
