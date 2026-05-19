import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { VoltButton } from '@voltui/components';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton],
  template: `
    <div class="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <div class="mb-6 text-8xl font-black tracking-tighter text-[var(--primary)]/30" [move]="'fade-up'">
        404
      </div>
      <h1 class="mb-4 text-3xl font-bold" [move]="'fade-up'" [moveDelay]="100">
        Página no encontrada
      </h1>
      <p class="mb-8 max-w-md text-white/60" [move]="'fade-up'" [moveDelay]="200">
        La ruta que buscas no existe en el Andersseen Stack.
      </p>
      <a routerLink="/" [move]="'fade-up'" [moveDelay]="300">
        <volt-button variant="solid" size="lg">Volver al inicio</volt-button>
      </a>
    </div>
  `,
})
export default class NotFoundPage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: '404 — Página no encontrada',
      description: 'La página que buscas no existe en el Andersseen Stack.',
    });
  }
}
