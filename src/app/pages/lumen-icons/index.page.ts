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
          <a routerLink="/" class="text-sm text-white/50 transition-colors hover:text-white"
            >← Volver</a
          >
          <h1 class="mt-4 mb-2 text-4xl font-bold">Lumen Icons</h1>
          <p class="text-white/60">
            Iconos SVG como componentes Angular. Tree-shakeable, accesibles y animables.
          </p>
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
            <h3 class="mb-4 text-lg font-semibold">Usage</h3>
            <pre
              class="overflow-x-auto rounded-lg bg-black/40 p-4 text-sm text-white/80"
            ><code>{{ codeExample }}</code></pre>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="300">
            <h3 class="mb-4 text-lg font-semibold">Features</h3>
            <ul class="list-inside list-disc space-y-2 text-sm text-white/70">
              <li>Tree-shakeable — importa solo los iconos que usas</li>
              <li>Subpath exports — <code>@lumen/icons/search</code></li>
              <li>Accesible — <code>aria-label</code> y <code>role</code> automáticos</li>
              <li>Animaciones — integrado con <code>angular-movement</code></li>
              <li>
                Customizable — <code>size</code>, <code>strokeWidth</code>, <code>color</code>
              </li>
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
      description:
        'Iconos SVG como componentes Angular. Tree-shakeable, accesibles y con animaciones integradas.',
    });
  }

  readonly codeExample = `import { LmnSearchIcon } from '@lumen/icons/search';
import { LmnSettingsIcon } from '@lumen/icons/settings';

@Component({
  imports: [LmnSearchIcon, LmnSettingsIcon],
  template: '<lmn-search [size]="24" />'
})
export class MyComponent {}`;
}
