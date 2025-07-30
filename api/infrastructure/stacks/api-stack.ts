import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import * as path from "path";
import {
  CUSTOMER_TABLE_NAME,
  PROPOSAL_TABLE_NAME,
} from "../../src/constatns/table";

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

export class CdkApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB テーブル作成
    const customerTable = new dynamodb.Table(this, "CustomerTable", {
      tableName: CUSTOMER_TABLE_NAME,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // 開発用
    });

    const proposalTable = new dynamodb.Table(this, "ProposalTable", {
      tableName: PROPOSAL_TABLE_NAME,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // 開発用
    });

    // Lambda関数作成
    const getDashboardStatsFunction = new lambda.Function(
      this,
      "GetDashboardStatsFunction",
      {
        runtime: lambda.Runtime.NODEJS_22_X,
        handler: "src/handlers/dashboard/getDashboardStats.handler",
        code: lambda.Code.fromAsset(path.join(__dirname, "../.."), {
          exclude: lambdaExclude,
        }),
        environment: {
          CUSTOMER_TABLE_NAME: customerTable.tableName,
          PROPOSAL_TABLE_NAME: proposalTable.tableName,
        },
      }
    );

    // Lambda関数にDynamoDBテーブルの読み取り権限を付与
    customerTable.grantReadData(getDashboardStatsFunction);
    proposalTable.grantReadData(getDashboardStatsFunction);

    // AppSync API作成
    const api = new appsync.GraphqlApi(this, "CustomerApi", {
      name: "proposy-customer-api",
      schema: appsync.SchemaFile.fromAsset("schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
    });

    // データソース作成
    const dashboardDataSource = api.addLambdaDataSource(
      "DashboardDataSource",
      getDashboardStatsFunction
    );

    // リゾルバー作成
    dashboardDataSource.createResolver("GetDashboardStatsResolver", {
      typeName: "Query",
      fieldName: "getDashboardStats",
    });

    // 出力: API URL
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl,
    });

    // 出力: API Key
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });
  }
}
