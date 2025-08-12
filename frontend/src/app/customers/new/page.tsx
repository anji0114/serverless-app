"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CHALLENGE_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  CreateCustomerFormData,
  createCustomerSchema,
  INDUSTRY_OPTIONS,
} from "@/features/customer/constants/schema";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      id
    }
  }
`;

export default function NewCustomerPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),
  });

  const [createCustomer] = useMutation(CREATE_CUSTOMER_MUTATION, {
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">新規顧客登録</h1>

      <form className="bg-white rounded-lg border border-stone-200 p-8">
        <div className="space-y-6">
          {/* 会社名 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              会社名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("companyName")}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              required
            />
          </div>

          {/* 担当者名 */}
          <div>
            <label
              htmlFor="contactPerson"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              担当者名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("contactPerson")}
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
              {...register("email")}
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
              {...register("phone")}
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
              {...register("industry")}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            >
              <option value="">選択してください</option>
              {INDUSTRY_OPTIONS.map((industry) => (
                <option key={industry.value} value={industry.value}>
                  {industry.label}
                </option>
              ))}
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
            <Select {...register("companySize")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_SIZE_OPTIONS.map((companySize) => (
                  <SelectItem key={companySize.value} value={companySize.value}>
                    {companySize.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 課題 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              課題
            </label>
            <div className="space-y-2">
              {CHALLENGE_OPTIONS.map((challenge) => (
                <label key={challenge.value} className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("challenges")}
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
            <Textarea {...register("notes")} rows={4} className="w-full" />
          </div>
        </div>

        {/* ボタン */}
        <div className="mt-8">
          <Button type="submit" disabled={!isValid} className="w-full">
            登録
          </Button>
        </div>
      </form>
    </div>
  );
}
