import { Challenge, CompanySize, Industry } from "@/gql/graphql";
import z from "zod";

const enumValues = <T extends string>(obj: Record<string, T>) =>
  Object.values(obj) as [T, ...T[]];

export const createCustomerSchema = z.object({
  companyName: z.string().min(1),
  contactPerson: z.string().min(1),
  email: z.email(),
  phone: z.string().min(1),
  industry: z.enum(enumValues(Industry)),
  companySize: z.enum(enumValues(CompanySize)),
  challenges: z.array(z.enum(enumValues(Challenge))),
  notes: z.string().min(1),
});

export type CreateCustomerFormData = z.infer<typeof createCustomerSchema>;

export const CHALLENGE_OPTIONS = [
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

export const INDUSTRY_OPTIONS = [
  { label: "IT", value: Industry.It },
  { label: "製造業", value: Industry.Manufacturing },
  { label: "小売業", value: Industry.Retail },
  { label: "金融業", value: Industry.Finance },
  { label: "その他", value: Industry.Other },
];

export const COMPANY_SIZE_OPTIONS = [
  { label: "1人", value: CompanySize.Personal },
  { label: "1-10名", value: CompanySize.ExtraSmall },
  { label: "11-30名", value: CompanySize.Small },
  { label: "31-100名", value: CompanySize.Medium },
  { label: "101-500名", value: CompanySize.Large },
  { label: "501名以上", value: CompanySize.Enterprise },
];
