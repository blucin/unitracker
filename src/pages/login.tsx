import { getProviders, getSession } from "next-auth/react";
import SignUpCard from "@/components/SignUpCard";
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
  /*
  const session = await getSession(context);
  if(session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  */
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}