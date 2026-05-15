import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stack-nav',
  imports: [RouterLink],
  template: `
    <nav class="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
      <a routerLink="/" class="text-xl font-bold tracking-tight flex items-center gap-2">
        <span class="text-[var(--volt-primary)] text-2xl">◈</span>
        <span>Andersseen Stack</span>
      </a>
      <div class="flex items-center gap-6 text-sm font-medium">
        <a routerLink="/volt-ui" class="hover:text-[var(--volt-primary)] transition-colors">Volt UI</a>
        <a routerLink="/quartz" class="hover:text-[var(--volt-primary)] transition-colors">Quartz</a>
        <a routerLink="/angular-movement" class="hover:text-[var(--volt-primary)] transition-colors">Movement</a>
        <a routerLink="/lumen-icons" class="hover:text-[var(--volt-primary)] transition-colors">Lumen</a>
      </div>
    </nav>
  `,
})
export class StackNavComponent {}
