import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VoltBadge, VoltButton, VoltCard, VoltInput } from '@voltui/components';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-volt-ui-page',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton, VoltCard, VoltInput, VoltBadge],
  template: `
    <div class="relative min-h-screen overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.08),transparent)]"
      ></div>
      <div class="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <div class="mb-8" [move]="'fade-up'">
          <a routerLink="/" class="text-sm text-white/50 transition-colors hover:text-white"
            >← Volver</a
          >
          <h1 class="mt-4 mb-2 text-4xl font-bold">Volt UI</h1>
          <p class="text-white/60">
            Componentes UI estilizados con theming, variantes y accesibilidad.
          </p>
        </div>

        <section class="space-y-8">
          <volt-card class="vt-destination-card p-6" [move]="'fade-up'" [moveDelay]="100">
            <h3 class="mb-4 text-lg font-semibold">Buttons</h3>
            <div class="flex flex-wrap gap-3">
              <volt-button variant="solid">Primary</volt-button>
              <volt-button variant="destructive">Destructive</volt-button>
              <volt-button variant="outline">Outline</volt-button>
              <volt-button variant="ghost">Ghost</volt-button>
            </div>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="300">
            <h3 class="mb-4 text-lg font-semibold">Input</h3>
            <volt-input placeholder="Type something..." class="w-full max-w-sm" />
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
      description:
        'Componentes UI estilizados y accesibles para Angular. Theming, variantes y CLI propio.',
    });
  }
}
