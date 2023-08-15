"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={ queryClient }>
      <SessionProvider>
        { children }
      </SessionProvider>
    </QueryClientProvider>
  )
}