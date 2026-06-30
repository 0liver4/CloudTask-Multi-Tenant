import { NextResponse } from "next/server";

export function middleware(request) {

    // MOCK AUTH COOKIE
    const role = request.cookies.get("user_role")?.value || "member";
    const teamName = request.cookies.get("user_team")?.value || "member";

    const tenantId = role;

    // PROTECT ADMIN ROUTE
    if (role !== "admin") {
        if (
            request.nextUrl.pathname.startsWith("/dashboard/team-alpha") &&
            teamName !== "team-alpha"
        ) {
            return NextResponse.redirect(new URL("/403", request.url));
        }

        if (
            request.nextUrl.pathname.startsWith("/dashboard/team-beta") &&
            teamName !== "team-beta"
        ) {
            return NextResponse.redirect(new URL("/403", request.url));
        }

        if (
            request.nextUrl.pathname.startsWith("/dashboard/team-gamma") &&
            teamName !== "team-gamma"
        ) {
            return NextResponse.redirect(new URL("/403", request.url));
        }

    }

    // CLONE HEADERS
    const requestHeaders = new Headers(request.headers);

    // INJECT MULTI-TENANT HEADER
    requestHeaders.set("x-tenant-id", tenantId);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/dashboard/:path*",
    ],
};