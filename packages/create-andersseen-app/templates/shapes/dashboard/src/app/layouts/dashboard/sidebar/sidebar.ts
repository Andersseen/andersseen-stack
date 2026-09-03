import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarDirective } from '@quartz-headless/primitives';
import { VoltTooltip } from '@voltui/components';
import { LmnChevronDoubleLeftIcon } from 'lumen-icons/chevron-double-left';
import { LmnChevronDoubleRightIcon } from 'lumen-icons/chevron-double-right';
import { LmnCog6ToothIcon } from 'lumen-icons/cog-6-tooth';
import { LmnFolderIcon } from 'lumen-icons/folder';
import { LmnSquares2x2Icon } from 'lumen-icons/squares-2x2';
import { DASHBOARD_NAVIGATION } from '../navigation';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    VoltTooltip,
    LmnChevronDoubleLeftIcon,
    LmnChevronDoubleRightIcon,
    LmnCog6ToothIcon,
    LmnFolderIcon,
    LmnSquares2x2Icon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a routerLink="/dashboard" aria-label="Andersseen App" class="flex items-center gap-2 px-3 py-4">
      <span
        class="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground"
        aria-hidden="true"
      >
        A
      </span>
      @if (!sidebar.collapsed()) {
        <span class="truncate text-sm font-semibold" aria-hidden="true">Andersseen App</span>
      }
    </a>

    <nav class="flex-1 overflow-y-auto px-2 pb-2" aria-label="Primary">
      @for (group of navigation; track group.label) {
        <div class="mb-4">
          @if (!sidebar.collapsed()) {
            <p class="px-2.5 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {{ group.label }}
            </p>
          }
          <ul class="flex flex-col gap-1">
            @for (item of group.items; track item.route) {
              <li>
                <a
                  [routerLink]="item.route"
                  routerLinkActive
                  #rla="routerLinkActive"
                  [ariaCurrentWhenActive]="'page'"
                  [voltTooltip]="sidebar.collapsed() ? item.label : null"
                  placement="right"
                  [class]="
                    'flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground ' +
                    (rla.isActive ? 'bg-muted text-foreground' : 'text-muted-foreground')
                  "
                >
                  @switch (item.icon) {
                    @case ('dashboard') {
                      <lmn-squares-2x2 [size]="18" class="shrink-0" aria-hidden="true" />
                    }
                    @case ('projects') {
                      <lmn-folder [size]="18" class="shrink-0" aria-hidden="true" />
                    }
                    @case ('settings') {
                      <lmn-cog-6-tooth [size]="18" class="shrink-0" aria-hidden="true" />
                    }
                  }
                  <span [class]="sidebar.collapsed() ? 'sr-only' : 'truncate'">{{ item.label }}</span>
                </a>
              </li>
            }
          </ul>
        </div>
      }
    </nav>

    <div class="border-t border-border p-2">
      <button
        type="button"
        class="hidden w-full items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:inline-flex"
        [attr.aria-label]="sidebar.collapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
        (click)="toggleCollapsed()"
      >
        @if (sidebar.collapsed()) {
          <lmn-chevron-double-right [size]="16" aria-hidden="true" />
        } @else {
          <lmn-chevron-double-left [size]="16" aria-hidden="true" />
        }
      </button>
    </div>
  `,
})
export class DashboardSidebar {
  protected readonly sidebar = inject(SidebarDirective);
  protected readonly navigation = DASHBOARD_NAVIGATION;

  protected toggleCollapsed(): void {
    if (this.sidebar.collapsed()) {
      this.sidebar.expand();
    } else {
      this.sidebar.collapse();
    }
  }
}
