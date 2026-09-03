import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VoltButton } from '@voltui/components';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, VoltButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p class="text-sm font-medium text-muted-foreground">404</p>
      <h1 class="text-2xl font-semibold text-foreground">Page not found</h1>
      <p class="text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
      <a routerLink="/dashboard">
        <volt-button type="button">Back to dashboard</volt-button>
      </a>
    </div>
  `,
})
export default class NotFoundPage {}
