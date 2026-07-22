import { ChangeDetectionStrategy, Component, Directive, DOCUMENT, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  injectDialogRef,
  VoltDrawer,
  VoltDrawerContent,
  VoltDrawerOverlay,
  VoltDrawerTitle,
} from '@voltui/components';
import { GithubIconComponent } from '../github-icon.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

/**
 * Closes the surrounding drawer when the host is activated. Needed because
 * router navigation leaves the dialog open on its own.
 */
@Directive({
  selector: '[appDrawerDismiss]',
  host: {
    '(click)': 'dismiss()',
  },
})
export class DrawerDismissDirective {
  private readonly dialogRef = injectDialogRef();

  protected dismiss(): void {
    // Resolves once the exit animation finishes; nothing here depends on that.
    void this.dialogRef.close();
  }
}

@Component({
  selector: 'app-stack-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    GithubIconComponent,
    LanguageSwitcherComponent,
    TranslatePipe,
    VoltDrawer,
    VoltDrawerOverlay,
    VoltDrawerContent,
    VoltDrawerTitle,
    DrawerDismissDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    <ng-template #mobileMenu>
      <div voltDrawerOverlay class="app-drawer-scrim backdrop-blur-sm"></div>
      <!-- ng-primitives assigns its own id, so tests hook onto data-testid. -->
      <div
        voltDrawerContent
        side="right"
        data-testid="mobile-menu"
        class="app-drawer-panel flex w-[300px] max-w-[85vw] flex-col border-l border-white/10"
      >
        <div class="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 voltDrawerTitle class="text-sm font-semibold tracking-wider text-white/50 uppercase">
            {{ 'nav.menuTitle' | translate }}
          </h2>
          <button
            type="button"
            appDrawerDismiss
            [attr.aria-label]="'nav.closeMenu' | translate"
            class="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/60 transition hover:bg-white/10 hover:text-white"
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
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex flex-1 flex-col gap-1 overflow-y-auto p-3 text-sm font-medium">
          @for (link of links; track link.path) {
            <a
              appDrawerDismiss
              [routerLink]="link.path"
              routerLinkActive="nav-link-active"
              [routerLinkActiveOptions]="{ exact: false }"
              class="nav-link rounded-lg px-3 py-3 transition-all"
              >{{ link.label }}</a
            >
          }
        </div>

        <div class="border-t border-white/10 p-3">
          <a
            appDrawerDismiss
            href="https://github.com/Andersseen"
            target="_blank"
            rel="noopener"
            class="nav-link flex items-center gap-2.5 rounded-lg px-3 py-3 text-sm font-medium transition-all"
          >
            <app-github-icon [size]="18" />
            <span>{{ 'nav.githubAriaLabel' | translate }}</span>
          </a>
        </div>
      </div>
    </ng-template>

    <nav class="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div class="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <a
          routerLink="/"
          class="flex min-w-0 items-center gap-2 text-base font-bold tracking-tight sm:gap-2.5 sm:text-lg lg:text-xl"
        >
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
            [voltDrawer]="mobileMenu"
            (click)="lockScroll()"
            (closed)="unlockScroll()"
            [attr.aria-label]="'nav.openMenu' | translate"
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
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

  `,
})
export class StackNavComponent {
  private readonly document = inject(DOCUMENT);

  protected readonly links = [
    { path: '/volt-ui', label: 'Volt UI' },
    { path: '/quartz', label: 'Quartz' },
    { path: '/angular-movement', label: 'Movement' },
    { path: '/lumen-icons', label: 'Lumen' },
  ];

  protected lockScroll(): void {
    this.document.documentElement.classList.add('drawer-open');
  }

  protected unlockScroll(): void {
    this.document.documentElement.classList.remove('drawer-open');
  }
}
