import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { GithubIconComponent } from '../github-icon.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-stack-nav',
  imports: [RouterLink, RouterLinkActive, GithubIconComponent, LanguageSwitcherComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'close()',
  },
  styles: [
    `
      .nav-link {
        color: rgba(255, 255, 255, 0.7);
      }
      .nav-link:hover {
        color: var(--primary);
      }
      .nav-link-active {
        color: var(--primary);
        background-color: rgba(255, 255, 255, 0.05);
      }
    `,
  ],
  template: `
    <nav class="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div class="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <a routerLink="/" class="flex min-w-0 items-center gap-2 text-base font-bold tracking-tight sm:gap-2.5 sm:text-lg lg:text-xl">
          <img src="/logo.svg" [alt]="'nav.logoAlt' | translate" class="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
          <span class="truncate whitespace-nowrap">Andersseen Stack</span>
        </a>

        <div class="flex shrink-0 items-center gap-1 sm:gap-2">
          <!-- Desktop links -->
          <div class="hidden items-center gap-1 text-sm font-medium md:flex">
            @for (link of links; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="nav-link-active"
                [routerLinkActiveOptions]="{ exact: false }"
                class="nav-link rounded-md px-3 py-1.5 transition-all"
                >{{ link.label }}</a
              >
            }
            <a
              href="https://github.com/Andersseen"
              target="_blank"
              rel="noopener"
              class="nav-link ml-1 rounded-md px-3 py-1.5 transition-all"
              [attr.aria-label]="'nav.githubAriaLabel' | translate"
            >
              <app-github-icon [size]="18" />
            </a>
          </div>

          <app-language-switcher />

          <button
            type="button"
            (click)="toggle()"
            [attr.aria-expanded]="isOpen()"
            aria-controls="mobile-menu"
            [attr.aria-label]="(isOpen() ? 'nav.closeMenu' : 'nav.openMenu') | translate"
            class="nav-link inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 transition hover:bg-white/10 md:hidden"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              @if (isOpen()) {
                <path d="M18 6 6 18M6 6l12 12" />
              } @else {
                <path d="M3 6h18M3 12h18M3 18h18" />
              }
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      @if (isOpen()) {
        <div
          id="mobile-menu"
          class="border-t border-white/10 bg-black/80 px-4 pt-2 pb-4 backdrop-blur-md md:hidden"
        >
          <div class="flex flex-col gap-1 text-sm font-medium">
            @for (link of links; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="nav-link-active"
                [routerLinkActiveOptions]="{ exact: false }"
                class="nav-link rounded-md px-3 py-2.5 transition-all"
                >{{ link.label }}</a
              >
            }
            <a
              href="https://github.com/Andersseen"
              target="_blank"
              rel="noopener"
              class="nav-link flex items-center gap-2 rounded-md px-3 py-2.5 transition-all"
            >
              <app-github-icon [size]="18" />
              <span>{{ 'nav.githubAriaLabel' | translate }}</span>
            </a>
          </div>
        </div>
      }
    </nav>
  `,
})
export class StackNavComponent {
  private readonly router = inject(Router);

  protected readonly isOpen = signal(false);

  protected readonly links = [
    { path: '/volt-ui', label: 'Volt UI' },
    { path: '/quartz', label: 'Quartz' },
    { path: '/angular-movement', label: 'Movement' },
    { path: '/lumen-icons', label: 'Lumen' },
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.close());
  }

  protected toggle(): void {
    this.isOpen.update((open) => !open);
  }

  protected close(): void {
    this.isOpen.set(false);
  }
}
