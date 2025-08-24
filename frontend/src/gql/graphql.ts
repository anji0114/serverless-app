/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum Challenge {
  ImproveCustomerService = 'IMPROVE_CUSTOMER_SERVICE',
  IncreaseSales = 'INCREASE_SALES',
  Other = 'OTHER',
  ReduceCosts = 'REDUCE_COSTS'
}

export enum CompanySize {
  Enterprise = 'ENTERPRISE',
  ExtraSmall = 'EXTRA_SMALL',
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Personal = 'PERSONAL',
  Small = 'SMALL'
}

export type CreateCustomerInput = {
  challenges: Array<Challenge>;
  companyName: Scalars['String']['input'];
  companySize: CompanySize;
  contactPerson: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  industry: Industry;
  notes?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Customer = {
  __typename?: 'Customer';
  challenges: Array<Challenge>;
  companyName: Scalars['String']['output'];
  companySize: CompanySize;
  contactPerson: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  industry: Industry;
  notes?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type DashboardStats = {
  __typename?: 'DashboardStats';
  proposalsThisWeek: Scalars['Int']['output'];
  totalCustomers: Scalars['Int']['output'];
  totalProposals: Scalars['Int']['output'];
};

export enum Industry {
  Education = 'EDUCATION',
  Finance = 'FINANCE',
  Healthcare = 'HEALTHCARE',
  It = 'IT',
  Manufacturing = 'MANUFACTURING',
  Other = 'OTHER',
  Retail = 'RETAIL'
}

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createCustomer: Customer;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Proposal = {
  __typename?: 'Proposal';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getDashboardStats: DashboardStats;
  getPosts: Array<Post>;
  getRecentProposals: Array<Proposal>;
};


export type QueryGetRecentProposalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCustomerMutationVariables = Exact<{
  input: CreateCustomerInput;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer: { __typename?: 'Customer', id: string } };

export type GetDashboardStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardStatsQuery = { __typename?: 'Query', getDashboardStats: (
    { __typename?: 'DashboardStats' }
    & { ' $fragmentRefs'?: { 'DashboardStatusFragmentFragment': DashboardStatusFragmentFragment;'DashboardStatusFragment2Fragment': DashboardStatusFragment2Fragment } }
  ) };

export type GetRecentProposalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentProposalsQuery = { __typename?: 'Query', getRecentProposals: Array<{ __typename?: 'Proposal', id: string, customerId: string, title: string, status: string, content: string, createdAt: string }> };

export type DummyMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type DummyMutationMutation = { __typename?: 'Mutation', _empty?: string | null };

export type DashboardStatusFragmentFragment = { __typename?: 'DashboardStats', totalCustomers: number, totalProposals: number } & { ' $fragmentName'?: 'DashboardStatusFragmentFragment' };

export type DashboardStatusFragment2Fragment = { __typename?: 'DashboardStats', proposalsThisWeek: number } & { ' $fragmentName'?: 'DashboardStatusFragment2Fragment' };

export const DashboardStatusFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DashboardStatusFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardStats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCustomers"}},{"kind":"Field","name":{"kind":"Name","value":"totalProposals"}}]}}]} as unknown as DocumentNode<DashboardStatusFragmentFragment, unknown>;
export const DashboardStatusFragment2FragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DashboardStatusFragment2"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardStats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposalsThisWeek"}}]}}]} as unknown as DocumentNode<DashboardStatusFragment2Fragment, unknown>;
export const CreateCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const GetDashboardStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDashboardStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDashboardStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DashboardStatusFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"DashboardStatusFragment2"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DashboardStatusFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardStats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCustomers"}},{"kind":"Field","name":{"kind":"Name","value":"totalProposals"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DashboardStatusFragment2"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardStats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposalsThisWeek"}}]}}]} as unknown as DocumentNode<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>;
export const GetRecentProposalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRecentProposals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRecentProposals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetRecentProposalsQuery, GetRecentProposalsQueryVariables>;
export const DummyMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DummyMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_empty"}}]}}]} as unknown as DocumentNode<DummyMutationMutation, DummyMutationMutationVariables>;