"use client";

import { useRouter, useSearchParams } from "next/navigation";
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

interface ProposalForm {
  customerId: string;
  templateType: string;
  content: string;
}

export default function NewProposalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [formData, setFormData] = useState<ProposalForm>({
    customerId: "",
    templateType: "challenge",
    content: "",
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // 顧客データを取得
    const storedCustomers = JSON.parse(
      localStorage.getItem("customers") || "[]"
    );
    setCustomers(storedCustomers);

    // URLパラメータから顧客IDを取得
    const customerId = searchParams.get("customer");
    if (customerId) {
      const customer = storedCustomers.find(
        (c: Customer) => c.id === customerId
      );
      if (customer) {
        setSelectedCustomer(customer);
        setFormData({ ...formData, customerId });
      }
    }
  }, [searchParams]);

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    setSelectedCustomer(customer || null);
    setFormData({ ...formData, customerId });
  };

  const handleTemplateChange = (templateType: string) => {
    setFormData({ ...formData, templateType });
  };

  const generateProposal = () => {
    if (!selectedCustomer) {
      alert("顧客を選択してください");
      return;
    }

    let content = "";
    const companyName = selectedCustomer.companyName;
    const challenges = selectedCustomer.challenges.join("、");

    switch (formData.templateType) {
      case "challenge":
        content = `${companyName}様

課題解決型提案書

${challenges}の課題について、当社のソリューションをご提案いたします。

課題の現状
${challenges}により、業務効率の低下やコスト増大が発生していると推測されます。

解決策の提案
${challenges}に対応するため、以下の施策を実施いたします：

1. 現状分析と課題の特定
2. 最適なソリューションの選定
3. 段階的な導入計画の策定

期待される効果
- 業務効率の向上
- コスト削減の実現
- 顧客満足度の向上

詳細な提案書をご確認いただけますと幸いです。

ご不明な点がございましたら、お気軽にお問い合わせください。

よろしくお願いいたします。`;
        break;

      case "roi":
        content = `${companyName}様

投資対効果（ROI）提案書

当社のソリューションによる投資対効果をご説明いたします。

投資額の内訳
初期投資額：500万円
運用コスト：1,200万円/年
保守費用：5万円/月

期待される効果
1. 業務効率化による節約：600万円/年
   - 作業時間の50%短縮
   - 3ヶ月での投資回収

2. コスト削減による節約：400万円/年
   - 人件費の削減
   - 無駄な支出の削減

3. 売上向上による効果：200万円/年
   - 顧客満足度の向上
   - 新規顧客の獲得

投資回収期間：約1年で投資回収が可能です

詳細な計算書をご確認いただけますと幸いです。

よろしくお願いいたします。`;
        break;

      case "case-study":
        content = `${companyName}様

成功事例紹介

同業他社での導入事例をご紹介いたします。

業界：${
          selectedCustomer.industry === "it"
            ? "IT業界"
            : selectedCustomer.industry === "manufacturing"
            ? "製造業"
            : "小売業"
        }
課題：${challenges}
導入効果：
- 業務効率40%向上

- コスト削減30%実現
- 顧客満足度20%向上

導入事例の詳細
1. 導入前の課題分析：21日
2. システム設計：11日
3. 段階的導入：31日
4. 効果測定と改善

導入後の効果
同業他社での導入により、業務効率の大幅な向上とコスト削減を実現いたしました。

貴社でも同様の効果が期待できます。

詳細な事例資料をご確認いただけますと幸いです。

よろしくお願いいたします。`;
        break;
    }

    setGeneratedContent(content);
    setFormData({ ...formData, content });
    setIsEditing(true);
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleSave = () => {
    if (!selectedCustomer || !formData.content) {
      alert("顧客と提案内容を入力してください");
      return;
    }

    // 新しい提案書データを作成
    const newProposal = {
      id: Date.now().toString(),
      customerId: formData.customerId,
      customerName: selectedCustomer.companyName,
      templateType: formData.templateType,
      content: formData.content,
      createdAt: new Date().toISOString(),
    };

    // ローカルストレージに保存
    const proposals = JSON.parse(localStorage.getItem("proposals") || "[]");
    proposals.push(newProposal);
    localStorage.setItem("proposals", JSON.stringify(proposals));

    // 提案書一覧ページに遷移
    router.push("/proposals");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formData.content);
    alert("クリップボードにコピーしました");
  };

  const handlePrint = () => {
    window.print();
  };

  const getCompanySizeLabel = (size: string) => {
    const sizeMap: { [key: string]: string } = {
      small: "50名以下",
      medium: "51-200名",
      large: "201名以上",
    };
    return sizeMap[size] || size;
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

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">提案書作成</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* 左側 - 設定 */}
        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <h2 className="text-xl font-medium text-stone-900 mb-6">提案設定</h2>

          {/* 顧客選択 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              顧客選択
            </label>
            <select
              value={formData.customerId}
              onChange={(e) => handleCustomerChange(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            >
              <option value="">顧客を選択してください</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.companyName}
                </option>
              ))}
            </select>
          </div>

          {/* 顧客情報 */}
          {selectedCustomer && (
            <div className="mb-6 p-4 bg-stone-50 rounded-md">
              <h3 className="text-sm font-medium text-stone-700 mb-2">
                顧客情報
              </h3>
              <dl className="space-y-1 text-sm">
                <div className="flex">
                  <dt className="text-stone-600 w-20">担当者:</dt>
                  <dd className="text-stone-900">
                    {selectedCustomer.contactName}
                  </dd>
                </div>
                <div className="flex">
                  <dt className="text-stone-600 w-20">業界:</dt>
                  <dd className="text-stone-900">
                    {getIndustryLabel(selectedCustomer.industry)}
                  </dd>
                </div>
                <div className="flex">
                  <dt className="text-stone-600 w-20">規模:</dt>
                  <dd className="text-stone-900">
                    {getCompanySizeLabel(selectedCustomer.companySize)}
                  </dd>
                </div>
                <div className="flex">
                  <dt className="text-stone-600 w-20">課題:</dt>
                  <dd className="text-stone-900">
                    {selectedCustomer.challenges.join("、")}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {/* 提案書テンプレート */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              提案書テンプレート
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-stone-200 rounded-md cursor-pointer hover:bg-stone-50">
                <input
                  type="radio"
                  name="template"
                  value="challenge"
                  checked={formData.templateType === "challenge"}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-stone-900">課題解決型</div>
                  <div className="text-sm text-stone-600">
                    顧客の課題に焦点を当てた提案書
                  </div>
                </div>
              </label>
              <label className="flex items-center p-3 border border-stone-200 rounded-md cursor-pointer hover:bg-stone-50">
                <input
                  type="radio"
                  name="template"
                  value="roi"
                  checked={formData.templateType === "roi"}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-stone-900">ROI重視型</div>
                  <div className="text-sm text-stone-600">
                    投資対効果を重視した提案書
                  </div>
                </div>
              </label>
              <label className="flex items-center p-3 border border-stone-200 rounded-md cursor-pointer hover:bg-stone-50">
                <input
                  type="radio"
                  name="template"
                  value="case-study"
                  checked={formData.templateType === "case-study"}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-stone-900">事例紹介型</div>
                  <div className="text-sm text-stone-600">
                    成功事例を中心とした提案書
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* 生成ボタン */}
          <button
            onClick={generateProposal}
            className="w-full bg-stone-900 text-white py-3 rounded-md hover:bg-stone-800 transition-colors"
          >
            提案書生成
          </button>
        </div>

        {/* 右側 - 提案書内容 */}
        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-stone-900">提案書内容</h2>
            <div className="text-sm text-stone-600">
              {formData.content.length}文字
            </div>
          </div>

          {isEditing ? (
            <textarea
              value={formData.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full h-96 p-4 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 resize-none"
              placeholder="提案書の内容を編集してください"
            />
          ) : (
            <div className="h-96 p-4 bg-stone-50 rounded-md overflow-y-auto">
              {generatedContent ? (
                <pre className="whitespace-pre-wrap font-sans text-stone-700">
                  {generatedContent}
                </pre>
              ) : (
                <p className="text-stone-400 text-center mt-32">
                  左側の設定を完了してから
                  <br />
                  提案書生成ボタンを押してください
                </p>
              )}
            </div>
          )}

          {/* アクションボタン */}
          {formData.content && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-stone-900 text-white py-2 rounded-md hover:bg-stone-800 transition-colors"
              >
                保存
              </button>
              <button
                onClick={handleCopy}
                className="flex-1 border border-stone-300 text-stone-700 py-2 rounded-md hover:bg-stone-50 transition-colors"
              >
                コピー
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 border border-stone-300 text-stone-700 py-2 rounded-md hover:bg-stone-50 transition-colors"
              >
                印刷
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
