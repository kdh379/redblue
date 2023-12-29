"use client";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Button from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NAV_LIST = [
    {
        href: "/scrolling",
        text: "2.1 Infinite Scrolling",
    },
    {
        href: "/sign-up",
        text: "2.2 Sign Up",
    },
    {
        href: "/jwt-authentication",
        text: "2.3 JWT Authentication",
    },
];

function SignButton() {
    const { data: session } = useSession();

    return (
        <>
            {!session ? (
                <Link href={authOptions.pages!.signIn!}>
                    <Button>Sign In</Button>
                </Link>
            ) : (
                <Button onClick={() => signOut()}>
                    {session.user?.email} Sign Out
                </Button>
            )}
        </>
    );
}

export default function HomePage() {
    return (
        <div className="p-4">
            <SignButton />
            <nav className="mt-4">
                <ul>
                    {NAV_LIST.map((nav) => (
                        <li key={nav.href}>
                            <Link
                                href={nav.href}
                                className="hover:text-blue-800 active:text-blue-400"
                            >
                                <strong>{nav.text}</strong>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
