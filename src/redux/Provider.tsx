"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { childrenProps } from "@/types/types";
import { ReactQueryProvider } from "@/app/ReactQueryProvider";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "@/app/AuthProvider";

export function Providers({ children }: childrenProps) {
  return (
    <ReactQueryProvider>
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          <AuthProvider>{children}</AuthProvider>
        </MantineProvider>
      </Provider>
    </ReactQueryProvider>
  );
}
