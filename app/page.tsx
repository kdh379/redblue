"use client";

import Button from "@components/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

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
        <div>
            {!session ? (
                <Link href={authOptions.pages!.signIn!}>
                    <Button>Sign In</Button>
                </Link>
            ) : (
                <Button onClick={() => signOut()}>
                    {session.user?.email}Sign Out
                </Button>
            )}
        </div>
    );
}

export default function Home() {
    return (
        <div>
            <SignButton />
            <nav className="p-4">
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
