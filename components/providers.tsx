"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

interface ProvidersProps {
    session: Session | null;
}

export default function Providers({
    session,
    children,
}: PropsWithChildren<ProvidersProps>) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
