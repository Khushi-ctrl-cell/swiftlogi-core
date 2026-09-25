import type { ModuleDefinition, PortalRole } from "@/features/logistics/types";
import { getModuleDefinition } from "@/features/logistics/mock-data";

export interface LoginInput {
  email: string;
  password: string;
  role: PortalRole;
}

export interface SessionProfile {
  name: string;
  email: string;
  role: PortalRole;
}

export interface LogisticsService {
  signIn(input: LoginInput): Promise<SessionProfile>;
  getModule(name: string): Promise<ModuleDefinition>;
}

export class MockLogisticsService implements LogisticsService {
  async signIn(input: LoginInput): Promise<SessionProfile> {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return {
      name: input.role === "admin" ? "Operations Admin" : "ABC Logistics",
      email: input.email,
      role: input.role,
    };
  }

  async getModule(name: string): Promise<ModuleDefinition> {
    await new Promise((resolve) => setTimeout(resolve, 180));
    return getModuleDefinition(name);
  }
}

export const logisticsService: LogisticsService = new MockLogisticsService();
