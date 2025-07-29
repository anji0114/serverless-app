"use client";

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

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);
  const [customerFilter, setCustomerFilter] = useState("");
  const [templateFilter, setTemplateFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // ローカルストレージから提案データを取得
    const storedProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
    setProposals(storedProposals);
    setFilteredProposals(storedProposals);
  }, []);

  useEffect(() => {
    // フィルタリング処理
    let filtered = proposals;

    if (customerFilter) {
      filtered = filtered.filter((proposal) =>
        proposal.customerName.toLowerCase().includes(customerFilter.toLowerCase())
      );
    }

    if (templateFilter) {
      filtered = filtered.filter((proposal) => proposal.templateType === templateFilter);
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter((proposal) => {
        const proposalDate = new Date(proposal.createdAt);
        return (
          proposalDate.getFullYear() === filterDate.getFullYear() &&
          proposalDate.getMonth() === filterDate.getMonth() &&
          proposalDate.getDate() === filterDate.getDate()
        );
      });
    }

    // 作成日順でソート（新しい順）
    filtered = filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredProposals(filtered);
    setCurrentPage(1);
  }, [customerFilter, templateFilter, dateFilter, proposals]);

  const handleDelete = (proposalId: string) => {
    if (confirm("この提案文を削除しますか？")) {
      const updatedProposals = proposals.filter((p) => p.id !== proposalId);
      setProposals(updatedProposals);
      localStorage.setItem("proposals", JSON.stringify(updatedProposals));
    }
  };

  const handleDuplicate = (proposal: Proposal) => {
    const duplicatedProposal = {
      ...proposal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedProposals = [...proposals, duplicatedProposal];
    setProposals(updatedProposals);
    localStorage.setItem("proposals", JSON.stringify(updatedProposals));
  };

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

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  // ページネーション計算
  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProposals = filteredProposals.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-stone-900">提案履歴</h1>
        <Link
          href="/proposals/new"
          className="bg-stone-900 text-white px-6 py-3 rounded-md hover:bg-stone-800 transition-colors"
        >
          新しい提案文を作成
        </Link>
      </div>

      {/* フィルタエリア */}
      <div className="bg-white rounded-lg border border-stone-200 p-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              顧客名で絞り込み
            </label>
            <input
              type="text"
              placeholder="顧客名を入力"
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              テンプレート種別
            </label>
            <select
              value={templateFilter}
              onChange={(e) => setTemplateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            >
              <option value="">すべて</option>
              <option value="challenge">課題解決型</option>
              <option value="roi">ROI重視型</option>
              <option value="case-study">導入事例重点型</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              作成日
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>
        </div>
      </div>

      {/* 提案一覧 */}
      {currentProposals.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="bg-white rounded-lg border border-stone-200 p-6 hover:border-stone-300 transition-colors"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-stone-900 mb-2">
                    {proposal.customerName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-stone-600 mb-3">
                    <span className="bg-stone-100 px-2 py-1 rounded text-xs">
                      {getTemplateLabel(proposal.templateType)}
                    </span>
                    <span>{formatDate(proposal.createdAt)}</span>
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed">
                    {truncateContent(proposal.content)}
                  </p>
                </div>

                <div className="flex gap-2 text-sm">
                  <Link
                    href={`/proposals/${proposal.id}`}
                    className="text-stone-600 hover:text-stone-900"
                  >
                    編集
                  </Link>
                  <span className="text-stone-300">|</span>
                  <button
                    onClick={() => handleDuplicate(proposal)}
                    className="text-stone-600 hover:text-stone-900"
                  >
                    複製
                  </button>
                  <span className="text-stone-300">|</span>
                  <button
                    onClick={() => handleDelete(proposal.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-stone-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50"
              >
                前へ
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-stone-900 text-white"
                      : "border border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-stone-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50"
              >
                次へ
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-stone-100 p-12 rounded-lg text-center">
          <p className="text-stone-600 mb-4">
            {customerFilter || templateFilter || dateFilter
              ? "条件に一致する提案文が見つかりません"
              : "まだ提案文が作成されていません"}
          </p>
          {!customerFilter && !templateFilter && !dateFilter && (
            <Link
              href="/proposals/new"
              className="inline-block text-stone-900 hover:underline"
            >
              最初の提案文を作成する →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}