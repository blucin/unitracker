import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app"
import type { Session } from "next-auth";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp= ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
