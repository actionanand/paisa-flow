import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../models/expense.model';

type SortCol = 'date' | 'amount';
type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-expense-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe, FormsModule],
  template: `
    <div class="et-wrap">
      <!-- Month filter -->
      <div class="et-filters" role="group" aria-label="Filter by month">
        <span class="et-filters__label">Filter by month:</span>
        <div class="et-filters__months">
          @for (m of availableMonths(); track m.key) {
            <label class="month-chip" [class.selected]="selectedMonths().has(m.key)">
              <input
                type="checkbox"
                [checked]="selectedMonths().has(m.key)"
                (change)="toggleMonth(m.key)"
                [attr.aria-label]="m.label"
              />
              {{ m.label }}
            </label>
          }
        </div>
        @if (selectedMonths().size > 0) {
          <button class="clear-btn" (click)="clearFilter()" aria-label="Clear month filter">
            ✕ Clear
          </button>
        }
      </div>

      <!-- Table -->
      <div class="table-container" role="region" aria-label="Expense table">
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">
                <button
                  class="sort-btn"
                  (click)="setSort('date')"
                  [class.active]="sortCol() === 'date'"
                  [attr.aria-label]="'Sort by date ' + (sortCol() === 'date' && sortDir() === 'asc' ? 'descending' : 'ascending')"
                >
                  Date
                  <span class="sort-icon" aria-hidden="true">{{ sortCol() === 'date' ? (sortDir() === 'asc' ? '↑' : '↓') : '⇅' }}</span>
                </button>
              </th>
              <th scope="col">
                <button
                  class="sort-btn"
                  (click)="setSort('amount')"
                  [class.active]="sortCol() === 'amount'"
                  [attr.aria-label]="'Sort by amount ' + (sortCol() === 'amount' && sortDir() === 'asc' ? 'descending' : 'ascending')"
                >
                  Amount
                  <span class="sort-icon" aria-hidden="true">{{ sortCol() === 'amount' ? (sortDir() === 'asc' ? '↑' : '↓') : '⇅' }}</span>
                </button>
              </th>
              <th scope="col">Alert</th>
            </tr>
          </thead>
          <tbody>
            @for (expense of displayedExpenses(); track expense.date + expense.price + expense.category; let i = $index) {
              <tr [class.small-expense]="expense.price <= 100">
                <td>{{ i + 1 }}</td>
                <td>
                  <span class="category-badge">{{ expense.category || 'Uncategorized' }}</span>
                </td>
                <td>{{ expense.date | date: 'dd MMM yy' }}</td>
                <td>{{ expense.price | currency: 'INR' : 'symbol' : '1.0-0' }}</td>
                <td>
                  @if (expense.price <= 50) {
                    <span class="waste-icon" title="Tiny spend adds up fast!" aria-label="Warning: tiny spend adds up">💀🗑️</span>
                  } @else if (expense.price <= 100) {
                    <span class="waste-icon" title="Small money leaking!" aria-label="Warning: small money leaking">⚠️</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
        <p class="row-count" aria-live="polite">
          Showing {{ displayedExpenses().length }} of {{ expenses().length }} transactions
        </p>
      </div>
    </div>
  `,
  styles: `
    .et-wrap { display: flex; flex-direction: column; gap: 12px; }

    .et-filters {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      &__label { color: #888; font-size: 0.85rem; white-space: nowrap; }
      &__months { display: flex; flex-wrap: wrap; gap: 6px; }
    }
    .month-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid #444;
      background: #1e1e2e;
      color: #aaa;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      input[type='checkbox'] { display: none; }
      &.selected { background: #3498db; border-color: #3498db; color: #fff; }
      &:hover:not(.selected) { border-color: #3498db; color: #3498db; }
    }
    .clear-btn {
      background: none;
      border: 1px solid #e74c3c;
      color: #e74c3c;
      border-radius: 20px;
      padding: 4px 12px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background 0.15s;
      &:hover { background: rgba(231, 76, 60, 0.12); }
    }

    .table-container { overflow-x: auto; border-radius: 12px; border: 1px solid #333; }
    table { width: 100%; border-collapse: collapse; background: #1e1e2e; }
    th {
      background: #16161e;
      color: #888;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 12px 16px;
      text-align: left;
    }
    td { padding: 10px 16px; border-top: 1px solid #2a2a3a; color: #ccc; font-size: 0.9rem; }
    tr.small-expense { background: rgba(231, 76, 60, 0.08); }
    .category-badge { background: #2a2a3a; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; }
    .waste-icon { font-size: 1.1rem; cursor: help; }

    .sort-btn {
      all: unset;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
      text-transform: inherit;
      letter-spacing: inherit;
      &:hover, &.active { color: #3498db; }
      &:focus-visible { outline: 2px solid #3498db; border-radius: 4px; }
    }
    .sort-icon { font-size: 0.9rem; color: #3498db; }

    .row-count { color: #666; font-size: 0.8rem; padding: 8px 16px; margin: 0; background: #16161e; border-top: 1px solid #2a2a3a; }
  `,
})
export class ExpenseTableComponent {
  readonly expenses = input.required<Expense[]>();

  // Default: sort by date descending (newest month first)
  readonly sortCol = signal<SortCol>('date');
  readonly sortDir = signal<SortDir>('desc');
  readonly selectedMonths = signal<Set<string>>(new Set());

  readonly availableMonths = computed(() => {
    const seen = new Map<string, string>();
    for (const e of this.expenses()) {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!seen.has(key)) {
        seen.set(
          key,
          d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        );
      }
    }
    return Array.from(seen.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([key, label]) => ({ key, label }));
  });

  readonly displayedExpenses = computed(() => {
    const selected = this.selectedMonths();
    let list = this.expenses();
    if (selected.size > 0) {
      list = list.filter((e) => {
        const d = new Date(e.date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        return selected.has(key);
      });
    }
    const col = this.sortCol();
    const dir = this.sortDir();
    return [...list].sort((a, b) => {
      let cmp = 0;
      if (col === 'date') {
        cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        cmp = a.price - b.price;
      }
      return dir === 'asc' ? cmp : -cmp;
    });
  });

  setSort(col: SortCol): void {
    if (this.sortCol() === col) {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortCol.set(col);
      this.sortDir.set('desc');
    }
  }

  toggleMonth(key: string): void {
    this.selectedMonths.update((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  clearFilter(): void {
    this.selectedMonths.set(new Set());
  }
}
