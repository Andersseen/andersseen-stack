import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { VoltButton, VoltCard } from '@voltui/components';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-movement-page',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton, VoltCard],
  template: `
    <div class="relative min-h-screen overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,158,11,0.08),transparent)]"
      ></div>
      <div class="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <div class="mb-8" [move]="'fade-up'">
          <a routerLink="/" class="text-sm text-white/50 transition-colors hover:text-white">← Volver</a>
          <h1 class="mt-4 mb-2 text-4xl font-bold">Angular Movement</h1>
          <p class="text-white/60">Animaciones declarativas con WAAPI y springs.</p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <div
              class="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-white/70"
            >
              <span class="text-white/40">$</span>
              <span>npm install angular-movement</span>
            </div>
            <a
              href="https://github.com/Andersseen/angular-movement"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                />
              </svg>
              GitHub
            </a>
            <a
              href="https://angular-movement.andersseen.dev"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 transition hover:bg-amber-500/20"
            >
              Live Demo
              <span>→</span>
            </a>
          </div>
        </div>

        <section class="space-y-8">
          <volt-card class="vt-destination-card p-6" [move]="'fade-up'" [moveDelay]="100">
            <h3 class="mb-4 text-lg font-semibold">Entrance Animations</h3>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div
                class="flex h-20 items-center justify-center rounded-lg bg-[var(--primary)]/20"
                [move]="'fade-up'"
              >
                fade-up
              </div>
              <div
                class="flex h-20 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400"
                [move]="'fade-down'"
                [moveDelay]="100"
              >
                fade-down
              </div>
              <div
                class="flex h-20 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400"
                [move]="'fade-left'"
                [moveDelay]="200"
              >
                fade-left
              </div>
              <div
                class="flex h-20 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400"
                [move]="'fade-right'"
                [moveDelay]="300"
              >
                fade-right
              </div>
            </div>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="200">
            <h3 class="mb-4 text-lg font-semibold">Hover & Tap</h3>
            <div class="flex flex-wrap gap-4">
              <volt-button variant="solid" [moveWhileHover]="hoverScale">Scale Hover</volt-button>
              <volt-button variant="outline" [moveWhileTap]="tapScale">Tap Me</volt-button>
              <div
                class="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/30"
                [moveWhileHover]="hoverRotate"
              >
                <span class="text-xl">↻</span>
              </div>
            </div>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="300">
            <h3 class="mb-4 text-lg font-semibold">In View</h3>
            <p class="mb-4 text-sm text-white/60">
              Scroll down para ver animaciones trigger al entrar en viewport.
            </p>
            <div class="space-y-4 overflow-hidden">
              @for (item of items; track item.id) {
                <div
                  class="flex h-16 items-center rounded-lg bg-white/5 px-4"
                  [moveInView]="'fade-up'"
                  [moveDelay]="item.delay"
                >
                  {{ item.label }}
                </div>
              }
            </div>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="400">
            <h3 class="mb-4 text-lg font-semibold">Setup</h3>
            <pre
              class="overflow-x-auto rounded-lg bg-black/40 p-4 text-sm text-white/80"
            ><code>{{ setupExample }}</code></pre>
          </volt-card>
        </section>
      </div>
    </div>
  `,
})
export default class MovementPage {
  private readonly seo = inject(SeoService);
  constructor() {
    this.seo.update({
      title: 'Angular Movement',
      description: 'Sistema declarativo de animaciones para Angular con WAAPI y springs. Scroll, hover, parallax y presencia.',
    });
  }

  readonly hoverScale = { scale: [1, 1.1] as [number, number] };
  readonly tapScale = { scale: [0.95, 1] as [number, number] };
  readonly hoverRotate = { rotate: [0, 15] as [number, number] };

  readonly items = [
    { id: 1, label: 'Item 1', delay: 100 },
    { id: 2, label: 'Item 2', delay: 200 },
    { id: 3, label: 'Item 3', delay: 300 },
  ];

  readonly setupExample = `import { provideMovement } from 'angular-movement';

providers: [
  provideMovement({
    duration: 320,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
  })
]`;
}
