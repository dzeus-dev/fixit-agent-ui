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
import { incidents, tasks, tickets, type Incident, type Ticket as TicketType } from "./data";

export function EntryPage() {
  const roles = [
    {
      title: "BQL / Dispatcher",
      description: "Triage reports, coordinate incidents, and approve operational decisions.",
      to: "/bql/dashboard",
      cta: "Enter BQL Console",
      icon: <Gauge size={22} />,
      primary: true,
    },
    {
      title: "Technician",
      description: "Review assigned work, capture evidence, and update task progress.",
      to: "/technician/tasks",
      cta: "Enter Technician Workspace",
      icon: <HardHat size={22} />,
    },
    {
      title: "Resident",
      description: "Report an issue and follow its status through resolution.",
      to: "/resident/report",
      cta: "Enter Resident Portal",
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
          Demo sign in
        </Link>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col px-6 pb-14 pt-16 lg:px-10 lg:pt-24">
        <div className="mb-14 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold text-indigo-200">
            <Sparkles size={14} /> Incident orchestration, with people in control
          </div>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.055em] sm:text-6xl">
            Turn resident reports into <span className="text-indigo-300">coordinated action.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            FixIt Agent helps property operations teams correlate tickets, manage incidents, and
            make faster, evidence-led decisions.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {roles.map((role) => (
            <Link
              key={role.title}
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
            <ShieldCheck size={15} /> Human approval built in
          </span>
          <span className="flex items-center gap-2">
            <CircleDot size={15} /> Operational context preserved
          </span>
          <span className="flex items-center gap-2">
            <FileCheck2 size={15} /> Evidence-led workflows
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
            Secure workspace
          </p>
          <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-950">Welcome back</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Sign in to continue to the FixIt Agent prototype.
          </p>
          <form className="mt-8 space-y-5" onSubmit={submit}>
            <label className="form-label">
              Email address
              <input
                className="form-input"
                type="email"
                defaultValue="demo@sunriseresidence.com"
                required
              />
            </label>
            <label className="form-label">
              Password
              <input className="form-input" type="password" defaultValue="prototype" required />
            </label>
            <label className="form-label">
              Demo role
              <select className="form-input" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="bql">BQL / Dispatcher</option>
                <option value="technician">Technician</option>
                <option value="resident">Resident</option>
              </select>
            </label>
            <Button className="w-full" type="submit">
              Sign In <ArrowRight size={16} />
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-400">
            Prototype access only. No real authentication is performed.
          </p>
        </div>
      </div>
      <div className="login-panel relative hidden overflow-hidden bg-slate-950 p-16 text-white lg:flex lg:flex-col lg:justify-end">
        <div className="relative z-10 max-w-lg">
          <span className="mb-6 grid size-12 place-items-center rounded-xl bg-indigo-400 text-slate-950">
            <BrainCircuit size={24} />
          </span>
          <h2 className="text-4xl font-bold leading-tight tracking-[-0.045em]">
            AI-assisted Incident Orchestration for Residential Operations
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            Move from fragmented reports to controlled, coordinated resolution—without removing
            human judgment.
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone,
  detail,
}: {
  label: string;
  value: string;
  tone: string;
  detail: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`size-2 rounded-full ${tone}`} />
      </div>
      <p className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </Card>
  );
}

export function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Good morning, Aisha"
        description="Here’s the operational picture across Sunrise Residence."
        actions={
          <Button>
            Review incident queue <ArrowRight size={16} />
          </Button>
        }
      />
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
            Operational summary
          </h2>
          <span className="text-xs text-slate-400">Updated just now</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard label="Open" value="18" tone="bg-sky-500" detail="4 new today" />
          <MetricCard label="Critical" value="3" tone="bg-red-500" detail="1 needs attention" />
          <MetricCard
            label="Pending Approval"
            value="5"
            tone="bg-violet-500"
            detail="Oldest: 36 min"
          />
          <MetricCard label="At Risk" value="4" tone="bg-orange-500" detail="Within 2h of SLA" />
          <MetricCard label="Resolved" value="27" tone="bg-emerald-500" detail="This week" />
        </div>
      </section>
      <div className="mt-7 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <Card>
          <SectionHeading title="Recent incidents" meta="Incident-level operations" />
          <div className="divide-y divide-slate-100">
            {incidents.slice(0, 4).map((incident) => (
              <Link
                key={incident.id}
                to={`/bql/incidents/${incident.id}`}
                className="group flex items-center gap-4 px-5 py-4 hover:bg-slate-50/80"
              >
                <IncidentMark />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600">{incident.id}</span>
                    <StatusBadge status={incident.status} />
                  </div>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                    {incident.title}{" "}
                    <span className="font-normal text-slate-400">· {incident.location}</span>
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-slate-700">{incident.tickets} tickets</p>
                  <p className="mt-1 text-xs text-slate-400">{incident.sla}</p>
                </div>
                <ChevronRight size={17} className="text-slate-300 group-hover:text-indigo-600" />
              </Link>
            ))}
          </div>
          <Link
            className="block border-t border-slate-100 px-5 py-3.5 text-center text-sm font-semibold text-indigo-600 hover:bg-slate-50"
            to="/bql/incidents"
          >
            View all incidents
          </Link>
        </Card>
        <Card>
          <SectionHeading title="Recent resident tickets" meta="Individual reports" />
          <div className="divide-y divide-slate-100">
            {tickets.slice(0, 4).map((ticket) => (
              <div key={ticket.id} className="flex items-center gap-3 px-5 py-4">
                <TicketMark />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-500">{ticket.id}</p>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                    {ticket.issue}
                  </p>
                </div>
                {ticket.incident ? (
                  <Link
                    to={`/bql/incidents/${ticket.incident}`}
                    className="text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    {ticket.incident}
                  </Link>
                ) : (
                  <span className="text-xs text-slate-400">Unlinked</span>
                )}
              </div>
            ))}
          </div>
          <Link
            className="block border-t border-slate-100 px-5 py-3.5 text-center text-sm font-semibold text-indigo-600 hover:bg-slate-50"
            to="/bql/tickets"
          >
            View ticket queue
          </Link>
        </Card>
      </div>
    </>
  );
}

