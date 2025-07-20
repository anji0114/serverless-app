import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as appsync from "@aws-cdk/aws-appsync-alpha";

import { createAllLambdaHandlers } from "./handler";

export class CdkApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB テーブル作成
    const customerTable = new dynamodb.Table(this, "CustomerTable", {
      tableName: "proposy-customers",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // 開発用
    });

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

    // DynamoDB データソース
    const customerDataSource = api.addDynamoDbDataSource(
      "CustomerDataSource",
      customerTable
    );

    // リゾルバー: createCustomer
    customerDataSource.createResolver("CreateCustomerResolver", {
      typeName: "Mutation",
      fieldName: "createCustomer",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version": "2017-02-28",
          "operation": "PutItem",
          "key": {
            "id": $util.dynamodb.toDynamoDBJson($util.autoId())
          },
          "attributeValues": {
            "name": $util.dynamodb.toDynamoDBJson($ctx.args.input.name)
          }
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    // リゾルバー: listCustomers
    customerDataSource.createResolver("ListCustomersResolver", {
      typeName: "Query",
      fieldName: "listCustomers",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version": "2017-02-28",
          "operation": "Scan"
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.fromString(`
        $util.toJson($ctx.result.items)
      `),
    });

    // Lambda 関数を作成
    createAllLambdaHandlers(this, customerTable, api);

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
