import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { ResidentStatus, ResidentTicketView } from "./data";
import { useOperationalState } from "./operational-state";

interface SubmitReportInput {
  issue: string;
  location: string;
  additionalDetails?: string;
  photoName?: string;
}

interface ResidentStateContextValue {
  ticket: ResidentTicketView;
  submitReport: (input: SubmitReportInput) => void;
  answerClarification: (answer: string) => void;
  setResidentStatus: (status: ResidentStatus) => void;
  submitFeedback: (feedback: "Resolved" | "Still happening") => void;
}

const initialTicket: ResidentTicketView = {
  ticketId: "TKT-1024",
  issue: "Water is leaking from my kitchen ceiling.",
  location: "Tower A · Unit A-1204",
  residentStatus: "Being reviewed",
  relatedIncident: true,
  relatedIncidentMessage: "This issue is being coordinated with other reports in your building.",
  timeline: [
    { label: "Report received", timestamp: "14:03" },
    { label: "Your report is being reviewed", timestamp: "14:05" },
  ],
};

const statusTimelines: Partial<Record<ResidentStatus, ResidentTicketView["timeline"]>> = {
  "Report received": [{ label: "Report received", timestamp: "14:03" }],
  "Being reviewed": [
    { label: "Report received", timestamp: "14:03" },
    { label: "Your report is being reviewed", timestamp: "14:05" },
  ],
  "Maintenance team assigned": [
    { label: "Report received", timestamp: "14:03" },
    { label: "Your report is being reviewed", timestamp: "14:05" },
    { label: "Maintenance team assigned", timestamp: "14:20" },
  ],
  "Maintenance team is working on it": [
    { label: "Report received", timestamp: "14:03" },
    { label: "Your report is being reviewed", timestamp: "14:05" },
    { label: "Maintenance team assigned", timestamp: "14:20" },
    { label: "Maintenance work started", timestamp: "14:32" },
  ],
  "Resolution is being reviewed": [
    { label: "Report received", timestamp: "14:03" },
    { label: "Your report is being reviewed", timestamp: "14:05" },
    { label: "Maintenance team assigned", timestamp: "14:20" },
    { label: "Maintenance work started", timestamp: "14:32" },
    { label: "Maintenance work completed", timestamp: "15:02" },
    { label: "Resolution is being reviewed", timestamp: "15:04" },
  ],
  "Issue resolved": [
    { label: "Report received", timestamp: "14:03" },
    { label: "Your report is being reviewed", timestamp: "14:05" },
    { label: "Maintenance team assigned", timestamp: "14:20" },
    { label: "Maintenance work started", timestamp: "14:32" },
    { label: "Issue resolved", timestamp: "15:10" },
  ],
  "Follow-up required": [
    { label: "Report received", timestamp: "14:03" },
    { label: "Your report is being reviewed", timestamp: "14:05" },
    { label: "Maintenance visit completed", timestamp: "15:02" },
    { label: "Additional work is required", timestamp: "15:06" },
  ],
  "More information needed": [
    { label: "Report received", timestamp: "14:03" },
    { label: "More information requested", timestamp: "14:05" },
  ],
  "Additional safety review required": [
    { label: "Report received", timestamp: "14:03" },
    { label: "Your report is being reviewed", timestamp: "14:05" },
    { label: "Additional safety review required", timestamp: "14:18" },
  ],
};

const ResidentStateContext = createContext<ResidentStateContextValue | null>(null);

export function ResidentStateProvider({ children }: { children: ReactNode }) {
  const {
    state: operationalState,
    setResidentStatus: setOperationalResidentStatus,
    submitResidentFeedback,
  } = useOperationalState();
  const [ticket, setTicket] = useState<ResidentTicketView>(initialTicket);

  const value = useMemo<ResidentStateContextValue>(() => {
    const effectiveTicket: ResidentTicketView = {
      ...ticket,
      residentStatus: operationalState.residentStatus,
      timeline:
        ticket.feedback === "Still happening"
          ? ticket.timeline
          : (statusTimelines[operationalState.residentStatus] ?? ticket.timeline),
      resolutionSummary:
        operationalState.residentStatus === "Issue resolved"
          ? "Water leakage was addressed by the maintenance team."
          : ticket.resolutionSummary,
    };
    return {
      ticket: effectiveTicket,
      submitReport(input) {
        setTicket((current) => ({
          ...current,
          ...input,
          residentStatus: "Being reviewed",
          timeline: statusTimelines["Being reviewed"] ?? current.timeline,
          feedback: undefined,
        }));
        setOperationalResidentStatus("Being reviewed");
      },
      answerClarification(answer) {
        setTicket((current) => ({
          ...current,
          clarificationAnswer: answer,
          residentStatus: "Being reviewed",
          timeline: [
            { label: "Report received", timestamp: "14:03" },
            { label: "Additional details received", timestamp: "Just now" },
            { label: "Your report is being reviewed", timestamp: "Just now" },
          ],
        }));
        setOperationalResidentStatus("Being reviewed");
      },
      setResidentStatus(status) {
        setTicket((current) => ({
          ...current,
          residentStatus: status,
          timeline: statusTimelines[status] ?? current.timeline,
          resolutionSummary:
            status === "Issue resolved"
              ? "Water leakage was addressed by the maintenance team."
              : current.resolutionSummary,
          feedback: status === "Issue resolved" ? undefined : current.feedback,
        }));
        setOperationalResidentStatus(status);
      },
      submitFeedback(feedback) {
        setTicket((current) => ({
          ...current,
          feedback,
          residentStatus:
            feedback === "Still happening" ? "Follow-up required" : current.residentStatus,
          timeline:
            feedback === "Still happening"
              ? [
                  ...current.timeline,
                  {
                    label: "Resident reported the issue is still happening",
                    timestamp: "Just now",
                  },
                  { label: "Building management review requested", timestamp: "Just now" },
                ]
              : current.timeline,
        }));
        submitResidentFeedback(feedback);
      },
    };
  }, [
    operationalState.residentStatus,
    setOperationalResidentStatus,
    submitResidentFeedback,
    ticket,
  ]);

  return <ResidentStateContext.Provider value={value}>{children}</ResidentStateContext.Provider>;
}

export function useResidentState() {
  const context = useContext(ResidentStateContext);
  if (!context) {
    throw new Error("useResidentState must be used within ResidentStateProvider");
  }
  return context;
}
