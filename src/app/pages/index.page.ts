import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { VoltButton, VoltCard } from '@voltui/components';

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
            class="h-full p-6 transition-transform group-hover:-translate-y-1"
            [move]="'fade-up'"
            [moveDelay]="100"
          >
            <div class="mb-3 flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/20 text-lg"
              >
                ⚡
              </div>
              <h3 class="text-xl font-semibold">Volt UI</h3>
            </div>
            <p class="text-sm text-white/60">
              Componentes UI estilizados y accesibles construidos sobre ng-primitives. Temas,
              variantes y CLI propio.
            </p>
          </volt-card>
        </a>

        <a routerLink="/quartz" class="group">
          <volt-card
            class="h-full p-6 transition-transform group-hover:-translate-y-1"
            [move]="'fade-up'"
            [moveDelay]="200"
          >
            <div class="mb-3 flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-lg text-emerald-400"
              >
                💎
              </div>
              <h3 class="text-xl font-semibold">Quartz</h3>
            </div>
            <p class="text-sm text-white/60">
              Primitivas UI headless para Angular. Overlays, dialogs, drag-drop, toast, virtual
              scroll y más.
            </p>
          </volt-card>
        </a>

        <a routerLink="/angular-movement" class="group">
          <volt-card
            class="h-full p-6 transition-transform group-hover:-translate-y-1"
            [move]="'fade-up'"
            [moveDelay]="300"
          >
            <div class="mb-3 flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-lg text-amber-400"
              >
                ✦
              </div>
              <h3 class="text-xl font-semibold">Angular Movement</h3>
            </div>
            <p class="text-sm text-white/60">
              Sistema declarativo de animaciones con WAAPI y springs. Directivas para scroll, hover,
              parallax y presencia.
            </p>
          </volt-card>
        </a>

        <a routerLink="/lumen-icons" class="group">
          <volt-card
            class="h-full p-6 transition-transform group-hover:-translate-y-1"
            [move]="'fade-up'"
            [moveDelay]="400"
          >
            <div class="mb-3 flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/20 text-lg text-sky-400"
              >
                ◉
              </div>
              <h3 class="text-xl font-semibold">Lumen Icons</h3>
            </div>
            <p class="text-sm text-white/60">
              Iconos SVG como componentes Angular. Tree-shakeable, accesibles y con animaciones
              integradas.
            </p>
          </volt-card>
        </a>
      </section>
    </div>
  `,
})
export default class HomePage {}
