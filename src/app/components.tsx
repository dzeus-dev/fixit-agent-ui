import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Gauge,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Ticket,
  UserRound,
  UsersRound,
  Wrench,
  X,
} from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import type { Priority, Status } from "./data";

type Role = "bql" | "technician" | "resident";

const roleDetails = {
  bql: { label: "BQL / Dispatcher", initials: "AM", name: "Aisha Malik" },
  technician: { label: "Technician", initials: "DK", name: "Daniel Kim" },
  resident: { label: "Resident", initials: "JR", name: "Jordan Reed" },
};

const titles: Record<string, string> = {
  "/bql/dashboard": "Operations Dashboard",
  "/bql/tickets": "Resident Tickets",
  "/bql/incidents": "Incident Queue",
  "/technician/tasks": "My Tasks",
  "/resident/report": "Report an Issue",
};

function getPageTitle(pathname: string) {
  if (pathname.endsWith("/correlation")) return "Correlation Review";
  if (pathname.endsWith("/routing")) return "Routing Recommendation";
  if (pathname.endsWith("/approval")) return "Approval Review";
  if (/\/bql\/incidents\/[^/]+$/.test(pathname)) return "Incident Detail";
  if (/\/technician\/tasks\/[^/]+$/.test(pathname)) return "Task Detail";
  if (/\/resident\/tickets\/[^/]+$/.test(pathname)) return "Report Status";
  return titles[pathname] ?? "FixIt Agent";
}

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span
        className={`grid size-9 place-items-center rounded-xl ${inverse ? "bg-white text-slate-950" : "bg-indigo-600 text-white"}`}
      >
        <Wrench size={18} strokeWidth={2.3} />
      </span>
      <span
        className={`text-[17px] font-bold tracking-[-0.03em] ${inverse ? "text-white" : "text-slate-950"}`}
      >
        FixIt Agent
      </span>
    </Link>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  icon?: ReactNode;
}

export function Button({
  variant = "primary",
  icon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-900/10",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    danger: "border border-red-200 bg-white text-red-700 hover:bg-red-50",
    ghost: "text-slate-600 hover:bg-slate-100",
  };
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <section
      className={`rounded-xl border bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)] ${
        accent ? "border-indigo-200" : "border-slate-200"
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-6">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-bold tracking-[-0.035em] text-slate-950">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const styles: Record<Priority, string> = {
    Critical: "bg-red-50 text-red-700 ring-red-600/15",
    High: "bg-orange-50 text-orange-700 ring-orange-600/15",
    Medium: "bg-amber-50 text-amber-700 ring-amber-600/15",
    Low: "bg-slate-100 text-slate-600 ring-slate-500/10",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Open: "bg-sky-50 text-sky-700 ring-sky-600/15",
    "Pending Approval": "bg-violet-50 text-violet-700 ring-violet-600/15",
    Assigned: "bg-blue-50 text-blue-700 ring-blue-600/15",
    "In Progress": "bg-amber-50 text-amber-700 ring-amber-600/15",
    "Under Review": "bg-slate-100 text-slate-700 ring-slate-500/10",
    Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      <span className="mr-1.5 size-1.5 rounded-full bg-current opacity-75" />
      {status}
    </span>
  );
}

export function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              {headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <span className="mb-3 grid size-11 place-items-center rounded-full bg-slate-100 text-slate-500">
        <Inbox size={20} />
      </span>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function NavigationItem({ to, label, icon }: { to: string; label: string; icon: ReactNode }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

function Sidebar({ role, open, close }: { role: Role; open: boolean; close: () => void }) {
  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
          onClick={close}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5">
          <Brand />
          <button className="text-slate-500 lg:hidden" onClick={close}>
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-5" onClick={close}>
          {role === "bql" && (
            <>
              <p className="nav-label">Overview</p>
              <NavigationItem
                to="/bql/dashboard"
                label="Dashboard"
                icon={<LayoutDashboard size={18} />}
              />
              <p className="nav-label mt-6">Operations</p>
              <NavigationItem to="/bql/tickets" label="Tickets" icon={<Ticket size={18} />} />
              <NavigationItem to="/bql/incidents" label="Incidents" icon={<Gauge size={18} />} />
              <p className="nav-label mt-6">System</p>
              <div className="nav-disabled">
                <Bell size={18} />
                <span>Notifications</span>
                <span className="ml-auto text-[9px] font-bold uppercase">Soon</span>
              </div>
              <div className="nav-disabled">
                <Settings size={18} />
                <span>Settings</span>
                <span className="ml-auto text-[9px] font-bold uppercase">Soon</span>
              </div>
            </>
          )}
          {role === "technician" && (
            <>
              <p className="nav-label">Workspace</p>
              <NavigationItem
                to="/technician/tasks"
                label="My Tasks"
                icon={<ClipboardList size={18} />}
              />
            </>
          )}
          {role === "resident" && (
            <>
              <p className="nav-label">Resident portal</p>
              <NavigationItem to="/resident/report" label="My Reports" icon={<Home size={18} />} />
              <NavLink
                to="/resident/tickets/TKT-1024"
                className={({ isActive }) =>
                  `mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`
                }
              >
                <Ticket size={18} /> Track Report
              </NavLink>
            </>
          )}
        </nav>
        <div className="border-t border-slate-100 p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          >
            <LogOut size={18} /> Switch workspace
          </Link>
        </div>
      </aside>
    </>
  );
}

function UserMenu({ role }: { role: Role }) {
  const user = roleDetails[role];
  return (
    <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-semibold leading-4 text-slate-800">{user.name}</p>
        <p className="mt-1 text-xs text-slate-500">{user.label}</p>
      </div>
      <span className="grid size-9 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white">
        {user.initials}
      </span>
    </div>
  );
}

function TopBar({ role, onMenu }: { role: Role; onMenu: () => void }) {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center gap-5 border-b border-slate-200 bg-white/95 px-5 backdrop-blur md:px-8">
      <button className="text-slate-500 lg:hidden" onClick={onMenu}>
        <Menu size={21} />
      </button>
      <div className="min-w-0">
        <p className="truncate text-[15px] font-semibold text-slate-900">
          {getPageTitle(pathname)}
        </p>
        <p className="truncate text-xs text-slate-500">Sunrise Residence</p>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <label className="hidden h-9 w-64 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-400 md:flex">
          <Search size={16} />
          <input
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search incidents, tickets..."
          />
          <kbd className="text-[10px] font-semibold text-slate-400">⌘K</kbd>
        </label>
        <button
          aria-label="Notifications"
          className="relative grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>
        <UserMenu role={role} />
      </div>
    </header>
  );
}

export function AppShell({ role }: { role: Role }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Sidebar role={role} open={mobileOpen} close={() => setMobileOpen(false)} />
      <div className="lg:pl-[248px]">
        <TopBar role={role} onMenu={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-[1440px] p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { useState } from "react";

export function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-12 items-center justify-between gap-5 border-b border-slate-100 py-3 last:border-0">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-semibold text-slate-800">{children}</dd>
    </div>
  );
}

export function SectionHeading({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
      <h2 className="text-[15px] font-bold text-slate-900">{title}</h2>
      {meta && <span className="text-xs font-medium text-slate-500">{meta}</span>}
    </div>
  );
}

export function IncidentMark() {
  return (
    <span className="grid size-9 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
      <Gauge size={18} />
    </span>
  );
}

export function TicketMark() {
  return (
    <span className="grid size-9 place-items-center rounded-lg bg-slate-100 text-slate-600">
      <Ticket size={17} />
    </span>
  );
}

export { CheckCircle2, ChevronRight, UserRound, UsersRound };
