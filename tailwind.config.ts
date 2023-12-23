import type { Config } from "tailwindcss";

const screenValue = {
    mobile: 600,
};

const screenWidth = Object.fromEntries(
    Object.entries(screenValue).map(([key, value]) => [key, `${value}px`]),
);

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            width: {
                ...screenWidth,
            },
            maxWidth: {
                ...screenWidth,
            },
        },
    },
    plugins: [],
};
export default config;
