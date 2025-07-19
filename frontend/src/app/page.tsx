"use client";

import { CreateCustomer } from "@/components/CreateCustomer";
import { GetCustomer } from "@/components/GetCustomer";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_ALL_USERS = gql`
  query {
    listCustomers {
      name
      id
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [id, setId] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen p-10">
      <div className="flex flex-col gap-2">
        {data?.listCustomers.map((customer: any) => (
          <div
            key={customer.id}
            className="border-t border-stone-300 flex gap-2 last:border-b py-2"
          >
            <div>{customer.name}</div>
            <button onClick={() => setId(customer.id)}>Get</button>
          </div>
        ))}
      </div>
      <CreateCustomer />

      <GetCustomer id={id} />
    </div>
  );
}
