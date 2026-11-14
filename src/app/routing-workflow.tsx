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

const teamOptions = [
  "Technical — Plumbing",
  "Technical — General Maintenance",
  "Building Engineering",
];

const verificationChecks = [
  ["Required skill", "Plumbing"],
  ["Team capability", "Plumbing", true],
  ["Property coverage", "Available", true],
  ["Incident location", "Tower A / Floor 12", true],
  ["Workflow eligibility", "Status allows assignment", true],
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
        <ArrowLeft size={16} /> Back to incident
      </Link>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-600">
            {incident.id} · Operational routing
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-slate-950">
            Routing Recommendation
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Review the recommended capability and deterministic checks before BQL approval.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PriorityBadge priority={incident.priority} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 ring-1 ring-inset ring-orange-600/15">
            <Clock3 size={12} /> At risk · {incident.sla}
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
                      AI recommendation
                    </p>
                    <Provenance tone="ai">AI-generated</Provenance>
                  </div>
                  <h2 className="mt-1.5 text-xl font-bold text-slate-950">
                    {incident.recommendedTeam}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                    Reported symptoms and the incident category indicate plumbing expertise is the
                    most relevant operational capability.
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/15">
                Eligible recommendation
              </span>
            </div>
            <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
              <TeamFact
                label="Current team"
                value={decision.currentTeam}
                provenance="System record"
              />
              <TeamFact
                label="Recommended team"
                value={incident.recommendedTeam}
                provenance="AI-generated"
                ai
              />
            </div>
            {decision.currentTeam === incident.recommendedTeam && (
              <div className="flex items-center gap-2 border-t border-emerald-100 bg-emerald-50/60 px-5 py-3 text-xs font-semibold text-emerald-800">
                <CheckCircle2 size={15} />
                Recommendation matches current team.
              </div>
            )}
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading title="System Verification" meta="Deterministic eligibility checks" />
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
                  <p className="text-xs font-bold text-slate-800">All required checks passed</p>
                  <Provenance tone="system">System record</Provenance>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  These checks validate eligibility only. They do not assign the team.
                </p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <SectionHeading title="Routing Alternatives" meta="Small BQL override set" />
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
                      <p className="text-sm font-bold text-slate-900">{team}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {recommended
                          ? "Recommended from incident category and symptoms"
                          : "Available as a manual BQL alternative"}
                      </p>
                    </div>
                    {recommended && (
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                        Recommended
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
                  <p className="text-xs font-bold text-amber-900">Human override prepared</p>
                  <p className="mt-1 text-xs leading-5 text-amber-800">
                    BQL selected {selectedTeam}. Assignment will not be created until it is
                    explicitly confirmed on the approval step.
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
                Next decision
              </p>
              <h2 className="mt-1.5 text-lg font-bold text-slate-950">BQL approval required</h2>
            </div>
            <div className="p-5">
              <WorkflowStep done label="Incident formed" />
              <WorkflowStep done label="Priority assessed" />
              <WorkflowStep done label="Routing recommended" />
              <WorkflowStep done label="System checks passed" />
              <WorkflowStep active label="Pending BQL approval" last />
              <Button
                className="mt-5 w-full"
                onClick={() => navigate(`/bql/incidents/${incident.id}/approval`)}
              >
                Continue to approval <ArrowRight size={16} />
              </Button>
              <p className="mt-3 text-center text-[11px] leading-4 text-slate-400">
                Selection is not an assignment. BQL must approve the final team.
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-bold text-slate-800">Decision boundary</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              No workforce optimization or autonomous dispatch is performed in this prototype.
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
          <ArrowLeft size={16} /> Back to incident
        </Link>
        <Card className="mx-auto max-w-2xl overflow-hidden border-amber-200">
          <div className="bg-amber-50 p-6 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-amber-700 shadow-sm">
              <Route size={22} />
            </span>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.1em] text-amber-700">
              Routing review
            </p>
            <h1 className="mt-1 text-xl font-bold text-slate-950">Routing sent back for review</h1>
            <p className="mt-2 text-sm text-slate-600">Reason: {decision.decisionReason}</p>
          </div>
          <div className="p-5">
            <div className="rounded-lg bg-slate-50 p-4">
              <Provenance tone="human">Human decision</Provenance>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                BQL requested another review. No assignment was created.
              </p>
            </div>
            <div className="mt-5 flex justify-center gap-2">
              <Button variant="secondary" onClick={() => navigate(`/bql/incidents/${incident.id}`)}>
                Return to incident
              </Button>
              <Button onClick={() => navigate(`/bql/incidents/${incident.id}/routing`)}>
                Review routing
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
        <ArrowLeft size={16} /> Back to routing
      </Link>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-600">
            {incident.id} · Human-in-the-loop
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-slate-950">
            Routing Approval
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Review the recommendation and system verification before creating an assignment.
          </p>
        </div>
        <StatusBadge status="Pending Approval" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <main className="space-y-6">
          <Card className="overflow-hidden">
            <SectionHeading title="Decision Evidence" meta="Recommendation + verification" />
            <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
              <div className="bg-indigo-50/50 p-5">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-indigo-600">
                    AI recommendation
                  </p>
                  <Provenance tone="ai">AI-generated</Provenance>
                </div>
                <p className="mt-2 text-lg font-bold text-slate-950">{incident.recommendedTeam}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Active water leakage across multiple nearby units requires plumbing capability.
                </p>
              </div>
              <div className="bg-white p-5">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-500">
                    System verification
                  </p>
                  <Provenance tone="system">System record</Provenance>
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm font-bold text-emerald-700">
                  <CheckCircle2 size={17} /> All required checks passed
                </p>
                <ul className="mt-3 space-y-2 text-xs text-slate-600">
                  {[
                    "Plumbing capability",
                    "Property coverage",
                    "Valid location",
                    "Assignment allowed",
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
            <SectionHeading title="Incident & SLA Context" />
            <dl className="px-5">
              <DetailRow label="Priority">
                <PriorityBadge priority={incident.priority} />
              </DetailRow>
              <DetailRow label="SLA">At risk · {incident.sla}</DetailRow>
              <DetailRow label="Current team">{decision.currentTeam}</DetailRow>
              <DetailRow label="Recommended team">{incident.recommendedTeam}</DetailRow>
              <DetailRow label="Related reports">{incident.tickets}</DetailRow>
            </dl>
            <div className="mx-5 mb-5 rounded-lg bg-orange-50 p-3 text-xs leading-5 text-orange-800">
              SLA risk contributes to operational urgency. This is mock status data, not a live
              countdown or automatic escalation.
            </div>
          </Card>
        </main>

        <aside className="xl:sticky xl:top-24 xl:self-start">
          <Card accent className="overflow-hidden">
            <div className="border-b border-indigo-100 bg-indigo-50/60 p-5">
              <div className="flex items-center gap-2">
                <UserCheck size={18} className="text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-950">BQL Decision</h2>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Your decision creates—or withholds—the operational assignment.
              </p>
            </div>
            <div className="p-5">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-slate-500">
                  Team pending approval
                </p>
                <p className="mt-1.5 text-sm font-bold text-slate-900">{selectedTeam}</p>
                {selectedTeam !== incident.recommendedTeam && (
                  <div className="mt-2">
                    <Provenance tone="human">Human override</Provenance>
                    <p className="mt-1.5 text-xs leading-5 text-amber-800">
                      BQL changed the recommended team. Explicit confirmation is required.
                    </p>
                  </div>
                )}
              </div>

              {changingTeam && (
                <div className="mt-4 rounded-lg border border-slate-200 p-3">
                  <label className="form-label">
                    Select assignment team
                    <select
                      className="form-input"
                      value={selectedTeam}
                      onChange={(event) => setSelectedTeam(event.target.value)}
                    >
                      {teamOptions.map((team) => (
                        <option key={team}>{team}</option>
                      ))}
                    </select>
                  </label>
                  <Button className="mt-3 w-full" onClick={confirmAssignment}>
                    Confirm new assignment
                  </Button>
                  <Button
                    className="mt-2 w-full"
                    variant="ghost"
                    onClick={() => {
                      setChangingTeam(false);
                      setSelectedTeam(decision.selectedTeam);
                    }}
                  >
                    Cancel change
                  </Button>
                </div>
              )}

              {sendBackOpen && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <label className="form-label">
                    Review reason
                    <select
                      className="form-input"
                      value={reviewReason}
                      onChange={(event) => setReviewReason(event.target.value)}
                    >
                      <option value="">Select a reason</option>
                      <option>Insufficient information</option>
                      <option>Wrong category</option>
                      <option>Wrong team recommendation</option>
                      <option>Location requires verification</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <Button
                    className="mt-3 w-full"
                    variant="danger"
                    disabled={!reviewReason}
                    onClick={confirmSendBack}
                  >
                    Confirm send back
                  </Button>
                  <Button
                    className="mt-2 w-full"
                    variant="ghost"
                    onClick={() => setSendBackOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {!changingTeam && !sendBackOpen && (
                <>
                  <Button className="mt-5 w-full" onClick={confirmAssignment}>
                    Approve & assign
                  </Button>
                  <Button
                    className="mt-2 w-full"
                    variant="secondary"
                    onClick={() => setChangingTeam(true)}
                  >
                    Change team
                  </Button>
                  <Button
                    className="mt-2 w-full"
                    variant="ghost"
                    onClick={() => setSendBackOpen(true)}
                  >
                    Send back for review
                  </Button>
                </>
              )}
              <p className="mt-4 text-center text-[11px] font-semibold text-slate-400">
                AI recommends → System verifies → BQL approves → Assignment is created
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
        <ArrowLeft size={16} /> Back to incident
      </Link>
      <Card className="overflow-hidden border-emerald-200">
        <div className="bg-emerald-50 p-7 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-emerald-700 shadow-sm">
            <CheckCircle2 size={23} />
          </span>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-700">
            Assignment confirmed
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950">{team}</h1>
          <div className="mt-3 flex justify-center gap-2">
            <StatusBadge status="Assigned" />
            <Provenance tone="human">Human decision</Provenance>
          </div>
        </div>
        <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
          <TeamFact
            label="Assignment source"
            value="BQL-approved routing"
            provenance="System record"
          />
          <TeamFact label="Decision" value="Approved by BQL" provenance="Human decision" human />
          <TeamFact label="Assignment status" value="Assigned" provenance="System record" />
          <TeamFact
            label="Timestamp"
            value={decidedAt ?? "Just now · prototype state"}
            provenance="Local prototype"
          />
        </div>
        {changed && (
          <div className="border-t border-amber-100 bg-amber-50 p-5">
            <Provenance tone="human">Human override</Provenance>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              BQL changed the recommended team from {recommendedTeam} to {team}.
            </p>
          </div>
        )}
        <div className="p-5 text-center">
          <p className="text-sm font-semibold text-slate-800">
            AI recommendation → Human-approved assignment
          </p>
          <p className="mt-1 text-xs text-slate-500">
            This assignment exists only in local prototype state.
          </p>
          <Button className="mt-5" onClick={onReturn}>
            Return to incident <ArrowRight size={16} />
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
      {children}
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
