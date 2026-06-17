import { Component, inject } from '@angular/core';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import {
  DemoCardComponent,
  DemoCodeBlockComponent,
  DemoHeaderComponent,
  DemoLayoutComponent,
  DemoSectionComponent,
} from '../../components/demo';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-lumen-icons-page',
  imports: [
    MOVEMENT_DIRECTIVES,
    DemoLayoutComponent,
    DemoHeaderComponent,
    DemoCardComponent,
    DemoSectionComponent,
    DemoCodeBlockComponent,
  ],
  template: `
    <app-demo-layout accentRgb="14 165 233">
      <app-demo-header
        title="Lumen Icons"
        description="Iconos SVG como componentes Angular. Tree-shakeable, accesibles y animables."
        packageName="lumen-icons"
        githubUrl="https://github.com/Andersseen/lumen-icons"
        demoUrl="https://lumen-icons.andersseen.dev"
      />

      <app-demo-section>
        <app-demo-card [isDestination]="true" [delay]="100">
          <h3 class="mb-4 text-lg font-semibold">Icon Gallery</h3>
          <p class="mb-4 text-sm text-white/60">
            Cada icono es un componente Angular independiente. Importa solo los que necesitas.
          </p>
          <div class="grid grid-cols-4 gap-4 md:grid-cols-8">
            <!-- Alert -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span class="text-xs text-white/50">Alert</span>
            </div>
            <!-- Search -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span class="text-xs text-white/50">Search</span>
            </div>
            <!-- Settings -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.67 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.67 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.67a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 20.33 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <span class="text-xs text-white/50">Settings</span>
            </div>
            <!-- Check -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span class="text-xs text-white/50">Check</span>
            </div>
            <!-- Left -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              <span class="text-xs text-white/50">Left</span>
            </div>
            <!-- Right -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
              <span class="text-xs text-white/50">Right</span>
            </div>
            <!-- Info -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span class="text-xs text-white/50">Info</span>
            </div>
            <!-- Avatar -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span class="text-xs text-white/50">Avatar</span>
            </div>
            <!-- Heart -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span class="text-xs text-white/50">Heart</span>
            </div>
            <!-- Star -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span class="text-xs text-white/50">Star</span>
            </div>
            <!-- Sun -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <span class="text-xs text-white/50">Sun</span>
            </div>
            <!-- Moon -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <span class="text-xs text-white/50">Moon</span>
            </div>
            <!-- Mail -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              <span class="text-xs text-white/50">Mail</span>
            </div>
            <!-- Home -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span class="text-xs text-white/50">Home</span>
            </div>
            <!-- Smile -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
              <span class="text-xs text-white/50">Smile</span>
            </div>
            <!-- Sparkles -->
            <div class="group flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10 hover:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/70">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
              <span class="text-xs text-white/50">Sparkles</span>
            </div>
          </div>
        </app-demo-card>

        <app-demo-card [delay]="200">
          <h3 class="mb-4 text-lg font-semibold">Sizes & Customization</h3>
          <p class="mb-4 text-sm text-white/60">
            Tamaños configurables via el input <code>size</code>.
          </p>
          <div class="flex items-center gap-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/40">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/60">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/80">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </app-demo-card>

        <app-demo-card [delay]="300">
          <h3 class="mb-4 text-lg font-semibold">Animated Icons</h3>
          <p class="mb-4 text-sm text-white/60">
            Integrados con <code>angular-movement</code> para animaciones declarativas.
          </p>
          <div class="flex flex-wrap gap-8">
            <div class="flex flex-col items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [move]="'fade-up'" [moveDelay]="100">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span class="text-xs text-white/40">fade-up</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [moveWhileHover]="{ scale: [1, 1.3] }">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span class="text-xs text-white/40">hover scale</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [moveWhileHover]="{ rotate: [0, 90] }">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.67 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.67 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.67a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 20.33 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <span class="text-xs text-white/40">hover rotate</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [move]="'fade-up'" [moveDelay]="300">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
              <span class="text-xs text-white/40">sparkles</span>
            </div>
          </div>
        </app-demo-card>

        <app-demo-card [delay]="400">
          <h3 class="mb-4 text-lg font-semibold">Usage</h3>
          <app-demo-code-block [code]="codeExample" />
        </app-demo-card>

        <app-demo-card [delay]="500">
          <h3 class="mb-4 text-lg font-semibold">Features</h3>
          <ul class="list-inside list-disc space-y-2 text-sm text-white/70">
            <li>Tree-shakeable — importa solo los iconos que usas</li>
            <li>Subpath exports — <code>lumen-icons/icons/search</code></li>
            <li>Accesible — <code>aria-label</code> y <code>role</code> automáticos</li>
            <li>Animaciones — integrado con <code>angular-movement</code></li>
            <li>Customizable — <code>size</code>, <code>strokeWidth</code>, <code>color</code></li>
          </ul>
        </app-demo-card>
      </app-demo-section>
    </app-demo-layout>
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

  readonly codeExample = `import { LmnSearchIcon } from 'lumen-icons/icons/search';
import { LmnSettingsIcon } from 'lumen-icons/icons/settings';

@Component({
  imports: [LmnSearchIcon, LmnSettingsIcon],
  template: '<lmn-search [size]="24" strokeWidth="1.5" />'
})
export class MyComponent {}`;
}
