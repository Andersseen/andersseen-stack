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
      <a routerLink="/" class="flex items-center gap-2 text-xl font-bold tracking-tight">
        <span class="text-2xl text-[var(--primary)]">◈</span>
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
      </div>
    </nav>
  `,
})
export class StackNavComponent {}
