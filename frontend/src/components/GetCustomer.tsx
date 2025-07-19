import { gql, useQuery } from "@apollo/client";
import { FC, useState } from "react";

const GET_CUSTOMER = gql`
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      name
      nameLength
    }
  }
`;

type Props = {
  id: string;
};

export const GetCustomer: FC<Props> = ({ id }) => {
  const { data, loading, error } = useQuery(GET_CUSTOMER, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <div>Loading...</div>;

  if (!data) return null;

  return (
    <div className="flex gap-2">
      <div className="font-bold">{data.getCustomer.name}</div>
      <div>{data.getCustomer.id}</div>
      <div>{data.getCustomer.nameLength}</div>
    </div>
  );
};
