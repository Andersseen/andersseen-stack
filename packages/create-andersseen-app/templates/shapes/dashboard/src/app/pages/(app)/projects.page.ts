import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-projects-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-2">
      <h1 class="text-2xl font-semibold text-foreground">Projects</h1>
      <p class="text-sm text-muted-foreground">Your product-specific project experience starts here.</p>
    </div>
  `,
})
export default class ProjectsPage {}
