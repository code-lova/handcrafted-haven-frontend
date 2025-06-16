import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const roleBasedRoutes: Record<string, string[]> = {
  "/seller": ["seller"],
  "/buyer": ["buyer"],
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    // Role-based access
    const path = req.nextUrl.pathname;

    // Block access to /login and /signup for authenticated users
    if (token && (path === "/login" || path === "/signup")) {
      // Redirect based on role
      if (token.role === "seller")
        return NextResponse.redirect(new URL("/seller", req.url));
      if (token.role === "buyer")
        return NextResponse.redirect(new URL("/", req.url));
      return NextResponse.redirect(new URL("/", req.url)); // fallback
    }

    // Allow public access to login & signup if not authenticated
    if (!token && (path === "/login" || path === "/signup")) {
      return NextResponse.next();
    }

    for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
      if (path.startsWith(route)) {
        const userRole = token?.role as string | undefined;

        if (!userRole || !allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      //Only restrict protected routes — not login/signup
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (path === "/login" || path === "/signup") return true;
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/seller/:path*", "/buyer/:path*", "/login", "/signup"], // protect only these
};
