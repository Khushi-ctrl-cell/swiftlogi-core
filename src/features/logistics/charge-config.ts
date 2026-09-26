export interface ChargeField { key: string; label: string; unit?: string; options?: string[] }
export interface ChargeItem { key: string; label: string; rule: string; fields: ChargeField[] }

const basis = (...options: string[]) => ({ key: "basis", label: "Basis", options });

/** The 24 approved courier charge items with contextual configuration values. */
export const CHARGE_ITEMS: ChargeItem[] = [
  { key: "processing", label: "Processing", rule: "Charge per LR", fields: [{ key: "amount", label: "Charge", unit: "₹" }, basis("Per LR", "Per shipment")] },
  { key: "fsc", label: "FSC", rule: "Percentage of freight or per kg", fields: [{ key: "percent", label: "FSC", unit: "%" }, { key: "perKg", label: "Per kg", unit: "₹/kg" }, basis("% of freight", "Per kg")] },
  { key: "rovOwner", label: "ROV Owner’s Risk", rule: "% of DCN, minimum per LR", fields: [{ key: "percent", label: "% of DCN", unit: "%" }, { key: "minimum", label: "Minimum / LR", unit: "₹" }] },
  { key: "rovCarrier", label: "ROV Carrier’s Risk", rule: "% of DCN, minimum per LR", fields: [{ key: "percent", label: "% of DCN", unit: "%" }, { key: "minimum", label: "Minimum / LR", unit: "₹" }] },
  { key: "divisor", label: "Divisor / CFT", rule: "L × B × H / divisor", fields: [{ key: "divisor", label: "Divisor" }, { key: "cft", label: "CFT", unit: "kg/cft" }] },
  { key: "handling", label: "Handling", rule: "By weight slab", fields: [{ key: "slabUpto", label: "Slab up to", unit: "kg" }, { key: "amount", label: "Charge", unit: "₹" }, { key: "extraPerKg", label: "Above slab", unit: "₹/kg" }] },
  { key: "demurrage", label: "Demurrage", rule: "Per kg or per LR", fields: [{ key: "amount", label: "Charge", unit: "₹" }, basis("Per kg / day", "Per LR / day")] },
  { key: "freeStore", label: "Demurrage Free Store Period", rule: "Free days before demurrage", fields: [{ key: "days", label: "Free period", unit: "days" }] },
  { key: "floor", label: "Floor Delivery", rule: "Applicable per LR / unit", fields: [{ key: "amount", label: "Charge", unit: "₹" }, basis("Per LR", "Per floor", "Per unit")] },
  { key: "mall", label: "Mall Delivery", rule: "Applicable per LR / unit", fields: [{ key: "amount", label: "Charge", unit: "₹" }, basis("Per LR", "Per unit")] },
  { key: "csd", label: "CSD / Army Delivery", rule: "Applicable per LR / unit", fields: [{ key: "amount", label: "Charge", unit: "₹" }, basis("Per LR", "Per unit")] },
  { key: "reattempt", label: "Re-attempt", rule: "Free attempts, then charge", fields: [{ key: "freeAttempts", label: "Free attempts" }, { key: "amount", label: "Charge / attempt", unit: "₹" }] },
  { key: "sunday", label: "Sunday / Holiday Delivery", rule: "Charge per LR", fields: [{ key: "amount", label: "Charge", unit: "₹" }, basis("Per LR", "Per kg")] },
  { key: "fm", label: "FM Cost (Pick-up)", rule: "Per kg with minimum", fields: [{ key: "perKg", label: "Per kg", unit: "₹/kg" }, { key: "minimum", label: "Minimum", unit: "₹" }] },
  { key: "lm", label: "LM Cost", rule: "Per kg with minimum", fields: [{ key: "perKg", label: "Per kg", unit: "₹/kg" }, { key: "minimum", label: "Minimum", unit: "₹" }] },
  { key: "toPay", label: "To Pay", rule: "Charge per LR", fields: [{ key: "amount", label: "Charge", unit: "₹" }] },
  { key: "cheque", label: "Cheque Handling", rule: "Charge per cheque", fields: [{ key: "amount", label: "Charge", unit: "₹" }] },
  { key: "cash", label: "Cash Handling", rule: "COD amount × %, with minimum", fields: [{ key: "percent", label: "% of COD", unit: "%" }, { key: "minimum", label: "Minimum", unit: "₹" }] },
  { key: "appointment", label: "Appointment Handling", rule: "Charge per LR", fields: [{ key: "amount", label: "Charge", unit: "₹" }] },
  { key: "minWeight", label: "Minimum Charged Weight", rule: "Floor for charged weight", fields: [{ key: "kg", label: "Minimum", unit: "kg" }] },
  { key: "greenTax", label: "Green Tax", rule: "Configured base", fields: [{ key: "amount", label: "Charge", unit: "₹" }, basis("Per LR", "Per kg")] },
  { key: "minLr", label: "Minimum LR Charge", rule: "Minimum freight per LR", fields: [{ key: "amount", label: "Minimum", unit: "₹" }] },
  { key: "liability", label: "Liability Limit", rule: "Maximum liability per LR", fields: [{ key: "amount", label: "Limit", unit: "₹" }] },
  { key: "roundOff", label: "Round-off", rule: "Charged-weight rounding", fields: [{ key: "step", label: "Step", unit: "kg" }, { key: "rule", label: "Rule", options: ["Round up", "Nearest"] }] },
];

export const chargeKey = (item: string, field: string) => `${item}_${field}`;
