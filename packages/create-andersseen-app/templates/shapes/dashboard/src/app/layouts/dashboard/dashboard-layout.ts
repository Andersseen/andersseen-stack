import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarContentDirective, SidebarDirective, SidebarPanelDirective } from '@quartz-headless/primitives';
import { DashboardNavbar } from './navbar/navbar';
import { DashboardSidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, SidebarDirective, SidebarPanelDirective, SidebarContentDirective, DashboardSidebar, DashboardNavbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div qzSidebar class="h-dvh bg-background text-foreground">
      <aside qzSidebarPanel class="flex flex-col border-e border-border bg-surface">
        <app-dashboard-sidebar />
      </aside>
      <div qzSidebarContent class="flex h-dvh min-h-0 flex-col">
        <app-dashboard-navbar />
        <main class="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class DashboardLayout {}
