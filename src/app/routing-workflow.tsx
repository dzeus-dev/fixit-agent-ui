import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Route,
  ShieldCheck,
  UserCheck,
  Wrench,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { Button, Card, DetailRow, PriorityBadge, SectionHeading, StatusBadge } from "./components";
import { incidents } from "./data";
import { useRoutingDecisions } from "./routing-decision";
import {
  formatSlaText,
  getBqlDecisionReasonLabel,
  getBqlTeamLabel,
  getProvenanceLabel,
  getBqlRelativeTime,
  getStatusLabel,
} from "./ui-language";

const teamOptions = [
  "Technical — Plumbing",
  "Technical — General Maintenance",
  "Building Engineering",
];

const verificationChecks = [
  ["Kỹ năng cần thiết", "Cấp thoát nước"],
  ["Năng lực đội kỹ thuật", "Cấp thoát nước", true],
  ["Phạm vi phụ trách", "Có", true],
  ["Vị trí sự cố", "Tòa A / Tầng 12", true],
  ["Điều kiện quy trình", "Trạng thái cho phép phân công", true],
] as const;

export function RoutingRecommendationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = incidents.find((item) => item.id === id) ?? incidents[0];
  const { decisions, selectTeam } = useRoutingDecisions();
  const decision = decisions[incident.id];
  const selectedTeam = decision.selectedTeam;

  return (
    <>
      <Link
        to={`/bql/incidents/${incident.id}`}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Quay lại sự cố
      </Link>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-600">
            {incident.id} · Điều phối vận hành
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-slate-950">
            Đề xuất điều phối
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Xem xét năng lực được đề xuất và các điều kiện hệ thống trước khi BQL phê duyệt.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PriorityBadge priority={incident.priority} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 ring-1 ring-inset ring-orange-600/15">
            <Clock3 size={12} /> {formatSlaText("At risk · " + incident.sla)}
          </span>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="space-y-6">
          <Card accent className="overflow-hidden">
            <div className="flex flex-col gap-5 border-b border-indigo-100 bg-indigo-50/50 p-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white">
                  <Wrench size={21} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-600">
                      Đề xuất của AI
                    </p>
                    <Provenance tone="ai">AI-generated</Provenance>
                  </div>
                  <h2 className="mt-1.5 text-xl font-bold text-slate-950">
                    {getBqlTeamLabel(incident.recommendedTeam)}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                    Các triệu chứng được phản ánh và nhóm vấn đề cho thấy chuyên môn cấp thoát nước
                    phù hợp nhất với sự cố này.
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/15">
                Đề xuất đủ điều kiện
              </span>
            </div>
            <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
              <TeamFact
                label="Đội đang xử lý"
                value={getBqlTeamLabel(decision.currentTeam)}
                provenance="System record"
              />
              <TeamFact
                label="Đội được đề xuất"
                value={getBqlTeamLabel(incident.recommendedTeam)}
                provenance="AI-generated"
                ai
              />
            </div>
            {decision.currentTeam === incident.recommendedTeam && (
              <div className="flex items-center gap-2 border-t border-emerald-100 bg-emerald-50/60 px-5 py-3 text-xs font-semibold text-emerald-800">
                <CheckCircle2 size={15} />
                Đề xuất trùng với đội đang xử lý.
              </div>
            )}
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading title="Kiểm tra điều kiện hệ thống" meta="Điều kiện đủ để phân công" />
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {verificationChecks.map(([label, value, passed]) => (
                <div key={label} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
                    </div>
                    {passed && <CheckCircle2 size={17} className="text-emerald-600" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4">
              <ShieldCheck size={17} className="mt-0.5 shrink-0 text-slate-600" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-800">Tất cả điều kiện bắt buộc đều đạt</p>
                  <Provenance tone="system">System record</Provenance>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Các bước kiểm tra này chỉ xác nhận điều kiện. Hệ thống không tự phân công đội.
                </p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading title="Các đội kỹ thuật thay thế" meta="Các lựa chọn BQL có thể điều chỉnh" />
            <div className="divide-y divide-slate-100">
              {teamOptions.map((team) => {
                const recommended = team === incident.recommendedTeam;
                const selected = team === selectedTeam;
                return (
                  <label
                    key={team}
                    className={`flex cursor-pointer items-center gap-3 px-5 py-4 transition ${
                      selected ? "bg-indigo-50/60" : "hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="routing-team"
                      value={team}
                      checked={selected}
                      onChange={() => selectTeam(incident.id, team)}
                      className="size-4 accent-indigo-600"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900">{getBqlTeamLabel(team)}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {recommended
                          ? "Được đề xuất dựa trên nhóm vấn đề và triệu chứng của sự cố"
                          : "Lựa chọn thay thế do BQL xem xét"}
                      </p>
                    </div>
                    {recommended && (
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                        Đề xuất của AI
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
            {selectedTeam !== incident.recommendedTeam && (
              <div className="flex items-start gap-3 border-t border-amber-100 bg-amber-50 px-5 py-4">
                <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-700" />
                <div>
                  <p className="text-xs font-bold text-amber-900">BQL đã chọn phương án thay thế</p>
                  <p className="mt-1 text-xs leading-5 text-amber-800">
                    BQL đã chọn {getBqlTeamLabel(selectedTeam)}. Chưa tạo phân công cho đến khi BQL
                    xác nhận rõ tại bước phê duyệt.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </main>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <Card accent className="overflow-hidden">
            <div className="border-b border-indigo-100 bg-indigo-50/60 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-600">
                Bước quyết định tiếp theo
              </p>
              <h2 className="mt-1.5 text-lg font-bold text-slate-950">Chờ BQL phê duyệt</h2>
            </div>
            <div className="p-5">
              <WorkflowStep done label="Đã hình thành sự cố" />
              <WorkflowStep done label="Đã đánh giá mức độ ưu tiên" />
              <WorkflowStep done label="Đã đề xuất điều phối" />
              <WorkflowStep done label="Điều kiện hệ thống đã đạt" />
              <WorkflowStep active label="Chờ BQL phê duyệt" last />
              <Button
                className="mt-5 w-full"
                onClick={() => navigate(`/bql/incidents/${incident.id}/approval`)}
              >
                Tiếp tục đến bước phê duyệt <ArrowRight size={16} />
              </Button>
              <p className="mt-3 text-center text-[11px] leading-4 text-slate-400">
                Lựa chọn đội chưa đồng nghĩa với phân công. BQL cần phê duyệt đội cuối cùng.
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-bold text-slate-800">Ranh giới ra quyết định</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Bản mẫu này không tối ưu nhân lực hoặc tự động điều phối, phân công đội.
            </p>
          </Card>
        </aside>
      </div>
    </>
  );
}

export function RoutingApprovalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = incidents.find((item) => item.id === id) ?? incidents[0];
  const { decisions, approve, sendBack } = useRoutingDecisions();
  const decision = decisions[incident.id];
  const [changingTeam, setChangingTeam] = useState(false);
  const [sendBackOpen, setSendBackOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(decision.selectedTeam);
  const [reviewReason, setReviewReason] = useState("");
  const assigned = decision.status === "Approved" || decision.status === "Changed";
  const sentBack = decision.status === "Sent Back";

  function confirmAssignment() {
    approve(incident.id, selectedTeam);
    setChangingTeam(false);
  }

  function confirmSendBack() {
    if (!reviewReason) return;
    sendBack(incident.id, reviewReason);
    setSendBackOpen(false);
  }

  if (assigned) {
    return (
      <AssignmentResult
        incidentId={incident.id}
        team={decision.approvedTeam ?? selectedTeam}
        changed={decision.status === "Changed"}
        recommendedTeam={decision.recommendedTeam}
        decidedAt={decision.decidedAt}
        onReturn={() => navigate(`/bql/incidents/${incident.id}`)}
      />
    );
  }

  if (sentBack) {
    return (
      <>
        <Link
          to={`/bql/incidents/${incident.id}`}
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} /> Quay lại sự cố
        </Link>
        <Card className="mx-auto max-w-2xl overflow-hidden border-amber-200">
          <div className="bg-amber-50 p-6 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-amber-700 shadow-sm">
              <Route size={22} />
            </span>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.1em] text-amber-700">
              Xem xét điều phối
            </p>
            <h1 className="mt-1 text-xl font-bold text-slate-950">Đã yêu cầu xem xét lại đề xuất điều phối</h1>
            <p className="mt-2 text-sm text-slate-600">
              Lý do: {getBqlDecisionReasonLabel(decision.decisionReason ?? "")}
            </p>
          </div>
          <div className="p-5">
            <div className="rounded-lg bg-slate-50 p-4">
              <Provenance tone="human">Human decision</Provenance>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                BQL yêu cầu xem xét lại. Chưa có phân công nào được tạo.
              </p>
            </div>
            <div className="mt-5 flex justify-center gap-2">
              <Button variant="secondary" onClick={() => navigate(`/bql/incidents/${incident.id}`)}>
                Quay lại sự cố
              </Button>
              <Button onClick={() => navigate(`/bql/incidents/${incident.id}/routing`)}>
                Xem xét điều phối
              </Button>
            </div>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <Link
        to={`/bql/incidents/${incident.id}/routing`}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Quay lại đề xuất điều phối
      </Link>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-600">
            {incident.id} · BQL tham gia quyết định
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-slate-950">
            Xem xét phê duyệt
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Xem xét đề xuất và kết quả kiểm tra điều kiện hệ thống trước khi tạo phân công.
          </p>
        </div>
        <StatusBadge status="Pending Approval" context="incident" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <main className="space-y-6">
          <Card className="overflow-hidden">
            <SectionHeading title="Căn cứ quyết định" meta="Đề xuất và kết quả kiểm tra" />
            <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
              <div className="bg-indigo-50/50 p-5">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-indigo-600">
                    Đề xuất của AI
                  </p>
                  <Provenance tone="ai">AI-generated</Provenance>
                </div>
                <p className="mt-2 text-lg font-bold text-slate-950">{getBqlTeamLabel(incident.recommendedTeam)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Tình trạng rò rỉ nước tại nhiều căn hộ gần nhau cần đội có chuyên môn cấp thoát nước.
                </p>
              </div>
              <div className="bg-white p-5">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-500">
                    Kiểm tra điều kiện hệ thống
                  </p>
                  <Provenance tone="system">System record</Provenance>
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm font-bold text-emerald-700">
                  <CheckCircle2 size={17} /> Tất cả điều kiện bắt buộc đều đạt
                </p>
                <ul className="mt-3 space-y-2 text-xs text-slate-600">
                  {[
                    "Đội có năng lực cấp thoát nước",
                    "Thuộc phạm vi phụ trách của đội",
                    "Vị trí hợp lệ",
                    "Đủ điều kiện phân công",
                  ].map((check) => (
                    <li key={check} className="flex items-center gap-2">
                      <Check size={13} className="text-emerald-600" /> {check}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <SectionHeading title="Bối cảnh sự cố và SLA" />
            <dl className="px-5">
              <DetailRow label="Mức độ ưu tiên">
                <PriorityBadge priority={incident.priority} />
              </DetailRow>
              <DetailRow label="SLA">{formatSlaText("At risk · " + incident.sla)}</DetailRow>
              <DetailRow label="Đội đang xử lý">{getBqlTeamLabel(decision.currentTeam)}</DetailRow>
              <DetailRow label="Đội được đề xuất">{getBqlTeamLabel(incident.recommendedTeam)}</DetailRow>
              <DetailRow label="Phản ánh liên quan">{incident.tickets}</DetailRow>
            </dl>
            <div className="mx-5 mb-5 rounded-lg bg-orange-50 p-3 text-xs leading-5 text-orange-800">
              Rủi ro SLA góp phần xác định mức độ khẩn cấp trong vận hành. Đây là dữ liệu mô phỏng,
              không phải đồng hồ đếm ngược trực tiếp hay cơ chế tự động chuyển cấp.
            </div>
          </Card>
        </main>

        <aside className="xl:sticky xl:top-24 xl:self-start">
          <Card accent className="overflow-hidden">
            <div className="border-b border-indigo-100 bg-indigo-50/60 p-5">
              <div className="flex items-center gap-2">
                <UserCheck size={18} className="text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-950">Quyết định của BQL</h2>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Quyết định của BQL sẽ tạo hoặc không tạo phân công vận hành.
              </p>
            </div>
            <div className="p-5">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-500">
                  Đội chờ phê duyệt
                </p>
                <p className="mt-1.5 text-sm font-bold text-slate-900">{getBqlTeamLabel(selectedTeam)}</p>
                {selectedTeam !== incident.recommendedTeam && (
                  <div className="mt-2">
                    <Provenance tone="human">Human override</Provenance>
                    <p className="mt-1.5 text-xs leading-5 text-amber-800">
                      BQL đã thay đổi đội được đề xuất. Cần xác nhận rõ quyết định này.
                    </p>
                  </div>
                )}
              </div>

              {changingTeam && (
                <div className="mt-4 rounded-lg border border-slate-200 p-3">
                  <label className="form-label">
                    Chọn đội được phân công
                    <select
                      className="form-input"
                      value={selectedTeam}
                      onChange={(event) => setSelectedTeam(event.target.value)}
                    >
                      {teamOptions.map((team) => (
                        <option key={team} value={team}>{getBqlTeamLabel(team)}</option>
                      ))}
                    </select>
                  </label>
                  <Button className="mt-3 w-full" onClick={confirmAssignment}>
                    Xác nhận phân công mới
                  </Button>
                  <Button
                    className="mt-2 w-full"
                    variant="ghost"
                    onClick={() => {
                      setChangingTeam(false);
                      setSelectedTeam(decision.selectedTeam);
                    }}
                  >
                    Hủy thay đổi
                  </Button>
                </div>
              )}

              {sendBackOpen && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <label className="form-label">
                    Lý do yêu cầu xem xét lại
                    <select
                      className="form-input"
                      value={reviewReason}
                      onChange={(event) => setReviewReason(event.target.value)}
                    >
                      <option value="">Chọn lý do</option>
                      <option value="Insufficient information">Chưa đủ thông tin</option>
                      <option value="Wrong category">Nhóm vấn đề chưa phù hợp</option>
                      <option value="Wrong team recommendation">Đội được đề xuất chưa phù hợp</option>
                      <option value="Location requires verification">Cần xác minh vị trí</option>
                      <option value="Other">Lý do khác</option>
                    </select>
                  </label>
                  <Button
                    className="mt-3 w-full"
                    variant="danger"
                    disabled={!reviewReason}
                    onClick={confirmSendBack}
                  >
                    Xác nhận yêu cầu xem xét lại
                  </Button>
                  <Button
                    className="mt-2 w-full"
                    variant="ghost"
                    onClick={() => setSendBackOpen(false)}
                  >
                    Hủy
                  </Button>
                </div>
              )}

              {!changingTeam && !sendBackOpen && (
                <>
                  <Button className="mt-5 w-full" onClick={confirmAssignment}>
                    Phê duyệt và phân công
                  </Button>
                  <Button
                    className="mt-2 w-full"
                    variant="secondary"
                    onClick={() => setChangingTeam(true)}
                  >
                    Đổi đội xử lý
                  </Button>
                  <Button
                    className="mt-2 w-full"
                    variant="ghost"
                    onClick={() => setSendBackOpen(true)}
                  >
                    Yêu cầu xem xét lại
                  </Button>
                </>
              )}
              <p className="mt-4 text-center text-[11px] font-semibold text-slate-400">
                AI đề xuất → Hệ thống kiểm tra → BQL quyết định → Tạo phân công
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}

function AssignmentResult({
  incidentId,
  team,
  changed,
  recommendedTeam,
  decidedAt,
  onReturn,
}: {
  incidentId: string;
  team: string;
  changed: boolean;
  recommendedTeam: string;
  decidedAt?: string;
  onReturn: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to={`/bql/incidents/${incidentId}`}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Quay lại sự cố
      </Link>
      <Card className="overflow-hidden border-emerald-200">
        <div className="bg-emerald-50 p-7 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-emerald-700 shadow-sm">
            <CheckCircle2 size={23} />
          </span>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-700">
            Đã tạo phân công
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950">{getBqlTeamLabel(team)}</h1>
          <div className="mt-3 flex justify-center gap-2">
            <StatusBadge status="Assigned" context="incident" />
            <Provenance tone="human">Human decision</Provenance>
          </div>
        </div>
        <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
          <TeamFact
            label="Nguồn phân công"
            value="Theo đề xuất điều phối đã được BQL phê duyệt"
            provenance="System record"
          />
          <TeamFact label="Quyết định" value="BQL đã phê duyệt" provenance="Human decision" human />
          <TeamFact
            label="Trạng thái phân công"
            value={getStatusLabel("Assigned", "incident")}
            provenance="System record"
          />
          <TeamFact
            label="Thời điểm"
            value={getBqlRelativeTime(decidedAt ?? "Just now · prototype state")}
            provenance="Local prototype"
          />
        </div>
        {changed && (
          <div className="border-t border-amber-100 bg-amber-50 p-5">
            <Provenance tone="human">Human override</Provenance>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              BQL đã đổi đội được đề xuất từ {getBqlTeamLabel(recommendedTeam)} thành {getBqlTeamLabel(team)}.
            </p>
          </div>
        )}
        <div className="p-5 text-center">
          <p className="text-sm font-semibold text-slate-800">
            Đề xuất của AI → Phân công được BQL phê duyệt
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Phân công này chỉ được lưu trong trạng thái bản mẫu cục bộ.
          </p>
          <Button className="mt-5" onClick={onReturn}>
            Quay lại sự cố <ArrowRight size={16} />
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Provenance({ children, tone }: { children: ReactNode; tone: "ai" | "system" | "human" }) {
  const styles = {
    ai: "bg-indigo-100 text-indigo-700",
    system: "bg-slate-100 text-slate-600",
    human: "bg-amber-100 text-amber-800",
  }[tone];
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.07em] ${styles}`}
    >
      {typeof children === "string" ? getProvenanceLabel(children) : children}
    </span>
  );
}

function TeamFact({
  label,
  value,
  provenance,
  ai = false,
  human = false,
}: {
  label: string;
  value: string;
  provenance: string;
  ai?: boolean;
  human?: boolean;
}) {
  return (
    <div className="bg-white p-5">
      <div className="flex items-center gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-500">{label}</p>
        <Provenance tone={human ? "human" : ai ? "ai" : "system"}>{provenance}</Provenance>
      </div>
      <p className="mt-2 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function WorkflowStep({
  label,
  done = false,
  active = false,
  last = false,
}: {
  label: string;
  done?: boolean;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-3 pb-5 last:pb-0">
      {!last && <span className="absolute left-[9px] top-5 h-full w-px bg-slate-200" />}
      <span
        className={`relative z-10 mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
          done
            ? "bg-emerald-600 text-white"
            : active
              ? "bg-indigo-600 text-white"
              : "border border-slate-300 bg-white"
        }`}
      >
        {done ? (
          <Check size={11} />
        ) : active ? (
          <span className="size-1.5 rounded-full bg-white" />
        ) : null}
      </span>
      <p className={`text-sm font-semibold ${active ? "text-indigo-700" : "text-slate-700"}`}>
        {label}
      </p>
    </div>
  );
}
