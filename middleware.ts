/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { auth } from "@/auth";
import { routing } from "./i18n/routing";
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  protectedRoutesPrefix,
  publicRoutes,
} from "./routes";

const publicPages = publicRoutes;

const authPages = authRoutes;

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  return RegExp(
    `^(/(${routing.locales.join("|")}))?(${pages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i",
  ).test(pathName);
};

const intlMiddleware = createIntlMiddleware(routing);

const authMiddleware = auth((req) => {
  const { nextUrl } = req;

  const isAuthPage = testPathnameRegex(authPages, nextUrl.pathname);
  const session = req.auth;
  const isProtectedRoute = protectedRoutesPrefix.some((prefix) =>
    nextUrl.pathname.startsWith(prefix),
  );

  if (!session && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const isExternalUrl = callbackUrl.startsWith("http");
    const validCallbackUrl = isExternalUrl ? "/" : callbackUrl;
    const encodedCallbackUrl = encodeURIComponent(validCallbackUrl);

    return NextResponse.redirect(
      new URL(`/auth/login?callback_url=${encodedCallbackUrl}`, nextUrl),
    );
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return intlMiddleware(req);
});

const middleware = (req: NextRequest) => {
  const { nextUrl } = req;

  const isPublicPage = testPathnameRegex(publicPages, nextUrl.pathname);
  const isAuthPage = testPathnameRegex(authPages, nextUrl.pathname);

  if (isAuthPage) {
    return (authMiddleware as any)(req);
  }

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
};

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

export default middleware;
