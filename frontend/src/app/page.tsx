"use client";

import { useGetDashboardStatsQuery } from "@/generated/gql";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Proposal {
  id: string;
  customerId: string;
  customerName: string;
  templateType: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const { data, loading, error } = useGetDashboardStatsQuery();

  const [recentProposals, setRecentProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    // ローカルストレージからデータを取得
    const proposals = JSON.parse(localStorage.getItem("proposals") || "[]");

    // 最新3件の提案を取得
    const sortedProposals = proposals
      .sort(
        (a: Proposal, b: Proposal) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);
    setRecentProposals(sortedProposals);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getTemplateLabel = (type: string) => {
    switch (type) {
      case "challenge":
        return "課題解決型";
      case "roi":
        return "ROI重視型";
      case "case-study":
        return "導入事例重点型";
      default:
        return type;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-64 bg-stone-100 p-6 border-l border-stone-200">
        <div className="space-y-3">
          <Link
            href="/customers/new"
            className="block w-full text-center bg-white text-stone-900 px-4 py-3 rounded-md border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            顧客を登録
          </Link>
          <Link
            href="/customers"
            className="block w-full text-center bg-white text-stone-900 px-4 py-3 rounded-md border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            顧客一覧を見る
          </Link>
          <Link
            href="/proposals"
            className="block w-full text-center bg-white text-stone-900 px-4 py-3 rounded-md border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            提案履歴を確認
          </Link>
        </div>
      </div>
      {/* メインエリア */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* キャッチコピーエリア */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-stone-900 mb-4">
              最短30秒で提案文を作成
            </h1>
            <p className="text-xl text-stone-600 mb-8">
              営業担当者の提案文作成を劇的に効率化
            </p>
            <Link
              href="/proposals/new"
              className="inline-block bg-stone-900 text-white text-xl px-12 py-6 rounded-lg hover:bg-stone-800 transition-colors shadow-lg"
            >
              新しい提案文を作成
            </Link>
          </div>

          {/* 統計表示 */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg border border-stone-200">
              <h3 className="text-sm font-medium text-stone-600 mb-2">
                登録顧客数
              </h3>
              <p className="text-3xl font-bold text-stone-900">
                {data?.getDashboardStats.totalCustomers}
                <span className="text-sm font-normal text-stone-600 ml-2">
                  社
                </span>
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-stone-200">
              <h3 className="text-sm font-medium text-stone-600 mb-2">
                作成済み提案文数
              </h3>
              <p className="text-3xl font-bold text-stone-900">
                {data?.getDashboardStats.totalProposals}
                <span className="text-sm font-normal text-stone-600 ml-2">
                  件
                </span>
              </p>
            </div>
          </div>

          {/* 最近の提案履歴 */}
          <div>
            <h2 className="text-2xl font-bold text-stone-900 mb-6">
              最近の提案履歴
            </h2>
            {recentProposals.length > 0 ? (
              <div className="space-y-4">
                {recentProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="bg-white p-6 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-stone-900">
                          {proposal.customerName}
                        </h3>
                        <p className="text-sm text-stone-600">
                          {getTemplateLabel(proposal.templateType)} •{" "}
                          {formatDate(proposal.createdAt)}
                        </p>
                      </div>
                      <Link
                        href={`/proposals/${proposal.id}`}
                        className="text-stone-600 hover:text-stone-900 text-sm"
                      >
                        詳細を見る →
                      </Link>
                    </div>
                    <p className="text-stone-700 line-clamp-2">
                      {proposal.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-stone-100 p-8 rounded-lg text-center">
                <p className="text-stone-600">まだ提案文が作成されていません</p>
                <Link
                  href="/proposals/new"
                  className="inline-block mt-4 text-stone-900 hover:underline"
                >
                  最初の提案文を作成する →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
