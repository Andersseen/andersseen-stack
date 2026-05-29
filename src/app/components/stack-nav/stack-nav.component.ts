import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GithubIconComponent } from '../github-icon.component';

@Component({
  selector: 'app-stack-nav',
  imports: [RouterLink, RouterLinkActive, GithubIconComponent],
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
          <app-github-icon [size]="18" />
        </a>
      </div>
    </nav>
  `,
})
export class StackNavComponent {}
