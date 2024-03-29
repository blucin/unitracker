import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { api } from "~/utils/api";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
//import Head from "next/head";
//import { siteConfig } from "~/config/site";
//import { cn } from "~/lib/utils";
//import { fontSans } from "~/lib/fonts";

import "~/styles/globals.css";

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
        </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