export function TicketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Individual resident reports"
        title="Tickets"
        description="Each ticket is one resident’s report. Tickets may be correlated into a single operational incident."
        actions={<Button variant="secondary">Export queue</Button>}
      />
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
        <Ticket size={17} className="text-slate-500" />
        <strong className="text-slate-800">Ticket view</strong>
        <span className="text-slate-300">·</span> Reports remain individually traceable even when
        related to an incident.
      </div>
      <Table
        headers={[
          "Ticket ID",
          "Issue",
          "Location",
          "Category",
          "Priority",
          "Status",
          "Created",
          "Related incident",
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
      <td className="px-5 py-4 text-sm font-semibold text-slate-900">{ticket.issue}</td>
      <td className="px-5 py-4 text-sm text-slate-600">{ticket.location}</td>
      <td className="px-5 py-4 text-sm text-slate-600">{ticket.category}</td>
      <td className="px-5 py-4">
        <PriorityBadge priority={ticket.priority} />
      </td>
      <td className="px-5 py-4">
        <StatusBadge status={ticket.status} />
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-500">{ticket.created}</td>
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
          <span className="text-sm text-slate-400">Not linked</span>
        )}
      </td>
    </tr>
  );
}

export function IncidentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operational problems"
        title="Incidents"
        description="Prioritize, approve, and coordinate the operational response across related resident tickets."
        actions={<Button>Review pending approvals</Button>}
      />
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50/60 px-4 py-3 text-sm text-indigo-800">
        <Gauge size={17} />
        <strong>Incident view</strong>
        <span className="text-indigo-300">·</span> One incident can coordinate multiple related
        tickets and response actions.
      </div>
      <Table
        headers={[
          "Incident",
          "Location",
          "Related tickets",
          "Priority",
          "Status",
          "Assigned team",
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
              {incident.title}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-sm text-slate-600">{incident.location}</td>
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          <Ticket size={13} />
          {incident.tickets} tickets
        </span>
      </td>
      <td className="px-5 py-4">
        <PriorityBadge priority={incident.priority} />
      </td>
      <td className="px-5 py-4">
        <StatusBadge status={incident.status} />
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
        {incident.team}
      </td>
      <td
        className={`px-5 py-4 whitespace-nowrap text-sm font-bold ${slaColors[incident.slaTone]}`}
      >
        <Clock3 size={14} className="mr-1.5 inline" />
        {incident.sla}
      </td>
    </tr>
  );
}

function getIncident(id?: string) {
  return incidents.find((item) => item.id === id) ?? incidents[0];
}

