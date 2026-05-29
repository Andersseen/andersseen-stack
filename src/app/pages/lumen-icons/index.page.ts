import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { VoltCard } from '@voltui/components';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-lumen-icons-page',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltCard],
  template: `
    <div class="relative min-h-screen overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(14,165,233,0.08),transparent)]"
      ></div>
      <div class="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <div class="mb-8" [move]="'fade-up'">
          <a routerLink="/" class="text-sm text-white/50 transition-colors hover:text-white">← Volver</a>
          <h1 class="mt-4 mb-2 text-4xl font-bold">Lumen Icons</h1>
          <p class="text-white/60">Iconos SVG como componentes Angular. Tree-shakeable, accesibles y animables.</p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <div
              class="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-white/70"
            >
              <span class="text-white/40">$</span>
              <span>npm install &#64;lumen/icons</span>
            </div>
            <a
              href="https://github.com/Andersseen/lumen-icons"
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
              href="https://lumen-icons.andersseen.dev"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 rounded-lg border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-400 transition hover:bg-sky-500/20"
            >
              Live Demo
              <span>→</span>
            </a>
          </div>
        </div>

        <section class="space-y-8">
          <volt-card class="vt-destination-card p-6" [move]="'fade-up'" [moveDelay]="100">
            <h3 class="mb-4 text-lg font-semibold">Icon Gallery</h3>
            <div class="grid grid-cols-4 gap-4 md:grid-cols-8">
              <div class="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span class="text-xs text-white/50">Info</span>
              </div>
              <div class="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span class="text-xs text-white/50">Search</span>
              </div>
              <div class="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.67 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.67 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.67a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 20.33 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                  />
                </svg>
                <span class="text-xs text-white/50">Settings</span>
              </div>
              <div class="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span class="text-xs text-white/50">Check</span>
              </div>
              <div class="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span class="text-xs text-white/50">Left</span>
              </div>
              <div class="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
                <span class="text-xs text-white/50">Right</span>
              </div>
              <div class="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span class="text-xs text-white/50">Alert</span>
              </div>
              <div class="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span class="text-xs text-white/50">Avatar</span>
              </div>
            </div>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="200">
            <h3 class="mb-4 text-lg font-semibold">Animated Icons</h3>
            <p class="mb-4 text-sm text-white/60">
              Integrados con <code>angular-movement</code> para animaciones declarativas.
            </p>
            <div class="flex flex-wrap gap-6">
              <div class="flex flex-col items-center gap-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  [move]="'fade-up'"
                  [moveDelay]="100"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span class="text-xs text-white/40">fade-up</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  [moveWhileHover]="{ scale: [1, 1.2] }"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
                <span class="text-xs text-white/40">hover scale</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  [moveWhileHover]="{ rotate: [0, 90] }"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.67 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.67 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.67a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 20.33 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                  />
                </svg>
                <span class="text-xs text-white/40">hover rotate</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  [move]="'fade-up'"
                  [moveDelay]="300"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                <span class="text-xs text-white/40">sparkles</span>
              </div>
            </div>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="200">
            <h3 class="mb-4 text-lg font-semibold">Usage</h3>
            <pre
              class="overflow-x-auto rounded-lg bg-black/40 p-4 text-sm text-white/80"
            ><code>{{ codeExample }}</code></pre>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="300">
            <h3 class="mb-4 text-lg font-semibold">Features</h3>
            <ul class="list-inside list-disc space-y-2 text-sm text-white/70">
              <li>Tree-shakeable — importa solo los iconos que usas</li>
              <li>Subpath exports — <code>&#64;lumen/icons/search</code></li>
              <li>Accesible — <code>aria-label</code> y <code>role</code> automáticos</li>
              <li>Animaciones — integrado con <code>angular-movement</code></li>
              <li>Customizable — <code>size</code>, <code>strokeWidth</code>, <code>color</code></li>
            </ul>
          </volt-card>
        </section>
      </div>
    </div>
  `,
})
export default class LumenIconsPage {
  private readonly seo = inject(SeoService);
  constructor() {
    this.seo.update({
      title: 'Lumen Icons',
      description: 'Iconos SVG como componentes Angular. Tree-shakeable, accesibles y con animaciones integradas.',
    });
  }

  readonly codeExample = `import { LmnSearchIcon } from '@lumen/icons/search';
import { LmnSettingsIcon } from '@lumen/icons/settings';

@Component({
  imports: [LmnSearchIcon, LmnSettingsIcon],
  template: '<lmn-search [size]="24" strokeWidth="1.5" />'
})
export class MyComponent {}`;
}
