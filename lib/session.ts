import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    const session = await getSession();

    return session?.user;
}

export async function getCurrentUserOrRedirect() {
    const user = await getCurrentUser();

    if (!user) redirect(authOptions.pages!.signIn!);

    return user;
}
