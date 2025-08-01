import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DashboardStats = {
  __typename?: 'DashboardStats';
  proposalsThisWeek: Scalars['Int']['output'];
  totalCustomers: Scalars['Int']['output'];
  totalProposals: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
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
  getRecentProposals: Array<Proposal>;
};


export type QueryGetRecentProposalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type GetDashboardStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardStatsQuery = { __typename?: 'Query', getDashboardStats: { __typename?: 'DashboardStats', totalCustomers: number, totalProposals: number, proposalsThisWeek: number } };

export type GetRecentProposalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentProposalsQuery = { __typename?: 'Query', getRecentProposals: Array<{ __typename?: 'Proposal', id: string, customerId: string, title: string, status: string, content: string, createdAt: string }> };

export type DummyMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type DummyMutationMutation = { __typename?: 'Mutation', _empty?: string | null };


export const GetDashboardStatsDocument = gql`
    query GetDashboardStats {
  getDashboardStats {
    totalCustomers
    totalProposals
    proposalsThisWeek
  }
}
    `;

/**
 * __useGetDashboardStatsQuery__
 *
 * To run a query within a React component, call `useGetDashboardStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
      }
export function useGetDashboardStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
        }
export function useGetDashboardStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
        }
export type GetDashboardStatsQueryHookResult = ReturnType<typeof useGetDashboardStatsQuery>;
export type GetDashboardStatsLazyQueryHookResult = ReturnType<typeof useGetDashboardStatsLazyQuery>;
export type GetDashboardStatsSuspenseQueryHookResult = ReturnType<typeof useGetDashboardStatsSuspenseQuery>;
export type GetDashboardStatsQueryResult = Apollo.QueryResult<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>;
export const GetRecentProposalsDocument = gql`
    query GetRecentProposals {
  getRecentProposals {
    id
    customerId
    title
    status
    content
    createdAt
  }
}
    `;

/**
 * __useGetRecentProposalsQuery__
 *
 * To run a query within a React component, call `useGetRecentProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentProposalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecentProposalsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentProposalsQuery, GetRecentProposalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentProposalsQuery, GetRecentProposalsQueryVariables>(GetRecentProposalsDocument, options);
      }
export function useGetRecentProposalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentProposalsQuery, GetRecentProposalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentProposalsQuery, GetRecentProposalsQueryVariables>(GetRecentProposalsDocument, options);
        }
export function useGetRecentProposalsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRecentProposalsQuery, GetRecentProposalsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRecentProposalsQuery, GetRecentProposalsQueryVariables>(GetRecentProposalsDocument, options);
        }
export type GetRecentProposalsQueryHookResult = ReturnType<typeof useGetRecentProposalsQuery>;
export type GetRecentProposalsLazyQueryHookResult = ReturnType<typeof useGetRecentProposalsLazyQuery>;
export type GetRecentProposalsSuspenseQueryHookResult = ReturnType<typeof useGetRecentProposalsSuspenseQuery>;
export type GetRecentProposalsQueryResult = Apollo.QueryResult<GetRecentProposalsQuery, GetRecentProposalsQueryVariables>;
export const DummyMutationDocument = gql`
    mutation DummyMutation {
  _empty
}
    `;
export type DummyMutationMutationFn = Apollo.MutationFunction<DummyMutationMutation, DummyMutationMutationVariables>;

/**
 * __useDummyMutationMutation__
 *
 * To run a mutation, you first call `useDummyMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDummyMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dummyMutationMutation, { data, loading, error }] = useDummyMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useDummyMutationMutation(baseOptions?: Apollo.MutationHookOptions<DummyMutationMutation, DummyMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DummyMutationMutation, DummyMutationMutationVariables>(DummyMutationDocument, options);
      }
export type DummyMutationMutationHookResult = ReturnType<typeof useDummyMutationMutation>;
export type DummyMutationMutationResult = Apollo.MutationResult<DummyMutationMutation>;
export type DummyMutationMutationOptions = Apollo.BaseMutationOptions<DummyMutationMutation, DummyMutationMutationVariables>;