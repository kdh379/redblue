import { getCurrentUserOrRedirect } from "lib/session";
import { PropsWithChildren } from "react";

export default async function Layout(props: PropsWithChildren) {
    await getCurrentUserOrRedirect();

    return <>{props.children}</>;
}
