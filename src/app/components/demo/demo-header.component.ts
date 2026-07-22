import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { GithubIconComponent } from '../github-icon.component';

@Component({
  selector: 'app-demo-header',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, GithubIconComponent, TranslatePipe],
  template: `
    <div class="mb-8" [move]="'fade-up'">
      <a routerLink="/" class="text-sm text-white/50 transition-colors hover:text-white">{{ 'common.back' | translate }}</a>
      <h1 class="mt-4 mb-2 text-3xl font-bold sm:text-4xl">{{ title() }}</h1>
      <p class="text-white/60">{{ description() }}</p>

      <div class="mt-6 flex flex-wrap items-center gap-3">
        @if (packageName(); as pkg) {
          <div
            class="flex max-w-full items-center gap-2 overflow-x-auto rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-white/70"
          >
            <span class="text-white/40">$</span>
            <span class="whitespace-nowrap">npm install {{ pkg }}</span>
          </div>
        }
        @if (githubUrl(); as url) {
          <a
            [href]="url"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <app-github-icon [size]="16" />
            {{ 'common.github' | translate }}
          </a>
        }
        @if (demoUrl(); as url) {
          <a
            [href]="url"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {{ 'common.liveDemo' | translate }}
            <span>→</span>
          </a>
        }
      </div>
    </div>
  `,
})
export class DemoHeaderComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly packageName = input<string>();
  readonly githubUrl = input<string>();
  readonly demoUrl = input<string>();
}
