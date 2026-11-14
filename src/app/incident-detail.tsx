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
      {state}
    </span>
  );
}

export function IncidentIntelligencePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = incidents.find((item) => item.id === id) ?? incidents[0];
  const related = tickets.filter((ticket) => ticket.incident === incident.id);
  const [clarificationState, setClarificationState] = useState<"idle" | "composing" | "sent">(
    "idle",
  );
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const isWaterIncident = incident.id === "INC-024";
  const category = isWaterIncident
    ? "Plumbing"
    : incident.team.replace("Technical — ", "").replace("Vertical Transport", "Mechanical");
  const verifiedLocation = isWaterIncident ? "Tower A · Floors 12–14" : incident.location;
  const slaState: SlaState =
    incident.slaTone === "danger"
      ? "Breached"
      : incident.slaTone === "warning"
        ? "At risk"
        : "On track";
  const risk = incident.priority === "Critical" || incident.priority === "High" ? "High" : "Medium";
  const symptoms = isWaterIncident
    ? [
        "Active water leakage",
        "Multiple residents affected",
        "Reports concentrated across adjacent floors",
      ]
    : [
        `${incident.title} reported`,
        `${related.length} related resident ${related.length === 1 ? "report" : "reports"}`,
        `Reports concentrated near ${incident.location}`,
      ];
  const signals = isWaterIncident
    ? ["Multi-unit impact", "Active leakage", "Property damage risk", "Multiple related reports"]
    : ["Operational disruption", `${incident.priority} priority`, "Related resident reports"];
  const gaps = isWaterIncident
    ? {
        missing: "Exact source of leakage",
        uncertain: "Whether the affected area extends beyond Floor 14",
        clarification:
          "Confirm the highest affected floor and whether water is entering electrical areas.",
      }
    : {
        missing: "Confirmed root cause",
        uncertain: "Full extent of the affected area",
        clarification: "Confirm whether conditions have changed since the latest resident report.",
      };
  const timeline = isWaterIncident
    ? [
        ["14:03", "First resident report received"],
        ["14:08", "Second related report received"],
        ["14:16", "AI extracted the issue and detected related reports"],
        ["14:17", "Incident created from correlated reports"],
        ["14:18", "Technical — Plumbing recommended"],
        ["14:19", "Awaiting BQL approval"],
      ]
    : [
        ["13:42", "First resident report received"],
        ["13:49", "Related report identified"],
        ["13:54", "AI extraction completed"],
        ["13:55", "Incident created"],
        ["13:58", `${incident.team} identified as the current team`],
        ["14:02", `Status updated to ${incident.status}`],
      ];
  const primaryAction =
    incident.status === "Pending Approval"
      ? { label: "Review assignment", route: `/bql/incidents/${incident.id}/approval` }
      : { label: "Review routing", route: `/bql/incidents/${incident.id}/routing` };

  return (
    <>
      <Link
        to="/bql/incidents"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back to incidents
      </Link>

      <Card className="mb-6 overflow-hidden border-slate-300">
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <IncidentMark />
              <div>
                <p className="font-mono text-xs font-bold text-indigo-600">{incident.id}</p>
                <p className="text-xs font-semibold text-slate-400">Operational incident</p>
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-[-0.035em] text-slate-950 sm:text-3xl">
              {incident.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} /> {verifiedLocation}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => navigate(`/bql/incidents/${incident.id}/routing`)}
            >
              Review routing
            </Button>
            <Button onClick={() => navigate(primaryAction.route)}>
              {primaryAction.label} <ArrowRight size={16} />
            </Button>
          </div>
        </div>
        <div className="grid border-t border-slate-200 bg-slate-50/70 sm:grid-cols-2 lg:grid-cols-5">
          <HeaderFact label="Priority">
            <PriorityBadge priority={incident.priority} />
          </HeaderFact>
          <HeaderFact label="Status">
            <StatusBadge status={incident.status} />
          </HeaderFact>
          <HeaderFact label="SLA">
            <SlaBadge state={slaState} />
          </HeaderFact>
          <HeaderFact label="Related reports">
            <span className="text-sm font-bold text-slate-900">{incident.tickets}</span>
          </HeaderFact>
          <HeaderFact label="Current team">
            <span className="text-sm font-bold text-slate-900">{incident.team}</span>
          </HeaderFact>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Card>
            <SectionHeading title="Incident Summary" meta="Operational context" />
            <div className="grid gap-5 p-5 md:grid-cols-3">
              <SummaryItem
                label="What happened"
                text={
                  isWaterIncident
                    ? "Multiple residents reported active water leakage affecting units across three adjacent floors."
                    : `${related.length || incident.tickets} reports describe ${incident.title.toLowerCase()} near ${incident.location}.`
                }
              />
              <SummaryItem
                label="Impact"
                text={
                  isWaterIncident
                    ? "Potential multi-unit property damage and disruption to residents."
                    : "Potential resident disruption and impact to shared property operations."
                }
              />
              <SummaryItem
                label="Current state"
                text={`Reports are coordinated as one incident. The recommended team is ${incident.team}.`}
              />
            </div>
          </Card>

          <Card accent className="overflow-hidden">
            <div className="flex items-start gap-3 border-b border-indigo-100 bg-indigo-50/50 px-5 py-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-indigo-600 text-white">
                <BrainCircuit size={18} />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[15px] font-bold text-slate-950">AI Understanding</h2>
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-indigo-700">
                    AI-extracted
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Structured information extracted from resident report language.
                </p>
              </div>
            </div>
            <div className="grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Issue", isWaterIncident ? "Water leakage" : incident.title],
                ["Category", category],
                ["Scope", isWaterIncident ? "Multiple units" : `${related.length} reports`],
                ["Confidence", isWaterIncident ? "High" : "Medium"],
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
                Symptoms extracted
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
            <SectionHeading title="Risk & Priority Assessment" meta="AI + operational rules" />
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-lg bg-red-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-red-600">
                    Priority
                  </p>
                  <div className="mt-1.5">
                    <PriorityBadge priority={incident.priority} />
                  </div>
                </div>
                <div className="rounded-lg bg-orange-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-orange-600">
                    Risk
                  </p>
                  <p className="mt-1.5 text-sm font-bold text-orange-800">{risk}</p>
                </div>
                <p className="max-w-xl text-sm leading-6 text-slate-600">
                  {isWaterIncident
                    ? "Multiple units are affected by active water leakage. The incident may cause property damage and requires rapid intervention."
                    : `The incident has ${incident.priority.toLowerCase()} operational priority and may disrupt residents if not addressed promptly.`}
                </p>
              </div>
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.09em] text-slate-400">
                  Signals detected
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
              <div className="mt-5 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-slate-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Assessment source: AI-assisted assessment + deterministic operational rules
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    AI provides recommendations. Operational rules and human approval control
                    high-risk actions.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading
              title="Related Reports"
              meta={`${related.length} supporting resident tickets`}
            />
            <div className="flex items-start gap-3 border-b border-indigo-100 bg-indigo-50/50 px-5 py-4">
              <BrainCircuit size={17} className="mt-0.5 shrink-0 text-indigo-600" />
              <div>
                <p className="text-xs font-bold text-indigo-900">Why these reports are related</p>
                <p className="mt-1 text-xs leading-5 text-indigo-700">
                  Similar issue type, nearby locations, and close reporting times suggest a shared
                  operational cause. This relationship remains reviewable by BQL.
                </p>
              </div>
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
                        Supports incident
                      </span>
                    </div>
                    <p className="mt-1.5 truncate text-sm font-semibold text-slate-900">
                      “{ticket.issue}”
                    </p>
                  </div>
                  <p className="text-xs font-medium text-slate-600">{ticket.location}</p>
                  <div className="text-xs text-slate-500">
                    <p>{ticket.created}</p>
                    <p className="mt-1">{ticket.category}</p>
                  </div>
                  <PriorityBadge priority={ticket.priority} />
                </button>
              ))}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading title="Information Gaps" meta="Clarification may be required" />
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <GapItem tone="missing" label="Missing" text={gaps.missing} />
              <GapItem tone="uncertain" label="Uncertain" text={gaps.uncertain} />
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">Suggested clarification</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{gaps.clarification}</p>
              </div>
              {clarificationState === "sent" ? (
                <span
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-50 px-4 text-sm font-bold text-emerald-700"
                  role="status"
                >
                  <CheckCircle2 size={16} /> Clarification requested
                </span>
              ) : (
                <Button variant="secondary" onClick={() => setClarificationState("composing")}>
                  Request clarification
                </Button>
              )}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading title="Operational Timeline" meta="Incident traceability" />
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
                      {time}
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
            <SectionHeading title="System-verified Facts" meta="Operational record" />
            <dl className="px-5">
              <DetailRow label="Location">{verifiedLocation}</DetailRow>
              <DetailRow label="Related reports">{incident.tickets}</DetailRow>
              <DetailRow label="SLA state">
                <SlaBadge state={slaState} />
              </DetailRow>
              <DetailRow label="Status">
                <StatusBadge status={incident.status} />
              </DetailRow>
              <DetailRow label="Current team">{incident.team}</DetailRow>
            </dl>
            <div className="mx-5 mb-5 flex gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-slate-600" />
              These fields come from the property record and workflow state, not AI extraction.
            </div>
          </Card>

          <Card accent className="overflow-hidden">
            <div className="border-b border-indigo-100 bg-indigo-50/60 px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-600">
                Recommended Next Action
              </p>
              <h2 className="mt-1.5 text-lg font-bold text-slate-950">{primaryAction.label}</h2>
            </div>
            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-indigo-600">
                AI recommendation
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">{incident.team}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {isWaterIncident
                  ? "Multiple-unit active leakage + plumbing category + current team workload"
                  : `${category} category + incident location + current team workload`}
              </p>
              <div className="my-4 border-t border-slate-100" />
              <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-500">
                System checks
              </p>
              <ul className="mt-2 space-y-2 text-xs text-slate-600">
                {[
                  `Required skill: ${category}`,
                  `Location: ${incident.location.split(" / ")[0]}`,
                  "Current workload: Medium",
                ].map((check) => (
                  <li key={check} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600" /> {check}
                  </li>
                ))}
              </ul>
              <div className="my-4 border-t border-slate-100" />
              <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-500">
                Human action
              </p>
              <Button className="mt-3 w-full" onClick={() => navigate(primaryAction.route)}>
                {incident.status === "Pending Approval" ? "Review approval" : "Review routing"}
                <ArrowRight size={16} />
              </Button>
              <Button
                className="mt-2 w-full"
                variant="secondary"
                onClick={() => navigate(`/bql/incidents/${incident.id}/routing`)}
              >
                Review routing <Route size={15} />
              </Button>
              <p className="mt-4 text-center text-[11px] font-semibold text-slate-400">
                AI recommends → System verifies → BQL decides
              </p>
            </div>
          </Card>

          <Card>
            <SectionHeading title="Evidence & Traceability" />
            <div className="px-5">
              <DetailRow label="Source reports">{incident.tickets} resident reports</DetailRow>
              <DetailRow label="AI extraction">14:16</DetailRow>
              <DetailRow label="Priority assessment">14:17</DetailRow>
              <DetailRow label="Last human decision">None recorded</DetailRow>
              <DetailRow label="Current owner">{incident.team}</DetailRow>
            </div>
            <div className="mx-5 mb-5 flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-xs font-medium text-slate-600">
              <FileCheck2 size={16} className="text-slate-500" />
              Awaiting BQL approval
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
                  Request resident clarification
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Mock request to residents linked to {incident.id}
                </p>
              </div>
              <button
                aria-label="Close clarification dialog"
                className="text-slate-400 hover:text-slate-700"
                onClick={() => setClarificationState("idle")}
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-5">
              <label className="form-label">
                Clarification message
                <textarea
                  className="form-input min-h-28 resize-none"
                  defaultValue="Please confirm whether the leakage is still active and whether any electrical equipment or outlets are affected."
                />
              </label>
              <div className="mt-5 flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setClarificationState("idle")}>
                  Cancel
                </Button>
                <Button onClick={() => setClarificationState("sent")}>Send request</Button>
              </div>
              <p className="mt-3 text-center text-[11px] text-slate-400">
                Prototype only. No message will be sent.
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
