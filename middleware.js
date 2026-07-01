import { NextResponse } from "next/server";

const TEAM_ROUTES = {
    "team-alpha": "/dashboard/team-alpha",
    "team-beta": "/dashboard/team-beta",
    "team-gamma": "/dashboard/team-gamma",
};

function isUnauthorizedAccess(request, role, teamName) {
    const pathname = request.nextUrl.pathname;

    // ONLY ADMIN CAN ACCESS /admin
    if (pathname.startsWith("/admin")) return role !== "admin";

    //  ONLY ADMIN AND MEMBERS CAN ONLY ACCESS THEIR TEAM'S DASHBOARD TO /dashboard
    if (role === "admin") return false;

    // Check if the request is for a team dashboard route
    const teamId = Object.keys(TEAM_ROUTES).find((id) =>
        pathname.startsWith(TEAM_ROUTES[id])
    );

    // ID THERE IS NO TEAM ID IN THE PATH, IT'S AN UNAUTHORIZED ACCESS
    if (!teamId) return false; 

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