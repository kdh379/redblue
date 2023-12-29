import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsContainer from "next-auth/providers/credentials";

const refreshToken = async (token: JWT) => {
    // TODO: refresh token logic

    return {
        ...token,
    };
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsContainer({
            name: "Credentials",
            credentials: {
                emailAddr: {},
                passCode: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const { emailAddr, passCode } = credentials;

                const res = await fetch(
                    `${process.env.NEXTAUTH_URL}/api/authentication`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            emailAddr: emailAddr,
                            passCode: passCode,
                            userType: "U",
                        }),
                    },
                );

                const user: MemberAuthenticationRes = await res.json();

                if (user.isLogin !== "true") return null;

                return {
                    id: emailAddr,
                    email: emailAddr,
                    token: user.token,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) return { ...token, ...user };

            const nowTime = Math.floor(Date.now() / 1000);

            const shouldRefresh = token && token.exp < nowTime;
            if (!shouldRefresh) return { ...token };

            return refreshToken(token);
        },
        async session({ session, token }) {
            return { ...session, ...token };
        },
    },
    pages: {
        signIn: "/jwt-authentication",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
