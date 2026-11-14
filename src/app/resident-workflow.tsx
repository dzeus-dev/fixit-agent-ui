import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  FileText,
  ShieldAlert,
  UploadCloud,
  Wrench,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Button, Card, SectionHeading } from "./components";
import type { ResidentStatus } from "./data";
import { useResidentState } from "./resident-state";

type ReportStage = "form" | "clarification" | "preview";

export function ResidentReportPage() {
  const navigate = useNavigate();
  const { submitReport, answerClarification } = useResidentState();
  const [stage, setStage] = useState<ReportStage>("form");
  const [issue, setIssue] = useState("Water is leaking from my kitchen ceiling.");
  const [location, setLocation] = useState("Tower A · Unit A-1204");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [dripping, setDripping] = useState("");
  const [waterLocation, setWaterLocation] = useState("");
  const [clarified, setClarified] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    submitReport({ issue, location, additionalDetails, photoName });
    setStage(additionalDetails.trim() ? "preview" : "clarification");
  }

  function submitClarification() {
    if (!dripping || !waterLocation) return;
    answerClarification(`${dripping}; water appearing on ${waterLocation.toLowerCase()}`);
    setClarified(true);
    setStage("preview");
  }

  if (stage === "clarification") {
    return (
      <div className="mx-auto max-w-2xl">
        <ResidentPageHeading
          eyebrow="One quick step"
          title="We need a little more information"
          description="Your answers help the building team understand what to review first."
        />
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 p-6">
            <Question
              label="Is water currently dripping?"
              name="dripping"
              value={dripping}
              setValue={setDripping}
              options={["Yes, actively dripping", "No, only visible water marks", "Not sure"]}
            />
          </div>
          <div className="p-6">
            <Question
              label="Where is the water appearing?"
              name="water-location"
              value={waterLocation}
              setValue={setWaterLocation}
              options={["Ceiling", "Wall", "Floor", "Other"]}
            />
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <Button variant="secondary" onClick={() => setStage("form")}>
              Back
            </Button>
            <Button disabled={!dripping || !waterLocation} onClick={submitClarification}>
              Update report <ArrowRight size={15} />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (stage === "preview") {
    return (
      <div className="mx-auto max-w-3xl">
        <ResidentPageHeading
          eyebrow="Report received"
          title="Thanks — we’ve received your report"
          description="Here is what we understood. The building management team will review it."
        />
        {clarified && (
          <div
            className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"
            role="status"
          >
            <CheckCircle2 size={18} /> Thanks. Your report has been updated.
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="p-5">
            <ProvenanceLabel>Resident-provided information</ProvenanceLabel>
            <h2 className="mt-3 text-sm font-bold text-slate-950">{issue}</h2>
            <p className="mt-2 text-sm text-slate-500">{location}</p>
            {additionalDetails && (
              <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                {additionalDetails}
              </p>
            )}
            {photoName && (
              <p className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                <Camera size={14} /> {photoName}
              </p>
            )}
          </Card>
          <Card className="border-indigo-200 p-5">
            <span className="rounded bg-indigo-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-indigo-700">
              AI-understood information
            </span>
            <p className="mt-3 text-xs text-slate-500">We understood your report as:</p>
            <h2 className="mt-1 text-lg font-bold text-slate-950">Active water leak</h2>
            <p className="mt-1 text-sm text-slate-600">{location}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <PreviewFact label="Possible issue type" value="Plumbing" />
              <PreviewFact label="Status" value="Under review" />
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Based on your description. This is not a diagnosis of the physical cause.
            </p>
          </Card>
        </div>
        <Card className="mt-5 border-sky-200 p-5">
          <div className="flex items-start gap-3">
            <Building2 size={19} className="mt-0.5 shrink-0 text-sky-700" />
            <div>
              <h2 className="text-sm font-bold text-slate-950">
                Your report may be related to an ongoing building issue
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Your report will be handled together with the existing issue where appropriate.
                Building management will confirm how the reports should be coordinated.
              </p>
            </div>
          </div>
        </Card>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => navigate("/resident/tickets/TKT-1024")}>
            View report status <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <ResidentPageHeading
        eyebrow="Resident report"
        title="Report an issue"
        description="Tell us what happened in your own words. You do not need to choose a category or priority."
      />
      <Card>
        <form className="space-y-6 p-6" onSubmit={submit}>
          <label className="form-label">
            Issue description
            <textarea
              className="form-input min-h-32 resize-none"
              value={issue}
              onChange={(event) => setIssue(event.target.value)}
              placeholder="Describe what you noticed and when it started."
              required
            />
          </label>
          <label className="form-label">
            Location / unit
            <input
              className="form-input"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. Tower A · Unit A-1204"
              required
            />
          </label>
          <label className="form-label">
            Additional details <span className="font-normal text-slate-400">(optional)</span>
            <textarea
              className="form-input min-h-24 resize-none"
              value={additionalDetails}
              onChange={(event) => setAdditionalDetails(event.target.value)}
              placeholder="Anything else the building team should know?"
            />
          </label>
          <div>
            <p className="form-label">
              Photo <span className="font-normal text-slate-400">(optional)</span>
            </p>
            <label className="mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center hover:border-indigo-400 hover:bg-indigo-50/30">
              <UploadCloud size={22} className="text-slate-400" />
              <span className="mt-2 text-sm font-semibold text-slate-700">
                {photoName || "Add a photo"}
              </span>
              <span className="mt-1 text-xs text-slate-400">PNG or JPG up to 10 MB</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")}
              />
            </label>
          </div>
          <div className="flex justify-end border-t border-slate-100 pt-5">
            <Button type="submit">
              Submit report <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export function ResidentIssueStatusPage() {
  const { id } = useParams();
  const { ticket, answerClarification, setResidentStatus, submitFeedback } = useResidentState();
  const [clarificationAnswer, setClarificationAnswer] = useState("");
  const [clarificationSent, setClarificationSent] = useState(false);
  const statusContent = getStatusContent(ticket.residentStatus);
  const resolved = ticket.residentStatus === "Issue resolved";
  const followUp = ticket.residentStatus === "Follow-up required";
  const safety = ticket.residentStatus === "Additional safety review required";
  const needsInfo = ticket.residentStatus === "More information needed";

  function provideDetails() {
    if (!clarificationAnswer) return;
    answerClarification(clarificationAnswer);
    setClarificationSent(true);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-600">
          Your report · {id}
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-[-0.035em] text-slate-950">
              {ticket.issue}
            </h1>
            <p className="mt-2 text-sm text-slate-500">{ticket.location}</p>
          </div>
          <ResidentStatusBadge status={ticket.residentStatus} />
        </div>
      </div>

      {clarificationSent && (
        <div
          className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"
          role="status"
        >
          <CheckCircle2 size={18} /> Thanks. Your report has been updated and is under review.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-6">
          <Card className="overflow-hidden border-indigo-200">
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-indigo-600">
                Current status
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-950">{statusContent.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{statusContent.description}</p>
            </div>
            <div className="border-t border-indigo-100 bg-indigo-50/40 px-6 py-4">
              <p className="text-xs font-bold text-slate-800">What happens next</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{statusContent.next}</p>
            </div>
          </Card>

          {ticket.relatedIncident && (
            <Card className="border-sky-200 p-5">
              <div className="flex items-start gap-3">
                <Building2 size={19} className="mt-0.5 shrink-0 text-sky-700" />
                <div>
                  <h2 className="text-sm font-bold text-slate-950">Related building issue</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Other residents have reported similar water leakage in this area.{" "}
                    {ticket.relatedIncidentMessage}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Building management confirms how reports are coordinated. Reports are not
                    automatically merged.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {needsInfo && (
            <Card className="overflow-hidden border-amber-200">
              <div className="bg-amber-50 p-5">
                <h2 className="text-base font-bold text-amber-950">More information needed</h2>
                <p className="mt-1 text-sm leading-6 text-amber-900">
                  We need a little more information to continue reviewing your report.
                </p>
              </div>
              <div className="p-5">
                <Question
                  label="Is water currently dripping?"
                  name="detail-clarification"
                  value={clarificationAnswer}
                  setValue={setClarificationAnswer}
                  options={["Yes, actively dripping", "No, only visible water marks", "Not sure"]}
                />
                <Button className="mt-5" disabled={!clarificationAnswer} onClick={provideDetails}>
                  Provide more details
                </Button>
              </div>
            </Card>
          )}

          {safety && (
            <Card className="border-red-200 p-5">
              <div className="flex items-start gap-3">
                <ShieldAlert size={20} className="mt-0.5 shrink-0 text-red-700" />
                <div>
                  <h2 className="text-base font-bold text-slate-950">
                    Additional safety review required
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    This issue requires additional safety review before work can continue. Please
                    avoid the affected area if it appears unsafe.
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Static safety guidance. This portal does not provide emergency dispatch.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {followUp && (
            <Card className="border-orange-200 p-5">
              <div className="flex items-start gap-3">
                <Wrench size={19} className="mt-0.5 shrink-0 text-orange-700" />
                <div>
                  <h2 className="text-base font-bold text-slate-950">Follow-up required</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    The maintenance team needs additional work to resolve this issue. Building
                    management is reviewing the next step.
                  </p>
                  {ticket.feedback === "Still happening" && (
                    <p className="mt-3 rounded-lg bg-orange-50 p-3 text-sm font-semibold text-orange-900">
                      Thanks for letting us know. The building management team will review this
                      issue again.
                    </p>
                  )}
                  <p className="mt-2 text-xs text-slate-400">
                    No automatic reassignment or resolution time is promised.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {ticket.residentStatus === "Resolution is being reviewed" && (
            <Card className="border-blue-200 p-5">
              <div className="flex items-start gap-3">
                <ClipboardStatusIcon />
                <div>
                  <h2 className="text-base font-bold text-slate-950">
                    Maintenance work has been completed
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    The building management team is reviewing the result. The broader issue has not
                    been marked closed yet.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {resolved && (
            <Card className="overflow-hidden border-emerald-200">
              <div className="bg-emerald-50 p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={21} className="text-emerald-700" />
                  <div>
                    <h2 className="text-base font-bold text-slate-950">Resolution</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {ticket.resolutionSummary ??
                        "Water leakage was addressed by the maintenance team."}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold text-emerald-800">Resolved · 15:10</p>
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-slate-900">Was your issue resolved?</p>
                {ticket.feedback === "Resolved" ? (
                  <p
                    className="mt-3 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700"
                    role="status"
                  >
                    Thanks for confirming that the issue is resolved.
                  </p>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button onClick={() => submitFeedback("Resolved")}>Yes, resolved</Button>
                    <Button variant="secondary" onClick={() => submitFeedback("Still happening")}>
                      Still happening
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )}

          <Card className="overflow-hidden">
            <SectionHeading title="Progress updates" />
            <div className="p-5">
              {ticket.timeline.map((event, index) => (
                <div key={`${event.label}-${index}`} className="relative flex gap-4 pb-6 last:pb-0">
                  {index < ticket.timeline.length - 1 && (
                    <span className="absolute left-[7px] top-4 h-full w-px bg-slate-200" />
                  )}
                  <span
                    className={`relative z-10 mt-1 size-4 shrink-0 rounded-full ring-4 ring-white ${
                      index === ticket.timeline.length - 1 ? "bg-indigo-600" : "bg-slate-300"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{event.label}</p>
                    <p className="mt-1 text-xs text-slate-400">{event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>

        <aside className="space-y-5">
          <Card>
            <SectionHeading title="Your report" />
            <dl className="px-5">
              <ResidentDetailRow label="Description" value={ticket.issue} />
              <ResidentDetailRow label="Location" value={ticket.location} />
              {ticket.additionalDetails && (
                <ResidentDetailRow label="Additional details" value={ticket.additionalDetails} />
              )}
              <ResidentDetailRow
                label="Photo"
                value={ticket.photoName ? "Photo attached" : "No photo attached"}
              />
              {ticket.clarificationAnswer && (
                <ResidentDetailRow label="Clarification" value={ticket.clarificationAnswer} />
              )}
            </dl>
          </Card>

          <details className="rounded-xl border border-dashed border-slate-300 bg-white">
            <summary className="cursor-pointer px-4 py-3 text-xs font-semibold text-slate-500">
              Prototype / Demo control
            </summary>
            <div className="border-t border-slate-100 p-4">
              <p className="mb-2 text-xs leading-5 text-slate-400">
                Preview resident-safe states without exposing internal workflow controls.
              </p>
              <select
                className="form-input mt-0"
                value={ticket.residentStatus}
                onChange={(event) => setResidentStatus(event.target.value as ResidentStatus)}
              >
                <option>Being reviewed</option>
                <option>Maintenance team assigned</option>
                <option>Maintenance team is working on it</option>
                <option>Resolution is being reviewed</option>
                <option>Issue resolved</option>
                <option>Follow-up required</option>
                <option>More information needed</option>
                <option>Additional safety review required</option>
              </select>
            </div>
          </details>
        </aside>
      </div>
    </div>
  );
}

function getStatusContent(status: ResidentStatus) {
  const content: Record<ResidentStatus, { title: string; description: string; next: string }> = {
    "Report received": {
      title: "Report received",
      description: "We have received your issue report.",
      next: "The building management team will review the information you provided.",
    },
    "Being reviewed": {
      title: "Your report is being reviewed",
      description: "The building management team is reviewing your report.",
      next: "We are confirming the right next step before maintenance work proceeds.",
    },
    "Maintenance team assigned": {
      title: "A maintenance team has been assigned",
      description: "The building team has arranged for maintenance to review the issue.",
      next: "The maintenance team will begin work when access and conditions allow.",
    },
    "Maintenance team is working on it": {
      title: "Maintenance team is working on it",
      description: "Maintenance work is currently in progress.",
      next: "We will update this report after the maintenance team records the result.",
    },
    "Resolution is being reviewed": {
      title: "Resolution is being reviewed",
      description: "Maintenance work has been completed.",
      next: "The building management team is reviewing the result before closing the issue.",
    },
    "Issue resolved": {
      title: "Issue marked as resolved",
      description: "The building management team has completed its final review.",
      next: "Please let us know if the issue is still happening.",
    },
    "Follow-up required": {
      title: "Follow-up required",
      description: "Additional work is needed to resolve this issue.",
      next: "Building management is reviewing the next step. No specific time is promised yet.",
    },
    "More information needed": {
      title: "More information needed",
      description: "We need a little more information to continue reviewing your report.",
      next: "Answer the question below and your report will return to review.",
    },
    "Additional safety review required": {
      title: "Additional safety review required",
      description: "The issue needs another safety review before work can continue.",
      next: "Please avoid the affected area if it appears unsafe.",
    },
  };
  return content[status];
}

function ResidentStatusBadge({ status }: { status: ResidentStatus }) {
  const resolved = status === "Issue resolved";
  const attention =
    status === "Follow-up required" ||
    status === "More information needed" ||
    status === "Additional safety review required";
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${
        resolved
          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/15"
          : attention
            ? "bg-amber-50 text-amber-700 ring-amber-600/15"
            : "bg-indigo-50 text-indigo-700 ring-indigo-600/15"
      }`}
    >
      <span className="mr-1.5 size-1.5 rounded-full bg-current opacity-75" />
      {status}
    </span>
  );
}

function ResidentPageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-600">{eyebrow}</p>
      <h1 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-slate-950">{title}</h1>
      <p className="mt-1.5 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function Question({
  label,
  name,
  value,
  setValue,
  options,
}: {
  label: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-900">{label}</legend>
      <div className="mt-3 grid gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${
              value === option
                ? "border-indigo-300 bg-indigo-50 text-indigo-900"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => setValue(option)}
              className="size-4 accent-indigo-600"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ProvenanceLabel({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600">
      {children}
    </span>
  );
}

function PreviewFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">{label}</p>
      <p className="mt-1 text-xs font-bold text-slate-800">{value}</p>
    </div>
  );
}

function ResidentDetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-slate-100 py-3 last:border-0">
      <dt className="text-xs text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold leading-5 text-slate-800">{value}</dd>
    </div>
  );
}

function ClipboardStatusIcon() {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
      <FileText size={17} />
    </span>
  );
}
