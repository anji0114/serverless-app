import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DashboardStats } from "../entities/dashboard";
import { CUSTOMER_TABLE_NAME, PROPOSAL_TABLE_NAME } from "../constants/table";

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-northeast-1",
});

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const customerTableName = CUSTOMER_TABLE_NAME;
    const proposalTableName = PROPOSAL_TABLE_NAME;

    // 顧客数を取得
    const customersCommand = new ScanCommand({
      TableName: customerTableName,
      Select: "COUNT",
    });
    const customersResult = await dynamoClient.send(customersCommand);
    const totalCustomers = customersResult.Count || 0;

    // 提案文数を取得
    const proposalsCommand = new ScanCommand({
      TableName: proposalTableName,
      Select: "COUNT",
    });
    const proposalsResult = await dynamoClient.send(proposalsCommand);
    const totalProposals = proposalsResult.Count || 0;

    // 今週の提案文数を取得（7日前以降）
    const oneWeekAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    const recentProposalsCommand = new ScanCommand({
      TableName: proposalTableName,
      FilterExpression: "createdAt >= :weekAgo",
      ExpressionAttributeValues: {
        ":weekAgo": { S: oneWeekAgo },
      },
      Select: "COUNT",
    });
    const recentProposalsResult = await dynamoClient.send(
      recentProposalsCommand
    );
    const proposalsThisWeek = recentProposalsResult.Count || 0;

    return {
      totalCustomers,
      totalProposals,
      proposalsThisWeek,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to fetch dashboard statistics");
  }
};
