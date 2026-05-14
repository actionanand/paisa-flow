import { Injectable, signal, computed } from '@angular/core';
import { Expense, MonthlyGroup } from '../models/expense.model';
import expensesData from '../data/expenses.json';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private readonly expenses = signal<Expense[]>(expensesData as Expense[]);

  readonly allExpenses = this.expenses.asReadonly();

  readonly grandTotal = computed(() =>
    this.expenses().reduce((sum, e) => sum + e.price, 0)
  );

  readonly monthlyGroups = computed<MonthlyGroup[]>(() => {
    const groups = new Map<string, Expense[]>();
    for (const e of this.expenses()) {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(e);
    }
    return Array.from(groups.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([month, expenses]) => {
        const [y, m] = month.split('-');
        const label = new Date(+y, +m - 1).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });
        const categoryBreakdown: Record<string, number> = {};
        let total = 0;
        for (const e of expenses) {
          total += e.price;
          categoryBreakdown[e.category] = (categoryBreakdown[e.category] || 0) + e.price;
        }
        return { month, label, expenses, total, categoryBreakdown };
      });
  });

  readonly categories = computed(() => {
    const cats = new Set<string>();
    for (const e of this.expenses()) {
      if (e.category) cats.add(e.category);
    }
    return Array.from(cats).sort();
  });

  readonly categoryTotals = computed<Record<string, number>>(() => {
    const totals: Record<string, number> = {};
    for (const e of this.expenses()) {
      const cat = e.category || 'Uncategorized';
      totals[cat] = (totals[cat] || 0) + e.price;
    }
    return totals;
  });

  readonly smallExpenses = computed(() =>
    this.expenses().filter((e) => e.price <= 100)
  );

  readonly smallExpenseTotal = computed(() =>
    this.smallExpenses().reduce((sum, e) => sum + e.price, 0)
  );

  readonly cumulativeByMonth = computed(() => {
    const groups = this.monthlyGroups();
    let running = 0;
    const result: { label: string; cumulative: number; monthTotal: number }[] = [];
    for (const g of [...groups].reverse()) {
      running += g.total;
      result.push({ label: g.label, cumulative: running, monthTotal: g.total });
    }
    return result;
  });
}
