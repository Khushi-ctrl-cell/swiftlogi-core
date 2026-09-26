export interface ApiResult<T> {
  data: T;
  total?: number;
}

export interface ApiClient {
  get<T>(path: string): Promise<ApiResult<T>>;
  post<TInput, TOutput>(path: string, payload: TInput): Promise<ApiResult<TOutput>>;
}

/** Set VITE_API_BASE_URL to the Express API origin to switch services from application state to REST. */
export const apiBaseUrl: string = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

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
  constructor(private readonly baseUrl: string, private readonly token?: string) {}

  private headers(): HeadersInit {
    return { "Content-Type": "application/json", ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}) };
  }

  async get<T>(path: string): Promise<ApiResult<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, { headers: this.headers() });
    if (!response.ok) throw new Error("The request could not be completed.");
    return response.json() as Promise<ApiResult<T>>;
  }

  async post<TInput, TOutput>(path: string, payload: TInput): Promise<ApiResult<TOutput>> {
    const response = await fetch(`${this.baseUrl}${path}`, { method: "POST", headers: this.headers(), body: JSON.stringify(payload) });
    if (!response.ok) throw new Error("The request could not be completed.");
    return response.json() as Promise<ApiResult<TOutput>>;
  }
}
