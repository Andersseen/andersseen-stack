import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StackNavComponent } from './components/stack-nav/stack-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StackNavComponent],
  template: `
    <app-stack-nav />
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {}
