export type PortalRole = "admin" | "partner";

export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

export interface NavGroup {
  label: string;
  icon: string;
  items: string[];
}

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableRecord {
  [key: string]: string | number;
}

export interface ModuleDefinition {
  title: string;
  description: string;
  action?: string;
  columns: TableColumn[];
  records: TableRecord[];
  statuses?: string[];
}
