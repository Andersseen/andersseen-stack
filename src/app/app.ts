import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StackNavComponent } from './components/stack-nav/stack-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StackNavComponent],
  template: `
    <app-stack-nav />
    <main class="min-h-screen bg-[var(--background)]">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {}
