import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-money-trash',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="money-trash" aria-hidden="true">
      <div class="trash-bin">🗑️</div>
      @for (i of coins; track i) {
        <div class="coin" [style.animation-delay]="i * 0.7 + 's'" [style.left.%]="20 + i * 15">💰</div>
      }
    </div>
  `,
  styles: `
    .money-trash {
      position: relative;
      height: 120px;
      overflow: hidden;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .trash-bin {
      font-size: 3rem;
      position: relative;
      z-index: 2;
      animation: shake 2s ease-in-out infinite;
    }
    .coin {
      position: absolute;
      font-size: 1.5rem;
      top: -20px;
      animation: fall 2.5s ease-in infinite;
    }
    @keyframes fall {
      0% { top: -20px; opacity: 1; transform: rotate(0deg); }
      80% { opacity: 1; }
      100% { top: 90px; opacity: 0; transform: rotate(360deg); }
    }
    @keyframes shake {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-5deg); }
      75% { transform: rotate(5deg); }
    }
  `,
})
export class MoneyTrashComponent {
  readonly coins = [0, 1, 2, 3, 4];
}
