import { useState, type FormEvent } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  FileCheck2,
  Gauge,
  HardHat,
  MapPin,
  Paperclip,
  Route,
  ShieldCheck,
  Sparkles,
  Ticket,
  UploadCloud,
  UserCheck,
  Wrench,
  XCircle,
} from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import {
  Brand,
  Button,
  Card,
  DetailRow,
  IncidentMark,
  PageHeader,
  PriorityBadge,
  SectionHeading,
  StatusBadge,
  Table,
  TicketMark,
} from "./components";
import { incidents, tickets, type Incident, type Ticket as TicketType } from "./data";
import {
  formatSlaText,
  getBqlCategoryLabel,
  getBqlIncidentTitle,
  getBqlLocationLabel,
  getBqlRelativeTime,
  getBqlTeamLabel,
  getBqlTicketIssue,
  getSlaStateLabel,
  uiLabels,
} from "./ui-language";
import { IncidentIntelligencePage } from "./incident-detail";
import { useOperationalState } from "./operational-state";
import { ResidentIssueStatusPage, ResidentReportPage } from "./resident-workflow";
import { RoutingApprovalPage, RoutingRecommendationPage } from "./routing-workflow";
import { TechnicianExecutionPage, TechnicianTaskQueuePage } from "./technician-workflow";

