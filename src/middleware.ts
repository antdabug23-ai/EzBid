import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "ez_bid_session";

const ROLE_PREFIX: Record<string, string> = {
  "/customer": "CUSTOMER",
  "/vendor": "VENDOR",
  "/admin": "ADMIN",
};

function getSecret(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) return null;
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefix = Object.keys(ROLE_PREFIX).find((p) => pathname.startsWith(p));
  if (!prefix) return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = getSecret();

  const loginUrl = new URL("/login", request.url);

  if (!token || !secret) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role as string | undefined;
    if (role !== ROLE_PREFIX[prefix]) {
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/customer/:path*", "/vendor/:path*", "/admin/:path*"],
};
