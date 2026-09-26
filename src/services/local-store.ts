import { useSyncExternalStore } from "react";
import type { CollectionName, EntityRecord } from "@/features/logistics/types";

/**
 * Browser-persisted application state used until the Express/MySQL API is connected.
 * Starts EMPTY — no seeded business records. Only the approved courier (Delhivery)
 * exists as an unconfigured courier entry.
 */
const STORAGE_KEY = "logitrack.state.v2";
const COLLECTIONS: CollectionName[] = [
  "accounts", "partners", "orders", "transactions", "rates", "courierCharges", "couriers", "remittances", "ndr", "rto",
  "invoices", "claims", "disputes", "audit", "master", "warehouses", "documents", "bankDetails", "settings", "notifications",
];
type State = Record<CollectionName, EntityRecord[]>;
const EMPTY: EntityRecord[] = [];

function blank(): State {
  const next = {} as State;
  for (const name of COLLECTIONS) next[name] = [];
  next.couriers = [{ id: "courier-delhivery", createdAt: new Date(0).toISOString(), name: "Delhivery", code: "DLV", enabled: false, apiKey: "", clientId: "", accountCode: "", lastSync: "" }];
  return next;
}

let state: State | null = null;
const listeners = new Set<() => void>();

function load(): State {
  if (state) return state;
  if (typeof window === "undefined") return blank();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    state = { ...blank(), ...(raw ? (JSON.parse(raw) as Partial<State>) : {}) };
  } catch {
    state = blank();
  }
  return state;
}

function commit(next: State) {
  state = next;
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* storage full or unavailable */ }
  listeners.forEach((listener) => listener());
}

export const store = {
  list(name: CollectionName): EntityRecord[] { return load()[name]; },
  get(name: CollectionName, id: string): EntityRecord | undefined { return load()[name].find((row) => row.id === id); },
  insert(name: CollectionName, record: EntityRecord): EntityRecord {
    const current = load();
    commit({ ...current, [name]: [record, ...current[name]] });
    return record;
  },
  insertMany(name: CollectionName, records: EntityRecord[]) {
    const current = load();
    commit({ ...current, [name]: [...records, ...current[name]] });
  },
  update(name: CollectionName, id: string, patch: Partial<EntityRecord>): EntityRecord | undefined {
    const current = load();
    let updated: EntityRecord | undefined;
    const rows = current[name].map((row) => {
      if (row.id !== id) return row;
      updated = { ...row, ...patch, id: row.id } as EntityRecord;
      return updated;
    });
    commit({ ...current, [name]: rows });
    return updated;
  },
  upsert(name: CollectionName, record: EntityRecord) {
    if (store.get(name, record.id)) store.update(name, record.id, record);
    else store.insert(name, record);
  },
  remove(name: CollectionName, id: string) {
    const current = load();
    commit({ ...current, [name]: current[name].filter((row) => row.id !== id) });
  },
  /** Next sequential business number, e.g. ORD-000001, based on existing records. */
  sequence(name: CollectionName, field: string, prefix: string, width = 6): string {
    const max = load()[name].reduce((acc, row) => {
      const match = String(row[field] ?? "").match(/(\d+)$/);
      return match ? Math.max(acc, Number(match[1])) : acc;
    }, 0);
    return `${prefix}${String(max + 1).padStart(width, "0")}`;
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },
};

export function useCollection(name: CollectionName): EntityRecord[] {
  return useSyncExternalStore(store.subscribe, () => load()[name], () => EMPTY);
}
