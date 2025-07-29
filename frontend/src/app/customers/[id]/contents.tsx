"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

interface Proposal {
  id: string;
  customerId: string;
  customerName: string;
  templateType: string;
  content: string;
  createdAt: string;
}

export const CustomerDetailContents = () => {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Customer | null>(null);

  useEffect(() => {
    // 顧客データを取得
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const foundCustomer = customers.find((c: Customer) => c.id === params.id);
    
    if (foundCustomer) {
      setCustomer(foundCustomer);
      setEditForm(foundCustomer);
      
      // この顧客の提案履歴を取得
      const allProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
      const customerProposals = allProposals.filter(
        (p: Proposal) => p.customerId === params.id
      );
      setProposals(customerProposals);
    } else {
      // 顧客が見つからない場合は一覧にリダイレクト
      router.push("/customers");
    }
  }, [params.id, router]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && customer) {
      setEditForm(customer);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleCheckboxChange = (challenge: string) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      challenges: editForm.challenges.includes(challenge)
        ? editForm.challenges.filter((c) => c !== challenge)
        : [...editForm.challenges, challenge],
    });
  };

  const handleSave = () => {
    if (!editForm) return;

    // ローカルストレージを更新
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const updatedCustomers = customers.map((c: Customer) =>
      c.id === editForm.id ? editForm : c
    );
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));

    setCustomer(editForm);
    setIsEditing(false);
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
      finance: "金融",
      other: "その他",
    };
    return industryMap[industry] || industry;
  };

  const getCompanySizeLabel = (size: string) => {
    const sizeMap: { [key: string]: string } = {
      small: "〜50名",
      medium: "51〜200名",
      large: "201名〜",
    };
    return sizeMap[size] || size;
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

  if (!customer) {
    return <div className="p-8 text-center">読み込み中...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-900">顧客詳細</h1>
        <Link
          href="/customers"
          className="text-stone-600 hover:text-stone-900"
        >
          ← 顧客一覧に戻る
        </Link>
      </div>

      {/* 顧客情報カード */}
      <div className="bg-white rounded-lg border border-stone-200 p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-medium text-stone-900">
            {isEditing ? (
              <input
                type="text"
                name="companyName"
                value={editForm?.companyName || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border border-stone-300 rounded-md"
              />
            ) : (
              customer.companyName
            )}
          </h2>
          <button
            onClick={handleEditToggle}
            className="text-stone-600 hover:text-stone-900"
          >
            {isEditing ? "キャンセル" : "編集"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              担当者名
            </label>
            {isEditing ? (
              <input
                type="text"
                name="contactName"
                value={editForm?.contactName || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border border-stone-300 rounded-md"
              />
            ) : (
              <p className="text-stone-900">{customer.contactName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              メールアドレス
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editForm?.email || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border border-stone-300 rounded-md"
              />
            ) : (
              <p className="text-stone-900">{customer.email || "-"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              電話番号
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editForm?.phone || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border border-stone-300 rounded-md"
              />
            ) : (
              <p className="text-stone-900">{customer.phone || "-"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              業種
            </label>
            {isEditing ? (
              <select
                name="industry"
                value={editForm?.industry || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border border-stone-300 rounded-md"
              >
                <option value="">選択してください</option>
                <option value="it">IT</option>
                <option value="manufacturing">製造業</option>
                <option value="retail">小売業</option>
                <option value="finance">金融</option>
                <option value="other">その他</option>
              </select>
            ) : (
              <p className="text-stone-900">
                {getIndustryLabel(customer.industry) || "-"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              会社規模
            </label>
            {isEditing ? (
              <select
                name="companySize"
                value={editForm?.companySize || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border border-stone-300 rounded-md"
              >
                <option value="">選択してください</option>
                <option value="small">〜50名</option>
                <option value="medium">51〜200名</option>
                <option value="large">201名〜</option>
              </select>
            ) : (
              <p className="text-stone-900">
                {getCompanySizeLabel(customer.companySize) || "-"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              登録日
            </label>
            <p className="text-stone-900">{formatDate(customer.createdAt)}</p>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-stone-600 mb-1">
              主な課題
            </label>
            {isEditing ? (
              <div className="space-y-2">
                {["売上向上", "コスト削減", "業務効率化", "その他"].map((challenge) => (
                  <label key={challenge} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editForm?.challenges.includes(challenge) || false}
                      onChange={() => handleCheckboxChange(challenge)}
                      className="mr-2 h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded"
                    />
                    <span className="text-stone-700">{challenge}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-stone-900">
                {customer.challenges.length > 0
                  ? customer.challenges.join("、")
                  : "-"}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-stone-600 mb-1">
              備考
            </label>
            {isEditing ? (
              <textarea
                name="notes"
                value={editForm?.notes || ""}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-1 border border-stone-300 rounded-md"
              />
            ) : (
              <p className="text-stone-900">{customer.notes || "-"}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-stone-900 text-white px-6 py-2 rounded-md hover:bg-stone-800 transition-colors"
            >
              保存
            </button>
          </div>
        )}
      </div>

      {/* アクションボタン */}
      <div className="mb-8">
        <Link
          href={`/proposals/new?customer=${customer.id}`}
          className="inline-block bg-stone-900 text-white px-6 py-3 rounded-md hover:bg-stone-800 transition-colors"
        >
          この顧客向け提案文作成
        </Link>
      </div>

      {/* 提案履歴 */}
      <div>
        <h3 className="text-xl font-medium text-stone-900 mb-4">提案履歴</h3>
        {proposals.length > 0 ? (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="bg-white p-6 rounded-lg border border-stone-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm text-stone-600">
                      {getTemplateLabel(proposal.templateType)} • {formatDate(proposal.createdAt)}
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
            <p className="text-stone-600">この顧客の提案文はまだありません</p>
          </div>
        )}
      </div>
    </div>
  );
}