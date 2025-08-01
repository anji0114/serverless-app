import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import {
  CUSTOMER_TABLE_NAME,
  PROPOSAL_TABLE_NAME,
} from "../../src/constants/table";
import { createLambdaFunctions } from "../constructs/lambda-functions";
import { createAppSyncResolvers } from "../constructs/appsync-resolvers";

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
    const functions = createLambdaFunctions(this, {
      customerTable,
      proposalTable,
    });

    // Lambda関数にDynamoDBテーブルの読み取り権限を付与
    customerTable.grantReadData(functions.getDashboardStats);
    proposalTable.grantReadData(functions.getDashboardStats);
    proposalTable.grantReadData(functions.getRecentProposals);

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

    // データソース・リゾルバー作成
    createAppSyncResolvers({
      api,
      functions,
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
