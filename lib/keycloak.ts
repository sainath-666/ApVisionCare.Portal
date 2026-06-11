import type { UserRole } from "./types";

const KEYCLOAK_ROLE_MAP: Record<string, UserRole> = {
  super_admin: "super_admin",
  spmu_admin: "super_admin",
  nodal_officer: "nodal_officer",
  district_officer: "nodal_officer",
  screening_team: "screening_team",
  screener: "screening_team",
  patient: "patient",
  citizen: "patient",
};

export function extractRolesFromToken(accessToken: string): string[] {
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64url").toString("utf-8"),
    ) as {
      realm_access?: { roles?: string[] };
      resource_access?: Record<string, { roles?: string[] }>;
    };

    const realmRoles = payload.realm_access?.roles ?? [];
    const clientRoles = Object.values(payload.resource_access ?? {}).flatMap(
      (r) => r.roles ?? [],
    );

    return Array.from(new Set([...realmRoles, ...clientRoles]));
  } catch {
    return [];
  }
}

export function mapKeycloakRoleToAppRole(roles: string[]): UserRole | null {
  for (const role of roles) {
    const normalized = role.toLowerCase().replace(/-/g, "_");
    if (KEYCLOAK_ROLE_MAP[normalized]) {
      return KEYCLOAK_ROLE_MAP[normalized];
    }
  }
  return null;
}

export function hasPermission(role: UserRole, pathname: string): boolean {
  const prefixes: Record<UserRole, string> = {
    super_admin: "/portal/super-admin",
    nodal_officer: "/portal/nodal-officer",
    screening_team: "/portal/screening-team",
    patient: "/portal/patient",
  };
  return pathname.startsWith(prefixes[role]);
}

export function isKeycloakEnabled(): boolean {
  return (
    process.env.AUTH_DEMO_MODE !== "true" &&
    Boolean(process.env.KEYCLOAK_ISSUER && process.env.KEYCLOAK_CLIENT_ID)
  );
}

/** Client-safe auth mode flag (set NEXT_PUBLIC_AUTH_MODE=keycloak when Keycloak is configured) */
export function isKeycloakClientMode(): boolean {
  return process.env.NEXT_PUBLIC_AUTH_MODE === "keycloak";
}
