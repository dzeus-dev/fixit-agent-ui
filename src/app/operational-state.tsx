import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type {
  AffectedAreaConfirmation,
  ResidentStatus,
  ResolutionStatus,
  TaskStatus,
} from "./data";

export type HeroIncidentStatus =
  | "Pending Approval"
  | "Assigned"
  | "In Progress"
  | "Resolution Review"
  | "Resolved";

export interface HeroResolutionRecord {
  resolutionStatus: ResolutionStatus;
  resolutionNote: string;
  finding: string;
  affectedAreaConfirmed: AffectedAreaConfirmation;
  escalationReason?: string;
  recordedAt: string;
}

export interface OperationalState {
  incidentStatus: HeroIncidentStatus;
  routingStatus: "Pending Approval" | "Approved" | "Changed" | "Sent Back";
  assignedTeam?: string;
  assignmentCreated: boolean;
  taskStatus: TaskStatus;
  resolutionStatus?: ResolutionStatus;
  resolution?: HeroResolutionRecord;
  bqlReviewStatus: "Pending" | "Reviewed" | "Closed";
  residentStatus: ResidentStatus;
}

interface OperationalStateContextValue {
  state: OperationalState;
  approveRouting: (team: string, changed: boolean) => void;
  sendRoutingBack: () => void;
  startTask: () => void;
  recordTechnicianResolution: (record: Omit<HeroResolutionRecord, "recordedAt">) => void;
  confirmResolution: () => void;
  requestFollowUp: () => void;
  setResidentStatus: (status: ResidentStatus) => void;
  submitResidentFeedback: (feedback: "Resolved" | "Still happening") => void;
}

const initialState: OperationalState = {
  incidentStatus: "Pending Approval",
  routingStatus: "Pending Approval",
  assignmentCreated: false,
  taskStatus: "Assigned",
  bqlReviewStatus: "Pending",
  residentStatus: "Being reviewed",
};

const OperationalStateContext = createContext<OperationalStateContextValue | null>(null);

export function OperationalStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OperationalState>(initialState);

  const value = useMemo<OperationalStateContextValue>(
    () => ({
      state,
      approveRouting(team, changed) {
        setState((current) => ({
          ...current,
          incidentStatus: "Assigned",
          routingStatus: changed ? "Changed" : "Approved",
          assignedTeam: team,
          assignmentCreated: true,
          taskStatus: "Assigned",
          bqlReviewStatus: "Pending",
          residentStatus: "Maintenance team assigned",
        }));
      },
      sendRoutingBack() {
        setState((current) => ({
          ...current,
          incidentStatus: "Pending Approval",
          routingStatus: "Sent Back",
          assignmentCreated: false,
          assignedTeam: undefined,
          residentStatus: "Being reviewed",
        }));
      },
      startTask() {
        setState((current) => ({
          ...current,
          incidentStatus: "In Progress",
          taskStatus: "In Progress",
          residentStatus: "Maintenance team is working on it",
        }));
      },
      recordTechnicianResolution(record) {
        const resolved = record.resolutionStatus === "Resolved";
        setState((current) => ({
          ...current,
          incidentStatus: resolved ? "Resolution Review" : "In Progress",
          taskStatus: resolved ? "Resolved" : "Needs Follow-up",
          resolutionStatus: record.resolutionStatus,
          resolution: { ...record, recordedAt: "Just now · prototype state" },
          bqlReviewStatus: "Pending",
          residentStatus: resolved ? "Resolution is being reviewed" : "Follow-up required",
        }));
      },
      confirmResolution() {
        setState((current) => ({
          ...current,
          incidentStatus: "Resolved",
          bqlReviewStatus: "Closed",
          residentStatus: "Issue resolved",
        }));
      },
      requestFollowUp() {
        setState((current) => ({
          ...current,
          incidentStatus: "In Progress",
          taskStatus: "Needs Follow-up",
          bqlReviewStatus: "Reviewed",
          residentStatus: "Follow-up required",
        }));
      },
      setResidentStatus(status) {
        setState((current) => ({ ...current, residentStatus: status }));
      },
      submitResidentFeedback(feedback) {
        if (feedback === "Still happening") {
          setState((current) => ({
            ...current,
            residentStatus: "Follow-up required",
            bqlReviewStatus: "Reviewed",
          }));
        }
      },
    }),
    [state],
  );

  return (
    <OperationalStateContext.Provider value={value}>{children}</OperationalStateContext.Provider>
  );
}

export function useOperationalState() {
  const context = useContext(OperationalStateContext);
  if (!context) {
    throw new Error("useOperationalState must be used within OperationalStateProvider");
  }
  return context;
}