export function EntryPage() {
  const roles = [
    {
      title: uiLabels.roles.bqlIntro,
      description: "Tiếp nhận phản ánh, điều phối sự cố và phê duyệt các quyết định vận hành.",
      to: "/bql/dashboard",
      cta: "Vào trang vận hành BQL",
      icon: <Gauge size={22} />,
      primary: true,
    },
    {
      title: uiLabels.roles.technician,
      description: "Xem công việc được phân công, ghi nhận bằng chứng và cập nhật tiến độ.",
      to: "/technician/tasks",
      cta: "Vào không gian làm việc kỹ thuật",
      icon: <HardHat size={22} />,
    },
    {
      title: uiLabels.roles.resident,
      description: "Gửi phản ánh và theo dõi quá trình xử lý.",
      to: "/resident/report",
      cta: "Vào cổng cư dân",
      icon: <Building2 size={22} />,
    },
  ];
  return (
    <div className="entry-grid min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Brand inverse />
        <Link
          to="/login"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
        >
          Vào bản mẫu
        </Link>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col px-6 pb-14 pt-16 lg:px-10 lg:pt-24">
        <div className="mb-14 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold text-indigo-200">
            <Sparkles size={14} /> Điều phối sự cố, Ban Quản lý (BQL) giữ quyền quyết định
          </div>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.055em] sm:text-6xl">
            Biến phản ánh của cư dân thành <span className="text-indigo-300">hành động phối hợp.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            FixIt Agent hỗ trợ BQL liên kết các phản ánh, quản lý sự cố và đưa ra quyết định nhanh
            hơn dựa trên bằng chứng.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {roles.map((role) => (
            <Link
              key={role.to}
              to={role.to}
              className={`group rounded-2xl border p-6 transition duration-200 hover:-translate-y-1 ${
                role.primary
                  ? "border-indigo-400/50 bg-indigo-500/15 hover:bg-indigo-500/20"
                  : "border-white/10 bg-white/[0.045] hover:bg-white/[0.075]"
              }`}
            >
              <span
                className={`grid size-11 place-items-center rounded-xl ${role.primary ? "bg-indigo-400 text-slate-950" : "bg-white/10 text-slate-200"}`}
              >
                {role.icon}
              </span>
              <h2 className="mt-7 text-lg font-bold">{role.title}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{role.description}</p>
              <div className="mt-7 flex items-center justify-between text-sm font-semibold text-white">
                {role.cta}
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-2">
            <ShieldCheck size={15} /> BQL phê duyệt trước khi phân công
          </span>
          <span className="flex items-center gap-2">
            <CircleDot size={15} /> Giữ nguyên bối cảnh vận hành
          </span>
          <span className="flex items-center gap-2">
            <FileCheck2 size={15} /> Quy trình dựa trên bằng chứng
          </span>
        </div>
      </main>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("bql");
  function submit(event: FormEvent) {
    event.preventDefault();
    navigate(
      role === "bql"
        ? "/bql/dashboard"
        : role === "technician"
          ? "/technician/tasks"
          : "/resident/report",
    );
  }
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1fr_1.05fr]">
      <div className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-20">
        <Brand />
        <div className="my-auto w-full max-w-md self-center py-12">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
            Không gian làm việc mô phỏng
          </p>
          <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-950">Chào mừng quay lại</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Chọn vai trò để tiếp tục sử dụng bản mẫu FixIt Agent.
          </p>
          <form className="mt-8 space-y-5" onSubmit={submit}>
            <label className="form-label">
              Địa chỉ email
              <input
                className="form-input"
                type="email"
                defaultValue="demo@sunriseresidence.com"
                required
              />
            </label>
            <label className="form-label">
              Mật khẩu
              <input className="form-input" type="password" defaultValue="prototype" required />
            </label>
            <label className="form-label">
              Vai trò
              <select className="form-input" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="bql">{uiLabels.roles.bqlIntro}</option>
                <option value="technician">{uiLabels.roles.technician}</option>
                <option value="resident">{uiLabels.roles.resident}</option>
              </select>
            </label>
            <Button className="w-full" type="submit">
              Tiếp tục <ArrowRight size={16} />
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-400">
            Chỉ dùng để truy cập bản mẫu. Không thực hiện xác thực tài khoản thật.
          </p>
        </div>
      </div>
      <div className="login-panel relative hidden overflow-hidden bg-slate-950 p-16 text-white lg:flex lg:flex-col lg:justify-end">
        <div className="relative z-10 max-w-lg">
          <span className="mb-6 grid size-12 place-items-center rounded-xl bg-indigo-400 text-slate-950">
            <BrainCircuit size={24} />
          </span>
          <h2 className="text-4xl font-bold leading-tight tracking-[-0.045em]">
            Điều phối sự cố có AI hỗ trợ cho công tác vận hành khu căn hộ
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            Kết nối các phản ánh rời rạc thành quy trình xử lý có phối hợp và kiểm soát, đồng thời
            giữ nguyên quyền quyết định của BQL.
          </p>
        </div>
      </div>
    </div>
  );
}

type SlaState = "On track" | "At risk" | "Breached";

interface DashboardIncident {
  id: string;
  title: string;
  location: string;
  priority: "Critical" | "High" | "Medium";
  status: "Pending Approval" | "Assigned" | "In Progress" | "Resolution Review" | "Resolved";
  tickets: number;
  team: string;
  slaState: SlaState;
  slaDetail: string;
  nextAction: string;
  actionLabel: string;
  actionRoute: string;
  approvalReason?: string;
}

const dashboardIncidents: DashboardIncident[] = [
  {
    id: "INC-024",
    title: "Rò rỉ nước ảnh hưởng nhiều căn hộ",
    location: "Tòa A · Tầng 12",
    priority: "Critical",
    status: "Pending Approval",
    tickets: 6,
    team: "Technical — Plumbing",
    slaState: "At risk",
    slaDetail: "1h 42m remaining",
    nextAction: "Xem xét đề xuất điều phối đội cấp thoát nước",
    actionLabel: "Xem phê duyệt",
    actionRoute: "/bql/incidents/INC-024/approval",
    approvalReason: "Nhiều căn hộ bị ảnh hưởng và nước vẫn đang rò rỉ",
  },
  {
    id: "INC-025",
    title: "Sự cố thang máy",
    location: "Tòa B · Thang máy chính",
    priority: "Critical",
    status: "Assigned",
    tickets: 2,
    team: "Vertical Transport",
    slaState: "Breached",
    slaDetail: "12m over target",
    nextAction: "Xác nhận tiến độ xử lý với đội được phân công",
    actionLabel: "Xem sự cố",
    actionRoute: "/bql/incidents/INC-025",
  },
  {
    id: "INC-026",
    title: "Sự cố điện tại khu vực chung",
    location: "Tòa A · Tầng 8",
    priority: "High",
    status: "In Progress",
    tickets: 2,
    team: "Technical — Electrical",
    slaState: "At risk",
    slaDetail: "54m remaining",
    nextAction: "Kiểm tra tiến độ trước khi SLA quá hạn",
    actionLabel: "Mở sự cố",
    actionRoute: "/bql/incidents/INC-026",
  },
  {
    id: "INC-027",
    title: "Cảnh báo nhiệt độ điều hòa",
    location: "Tòa C · Tầng 6",
    priority: "Medium",
    status: "Pending Approval",
    tickets: 4,
    team: "Technical — HVAC",
    slaState: "On track",
    slaDetail: "5h 08m remaining",
    nextAction: "Xem xét đề xuất điều phối đội điều hòa",
    actionLabel: "Xem đề xuất điều phối",
    actionRoute: "/bql/incidents/INC-027/routing",
    approvalReason: "Bốn phản ánh cho thấy vấn đề điều hòa có thể ảnh hưởng cùng một tầng",
  },
];

function AttentionMetricCard({
  value,
  label,
  detail,
  tone,
  onClick,
}: {
  value: string;
  label: string;
  detail: string;
  tone: "critical" | "approval" | "risk" | "open";
  onClick: () => void;
}) {
  const styles = {
    critical: { dot: "bg-red-500", value: "text-red-700", hover: "hover:border-red-200" },
    approval: { dot: "bg-violet-500", value: "text-violet-700", hover: "hover:border-violet-200" },
    risk: { dot: "bg-orange-500", value: "text-orange-700", hover: "hover:border-orange-200" },
    open: { dot: "bg-indigo-500", value: "text-indigo-700", hover: "hover:border-indigo-200" },
  }[tone];

  return (
    <button
      className={`rounded-xl border border-slate-200 bg-white p-5 text-left shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:shadow-md ${styles.hover}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className={`size-2.5 rounded-full ${styles.dot}`} />
        <ArrowRight size={15} className="text-slate-300" />
      </div>
      <p className={`mt-4 text-3xl font-bold tracking-[-0.04em] ${styles.value}`}>{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{label}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </button>
  );
}

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

function AttentionRow({
  item,
  navigate,
}: {
  item: DashboardIncident;
  navigate: ReturnType<typeof useNavigate>;
}) {
  return (
    <div className="grid gap-4 px-5 py-5 hover:bg-slate-50/70 lg:grid-cols-[minmax(0,1.25fr)_auto_minmax(210px,.8fr)_auto] lg:items-center">
      <div className="flex min-w-0 gap-3">
        <span
          className={`mt-1 h-10 w-1 shrink-0 rounded-full ${
            item.priority === "Critical" ? "bg-red-500" : "bg-orange-500"
          }`}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/bql/incidents/${item.id}`}
              className="font-mono text-xs font-bold text-indigo-600 hover:underline"
            >
              {item.id}
            </Link>
            <PriorityBadge priority={item.priority} />
            <StatusBadge status={item.status} context="incident" />
          </div>
          <Link
            to={`/bql/incidents/${item.id}`}
            className="mt-1.5 block truncate text-sm font-bold text-slate-950 hover:text-indigo-700"
          >
            {item.title}
          </Link>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={12} /> {item.location}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 lg:block lg:min-w-24">
        <SlaBadge state={item.slaState} />
        <p className="mt-1.5 text-xs font-medium text-slate-500">{formatSlaText(item.slaDetail)}</p>
        <p className="mt-1 text-xs text-slate-500">
          <Ticket size={12} className="mr-1 inline" />
          {item.tickets} phản ánh liên quan
        </p>
      </div>
      <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 px-3.5 py-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-600">
          Hành động tiếp theo
        </p>
        <p className="mt-1.5 text-xs font-semibold leading-5 text-slate-800">{item.nextAction}</p>
      </div>
      <Button onClick={() => navigate(item.actionRoute)} className="whitespace-nowrap">
        {item.actionLabel}
      </Button>
    </div>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { state: operationalState } = useOperationalState();
  const queueRoute = "/bql/incidents";
  const heroAction = {
    "Pending Approval": {
      nextAction: "Xem xét đề xuất điều phối đội cấp thoát nước",
      actionLabel: "Xem phê duyệt",
      actionRoute: "/bql/incidents/INC-024/approval",
    },
    Assigned: {
      nextAction: "Theo dõi phân công đã được BQL phê duyệt",
      actionLabel: "Theo dõi phân công",
      actionRoute: "/bql/incidents/INC-024",
    },
    "In Progress": {
      nextAction: "Theo dõi công việc tại hiện trường và rủi ro SLA",
      actionLabel: "Theo dõi xử lý",
      actionRoute: "/bql/incidents/INC-024",
    },
    "Resolution Review": {
      nextAction: "Xem xét kết quả do nhân viên kỹ thuật ghi nhận",
      actionLabel: "Xem kết quả",
      actionRoute: "/bql/incidents/INC-024",
    },
    Resolved: {
      nextAction: "Xem xét kết quả xử lý đã hoàn tất",
      actionLabel: "Xem kết quả hoàn tất",
      actionRoute: "/bql/incidents/INC-024",
    },
  }[operationalState.incidentStatus];
  const heroIncident: DashboardIncident = {
    ...dashboardIncidents[0],
    status: operationalState.incidentStatus,
    team: operationalState.assignedTeam ?? dashboardIncidents[0].team,
    ...heroAction,
  };
  const liveAttentionIncidents = [heroIncident, dashboardIncidents[1], dashboardIncidents[3]];
  const liveCriticalIncidents = [heroIncident, dashboardIncidents[1]];
  const livePendingIncidents =
    operationalState.routingStatus === "Pending Approval" ||
    operationalState.routingStatus === "Sent Back"
      ? [heroIncident, dashboardIncidents[3]]
      : [dashboardIncidents[3]];
  const liveSlaIncidents = [heroIncident, ...dashboardIncidents.slice(1)];
  const heroActivity = {
    "Pending Approval": "Đã đề xuất điều phối đội cấp thoát nước",
    Assigned: "BQL đã phê duyệt phân công đội cấp thoát nước",
    "In Progress": "Nhân viên kỹ thuật đã bắt đầu xử lý",
    "Resolution Review": "Chờ BQL xem xét kết quả do nhân viên kỹ thuật ghi nhận",
    Resolved: "BQL đã xác nhận kết quả xử lý",
  }[operationalState.incidentStatus];

  return (
    <>
      <PageHeader
        eyebrow="Sunrise Residence"
        title="Tổng quan vận hành"
        description="Theo dõi sự cố, phê duyệt và rủi ro SLA trong toàn khu căn hộ."
        actions={
          <Button onClick={() => navigate(queueRoute)}>
            Xem danh sách sự cố <ArrowRight size={16} />
          </Button>
        }
      />

      <section aria-labelledby="attention-summary">
        <div className="mb-3 flex items-center justify-between">
          <h2
            id="attention-summary"
            className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500"
          >
            Tổng quan cần xử lý
          </h2>
          <span className="text-xs text-slate-400">Vừa cập nhật</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AttentionMetricCard
            value="2"
            label="Sự cố khẩn cấp"
            detail="Cần xử lý ngay"
            tone="critical"
            onClick={() => navigate(queueRoute)}
          />
          <AttentionMetricCard
            value={
              operationalState.routingStatus === "Pending Approval" ||
              operationalState.routingStatus === "Sent Back"
                ? "3"
                : "2"
            }
            label="Chờ BQL phê duyệt"
            detail="Cần BQL quyết định"
            tone="approval"
            onClick={() => navigate(queueRoute)}
          />
          <AttentionMetricCard
            value="4"
            label="Có nguy cơ trễ SLA"
            detail="Cần sớm có hướng xử lý"
            tone="risk"
            onClick={() => navigate(queueRoute)}
          />
          <AttentionMetricCard
            value="12"
            label="Sự cố đang mở"
            detail="Đang được theo dõi xử lý"
            tone="open"
            onClick={() => navigate(queueRoute)}
          />
        </div>
      </section>

      <Card className="mt-6 overflow-hidden border-slate-300">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-orange-600" />
              <h2 className="text-base font-bold text-slate-950">Cần xử lý</h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Các sự cố ưu tiên cao, được sắp xếp theo mức độ khẩn cấp.
            </p>
          </div>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-inset ring-orange-600/15">
            {liveAttentionIncidents.length} việc cần xử lý
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {liveAttentionIncidents.map((item) => (
            <AttentionRow key={item.id} item={item} navigate={navigate} />
          ))}
        </div>
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden">
          <SectionHeading title="Sự cố khẩn cấp" meta="Cần xử lý ngay" />
          <div className="divide-y divide-slate-100">
            {liveCriticalIncidents.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to={`/bql/incidents/${item.id}`}
                      className="font-mono text-xs font-bold text-indigo-600 hover:underline"
                    >
                      {item.id}
                    </Link>
                    <p className="mt-1 truncate text-sm font-bold text-slate-900">{getBqlIncidentTitle(item.title)}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.location}</p>
                  </div>
                  <PriorityBadge priority={item.priority} />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <StatusBadge status={item.status} context="incident" />
                  <span>·</span>
                  <span>{item.tickets} phản ánh</span>
                  <span>·</span>
                  <span className="font-medium text-slate-700">{getBqlTeamLabel(item.team)}</span>
                </div>
                <Button
                  className="mt-3 w-full"
                  variant="secondary"
                  onClick={() => navigate(`/bql/incidents/${item.id}`)}
                >
                  Xem xét
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden border-violet-200">
          <SectionHeading title="Chờ BQL phê duyệt" meta="Cần BQL quyết định" />
          <div className="border-b border-violet-100 bg-violet-50/60 px-4 py-3">
            <p className="flex items-center gap-2 text-xs font-semibold text-violet-800">
              <BrainCircuit size={15} />
              AI phân tích → Hệ thống kiểm tra → BQL quyết định
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {livePendingIncidents.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs font-bold text-indigo-600">{item.id}</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{getBqlIncidentTitle(item.title)}</p>
                  </div>
                  <PriorityBadge priority={item.priority} />
                </div>
                <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-indigo-600">
                    Đề xuất của AI
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-800">{getBqlTeamLabel(item.team)}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{item.approvalReason}</p>
                </div>
                <Button
                  className="mt-3 w-full"
                  onClick={() => navigate(`/bql/incidents/${item.id}/approval`)}
                >
                  Xem phê duyệt
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <SectionHeading title="Rủi ro SLA" meta="Thời gian vận hành mô phỏng" />
          <div className="divide-y divide-slate-100">
            {liveSlaIncidents
              .filter((item) => item.slaState !== "On track")
              .map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Link
                        to={`/bql/incidents/${item.id}`}
                        className="font-mono text-xs font-bold text-indigo-600 hover:underline"
                      >
                        {item.id}
                      </Link>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{getBqlIncidentTitle(item.title)}</p>
                    </div>
                    <SlaBadge state={item.slaState} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      {formatSlaText(item.slaDetail)}
                    </span>
                    <span className="text-slate-500">{getBqlTeamLabel(item.team)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        item.slaState === "Breached" ? "w-full bg-red-500" : "w-4/5 bg-orange-500"
                      }`}
                    />
                  </div>
                  <button
                    className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    onClick={() => navigate(`/bql/incidents/${item.id}`)}
                  >
                    Mở sự cố <ArrowRight size={13} className="ml-1 inline" />
                  </button>
                </div>
              ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <SectionHeading title="Hoạt động gần đây" meta="Cập nhật sự cố" />
        <div className="grid divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            ["INC-026", "Đội điện bắt đầu xử lý", "8 min ago"],
            ["INC-024", heroActivity, "Just now"],
            ["INC-025", "SLA đã quá hạn", "24 min ago"],
          ].map(([id, activity, time]) => (
            <Link
              key={id}
              to={`/bql/incidents/${id}`}
              className="flex items-start gap-3 p-4 hover:bg-slate-50"
            >
              <IncidentMark />
              <div>
                <p className="text-xs font-bold text-indigo-600">{id}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{activity}</p>
                <p className="mt-1 text-xs text-slate-400">{getBqlRelativeTime(time)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </>
  );
}

export function TicketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Phản ánh của cư dân"
        title={uiLabels.titles.residentTickets}
        description="Mỗi phản ánh là một hồ sơ riêng của cư dân. Nhiều phản ánh có thể được liên kết trong cùng một sự cố vận hành."
        actions={<Button variant="secondary">Xuất danh sách</Button>}
      />
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
        <Ticket size={17} className="text-slate-500" />
        <strong className="text-slate-800">Góc nhìn phản ánh</strong>
        <span className="text-slate-300">·</span> Mỗi phản ánh vẫn được theo dõi riêng kể cả khi
        có liên quan đến một sự cố.
      </div>
      <Table
        headers={[
          "Mã phản ánh",
          "Nội dung phản ánh",
          "Vị trí",
          "Nhóm vấn đề",
          "Mức độ ưu tiên",
          "Trạng thái",
          "Thời gian gửi",
          "Sự cố liên quan",
        ]}
      >
        {tickets.map((ticket) => (
          <TicketRow key={ticket.id} ticket={ticket} />
        ))}
      </Table>
    </>
  );
}

function TicketRow({ ticket }: { ticket: TicketType }) {
  return (
    <tr className="hover:bg-slate-50/80">
      <td className="px-5 py-4">
        <span className="font-mono text-xs font-bold text-slate-600">{ticket.id}</span>
      </td>
      <td className="px-5 py-4 text-sm font-semibold text-slate-900">{getBqlTicketIssue(ticket.issue)}</td>
      <td className="px-5 py-4 text-sm text-slate-600">{getBqlLocationLabel(ticket.location)}</td>
      <td className="px-5 py-4 text-sm text-slate-600">{getBqlCategoryLabel(ticket.category)}</td>
      <td className="px-5 py-4">
        <PriorityBadge priority={ticket.priority} />
      </td>
      <td className="px-5 py-4">
        <StatusBadge status={ticket.status} context="ticket" />
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-500">{getBqlRelativeTime(ticket.created)}</td>
      <td className="px-5 py-4">
        {ticket.incident ? (
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:underline"
            to={`/bql/incidents/${ticket.incident}`}
          >
            <Gauge size={14} />
            {ticket.incident}
          </Link>
        ) : (
          <span className="text-sm text-slate-400">Chưa liên kết</span>
        )}
      </td>
    </tr>
  );
}

export function IncidentsPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        eyebrow="Sự cố vận hành"
        title={uiLabels.titles.incidentQueue}
        description="Ưu tiên, phê duyệt và điều phối ứng phó cho các sự cố có liên quan đến nhiều phản ánh của cư dân."
        actions={
          <Button onClick={() => navigate("/bql/incidents/INC-024/approval")}>
            Xem phê duyệt đang chờ
          </Button>
        }
      />
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50/60 px-4 py-3 text-sm text-indigo-800">
        <Gauge size={17} />
        <strong>Góc nhìn sự cố</strong>
        <span className="text-indigo-300">·</span> Một sự cố có thể điều phối việc xử lý nhiều
        phản ánh liên quan.
      </div>
      <Table
        headers={[
          "Sự cố",
          "Vị trí ghi nhận",
          "Phản ánh liên quan",
          "Mức độ ưu tiên",
          "Trạng thái",
          "Đội đang xử lý",
          "SLA",
        ]}
      >
        {incidents.map((incident) => (
          <IncidentRow key={incident.id} incident={incident} />
        ))}
      </Table>
    </>
  );
}

function IncidentRow({ incident }: { incident: Incident }) {
  const navigate = useNavigate();
  const slaColors = {
    safe: "text-emerald-700",
    warning: "text-orange-700",
    danger: "text-red-700",
  };
  return (
    <tr
      className="group cursor-pointer hover:bg-indigo-50/30"
      tabIndex={0}
      onClick={() => navigate(`/bql/incidents/${incident.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") navigate(`/bql/incidents/${incident.id}`);
      }}
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <IncidentMark />
          <div>
            <p className="font-mono text-xs font-bold text-indigo-600">{incident.id}</p>
            <p className="mt-1 whitespace-nowrap text-sm font-bold text-slate-900">
              {getBqlIncidentTitle(incident.title)}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-sm text-slate-600">{getBqlLocationLabel(incident.officialLocation)}</td>
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          <Ticket size={13} />
          {incident.tickets} phản ánh
        </span>
      </td>
      <td className="px-5 py-4">
        <PriorityBadge priority={incident.priority} />
      </td>
      <td className="px-5 py-4">
        <StatusBadge status={incident.status} context="incident" />
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
        {getBqlTeamLabel(incident.currentTeam)}
      </td>
      <td
        className={`px-5 py-4 whitespace-nowrap text-sm font-bold ${slaColors[incident.slaTone]}`}
      >
        <Clock3 size={14} className="mr-1.5 inline" />
        {formatSlaText(incident.sla)}
      </td>
    </tr>
  );
}

function getIncident(id?: string) {
  return incidents.find((item) => item.id === id) ?? incidents[0];
}

export function IncidentDetailPage() {
  return <IncidentIntelligencePage />;
}

export function RoutingPage() {
  return <RoutingRecommendationPage />;
}

export function ApprovalPage() {
  return <RoutingApprovalPage />;
}

export function TasksPage() {
  return <TechnicianTaskQueuePage />;
}

export function TaskDetailPage() {
  return <TechnicianExecutionPage />;
}

export function ReportPage() {
  return <ResidentReportPage />;
}

export function ResidentTicketPage() {
  return <ResidentIssueStatusPage />;
}

export function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <div className="text-center">
        <p className="font-mono text-sm font-bold text-indigo-600">404</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">{uiLabels.errors.notFoundTitle}</h1>
        <p className="mt-2 text-slate-500">{uiLabels.errors.notFoundDescription}</p>
        <Link to="/">
          <Button className="mt-6">{uiLabels.errors.returnToRoleSelector}</Button>
        </Link>
      </div>
    </div>
  );
}

export function BqlRedirect() {
  return <Navigate to="/bql/dashboard" replace />;
}
export function TechRedirect() {
  return <Navigate to="/technician/tasks" replace />;
}
export function ResidentRedirect() {
  return <Navigate to="/resident/report" replace />;
}
