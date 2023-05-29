"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { childrenProps } from "@/types/types";

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: childrenProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
