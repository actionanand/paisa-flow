export interface Expense {
  category: string;
  date: string;
  price: number;
}

export interface MonthlyGroup {
  month: string; // 'YYYY-MM'
  label: string; // 'Mar 2026'
  expenses: Expense[];
  total: number;
  categoryBreakdown: Record<string, number>;
}
