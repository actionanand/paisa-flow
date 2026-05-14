import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MonthlyGroup } from '../../models/expense.model';

@Component({
  selector: 'app-month-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <div class="month-summary">
      <div class="month-summary__header">
        <h3>{{ group().label }}</h3>
        <span class="month-summary__total">{{ group().total | currency: 'INR' : 'symbol' : '1.0-0' }}</span>
      </div>
      <div class="month-summary__categories">
        @for (entry of sortedCategories(); track entry[0]) {
          <div class="cat-row">
            <span class="cat-name">{{ entry[0] }}</span>
            <span class="cat-bar">
              <span class="cat-bar__fill"
                [style.width.%]="(entry[1] / group().total) * 100"
              ></span>
            </span>
            <span class="cat-amount">{{ entry[1] | currency: 'INR' : 'symbol' : '1.0-0' }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    .month-summary {
      background: #1e1e2e; border-radius: 16px; padding: 20px; border: 1px solid #333;
      &__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
      &__header h3 { color: #fff; margin: 0; }
      &__total { font-size: 1.3rem; font-weight: 700; color: #e74c3c; }
      &__categories { display: flex; flex-direction: column; gap: 8px; }
    }
    .cat-row { display: flex; align-items: center; gap: 12px; }
    .cat-name { width: 120px; color: #aaa; font-size: 0.85rem; flex-shrink: 0; }
    .cat-bar { flex: 1; background: #2a2a3a; border-radius: 4px; height: 8px; overflow: hidden; }
    .cat-bar__fill { display: block; height: 100%; background: linear-gradient(90deg, #3498db, #2ecc71); border-radius: 4px; transition: width 0.5s ease; }
    .cat-amount { color: #ccc; font-size: 0.85rem; width: 80px; text-align: right; flex-shrink: 0; }
  `,
})
export class MonthSummaryComponent {
  readonly group = input.required<MonthlyGroup>();

  sortedCategories(): [string, number][] {
    return Object.entries(this.group().categoryBreakdown).sort((a, b) => b[1] - a[1]);
  }
}
