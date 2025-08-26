import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/schema.graphql",
  documents: [
    "src/**/*.{ts,tsx}",
    "!src/gql/**/*",
  ],
  generates: {
    "src/gql/": {
      preset: "client",
    },
  },
};

export default config;
