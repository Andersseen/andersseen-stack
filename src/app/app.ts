import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { StackNavComponent } from './components/stack-nav/stack-nav.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StackNavComponent, FooterComponent],
  styles: [
    `
      /* Sticky-footer column: <main> absorbs the slack, so the footer sits at the
         bottom of the viewport on short pages and after the content on long ones —
         never at a position that shifts from route to route. */
      :host {
        display: flex;
        min-height: 100dvh;
        flex-direction: column;
      }
    `,
  ],
  template: `
    <app-stack-nav />
    <main class="flex-1 bg-[var(--background)]">
      <router-outlet />
    </main>
    @if (routeActivated()) {
      <app-footer />
    }
  `,
})
export class AppComponent {
  private readonly router = inject(Router);

  /**
   * Routes are lazy chunks, so the shell would otherwise paint with an empty
   * <main>, parking the footer mid-viewport until the content arrived and shoved
   * it down — a 0.34 layout shift. Holding the footer back until the first
   * navigation completes means it and the content paint together.
   */
  protected readonly routeActivated = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => true)
    ),
    { initialValue: false }
  );
}
