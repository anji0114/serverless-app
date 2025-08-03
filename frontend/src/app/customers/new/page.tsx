"use client";

import {
  Challenge,
  CompanySize,
  CreateCustomerInput,
  Industry,
} from "@/generated/gql";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CHALLENGES = [
  {
    label: "コスト削減",
    value: Challenge.ReduceCosts,
  },
  {
    label: "業務効率化",
    value: Challenge.ImproveCustomerService,
  },
  {
    label: "技術革新",
    value: Challenge.IncreaseSales,
  },
  {
    label: "その他",
    value: Challenge.Other,
  },
];

const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      id
    }
  }
`;

export default function NewCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateCustomerInput>({
    companyName: "Google",
    contactPerson: "John Doe",
    email: "john.doe@google.com",
    phone: "1234567890",
    industry: Industry.It,
    companySize: CompanySize.Enterprise,
    challenges: [Challenge.ImproveCustomerService],
    notes: "Googleはコスト削減を目指しています。",
  });

  const [createCustomer] = useMutation(CREATE_CUSTOMER_MUTATION, {
    onCompleted: () => {
      router.push("/customers");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (challenge: Challenge) => {
    setFormData({
      ...formData,
      challenges: formData.challenges.includes(challenge)
        ? formData.challenges.filter((c) => c !== challenge)
        : [...formData.challenges, challenge],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    if (!formData.companyName || !formData.contactPerson) {
      alert("会社名と担当者名は必須です");
      return;
    }

    // 新しい顧客データを作成
    createCustomer({ variables: { input: formData } });

    // 顧客一覧ページに遷移
    router.push("/dashboard");
  };

  const handleCancel = () => {
    router.push("/customers");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">新規顧客登録</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-stone-200 p-8"
      >
        <div className="space-y-6">
          {/* 会社名 */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              会社名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              required
            />
          </div>

          {/* 担当者名 */}
          <div>
            <label
              htmlFor="contactName"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              担当者名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactPerson}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              required
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email ?? ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>

          {/* 電話番号 */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone ?? ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>

          {/* 業界 */}
          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              業界
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            >
              <option value="">選択してください</option>
              <option value={Industry.It}>IT</option>
              <option value={Industry.Manufacturing}>製造業</option>
              <option value={Industry.Retail}>小売業</option>
              <option value={Industry.Finance}>金融業</option>
              <option value={Industry.Other}>その他</option>
            </select>
          </div>

          {/* 会社規模 */}
          <div>
            <label
              htmlFor="companySize"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              会社規模
            </label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            >
              <option value="">選択してください</option>
              <option value={CompanySize.Personal}>1人</option>
              <option value={CompanySize.ExtraSmall}>1-10名</option>
              <option value={CompanySize.Small}>11-30名</option>
              <option value={CompanySize.Medium}>31-100名</option>
              <option value={CompanySize.Large}>101-500名</option>
              <option value={CompanySize.Enterprise}>501名以上</option>
            </select>
          </div>

          {/* 課題 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              課題
            </label>
            <div className="space-y-2">
              {CHALLENGES.map((challenge) => (
                <label key={challenge.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.challenges.includes(challenge.value)}
                    onChange={() => handleCheckboxChange(challenge.value)}
                    className="mr-2 h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded"
                  />
                  <span className="text-stone-700">{challenge.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 備考 */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              備考
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes ?? ""}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
          </div>
        </div>

        {/* ボタン */}
        <div className="mt-8 flex gap-4 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-stone-300 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
