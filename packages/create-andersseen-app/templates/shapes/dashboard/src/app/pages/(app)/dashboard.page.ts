import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VoltCard, VoltCardDescription, VoltCardHeader, VoltCardTitle } from '@voltui/components';

@Component({
  selector: 'app-dashboard-page',
  imports: [VoltCard, VoltCardHeader, VoltCardTitle, VoltCardDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header>
        <h1 class="text-2xl font-semibold text-foreground">Build your product</h1>
        <p class="mt-1 text-sm text-muted-foreground">
          Start building your product. This dashboard is ready for your own screens.
        </p>
      </header>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <volt-card class="p-4">
          <volt-card-header>
            <volt-card-title>Build your product</volt-card-title>
            <volt-card-description>Replace this page with your first real screen.</volt-card-description>
          </volt-card-header>
        </volt-card>

        <volt-card class="p-4">
          <volt-card-header>
            <volt-card-title>Connect your data</volt-card-title>
            <volt-card-description>Wire this shell up to your own API or data source.</volt-card-description>
          </volt-card-header>
        </volt-card>

        <volt-card class="p-4">
          <volt-card-header>
            <volt-card-title>Customize this workspace</volt-card-title>
            <volt-card-description>Sidebar, navbar and routing are already wired up.</volt-card-description>
          </volt-card-header>
        </volt-card>
      </div>
    </div>
  `,
})
export default class DashboardPage {}
