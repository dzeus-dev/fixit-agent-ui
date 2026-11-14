import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  tasks as initialTasks,
  type AffectedAreaConfirmation,
  type ResolutionStatus,
  type TechnicianTask,
} from "./data";

export interface ResolutionInput {
  resolutionStatus: ResolutionStatus;
  resolutionNote: string;
  finding: string;
  affectedAreaConfirmed: AffectedAreaConfirmation;
  escalationReason?: string;
}

interface TechnicianTaskContextValue {
  tasks: TechnicianTask[];
  startTask: (taskId: string) => void;
  recordResolution: (taskId: string, input: ResolutionInput) => void;
}

const TechnicianTaskContext = createContext<TechnicianTaskContextValue | null>(null);

export function TechnicianTaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TechnicianTask[]>(initialTasks);

  const value = useMemo<TechnicianTaskContextValue>(
    () => ({
      tasks,
      startTask(taskId) {
        setTasks((current) =>
          current.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: "In Progress",
                  startedAt: "Just now · prototype state",
                }
              : task,
          ),
        );
      },
      recordResolution(taskId, input) {
        setTasks((current) =>
          current.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  ...input,
                  status: input.resolutionStatus === "Resolved" ? "Resolved" : "Needs Follow-up",
                  resolvedAt: "Just now · prototype state",
                }
              : task,
          ),
        );
      },
    }),
    [tasks],
  );

  return <TechnicianTaskContext.Provider value={value}>{children}</TechnicianTaskContext.Provider>;
}

export function useTechnicianTasks() {
  const context = useContext(TechnicianTaskContext);
  if (!context) {
    throw new Error("useTechnicianTasks must be used within TechnicianTaskProvider");
  }
  return context;
}
