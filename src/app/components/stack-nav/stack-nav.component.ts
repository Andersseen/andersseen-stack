import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-stack-nav',
  imports: [RouterLink, RouterLinkActive],
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
    <nav
      class="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/50 px-6 py-4 backdrop-blur-md"
    >
      <a routerLink="/" class="flex items-center gap-2.5 text-xl font-bold tracking-tight">
        <img src="/logo.svg" alt="Andersseen Stack" class="h-7 w-7 text-[var(--primary)]" />
        <span>Andersseen Stack</span>
      </a>
      <div class="flex items-center gap-1 text-sm font-medium">
        <a
          routerLink="/volt-ui"
          routerLinkActive="nav-link-active"
          [routerLinkActiveOptions]="{ exact: false }"
          class="nav-link rounded-md px-3 py-1.5 transition-all"
          >Volt UI</a
        >
        <a
          routerLink="/quartz"
          routerLinkActive="nav-link-active"
          [routerLinkActiveOptions]="{ exact: false }"
          class="nav-link rounded-md px-3 py-1.5 transition-all"
          >Quartz</a
        >
        <a
          routerLink="/angular-movement"
          routerLinkActive="nav-link-active"
          [routerLinkActiveOptions]="{ exact: false }"
          class="nav-link rounded-md px-3 py-1.5 transition-all"
          >Movement</a
        >
        <a
          routerLink="/lumen-icons"
          routerLinkActive="nav-link-active"
          [routerLinkActiveOptions]="{ exact: false }"
          class="nav-link rounded-md px-3 py-1.5 transition-all"
          >Lumen</a
        >
        <a
          href="https://github.com/Andersseen"
          target="_blank"
          rel="noopener"
          class="nav-link ml-2 rounded-md px-3 py-1.5 transition-all"
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            />
          </svg>
        </a>
      </div>
    </nav>
  `,
})
export class StackNavComponent {}
