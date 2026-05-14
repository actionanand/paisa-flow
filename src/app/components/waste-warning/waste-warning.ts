import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-waste-warning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <div class="waste-warning" role="alert">
      <div class="waste-warning__skull">
        <span class="skull-bounce">💀</span>
        <span class="skull-bounce delay-1">💸</span>
        <span class="skull-bounce delay-2">🗑️</span>
      </div>
      <h3 class="waste-warning__title">Small Spends = Big Drain!</h3>
      <p class="waste-warning__text">
        You made <strong>{{ smallCount() }}</strong> transactions under ₹100,
        totalling <strong>{{ smallTotal() | currency: 'INR' : 'symbol' : '1.0-0' }}</strong>
      </p>
      <p class="waste-warning__text">
        That's <strong>{{ percentOfTotal() }}%</strong> of your total spending
        wasted on tiny amounts you barely noticed!
      </p>
      <div class="waste-warning__bar">
        <div class="waste-warning__bar-fill" [style.width.%]="percentOfTotal()"></div>
      </div>
      <p class="waste-warning__tip">☠️ ₹10 here, ₹50 there... it all piles up into a mountain of waste!</p>
    </div>
  `,
  styles: `
    .waste-warning {
      background: linear-gradient(135deg, #2d1a1a 0%, #1e1e2e 100%);
      border: 2px solid #e74c3c;
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      &__skull { font-size: 2.5rem; margin-bottom: 12px; display: flex; justify-content: center; gap: 12px; }
      &__title { color: #e74c3c; font-size: 1.3rem; margin: 0 0 12px; }
      &__text { color: #ccc; margin: 4px 0; }
      &__text strong { color: #e74c3c; }
      &__bar { background: #333; border-radius: 8px; height: 12px; margin: 16px 0; overflow: hidden; }
      &__bar-fill { background: linear-gradient(90deg, #e74c3c, #c0392b); height: 100%; border-radius: 8px; transition: width 1s ease; }
      &__tip { color: #f39c12; font-size: 0.85rem; margin-top: 12px; }
    }
    .skull-bounce {
      display: inline-block;
      animation: bounce 1.5s ease-in-out infinite;
      &.delay-1 { animation-delay: 0.3s; }
      &.delay-2 { animation-delay: 0.6s; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,
})
export class WasteWarningComponent {
  readonly smallTotal = input.required<number>();
  readonly smallCount = input.required<number>();
  readonly grandTotal = input.required<number>();

  readonly percentOfTotal = computed(() => {
    const gt = this.grandTotal();
    return gt > 0 ? Math.round((this.smallTotal() / gt) * 100) : 0;
  });
}
