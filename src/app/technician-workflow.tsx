import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Play,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { Button, Card, DetailRow, PriorityBadge, SectionHeading } from "./components";
import {
  incidents,
  tickets,
  type AffectedAreaConfirmation,
  type ResolutionStatus,
  type TaskStatus,
  type TechnicianTask,
} from "./data";
import { useTechnicianTasks } from "./technician-task-state";
import {
  formatSlaText,
  getAffectedAreaLabel,
  getBqlIncidentTitle,
  getBqlLocationLabel,
  getBqlRelativeTime,
  getBqlTeamLabel,
  getBqlTicketIssue,
  getProvenanceLabel,
  getResolutionStatusLabel,
  getTechnicianChecklistLabel,
  getTechnicianEscalationReasonLabel,
  getTechnicianTaskTitle,
  getTaskStatusLabel,
  uiLabels,
} from "./ui-language";

const checklistItems = [
  "Confirm active leak",
  "Identify visible source",
  "Check affected area",
  "Assess immediate property damage",
  "Check nearby units / common area",
];

const escalationReasons = [
  "Requires specialist",
  "Access unavailable",
  "Source not identified",
  "Safety concern",
  "Requires BQL review",
  "Other",
];

export function TechnicianTaskQueuePage() {
  const navigate = useNavigate();
  const { tasks, startTask } = useTechnicianTasks();
  const heroTask = tasks.find((task) => task.incidentId === "INC-024") ?? tasks[0];
  const otherTasks = tasks.filter((task) => task.id !== heroTask.id);

  function startAndOpen(task: TechnicianTask) {
    startTask(task.id);
    navigate(`/technician/tasks/${task.id}`);
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">
          Không gian làm việc của nhân viên kỹ thuật
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-slate-950">
          {uiLabels.titles.tasks}
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Các công việc đã được BQL phân công cho nhân viên kỹ thuật.
        </p>
      </div>

      <section aria-labelledby="priority-task">
        <div className="mb-3 flex items-center justify-between">
          <h2
            id="priority-task"
            className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500"
          >
            Công việc ưu tiên
          </h2>
          <span className="text-xs text-slate-400">Danh sách thực hiện</span>
        </div>
        <Card className="overflow-hidden border-red-200">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <PriorityBadge priority={heroTask.priority} />
                <TaskStatusBadge status={heroTask.status} />
                <Provenance tone="human">
                  {getProvenanceLabel("Human-approved assignment")}
                </Provenance>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-950">
                {getTechnicianTaskTitle(heroTask.title)}
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin size={15} /> {getBqlLocationLabel(heroTask.location)}
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-800">
                {heroTask.incidentId} · {getBqlIncidentTitle(heroTask.incidentTitle)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {heroTask.sourceTicketId} · 6 phản ánh liên quan
              </p>
            </div>
            <div className="border-t border-slate-200 bg-slate-50/70 p-5 lg:border-l lg:border-t-0">
              <QueueFact label="Đội kỹ thuật" value={getBqlTeamLabel(heroTask.assignedTeam)} />
              <QueueFact
                label="Nguồn phân công"
                value={getProvenanceLabel("BQL-approved routing")}
              />
              <QueueFact label={uiLabels.sla.label} value={formatSlaText(heroTask.sla)} />
              {heroTask.status === "Assigned" ? (
                <Button className="mt-4 w-full" onClick={() => startAndOpen(heroTask)}>
                  <Play size={15} /> Bắt đầu xử lý
                </Button>
              ) : (
                <Button
                  className="mt-4 w-full"
                  onClick={() => navigate(`/technician/tasks/${heroTask.id}`)}
                >
                  Mở công việc <ArrowRight size={15} />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-6" aria-labelledby="other-tasks">
        <div className="mb-3 flex items-center justify-between">
          <h2
            id="other-tasks"
            className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500"
          >
            Công việc khác
          </h2>
          <span className="text-xs text-slate-400">{otherTasks.length} công việc</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {otherTasks.map((task) => (
            <Card key={task.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={task.priority} />
                    <TaskStatusBadge status={task.status} />
                  </div>
                  <h3 className="mt-3 truncate text-sm font-bold text-slate-900">
                    {getTechnicianTaskTitle(task.title)}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {task.incidentId} · {getBqlLocationLabel(task.location)}
                  </p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Wrench size={17} />
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    {getBqlTeamLabel(task.assignedTeam)}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {getProvenanceLabel("BQL-approved routing")}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/technician/tasks/${task.id}`)}
                >
                  Mở công việc
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

export function TechnicianExecutionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, startTask, recordResolution } = useTechnicianTasks();
  const task = tasks.find((item) => item.id === id) ?? tasks[0];
  const incident = incidents.find((item) => item.id === task.incidentId) ?? incidents[0];
  const supportingReports = tickets
    .filter((ticket) => ticket.incident === task.incidentId)
    .slice(0, 4);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [showResolutionForm, setShowResolutionForm] = useState(false);
  const [resolutionStatus, setResolutionStatus] = useState<ResolutionStatus>("Resolved");
  const [resolutionNote, setResolutionNote] = useState("");
  const [finding, setFinding] = useState("");
  const [affectedArea, setAffectedArea] = useState<AffectedAreaConfirmation>(
    "Needs further inspection",
  );
  const [escalationReason, setEscalationReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const completed = task.status === "Resolved" || task.status === "Needs Follow-up";
  const resolutionNeedsReason = resolutionStatus !== "Resolved";
  const resolutionValid =
    resolutionStatus === "Resolved"
      ? resolutionNote.trim().length > 0
      : escalationReason.length > 0;

  function toggleChecklist(item: string) {
    setCheckedItems((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item],
    );
  }

  function submitResolution() {
    setSubmitted(true);
    if (!resolutionValid) return;
    recordResolution(task.id, {
      resolutionStatus,
      resolutionNote,
      finding,
      affectedAreaConfirmed: affectedArea,
      escalationReason: resolutionNeedsReason ? escalationReason : undefined,
    });
    setShowResolutionForm(false);
  }

  return (
    <>
      <Link
        to="/technician/tasks"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Quay lại danh sách công việc
      </Link>

      <Card className="mb-6 overflow-hidden border-slate-300">
        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600">{task.incidentId}</span>
              <span className="text-xs text-slate-300">·</span>
              <span className="font-mono text-xs font-bold text-slate-500">{task.id}</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
              {getTechnicianTaskTitle(task.title)}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} /> {getBqlLocationLabel(task.location)}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <PriorityBadge priority={task.priority} />
            <TaskStatusBadge status={task.status} />
            <Provenance tone="human">
              {getProvenanceLabel("Human-approved assignment")}
            </Provenance>
          </div>
        </div>
        <div className="grid border-t border-slate-200 bg-slate-50/70 sm:grid-cols-3">
          <HeaderFact label="Đội kỹ thuật" value={getBqlTeamLabel(task.assignedTeam)} />
          <HeaderFact
            label="Nguồn phân công"
            value={getProvenanceLabel("BQL-approved routing")}
          />
          <HeaderFact label={uiLabels.sla.label} value={formatSlaText(task.sla)} />
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
        <main className="space-y-6">
          <Card className="overflow-hidden">
            <SectionHeading title="Bối cảnh sự cố" meta="Chỉ xem, không chỉnh sửa" />
            <div className="grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              <ContextFact label="Sự cố" value={getBqlIncidentTitle(incident.title)} />
              <ContextFact
                label="Vị trí ghi nhận"
                value={getBqlLocationLabel(incident.officialLocation)}
              />
              <ContextFact
                label="Phạm vi ảnh hưởng"
                value={getBqlLocationLabel(
                  incident.correlatedAffectedArea ?? incident.officialLocation,
                )}
                provenance="Correlation-derived"
              />
              <ContextFact label="Các phản ánh liên quan" value={String(incident.tickets)} />
              <ContextFact label="Mức độ ưu tiên" value={uiLabels.priorities[incident.priority]} />
              <ContextFact label="Trạng thái SLA" value={formatSlaText(task.sla)} />
            </div>
            <div className="flex items-start gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4">
              <ShieldAlert size={17} className="mt-0.5 shrink-0 text-slate-500" />
              <p className="text-xs leading-5 text-slate-500">
                Thông tin này chỉ để tham khảo. BQL chịu trách nhiệm điều phối và quyết định đóng sự
                cố.
              </p>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading
              title="Các phản ánh liên quan đến công việc này"
              meta={`Hiển thị ${supportingReports.length} trong ${incident.tickets} phản ánh`}
            />
            <div className="divide-y divide-slate-100">
              {supportingReports.map((report) => (
                <div
                  key={report.id}
                  className="grid gap-2 px-5 py-4 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:items-center"
                >
                  <div>
                    <p className="font-mono text-xs font-bold text-slate-600">{report.id}</p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {getBqlRelativeTime(report.created)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {getBqlTicketIssue(report.issue)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {getBqlLocationLabel(report.location)}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
                    Bằng chứng phục vụ xử lý
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading
              title="Kiểm tra ban đầu"
              meta={`${checkedItems.length}/${checklistItems.length} mục hoàn tất`}
            />
            <div className="divide-y divide-slate-100">
              {checklistItems.map((item) => {
                const checked = checkedItems.includes(item);
                return (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-3 px-5 py-3.5 hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleChecklist(item)}
                      className="size-4 accent-blue-600"
                      disabled={completed}
                    />
                    <span
                      className={`text-sm font-medium ${
                        checked ? "text-slate-400 line-through" : "text-slate-800"
                      }`}
                    >
                      {getTechnicianChecklistLabel(item)}
                    </span>
                  </label>
                );
              })}
            </div>
          </Card>

          <Card className="overflow-hidden border-amber-200">
            <div className="flex items-start gap-3 bg-amber-50 p-5">
              <ShieldAlert size={20} className="mt-0.5 shrink-0 text-amber-700" />
              <div>
                <h2 className="text-sm font-bold text-amber-950">Lưu ý an toàn</h2>
                <p className="mt-1 text-sm leading-6 text-amber-900">
                  Nếu nước đang rò rỉ tới thiết bị điện, hãy dừng công việc và báo ngay theo quy trình
                  hiện hành. Không thực hiện thao tác không an toàn.
                </p>
                <p className="mt-2 text-[11px] text-amber-700">
                  Nhắc nhở cố định · Hệ thống không tự đưa ra quyết định an toàn
                </p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading title="Nguồn thông tin" meta="Bối cảnh chỉ để tham khảo" />
            <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
              <ProvenanceFact
                label="Nhận định tham khảo"
                value="Rò rỉ nước đang diễn ra"
                provenance="AI-generated"
                tone="ai"
              />
              <ProvenanceFact
                label="Vị trí ghi nhận"
                value={getBqlLocationLabel(incident.officialLocation)}
                provenance="System record"
              />
              <ProvenanceFact
                label="Đội được phân công"
                value={getBqlTeamLabel(task.assignedTeam)}
                provenance="Human decision"
                tone="human"
              />
            </div>
          </Card>
        </main>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          {completed ? (
            <ResolutionResult task={task} onQueue={() => navigate("/technician/tasks")} />
          ) : (
            <Card accent className="overflow-hidden">
              <div className="border-b border-blue-100 bg-blue-50/60 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-blue-600">
                  Công việc hiện tại
                </p>
                <h2 className="mt-1.5 text-lg font-bold text-slate-950">
                  {task.status === "Assigned" ? "Sẵn sàng bắt đầu" : "Đang xử lý"}
                </h2>
              </div>
              <div className="p-5">
                {task.status === "Assigned" ? (
                  <>
                    <p className="text-sm leading-6 text-slate-500">
                      Bắt đầu xử lý khi bạn sẵn sàng tiến hành kiểm tra ban đầu.
                    </p>
                    <Button className="mt-5 w-full" onClick={() => startTask(task.id)}>
                      <Play size={15} /> Bắt đầu xử lý
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={17} className="text-emerald-700" />
                        <p className="text-sm font-bold text-emerald-900">Đã bắt đầu công việc</p>
                      </div>
                      <dl className="mt-3 space-y-2 text-xs">
                        <StateRow label="Trạng thái" value={getTaskStatusLabel("In Progress")} />
                        <StateRow label="Người bắt đầu" value={uiLabels.roles.technician} />
                        <StateRow
                          label="Thời điểm"
                          value={getBqlRelativeTime(task.startedAt ?? "Prototype state")}
                        />
                      </dl>
                      <div className="mt-3">
                        <Provenance tone="technician">
                          {getProvenanceLabel("Technician action")}
                        </Provenance>
                      </div>
                    </div>
                    {!showResolutionForm && (
                      <Button className="mt-5 w-full" onClick={() => setShowResolutionForm(true)}>
                        <FileText size={15} /> Ghi nhận kết quả xử lý
                      </Button>
                    )}
                  </>
                )}

                {showResolutionForm && (
                  <ResolutionForm
                    resolutionStatus={resolutionStatus}
                    setResolutionStatus={setResolutionStatus}
                    resolutionNote={resolutionNote}
                    setResolutionNote={setResolutionNote}
                    finding={finding}
                    setFinding={setFinding}
                    affectedArea={affectedArea}
                    setAffectedArea={setAffectedArea}
                    escalationReason={escalationReason}
                    setEscalationReason={setEscalationReason}
                    submitted={submitted}
                    valid={resolutionValid}
                    onSubmit={submitResolution}
                    onCancel={() => setShowResolutionForm(false)}
                  />
                )}
              </div>
            </Card>
          )}

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Clock3 size={16} className="text-orange-600" />
              <p className="text-xs font-bold text-slate-800">
                {uiLabels.sla.label} · {formatSlaText(task.sla)}
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-500">Thời gian SLA mô phỏng</p>
          </Card>

          <Link
            to={`/bql/incidents/${task.incidentId}`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Xem sự cố <ArrowRight size={15} />
          </Link>
        </aside>
      </div>
    </>
  );
}

function ResolutionForm({
  resolutionStatus,
  setResolutionStatus,
  resolutionNote,
  setResolutionNote,
  finding,
  setFinding,
  affectedArea,
  setAffectedArea,
  escalationReason,
  setEscalationReason,
  submitted,
  valid,
  onSubmit,
  onCancel,
}: {
  resolutionStatus: ResolutionStatus;
  setResolutionStatus: (value: ResolutionStatus) => void;
  resolutionNote: string;
  setResolutionNote: (value: string) => void;
  finding: string;
  setFinding: (value: string) => void;
  affectedArea: AffectedAreaConfirmation;
  setAffectedArea: (value: AffectedAreaConfirmation) => void;
  escalationReason: string;
  setEscalationReason: (value: string) => void;
  submitted: boolean;
  valid: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const requiresEscalation = resolutionStatus !== "Resolved";
  return (
    <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
      <label className="form-label">
        Trạng thái xử lý
        <select
          className="form-input"
          value={resolutionStatus}
          onChange={(event) => setResolutionStatus(event.target.value as ResolutionStatus)}
        >
          <option value="Resolved">{getResolutionStatusLabel("Resolved", "technician")}</option>
          <option value="Unable to resolve">
            {getResolutionStatusLabel("Unable to resolve", "technician")}
          </option>
          <option value="Requires follow-up">
            {getResolutionStatusLabel("Requires follow-up", "technician")}
          </option>
        </select>
      </label>
      <label className="form-label">
        Mô tả công việc đã thực hiện
        <textarea
          className="form-input min-h-24 resize-none"
          value={resolutionNote}
          onChange={(event) => setResolutionNote(event.target.value)}
          placeholder="Mô tả những gì đã thực hiện và kết quả ghi nhận được."
        />
      </label>
      <label className="form-label">
        Ghi nhận hiện trạng <span className="font-normal text-slate-400">(không bắt buộc)</span>
        <textarea
          className="form-input min-h-20 resize-none"
          value={finding}
          onChange={(event) => setFinding(event.target.value)}
          placeholder="Mô tả tình trạng có thể quan sát tại hiện trường."
        />
      </label>
      <label className="form-label">
        Xác nhận phạm vi ảnh hưởng
        <select
          className="form-input"
          value={affectedArea}
          onChange={(event) => setAffectedArea(event.target.value as AffectedAreaConfirmation)}
        >
          <option value="Yes">{getAffectedAreaLabel("Yes")}</option>
          <option value="No">{getAffectedAreaLabel("No")}</option>
          <option value="Needs further inspection">
            {getAffectedAreaLabel("Needs further inspection")}
          </option>
        </select>
      </label>
      {requiresEscalation && (
        <label className="form-label">
          Lý do cần xử lý tiếp
          <select
            className="form-input"
            value={escalationReason}
            onChange={(event) => setEscalationReason(event.target.value)}
          >
            <option value="">Chọn lý do</option>
            {escalationReasons.map((reason) => (
              <option key={reason} value={reason}>
                {getTechnicianEscalationReasonLabel(reason)}
              </option>
            ))}
          </select>
        </label>
      )}
      {submitted && !valid && (
        <p className="text-xs font-semibold text-red-600" role="alert">
          {requiresEscalation
            ? "Chọn lý do trước khi gửi BQL xem xét."
            : "Bổ sung mô tả kết quả xử lý trước khi ghi nhận hoàn tất công việc."}
        </p>
      )}
      <Button className="w-full" onClick={onSubmit}>
        {requiresEscalation ? "Gửi BQL xem xét" : "Ghi nhận hoàn tất công việc"}
      </Button>
      <Button className="w-full" variant="ghost" onClick={onCancel}>
        Hủy
      </Button>
    </div>
  );
}

function ResolutionResult({ task, onQueue }: { task: TechnicianTask; onQueue: () => void }) {
  const resolved = task.status === "Resolved";
  return (
    <Card className={`overflow-hidden ${resolved ? "border-emerald-200" : "border-amber-200"}`}>
      <div className={`p-5 ${resolved ? "bg-emerald-50" : "bg-amber-50"}`}>
        <span
          className={`grid size-10 place-items-center rounded-full bg-white ${
            resolved ? "text-emerald-700" : "text-amber-700"
          }`}
        >
          {resolved ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
        </span>
        <h2 className="mt-3 text-lg font-bold text-slate-950">
          {resolved ? "Đã ghi nhận hoàn tất" : "Cần xử lý tiếp"}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {resolved
            ? "Kết quả xử lý đã được nhân viên kỹ thuật ghi nhận."
            : "Đã gửi BQL xem xét. Chưa tạo phân công mới."}
        </p>
      </div>
      <div className="p-5">
        <Provenance tone="technician">{getProvenanceLabel("Technician action")}</Provenance>
        <dl className="mt-3">
          <DetailRow label="Trạng thái">
            <TaskStatusBadge status={task.status} />
          </DetailRow>
          <DetailRow label="Người ghi nhận">Daniel Kim</DetailRow>
          <DetailRow label="Kết quả xử lý">
            {task.resolutionStatus
              ? getResolutionStatusLabel(task.resolutionStatus, "technician")
              : undefined}
          </DetailRow>
          <DetailRow label="Mô tả công việc đã thực hiện">
            {task.resolutionNote || "Chưa được cung cấp"}
          </DetailRow>
          <DetailRow label="Ghi nhận hiện trạng">
            {task.finding || "Chưa được cung cấp"}
          </DetailRow>
          <DetailRow label="Phạm vi ảnh hưởng">
            {task.affectedAreaConfirmed
              ? getAffectedAreaLabel(task.affectedAreaConfirmed)
              : "Chưa được cung cấp"}
          </DetailRow>
          {task.escalationReason && (
            <DetailRow label="Lý do cần xử lý tiếp">
              {getTechnicianEscalationReasonLabel(task.escalationReason)}
            </DetailRow>
          )}
          <DetailRow label="Thời điểm">
            {task.resolvedAt ? getBqlRelativeTime(task.resolvedAt) : "Chưa được cung cấp"}
          </DetailRow>
        </dl>
        <div className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50/50 p-3">
          <p className="text-xs font-bold text-indigo-900">
            {resolved
              ? "Bước tiếp theo: BQL xem xét kết quả xử lý"
              : "Bước tiếp theo: BQL xem xét yêu cầu xử lý tiếp"}
          </p>
          <p className="mt-1 text-xs leading-5 text-indigo-700">
            {resolved
              ? "Ghi nhận hoàn tất công việc không đóng sự cố. BQL sẽ xem xét kết quả và quyết định việc đóng sự cố."
              : "Công việc chưa thể hoàn tất. BQL sẽ xem xét lý do và thông tin đã ghi nhận để quyết định bước tiếp theo."}
          </p>
        </div>
        <Button className="mt-5 w-full" onClick={onQueue}>
          Quay lại danh sách công việc
        </Button>
      </div>
    </Card>
  );
}

function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const styles = {
    Assigned: "bg-blue-50 text-blue-700 ring-blue-600/15",
    "In Progress": "bg-amber-50 text-amber-700 ring-amber-600/15",
    Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    "Needs Follow-up": "bg-orange-50 text-orange-700 ring-orange-600/15",
  }[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}
    >
      <span className="mr-1.5 size-1.5 rounded-full bg-current opacity-75" />
      {getTaskStatusLabel(status)}
    </span>
  );
}

function Provenance({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "ai" | "human" | "system" | "technician";
}) {
  const styles = {
    ai: "bg-indigo-100 text-indigo-700",
    human: "bg-amber-100 text-amber-800",
    system: "bg-slate-100 text-slate-600",
    technician: "bg-blue-100 text-blue-700",
  }[tone];
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.07em] ${styles}`}
    >
      {typeof children === "string" ? getProvenanceLabel(children) : children}
    </span>
  );
}

function QueueFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-400">{label}</p>
      <p className="mt-1 text-xs font-bold text-slate-800">{value}</p>
    </div>
  );
}

function HeaderFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-slate-200 px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-400">{label}</p>
      <p className="mt-1.5 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ContextFact({
  label,
  value,
  provenance = "System record",
}: {
  label: string;
  value: string;
  provenance?: string;
}) {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-400">{label}</p>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-slate-500">
          {getProvenanceLabel(provenance)}
        </span>
      </div>
      <p className="mt-2 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ProvenanceFact({
  label,
  value,
  provenance,
  tone = "system",
}: {
  label: string;
  value: string;
  provenance: string;
  tone?: "ai" | "human" | "system";
}) {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-400">{label}</p>
        <Provenance tone={tone}>{provenance}</Provenance>
      </div>
      <p className="mt-2 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function StateRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-emerald-700">{label}</dt>
      <dd className="font-bold text-emerald-900">{value}</dd>
    </div>
  );
}
