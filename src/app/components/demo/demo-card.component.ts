import { Component, input } from '@angular/core';
import { VoltCard } from '@voltui/components';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';

@Component({
  selector: 'app-demo-card',
  imports: [VoltCard, MOVEMENT_DIRECTIVES],
  template: `
    <volt-card [class]="cardClass()" [move]="'fade-up'" [moveDelay]="delay()">
      <ng-content />
    </volt-card>
  `,
})
export class DemoCardComponent {
  readonly delay = input<number>(100);
  readonly isDestination = input<boolean>(false);

  protected cardClass(): string {
    const base = 'p-6';
    return this.isDestination() ? `vt-destination-card ${base}` : base;
  }
}
