"use client";

import { useEffect } from "react";

export default function MSWBrowser() {
    useEffect(() => {
        (async () => {
            const { initMockServer } = await import("./index");
            initMockServer();
        })();
    }, []);

    return <></>;
}
