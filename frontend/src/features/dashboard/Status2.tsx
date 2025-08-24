import { FragmentType, graphql, useFragment } from "@/gql";
import { DashboardStatusFragment2Fragment } from "@/gql/graphql";

// フラグメントをコンポーネント内で定義（コロケーション）
const fragment = graphql(`
  fragment DashboardStatusFragment2 on DashboardStats {
    proposalsThisWeek
  }
`);

type Props = {
  stats: FragmentType<typeof fragment>;
};

export const DashboardStatus2 = ({ stats }: Props) => {
  const { proposalsThisWeek } = useFragment(fragment, stats);
  return (
    <div className="grid grid-cols-2 gap-6 mb-12">
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <h3
          className="text-sm font-medium text-stone-600 
  mb-2"
        >
          登録顧客数
        </h3>
        <p className="text-3xl font-bold text-stone-900">
          {proposalsThisWeek}
          <span
            className="text-sm font-normal text-stone-600 
  ml-2"
          >
            社
          </span>
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg border border-stone-200">
        <h3 className="text-sm font-medium text-stone-600 mb-2">
          作成済み提案文数
        </h3>
        <p className="text-3xl font-bold text-stone-900">
          <span
            className="text-sm font-normal text-stone-600 
  ml-2"
          >
            件
          </span>
        </p>
      </div>
    </div>
  );
};
