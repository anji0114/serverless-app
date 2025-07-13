"use client";

import { gql, useQuery } from "@apollo/client";

const GET_ALL_USERS = gql`
  query {
    listCustomers {
      name
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
