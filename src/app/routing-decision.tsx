import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { incidents } from "./data";

export type RoutingDecisionStatus = "Pending Approval" | "Approved" | "Changed" | "Sent Back";

export interface RoutingDecision {
  incidentId: string;
  recommendedTeam: string;
  currentTeam: string;
  selectedTeam: string;
  approvedTeam?: string;
  status: RoutingDecisionStatus;
  decisionReason?: string;
  decisionSource?: "BQL";
  decidedAt?: string;
}

interface RoutingDecisionContextValue {
  decisions: Record<string, RoutingDecision>;
  selectTeam: (incidentId: string, team: string) => void;
  approve: (incidentId: string, team: string) => void;
  sendBack: (incidentId: string, reason: string) => void;
}

const initialDecisions = Object.fromEntries(
  incidents.map((incident) => [
    incident.id,
    {
      incidentId: incident.id,
      recommendedTeam: incident.recommendedTeam,
      currentTeam: incident.currentTeam,
      selectedTeam: incident.recommendedTeam,
      status: "Pending Approval" as RoutingDecisionStatus,
    },
  ]),
);

const RoutingDecisionContext = createContext<RoutingDecisionContextValue | null>(null);

export function RoutingDecisionProvider({ children }: { children: ReactNode }) {
  const [decisions, setDecisions] = useState<Record<string, RoutingDecision>>(initialDecisions);

  const value = useMemo<RoutingDecisionContextValue>(
    () => ({
      decisions,
      selectTeam(incidentId, team) {
        setDecisions((current) => ({
          ...current,
          [incidentId]: {
            ...current[incidentId],
            selectedTeam: team,
            status: "Pending Approval",
            approvedTeam: undefined,
            decisionReason: undefined,
            decisionSource: undefined,
            decidedAt: undefined,
          },
        }));
      },
      approve(incidentId, team) {
        setDecisions((current) => {
          const decision = current[incidentId];
          return {
            ...current,
            [incidentId]: {
              ...decision,
              selectedTeam: team,
              approvedTeam: team,
              currentTeam: team,
              status: team === decision.recommendedTeam ? "Approved" : "Changed",
              decisionReason:
                team === decision.recommendedTeam
                  ? "BQL approved the recommended routing."
                  : `BQL changed the recommended team from ${decision.recommendedTeam} to ${team}.`,
              decisionSource: "BQL",
              decidedAt: "Just now · prototype state",
            },
          };
        });
      },
      sendBack(incidentId, reason) {
        setDecisions((current) => ({
          ...current,
          [incidentId]: {
            ...current[incidentId],
            status: "Sent Back",
            approvedTeam: undefined,
            decisionReason: reason,
            decisionSource: "BQL",
            decidedAt: "Just now · prototype state",
          },
        }));
      },
    }),
    [decisions],
  );

  return (
    <RoutingDecisionContext.Provider value={value}>{children}</RoutingDecisionContext.Provider>
  );
}

export function useRoutingDecisions() {
  const context = useContext(RoutingDecisionContext);
  if (!context) {
    throw new Error("useRoutingDecisions must be used within RoutingDecisionProvider");
  }
  return context;
}
