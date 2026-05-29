import { Component, inject } from '@angular/core';
import { VoltButton, VoltInput } from '@voltui/components';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import {
  DemoCardComponent,
  DemoCodeBlockComponent,
  DemoHeaderComponent,
  DemoLayoutComponent,
  DemoSectionComponent,
} from '../../components/demo';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-volt-ui-page',
  imports: [
    MOVEMENT_DIRECTIVES,
    VoltButton,
    VoltInput,
    DemoLayoutComponent,
    DemoHeaderComponent,
    DemoCardComponent,
    DemoSectionComponent,
    DemoCodeBlockComponent,
  ],
  template: `
    <app-demo-layout accentRgb="59 130 246">
      <app-demo-header
        title="Volt UI"
        description="Componentes UI estilizados con theming, variantes y accesibilidad."
        packageName="@voltui/components"
        githubUrl="https://github.com/Andersseen/volt-ui"
        demoUrl="https://volt-ui.andersseen.dev"
      />

      <app-demo-section>
        <app-demo-card [isDestination]="true" [delay]="100">
          <h3 class="mb-4 text-lg font-semibold">Buttons</h3>
          <div class="mb-4 flex flex-wrap gap-3">
            <volt-button variant="solid">Primary</volt-button>
            <volt-button variant="destructive">Destructive</volt-button>
            <volt-button variant="outline">Outline</volt-button>
            <volt-button variant="ghost">Ghost</volt-button>
          </div>
          <div class="flex flex-wrap gap-3">
            <volt-button variant="solid" size="sm">Small</volt-button>
            <volt-button variant="solid" size="md">Medium</volt-button>
            <volt-button variant="solid" size="lg">Large</volt-button>
          </div>
        </app-demo-card>

        <app-demo-card [delay]="200">
          <h3 class="mb-4 text-lg font-semibold">Input</h3>
          <div class="space-y-4">
            <volt-input placeholder="Type something..." class="w-full max-w-sm" />
            <volt-input placeholder="Disabled input" class="w-full max-w-sm" />
          </div>
        </app-demo-card>

        <app-demo-card [delay]="300">
          <h3 class="mb-4 text-lg font-semibold">Theming</h3>
          <p class="mb-4 text-sm text-white/60">
            Volt UI soporta múltiples colores de tema y estilos. Configúralo globalmente con
            <code>provideVoltTheme()</code>.
          </p>
          <app-demo-code-block [code]="themeExample" />
        </app-demo-card>
      </app-demo-section>
    </app-demo-layout>
  `,
})
export default class VoltUiPage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Volt UI',
      description: 'Componentes UI estilizados y accesibles para Angular. Theming, variantes y CLI propio.',
    });
  }

  readonly themeExample = `provideVoltTheme({
  color: 'volt',    // volt | emerald | amber | rose | sky
  style: 'soft',    // soft | solid | outline
  dark: true
})`;
}
