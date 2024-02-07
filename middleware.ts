import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  if (req.nextUrl.pathname === "/admin") {
    if (isLoggedIn) {
      return Response.redirect(new URL("/admin/dashboard", req.nextUrl));
    }
  } else if (!isLoggedIn) {
    return Response.redirect(new URL("/admin", req.nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin"],
};
