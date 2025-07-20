import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Construct } from "constructs";

interface LambdaConfig {
  name: string;
  handler: string;
  resolverType: "Query" | "Mutation";
  resolverField: string;
  permissions: ("read" | "write")[];
}

const createLambdaHandler = (
  scope: Construct,
  config: LambdaConfig,
  table: dynamodb.Table,
  api: appsync.GraphqlApi
) => {
  // Lambda関数作成
  const fn = new lambda.Function(scope, `${config.name}Function`, {
    runtime: lambda.Runtime.NODEJS_22_X,
    handler: config.handler,
    code: lambda.Code.fromAsset("lambda"),
    environment: {
      TABLE_NAME: table.tableName,
    },
  });

  // 権限付与
  if (config.permissions.includes("read")) {
    table.grantReadData(fn);
  }
  if (config.permissions.includes("write")) {
    table.grantWriteData(fn);
  }

  // AppSync データソース作成
  const dataSource = api.addLambdaDataSource(`${config.name}DataSource`, fn);

  // リゾルバー作成
  dataSource.createResolver(`${config.name}Resolver`, {
    typeName: config.resolverType,
    fieldName: config.resolverField,
    requestMappingTemplate: appsync.MappingTemplate.lambdaRequest(),
    responseMappingTemplate: appsync.MappingTemplate.lambdaResult(),
  });

  return { function: fn, dataSource };
};

// Lambda設定の定義
const lambdaConfigs: LambdaConfig[] = [
  {
    name: "GetCustomer",
    handler: "getCustomer.handler",
    resolverType: "Query",
    resolverField: "getCustomer",
    permissions: ["read"],
  },
];

// 全Lambda関数を一括作成
export const createAllLambdaHandlers = (
  scope: Construct,
  table: dynamodb.Table,
  api: appsync.GraphqlApi
) => {
  return lambdaConfigs.map((config) =>
    createLambdaHandler(scope, config, table, api)
  );
};
