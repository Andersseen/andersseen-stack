import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PublicFooter } from './footer/footer';
import { PublicNavbar } from './navbar/navbar';

@Component({
  selector: 'app-public-layout',
  imports: [PublicNavbar, PublicFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-dvh flex-col bg-background text-foreground">
      <app-public-navbar />
      <main class="flex-1">
        <ng-content />
      </main>
      <app-public-footer />
    </div>
  `,
})
export class PublicLayout {}
