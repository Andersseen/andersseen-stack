import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe],
  template: `
    <footer class="border-t border-white/5 bg-black/30 px-4 py-10 sm:px-6 sm:py-12">
      <div class="mx-auto max-w-5xl">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-3">
          <!-- Brand -->
          <div>
            <a routerLink="/" class="flex items-center gap-2 text-lg font-bold">
              <img src="/logo.svg" alt="" class="h-6 w-6" />
              <span>Andersseen Stack</span>
            </a>
            <p class="mt-3 text-sm text-white/40 leading-relaxed">
              {{ 'footer.brandDescription' | translate }}
            </p>
          </div>

          <!-- Libraries -->
          <div>
            <h4 class="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">{{ 'footer.librariesTitle' | translate }}</h4>
            <ul class="space-y-2.5">
              <li><a routerLink="/volt-ui" class="text-sm text-white/50 transition-colors hover:text-white">Volt UI</a></li>
              <li><a routerLink="/quartz" class="text-sm text-white/50 transition-colors hover:text-white">Quartz</a></li>
              <li><a routerLink="/angular-movement" class="text-sm text-white/50 transition-colors hover:text-white">Angular Movement</a></li>
              <li><a routerLink="/lumen-icons" class="text-sm text-white/50 transition-colors hover:text-white">Lumen Icons</a></li>
            </ul>
          </div>

          <!-- Links -->
          <div>
            <h4 class="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">{{ 'footer.linksTitle' | translate }}</h4>
            <ul class="space-y-2.5">
              <li>
                <a href="https://github.com/Andersseen" target="_blank" rel="noopener" class="text-sm text-white/50 transition-colors hover:text-white">{{ 'footer.github' | translate }}</a>
              </li>
              <li>
                <a href="https://npmjs.com/~andersseen" target="_blank" rel="noopener" class="text-sm text-white/50 transition-colors hover:text-white">{{ 'footer.npm' | translate }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p class="text-center text-xs text-white/30 sm:text-left">{{ 'footer.copyright' | translate: { year: year } }}</p>
          <div class="flex items-center gap-4">
            <a href="https://github.com/Andersseen" target="_blank" rel="noopener" class="text-white/30 transition-colors hover:text-white/60" [attr.aria-label]="'nav.githubAriaLabel' | translate">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
