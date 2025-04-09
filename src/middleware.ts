import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Optionally, validate the token here

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to specific routes
};
