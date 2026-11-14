import { useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  ShieldCheck,
  Unlink,
  XCircle,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { Button, Card, PriorityBadge, SectionHeading, StatusBadge } from "./components";
import { incidents, tickets, type Ticket } from "./data";

type CorrelationStatus = "Linked" | "Candidate" | "Excluded";
type CorrelationStrength = "High" | "Medium" | "Low";
type Decision = "confirmed" | "rejected" | null;

const heroLinkedIds = ["TKT-1024", "TKT-1025", "TKT-1026", "TKT-1029", "TKT-1030", "TKT-1031"];
const heroCandidateIds = ["TKT-1028"];

export function CorrelationReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = incidents.find((item) => item.id === id) ?? incidents[0];
  const initialLinkedIds = tickets
    .filter((ticket) => ticket.incident === incident.id)
    .map((ticket) => ticket.id);
  const candidatePoolIds =
    incident.id === "INC-024"
      ? heroCandidateIds
      : tickets.filter((ticket) => !ticket.incident).map((ticket) => ticket.id);
  const [linkedIds, setLinkedIds] = useState(
    incident.id === "INC-024" ? heroLinkedIds : initialLinkedIds,
  );
  const [excludedIds, setExcludedIds] = useState(candidatePoolIds);
  const [selectedTicketId, setSelectedTicketId] = useState(
    incident.id === "INC-024" ? "TKT-1026" : (initialLinkedIds[0] ?? candidatePoolIds[0]),
  );
  const [adjusting, setAdjusting] = useState(false);
  const [decision, setDecision] = useState<Decision>(null);
  const [lowStrengthWarning, setLowStrengthWarning] = useState<string | null>(null);
  const [scopeNotice, setScopeNotice] = useState<string | null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const linkedReports = useMemo(
    () =>
      linkedIds
        .map((ticketId) => tickets.find((ticket) => ticket.id === ticketId))
        .filter(Boolean) as Ticket[],
    [linkedIds],
  );
  const reviewableIds = [...new Set([...initialLinkedIds, ...candidatePoolIds])];
  const candidateReports = reviewableIds
    .filter((ticketId) => !linkedIds.includes(ticketId))
    .map((ticketId) => tickets.find((ticket) => ticket.id === ticketId))
    .filter(Boolean) as Ticket[];
  const selectedTicket =
    tickets.find((ticket) => ticket.id === selectedTicketId) ?? linkedReports[0];
  const selectedIsLinked = selectedTicket ? linkedIds.includes(selectedTicket.id) : false;
  const excludedCount = candidateReports.filter((ticket) => excludedIds.includes(ticket.id)).length;
  const confidence: CorrelationStrength = linkedReports.length >= 4 ? "High" : "Medium";

  function removeReport(ticketId: string) {
    setLinkedIds((current) => current.filter((id) => id !== ticketId));
    setExcludedIds((current) => current.filter((id) => id !== ticketId));
    setDecision(null);
    setAdjusting(true);
    setScopeNotice(`${ticketId} moved to the candidate pool.`);
  }

  function linkReport(ticket: Ticket) {
    if (ticket.category !== "Plumbing" && lowStrengthWarning !== ticket.id) {
      setLowStrengthWarning(ticket.id);
      return;
    }
    setLinkedIds((current) => [...new Set([...current, ticket.id])]);
    setExcludedIds((current) => current.filter((id) => id !== ticket.id));
    setLowStrengthWarning(null);
    setDecision(null);
    setAdjusting(true);
    setScopeNotice(`${ticket.id} added to the proposed incident scope by BQL.`);
  }

  function excludeReport(ticketId: string) {
    setExcludedIds((current) => [...new Set([...current, ticketId])]);
    setLowStrengthWarning(null);
    setDecision(null);
    setScopeNotice(`${ticketId} excluded from the proposed incident scope by BQL.`);
  }

  function confirmCorrelation() {
    setDecision("confirmed");
    setAdjusting(false);
  }

  function confirmRejection() {
    if (!rejectReason) return;
    setDecision("rejected");
    setRejectOpen(false);
  }

  return (
    <>
      <Link
        to={`/bql/incidents/${incident.id}`}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back to incident
      </Link>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-600">
            Incident formation · {incident.id}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-slate-950">
            Correlation Review
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Review how resident reports are related before confirming the incident scope.
          </p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <ShieldCheck size={16} /> Incident formation is a BQL-controlled decision.
          </p>
        </div>
      </div>

      <Card className="mb-6 overflow-hidden border-slate-300">
        <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ProvenanceLabel tone="correlation">Correlation-derived</ProvenanceLabel>
              <span className="font-mono text-xs font-bold text-indigo-600">{incident.id}</span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-950">{incident.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{incident.officialLocation}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-4">
            <CompactFact label="Status">
              <StatusBadge status={incident.status} />
            </CompactFact>
            <CompactFact label="Current team">{incident.currentTeam}</CompactFact>
            <CompactFact label="Official location">{incident.officialLocation}</CompactFact>
            <CompactFact label="Property">Sunrise Residence</CompactFact>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="space-y-6">
          <Card accent className="overflow-hidden">
            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BrainCircuit size={18} className="text-indigo-600" />
                  <h2 className="text-base font-bold text-slate-950">Suggested incident scope</h2>
                  <ProvenanceLabel tone="ai">AI-generated</ProvenanceLabel>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  The system found a strong relationship between these reports based on issue type,
                  location proximity, and reporting time. The pattern suggests a shared operational
                  event and requires BQL confirmation.
                </p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 ring-1 ring-inset ring-indigo-600/15">
                {confidence} correlation confidence
              </span>
            </div>
            <div className="grid border-t border-indigo-100 bg-indigo-50/30 sm:grid-cols-3">
              <SummaryMetric value={String(linkedReports.length)} label="related reports" />
              <SummaryMetric value={String(excludedCount)} label="candidate excluded" />
              <SummaryMetric value={confidence} label="correlation confidence" />
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading
              title="Why the system grouped these reports"
              meta="Explainable signals"
            />
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              <SignalCard
                title="Issue similarity"
                strength="High"
                examples={["Water leakage", "Active dripping", "Wet ceiling", "Water marks"]}
              />
              <SignalCard
                title="Location proximity"
                strength="High"
                examples={["Tower A", "Floors 12–14", "Adjacent units / nearby service area"]}
              />
              <SignalCard
                title="Time proximity"
                strength="High"
                examples={["Reports received between 14:03 and 14:15"]}
              />
              <SignalCard
                title="Operational category"
                strength="High"
                examples={["All linked reports classified as Plumbing"]}
              />
            </div>
            <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
              <strong className="text-slate-700">Confidence explanation:</strong> Multiple
              independent reports describe similar symptoms in nearby locations within a short time
              window.
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading title="Correlation Map" meta="Reports → operational incident" />
            <div className="bg-slate-50/60 p-5">
              <div className="mx-auto max-w-md rounded-xl border-2 border-indigo-200 bg-white p-4 text-center shadow-sm">
                <span className="font-mono text-xs font-bold text-indigo-600">{incident.id}</span>
                <p className="mt-1 text-sm font-bold text-slate-950">{incident.title}</p>
                <p className="mt-1 text-xs text-slate-500">Potential shared operational event</p>
              </div>
              <div className="mx-auto h-5 w-px bg-indigo-200" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {linkedReports.map((ticket) => (
                  <button
                    key={ticket.id}
                    className={`rounded-lg border bg-white p-3 text-left transition hover:border-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      selectedTicketId === ticket.id
                        ? "border-indigo-400 ring-2 ring-indigo-100"
                        : "border-slate-200"
                    }`}
                    onClick={() => setSelectedTicketId(ticket.id)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold text-indigo-600">
                        {ticket.id}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700">Linked</span>
                    </div>
                    <p className="mt-1.5 truncate text-xs font-semibold text-slate-800">
                      {ticket.issue}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {ticket.location} · {ticket.created}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <p className="border-t border-slate-100 px-5 py-3 text-center text-xs text-slate-500">
              These are different resident observations that may describe one operational event.
              Correlation does not prove a shared physical root cause.
            </p>
          </Card>

          <ReportGroup
            title="Currently linked to incident"
            count={`${linkedReports.length} reports`}
            description="Resident tickets currently included in the proposed incident scope."
          >
            {linkedReports.map((ticket) => (
              <ReportRow
                key={ticket.id}
                ticket={ticket}
                status="Linked"
                selected={selectedTicketId === ticket.id}
                onSelect={() => setSelectedTicketId(ticket.id)}
                action={
                  <Button variant="ghost" onClick={() => removeReport(ticket.id)}>
                    <Unlink size={14} /> Remove
                  </Button>
                }
              />
            ))}
          </ReportGroup>

          <ReportGroup
            title="Potentially related reports"
            count={`${candidateReports.length} ${candidateReports.length === 1 ? "report" : "reports"}`}
            description="Candidates remain separate until BQL explicitly changes the incident scope."
          >
            {scopeNotice && (
              <div
                className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-700"
                role="status"
              >
                <CheckCircle2 size={15} className="text-emerald-600" />
                {scopeNotice}
              </div>
            )}
            {candidateReports.map((ticket) => {
              const excluded = excludedIds.includes(ticket.id);
              const lowStrength = ticket.category !== "Plumbing";
              return (
                <div key={ticket.id}>
                  <ReportRow
                    ticket={ticket}
                    status={excluded ? "Excluded" : "Candidate"}
                    strength={lowStrength ? "Low" : "High"}
                    reason={
                      lowStrength
                        ? "Different issue category despite being in the same property."
                        : "Removed from the linked scope by BQL."
                    }
                    selected={selectedTicketId === ticket.id}
                    onSelect={() => setSelectedTicketId(ticket.id)}
                    action={
                      <div className="flex flex-wrap justify-end gap-1">
                        <Button variant="ghost" onClick={() => excludeReport(ticket.id)}>
                          Do not link
                        </Button>
                        <Button variant="secondary" onClick={() => linkReport(ticket)}>
                          Review & add
                        </Button>
                      </div>
                    }
                  />
                  {lowStrengthWarning === ticket.id && (
                    <div className="mx-5 mb-4 flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center">
                      <AlertTriangle size={18} className="shrink-0 text-amber-700" />
                      <p className="flex-1 text-xs leading-5 text-amber-900">
                        This report has a different category and lower correlation strength. Confirm
                        before linking it as a human override.
                      </p>
                      <Button variant="secondary" onClick={() => setLowStrengthWarning(null)}>
                        Cancel
                      </Button>
                      <Button onClick={() => linkReport(ticket)}>Link report</Button>
                    </div>
                  )}
                </div>
              );
            })}
          </ReportGroup>

          {selectedTicket && (
            <EvidencePanel
              ticket={selectedTicket}
              linked={selectedIsLinked}
              strength={selectedTicket.category === "Plumbing" ? "High" : "Low"}
            />
          )}
        </main>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <Card accent className="overflow-hidden">
            <div className="border-b border-indigo-100 bg-indigo-50/60 p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-indigo-600" />
                <h2 className="text-base font-bold text-slate-950">Confirm incident scope</h2>
              </div>
              <p className="mt-2 text-sm font-bold text-indigo-700">
                {linkedReports.length} reports currently linked
              </p>
            </div>
            <div className="p-5">
              {decision === "confirmed" ? (
                <DecisionSuccess
                  title="Incident scope confirmed"
                  description={`${linkedReports.length} resident reports are now confirmed as supporting reports for ${incident.id}.`}
                  onReturn={() => navigate(`/bql/incidents/${incident.id}`)}
                />
              ) : decision === "rejected" ? (
                <DecisionSuccess
                  rejected
                  title="Correlation rejected"
                  description="The selected reports will not be treated as one incident in this prototype."
                  onReturn={() => navigate(`/bql/incidents/${incident.id}`)}
                />
              ) : (
                <>
                  <DecisionStep label="AI recommendation" provenance="AI-generated" tone="ai">
                    Keep the plumbing-related reports grouped under {incident.id}.
                  </DecisionStep>
                  <div className="my-4 border-t border-slate-100" />
                  <DecisionStep label="System checks" provenance="System record">
                    <ul className="mt-2 space-y-2">
                      {[
                        "Same property",
                        "Same operational category",
                        "Nearby locations",
                        "Short reporting window",
                        "No conflicting incident assignment",
                      ].map((check) => (
                        <li key={check} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check size={13} className="text-emerald-600" /> {check}
                        </li>
                      ))}
                    </ul>
                  </DecisionStep>
                  <div className="my-4 border-t border-slate-100" />
                  <DecisionStep label="BQL decision" provenance="Human decision" tone="human">
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Confirm, adjust, or reject the proposed incident scope.
                    </p>
                  </DecisionStep>
                  {adjusting && (
                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                      Adjustment mode is active. Add or remove reports in the review lists, then
                      confirm the revised scope.
                    </div>
                  )}
                  <Button className="mt-5 w-full" onClick={confirmCorrelation}>
                    Confirm correlation
                  </Button>
                  <Button
                    className="mt-2 w-full"
                    variant="secondary"
                    onClick={() => setAdjusting(true)}
                  >
                    Adjust scope
                  </Button>
                  <Button
                    className="mt-2 w-full"
                    variant="ghost"
                    onClick={() => setRejectOpen(true)}
                  >
                    Reject correlation
                  </Button>
                  <p className="mt-4 text-center text-[11px] font-semibold text-slate-400">
                    AI suggests correlation → System shows evidence → BQL confirms
                  </p>
                </>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-bold text-slate-800">Decision boundary</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Correlation identifies relationship patterns. It does not diagnose a root cause, merge
              reports autonomously, or assign operational work.
            </p>
          </Card>
        </aside>
      </div>

      {rejectOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reject-correlation-title"
        >
          <Card className="w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-5">
              <div>
                <h2 id="reject-correlation-title" className="text-base font-bold text-slate-950">
                  Reject this correlation?
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  The selected reports will not be treated as one incident in this prototype.
                </p>
              </div>
              <button
                aria-label="Close rejection dialog"
                className="text-slate-400 hover:text-slate-700"
                onClick={() => setRejectOpen(false)}
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-5">
              <label className="form-label">
                Rejection reason
                <select
                  className="form-input"
                  value={rejectReason}
                  onChange={(event) => setRejectReason(event.target.value)}
                >
                  <option value="">Select a reason</option>
                  <option>Different physical issue</option>
                  <option>Different location</option>
                  <option>Timing does not match</option>
                  <option>Insufficient evidence</option>
                  <option>Other</option>
                </select>
              </label>
              <div className="mt-5 flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setRejectOpen(false)}>
                  Cancel
                </Button>
                <Button variant="danger" disabled={!rejectReason} onClick={confirmRejection}>
                  Confirm rejection
                </Button>
              </div>
              <p className="mt-3 text-center text-[11px] text-slate-400">
                Prototype only. No incident or ticket data will be deleted.
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

function ProvenanceLabel({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "ai" | "correlation" | "human" | "system";
}) {
  const styles = {
    ai: "bg-indigo-100 text-indigo-700",
    correlation: "bg-sky-100 text-sky-700",
    human: "bg-amber-100 text-amber-800",
    system: "bg-slate-100 text-slate-600",
  }[tone];
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.07em] ${styles}`}
    >
      {children}
    </span>
  );
}

function CompactFact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-400">{label}</p>
      <div className="mt-1 text-xs font-semibold text-slate-800">{children}</div>
    </div>
  );
}

function SummaryMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-b border-indigo-100 px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="text-xl font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}

function SignalCard({
  title,
  strength,
  examples,
}: {
  title: string;
  strength: CorrelationStrength;
  examples: string[];
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <StrengthBadge strength={strength} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {examples.map((example) => (
          <span key={example} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
            {example}
          </span>
        ))}
      </div>
    </div>
  );
}

function StrengthBadge({ strength }: { strength: CorrelationStrength }) {
  const styles = {
    High: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    Medium: "bg-amber-50 text-amber-700 ring-amber-600/15",
    Low: "bg-slate-100 text-slate-600 ring-slate-500/10",
  }[strength];
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${styles}`}>
      {strength}
    </span>
  );
}

function ReportGroup({
  title,
  count,
  description,
  children,
}: {
  title: string;
  count: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
        <span className="shrink-0 text-xs font-bold text-slate-500">{count}</span>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </Card>
  );
}

function ReportRow({
  ticket,
  status,
  strength,
  reason,
  selected,
  onSelect,
  action,
}: {
  ticket: Ticket;
  status: CorrelationStatus;
  strength?: CorrelationStrength;
  reason?: string;
  selected: boolean;
  onSelect: () => void;
  action: ReactNode;
}) {
  return (
    <div
      className={`grid gap-3 px-5 py-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center ${selected ? "bg-indigo-50/50" : ""}`}
    >
      <button
        className="min-w-0 text-left focus-visible:ring-2 focus-visible:ring-indigo-500"
        onClick={onSelect}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold text-indigo-600">{ticket.id}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              status === "Linked"
                ? "bg-emerald-50 text-emerald-700"
                : status === "Excluded"
                  ? "bg-slate-100 text-slate-500"
                  : "bg-amber-50 text-amber-700"
            }`}
          >
            {status}
          </span>
          {strength && <StrengthBadge strength={strength} />}
        </div>
        <p className="mt-1.5 truncate text-sm font-semibold text-slate-900">{ticket.issue}</p>
        <p className="mt-1 text-xs text-slate-500">
          {ticket.location} · {ticket.created} · {ticket.category}
        </p>
        {reason && <p className="mt-1.5 text-xs leading-5 text-slate-500">{reason}</p>}
      </button>
      <div>{action}</div>
    </div>
  );
}

function EvidencePanel({
  ticket,
  linked,
  strength,
}: {
  ticket: Ticket;
  linked: boolean;
  strength: CorrelationStrength;
}) {
  const low = strength === "Low";
  const evidence = low
    ? [
        ["Issue similarity", "Low", "Electrical sparking differs from water leakage symptoms."],
        ["Location", "Medium", "Same property, but not within the affected floors."],
        ["Time", "Low", "Reported outside the concentrated 14:03–14:15 window."],
        ["Category", "Low", "Electrical rather than Plumbing."],
      ]
    : [
        ["Issue similarity", "High", "Similar water leakage symptoms."],
        ["Location", "High", `${ticket.location}, adjacent to other linked reports.`],
        ["Time", "High", "Reported within minutes of the first report."],
        ["Category", "High", "Plumbing."],
      ];
  return (
    <Card className="overflow-hidden border-indigo-200">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-indigo-100 bg-indigo-50/50 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-indigo-600">{ticket.id}</span>
            <ProvenanceLabel tone="ai">AI-generated interpretation</ProvenanceLabel>
          </div>
          <h2 className="mt-1.5 text-sm font-bold text-slate-950">{ticket.issue}</h2>
        </div>
        <span className="text-xs font-bold text-slate-500">
          {linked ? "Currently linked" : "Not linked"}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xs font-bold uppercase tracking-[0.09em] text-slate-500">
          Correlation evidence
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {evidence.map(([label, level, explanation]) => (
            <div key={label} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-slate-800">{label}</p>
                <StrengthBadge strength={level as CorrelationStrength} />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{explanation}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-800">Relationship interpretation</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            {low
              ? "These signals suggest this report is not part of the same operational event."
              : "These signals suggest the report may be part of the same operational event."}
          </p>
          <p className="mt-2 text-xs font-semibold text-slate-700">
            This is a correlation recommendation, not proof of a shared root cause.
          </p>
        </div>
      </div>
    </Card>
  );
}

function DecisionStep({
  label,
  provenance,
  tone = "system",
  children,
}: {
  label: string;
  provenance: string;
  tone?: "ai" | "human" | "system";
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-500">{label}</p>
        <ProvenanceLabel tone={tone}>{provenance}</ProvenanceLabel>
      </div>
      <div className="mt-1 text-sm font-semibold leading-6 text-slate-800">{children}</div>
    </div>
  );
}

function DecisionSuccess({
  title,
  description,
  onReturn,
  rejected = false,
}: {
  title: string;
  description: string;
  onReturn: () => void;
  rejected?: boolean;
}) {
  return (
    <div role="status">
      <span
        className={`grid size-10 place-items-center rounded-full ${
          rejected ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
        }`}
      >
        {rejected ? <XCircle size={20} /> : <CheckCircle2 size={20} />}
      </span>
      <h3 className="mt-3 text-base font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      <div className="mt-4 rounded-lg bg-slate-50 p-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-amber-700">
          Human decision
        </p>
        <p className="mt-1 text-xs font-semibold text-slate-700">Decision recorded by BQL</p>
      </div>
      <Button className="mt-5 w-full" onClick={onReturn}>
        Return to incident <ArrowRight size={15} />
      </Button>
    </div>
  );
}
