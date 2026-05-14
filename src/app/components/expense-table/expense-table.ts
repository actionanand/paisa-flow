import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe],
  template: `
    <div class="table-container" role="region" aria-label="Expense table">
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Alert</th>
          </tr>
        </thead>
        <tbody>
          @for (expense of expenses(); track expense.sNo) {
            <tr [class.small-expense]="expense.price <= 100">
              <td>{{ expense.sNo }}</td>
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
    </div>
  `,
  styles: `
    .table-container { overflow-x: auto; border-radius: 12px; border: 1px solid #333; }
    table { width: 100%; border-collapse: collapse; background: #1e1e2e; }
    th { background: #16161e; color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; padding: 12px 16px; text-align: left; }
    td { padding: 10px 16px; border-top: 1px solid #2a2a3a; color: #ccc; font-size: 0.9rem; }
    tr.small-expense { background: rgba(231, 76, 60, 0.08); }
    .category-badge { background: #2a2a3a; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; }
    .waste-icon { font-size: 1.1rem; cursor: help; }
  `,
})
export class ExpenseTableComponent {
  readonly expenses = input.required<Expense[]>();
}
