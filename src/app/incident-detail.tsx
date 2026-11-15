import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileCheck2,
  MapPin,
  Route,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import {
  Button,
  Card,
  DetailRow,
  IncidentMark,
  PriorityBadge,
  SectionHeading,
  StatusBadge,
} from "./components";
import { incidents, tickets } from "./data";
import { useOperationalState } from "./operational-state";
import { useRoutingDecisions } from "./routing-decision";
import {
  getAffectedAreaLabel,
  getAssessmentLevelLabel,
  getBqlCategoryLabel,
  getBqlDecisionReasonLabel,
  getBqlIncidentTitle,
  getBqlLocationLabel,
  getBqlRelativeTime,
  getBqlTeamLabel,
  getBqlTicketIssue,
  getProvenanceLabel,
  getResolutionStatusLabel,
  getStatusLabel,
  getSlaStateLabel,
  getTaskStatusLabel,
  uiLabels,
} from "./ui-language";

type SlaState = "On track" | "At risk" | "Breached";

function SlaBadge({ state }: { state: SlaState }) {
  const styles = {
    "On track": "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    "At risk": "bg-orange-50 text-orange-700 ring-orange-600/15",
    Breached: "bg-red-50 text-red-700 ring-red-600/15",
  }[state];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}
    >
      <Clock3 size={12} className="mr-1.5" />
      {getSlaStateLabel(state)}
    </span>
  );
}

