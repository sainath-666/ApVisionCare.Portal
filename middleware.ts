import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasPermission } from "@/lib/keycloak";
import type { UserRole } from "@/lib/types";

const rolePaths: Record<UserRole, string> = {
  super_admin: "/portal/super-admin",
  nodal_officer: "/portal/nodal-officer",
  screening_team: "/portal/screening-team",
  patient: "/portal/patient",
};

export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/portal")) {
    return NextResponse.next();
  }

  const sessionRole = request.auth?.role;
  const cookieRole = request.cookies.get("apvc_role")?.value as
    | UserRole
    | undefined;
  const role = sessionRole ?? cookieRole;

  if (!role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!hasPermission(role, pathname)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  const allowedPrefix = rolePaths[role];
  if (allowedPrefix && !pathname.startsWith(allowedPrefix)) {
    return NextResponse.redirect(
      new URL(`${allowedPrefix}/dashboard`, request.url),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portal/:path*"],
};
