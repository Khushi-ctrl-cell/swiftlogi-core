import type { NavGroup } from "./types";

export const adminNavigation: NavGroup[] = [
  { label: "Dashboard", icon: "LayoutDashboard", items: [] },
  { label: "Orders", icon: "Package", items: ["All Orders", "B2C Orders", "B2B Orders", "Shipment Tracking"] },
  { label: "Partners", icon: "Handshake", items: [] },
  { label: "Wallets", icon: "WalletCards", items: ["Main Wallet", "Partner Wallets", "Transactions", "Passbook"] },
  { label: "Shipping Rates", icon: "BadgeIndianRupee", items: ["B2C Rates", "B2B Rates"] },
  { label: "Courier & Operations", icon: "Truck", items: ["Courier Charges", "Courier Configuration", "Courier Integration"] },
  { label: "COD / NDR / RTO & Finance", icon: "RefreshCcw", items: ["COD Remittances", "COD Reconciliation", "NDR", "RTO", "Billing & Invoices"] },
  { label: "Claims & Disputes", icon: "ShieldAlert", items: ["Claims", "Disputes"] },
  { label: "Reports", icon: "ChartNoAxesCombined", items: [] },
  { label: "Master Data", icon: "Database", items: [] },
  { label: "Settings", icon: "Settings", items: [] },
  { label: "Audit Logs", icon: "ScrollText", items: [] },
];

export const partnerNavigation: NavGroup[] = [
  { label: "Dashboard", icon: "LayoutDashboard", items: [] },
  { label: "Orders", icon: "Package", items: ["My Orders", "Shipment Tracking"] },
  { label: "Finance", icon: "WalletCards", items: ["Passbook"] },
  { label: "Partner Tools", icon: "Wrench", items: ["Rate Calculator", "Reports", "Manage Warehouse", "Manage Documents", "Bank Details"] },
  { label: "Account", icon: "UserRound", items: ["Profile & Access"] },
];

export const ORDER_STATUSES = ["Pending", "Pickup Scheduled", "Picked Up", "In Transit", "Out for Delivery", "Delivered", "NDR", "RTO", "Cancelled"];
export const PENDING_STATUSES = ["Pending", "Pickup Scheduled"];
export const TRANSIT_STATUSES = ["Picked Up", "In Transit", "Out for Delivery"];
export const B2C_ZONES = ["A", "B", "C", "D", "E"];
export const B2B_ZONES = ["N1", "N2", "E", "NE", "W1", "W2", "S1", "S2", "Central"];
export const NOTIFICATION_CATEGORIES = ["Order/Shipment Updates", "NDR/RTO Alerts", "Low Wallet Balance", "COD/Remittance", "Claims/Disputes", "Recharge/Payment", "System Announcements"];