export function IncidentIntelligencePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = incidents.find((item) => item.id === id) ?? incidents[0];
  const { state: operationalState, confirmResolution, requestFollowUp } = useOperationalState();
  const { decisions } = useRoutingDecisions();
  const routingDecision = decisions[incident.id];
  const isHeroIncident = incident.id === "INC-024";
  const assigned = isHeroIncident
    ? operationalState.assignmentCreated
    : routingDecision.status === "Approved" || routingDecision.status === "Changed";
  const sentBack = isHeroIncident
    ? operationalState.routingStatus === "Sent Back"
    : routingDecision.status === "Sent Back";
  const operationalStatus = isHeroIncident
    ? operationalState.incidentStatus
    : assigned
      ? "Assigned"
      : sentBack
        ? "Under Review"
        : incident.status;
  const operationalTeam = isHeroIncident
    ? (operationalState.assignedTeam ?? routingDecision.currentTeam)
    : (routingDecision.approvedTeam ?? routingDecision.currentTeam);
  const related = tickets.filter((ticket) => ticket.incident === incident.id);
  const [clarificationState, setClarificationState] = useState<"idle" | "composing" | "sent">(
    "idle",
  );
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const isWaterIncident = incident.id === "INC-024";
  const category = isWaterIncident
    ? "Plumbing"
    : incident.recommendedTeam
        .replace("Technical — ", "")
        .replace("Vertical Transport", "Mechanical");
  const locationOnRecord = getBqlLocationLabel(incident.officialLocation);
  const correlatedScope = incident.correlatedAffectedArea
    ? getBqlLocationLabel(incident.correlatedAffectedArea)
    : undefined;
  const slaState: SlaState =
    incident.slaTone === "danger"
      ? "Breached"
      : incident.slaTone === "warning"
        ? "At risk"
        : "On track";
  const risk = incident.priority === "Critical" || incident.priority === "High" ? "High" : "Medium";
  const symptoms = isWaterIncident
    ? [
        "Nước đang rò rỉ",
        "Ảnh hưởng đến nhiều cư dân",
        "Phản ánh tập trung ở các tầng liền kề",
      ]
    : [
        `Đã ghi nhận: ${getBqlIncidentTitle(incident.title)}`,
        `${related.length} phản ánh liên quan của cư dân`,
        `Các phản ánh tập trung gần ${getBqlLocationLabel(incident.officialLocation)}`,
      ];
  const signals = isWaterIncident
    ? [
        "Ảnh hưởng đến nhiều căn hộ",
        "Nước đang rò rỉ",
        "Ảnh hưởng lan qua nhiều tầng",
        "Có nguy cơ hư hại tài sản",
        "Các phản ánh được gửi trong thời gian ngắn",
        "Có nguy cơ trễ SLA",
      ]
    : [
        "Gián đoạn vận hành",
        `Mức độ ưu tiên: ${uiLabels.priorities[incident.priority]}`,
        "Có phản ánh liên quan của cư dân",
      ];
  const gaps = isWaterIncident
    ? {
        missing: "Chưa xác định chính xác vị trí rò rỉ",
        uncertain: "Chưa rõ phạm vi ảnh hưởng có vượt quá tầng 14 hay không",
        clarification:
          "Xác nhận tầng cao nhất bị ảnh hưởng và liệu nước có chảy vào khu vực thiết bị điện hay không.",
      }
    : {
        missing: "Chưa xác định nguyên nhân cụ thể",
        uncertain: "Chưa rõ toàn bộ phạm vi bị ảnh hưởng",
        clarification: "Xác nhận tình hình có thay đổi kể từ phản ánh mới nhất của cư dân hay không.",
      };
  const baseTimeline = isWaterIncident
    ? [
        ["14:03", "Đã tiếp nhận phản ánh đầu tiên của cư dân"],
        ["14:08", "Đã tiếp nhận phản ánh liên quan thứ hai"],
        ["14:16", "AI đã trích xuất nội dung và phát hiện các phản ánh liên quan"],
        ["14:17", "Đã tạo sự cố từ các phản ánh được liên kết"],
        ["14:18", "Đề xuất đội kỹ thuật — cấp thoát nước"],
        ["14:19", "Chờ BQL phê duyệt"],
      ]
    : [
        ["13:42", "Đã tiếp nhận phản ánh đầu tiên của cư dân"],
        ["13:49", "Đã phát hiện phản ánh liên quan"],
        ["13:54", "AI đã trích xuất thông tin"],
        ["13:55", "Đã tạo sự cố"],
        ["13:58", `Đã ghi nhận ${getBqlTeamLabel(incident.currentTeam)} là đội đang xử lý`],
        ["14:02", `Trạng thái được cập nhật: ${getStatusLabel(incident.status, "incident")}`],
      ];
  const timeline = [
    ...baseTimeline,
    ...(isHeroIncident && operationalState.incidentStatus === "Resolved"
      ? [["Now", "BQL đã xác nhận kết quả của nhân viên kỹ thuật và đóng sự cố"]]
      : isHeroIncident && operationalState.incidentStatus === "Resolution Review"
        ? [["Now", "Nhân viên kỹ thuật đã gửi kết quả để BQL xem xét"]]
        : isHeroIncident && operationalState.incidentStatus === "In Progress"
          ? [["Now", "Nhân viên kỹ thuật đang xử lý"]]
          : assigned
            ? [["Now", `BQL đã phê duyệt phân công cho ${getBqlTeamLabel(operationalTeam)}`]]
            : sentBack
              ? [["Now", "BQL đã yêu cầu xem xét lại đề xuất điều phối"]]
              : []),
  ];
  const primaryAction =
    isHeroIncident && operationalState.incidentStatus === "Resolution Review"
      ? {
          label: "Xem kết quả của nhân viên kỹ thuật",
          heading: "Xem xét kết quả của nhân viên kỹ thuật",
          route: "/technician/tasks/TASK-102",
        }
      : isHeroIncident && operationalState.incidentStatus === "Resolved"
        ? {
            label: "Xem công việc đã hoàn tất",
            heading: "Xem xét kết quả đã hoàn tất",
            route: "/technician/tasks/TASK-102",
          }
        : isHeroIncident && operationalState.incidentStatus === "In Progress"
          ? {
              label: "Theo dõi xử lý",
              heading: "Theo dõi phân công và công việc tại hiện trường",
              route: "/technician/tasks/TASK-102",
            }
          : assigned
            ? {
                label: "Xem phân công",
                heading: "Theo dõi phân công và bắt đầu xử lý tại hiện trường",
                route: `/bql/incidents/${incident.id}/approval`,
              }
            : sentBack
              ? {
                  label: "Xem đề xuất điều phối",
                  heading: "Xem xét đề xuất điều phối",
                  route: `/bql/incidents/${incident.id}/routing`,
                }
              : {
                  label: "Xem xét phê duyệt",
                  heading: `Phê duyệt điều phối đến ${getBqlTeamLabel(incident.recommendedTeam)}`,
                  route: `/bql/incidents/${incident.id}/approval`,
                };

  return (
    <>
      <Link
        to="/bql/incidents"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Quay lại danh sách sự cố
      </Link>

      <Card className="mb-6 overflow-hidden border-slate-300">
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <IncidentMark />
              <div>
                <p className="font-mono text-xs font-bold text-indigo-600">{incident.id}</p>
                <p className="text-xs font-semibold text-slate-400">Sự cố vận hành</p>
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-[-0.035em] text-slate-950 sm:text-3xl">
              {getBqlIncidentTitle(incident.title)}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} /> {locationOnRecord}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {assigned && (
              <Button variant="secondary" onClick={() => navigate("/technician/tasks/TASK-102")}>
                Xem công việc của nhân viên kỹ thuật
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => navigate(`/bql/incidents/${incident.id}/routing`)}
            >
              Xem đề xuất điều phối
            </Button>
            <Button onClick={() => navigate(primaryAction.route)}>
              {primaryAction.label} <ArrowRight size={16} />
            </Button>
          </div>
        </div>
        <div className="grid border-t border-slate-200 bg-slate-50/70 sm:grid-cols-2 lg:grid-cols-5">
          <HeaderFact label="Mức độ ưu tiên">
            <PriorityBadge priority={incident.priority} />
          </HeaderFact>
          <HeaderFact label="Trạng thái">
            <StatusBadge status={operationalStatus} context="incident" />
          </HeaderFact>
          <HeaderFact label="SLA">
            <SlaBadge state={slaState} />
          </HeaderFact>
          <HeaderFact label="Phản ánh liên quan">
            <span className="text-sm font-bold text-slate-900">{incident.tickets}</span>
          </HeaderFact>
          <HeaderFact label="Đội đang xử lý">
            <span className="text-sm font-bold text-slate-900">{getBqlTeamLabel(operationalTeam)}</span>
          </HeaderFact>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Card>
            <SectionHeading title="Tóm tắt sự cố" meta="Bối cảnh vận hành" />
            <div className="grid gap-5 p-5 md:grid-cols-3">
              <SummaryItem
                label="Diễn biến"
                text={
                  isWaterIncident
                    ? "Nhiều cư dân phản ánh tình trạng rò rỉ nước đang diễn ra tại các căn hộ trên ba tầng liền kề."
                    : `${related.length || incident.tickets} phản ánh mô tả ${getBqlIncidentTitle(incident.title)} gần ${getBqlLocationLabel(incident.officialLocation)}.`
                }
              />
              <SummaryItem
                label="Ảnh hưởng"
                text={
                  isWaterIncident
                    ? "Có nguy cơ gây hư hại nhiều căn hộ và ảnh hưởng đến sinh hoạt của cư dân."
                    : "Có thể ảnh hưởng đến cư dân và hoạt động tại các khu vực chung."
                }
              />
              <SummaryItem
                label="Tình trạng hiện tại"
                text={
                  isHeroIncident && operationalState.incidentStatus === "Resolution Review"
                    ? "Nhân viên kỹ thuật đã ghi nhận kết quả xử lý. BQL cần xem xét kết quả trước khi đóng sự cố."
                    : isHeroIncident && operationalState.incidentStatus === "Resolved"
                      ? "BQL đã xem xét kết quả của nhân viên kỹ thuật và đóng sự cố."
                      : isHeroIncident && operationalState.incidentStatus === "In Progress"
                        ? `${getBqlTeamLabel(operationalTeam)} đang thực hiện công việc đã được phê duyệt tại hiện trường.`
                        : assigned
                          ? `${getBqlTeamLabel(operationalTeam)} được phân công theo quyết định điều phối đã được BQL phê duyệt.`
                          : sentBack
                            ? `BQL đã yêu cầu xem xét lại đề xuất điều phối ${getBqlTeamLabel(incident.recommendedTeam)}.`
                            : `Các phản ánh được điều phối trong cùng một sự cố. BQL cần xem xét đề xuất điều phối ${getBqlTeamLabel(incident.recommendedTeam)}.`
                }
              />
            </div>
            {correlatedScope && (
              <div className="flex flex-col gap-2 border-t border-indigo-100 bg-indigo-50/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-indigo-700">
                      Suy ra từ liên kết phản ánh
                    </span>
                    <p className="text-xs font-bold text-slate-800">Phạm vi ảnh hưởng theo liên kết phản ánh</p>
                  </div>
                  <p className="mt-1.5 text-sm font-bold text-slate-950">{correlatedScope}</p>
                </div>
                <p className="text-xs text-slate-500">
                  Tổng hợp từ {incident.tickets} phản ánh liên quan của cư dân
                </p>
              </div>
            )}
          </Card>

          <Card accent className="overflow-hidden">
            <div className="flex items-start gap-3 border-b border-indigo-100 bg-indigo-50/50 px-5 py-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-indigo-600 text-white">
                <BrainCircuit size={18} />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[15px] font-bold text-slate-950">AI phân tích</h2>
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-indigo-700">
                    {getProvenanceLabel("AI-extracted")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                    Thông tin có cấu trúc được trích xuất từ nội dung phản ánh của cư dân.
                </p>
              </div>
            </div>
            <div className="grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Nội dung", isWaterIncident ? "Rò rỉ nước" : getBqlIncidentTitle(incident.title)],
                ["Nhóm vấn đề", getBqlCategoryLabel(category)],
                ["Phạm vi", isWaterIncident ? "Nhiều căn hộ" : `${related.length} phản ánh`],
                ["Mức độ tin cậy", getAssessmentLevelLabel(isWaterIncident ? "High" : "Medium")],
              ].map(([label, value]) => (
                <div key={label} className="bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-500">
                    {label}
                  </p>
                  <p className="mt-1.5 text-sm font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.09em] text-slate-400">
                Triệu chứng được trích xuất
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                  <span
                    key={symptom}
                    className="rounded-md border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-800"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading title="Đánh giá rủi ro và mức độ ưu tiên" meta="AI và quy tắc vận hành" />
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-lg bg-red-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-red-600">
                    Mức độ ưu tiên
                  </p>
                  <div className="mt-1.5">
                    <PriorityBadge priority={incident.priority} />
                  </div>
                </div>
                <div className="rounded-lg bg-orange-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-orange-600">
                    Rủi ro
                  </p>
                  <p className="mt-1.5 text-sm font-bold text-orange-800">
                    {getAssessmentLevelLabel(risk)}
                  </p>
                </div>
                <p className="max-w-xl text-sm leading-6 text-slate-600">
                  {isWaterIncident
                    ? "Nhiều căn hộ đang bị ảnh hưởng bởi tình trạng rò rỉ nước. Sự cố có thể gây hư hại tài sản và cần được xử lý sớm."
                    : `Sự cố có mức độ ưu tiên ${uiLabels.priorities[incident.priority].toLowerCase()} và có thể ảnh hưởng đến cư dân nếu không được xử lý kịp thời.`}
                </p>
              </div>
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.09em] text-slate-400">
                  Dấu hiệu được ghi nhận
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {signals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-indigo-600">
                      Đánh giá của AI
                    </p>
                    <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.07em] text-indigo-700">
                      {getProvenanceLabel("AI-generated")}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-700">
                    Nhiều phản ánh cho thấy nước đang rò rỉ và ảnh hưởng đến một số căn hộ gần nhau.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-600">
                      Kiểm tra của hệ thống
                    </p>
                    <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.07em] text-slate-600">
                      {getProvenanceLabel("System record")}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                    {[
                      `${incident.tickets} phản ánh liên quan`,
                      "Có vị trí ghi nhận chính thức",
                      "Phạm vi ảnh hưởng được tổng hợp từ liên kết phản ánh",
                      `SLA: ${getSlaStateLabel(slaState).toLowerCase()}`,
                      "Sự cố chưa được đóng",
                      "Quy trình yêu cầu BQL phê duyệt",
                    ].map((check) => (
                      <li key={check} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="shrink-0 text-emerald-600" /> {check}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-slate-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Nguồn đánh giá: AI hỗ trợ phân tích và quy tắc vận hành xác định
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    AI đưa ra đề xuất. Quy tắc vận hành và phê duyệt của BQL kiểm soát các hành động
                    có rủi ro cao.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading
              title="Các phản ánh liên quan"
              meta={`${related.length} phản ánh của cư dân đang hỗ trợ sự cố này`}
            />
            <div className="flex flex-col gap-3 border-b border-indigo-100 bg-indigo-50/50 px-5 py-4 sm:flex-row sm:items-start">
              <BrainCircuit size={17} className="mt-0.5 shrink-0 text-indigo-600" />
              <div className="flex-1">
                <p className="text-xs font-bold text-indigo-900">Vì sao các phản ánh có liên quan</p>
                <p className="mt-1 text-xs leading-5 text-indigo-700">
                  Nội dung vấn đề tương tự, vị trí gần nhau và thời điểm gửi sát nhau cho thấy các
                  phản ánh có thể liên quan đến cùng một sự cố vận hành. BQL có thể xem xét mối
                  liên hệ này.
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => navigate(`/bql/incidents/${incident.id}/correlation`)}
              >
                Xem xét liên kết phản ánh <ArrowRight size={15} />
              </Button>
            </div>
            <div className="divide-y divide-slate-100">
              {related.map((ticket) => (
                <button
                  key={ticket.id}
                  className={`grid w-full gap-3 px-5 py-4 text-left transition sm:grid-cols-[minmax(0,1.4fr)_minmax(150px,.8fr)_auto_auto] sm:items-center ${
                    selectedTicket === ticket.id ? "bg-indigo-50/60" : "hover:bg-slate-50"
                  }`}
                  onClick={() =>
                    setSelectedTicket((current) => (current === ticket.id ? null : ticket.id))
                  }
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-600">
                        {ticket.id}
                      </span>
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 ring-1 ring-inset ring-indigo-600/15">
                        Liên quan đến sự cố
                      </span>
                    </div>
                    <p className="mt-1.5 truncate text-sm font-semibold text-slate-900">
                      “{getBqlTicketIssue(ticket.issue)}”
                    </p>
                  </div>
                  <p className="text-xs font-medium text-slate-600">{getBqlLocationLabel(ticket.location)}</p>
                  <div className="text-xs text-slate-500">
                    <p>{getBqlRelativeTime(ticket.created)}</p>
                    <p className="mt-1">{getBqlCategoryLabel(ticket.category)}</p>
                  </div>
                  <PriorityBadge priority={ticket.priority} />
                </button>
              ))}
            </div>
          </Card>

          {isHeroIncident &&
            operationalState.resolution &&
            (operationalState.incidentStatus === "Resolution Review" ||
              operationalState.incidentStatus === "Resolved" ||
              operationalState.taskStatus === "Needs Follow-up") && (
              <Card className="overflow-hidden border-blue-200">
                <div className="flex flex-col gap-3 border-b border-blue-100 bg-blue-50/60 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[15px] font-bold text-slate-950">BQL xem xét kết quả xử lý</h2>
                      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.07em] text-blue-700">
                        {getProvenanceLabel("Technician action")}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                        TASK-102 · Chờ BQL xem xét kết quả của nhân viên kỹ thuật
                    </p>
                  </div>
                  <StatusBadge
                    context="incident"
                    status={
                      operationalState.incidentStatus === "Resolved"
                        ? "Resolved"
                        : operationalState.incidentStatus === "Resolution Review"
                          ? "Resolution Review"
                          : "In Progress"
                    }
                  />
                </div>
                <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
                  <ResolutionFact
                    label="Trạng thái công việc"
                    value={getTaskStatusLabel(operationalState.taskStatus)}
                    provenance="System record"
                  />
                  <ResolutionFact
                    label="Trạng thái kết quả xử lý"
                    value={getResolutionStatusLabel(operationalState.resolution.resolutionStatus)}
                    provenance="Technician action"
                    technician
                  />
                  <ResolutionFact
                    label="Ghi chú xử lý"
                    value={operationalState.resolution.resolutionNote || "Chưa có thông tin"}
                    provenance="Technician action"
                    technician
                  />
                  <ResolutionFact
                    label="Phát hiện"
                    value={operationalState.resolution.finding || "Chưa có thông tin"}
                    provenance="Technician action"
                    technician
                  />
                  <ResolutionFact
                    label="Xác nhận phạm vi ảnh hưởng"
                    value={getAffectedAreaLabel(operationalState.resolution.affectedAreaConfirmed)}
                    provenance="Technician action"
                    technician
                  />
                  <ResolutionFact
                    label="Trạng thái sự cố hiện tại"
                    value={getStatusLabel(operationalState.incidentStatus, "incident")}
                    provenance="System record"
                  />
                </div>
                {operationalState.incidentStatus === "Resolution Review" ? (
                  <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-800">
                        BQL cần quyết định việc đóng sự cố
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Xác nhận kết quả hoặc yêu cầu xử lý tiếp. Công việc của nhân viên kỹ thuật
                        hoàn tất chưa đồng nghĩa với việc sự cố đã đóng.
                      </p>
                    </div>
                    <Button variant="secondary" onClick={requestFollowUp}>
                      Yêu cầu xử lý tiếp
                    </Button>
                    <Button onClick={confirmResolution}>Xác nhận kết quả và đóng sự cố</Button>
                  </div>
                ) : operationalState.incidentStatus === "Resolved" ? (
                  <div
                    className="flex items-center gap-3 border-t border-emerald-100 bg-emerald-50 px-5 py-4"
                    role="status"
                  >
                    <CheckCircle2 size={18} className="text-emerald-700" />
                    <div>
                      <p className="text-sm font-bold text-emerald-900">
                        BQL đã xác nhận kết quả xử lý
                      </p>
                      <p className="mt-1 text-xs text-emerald-700">
                        Quyết định của BQL · Trạng thái cư dân đã cập nhật: Đã xử lý xong
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-amber-100 bg-amber-50 px-5 py-4">
                    <p className="text-sm font-bold text-amber-900">BQL đã yêu cầu xử lý tiếp</p>
                    <p className="mt-1 text-xs text-amber-700">
                      Quyết định của BQL · Không có phân công lại tự động nào được tạo
                    </p>
                  </div>
                )}
              </Card>
            )}

          <Card className="overflow-hidden">
            <SectionHeading title="Thông tin còn thiếu" meta="Có thể cần làm rõ thêm" />
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <GapItem tone="missing" label="Chưa có thông tin" text={gaps.missing} />
              <GapItem tone="uncertain" label="Chưa xác định" text={gaps.uncertain} />
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">Gợi ý nội dung cần xác nhận</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{gaps.clarification}</p>
              </div>
              {clarificationState === "sent" ? (
                <span
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-50 px-4 text-sm font-bold text-emerald-700"
                  role="status"
                >
                  <CheckCircle2 size={16} /> Đã yêu cầu xác nhận thêm thông tin
                </span>
              ) : (
                <Button variant="secondary" onClick={() => setClarificationState("composing")}>
                  Yêu cầu làm rõ
                </Button>
              )}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading title="Lịch sử vận hành" meta="Quá trình xử lý sự cố" />
            <div className="p-5">
              {timeline.map(([time, event], index) => (
                <div key={`${time}-${event}`} className="relative flex gap-4 pb-6 last:pb-0">
                  {index < timeline.length - 1 && (
                    <span className="absolute left-[5px] top-4 h-full w-px bg-slate-200" />
                  )}
                  <span
                    className={`relative z-10 mt-1 size-3 shrink-0 rounded-full ring-4 ring-white ${
                      index === timeline.length - 1 ? "bg-indigo-600" : "bg-slate-300"
                    }`}
                  />
                  <div className="flex min-w-0 flex-1 items-baseline gap-4">
                    <time className="w-12 shrink-0 font-mono text-xs font-bold text-slate-500">
                      {getBqlRelativeTime(time)}
                    </time>
                    <p className="text-sm font-medium text-slate-800">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <SectionHeading title="Thông tin đã được hệ thống xác minh" meta="Ghi nhận vận hành" />
            <dl className="px-5">
              <DetailRow label="Mã sự cố">{incident.id}</DetailRow>
              <DetailRow label="Khu căn hộ">Sunrise Residence</DetailRow>
              <DetailRow label="Vị trí ghi nhận">{locationOnRecord}</DetailRow>
              <DetailRow label="Phản ánh liên quan">{incident.tickets}</DetailRow>
              <DetailRow label="Trạng thái SLA">
                <SlaBadge state={slaState} />
              </DetailRow>
              <DetailRow label="Trạng thái">
                <StatusBadge status={operationalStatus} context="incident" />
              </DetailRow>
              <DetailRow label="Đội đang xử lý">{getBqlTeamLabel(operationalTeam)}</DetailRow>
            </dl>
            <div className="mx-5 mb-5 flex gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-slate-600" />
              Các thông tin này lấy từ hồ sơ khu căn hộ và trạng thái quy trình, không phải do AI trích xuất.
            </div>
          </Card>

          <Card accent className="overflow-hidden">
            <div className="border-b border-indigo-100 bg-indigo-50/60 px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-600">
                Hành động đề xuất tiếp theo
              </p>
              <h2 className="mt-1.5 text-lg font-bold text-slate-950">{primaryAction.heading}</h2>
            </div>
            <div className="p-5">
              {assigned ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={17} className="text-emerald-700" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-emerald-700">
                      Phân công · Quyết định của BQL
                    </p>
                  </div>
                  <p className="mt-2 text-sm font-bold text-slate-950">{getBqlTeamLabel(operationalTeam)}</p>
                  <p className="mt-1 text-xs text-emerald-800">Đề xuất điều phối đã được BQL phê duyệt</p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-indigo-600">
                    Đề xuất của AI
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {getBqlTeamLabel(incident.recommendedTeam)}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {isWaterIncident
                      ? "Rò rỉ nước tại nhiều căn hộ + nhóm cấp thoát nước + khối lượng công việc hiện tại"
                      : `${getBqlCategoryLabel(category)} + vị trí sự cố + khối lượng công việc hiện tại`}
                  </p>
                </>
              )}
              <div className="my-4 border-t border-slate-100" />
              <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-500">
                Kiểm tra điều kiện hệ thống
              </p>
              <ul className="mt-2 space-y-2 text-xs text-slate-600">
                {[
                  `Kỹ năng cần thiết: ${getBqlCategoryLabel(category)}`,
                  `Vị trí: ${getBqlLocationLabel(incident.officialLocation.split(" / ")[0])}`,
                  "Khối lượng công việc hiện tại: Trung bình",
                ].map((check) => (
                  <li key={check} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600" /> {check}
                  </li>
                ))}
              </ul>
              <div className="my-4 border-t border-slate-100" />
              <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-500">
                {assigned ? "Hành động vận hành" : "Hành động của BQL"}
              </p>
              <Button className="mt-3 w-full" onClick={() => navigate(primaryAction.route)}>
                {primaryAction.label}
                <ArrowRight size={16} />
              </Button>
              <Button
                className="mt-2 w-full"
                variant="secondary"
                onClick={() => navigate(`/bql/incidents/${incident.id}/routing`)}
              >
                Xem đề xuất điều phối <Route size={15} />
              </Button>
              <p className="mt-4 text-center text-[11px] font-semibold text-slate-400">
                AI đề xuất → Hệ thống kiểm tra → BQL quyết định
              </p>
              <p className="mt-2 text-center text-[11px] leading-4 text-slate-500">
                {assigned
                  ? "Phân công hiện tại đã được ghi nhận trong hệ thống vận hành."
                  : sentBack
                    ? "Chưa tạo phân công. Đề xuất điều phối cần được xem xét lại."
                    : "Đây mới là đề xuất — cần BQL phê duyệt trước khi tạo phân công."}
              </p>
            </div>
          </Card>

          <Card>
            <SectionHeading title="Bằng chứng và truy xuất nguồn gốc" />
            <div className="px-5">
              <DetailRow label="Phản ánh nguồn">
                <TraceabilityValue
                  value={`${incident.tickets} phản ánh của cư dân`}
                  provenance="System record"
                />
              </DetailRow>
              <DetailRow label="AI trích xuất">
                <TraceabilityValue value="14:16" provenance="AI-generated" tone="ai" />
              </DetailRow>
              <DetailRow label="Đánh giá mức độ ưu tiên">
                <TraceabilityValue value="14:17" provenance="AI + rules" tone="ai" />
              </DetailRow>
              <DetailRow label="Quyết định gần nhất của BQL">
                <TraceabilityValue
                  value={
                    isHeroIncident && operationalState.bqlReviewStatus === "Closed"
                      ? "BQL đã xác nhận kết quả xử lý của nhân viên kỹ thuật"
                      : isHeroIncident && operationalState.taskStatus === "Needs Follow-up"
                        ? "BQL đã yêu cầu xử lý tiếp"
                        : assigned
                          ? getBqlDecisionReasonLabel(routingDecision.decisionReason ?? "BQL approved the recommended routing.")
                          : sentBack
                            ? `Đã yêu cầu xem xét lại: ${getBqlDecisionReasonLabel(routingDecision.decisionReason ?? "")}`
                            : "Chưa có ghi nhận"
                  }
                  provenance="Human decision"
                  tone="human"
                />
              </DetailRow>
              <DetailRow label="Đề xuất điều phối">
                <TraceabilityValue
                  value={getBqlTeamLabel(incident.recommendedTeam)}
                  provenance="AI-generated"
                  tone="ai"
                />
              </DetailRow>
              <DetailRow label="Kỹ năng cần thiết">
                <TraceabilityValue value={getBqlCategoryLabel(category)} provenance="System record" />
              </DetailRow>
              <DetailRow label="Đội đang xử lý">
                <TraceabilityValue value={getBqlTeamLabel(operationalTeam)} provenance="System record" />
              </DetailRow>
            </div>
            <div className="mx-5 mb-5 flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-xs font-medium text-slate-600">
              <FileCheck2 size={16} className="text-slate-500" />
              {assigned
                ? operationalState.bqlReviewStatus === "Closed"
                  ? "Sự cố đã được đóng sau khi BQL xem xét lần cuối"
                  : operationalState.incidentStatus === "Resolution Review"
                    ? "Chờ BQL xem xét kết quả của nhân viên kỹ thuật"
                    : "Đã tạo phân công theo đề xuất điều phối được BQL phê duyệt"
                : sentBack
                  ? "BQL đã yêu cầu xem xét lại đề xuất điều phối"
                  : "Chờ BQL phê duyệt"}
            </div>
          </Card>
        </aside>
      </div>

      {clarificationState === "composing" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clarification-title"
        >
          <Card className="w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 id="clarification-title" className="text-base font-bold text-slate-950">
                  Yêu cầu cư dân xác nhận thêm thông tin
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Yêu cầu mô phỏng gửi đến cư dân có phản ánh liên quan đến {incident.id}
                </p>
              </div>
              <button
                aria-label="Đóng hộp thoại yêu cầu xác nhận thêm thông tin"
                className="text-slate-400 hover:text-slate-700"
                onClick={() => setClarificationState("idle")}
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-5">
              <label className="form-label">
                Nội dung cần xác nhận
                <textarea
                  className="form-input min-h-28 resize-none"
                  defaultValue="Vui lòng xác nhận nước còn rò rỉ hay không và liệu thiết bị hoặc ổ cắm điện nào có bị ảnh hưởng hay không."
                />
              </label>
              <div className="mt-5 flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setClarificationState("idle")}>
                  Hủy
                </Button>
                <Button onClick={() => setClarificationState("sent")}>Gửi yêu cầu</Button>
              </div>
              <p className="mt-3 text-center text-[11px] text-slate-400">
                Chỉ là thao tác trong bản mẫu. Không có tin nhắn nào được gửi đi.
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

function HeaderFact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-slate-200 px-5 py-4 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function SummaryItem({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.09em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-800">{text}</p>
    </div>
  );
}

function ResolutionFact({
  label,
  value,
  provenance,
  technician = false,
}: {
  label: string;
  value: string;
  provenance: string;
  technician?: boolean;
}) {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-400">{label}</p>
        <span
          className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.07em] ${
            technician ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
          }`}
        >
          {getProvenanceLabel(provenance)}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold leading-5 text-slate-900">{value}</p>
    </div>
  );
}

function TraceabilityValue({
  value,
  provenance,
  tone = "system",
}: {
  value: string;
  provenance: string;
  tone?: "system" | "ai" | "human";
}) {
  const styles = {
    system: "bg-slate-100 text-slate-600",
    ai: "bg-indigo-50 text-indigo-700",
    human: "bg-amber-50 text-amber-700",
  }[tone];

  return (
    <span className="flex flex-col items-end gap-1.5">
      <span>{value}</span>
      <span
        className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.07em] ${styles}`}
      >
        {getProvenanceLabel(provenance)}
      </span>
    </span>
  );
}

function GapItem({
  label,
  text,
  tone,
}: {
  label: string;
  text: string;
  tone: "missing" | "uncertain";
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        tone === "missing" ? "border-amber-200 bg-amber-50/60" : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle
          size={15}
          className={tone === "missing" ? "text-amber-700" : "text-slate-500"}
        />
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.09em] ${
            tone === "missing" ? "text-amber-700" : "text-slate-500"
          }`}
        >
          {label}
        </p>
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-900">{text}</p>
    </div>
  );
}
