import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const roleBasedRoutes: Record<string, string[]> = {
  "/seller": ["seller"],
  "/buyer": ["buyer"],
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Not logged in
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role-based access
    const path = req.nextUrl.pathname;

    for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
      if (path.startsWith(route)) {
        const userRole = token.role as string | undefined;

        if (!userRole || !allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow if token exists
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/seller/:path*", "/buyer/:path*"], // protect only these
};
