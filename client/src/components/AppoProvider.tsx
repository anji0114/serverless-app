"use client";

import { ApolloProvider as ApolloProviderBase } from "@apollo/client";
import client from "@/libs/apollo-client";

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};
