import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "./schema.graphql": {
        assumeValid: true,
      },
    },
  ],
  documents: ["./queries/*.ts"],
  generates: {
    "./generated/query_collections.yaml": {
      plugins: ["hasura-allow-list"],
      config: {
        globalFragments: true,
        fragmentsOrder: "document",
      },
    },
    "./generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        rawRequest: true,
        enumsAsTypes: false,
        strictScalars: true,
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          enumValues: "change-case-all#upperCase",
        },
      },
    },
  },
};
export default config;
