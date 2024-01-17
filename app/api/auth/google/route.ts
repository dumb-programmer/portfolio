import { NextResponse } from "next/server";
import { Auth } from "googleapis";

export async function GET() {
  const oauth2Client = new Auth.OAuth2Client({
    clientId: process.env.FIREBASE_CLIENT_ID,
    clientSecret: process.env.FIREBASE_CLIENT_SECRET,
    redirectUri: "http://localhost:3000/api/auth/google/callback",
  });
  const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];
  const url = oauth2Client.generateAuthUrl({ scope: SCOPES });
  return NextResponse.redirect(url);
}
