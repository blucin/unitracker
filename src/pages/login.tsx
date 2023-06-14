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
  console.log(providers);
  // pass providers to sign up card
  return (
    <div className="flex items-center justify-center">
      <SignUpCard className="w-full max-w-md"/>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);
  console.log(session);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }
  const providers = await getProviders();
  console.log("providers: ", providers);
  return {
    props: { providers: providers ?? [] },
  };
}