import * as appsync from "@aws-cdk/aws-appsync-alpha";
import * as lambda from "aws-cdk-lib/aws-lambda";

export interface AppSyncResolversProps {
  api: appsync.GraphqlApi;
  functions: {
    getDashboardStats: lambda.Function;
    getRecentProposals: lambda.Function;
    createCustomer: lambda.Function;
  };
}

export function createAppSyncResolvers(props: AppSyncResolversProps) {
  const { api, functions } = props;

  const dashboardDataSource = api.addLambdaDataSource(
    "DashboardDataSource",
    functions.getDashboardStats
  );

  dashboardDataSource.createResolver("GetDashboardStatsResolver", {
    typeName: "Query",
    fieldName: "getDashboardStats",
  });

  const recentProposalsDataSource = api.addLambdaDataSource(
    "RecentProposalsDataSource",
    functions.getRecentProposals
  );

  recentProposalsDataSource.createResolver("GetRecentProposalsResolver", {
    typeName: "Query",
    fieldName: "getRecentProposals",
  });

  const createCustomerDataSource = api.addLambdaDataSource(
    "CreateCustomerDataSource",
    functions.createCustomer
  );

  createCustomerDataSource.createResolver("CreateCustomerResolver", {
    typeName: "Mutation",
    fieldName: "createCustomer",
  });

  return {
    dashboardDataSource,
    recentProposalsDataSource,
    createCustomerDataSource,
  };
}
