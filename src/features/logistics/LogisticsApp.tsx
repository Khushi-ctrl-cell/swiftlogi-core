import { useMemo, useState } from "react";
import {
  Activity, BadgeIndianRupee, Bell, Box, CalendarDays, ChartNoAxesCombined,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign,
  Database, Download, Eye, FileSpreadsheet, Filter, Handshake, LayoutDashboard,
  Menu, MoreHorizontal, Package, PanelLeftClose, PanelLeftOpen, Pencil, Plus,
  ReceiptText, RefreshCcw, ScrollText, Search, Settings, ShieldAlert,
  SlidersHorizontal, Truck, UploadCloud, WalletCards, Wrench, X, type LucideIcon,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminNavigation, moduleDefinitions, partnerNavigation } from "./mock-data";
import type { PortalRole, TableRecord, Tone } from "./types";
import { logisticsService } from "@/services/logistics-service";

const iconMap: Record<string, LucideIcon> = { LayoutDashboard, Package, Handshake, WalletCards, BadgeIndianRupee, SlidersHorizontal, Truck, RefreshCcw, ReceiptText, ShieldAlert, ChartNoAxesCombined, Database, Settings, ScrollText, Wrench };

const shipmentTrend = [
  { day: "01 Sep", b2c: 180, b2b: 90, pending: 45 }, { day: "05 Sep", b2c: 270, b2b: 145, pending: 62 },
  { day: "10 Sep", b2c: 460, b2b: 280, pending: 100 }, { day: "15 Sep", b2c: 420, b2b: 250, pending: 85 },
  { day: "20 Sep", b2c: 610, b2b: 390, pending: 120 }, { day: "25 Sep", b2c: 580, b2b: 430, pending: 104 },
  { day: "Today", b2c: 720, b2b: 510, pending: 138 },
];
const revenue = [{ month: "Apr", value: 4.1 }, { month: "May", value: 5.8 }, { month: "Jun", value: 6.7 }, { month: "Jul", value: 6.2 }, { month: "Aug", value: 7.4 }, { month: "Sep", value: 8.9 }];
const statusData = [{ name: "Delivered", value: 56, color: "var(--success)" }, { name: "In Transit", value: 28, color: "var(--primary)" }, { name: "Pending", value: 10, color: "var(--warning)" }, { name: "NDR", value: 4, color: "var(--danger)" }, { name: "RTO", value: 2, color: "var(--muted-foreground)" }];

const statusTone = (status: string): Tone => {
  const value = status.toLowerCase();
  if (["delivered", "active", "completed", "paid", "verified", "enabled"].some((item) => value.includes(item))) return "success";
  if (["ndr", "rto", "failed", "overdue"].some((item) => value.includes(item))) return "danger";
  if (["pending", "review", "due", "reattempt"].some((item) => value.includes(item))) return "warning";
  if (["transit", "progress", "processing"].some((item) => value.includes(item))) return "info";
  return "neutral";
};

function StatusBadge({ children }: { children: string }) {
  return <span className={`status-badge status-${statusTone(children)}`}>{children}</span>;
}

function LoginScreen({ onLogin }: { onLogin: (role: PortalRole) => void }) {
  const [role, setRole] = useState<PortalRole>("admin");
  const [email, setEmail] = useState("admin@logitrack.in");
  const [password, setPassword] = useState("operations");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@") || password.length < 6) { setError("Enter a valid email and a password of at least 6 characters."); return; }
    setLoading(true); setError("");
    await logisticsService.signIn({ email, password, role });
    onLogin(role);
  };
  return (
    <main className="auth-page">
      <section className="auth-context">
        <div className="brand-mark"><Box /><div><strong>LogiTrack</strong><span>Logistics Management</span></div></div>
        <div className="auth-context-copy"><p>OPERATIONS CONTROL</p><h1>Every shipment.<br />One clear view.</h1><ul><li><CheckCircle2 />Manage B2C and B2B operations</li><li><CheckCircle2 />Track finance, NDR and remittances</li><li><CheckCircle2 />Separate admin and partner workspaces</li></ul></div>
        <div className="auth-metrics"><div><strong>12,456</strong><span>shipments this month</span></div><div><strong>94.8%</strong><span>delivery success</span></div></div>
      </section>
      <section className="auth-panel">
        <form className="auth-form" onSubmit={submit}>
          <div className="mobile-brand brand-mark"><Box /><div><strong>LogiTrack</strong><span>Logistics Management</span></div></div>
          <p className="eyebrow">SECURE ACCESS</p><h2>Sign in to your workspace</h2><p className="muted-copy">Use your organization credentials to continue.</p>
          <div className="role-selector"><Button type="button" variant={role === "admin" ? "default" : "ghost"} onClick={() => setRole("admin")}>Admin</Button><Button type="button" variant={role === "partner" ? "default" : "ghost"} onClick={() => setRole("partner")}>Partner</Button></div>
          <div className="field"><Label htmlFor="email">Work email <span>*</span></Label><Input id="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div>
          <div className="field"><div className="field-label"><Label htmlFor="password">Password <span>*</span></Label><button type="button" onClick={() => alert("A password reset link would be sent by the production API.")}>Forgot password?</button></div><Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></div>
          {error && <p className="form-error">{error}</p>}
          <Button className="w-full" type="submit" disabled={loading}>{loading ? "Signing in…" : `Sign in as ${role}`}</Button>
          <p className="auth-note">This frontend demo uses a replaceable session service. Production JWT validation belongs in the Express API.</p>
        </form>
      </section>
    </main>
  );
}

