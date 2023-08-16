import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import SignUpCard from "@/components/SignUpCard";
import { getServerAuthSession } from "~/server/auth";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // pass providers to sign up card
  return (
    <div className="flex items-center justify-center h-screen px-6">
      <SignUpCard className="w-full max-w-md"/>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  /* disable for now, the sign in button will redirect for us 
  const session = await getServerAuthSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }
  */
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}