import { Component, input } from '@angular/core';

@Component({
  selector: 'app-demo-layout',
  imports: [],
  template: `
    <div class="relative min-h-screen overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(var(--accent-rgb),0.08),transparent)]"
      ></div>
      <div class="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <ng-content />
      </div>
    </div>
  `,
  host: {
    '[style.--accent-rgb]': 'accentRgb()',
  },
})
export class DemoLayoutComponent {
  readonly accentRgb = input<string>('59 130 246');
}
