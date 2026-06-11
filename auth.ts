import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import Credentials from "next-auth/providers/credentials";
import {
  extractRolesFromToken,
  isKeycloakEnabled,
  mapKeycloakRoleToAppRole,
} from "@/lib/keycloak";
import type { UserRole } from "@/lib/types";

const DEMO_ROLES: UserRole[] = [
  "super_admin",
  "nodal_officer",
  "screening_team",
  "patient",
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? "dev-only-secret-replace-in-production",
  providers: isKeycloakEnabled()
    ? [
        Keycloak({
          clientId: process.env.KEYCLOAK_CLIENT_ID!,
          clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
          issuer: process.env.KEYCLOAK_ISSUER!,
        }),
      ]
    : [
        Credentials({
          id: "demo-role",
          name: "Demo Role",
          credentials: {
            role: { label: "Role", type: "text" },
          },
          authorize(credentials) {
            const role = credentials?.role as UserRole | undefined;
            if (!role || !DEMO_ROLES.includes(role)) return null;
            return {
              id: `demo-${role}`,
              name: "Demo User",
              email: `${role}@demo.apvisioncare.gov.in`,
              role,
            };
          },
        }),
      ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        const roles = extractRolesFromToken(account.access_token);
        token.roles = roles;
        token.role = mapKeycloakRoleToAppRole(roles) ?? undefined;
      }
      if (user?.role) {
        token.role = user.role;
        token.roles = [user.role];
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.roles = (token.roles as string[]) ?? [];
      session.role = token.role as UserRole | undefined;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
});
