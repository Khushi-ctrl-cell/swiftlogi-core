import type { ModuleDefinition, NavGroup } from "./types";

export const adminNavigation: NavGroup[] = [
  { label: "Dashboard", icon: "LayoutDashboard", items: [] },
  { label: "Orders", icon: "Package", items: ["All Orders", "B2C Orders", "B2B Orders", "Create Order", "Shipment Tracking"] },
  { label: "Partners", icon: "Handshake", items: ["All Partners", "Add Partner", "KYC & Documents", "Bank Details", "Assigned Rates", "Partner Access"] },
  { label: "Wallets", icon: "WalletCards", items: ["Main Wallet", "Partner Wallets", "Transactions", "Passbook"] },
  { label: "Shipping Rates", icon: "BadgeIndianRupee", items: ["B2C Rates", "B2B Rates", "Rate Upload", "Assigned Rates"] },
  { label: "Courier Charges", icon: "SlidersHorizontal", items: ["Charge Configuration", "Weight Slabs", "Zone Configuration"] },
  { label: "Couriers", icon: "Truck", items: ["Courier List", "Courier Configuration", "Credentials", "Integration Status"] },
  { label: "COD / NDR / RTO", icon: "RefreshCcw", items: ["COD Remittances", "COD Reconciliation", "NDR", "RTO"] },
  { label: "Billing & Finance", icon: "ReceiptText", items: ["Billing", "Invoices", "Payments", "Additional Charges", "Taxes"] },
  { label: "Claims & Disputes", icon: "ShieldAlert", items: ["Disputes", "Lost Claims", "Damage Claims", "Settlements"] },
  { label: "Reports", icon: "ChartNoAxesCombined", items: ["Order Reports", "Shipment Reports", "Wallet Reports", "COD Reports", "Partner Reports", "Finance Reports"] },
  { label: "Master Data", icon: "Database", items: ["Couriers Master", "Partners Master", "Zones", "Weight Slabs Master", "Charges", "Statuses", "NDR Reasons", "RTO Reasons", "Taxes Master", "Services"] },
  { label: "Settings", icon: "Settings", items: ["Company Profile", "Invoice Settings", "Numbering", "Notifications", "Operational Configuration"] },
  { label: "Audit Logs", icon: "ScrollText", items: [] },
];

export const partnerNavigation: NavGroup[] = [
  { label: "Partner Dashboard", icon: "LayoutDashboard", items: [] },
  { label: "Orders", icon: "Package", items: ["All Orders", "Forward Orders", "Reverse Orders", "Create Order"] },
  { label: "Pickup / NDR", icon: "Truck", items: ["Pickup Requests", "NDR"] },
  { label: "Finance", icon: "WalletCards", items: ["Wallet", "Remittances"] },
  { label: "Support", icon: "ShieldAlert", items: ["Disputes", "Lost/Damage Claims"] },
  { label: "Partner Tools", icon: "Wrench", items: ["Rate Calculator", "Passbook", "Reports", "Manage Warehouse", "Manage Documents", "Bank Details"] },
];

const orders = [
  { orderId: "ORD-00123", shipmentId: "SHP-1001", partner: "ABC Logistics", courier: "Delhivery", type: "B2C", amount: "₹450", payment: "Prepaid", status: "Delivered", date: "25 Sep 2026" },
  { orderId: "ORD-00124", shipmentId: "SHP-1002", partner: "FastMove", courier: "BlueDart", type: "B2C", amount: "₹620", payment: "COD", status: "In Transit", date: "25 Sep 2026" },
  { orderId: "ORD-00125", shipmentId: "SHP-1003", partner: "SpeedShip", courier: "DTDC", type: "B2C", amount: "₹380", payment: "Prepaid", status: "Pending", date: "24 Sep 2026" },
  { orderId: "ORD-00126", shipmentId: "SHP-1004", partner: "MovePlus", courier: "Ecom Express", type: "B2B", amount: "₹1,520", payment: "COD", status: "NDR", date: "24 Sep 2026" },
  { orderId: "ORD-00127", shipmentId: "SHP-1005", partner: "QuickShip", courier: "XpressBees", type: "B2B", amount: "₹2,410", payment: "Prepaid", status: "RTO", date: "23 Sep 2026" },
];

