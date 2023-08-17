import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

export const requireAuth = async (
  context: GetServerSidePropsContext,
  callback: ({session}:{session:Session}) => void
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return callback({session});
};
