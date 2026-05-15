import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { VoltButton, VoltCard } from '@voltui/components';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton, VoltCard],
  template: `
    <div class="max-w-5xl mx-auto px-6 py-16">
      <header class="text-center mb-20" [move]="'fade-up'">
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Andersseen
          <span class="text-[var(--volt-primary)]">Stack</span>
        </h1>
        <p class="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8">
          Un ecosistema de librerías Angular modernas, accesibles y animadas.
          Inspirado en Tan Stack, construido para Angular.
        </p>
        <div class="flex items-center justify-center gap-4">
          <a routerLink="/volt-ui">
            <volt-button variant="primary" size="lg">Explorar</volt-button>
          </a>
          <a href="https://github.com/Andersseen" target="_blank" rel="noopener">
            <volt-button variant="outline" size="lg">GitHub</volt-button>
          </a>
        </div>
      </header>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a routerLink="/volt-ui" class="group">
          <volt-card class="p-6 h-full transition-transform group-hover:-translate-y-1" [move]="'fade-up'" [moveDelay]="100">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-lg bg-[var(--volt-primary)]/20 flex items-center justify-center text-lg">
                ⚡
              </div>
              <h3 class="text-xl font-semibold">Volt UI</h3>
            </div>
            <p class="text-white/60 text-sm">Componentes UI estilizados y accesibles construidos sobre ng-primitives. Temas, variantes y CLI propio.</p>
          </volt-card>
        </a>

        <a routerLink="/quartz" class="group">
          <volt-card class="p-6 h-full transition-transform group-hover:-translate-y-1" [move]="'fade-up'" [moveDelay]="200">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
                💎
              </div>
              <h3 class="text-xl font-semibold">Quartz</h3>
            </div>
            <p class="text-white/60 text-sm">Primitivas UI headless para Angular. Overlays, dialogs, drag-drop, toast, virtual scroll y más.</p>
          </volt-card>
        </a>

        <a routerLink="/angular-movement" class="group">
          <volt-card class="p-6 h-full transition-transform group-hover:-translate-y-1" [move]="'fade-up'" [moveDelay]="300">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 text-lg">
                ✦
              </div>
              <h3 class="text-xl font-semibold">Angular Movement</h3>
            </div>
            <p class="text-white/60 text-sm">Sistema declarativo de animaciones con WAAPI y springs. Directivas para scroll, hover, parallax y presencia.</p>
          </volt-card>
        </a>

        <a routerLink="/lumen-icons" class="group">
          <volt-card class="p-6 h-full transition-transform group-hover:-translate-y-1" [move]="'fade-up'" [moveDelay]="400">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 text-lg">
                ◉
              </div>
              <h3 class="text-xl font-semibold">Lumen Icons</h3>
            </div>
            <p class="text-white/60 text-sm">Iconos SVG como componentes Angular. Tree-shakeable, accesibles y con animaciones integradas.</p>
          </volt-card>
        </a>
      </section>
    </div>
  `,
})
export default class HomePage {}
