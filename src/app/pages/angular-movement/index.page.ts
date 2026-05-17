import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { VoltButton, VoltCard } from '@voltui/components';

@Component({
  selector: 'app-movement-page',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton, VoltCard],
  template: `
    <div class="max-w-3xl mx-auto px-6 py-12">
      <div class="mb-8" [move]="'fade-up'">
        <a routerLink="/" class="text-sm text-white/50 hover:text-white transition-colors">← Volver</a>
        <h1 class="text-4xl font-bold mt-4 mb-2">Angular Movement</h1>
        <p class="text-white/60">Animaciones declarativas con WAAPI y springs.</p>
      </div>

      <section class="space-y-8">
        <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="100">
          <h3 class="text-lg font-semibold mb-4">Entrance Animations</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="h-20 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center" [move]="'fade-up'">fade-up</div>
            <div class="h-20 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400" [move]="'fade-down'" [moveDelay]="100">fade-down</div>
            <div class="h-20 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400" [move]="'fade-left'" [moveDelay]="200">fade-left</div>
            <div class="h-20 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400" [move]="'fade-right'" [moveDelay]="300">fade-right</div>
          </div>
        </volt-card>

        <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="200">
          <h3 class="text-lg font-semibold mb-4">Hover & Tap</h3>
          <div class="flex flex-wrap gap-4">
            <volt-button variant="primary" [moveWhileHover]="hoverScale">Scale Hover</volt-button>
            <volt-button variant="outline" [moveWhileTap]="tapScale">Tap Me</volt-button>
            <div class="w-16 h-16 rounded-full bg-[var(--primary)]/30 flex items-center justify-center" [moveWhileHover]="hoverRotate">
              <span class="text-xl">↻</span>
            </div>
          </div>
        </volt-card>

        <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="300">
          <h3 class="text-lg font-semibold mb-4">In View</h3>
          <p class="text-white/60 text-sm mb-4">Scroll down para ver animaciones trigger al entrar en viewport.</p>
          <div class="space-y-4 overflow-hidden">
            @for (item of items; track item.id) {
              <div
                class="h-16 rounded-lg bg-white/5 flex items-center px-4"
                [moveInView]="'fade-up'"
                [moveDelay]="item.delay"
              >
                {{ item.label }}
              </div>
            }
          </div>
        </volt-card>
      </section>
    </div>
  `,
})
export default class MovementPage {
  readonly hoverScale = { scale: [1, 1.1] as [number, number] };
  readonly tapScale = { scale: [0.95, 1] as [number, number] };
  readonly hoverRotate = { rotate: [0, 15] as [number, number] };

  readonly items = [
    { id: 1, label: 'Item 1', delay: 100 },
    { id: 2, label: 'Item 2', delay: 200 },
    { id: 3, label: 'Item 3', delay: 300 },
  ];
}
