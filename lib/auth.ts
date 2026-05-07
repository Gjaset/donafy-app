import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, resetRateLimit } from "@/lib/rateLimit";
import { Rol } from "@prisma/client";

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

type HeadersLike = Headers | Record<string, string | string[] | undefined>;

function readHeader(headers: HeadersLike, key: string) {
  if ("get" in headers && typeof headers.get === "function") {
    return headers.get(key) || headers.get(key.toLowerCase());
  }

  const value = headers[key] ?? headers[key.toLowerCase()];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value || null;
}

function getClientIp(
  request?: Request | { headers?: HeadersLike }
) {
  if (!request?.headers) {
    return "unknown";
  }

  const forwardedFor = readHeader(request.headers, "x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = readHeader(request.headers, "x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? "";

        if (!email || !password) {
          throw new Error("MISSING_CREDENTIALS");
        }

        const ip = getClientIp(request);
        const limit = checkRateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
        if (!limit.ok) {
          throw new Error("RATE_LIMIT");
        }

        const user = await prisma.usuario.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("INVALID_CREDENTIALS");
        }

        if (!user.activo) {
          throw new Error("INACTIVE_ACCOUNT");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("INVALID_CREDENTIALS");
        }

        resetRateLimit(`login:${ip}`);

        return {
          id: String(user.id),
          email: user.email,
          nombre: user.nombre,
          rol: user.rol,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
        token.nombre = (user as { nombre?: string }).nombre ?? "";
        token.rol = (user as { rol?: Rol }).rol ?? Rol.CIUDADANO;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = Number(token.id ?? 0);
        session.user.nombre = String(token.nombre ?? "");
        session.user.rol = (token.rol as Rol) ?? Rol.CIUDADANO;
      }

      return session;
    },
  },
};

export function auth() {
  return getServerSession(authOptions);
}
