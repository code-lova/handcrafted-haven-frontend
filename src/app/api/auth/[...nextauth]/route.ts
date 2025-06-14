import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

interface CustomUser {
  id: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  accessTokenExpires: number;
}

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Invalid credentials");
        }

        if (!data.accessToken || !data.name || !data.email) {
          throw new Error("Invalid response from server");
        }

        return {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role || "buyer", // default if missing
          accessToken: data.accessToken,
          accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: CustomUser }) {
      // On first login
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.accessTokenExpires;
      }

      // Check token expiration
      if (
        typeof token.accessTokenExpires === "number" &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }

      token.error = "AccessTokenExpired";
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id as string,
        name: token.name ?? "",
        email: token.email ?? "",
        role: token.role ?? "",
      };
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
