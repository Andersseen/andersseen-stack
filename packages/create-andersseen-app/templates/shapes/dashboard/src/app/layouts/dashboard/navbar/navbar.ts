import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarTriggerDirective } from '@quartz-headless/primitives';
import { LmnBars3Icon } from 'lumen-icons/bars-3';
import { filter, map } from 'rxjs';
import { DASHBOARD_NAV_ITEMS } from '../navigation';

@Component({
  selector: 'app-dashboard-navbar',
  imports: [SidebarTriggerDirective, LmnBars3Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface px-4 md:px-6">
      <button
        type="button"
        qzSidebarTrigger
        class="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
        aria-label="Toggle navigation"
      >
        <lmn-bars-3 [size]="20" aria-hidden="true" />
      </button>

      <p class="truncate text-sm font-medium text-foreground">{{ activeLabel() }}</p>

      <div class="ml-auto flex items-center gap-2"></div>
    </header>
  `,
})
export class DashboardNavbar {
  private readonly router = inject(Router);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  protected readonly activeLabel = computed(() => {
    const current = this.url();
    return (
      DASHBOARD_NAV_ITEMS.find((item) => current === item.route || current.startsWith(`${item.route}/`))?.label ?? 'Dashboard'
    );
  });
}
