import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();


  if (url.pathname.startsWith("/Superadmin")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Superadmin/:path*", "/admin/:path*", "/SMuser/:path*"],
};


