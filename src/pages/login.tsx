import { getSession } from "next-auth/react";
import SignUpCard from "@/components/SignUpCard";
import type { GetServerSidePropsContext } from "next";

export default function Login() {
  // pass providers to sign up card
  return (
    <div className="flex h-screen items-center justify-center px-6">
      <SignUpCard className="w-full max-w-md" />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
