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

export default function Home() {
    return (
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
    );
}
