import { signInWithCredential } from "firebase/auth";
import { auth } from "./firebase";
import { NextRequest, NextResponse } from "next/server";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const encodedTokens = cookies().get("tokens");
  if (encodedTokens) {
    const tokens = JSON.parse(encodedTokens.value);
    try {
      await signInWithCredential(
        auth,
        GoogleAuthProvider.credential(tokens.id_token, tokens.access_token)
      );
      return NextResponse.next();
    } catch (error) {}
  }
  if (req.nextUrl.pathname.startsWith("/api/messages")) {
    return NextResponse.json("Forbidden", { status: 403 });
  } else {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/api/messages/:path*"],
};
