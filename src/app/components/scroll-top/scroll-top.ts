import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <button
        class="scroll-top"
        (click)="scrollToTop()"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        ↑
      </button>
    }
  `,
  styles: `
    .scroll-top {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 999;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid #3498db;
      background: #1e1e2e;
      color: #3498db;
      font-size: 1.4rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(52, 152, 219, 0.3);
      transition: background 0.2s, transform 0.2s;
      animation: fadeIn 0.3s ease;
      &:hover {
        background: #3498db;
        color: #fff;
        transform: translateY(-2px);
      }
      &:focus-visible {
        outline: 2px solid #3498db;
        outline-offset: 3px;
      }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `,
})
export class ScrollTopComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly visible = signal(false);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.addEventListener('scroll', () => {
          this.visible.set(window.scrollY > 300);
        });
      }
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
