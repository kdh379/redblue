import JWTAuthenticationPage from "@/components/pages/JwtAuthenticationPage";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const JWTAuthentication = async () => {
    const user = await getCurrentUser();

    if (user) redirect("/");

    return <JWTAuthenticationPage />;
};

export default JWTAuthentication;
