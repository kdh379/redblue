import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface Session {
        user: DefaultSession["user"];
        token: string;
    }
    interface JWT {
        token: string;
        exp: number;
    }
}
