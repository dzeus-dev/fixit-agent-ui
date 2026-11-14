import { createBrowserRouter } from "react-router";
import { AppShell } from "./components";
import {
  ApprovalPage,
  BqlRedirect,
  DashboardPage,
  EntryPage,
  IncidentDetailPage,
  IncidentsPage,
  LoginPage,
  NotFoundPage,
  ReportPage,
  ResidentRedirect,
  ResidentTicketPage,
  RoutingPage,
  TaskDetailPage,
  TasksPage,
  TechRedirect,
  TicketsPage,
} from "./pages";

export const router = createBrowserRouter([
  { path: "/", Component: EntryPage },
  { path: "/login", Component: LoginPage },
  {
    path: "/bql",
    Component: () => <AppShell role="bql" />,
    children: [
      { index: true, Component: BqlRedirect },
      { path: "dashboard", Component: DashboardPage },
      { path: "tickets", Component: TicketsPage },
      { path: "incidents", Component: IncidentsPage },
      { path: "incidents/:id", Component: IncidentDetailPage },
      { path: "incidents/:id/routing", Component: RoutingPage },
      { path: "incidents/:id/approval", Component: ApprovalPage },
    ],
  },
  {
    path: "/technician",
    Component: () => <AppShell role="technician" />,
    children: [
      { index: true, Component: TechRedirect },
      { path: "tasks", Component: TasksPage },
      { path: "tasks/:id", Component: TaskDetailPage },
    ],
  },
  {
    path: "/resident",
    Component: () => <AppShell role="resident" />,
    children: [
      { index: true, Component: ResidentRedirect },
      { path: "report", Component: ReportPage },
      { path: "tickets/:id", Component: ResidentTicketPage },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);
