// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import type { AppProps } from "next/app";
import type { NextPageWithLayout } from "@/types";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "next-themes";
import DrawersContainer from "@/components/drawer-views/container";
import ModalsContainer from "@/components/modal-views/container";
import SettingsButton from "@/components/settings/settings-button";

export const isBrowser = typeof window !== "undefined";

// base css file
import "swiper/css";
import "@/assets/css/scrollbar.css";
import "@/assets/css/globals.css";
import "@/assets/css/range-slider.css";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        {getLayout(<Component {...pageProps} />)}
        <DrawersContainer />
        <ModalsContainer />
        <SettingsButton />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
