export interface ApiResult<T> {
  data: T;
  total?: number;
}

export interface ApiClient {
  get<T>(path: string): Promise<ApiResult<T>>;
  post<TInput, TOutput>(path: string, payload: TInput): Promise<ApiResult<TOutput>>;
}

export const REST_ENDPOINTS = {
  auth: "/api/auth",
  dashboard: "/api/dashboard",
  orders: "/api/orders",
  partners: "/api/partners",
  wallets: "/api/wallets",
  rates: "/api/rates",
  couriers: "/api/couriers",
  charges: "/api/charges",
  shipments: "/api/shipments",
  ndr: "/api/ndr",
  rto: "/api/rto",
  cod: "/api/cod",
  remittances: "/api/remittances",
  billing: "/api/billing",
  invoices: "/api/invoices",
  claims: "/api/claims",
  disputes: "/api/disputes",
  reports: "/api/reports",
  masterData: "/api/master-data",
  settings: "/api/settings",
  auditLogs: "/api/audit-logs",
  notifications: "/api/notifications",
} as const;

export class RestApiClient implements ApiClient {
  constructor(private readonly baseUrl: string) {}

  async get<T>(path: string): Promise<ApiResult<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, { credentials: "include" });
    if (!response.ok) throw new Error("The request could not be completed.");
    return response.json() as Promise<ApiResult<T>>;
  }

  async post<TInput, TOutput>(path: string, payload: TInput): Promise<ApiResult<TOutput>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("The request could not be completed.");
    return response.json() as Promise<ApiResult<TOutput>>;
  }
}
