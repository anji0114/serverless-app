import { AppSyncResolverEvent } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { PROPOSAL_TABLE_NAME } from "../../constants/aws";
import { Proposal } from "../../entities/proposal";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

interface GetRecentProposalsArgs {
  limit?: number;
}

export const handler = async (
  event: AppSyncResolverEvent<GetRecentProposalsArgs>
): Promise<Proposal[]> => {
  console.log("Event:", JSON.stringify(event, null, 2));

  try {
    const { limit = 3 } = event.arguments;

    const command = new ScanCommand({
      TableName: PROPOSAL_TABLE_NAME,
      Limit: limit,
    });

    const result = await docClient.send(command);

    // createdAtで降順ソート（最新順）
    const proposals = (result.Items || []).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return proposals.slice(0, limit) as Proposal[];
  } catch (error) {
    console.error("Error fetching recent proposals:", error);
    throw new Error("Could not fetch recent proposals");
  }
};
