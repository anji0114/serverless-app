const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

// DynamoDB クライアント作成
const client = new DynamoDBClient({});

const dynamodb = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  const { id } = event.arguments;

  try {
    // DynamoDBからCustomer取得
    const command = new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: { id },
    });

    const result = await dynamodb.send(command);

    if (!result.Item) {
      return null;
    }

    // nameのlength追加
    const customer = result.Item;
    customer.nameLength = customer.name.length;

    return customer;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
