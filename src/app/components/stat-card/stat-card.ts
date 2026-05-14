import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <div class="stat-card" [class]="'stat-card--' + variant()">
      <div class="stat-card__icon">{{ icon() }}</div>
      <div class="stat-card__content">
        <span class="stat-card__label">{{ label() }}</span>
        <span class="stat-card__value">{{ value() | currency: 'INR' : 'symbol' : '1.0-0' }}</span>
      </div>
      @if (subtitle()) {
        <div class="stat-card__subtitle">{{ subtitle() }}</div>
      }
    </div>
  `,
  styles: `
    .stat-card {
      background: #1e1e2e;
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      border: 1px solid #333;
      transition: transform 0.2s, box-shadow 0.2s;
      &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
      &--danger { border-color: #e74c3c; background: linear-gradient(135deg, #1e1e2e 0%, #2d1a1a 100%); }
      &--warning { border-color: #f39c12; background: linear-gradient(135deg, #1e1e2e 0%, #2d2a1a 100%); }
      &--info { border-color: #3498db; }
      &__icon { font-size: 2rem; }
      &__content { display: flex; flex-direction: column; gap: 4px; }
      &__label { font-size: 0.85rem; color: #888; text-transform: uppercase; letter-spacing: 1px; }
      &__value { font-size: 1.8rem; font-weight: 700; color: #fff; }
      &__subtitle { font-size: 0.8rem; color: #999; }
    }
  `,
})
export class StatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly icon = input('💰');
  readonly variant = input<'default' | 'danger' | 'warning' | 'info'>('default');
  readonly subtitle = input('');
}
