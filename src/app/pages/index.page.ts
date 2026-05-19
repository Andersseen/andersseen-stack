import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { VoltButton, VoltCard } from '@voltui/components';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton, VoltCard],
  template: `
    <div class="mx-auto max-w-5xl px-6 py-16">
      <header class="mb-20 text-center" [move]="'fade-up'">
        <h1 class="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
          Andersseen
          <span class="text-[var(--primary)]">Stack</span>
        </h1>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-white/60 md:text-xl">
          Un ecosistema de librerías Angular modernas, accesibles y animadas. Inspirado en Tan
          Stack, construido para Angular.
        </p>
        <div class="flex items-center justify-center gap-4">
          <a routerLink="/volt-ui">
            <volt-button variant="solid" size="lg">Explorar</volt-button>
          </a>
          <a href="https://github.com/Andersseen" target="_blank" rel="noopener">
            <volt-button variant="outline" size="lg">GitHub</volt-button>
          </a>
        </div>
      </header>

      <section class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <a routerLink="/volt-ui" class="group">
          <volt-card
            class="flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--primary)]/20 group-hover:bg-white/[0.04] group-hover:shadow-[var(--primary)]/10"
            [move]="'fade-up'"
            [moveDelay]="100"
          >
            <div class="mb-4 flex items-center gap-3" style="view-transition-name: volt-header">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/15 text-lg"
              >
                ⚡
              </div>
              <h3 class="text-xl font-semibold">Volt UI</h3>
            </div>
            <p class="mb-4 flex-1 text-sm leading-relaxed text-white/60">
              Componentes UI estilizados y accesibles construidos sobre ng-primitives. Temas,
              variantes y CLI propio.
            </p>
            <div class="flex items-center gap-1 text-sm font-medium text-[var(--primary)] opacity-60 transition-opacity group-hover:opacity-100">
              <span>Explorar</span>
              <span class="transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </volt-card>
        </a>

        <a routerLink="/quartz" class="group">
          <volt-card
            class="flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-500/20 group-hover:bg-white/[0.04] group-hover:shadow-emerald-500/10"
            [move]="'fade-up'"
            [moveDelay]="200"
          >
            <div class="mb-4 flex items-center gap-3" style="view-transition-name: quartz-header">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-lg text-emerald-400"
              >
                💎
              </div>
              <h3 class="text-xl font-semibold">Quartz</h3>
            </div>
            <p class="mb-4 flex-1 text-sm leading-relaxed text-white/60">
              Primitivas UI headless para Angular. Overlays, dialogs, drag-drop, toast, virtual
              scroll y más.
            </p>
            <div class="flex items-center gap-1 text-sm font-medium text-emerald-400 opacity-60 transition-opacity group-hover:opacity-100">
              <span>Explorar</span>
              <span class="transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </volt-card>
        </a>

        <a routerLink="/angular-movement" class="group">
          <volt-card
            class="flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-amber-500/20 group-hover:bg-white/[0.04] group-hover:shadow-amber-500/10"
            [move]="'fade-up'"
            [moveDelay]="300"
          >
            <div class="mb-4 flex items-center gap-3" style="view-transition-name: movement-header">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-lg text-amber-400"
              >
                ✦
              </div>
              <h3 class="text-xl font-semibold">Angular Movement</h3>
            </div>
            <p class="mb-4 flex-1 text-sm leading-relaxed text-white/60">
              Sistema declarativo de animaciones con WAAPI y springs. Directivas para scroll, hover,
              parallax y presencia.
            </p>
            <div class="flex items-center gap-1 text-sm font-medium text-amber-400 opacity-60 transition-opacity group-hover:opacity-100">
              <span>Explorar</span>
              <span class="transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </volt-card>
        </a>

        <a routerLink="/lumen-icons" class="group">
          <volt-card
            class="flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-sky-500/20 group-hover:bg-white/[0.04] group-hover:shadow-sky-500/10"
            [move]="'fade-up'"
            [moveDelay]="400"
          >
            <div class="mb-4 flex items-center gap-3" style="view-transition-name: lumen-header">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/15 text-lg text-sky-400"
              >
                ◉
              </div>
              <h3 class="text-xl font-semibold">Lumen Icons</h3>
            </div>
            <p class="mb-4 flex-1 text-sm leading-relaxed text-white/60">
              Iconos SVG como componentes Angular. Tree-shakeable, accesibles y con animaciones
              integradas.
            </p>
            <div class="flex items-center gap-1 text-sm font-medium text-sky-400 opacity-60 transition-opacity group-hover:opacity-100">
              <span>Explorar</span>
              <span class="transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </volt-card>
        </a>
      </section>
    </div>
  `,
})
export default class HomePage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Andersseen Stack',
      description:
        'Un ecosistema de librerías Angular modernas, accesibles y animadas. Volt UI, Quartz, Angular Movement y Lumen Icons.',
    });
  }
}
