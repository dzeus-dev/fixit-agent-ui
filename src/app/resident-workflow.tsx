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
import {
  getProvenanceLabel,
  getResidentClarificationAnswer,
  getResidentIssueText,
  getResidentLocationText,
  getResidentQuestionOptionLabel,
  getResidentResolutionSummary,
  getResidentStatusContent,
  getResidentStatusLabel,
  getResidentTimelineLabel,
  getResidentTimelineTime,
  uiLabels,
} from "./ui-language";

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
          eyebrow={uiLabels.resident.clarification.eyebrow}
          title={uiLabels.resident.clarification.title}
          description={uiLabels.resident.clarification.description}
        />
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 p-6">
            <Question
              label={uiLabels.resident.clarification.drippingQuestion}
              name="dripping"
              value={dripping}
              setValue={setDripping}
              options={["Yes, actively dripping", "No, only visible water marks", "Not sure"]}
            />
          </div>
          <div className="p-6">
            <Question
              label={uiLabels.resident.clarification.waterLocationQuestion}
              name="water-location"
              value={waterLocation}
              setValue={setWaterLocation}
              options={["Ceiling", "Wall", "Floor", "Other"]}
            />
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <Button variant="secondary" onClick={() => setStage("form")}>
              {uiLabels.resident.clarification.back}
            </Button>
            <Button disabled={!dripping || !waterLocation} onClick={submitClarification}>
              {uiLabels.resident.clarification.updateReport} <ArrowRight size={15} />
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
          eyebrow={getResidentStatusLabel("Report received")}
          title={uiLabels.resident.preview.title}
          description={uiLabels.resident.preview.description}
        />
        {clarified && (
          <div
            className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"
            role="status"
          >
            <CheckCircle2 size={18} /> {uiLabels.resident.preview.updated}
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="p-5">
            <ProvenanceLabel>Resident-provided information</ProvenanceLabel>
            <h2 className="mt-3 text-sm font-bold text-slate-950">{getResidentIssueText(issue)}</h2>
            <p className="mt-2 text-sm text-slate-500">{getResidentLocationText(location)}</p>
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
              {uiLabels.resident.preview.aiHeading}
            </span>
            <p className="mt-3 text-xs text-slate-500">{uiLabels.resident.preview.understoodAs}</p>
            <h2 className="mt-1 text-lg font-bold text-slate-950">
              {uiLabels.resident.preview.activeWaterLeak}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{getResidentLocationText(location)}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <PreviewFact
                label={uiLabels.resident.preview.issueType}
                value={uiLabels.resident.preview.activeWaterLeak}
              />
              <PreviewFact
                label={uiLabels.resident.preview.status}
                value={uiLabels.resident.preview.underReview}
              />
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              {uiLabels.resident.preview.aiDisclaimer}
            </p>
          </Card>
        </div>
        <Card className="mt-5 border-sky-200 p-5">
          <div className="flex items-start gap-3">
            <Building2 size={19} className="mt-0.5 shrink-0 text-sky-700" />
            <div>
              <h2 className="text-sm font-bold text-slate-950">
                {uiLabels.resident.preview.relatedIncidentTitle}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {uiLabels.resident.preview.relatedIncidentDescription}
              </p>
            </div>
          </div>
        </Card>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => navigate("/resident/tickets/TKT-1024")}>
            {uiLabels.resident.preview.viewStatus} <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <ResidentPageHeading
        eyebrow={uiLabels.resident.report.eyebrow}
        title={uiLabels.resident.report.title}
        description={uiLabels.resident.report.description}
      />
      <Card>
        <form className="space-y-6 p-6" onSubmit={submit}>
          <label className="form-label">
            {uiLabels.resident.report.issueLabel}
            <textarea
              className="form-input min-h-32 resize-none"
              value={getResidentIssueText(issue)}
              onChange={(event) => setIssue(event.target.value)}
              placeholder={uiLabels.resident.report.issuePlaceholder}
              required
            />
          </label>
          <label className="form-label">
            {uiLabels.resident.report.locationLabel}
            <input
              className="form-input"
              value={getResidentLocationText(location)}
              onChange={(event) => setLocation(event.target.value)}
              placeholder={uiLabels.resident.report.locationPlaceholder}
              required
            />
          </label>
          <label className="form-label">
            {uiLabels.resident.report.additionalDetailsLabel}{" "}
            <span className="font-normal text-slate-400">
              {uiLabels.resident.report.optional}
            </span>
            <textarea
              className="form-input min-h-24 resize-none"
              value={additionalDetails}
              onChange={(event) => setAdditionalDetails(event.target.value)}
              placeholder={uiLabels.resident.report.additionalDetailsPlaceholder}
            />
          </label>
          <div>
            <p className="form-label">
              {uiLabels.resident.report.photoLabel}{" "}
              <span className="font-normal text-slate-400">
                {uiLabels.resident.report.optional}
              </span>
            </p>
            <label className="mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center hover:border-indigo-400 hover:bg-indigo-50/30">
              <UploadCloud size={22} className="text-slate-400" />
              <span className="mt-2 text-sm font-semibold text-slate-700">
                {photoName || uiLabels.resident.report.addPhoto}
              </span>
              <span className="mt-1 text-xs text-slate-400">
                {uiLabels.resident.report.photoSize}
              </span>
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
              {uiLabels.resident.report.submit} <ArrowRight size={16} />
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
  const statusContent = getResidentStatusContent(ticket.residentStatus);
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
          {uiLabels.resident.ticket.yourReport} · {id}
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-[-0.035em] text-slate-950">
              {getResidentIssueText(ticket.issue)}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {getResidentLocationText(ticket.location)}
            </p>
          </div>
          <ResidentStatusBadge status={ticket.residentStatus} />
        </div>
      </div>

      {clarificationSent && (
        <div
          className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"
          role="status"
        >
          <CheckCircle2 size={18} /> {uiLabels.resident.preview.updated} {statusContent.description}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-6">
          <Card className="overflow-hidden border-indigo-200">
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-indigo-600">
                {uiLabels.resident.ticket.currentStatus}
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-950">{statusContent.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{statusContent.description}</p>
            </div>
            <div className="border-t border-indigo-100 bg-indigo-50/40 px-6 py-4">
              <p className="text-xs font-bold text-slate-800">
                {uiLabels.resident.ticket.whatHappensNext}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{statusContent.next}</p>
            </div>
          </Card>

          {ticket.relatedIncident && (
            <Card className="border-sky-200 p-5">
              <div className="flex items-start gap-3">
                <Building2 size={19} className="mt-0.5 shrink-0 text-sky-700" />
                <div>
                  <h2 className="text-sm font-bold text-slate-950">
                    {uiLabels.resident.ticket.relatedIncidentTitle}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {uiLabels.resident.ticket.relatedIncidentDescription}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {needsInfo && (
            <Card className="overflow-hidden border-amber-200">
              <div className="bg-amber-50 p-5">
                <h2 className="text-base font-bold text-amber-950">
                  {uiLabels.resident.ticket.moreInformationTitle}
                </h2>
                <p className="mt-1 text-sm leading-6 text-amber-900">
                  {uiLabels.resident.ticket.moreInformationDescription}
                </p>
              </div>
              <div className="p-5">
                <Question
                  label={uiLabels.resident.clarification.drippingQuestion}
                  name="detail-clarification"
                  value={clarificationAnswer}
                  setValue={setClarificationAnswer}
                  options={["Yes, actively dripping", "No, only visible water marks", "Not sure"]}
                />
                <Button className="mt-5" disabled={!clarificationAnswer} onClick={provideDetails}>
                  {uiLabels.resident.clarification.provideDetails}
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
                    {uiLabels.resident.ticket.safetyTitle}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {uiLabels.resident.ticket.safetyDescription}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {uiLabels.resident.ticket.safetyGuidance}
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
                  <h2 className="text-base font-bold text-slate-950">
                    {uiLabels.resident.ticket.followUpTitle}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {uiLabels.resident.ticket.followUpDescription}
                  </p>
                  {ticket.feedback === "Still happening" && (
                    <p className="mt-3 rounded-lg bg-orange-50 p-3 text-sm font-semibold text-orange-900">
                      {uiLabels.resident.ticket.feedbackFollowUp}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-slate-400">
                    {uiLabels.resident.ticket.noCompletionTime}
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
                    {uiLabels.resident.ticket.resolutionReviewTitle}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {uiLabels.resident.ticket.resolutionReviewDescription}
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
                    <h2 className="text-base font-bold text-slate-950">
                      {uiLabels.resident.ticket.resolutionTitle}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {getResidentResolutionSummary(
                        ticket.resolutionSummary ??
                          "Water leakage was addressed by the maintenance team.",
                      )}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold text-emerald-800">
                  {getResidentStatusLabel("Issue resolved")}
                </p>
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-slate-900">
                  {uiLabels.resident.ticket.feedbackQuestion}
                </p>
                {ticket.feedback === "Resolved" ? (
                  <p
                    className="mt-3 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700"
                    role="status"
                  >
                    {uiLabels.resident.ticket.feedbackConfirmed}
                  </p>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button onClick={() => submitFeedback("Resolved")}>
                      {uiLabels.resident.ticket.feedbackResolved}
                    </Button>
                    <Button variant="secondary" onClick={() => submitFeedback("Still happening")}>
                      {uiLabels.resident.ticket.feedbackStillHappening}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )}

          <Card className="overflow-hidden">
            <SectionHeading title={uiLabels.resident.ticket.progressUpdates} />
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
                    <p className="text-sm font-semibold text-slate-800">
                      {getResidentTimelineLabel(event.label)}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {getResidentTimelineTime(event.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>

        <aside className="space-y-5">
          <Card>
            <SectionHeading title={uiLabels.resident.ticket.yourReport} />
            <dl className="px-5">
              <ResidentDetailRow
                label={uiLabels.resident.ticket.description}
                value={getResidentIssueText(ticket.issue)}
              />
              <ResidentDetailRow
                label={uiLabels.resident.ticket.location}
                value={getResidentLocationText(ticket.location)}
              />
              {ticket.additionalDetails && (
                <ResidentDetailRow
                  label={uiLabels.resident.ticket.additionalDetails}
                  value={ticket.additionalDetails}
                />
              )}
              <ResidentDetailRow
                label={uiLabels.resident.ticket.photo}
                value={
                  ticket.photoName
                    ? uiLabels.resident.ticket.photoAttached
                    : uiLabels.resident.ticket.noPhoto
                }
              />
              {ticket.clarificationAnswer && (
                <ResidentDetailRow
                  label={uiLabels.resident.ticket.clarification}
                  value={getResidentClarificationAnswer(ticket.clarificationAnswer)}
                />
              )}
            </dl>
          </Card>

          <details className="rounded-xl border border-dashed border-slate-300 bg-white">
            <summary className="cursor-pointer px-4 py-3 text-xs font-semibold text-slate-500">
              {uiLabels.resident.ticket.demoControl}
            </summary>
            <div className="border-t border-slate-100 p-4">
              <p className="mb-2 text-xs leading-5 text-slate-400">
                {uiLabels.resident.ticket.demoHelper}
              </p>
              <select
                className="form-input mt-0"
                value={ticket.residentStatus}
                onChange={(event) => setResidentStatus(event.target.value as ResidentStatus)}
              >
                <option value="Being reviewed">{getResidentStatusLabel("Being reviewed")}</option>
                <option value="Maintenance team assigned">
                  {getResidentStatusLabel("Maintenance team assigned")}
                </option>
                <option value="Maintenance team is working on it">
                  {getResidentStatusLabel("Maintenance team is working on it")}
                </option>
                <option value="Resolution is being reviewed">
                  {getResidentStatusLabel("Resolution is being reviewed")}
                </option>
                <option value="Issue resolved">{getResidentStatusLabel("Issue resolved")}</option>
                <option value="Follow-up required">
                  {getResidentStatusLabel("Follow-up required")}
                </option>
                <option value="More information needed">
                  {getResidentStatusLabel("More information needed")}
                </option>
                <option value="Additional safety review required">
                  {getResidentStatusLabel("Additional safety review required")}
                </option>
              </select>
            </div>
          </details>
        </aside>
      </div>
    </div>
  );
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
      {getResidentStatusLabel(status)}
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
            {getResidentQuestionOptionLabel(option)}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ProvenanceLabel({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600">
      {typeof children === "string" ? getProvenanceLabel(children) : children}
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