function Sidebar({ role, active, collapsed, mobileOpen, onSelect, onCollapse, onClose }: { role: PortalRole; active: string; collapsed: boolean; mobileOpen: boolean; onSelect: (value: string) => void; onCollapse: () => void; onClose: () => void }) {
  const groups = role === "admin" ? adminNavigation : partnerNavigation;
  const [openGroups, setOpenGroups] = useState<string[]>(role === "admin" ? ["Orders"] : ["Orders"]);
  const toggle = (name: string) => setOpenGroups((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  return <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${mobileOpen ? "sidebar-mobile-open" : ""}`}>
    <div className="sidebar-brand"><div className="logo-cube"><Box /></div>{!collapsed && <div><strong>LogiTrack</strong><span>{role === "admin" ? "Admin Console" : "Partner Portal"}</span></div>}<Button variant="ghost" size="icon" className="mobile-close" onClick={onClose} aria-label="Close navigation"><X /></Button></div>
    <nav className="sidebar-nav" aria-label={`${role} navigation`}>
      {groups.map((group) => { const Icon = iconMap[group.icon] ?? Package; const expanded = openGroups.includes(group.label); const isActive = active === group.label; return <div className="nav-group" key={group.label}>
        <button className={`nav-parent ${isActive ? "active" : ""}`} title={collapsed ? group.label : undefined} onClick={() => { if (group.items.length) toggle(group.label); else { onSelect(group.label); onClose(); } }}><Icon />{!collapsed && <><span>{group.label}</span>{group.items.length > 0 && <ChevronDown className={expanded ? "rotated" : ""} />}</>}</button>
        {!collapsed && expanded && group.items.length > 0 && <div className="nav-children">{group.items.map((item) => <button key={item} className={active === item ? "active" : ""} onClick={() => { onSelect(item); onClose(); }}>{item}</button>)}</div>}
      </div>; })}
    </nav>
    <Button variant="ghost" size="icon" className="collapse-trigger" onClick={onCollapse} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</Button>
  </aside>;
}

function Topbar({ role, onRole, onMenu, onLogout }: { role: PortalRole; onRole: (role: PortalRole) => void; onMenu: () => void; onLogout: () => void }) {
  return <header className="topbar"><Button variant="ghost" size="icon" className="menu-trigger" onClick={onMenu} aria-label="Open navigation"><Menu /></Button><div className="global-search"><Search /><input aria-label="Global search" placeholder="Search orders, shipments, partners…" /><kbd>Ctrl K</kbd></div><div className="topbar-actions"><Button variant="ghost" size="icon" aria-label="Notifications" className="notification-button"><Bell /><span /></Button><div className="portal-switch"><Button variant="ghost" size="sm" onClick={() => onRole(role === "admin" ? "partner" : "admin")}><span className="avatar">{role === "admin" ? "OA" : "AL"}</span><span className="desktop-only">{role === "admin" ? "Operations Admin" : "ABC Logistics"}</span><ChevronDown /></Button></div><Button variant="ghost" size="sm" className="desktop-only" onClick={onLogout}>Sign out</Button></div></header>;
}

function KpiCard({ icon: Icon, label, value, change, tone }: { icon: LucideIcon; label: string; value: string; change: string; tone: Tone }) {
  return <div className="kpi-card"><div className={`kpi-icon status-${tone}`}><Icon /></div><div><span>{label}</span><strong>{value}</strong><small className={change.startsWith("−") ? "negative" : "positive"}>{change} <em>vs last month</em></small></div></div>;
}

function Dashboard({ role, onOpenOrders }: { role: PortalRole; onOpenOrders: () => void }) {
  const partner = role === "partner";
  const kpis = partner ? [
    ["Total Orders", "2,416", "+12%", Package, "info"], ["Forward", "2,102", "+10%", Truck, "info"], ["Reverse", "314", "+3%", RefreshCcw, "neutral"], ["Delivered", "1,906", "+14%", CheckCircle2, "success"], ["In Transit", "382", "+8%", Activity, "info"], ["NDR", "86", "−2%", ShieldAlert, "danger"], ["RTO", "42", "−1%", RefreshCcw, "danger"], ["Wallet Balance", "₹3.42L", "+6%", WalletCards, "success"],
  ] : [
    ["Total Shipments", "12,456", "+12%", Package, "info"], ["B2C Shipments", "8,234", "+8%", Box, "info"], ["B2B Shipments", "4,222", "+15%", Handshake, "success"], ["Pending", "1,245", "−5%", CalendarDays, "warning"], ["In Transit", "3,456", "+12%", Truck, "info"], ["Delivered", "7,021", "+18%", CheckCircle2, "success"], ["NDR", "856", "−3%", ShieldAlert, "danger"], ["RTO", "324", "−2%", RefreshCcw, "danger"],
  ];
  const recent = moduleDefinitions["All Orders"];
  return <div className="page-stack">
    <div className="page-heading"><div><p className="breadcrumb">Workspace / Dashboard</p><h1>{partner ? "Partner overview" : "Good morning, Admin"}</h1><p>{partner ? "Track your shipments, wallet and pending remittances." : "Here’s what is happening across logistics operations today."}</p></div><Button variant="outline"><CalendarDays />01 Sep – 25 Sep 2026</Button></div>
    <section className="kpi-grid">{kpis.map(([label, value, change, Icon, tone]) => <KpiCard key={label as string} label={label as string} value={value as string} change={change as string} icon={Icon as LucideIcon} tone={tone as Tone} />)}</section>
    <section className="analytics-grid"><Panel title="Shipment overview" className="chart-large"><ResponsiveContainer width="100%" height={220}><AreaChart data={shipmentTrend}><CartesianGrid vertical={false} stroke="var(--chart-grid)" /><XAxis dataKey="day" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} /><Tooltip /><Area type="monotone" dataKey="b2c" stroke="var(--primary)" fill="var(--primary-soft)" strokeWidth={2} /><Area type="monotone" dataKey="b2b" stroke="var(--success)" fill="transparent" strokeWidth={2} /><Area type="monotone" dataKey="pending" stroke="var(--warning)" fill="transparent" strokeWidth={2} /></AreaChart></ResponsiveContainer></Panel>
      <Panel title="Shipment status"><div className="donut-wrap"><ResponsiveContainer width="55%" height={220}><PieChart><Pie data={statusData} dataKey="value" innerRadius={55} outerRadius={82} paddingAngle={1}>{statusData.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><div className="legend-list">{statusData.map((item) => <div key={item.name}><span style={{ background: item.color }} /><p>{item.name}</p><strong>{item.value}%</strong></div>)}</div></div></Panel>
      <Panel title="Revenue overview"><ResponsiveContainer width="100%" height={220}><BarChart data={revenue}><CartesianGrid vertical={false} stroke="var(--chart-grid)" /><XAxis dataKey="month" tickLine={false} axisLine={false} /><YAxis tickFormatter={(v) => `${v}L`} tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="value" fill="var(--chart-blue)" radius={[3,3,0,0]} /></BarChart></ResponsiveContainer></Panel></section>
    <section className="dashboard-lower"><Panel title="Recent orders" action={<Button size="sm" onClick={onOpenOrders}><Plus />Create order</Button>} className="recent-orders"><CompactTable definition={recent} limit={5} onView={onOpenOrders} /></Panel><Panel title="Recent activity"><div className="activity-list">{[{t:"Shipment delivered",d:"SHP-1001 delivered to customer",time:"2 min",tone:"success"},{t:"New order created",d:"ORD-00128 by ABC Logistics",time:"12 min",tone:"info"},{t:"NDR raised",d:"SHP-1004 marked as NDR",time:"35 min",tone:"danger"},{t:"Wallet recharged",d:"₹50,000 credited to FastMove",time:"1 hour",tone:"success"}].map((item) => <div key={item.t}><span className={`activity-dot status-${item.tone}`}><Activity /></span><p><strong>{item.t}</strong><small>{item.d}</small></p><time>{item.time}</time></div>)}</div></Panel></section>
    <section className="summary-grid"><Panel title="Top couriers"><PerformanceRows /></Panel><Panel title="Partner statistics"><PartnerRows /></Panel><Panel title="Wallet summary"><WalletRows /></Panel></section>
  </div>;
}

function Panel({ title, action, children, className = "" }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) { return <section className={`panel ${className}`}><header><h2>{title}</h2>{action}</header>{children}</section>; }
function PerformanceRows() { return <div className="metric-rows">{[["Delhivery","2,450","94%"],["BlueDart","1,980","92%"],["DTDC","1,650","88%"],["Ecom Express","1,420","86%"]].map((r) => <div key={r[0]}><strong>{r[0]}</strong><span>{r[1]} shipments</span><div><i style={{width:r[2]}} /></div><em>{r[2]}</em></div>)}</div>; }
function PartnerRows() { return <div className="simple-rows">{[["ABC Logistics","2,450","1,980"],["FastMove","1,980","1,620"],["SpeedShip","1,650","1,210"],["MovePlus","1,420","1,160"]].map((r) => <div key={r[0]}><strong>{r[0]}</strong><span>{r[1]} orders</span><span>{r[2]} delivered</span></div>)}</div>; }
function WalletRows() { return <div className="wallet-rows">{[["Main wallet","₹12,45,320","success"],["Partner wallets","₹25,60,000","success"],["Pending payouts","₹3,14,680","warning"],["Failed transactions","₹24,500","danger"]].map((r) => <div key={r[0]}><span className={`status-${r[2]}`}><CircleDollarSign /></span><p>{r[0]}</p><strong>{r[1]}</strong></div>)}</div>; }

function CompactTable({ definition, limit, onView }: { definition: typeof moduleDefinitions[string]; limit?: number; onView: (record?: TableRecord) => void }) {
  const rows = limit ? definition.records.slice(0, limit) : definition.records;
  return <Table><TableHeader><TableRow>{definition.columns.map((column) => <TableHead key={column.key}>{column.label}</TableHead>)}<TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{rows.map((record, index) => <TableRow key={`${definition.title}-${index}`}>{definition.columns.map((column) => <TableCell key={column.key}>{column.key === "status" || column.key === "kyc" ? <StatusBadge>{String(record[column.key])}</StatusBadge> : <span className={column.key.toLowerCase().includes("id") || column.key === "shipment" || column.key === "invoice" ? "record-link" : ""}>{record[column.key]}</span>}</TableCell>)}<TableCell className="actions-cell"><Button variant="ghost" size="icon" onClick={() => onView(record)} aria-label="View record"><Eye /></Button><Button variant="ghost" size="icon" onClick={() => onView(record)} aria-label="Edit record"><Pencil /></Button><Button variant="ghost" size="icon" aria-label="More actions"><MoreHorizontal /></Button></TableCell></TableRow>)}</TableBody></Table>;
}

function FormWorkflow({ title, onDone }: { title: string; onDone: () => void }) {
  const isRate = title === "Rate Calculator";
  const isCharge = title.includes("Charge Configuration");
  if (isCharge) return <Tabs defaultValue="basic"><TabsList><TabsTrigger value="basic">Basic charges</TabsTrigger><TabsTrigger value="cod">COD & ROV</TabsTrigger><TabsTrigger value="volumetric">Volumetric weight</TabsTrigger><TabsTrigger value="handling">Handling</TabsTrigger></TabsList><TabsContent value="basic"><FieldGrid fields={["Processing charge / LR","FSC percentage / kg","Minimum charged weight","Minimum LR charge"]} /></TabsContent><TabsContent value="cod"><FieldGrid fields={["Owner's risk ROV","Carrier's risk ROV","Minimum ROV","Liability limit"]} /></TabsContent><TabsContent value="volumetric"><FieldGrid fields={["Length","Breadth","Height","Divisor (4500)"]} /></TabsContent><TabsContent value="handling"><FieldGrid fields={["Demurrage per kg","Demurrage per LR","Free store period","Re-attempt charge"]} /></TabsContent><Button onClick={onDone}>Save configuration</Button></Tabs>;
  const fields = isRate ? ["Partner","Courier","Origin PIN code","Destination PIN code","Shipment type","Weight (kg)","Length (cm)","Breadth (cm)","Height (cm)","Payment mode"] : ["Partner / Company","Pickup contact","Pickup address","Delivery contact","Delivery address","Package description","Actual weight","Payment mode"];
  return <div><div className="workflow-steps"><span className="active">1</span><i /><span>2</span><i /><span>3</span><i /><span>4</span></div><FieldGrid fields={fields} />{isRate && <div className="estimate-box"><div><span>Actual weight</span><strong>2.40 kg</strong></div><div><span>Volumetric weight</span><strong>3.20 kg</strong></div><div><span>Base + FSC + tax</span><strong>₹286.40</strong></div><div><span>Estimated total</span><strong>₹344.00</strong></div></div>}<div className="form-actions"><Button variant="outline">Save draft</Button><Button onClick={onDone}>{isRate ? "Calculate rate" : "Continue"}</Button></div></div>;
}
function FieldGrid({ fields }: { fields: string[] }) { return <div className="field-grid">{fields.map((field, index) => <div className={field.includes("address") || field.includes("description") ? "span-2" : ""} key={field}><Label htmlFor={`field-${index}`}>{field} <span>*</span></Label><Input id={`field-${index}`} placeholder={`Enter ${field.toLowerCase()}`} /></div>)}</div>; }

function DetailView({ record }: { record: TableRecord | null }) {
  const shipment = String(record?.shipmentId ?? record?.shipment ?? "SHP-1004");
  return <div className="detail-view"><div className="detail-summary"><div><span>Shipment ID</span><strong>{shipment}</strong></div><div><span>Courier</span><strong>{String(record?.courier ?? "Ecom Express")}</strong></div><div><span>Payment</span><strong>{String(record?.payment ?? "COD")}</strong></div><div><span>Current status</span><StatusBadge>{String(record?.status ?? "In Transit")}</StatusBadge></div></div><Tabs defaultValue="timeline"><TabsList><TabsTrigger value="timeline">Shipment timeline</TabsTrigger><TabsTrigger value="order">Order information</TabsTrigger><TabsTrigger value="charges">Charges</TabsTrigger><TabsTrigger value="ndr">NDR / RTO</TabsTrigger></TabsList><TabsContent value="timeline"><div className="timeline">{[["Order created","25 Sep 2026 · 09:20","Pickup and delivery details validated"],["Courier allocated","25 Sep 2026 · 09:34","Ecom Express · Surface"],["Pickup completed","25 Sep 2026 · 14:05","Origin facility scan completed"],["In transit","26 Sep 2026 · 05:40","Arrived at Delhi gateway"]].map((item,index) => <div key={item[0]} className={index < 3 ? "complete" : "current"}><i /><p><strong>{item[0]}</strong><span>{item[2]}</span></p><time>{item[1]}</time></div>)}</div></TabsContent><TabsContent value="order"><FieldGrid fields={["Customer name","Customer phone","Pickup information","Delivery information","Package details","Declared value"]} /></TabsContent><TabsContent value="charges"><div className="charge-list"><p><span>Base freight</span><strong>₹242.00</strong></p><p><span>Fuel surcharge</span><strong>₹28.40</strong></p><p><span>COD handling</span><strong>₹35.00</strong></p><p><span>Tax</span><strong>₹54.97</strong></p><p><span>Total charge</span><strong>₹360.37</strong></p></div></TabsContent><TabsContent value="ndr"><div className="empty-inline"><ShieldAlert /><strong>No NDR or RTO events</strong><span>This shipment has no delivery exceptions.</span></div></TabsContent></Tabs></div>;
}

function ModulePage({ moduleName, onOpen }: { moduleName: string; onOpen: (kind: "form" | "detail", record?: TableRecord) => void }) {
  const definition = moduleDefinitions[moduleName] ?? moduleDefinitions["All Orders"];
  const [query, setQuery] = useState("");
  const rows = useMemo(() => definition.records.filter((record) => Object.values(record).some((value) => String(value).toLowerCase().includes(query.toLowerCase()))), [definition, query]);
  const shown = { ...definition, records: rows };
  const isFormPage = ["Create Order","Add Partner","Rate Calculator","Charge Configuration","Company Profile","Operational Configuration","Invoice Settings","Numbering","Notifications"].includes(moduleName);
  return <div className="page-stack"><div className="page-heading"><div><p className="breadcrumb">Workspace / {definition.title}</p><h1>{definition.title}</h1><p>{definition.description}</p></div>{definition.action && <Button onClick={() => onOpen("form")}><Plus />{definition.action}</Button>}</div>{isFormPage ? <Panel title={moduleName}><FormWorkflow title={moduleName} onDone={() => alert("Saved in the frontend demo. The REST service is ready for backend connection.")} /></Panel> : <Panel title={`${rows.length} records`} action={<div className="panel-actions"><Button variant="outline" size="sm"><Download />Export</Button><Button variant="outline" size="sm"><FileSpreadsheet />Columns</Button></div>}><div className="filterbar"><div className="table-search"><Search /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records…" /></div><Select defaultValue="all"><SelectTrigger><Filter /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="pending">Pending</SelectItem></SelectContent></Select><Select defaultValue="all"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All couriers</SelectItem><SelectItem value="delhivery">Delhivery</SelectItem><SelectItem value="bluedart">BlueDart</SelectItem></SelectContent></Select><Button variant="outline"><CalendarDays />Date range</Button></div>{rows.length ? <CompactTable definition={shown} onView={(record) => onOpen("detail", record)} /> : <div className="empty-state"><Search /><h3>No matching records</h3><p>Adjust the filters or clear your search.</p><Button variant="outline" onClick={() => setQuery("")}>Clear search</Button></div>}<div className="table-footer"><span>Showing 1–{rows.length} of {rows.length} records</span><div><Button variant="outline" size="icon" disabled><ChevronLeft /></Button><Button size="sm">1</Button><Button variant="outline" size="icon" disabled><ChevronRight /></Button></div></div></Panel>}</div>;
}

export function LogisticsApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<PortalRole>("admin");
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState<{ kind: "form" | "detail"; record?: TableRecord } | null>(null);
  if (!authenticated) return <LoginScreen onLogin={(nextRole) => { setRole(nextRole); setActive(nextRole === "admin" ? "Dashboard" : "Partner Dashboard"); setAuthenticated(true); }} />;
  const isDashboard = active === "Dashboard" || active === "Partner Dashboard";
  const switchRole = (nextRole: PortalRole) => { setRole(nextRole); setActive(nextRole === "admin" ? "Dashboard" : "Partner Dashboard"); };
  return <div className={`app-shell ${collapsed ? "shell-collapsed" : ""}`}><Sidebar role={role} active={active} collapsed={collapsed} mobileOpen={mobileOpen} onSelect={setActive} onCollapse={() => setCollapsed(!collapsed)} onClose={() => setMobileOpen(false)} /><div className="app-main"><Topbar role={role} onRole={switchRole} onMenu={() => setMobileOpen(true)} onLogout={() => setAuthenticated(false)} /><main className="workspace">{isDashboard ? <Dashboard role={role} onOpenOrders={() => setActive("All Orders")} /> : <ModulePage moduleName={active} onOpen={(kind, record) => setModal({ kind, record })} />}</main></div>{mobileOpen && <button className="sidebar-scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
    <Dialog open={modal !== null} onOpenChange={(open) => { if (!open) setModal(null); }}><DialogContent className="record-dialog"><DialogHeader><DialogTitle>{modal?.kind === "detail" ? "Shipment details" : moduleDefinitions[active]?.action ?? "Create record"}</DialogTitle><DialogDescription>{modal?.kind === "detail" ? "Operational history and shipment information." : "Complete the required logistics information."}</DialogDescription></DialogHeader>{modal?.kind === "detail" ? <DetailView record={modal.record ?? null} /> : <FormWorkflow title={active} onDone={() => setModal(null)} />}{modal?.kind === "detail" && <DialogFooter><Button variant="outline" onClick={() => window.print()}>Print</Button><Button onClick={() => setModal(null)}>Done</Button></DialogFooter>}</DialogContent></Dialog>
  </div>;
}