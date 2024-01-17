import { Auth } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const authClient = new Auth.OAuth2Client({
    clientId: process.env.FIREBASE_CLIENT_ID,
    clientSecret: process.env.FIREBASE_CLIENT_SECRET,
    redirectUri: "http://localhost:3000/api/auth/google/callback",
  });

  const {
    tokens: { access_token, refresh_token, expiry_date },
  } = await authClient.getToken(code as string);

  authClient.setCredentials({ access_token });
  const userInfo: any = await authClient.request({
    url: "https://www.googleapis.com/oauth2/v3/userinfo",
  });

  // TODO: Deny the user from Google
  if (userInfo.data.email !== "asadkhan6192@gmail.com") {
    return NextResponse.redirect(new URL("/begone_devil", req.url));
  }

  // TODO: Maybe encrypt the cookie?
  cookies().set(
    "tokens",
    JSON.stringify({ access_token, refresh_token, expiry_date }),
    { expires: expiry_date as number, httpOnly: true, sameSite: true }
  );
  return NextResponse.redirect("http://localhost:3000/admin/dashboard");
}
