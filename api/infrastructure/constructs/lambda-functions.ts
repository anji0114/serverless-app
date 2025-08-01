import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import * as path from "path";

const lambdaExclude = [
  "cdk.out",
  "node_modules",
  "infrastructure",
  "docs",
  "**/*.test.ts",
  "**/*.spec.ts",
  "test",
  "tests",
  "*.md",
  ".git*",
  "jest.config.js",
  "tsconfig.json",
  "pnpm-lock.yaml",
];

export interface LambdaFunctionsProps {
  customerTable: dynamodb.Table;
  proposalTable: dynamodb.Table;
}

export function createLambdaFunctions(
  scope: Construct,
  props: LambdaFunctionsProps
) {
  const { customerTable, proposalTable } = props;

  const commonProps = {
    runtime: lambda.Runtime.NODEJS_22_X,
    code: lambda.Code.fromAsset(path.join(__dirname, "../../src"), {
      exclude: lambdaExclude,
    }),
    environment: {
      CUSTOMER_TABLE_NAME: customerTable.tableName,
      PROPOSAL_TABLE_NAME: proposalTable.tableName,
    },
  };

  const getDashboardStatsFunction = new lambda.Function(
    scope,
    "GetDashboardStatsFunction",
    {
      ...commonProps,
      handler: "handlers/dashboard/getDashboardStats.handler",
    }
  );

  const getRecentProposalsFunction = new lambda.Function(
    scope,
    "GetRecentProposalsFunction",
    {
      ...commonProps,
      handler: "handlers/dashboard/getRecentProposals.handler",
    }
  );

  return {
    getDashboardStats: getDashboardStatsFunction,
    getRecentProposals: getRecentProposalsFunction,
  };
}
