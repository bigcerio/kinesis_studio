import { NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedPaths = ["/corpo", "/scheda"];

export default auth((req) => {
  const isProtected = protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p));
  if (isProtected && !req.auth) {
    const signInUrl = new URL("/accedi", req.nextUrl.origin);
    signInUrl.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/corpo/:path*", "/scheda/:path*"],
};
