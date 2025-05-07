/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import Cookie from "js-cookie";

import { jwtDecode } from "jwt-decode";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token: any = request.cookies.get("token") || "";

  if (token == "") {
    NextResponse.redirect(new URL("/auth/login", request.url));
  } else {
    const decode: any = jwtDecode(token?.value as string);
    // middleware untuk ke admin page
    if (
      decode.role != "ADMIN" &&
      decode.role == "MEMBER" &&
      request.nextUrl.pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/member", request.url));
    }
    if (
      decode.role != "ADMIN" &&
      decode.role == "USER" &&
      request.nextUrl.pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/user", request.url));
    }
    // untuk ke member page
    if (
      decode.role == "USER" &&
      request.nextUrl.pathname.startsWith("/member")
    ) {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin", "/member"],
};
