"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/libs/apollo-client";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
