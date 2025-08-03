import { AppSyncResolverEvent, Context } from "aws-lambda";
import { getDashboardStats } from "../../services/dashboardService";
import { DashboardStats } from "../../entities/dashboard";

export const handler = async (
  event: AppSyncResolverEvent<{}, {}>,
  _context: Context
): Promise<DashboardStats> => {
  console.log("Event:", JSON.stringify(event, null, 2));
  try {
    const stats = await getDashboardStats();
    return stats;
  } catch (error) {
    console.error("Error in getDashboardStats handler:", error);
    throw error;
  }
};
