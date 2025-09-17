export interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: Industry;
  companySize: CompanySize;
  challenges: Challenge[];
  notes: string;
}

export enum Industry {
  IT = "IT",
  MANUFACTURING = "MANUFACTURING",
  RETAIL = "RETAIL",
  FINANCE = "FINANCE",
  HEALTHCARE = "HEALTHCARE",
  EDUCATION = "EDUCATION",
  OTHER = "OTHER",
}

export enum CompanySize {
  PERSONAL = "PERSONAL",
  EXTRA_SMALL = "EXTRA_SMALL",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  ENTERPRISE = "ENTERPRISE",
}

export enum Challenge {
  INCREASE_SALES = "INCREASE_SALES",
  IMPROVE_CUSTOMER_SERVICE = "IMPROVE_CUSTOMER_SERVICE",
  REDUCE_COSTS = "REDUCE_COSTS",
  OTHER = "OTHER",
}
