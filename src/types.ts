export interface IncomeStatement {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

export interface FilterCriteria {
  startYear: number;
  endYear: number;
  minRevenue: number;
  maxRevenue: number;
  minNetIncome: number;
  maxNetIncome: number;
}

export interface SortConfig {
  key: keyof Pick<IncomeStatement, 'date' | 'revenue' | 'netIncome'>;
  direction: 'asc' | 'desc';
}