const generic = (title: string, description: string, action = "Add record"): ModuleDefinition => ({
  title,
  description,
  action,
  columns: [
    { key: "reference", label: "Reference" }, { key: "party", label: "Partner / Courier" },
    { key: "detail", label: "Details" }, { key: "status", label: "Status" }, { key: "date", label: "Updated" },
  ],
  records: [
    { reference: "LG-24091", party: "ABC Logistics", detail: "Operational record", status: "Active", date: "25 Sep 2026" },
    { reference: "LG-24088", party: "FastMove", detail: "Verification in progress", status: "Pending", date: "24 Sep 2026" },
    { reference: "LG-24075", party: "BlueDart", detail: "Configuration reviewed", status: "Completed", date: "23 Sep 2026" },
    { reference: "LG-24066", party: "SpeedShip", detail: "Requires attention", status: "Review", date: "22 Sep 2026" },
  ],
});

export const moduleDefinitions: Record<string, ModuleDefinition> = {
  "All Orders": { title: "All Orders", description: "Monitor B2C and B2B orders across the shipment lifecycle.", action: "Create order", columns: [{ key: "orderId", label: "Order ID" }, { key: "shipmentId", label: "Shipment ID" }, { key: "partner", label: "Partner" }, { key: "courier", label: "Courier" }, { key: "type", label: "Type" }, { key: "amount", label: "Amount" }, { key: "payment", label: "Payment" }, { key: "status", label: "Status" }, { key: "date", label: "Date" }], records: orders },
  "B2C Orders": { title: "B2C Orders", description: "Manage direct-to-customer shipments and delivery outcomes.", action: "Create B2C order", columns: [{ key: "orderId", label: "Order ID" }, { key: "shipmentId", label: "Shipment ID" }, { key: "partner", label: "Partner" }, { key: "courier", label: "Courier" }, { key: "amount", label: "Amount" }, { key: "payment", label: "Payment" }, { key: "status", label: "Status" }, { key: "date", label: "Date" }], records: orders.filter((row) => row.type === "B2C") },
  "B2B Orders": { title: "B2B Orders", description: "Manage commercial consignments, LR details and charged weight.", action: "Create B2B order", columns: [{ key: "orderId", label: "Order ID" }, { key: "shipmentId", label: "LR / Shipment" }, { key: "partner", label: "Partner" }, { key: "courier", label: "Transporter" }, { key: "amount", label: "Freight" }, { key: "status", label: "Status" }, { key: "date", label: "Date" }], records: orders.filter((row) => row.type === "B2B") },
  "All Partners": { title: "Partners", description: "Manage partner onboarding, compliance, access and assigned services.", action: "Add partner", columns: [{ key: "code", label: "Partner Code" }, { key: "company", label: "Company Name" }, { key: "contact", label: "Contact Person" }, { key: "kyc", label: "KYC Status" }, { key: "status", label: "Account Status" }, { key: "balance", label: "Wallet Balance" }], records: [{ code: "PTN-1001", company: "ABC Logistics", contact: "Neha Sharma", kyc: "Verified", status: "Active", balance: "₹3,42,500" }, { code: "PTN-1002", company: "FastMove", contact: "Karan Mehta", kyc: "Pending", status: "Review", balance: "₹1,18,200" }, { code: "PTN-1003", company: "SpeedShip", contact: "Riya Gupta", kyc: "Verified", status: "Active", balance: "₹2,06,850" }] },
  "Transactions": { title: "Wallet Transactions", description: "Review credits, debits, recharges, refunds and adjustments.", action: "Wallet adjustment", columns: [{ key: "id", label: "Transaction ID" }, { key: "partner", label: "Partner" }, { key: "type", label: "Type" }, { key: "amount", label: "Amount" }, { key: "balance", label: "Balance" }, { key: "reference", label: "Reference" }, { key: "status", label: "Status" }, { key: "date", label: "Date" }], records: [{ id: "TXN-89221", partner: "ABC Logistics", type: "Recharge", amount: "+₹50,000", balance: "₹3,42,500", reference: "UTR983210", status: "Completed", date: "25 Sep 2026" }, { id: "TXN-89220", partner: "FastMove", type: "Debit", amount: "−₹620", balance: "₹1,18,200", reference: "ORD-00124", status: "Completed", date: "25 Sep 2026" }, { id: "TXN-89218", partner: "SpeedShip", type: "Refund", amount: "+₹380", balance: "₹2,06,850", reference: "ORD-00125", status: "Pending", date: "24 Sep 2026" }] },
  "B2C Rates": { title: "B2C Shipping Rates", description: "Maintain zonal rates, weight slabs and COD charges by courier.", action: "Upload rates", columns: [{ key: "courier", label: "Courier" }, { key: "client", label: "Client Code" }, { key: "slab", label: "Weight Slab" }, { key: "a", label: "Zone A" }, { key: "b", label: "Zone B" }, { key: "c", label: "Zone C" }, { key: "cod", label: "COD" }, { key: "status", label: "Status" }], records: [{ courier: "Delhivery", client: "DLV-01", slab: "0–500 g", a: "₹42", b: "₹48", c: "₹56", cod: "₹35 / 1.8%", status: "Active" }, { courier: "BlueDart", client: "BD-04", slab: "0–500 g", a: "₹58", b: "₹64", c: "₹72", cod: "₹45 / 2%", status: "Active" }] },
  "NDR": { title: "NDR Management", description: "Resolve failed delivery attempts before return initiation.", action: "Bulk response", columns: [{ key: "shipment", label: "Shipment" }, { key: "partner", label: "Partner" }, { key: "courier", label: "Courier" }, { key: "reason", label: "NDR Reason" }, { key: "attempt", label: "Attempt" }, { key: "response", label: "Response" }, { key: "status", label: "Status" }], records: [{ shipment: "SHP-1004", partner: "MovePlus", courier: "Ecom Express", reason: "Customer unavailable", attempt: "1 of 3", response: "Reattempt tomorrow", status: "Reattempt" }, { shipment: "SHP-0994", partner: "ABC Logistics", courier: "Delhivery", reason: "Address incomplete", attempt: "2 of 3", response: "Address updated", status: "In Progress" }] },
  "Invoices": { title: "Invoices", description: "Review partner billing, freight, adjustments, taxes and payment status.", action: "Create invoice", columns: [{ key: "invoice", label: "Invoice No." }, { key: "partner", label: "Partner" }, { key: "period", label: "Billing Period" }, { key: "subtotal", label: "Subtotal" }, { key: "tax", label: "Tax" }, { key: "total", label: "Total" }, { key: "status", label: "Status" }], records: [{ invoice: "INV-2026-0918", partner: "ABC Logistics", period: "01–15 Sep", subtotal: "₹1,28,420", tax: "₹23,116", total: "₹1,51,536", status: "Paid" }, { invoice: "INV-2026-0919", partner: "FastMove", period: "01–15 Sep", subtotal: "₹86,750", tax: "₹15,615", total: "₹1,02,365", status: "Due" }] },
  "Audit Logs": { title: "Audit Logs", description: "Trace sensitive actions and configuration changes across operations.", columns: [{ key: "user", label: "User" }, { key: "action", label: "Action" }, { key: "module", label: "Module" }, { key: "record", label: "Record" }, { key: "change", label: "Change" }, { key: "timestamp", label: "Timestamp" }, { key: "device", label: "IP / Device" }], records: [{ user: "Operations Admin", action: "Updated", module: "Courier Rates", record: "DLV-01", change: "Zone C: ₹54 → ₹56", timestamp: "25 Sep, 10:31", device: "10.20.8.16 · Chrome" }, { user: "Finance Manager", action: "Approved", module: "Wallet", record: "TXN-89221", change: "Pending → Completed", timestamp: "25 Sep, 10:12", device: "10.20.8.22 · Edge" }] },
};

