export const publicRoutes = ["/auth/new-verification", "/auth/new-password"];
export const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
];

export const DEFAULT_LOGIN_REDIRECT = "/";
export const DEFAULT_START_REDIRECT = "/get-started";

export const apiAuthPrefix = "/api/auth";
export const protectedRoutesPrefix = [
  "/settings",
  "/albums",
  "/collections",
  "/favorites",
  "/archives",
  DEFAULT_START_REDIRECT,
];
