"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  challenges: string[];
  notes: string;
  createdAt: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // ローカルストレージから顧客データを取得
    const storedCustomers = JSON.parse(
      localStorage.getItem("customers") || "[]"
    );
    setCustomers(storedCustomers);
    setFilteredCustomers(storedCustomers);
  }, []);

  useEffect(() => {
    // 検索・フィルタリング
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.companyName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          customer.contactName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (industryFilter) {
      filtered = filtered.filter(
        (customer) => customer.industry === industryFilter
      );
    }

    setFilteredCustomers(filtered);
    setCurrentPage(1);
  }, [searchTerm, industryFilter, customers]);

  const getProposalCount = (customerId: string) => {
    const proposals = JSON.parse(localStorage.getItem("proposals") || "[]");
    return proposals.filter((p: any) => p.customerId === customerId).length;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getIndustryLabel = (industry: string) => {
    const industryMap: { [key: string]: string } = {
      it: "IT",
      manufacturing: "製造業",
      retail: "小売業",
      finance: "金融業",
      other: "その他",
    };
    return industryMap[industry] || industry;
  };

  // ページネーション計算
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-stone-900">顧客一覧</h1>
        <Link
          href="/customers/new"
          className="bg-stone-900 text-white px-6 py-3 rounded-md hover:bg-stone-800 transition-colors"
        >
          新規作成
        </Link>
      </div>

      {/* 検索・フィルター */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="会社名または担当者名で検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
        />
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          <option value="">業界を選択</option>
          <option value="it">IT</option>
          <option value="manufacturing">製造業</option>
          <option value="retail">小売業</option>
          <option value="finance">金融業</option>
          <option value="other">その他</option>
        </select>
      </div>

      {/* 顧客テーブル */}
      {currentCustomers.length > 0 ? (
        <>
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-stone-600">
                    会社名
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-stone-600">
                    担当者
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-stone-600">
                    業界
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-stone-600">
                    登録日
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-stone-600">
                    提案数
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-stone-600">
                    アクション
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.map((customer) => (
                  <tr key={customer.id} className="border-t border-stone-200">
                    <td className="px-6 py-4 text-stone-900 font-medium">
                      {customer.companyName}
                    </td>
                    <td className="px-6 py-4 text-stone-700">
                      {customer.contactName}
                    </td>
                    <td className="px-6 py-4 text-stone-700">
                      {getIndustryLabel(customer.industry)}
                    </td>
                    <td className="px-6 py-4 text-stone-700">
                      {formatDate(customer.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-stone-700">
                      {getProposalCount(customer.id)}件
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/customers/${customer.id}`}
                          className="text-stone-600 hover:text-stone-900 text-sm"
                        >
                          詳細
                        </Link>
                        <span className="text-stone-300">|</span>
                        <Link
                          href={`/proposals/new?customer=${customer.id}`}
                          className="text-stone-600 hover:text-stone-900 text-sm"
                        >
                          提案作成
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-stone-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50"
              >
                前へ
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
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
            {searchTerm || industryFilter
              ? "検索条件に一致する顧客が見つかりません"
              : "まだ顧客が登録されていません"}
          </p>
          {!searchTerm && !industryFilter && (
            <Link
              href="/customers/new"
              className="inline-block text-stone-900 hover:underline"
            >
              最初の顧客を登録しましょう
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
