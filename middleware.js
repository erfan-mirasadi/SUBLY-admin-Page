import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // اگر کاربر login نکرده باشد، به صفحه login هدایت شود
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/product/:path*",
    "/products/:path*",
    "/customers/:path*",
  ],
};
