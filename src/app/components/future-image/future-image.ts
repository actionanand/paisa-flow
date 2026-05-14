import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-future-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <div class="future-image-wrap">
      <button
        class="future-image-btn"
        (click)="open()"
        aria-label="Your future image – click to view fullscreen"
        title="Click to view fullscreen"
      >
        <img
          ngSrc="/your_future.webp"
          alt="Your Future is created by what you do TODAY"
          width="900"
          height="600"
          priority
          class="future-img"
        />
        <span class="expand-hint" aria-hidden="true">🔍 Click to expand</span>
      </button>
    </div>

    @if (fullscreen()) {
      <div
        class="fullscreen-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Fullscreen image"
        (click)="close()"
        (keydown.escape)="close()"
        tabindex="0"
      >
        <button class="close-btn" (click)="close()" aria-label="Close fullscreen">✕</button>
        <img
          src="/your_future.webp"
          alt="Your Future is created by what you do TODAY"
          class="fullscreen-img"
        />
      </div>
    }
  `,
  styles: `
    .future-image-wrap {
      border-radius: 16px;
      overflow: hidden;
      border: 2px solid #333;
    }
    .future-image-btn {
      all: unset;
      cursor: zoom-in;
      display: block;
      width: 100%;
      position: relative;
      &:focus-visible { outline: 2px solid #3498db; outline-offset: 3px; }
      &:hover .expand-hint { opacity: 1; }
    }
    .future-img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 14px;
      transition: filter 0.2s;
    }
    .future-image-btn:hover .future-img { filter: brightness(0.85); }
    .expand-hint {
      position: absolute;
      bottom: 12px;
      right: 16px;
      background: rgba(0,0,0,0.65);
      color: #fff;
      padding: 4px 12px;
      border-radius: 8px;
      font-size: 0.8rem;
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
    }

    /* Fullscreen overlay */
    .fullscreen-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.92);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
      cursor: zoom-out;
    }
    .fullscreen-img {
      max-width: 95vw;
      max-height: 92vh;
      border-radius: 12px;
      box-shadow: 0 8px 48px rgba(0,0,0,0.8);
      object-fit: contain;
    }
    .close-btn {
      position: absolute;
      top: 16px;
      right: 20px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.3);
      color: #fff;
      font-size: 1.4rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      &:hover { background: rgba(255,255,255,0.25); }
      &:focus-visible { outline: 2px solid #3498db; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `,
})
export class FutureImageComponent {
  readonly fullscreen = signal(false);

  open(): void {
    this.fullscreen.set(true);
  }

  close(): void {
    this.fullscreen.set(false);
  }
}
