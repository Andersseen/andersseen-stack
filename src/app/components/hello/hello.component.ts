import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hello',
  imports: [],
  template: `<h1 data-testid="greeting">Hello, {{ name() }}!</h1>`,
})
export class HelloComponent {
  readonly name = input<string>('World');
}
