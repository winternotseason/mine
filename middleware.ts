import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (!request.cookies.get("authjs.session-token")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/addpost"],
};
