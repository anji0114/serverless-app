"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { CompanySize, Industry } from "@/generated/gql";

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
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      challenges: [],
      notes: "",
      email: "",
      phone: "",
      companyName: "",
      contactPerson: "",
    },
  });

  const [createCustomer] = useMutation(CREATE_CUSTOMER_MUTATION, {
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: CreateCustomerFormData) => {
    console.log(data);
  };

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
            <Input {...register("companyName")} />
          </div>

          {/* 担当者名 */}
          <div>
            <label
              htmlFor="contactPerson"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              担当者名 <span className="text-red-500">*</span>
            </label>
            <Input {...register("contactPerson")} />
          </div>

          {/* メールアドレス */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              メールアドレス
            </label>
            <Input {...register("email")} />
          </div>

          {/* 電話番号 */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              電話番号
            </label>
            <Input {...register("phone")} />
          </div>

          {/* 業界 */}
          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              業界
            </label>
            <Controller
              control={control}
              name="industry"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_OPTIONS.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* 会社規模 */}
          <div>
            <label
              htmlFor="companySize"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              会社規模
            </label>
            <Controller
              control={control}
              name="companySize"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SIZE_OPTIONS.map((companySize) => (
                      <SelectItem
                        key={companySize.value}
                        value={companySize.value}
                      >
                        {companySize.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* 課題 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              課題
            </label>
            <Controller
              control={control}
              name="challenges"
              render={({ field }) => (
                <div className="space-y-2">
                  {CHALLENGE_OPTIONS.map((challenge) => (
                    <label
                      key={challenge.value}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        checked={field.value.includes(challenge.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, challenge.value]);
                          } else {
                            field.onChange(
                              field.value.filter((v) => v !== challenge.value)
                            );
                          }
                        }}
                      />
                      <span className="text-stone-700">{challenge.label}</span>
                    </label>
                  ))}
                </div>
              )}
            />
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
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="w-full"
            disabled={!isValid}
          >
            登録
          </Button>
        </div>
      </form>
    </div>
  );
}
