import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { TranslatePipe } from '@ngx-translate/core';
import { VoltButton, VoltBadge } from '@voltui/components';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton, VoltBadge, TranslatePipe],
  template: `
    <!-- Hero Section with animated aurora background -->
    <section class="relative overflow-hidden px-4 pt-14 pb-14 sm:px-6 sm:pt-20 sm:pb-16 md:pt-28 md:pb-24">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)] blur-3xl"></div>
      
      <div class="relative z-10 mx-auto max-w-5xl text-center">
        <div [move]="'fade-up'">
          <volt-badge variant="outline" class="mb-6 inline-flex">
            <span class="flex items-center gap-2">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              </span>
              {{ 'home.badge' | translate }}
            </span>
          </volt-badge>
        </div>
        
        <h1 class="mb-5 text-4xl font-extrabold tracking-tight sm:mb-6 sm:text-5xl md:text-7xl" [move]="'fade-up'" [moveDelay]="100">
          Andersseen
          <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Stack</span>
        </h1>

        <p data-testid="hero-description" class="mx-auto mb-8 max-w-2xl text-base text-white/50 sm:mb-10 sm:text-lg md:text-xl leading-relaxed" [move]="'fade-up'" [moveDelay]="200">
          {{ 'home.description' | translate }}
        </p>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4" [move]="'fade-up'" [moveDelay]="300">
          <a routerLink="/volt-ui" class="w-full sm:w-auto">
            <volt-button variant="solid" size="lg" class="w-full sm:w-auto sm:min-w-[160px]">{{ 'home.cta.explore' | translate }}</volt-button>
          </a>
          <a href="https://github.com/Andersseen" target="_blank" rel="noopener" class="w-full sm:w-auto">
            <volt-button variant="outline" size="lg" class="w-full sm:w-auto sm:min-w-[160px]">
              <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              {{ 'home.cta.github' | translate }}
            </volt-button>
          </a>
        </div>

        <!-- Stats -->
        <div class="mt-12 grid grid-cols-2 gap-6 sm:mt-16 sm:gap-8 md:grid-cols-4" [move]="'fade-up'" [moveDelay]="400">
          @for (stat of stats; track stat.label) {
            <div class="text-center">
              <div class="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{{ stat.value }}</div>
              <div class="mt-1 text-sm text-white/55">{{ stat.label | translate }}</div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Library Cards Bento Grid -->
    <section class="px-4 py-14 sm:px-6 sm:py-16 md:py-24">
      <div class="mx-auto max-w-5xl">
        <div class="mb-12 text-center" [move]="'fade-up'">
          <h2 class="text-3xl font-bold md:text-4xl">{{ 'home.ecosystem.title' | translate }}</h2>
          <p class="mt-4 text-white/50">{{ 'home.ecosystem.subtitle' | translate }}</p>
        </div>

        <div class="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          <!-- Volt UI Card -->
          <a routerLink="/volt-ui" class="group relative block overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-1 transition-all duration-500 hover:border-blue-500/20 hover:bg-white/[0.04]"
             [move]="'fade-up'" [moveDelay]="100">
            <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent p-5 sm:p-6">
              <div class="absolute top-0 right-0 hidden p-4 opacity-20 transition-opacity group-hover:opacity-40 sm:block">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-blue-400"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <div class="relative z-10">
                <div class="mb-4 flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold">Volt UI</h3>
                    <p class="text-xs text-white/55">{{ 'home.ecosystem.volt.subtitle' | translate }}</p>
                  </div>
                </div>
                <p class="mb-6 text-sm leading-relaxed text-white/50">
                  {{ 'home.ecosystem.volt.description' | translate }}
                </p>
                <!-- Mini preview -->
                <div class="flex flex-wrap items-center gap-2">
                  <div class="rounded-md bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">Button</div>
                  <div class="rounded-md bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">Input</div>
                  <div class="rounded-md bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">Badge</div>
                  <div class="rounded-md bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">Card</div>
                </div>
              </div>
            </div>
          </a>

          <!-- Quartz Card -->
          <a routerLink="/quartz" class="group relative block overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-1 transition-all duration-500 hover:border-emerald-500/20 hover:bg-white/[0.04]"
             [move]="'fade-up'" [moveDelay]="200">
            <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent p-5 sm:p-6">
              <div class="absolute top-0 right-0 hidden p-4 opacity-20 transition-opacity group-hover:opacity-40 sm:block">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-emerald-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div class="relative z-10">
                <div class="mb-4 flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold">Quartz</h3>
                    <p class="text-xs text-white/55">{{ 'home.ecosystem.quartz.subtitle' | translate }}</p>
                  </div>
                </div>
                <p class="mb-6 text-sm leading-relaxed text-white/50">
                  {{ 'home.ecosystem.quartz.description' | translate }}
                </p>
                <div class="flex flex-wrap items-center gap-2">
                  <div class="rounded-md bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">Toast</div>
                  <div class="rounded-md bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">Dialog</div>
                  <div class="rounded-md bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">Tooltip</div>
                  <div class="rounded-md bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">Overlay</div>
                </div>
              </div>
            </div>
          </a>

          <!-- Angular Movement Card -->
          <a routerLink="/angular-movement" class="group relative block overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-1 transition-all duration-500 hover:border-amber-500/20 hover:bg-white/[0.04]"
             [move]="'fade-up'" [moveDelay]="300">
            <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/5 to-transparent p-5 sm:p-6">
              <div class="absolute top-0 right-0 hidden p-4 opacity-20 transition-opacity group-hover:opacity-40 sm:block">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-amber-400"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              </div>
              <div class="relative z-10">
                <div class="mb-4 flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold">Angular Movement</h3>
                    <p class="text-xs text-white/55">{{ 'home.ecosystem.movement.subtitle' | translate }}</p>
                  </div>
                </div>
                <p class="mb-6 text-sm leading-relaxed text-white/50">
                  {{ 'home.ecosystem.movement.description' | translate }}
                </p>
                <div class="flex flex-wrap items-center gap-2">
                  <div class="rounded-md bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">Fade</div>
                  <div class="rounded-md bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">Scale</div>
                  <div class="rounded-md bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">Rotate</div>
                  <div class="rounded-md bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">Spring</div>
                </div>
              </div>
            </div>
          </a>

          <!-- Lumen Icons Card -->
          <a routerLink="/lumen-icons" class="group relative block overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-1 transition-all duration-500 hover:border-sky-500/20 hover:bg-white/[0.04]"
             [move]="'fade-up'" [moveDelay]="400">
            <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-sky-500/5 to-transparent p-5 sm:p-6">
              <div class="absolute top-0 right-0 hidden p-4 opacity-20 transition-opacity group-hover:opacity-40 sm:block">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-sky-400"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              </div>
              <div class="relative z-10">
                <div class="mb-4 flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold">Lumen Icons</h3>
                    <p class="text-xs text-white/55">{{ 'home.ecosystem.lumen.subtitle' | translate }}</p>
                  </div>
                </div>
                <p class="mb-6 text-sm leading-relaxed text-white/50">
                  {{ 'home.ecosystem.lumen.description' | translate }}
                </p>
                <div class="flex flex-wrap items-center gap-2">
                  <div class="rounded-md bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-400">SVG</div>
                  <div class="rounded-md bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-400">Animated</div>
                  <div class="rounded-md bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-400">Accessible</div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="border-t border-white/5 px-4 py-14 sm:px-6 sm:py-16 md:py-24">
      <div class="mx-auto max-w-5xl text-center" [move]="'fade-up'">
        <h2 class="mb-4 text-2xl font-bold md:text-3xl">{{ 'home.tech.title' | translate }}</h2>
        <p class="mb-10 text-white/50">{{ 'home.tech.subtitle' | translate }}</p>
        
        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          @for (tech of techStack; track tech.name) {
            <div class="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
              <span class="text-lg">{{ tech.icon }}</span>
              <span class="text-sm font-medium text-white/70">{{ tech.name }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export default class HomePage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'seo.home.title',
      description: 'seo.home.description',
    });
  }

  readonly stats = [
    { value: '4', label: 'home.stats.libraries' },
    { value: '30+', label: 'home.stats.components' },
    { value: 'Angular 21', label: 'home.stats.latestVersion' },
    { value: '100%', label: 'home.stats.typescript' },
  ];

  readonly techStack = [
    { name: 'Angular 21', icon: '🅰️' },
    { name: 'AnalogJS', icon: '⚡' },
    { name: 'Tailwind CSS v4', icon: '🌊' },
    { name: 'Vite', icon: '⚡' },
    { name: 'WAAPI', icon: '🎬' },
    { name: 'View Transitions', icon: '🔄' },
  ];
}
