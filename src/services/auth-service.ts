import type { PortalRole, SessionProfile } from "@/features/logistics/types";
import { REST_ENDPOINTS, apiBaseUrl } from "./api-client";
import { store } from "./local-store";

export interface RegisterInput { name: string; email: string; password: string; role: PortalRole }
export interface SignInInput { email: string; password: string; role: PortalRole }

export interface AuthService {
  register(input: RegisterInput): Promise<SessionProfile>;
  signIn(input: SignInInput): Promise<SessionProfile>;
  signOut(): void;
  restore(): SessionProfile | null;
}

const SESSION_KEY = "logitrack.session";
const saveSession = (session: SessionProfile) => { window.localStorage.setItem(SESSION_KEY, JSON.stringify(session)); return session; };

async function hashPassword(password: string, salt: string) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** REST adapter for the Express API (JWT issued by /api/auth). */
class RestAuthService implements AuthService {
  constructor(private readonly baseUrl: string) {}
  private async call(path: string, body: unknown): Promise<SessionProfile> {
    const response = await fetch(`${this.baseUrl}${REST_ENDPOINTS.auth}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const payload = (await response.json().catch(() => ({}))) as { data?: SessionProfile; message?: string };
    if (!response.ok || !payload.data) throw new Error(payload.message ?? "Authentication failed.");
    return saveSession(payload.data);
  }
  register(input: RegisterInput) { return this.call("/register", input); }
  signIn(input: SignInInput) { return this.call("/login", input); }
  signOut() { window.localStorage.removeItem(SESSION_KEY); }
  restore() { const raw = window.localStorage.getItem(SESSION_KEY); return raw ? (JSON.parse(raw) as SessionProfile) : null; }
}

/** Application-state adapter used until the API is connected. Accounts must be created; passwords are stored only as salted hashes. */
class LocalAuthService implements AuthService {
  async register(input: RegisterInput): Promise<SessionProfile> {
    const email = input.email.trim().toLowerCase();
    const accounts = store.list("accounts");
    if (accounts.some((account) => account.email === email)) throw new Error("An account with this email already exists.");
    let partnerId: string | undefined;
    if (input.role === "admin" && accounts.some((account) => account.role === "admin")) throw new Error("Admin accounts are created by an existing administrator.");
    if (input.role === "partner") {
      const partner = store.list("partners").find((row) => String(row.email).toLowerCase() === email);
      if (!partner) throw new Error("No partner is registered with this email. Contact your logistics administrator.");
      partnerId = partner.id;
    }
    const salt = crypto.randomUUID();
    const account = store.insert("accounts", { id: crypto.randomUUID(), createdAt: new Date().toISOString(), name: input.name.trim(), email, role: input.role, partnerId, salt, passwordHash: await hashPassword(input.password, salt) });
    return saveSession({ accountId: account.id, name: String(account.name), email, role: input.role, partnerId });
  }
  async signIn(input: SignInInput): Promise<SessionProfile> {
    const email = input.email.trim().toLowerCase();
    const account = store.list("accounts").find((row) => row.email === email && row.role === input.role);
    if (!account || (await hashPassword(input.password, String(account.salt))) !== account.passwordHash) throw new Error("Invalid email or password.");
    if (input.role === "partner") {
      const partner = account.partnerId ? store.get("partners", String(account.partnerId)) : undefined;
      if (!partner || partner.status !== "Active") throw new Error("This partner account is not active.");
      if (partner.access === "Disabled") throw new Error("Login access is disabled for this partner.");
    }
    return saveSession({ accountId: account.id, name: String(account.name), email, role: input.role, partnerId: account.partnerId ? String(account.partnerId) : undefined });
  }
  signOut() { window.localStorage.removeItem(SESSION_KEY); }
  restore() { const raw = window.localStorage.getItem(SESSION_KEY); return raw ? (JSON.parse(raw) as SessionProfile) : null; }
}

export const authService: AuthService = apiBaseUrl ? new RestAuthService(apiBaseUrl) : new LocalAuthService();
