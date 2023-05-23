import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import SignUpCard from "@/components/SignUpCard";
import {redirect} from "next/navigation";

export default async function Component() {
    const { data: session } = useSession();
    // if session then redirect to dashboard
    if(session) {
        redirect('/dashboard');
    }

    const providers = await getProviders();
    console.log(providers);

    return (
        <SignUpCard className="w-full max-w-md" />
    );
}