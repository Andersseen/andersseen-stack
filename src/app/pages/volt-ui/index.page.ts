import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VoltBadge, VoltButton, VoltCard, VoltInput } from '@voltui/components';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-volt-ui-page',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton, VoltCard, VoltInput, VoltBadge],
  template: `
    <div class="mx-auto max-w-3xl px-6 py-12">
      <div class="mb-8" [move]="'fade-up'">
        <a routerLink="/" class="text-sm text-white/50 transition-colors hover:text-white"
          >← Volver</a
        >
        <div style="view-transition-name: volt-header">
          <h1 class="mt-4 mb-2 text-4xl font-bold">Volt UI</h1>
        </div>
        <p class="text-white/60">
          Componentes UI estilizados con theming, variantes y accesibilidad.
        </p>
      </div>

      <section class="space-y-8">
        <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="100">
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
