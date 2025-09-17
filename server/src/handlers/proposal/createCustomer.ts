import { AppSyncResolverEvent, Context } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
  Challenge,
  CompanySize,
  Customer,
  Industry,
} from "../../entities/customer";
import { AWS_REGION, CUSTOMER_TABLE_NAME } from "../../constants/aws";
import { randomUUID } from "crypto";

const dynamoClient = new DynamoDBClient({
  region: AWS_REGION,
});

interface CreateCustomerInput {
  companyName: string;
  contactPerson: string;
  email?: string;
  phone?: string;
  industry: Industry;
  companySize: CompanySize;
  challenges: Challenge[];
  notes?: string;
}

export const handler = async (
  event: AppSyncResolverEvent<{ input: CreateCustomerInput }, {}>,
  _context: Context
): Promise<Customer> => {
  console.log("Event:", JSON.stringify(event, null, 2));

  try {
    const { input } = event.arguments;
    const now = new Date().toISOString();
    const customerId = randomUUID();

    const customer: Customer = {
      id: customerId,
      companyName: input.companyName,
      contactPerson: input.contactPerson,
      email: input.email || "",
      phone: input.phone || "",
      industry: input.industry,
      companySize: input.companySize,
      challenges: input.challenges,
      notes: input.notes || "",
    };

    const putCommand = new PutItemCommand({
      TableName: CUSTOMER_TABLE_NAME,
      Item: {
        id: { S: customer.id },
        companyName: { S: customer.companyName },
        contactPerson: { S: customer.contactPerson },
        email: { S: customer.email },
        phone: { S: customer.phone },
        industry: { S: customer.industry },
        companySize: { S: customer.companySize },
        challenges: { SS: customer.challenges },
        notes: { S: customer.notes },
        createdAt: { S: now },
        updatedAt: { S: now },
      },
    });

    await dynamoClient.send(putCommand);

    return {
      ...customer,
      createdAt: now,
      updatedAt: now,
    } as Customer;
  } catch (error) {
    console.error("Error in createCustomer handler:", error);
    throw error;
  }
};
