import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($name: String!) {
    createCustomer(input: { name: $name }) {
      id
      name
    }
  }
`;

export const CreateCustomer = () => {
  const [name, setName] = useState("");
  const [createCustomer] = useMutation(CREATE_CUSTOMER);

  const handleCreateCustomer = async () => {
    if (!name) {
      alert("Name is required");
      return;
    }
    await createCustomer({ variables: { name } });
    alert("Customer created");
    setName("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="name"
        value={name}
        className="border border-stone-300 rounded-md p-2"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleCreateCustomer}
        className="bg-blue-500 text-white rounded-md p-2"
        disabled={!name}
      >
        Create
      </button>
    </div>
  );
};
