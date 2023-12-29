import SignUpPage from "@/components/pages/SignUpPage";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const SignUp = async () => {
    const user = await getCurrentUser();

    if (user) redirect("/");

    return <SignUpPage />;
};

export default SignUp;
