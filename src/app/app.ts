import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StackNavComponent } from './components/stack-nav/stack-nav.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StackNavComponent, FooterComponent],
  template: `
    <app-stack-nav />
    <main class="min-h-screen bg-[var(--background)]">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class AppComponent {}
