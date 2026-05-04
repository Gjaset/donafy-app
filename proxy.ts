import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { AppRole, Roles, getDashboardPathForRole } from "@/lib/roles";

const roleMatchers: Array<{ prefix: string; role: AppRole }> = [
  { prefix: "/admin", role: Roles.ADMIN },
  { prefix: "/fundacion", role: Roles.FUNDACION },
  { prefix: "/donante", role: Roles.DONANTE },
  { prefix: "/ciudadano", role: Roles.CIUDADANO },
  { prefix: "/pendiente", role: Roles.PENDIENTE_APROBACION },
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = token.rol as AppRole | undefined;
  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const required = roleMatchers.find((matcher) =>
    pathname.startsWith(matcher.prefix)
  );

  if (required && required.role !== role) {
    const fallback = getDashboardPathForRole(role);
    return NextResponse.redirect(new URL(fallback, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/fundacion/:path*",
    "/donante/:path*",
    "/ciudadano/:path*",
    "/pendiente",
  ],
};
