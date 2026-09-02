import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-section',
  imports: [],
  template: `
    <section class="space-y-8">
      <ng-content />
    </section>
  `,
})
export class DemoSectionComponent {}