export function IncidentDetailPage() {
  const { id } = useParams();
  const incident = getIncident(id);
  const related =
    incident.id === "INC-024"
      ? tickets.slice(0, 3)
      : tickets.filter((ticket) => ticket.incident === incident.id);
  return (
    <>
      <Link
        to="/bql/incidents"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back to incidents
      </Link>
      <PageHeader
        eyebrow={`Incident · ${incident.id}`}
        title={incident.title}
        description={incident.location}
        actions={
          <>
            <Button variant="secondary" onClick={() => {}}>
              Change
            </Button>
            <Link to={`/bql/incidents/${incident.id}/approval`}>
              <Button>Review approval</Button>
            </Link>
          </>
        }
      />
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-indigo-200 bg-white px-5 py-4 shadow-sm">
        <IncidentMark />
        <div className="mr-auto">
          <p className="text-xs font-semibold text-slate-400">Operational incident</p>
          <p className="text-sm font-bold text-slate-900">
            {incident.tickets} resident reports correlated
          </p>
        </div>
        <PriorityBadge priority={incident.priority} />
        <StatusBadge status={incident.status} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          <Card>
            <SectionHeading title="Related tickets" meta={`${related.length} individual reports`} />
            <div className="divide-y divide-slate-100">
              {related.map((ticket) => (
                <div key={ticket.id} className="flex items-center gap-4 px-5 py-4">
                  <TicketMark />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-500">{ticket.id}</p>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                      {ticket.issue}
                    </p>
                  </div>
                  <span className="hidden text-sm text-slate-500 sm:block">{ticket.location}</span>
                  <PriorityBadge priority={ticket.priority} />
                </div>
              ))}
            </div>
          </Card>
          <Card accent>
            <SectionHeading title="AI Recommendation" meta="Assistive · Requires review" />
            <div className="p-5">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                  <BrainCircuit size={20} />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    These {related.length || incident.tickets} tickets appear potentially related.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Shared location, issue category, and reporting window suggest a common
                    operational cause. Confirm the relationship before proceeding.
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-400">
                  Recommended action
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  Review related tickets and create incident.
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <SectionHeading title="Incident overview" />
            <dl className="px-5">
              <DetailRow label="Incident ID">{incident.id}</DetailRow>
              <DetailRow label="Priority">
                <PriorityBadge priority={incident.priority} />
              </DetailRow>
              <DetailRow label="Status">
                <StatusBadge status={incident.status} />
              </DetailRow>
              <DetailRow label="Location">{incident.location}</DetailRow>
              <DetailRow label="Assigned team">{incident.team}</DetailRow>
            </dl>
          </Card>
          <Card>
            <SectionHeading title="Actions" />
            <div className="space-y-2 p-4">
              <Link className="block" to={`/bql/incidents/${incident.id}/routing`}>
                <Button className="w-full justify-between" variant="secondary">
                  Review routing <Route size={16} />
                </Button>
              </Link>
              <Link className="block" to={`/bql/incidents/${incident.id}/approval`}>
                <Button className="w-full justify-between">
                  Approve recommendation <ArrowRight size={16} />
                </Button>
              </Link>
              <Button className="w-full" variant="ghost">
                Change recommendation
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export function RoutingPage() {
  const { id } = useParams();
  const incident = getIncident(id);
  return (
    <>
      <Link
        to={`/bql/incidents/${incident.id}`}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back to incident
      </Link>
      <PageHeader
        eyebrow={`${incident.id} · Routing`}
        title="Routing recommendation"
        description="Review the matching signals before assigning an operational team."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card accent>
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-indigo-600 text-white">
                  <Wrench size={22} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-indigo-600">
                    Recommended team
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-950">Technical — Plumbing</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Best match for this incident’s category and location.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                Strong match
              </span>
            </div>
          </div>
          <SectionHeading title="Matching signals" />
          <div className="grid gap-3 p-5 sm:grid-cols-3">
            {[
              ["Required skill", "Plumbing"],
              ["Location", "Tower A"],
              ["Current workload", "Moderate"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 p-4">
                <CheckCircle2 size={17} className="text-emerald-600" />
                <p className="mt-3 text-xs text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeading title="Decision" />
          <div className="p-5">
            <p className="text-sm leading-6 text-slate-500">
              Assignment remains pending until you confirm the recommendation.
            </p>
            <Button className="mt-5 w-full">Approve Assignment</Button>
            <Button className="mt-2 w-full" variant="secondary">
              Change
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export function ApprovalPage() {
  const { id } = useParams();
  const incident = getIncident(id);
  return (
    <>
      <Link
        to={`/bql/incidents/${incident.id}`}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back to incident
      </Link>
      <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50/70 p-5">
        <div className="flex items-start gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-violet-600 text-white">
            <UserCheck size={20} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-violet-700">
              Human approval required
            </p>
            <h1 className="mt-1 text-xl font-bold text-slate-950">
              This incident requires BQL approval before assignment.
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              AI has prepared a recommendation. The final decision remains with you.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <SectionHeading title="Approval evidence" meta={incident.id} />
          <div className="p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[.08em] text-slate-400">
                  Incident summary
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {incident.title} at {incident.location}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[.08em] text-slate-400">
                  Priority
                </p>
                <div className="mt-2">
                  <PriorityBadge priority={incident.priority} />
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
              <p className="text-xs font-bold uppercase tracking-[.08em] text-indigo-600">
                AI recommendation
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                Correlate 3 reports and route to Technical — Plumbing.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Evidence: shared issue category, same floor, and reports submitted within a
                24-minute window.
              </p>
            </div>
            <div className="mt-4">
              <label className="form-label">
                Reason / reviewer note
                <textarea
                  className="form-input min-h-24 resize-none"
                  placeholder="Add context for this decision (optional)"
                />
              </label>
            </div>
          </div>
        </Card>
        <Card>
          <SectionHeading title="Your decision" />
          <div className="space-y-2 p-5">
            <Button className="w-full" icon={<Check size={16} />}>
              Approve
            </Button>
            <Button className="w-full" variant="secondary">
              Change
            </Button>
            <Button className="w-full" variant="danger" icon={<XCircle size={16} />}>
              Reject
            </Button>
            <p className="pt-3 text-center text-xs leading-5 text-slate-400">
              Your decision and note will be added to the incident history.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}

export function TasksPage() {
  const assigned = tasks.filter((task) => task.status === "Assigned");
  const progress = tasks.filter((task) => task.status === "In Progress");
  return (
    <>
      <PageHeader title="My Tasks" description="Assigned maintenance work for Sunrise Residence." />
      <div className="grid gap-6 xl:grid-cols-2">
        <TaskGroup title="Assigned" count={assigned.length} tasks={assigned} />
        <TaskGroup title="In progress" count={progress.length} tasks={progress} />
      </div>
    </>
  );
}

function TaskGroup({
  title,
  count,
  tasks: taskList,
}: {
  title: string;
  count: number;
  tasks: typeof tasks;
}) {
  return (
    <Card>
      <SectionHeading title={title} meta={`${count} tasks`} />
      <div className="divide-y divide-slate-100">
        {taskList.map((task) => (
          <Link
            key={task.id}
            to={`/technician/tasks/${task.id}`}
            className="group flex items-center gap-4 p-5 hover:bg-slate-50"
          >
            <span className="grid size-10 place-items-center rounded-lg bg-blue-50 text-blue-600">
              <Wrench size={19} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600">{task.id}</span>
                <PriorityBadge priority={task.priority} />
              </div>
              <p className="mt-1.5 truncate text-sm font-bold text-slate-900">{task.incident}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={12} />
                {task.location}
              </p>
            </div>
            <ChevronRight size={17} className="text-slate-300 group-hover:text-blue-600" />
          </Link>
        ))}
      </div>
    </Card>
  );
}

export function TaskDetailPage() {
  const { id } = useParams();
  const task = tasks.find((item) => item.id === id) ?? tasks[0];
  return (
    <>
      <Link
        to="/technician/tasks"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back to my tasks
      </Link>
      <PageHeader
        eyebrow={`Task · ${task.id}`}
        title={task.incident}
        description={task.location}
        actions={<StatusBadge status={task.status} />}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Card>
            <SectionHeading title="Work details" />
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[.08em] text-slate-400">Issue</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{task.issue}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Incident</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{task.incidentId}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Priority</p>
                  <div className="mt-1">
                    <PriorityBadge priority={task.priority} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <SectionHeading title="Evidence" meta="Placeholder" />
            <div className="flex min-h-44 flex-col items-center justify-center p-6 text-center">
              <span className="grid size-11 place-items-center rounded-full bg-slate-100 text-slate-500">
                <Camera size={20} />
              </span>
              <p className="mt-3 text-sm font-semibold text-slate-800">Add site evidence</p>
              <p className="mt-1 text-xs text-slate-500">
                Photos and notes will be available in a later round.
              </p>
              <Button className="mt-4" variant="secondary" disabled>
                <Paperclip size={15} /> Add evidence
              </Button>
            </div>
          </Card>
        </div>
        <Card className="h-fit">
          <SectionHeading title="Update task" />
          <div className="space-y-3 p-5">
            <Button className="w-full">Start Work</Button>
            <Button className="w-full" variant="secondary" icon={<CheckCircle2 size={16} />}>
              Mark Resolved
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export function ReportPage() {
  const navigate = useNavigate();
  function submit(event: FormEvent) {
    event.preventDefault();
    navigate("/resident/tickets/TKT-1024");
  }
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Report an issue"
        description="Tell the property team what happened. Your report will stay individually traceable as a ticket."
      />
      <Card>
        <form className="space-y-6 p-6" onSubmit={submit}>
          <label className="form-label">
            Issue description
            <textarea
              className="form-input min-h-32 resize-none"
              placeholder="Describe what you noticed, when it started, and any immediate safety concerns..."
              required
            />
          </label>
          <label className="form-label">
            Location / Unit
            <input className="form-input" placeholder="e.g. Tower A / Unit 12-08" required />
          </label>
          <div>
            <p className="form-label">
              Image upload <span className="font-normal text-slate-400">(optional)</span>
            </p>
            <label className="mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center hover:border-indigo-400 hover:bg-indigo-50/30">
              <UploadCloud size={24} className="text-slate-400" />
              <span className="mt-3 text-sm font-semibold text-slate-700">Upload a photo</span>
              <span className="mt-1 text-xs text-slate-400">PNG or JPG up to 10 MB</span>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          <div className="flex justify-end border-t border-slate-100 pt-5">
            <Button type="submit">
              Submit Report <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export function ResidentTicketPage() {
  const { id } = useParams();
  const timeline = [
    { label: "Submitted", detail: "Today, 9:42 AM", done: true },
    { label: "Under Review", detail: "Property team is reviewing your report", done: true },
    { label: "Assigned", detail: "Next step", done: false },
    { label: "In Progress", detail: "", done: false },
    { label: "Resolved", detail: "", done: false },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow={`Ticket · ${id}`}
        title="Ceiling leaking"
        description="Tower A / Unit 12-08"
        actions={<StatusBadge status="Under Review" />}
      />
      <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
        <Card>
          <SectionHeading title="Report details" />
          <dl className="px-5">
            <DetailRow label="Ticket ID">{id}</DetailRow>
            <DetailRow label="Issue">Ceiling leaking</DetailRow>
            <DetailRow label="Submitted">Today, 9:42 AM</DetailRow>
            <DetailRow label="Current status">
              <StatusBadge status="Under Review" />
            </DetailRow>
          </dl>
          <div className="mx-5 mb-5 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            The property team has received your report and is assessing the next action.
          </div>
        </Card>
        <Card>
          <SectionHeading title="Report timeline" />
          <div className="p-6">
            {timeline.map((item, index) => (
              <div key={item.label} className="relative flex gap-4 pb-7 last:pb-0">
                {index < timeline.length - 1 && (
                  <span
                    className={`absolute left-[11px] top-6 h-full w-px ${item.done && timeline[index + 1].done ? "bg-indigo-400" : "bg-slate-200"}`}
                  />
                )}
                <span
                  className={`relative z-10 mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${item.done ? "bg-indigo-600 text-white" : "border-2 border-slate-200 bg-white text-transparent"}`}
                >
                  {item.done && <Check size={13} />}
                </span>
                <div>
                  <p
                    className={`text-sm font-semibold ${item.done ? "text-slate-900" : "text-slate-400"}`}
                  >
                    {item.label}
                  </p>
                  {item.detail && <p className="mt-1 text-xs text-slate-500">{item.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <div className="text-center">
        <p className="font-mono text-sm font-bold text-indigo-600">404</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">Page not found</h1>
        <p className="mt-2 text-slate-500">The workspace route you requested does not exist.</p>
        <Link to="/">
          <Button className="mt-6">Return to role selector</Button>
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
