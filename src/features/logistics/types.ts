export type PortalRole = "admin" | "partner";

export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

export interface NavGroup {
  label: string;
  icon: string;
  items: string[];
}

export interface HistoryEvent {
  at: string;
  label: string;
  detail?: string;
  by?: string;
}

export type FieldValue = string | number | boolean | null | undefined | HistoryEvent[] | string[];

export interface EntityRecord {
  id: string;
  createdAt: string;
  partnerId?: string;
  [key: string]: FieldValue;
}

export type CollectionName =
  | "accounts" | "partners" | "orders" | "transactions" | "rates" | "courierCharges" | "couriers"
  | "remittances" | "ndr" | "rto" | "invoices" | "claims" | "disputes" | "audit" | "master"
  | "warehouses" | "documents" | "bankDetails" | "settings" | "notifications";

export type FieldType = "text" | "email" | "tel" | "number" | "date" | "select" | "textarea" | "file" | "password";

export interface FieldDef {
  key: string;
  label: string;
  type?: FieldType;
  options?: string[];
  required?: boolean;
  span?: boolean;
  placeholder?: string;
}

export type FormValues = Record<string, string>;

export interface SessionProfile {
  accountId: string;
  name: string;
  email: string;
  role: PortalRole;
  partnerId?: string;
  token?: string;
}