export function getModuleDefinition(name: string): ModuleDefinition {
  const definition = moduleDefinitions[name];
  if (definition) return definition;
  const fallback = moduleDefinitions["All Orders"];
  if (!fallback) throw new Error("Default logistics module is unavailable.");
  return fallback;
}

const descriptions: Record<string, string> = {
  "Create Order": "Capture pickup, delivery, package, payment and courier service details.",
  "Shipment Tracking": "Search shipment IDs and review timestamped tracking events.",
  "Add Partner": "Complete company, GST, PAN, KYC, bank and access information.",
  "Rate Calculator": "Compare actual and volumetric weight with a detailed charge estimate.",
  "Charge Configuration": "Maintain courier processing, ROV, volumetric and delivery charges.",
  "Courier List": "Manage enabled couriers, services, credentials and synchronization health.",
  "COD Remittances": "Track collected, remitted and pending COD amounts by partner.",
  "RTO": "Monitor return reasons, reverse tracking and delivery back to origin.",
  "Disputes": "Review claims, supporting evidence, decisions and settlement history.",
  "Order Reports": "Analyze logistics operations with exportable filtered records.",
  "Company Profile": "Maintain company identity, registered address and tax information.",
};

for (const group of [...adminNavigation, ...partnerNavigation]) {
  for (const item of group.items) {
    if (!moduleDefinitions[item]) moduleDefinitions[item] = generic(item, descriptions[item] ?? `Manage ${item.toLowerCase()} records and operational settings.`);
  }
  if (!moduleDefinitions[group.label] && group.label !== "Dashboard" && group.label !== "Partner Dashboard") {
    moduleDefinitions[group.label] = generic(group.label, descriptions[group.label] ?? `Manage ${group.label.toLowerCase()} records and operations.`);
  }
}
