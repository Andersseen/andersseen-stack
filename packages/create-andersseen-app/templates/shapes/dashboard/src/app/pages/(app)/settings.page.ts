import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-2">
      <h1 class="text-2xl font-semibold text-foreground">Settings</h1>
      <p class="text-sm text-muted-foreground">Workspace settings for your product will live here.</p>
    </div>
  `,
})
export default class SettingsPage {}
