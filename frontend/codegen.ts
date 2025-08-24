import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/schema.graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "src/gql/": {
      preset: "client",
      // presetConfig: {
      //   fragmentMasking: false,
      // },
      // config: {
      //   inlineFragmentTypes: "combine",
      // },
    },
  },
};

export default config;
