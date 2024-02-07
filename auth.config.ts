import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./app/lib/schema";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (parsed.success) {
          const { username, password } = parsed.data;
          const user = (
            await getDocs(
              query(collection(db, "Users"), where("username", "==", username))
            )
          ).docs.map((doc) => doc.data())[0];
          const passwordsMatched = await compare(password, user.password);
          if (passwordsMatched) return user as any;
          return null;
        }
      },
    }),
  ],
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
