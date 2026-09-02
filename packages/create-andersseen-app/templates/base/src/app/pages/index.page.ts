import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { VoltButton } from '@voltui/components';
import { LmnSparklesIcon } from 'lumen-icons/sparkles';

@Component({
  selector: 'app-home-page',
  imports: [VoltButton, LmnSparklesIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-6 py-8">
      <header class="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <a class="text-sm font-semibold tracking-wide" href="/">Andersseen App</a>
        <span class="text-sm text-[var(--muted-foreground)]">Analog + Angular</span>
      </header>

      <section class="grid flex-1 place-items-center py-16">
        <div class="max-w-2xl text-center">
          <lmn-sparkles class="mx-auto mb-6 size-10 text-[var(--primary)]" aria-hidden="true" />
          <h1 class="text-4xl font-semibold">Your application is ready.</h1>
          <p class="mx-auto mt-4 max-w-xl text-lg text-[var(--muted-foreground)]">
            Start with a clean Analog app configured for the Andersseen Stack baseline.
          </p>
          <volt-button class="mt-8" type="button" (click)="markStarted()">
            Start building
          </volt-button>

          @if (started()) {
            <p class="mt-4 text-sm font-medium text-[var(--primary)]">Ready when you are.</p>
          }
        </div>
      </section>
    </main>
  `,
})
export default class HomePage {
  protected readonly started = signal(false);

  protected markStarted(): void {
    this.started.set(true);
  }
}
