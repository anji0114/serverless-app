/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateCustomer($input: CreateCustomerInput!) {\n    createCustomer(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateCustomerDocument,
    "\n  query getDashboardStats {\n    getDashboardStats {\n      ...DashboardStatusFragment\n      ...DashboardStatusFragment2\n    }\n  }\n": typeof types.GetDashboardStatsDocument,
    "\n  query getRecentProposals {\n    getRecentProposals {\n      id\n      customerId\n      title\n      status\n      content\n      createdAt\n    }\n  }\n": typeof types.GetRecentProposalsDocument,
    "\n  mutation DummyMutation {\n    _empty\n  }\n": typeof types.DummyMutationDocument,
    "\n  fragment DashboardStatusFragment on DashboardStats {\n    totalCustomers\n    totalProposals\n  }\n": typeof types.DashboardStatusFragmentFragmentDoc,
    "\n  fragment DashboardStatusFragment2 on DashboardStats {\n    proposalsThisWeek\n  }\n": typeof types.DashboardStatusFragment2FragmentDoc,
};
const documents: Documents = {
    "\n  mutation CreateCustomer($input: CreateCustomerInput!) {\n    createCustomer(input: $input) {\n      id\n    }\n  }\n": types.CreateCustomerDocument,
    "\n  query getDashboardStats {\n    getDashboardStats {\n      ...DashboardStatusFragment\n      ...DashboardStatusFragment2\n    }\n  }\n": types.GetDashboardStatsDocument,
    "\n  query getRecentProposals {\n    getRecentProposals {\n      id\n      customerId\n      title\n      status\n      content\n      createdAt\n    }\n  }\n": types.GetRecentProposalsDocument,
    "\n  mutation DummyMutation {\n    _empty\n  }\n": types.DummyMutationDocument,
    "\n  fragment DashboardStatusFragment on DashboardStats {\n    totalCustomers\n    totalProposals\n  }\n": types.DashboardStatusFragmentFragmentDoc,
    "\n  fragment DashboardStatusFragment2 on DashboardStats {\n    proposalsThisWeek\n  }\n": types.DashboardStatusFragment2FragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCustomer($input: CreateCustomerInput!) {\n    createCustomer(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCustomer($input: CreateCustomerInput!) {\n    createCustomer(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getDashboardStats {\n    getDashboardStats {\n      ...DashboardStatusFragment\n      ...DashboardStatusFragment2\n    }\n  }\n"): (typeof documents)["\n  query getDashboardStats {\n    getDashboardStats {\n      ...DashboardStatusFragment\n      ...DashboardStatusFragment2\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRecentProposals {\n    getRecentProposals {\n      id\n      customerId\n      title\n      status\n      content\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getRecentProposals {\n    getRecentProposals {\n      id\n      customerId\n      title\n      status\n      content\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DummyMutation {\n    _empty\n  }\n"): (typeof documents)["\n  mutation DummyMutation {\n    _empty\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DashboardStatusFragment on DashboardStats {\n    totalCustomers\n    totalProposals\n  }\n"): (typeof documents)["\n  fragment DashboardStatusFragment on DashboardStats {\n    totalCustomers\n    totalProposals\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DashboardStatusFragment2 on DashboardStats {\n    proposalsThisWeek\n  }\n"): (typeof documents)["\n  fragment DashboardStatusFragment2 on DashboardStats {\n    proposalsThisWeek\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;