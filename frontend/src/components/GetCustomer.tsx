import { useGetDashboardStatsQuery } from "@/generated/gql";
import { FC } from "react";

type Props = {
  id: string;
};

export const GetCustomer: FC<Props> = ({ id }) => {
  const { data, loading, error } = useGetDashboardStatsQuery();

  if (loading) return <div>Loading...</div>;

  if (!data) return null;

  return (
    <div className="flex gap-2">
      <div className="font-bold">
        Total Customers: {data.getDashboardStats.totalCustomers}
      </div>
      <div>Total Proposals: {data.getDashboardStats.totalProposals}</div>
      <div>This Week: {data.getDashboardStats.proposalsThisWeek}</div>
    </div>
  );
};
