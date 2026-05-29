import { Component, input } from '@angular/core';

@Component({
  selector: 'app-demo-code-block',
  imports: [],
  template: `
    <pre class="overflow-x-auto rounded-lg bg-black/40 p-4 text-sm text-white/80"><code>{{ code() }}</code></pre>
  `,
})
export class DemoCodeBlockComponent {
  readonly code = input.required<string>();
}
