import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VoltButton, VoltCard, VoltInput } from '@voltui/components';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-volt-ui-page',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton, VoltCard, VoltInput],
  template: `
    <div class="relative min-h-screen overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.08),transparent)]"
      ></div>
      <div class="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <div class="mb-8" [move]="'fade-up'">
          <a routerLink="/" class="text-sm text-white/50 transition-colors hover:text-white">← Volver</a>
          <h1 class="mt-4 mb-2 text-4xl font-bold">Volt UI</h1>
          <p class="text-white/60">Componentes UI estilizados con theming, variantes y accesibilidad.</p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <div
              class="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-white/70"
            >
              <span class="text-white/40">$</span>
              <span>npm install &#64;voltui/components</span>
            </div>
            <a
              href="https://github.com/Andersseen/volt-ui"
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
              href="https://volt-ui.andersseen.dev"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
            >
              Live Demo
              <span>→</span>
            </a>
          </div>
        </div>

        <section class="space-y-8">
          <volt-card class="vt-destination-card p-6" [move]="'fade-up'" [moveDelay]="100">
            <h3 class="mb-4 text-lg font-semibold">Buttons</h3>
            <div class="mb-4 flex flex-wrap gap-3">
              <volt-button variant="solid">Primary</volt-button>
              <volt-button variant="destructive">Destructive</volt-button>
              <volt-button variant="outline">Outline</volt-button>
              <volt-button variant="ghost">Ghost</volt-button>
            </div>
            <div class="flex flex-wrap gap-3">
              <volt-button variant="solid" size="sm">Small</volt-button>
              <volt-button variant="solid" size="md">Medium</volt-button>
              <volt-button variant="solid" size="lg">Large</volt-button>
            </div>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="200">
            <h3 class="mb-4 text-lg font-semibold">Input</h3>
            <div class="space-y-4">
              <volt-input placeholder="Type something..." class="w-full max-w-sm" />
              <volt-input placeholder="Disabled input" class="w-full max-w-sm" />
            </div>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="300">
            <h3 class="mb-4 text-lg font-semibold">Theming</h3>
            <p class="mb-4 text-sm text-white/60">
              Volt UI soporta múltiples colores de tema y estilos. Configúralo globalmente con
              <code>provideVoltTheme()</code>.
            </p>
            <pre
              class="overflow-x-auto rounded-lg bg-black/40 p-4 text-sm text-white/80"
            ><code>{{ themeExample }}</code></pre>
          </volt-card>
        </section>
      </div>
    </div>
  `,
})
export default class VoltUiPage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Volt UI',
      description: 'Componentes UI estilizados y accesibles para Angular. Theming, variantes y CLI propio.',
    });
  }

  readonly themeExample = `provideVoltTheme({
  color: 'volt',    // volt | emerald | amber | rose | sky
  style: 'soft',    // soft | solid | outline
  dark: true
})`;
}
