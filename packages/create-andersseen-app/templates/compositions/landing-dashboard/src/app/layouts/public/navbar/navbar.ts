import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarDirective, NavbarMenuDirective, NavbarTriggerDirective } from '@quartz-headless/primitives';
import { buttonVariants } from '@voltui/components';
import { LmnBars3Icon } from 'lumen-icons/bars-3';
import { LmnXMarkIcon } from 'lumen-icons/x-mark';

@Component({
  selector: 'app-public-navbar',
  imports: [RouterLink, NavbarDirective, NavbarMenuDirective, NavbarTriggerDirective, LmnBars3Icon, LmnXMarkIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header qzNavbar #nav="qzNavbar" class="border-b border-border bg-surface">
      <div class="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-6">
        <a routerLink="/" class="text-sm font-semibold text-foreground">__PROJECT_NAME__</a>

        <nav class="hidden items-center gap-6 md:flex" aria-label="Primary">
          <a href="#features" class="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
        </nav>

        <div class="hidden md:block">
          <a routerLink="/dashboard" [class]="ctaClass">Open dashboard</a>
        </div>

        <button
          type="button"
          qzNavbarTrigger
          class="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          @if (nav.menuOpen()) {
            <lmn-x-mark [size]="20" aria-hidden="true" />
          } @else {
            <lmn-bars-3 [size]="20" aria-hidden="true" />
          }
        </button>
      </div>

      <div qzNavbarMenu class="border-t border-border md:hidden">
        <nav class="flex flex-col gap-1 px-6 py-4" aria-label="Primary">
          <a
            href="#features"
            class="rounded-md px-2.5 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Features
          </a>
          <a routerLink="/dashboard" [class]="ctaClass + ' mt-2 justify-center'">Open dashboard</a>
        </nav>
      </div>
    </header>
  `,
})
export class PublicNavbar {
  protected readonly ctaClass = buttonVariants({ size: 'sm' });
}
