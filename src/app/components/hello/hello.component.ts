import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hello',
  imports: [TranslatePipe],
  template: `<h1 data-testid="greeting">{{ 'hello.greeting' | translate: { name: name() } }}</h1>`,
})
export class HelloComponent {
  readonly name = input<string>('World');
}
