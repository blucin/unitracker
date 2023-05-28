import { getSession, SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app"
import type { Session } from "next-auth";
import { api } from "~/utils/api";
import type { NextPageContext } from "next";

import "~/styles/globals.css";

const MyApp= ({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

MyApp.getInitialProps = async (ctx: NextPageContext) => {
  return {
    session: await getSession(ctx),
  };
};

export default api.withTRPC(MyApp);
