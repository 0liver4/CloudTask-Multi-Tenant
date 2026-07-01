import { NextResponse } from "next/server";

const TEAM_ROUTES = {
    "team-alpha": "/dashboard/team-alpha",
    "team-beta": "/dashboard/team-beta",
    "team-gamma": "/dashboard/team-gamma",
};

function isUnauthorizedAccess(request, role, teamName) {
    const pathname = request.nextUrl.pathname;

    // Regla 1: /admin es exclusivo de admins
    if (pathname.startsWith("/admin")) {
        return role !== "admin";
    }

    // Regla 2: dashboards de equipo, solo su propio equipo (o admin)
    if (role === "admin") return false;

    const teamId = Object.keys(TEAM_ROUTES).find((id) =>
        pathname.startsWith(TEAM_ROUTES[id])
    );

    if (!teamId) return false; // ruta no protegida por esta regla

    return teamName !== teamId;
}

export function middleware(request) {
    const role = request.cookies.get("user_role")?.value || "member";
    const teamName = request.cookies.get("user_team")?.value;
    const tenantId = role;

    if (isUnauthorizedAccess(request, role, teamName)) {
        return NextResponse.redirect(new URL("/403", request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-tenant-id", tenantId);

    return NextResponse.next({
        request: { headers: requestHeaders },
    });
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
};