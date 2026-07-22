import { Component, inject } from '@angular/core';
import { VoltButton, VoltInput, VoltBadge, VoltCard } from '@voltui/components';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { TranslatePipe } from '@ngx-translate/core';
import {
  DemoCardComponent,
  DemoHeaderComponent,
  DemoLayoutComponent,
  DemoSectionComponent,
} from '../../components/demo';
import { VertexEditorComponent } from '../../components/vertex-editor/vertex-editor.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-volt-ui-page',
  imports: [
    MOVEMENT_DIRECTIVES,
    VoltButton,
    VoltInput,
    VoltBadge,
    VoltCard,
    DemoLayoutComponent,
    DemoHeaderComponent,
    DemoCardComponent,
    DemoSectionComponent,
    VertexEditorComponent,
    TranslatePipe,
  ],
  template: `
    <app-demo-layout accentRgb="59 130 246">
      <app-demo-header
        [title]="'volt.title' | translate"
        [description]="'volt.description' | translate"
        packageName="@voltui/components"
        githubUrl="https://github.com/Andersseen/volt-ui"
        demoUrl="https://volt-ui.andersseen.dev"
      />

      <app-demo-section>
        <app-demo-card [isDestination]="true" [delay]="100">
          <h3 class="mb-4 text-lg font-semibold">{{ 'volt.demo.buttons' | translate }}</h3>
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
          <h3 class="mb-4 text-lg font-semibold">{{ 'volt.demo.input' | translate }}</h3>
          <div class="space-y-4">
            <volt-input placeholder="Type something..." class="w-full max-w-sm" />
            <volt-input placeholder="Disabled input" class="w-full max-w-sm" />
          </div>
        </app-demo-card>

        <app-demo-card [delay]="300">
          <h3 class="mb-4 text-lg font-semibold">{{ 'volt.demo.badges' | translate }}</h3>
          <div class="flex flex-wrap gap-3">
            <volt-badge>Default</volt-badge>
            <volt-badge variant="secondary">Secondary</volt-badge>
            <volt-badge variant="outline">Outline</volt-badge>
            <volt-badge variant="destructive">Destructive</volt-badge>
          </div>
        </app-demo-card>

        <app-demo-card [delay]="400">
          <h3 class="mb-4 text-lg font-semibold">{{ 'volt.demo.card' | translate }}</h3>
          <volt-card class="max-w-sm p-5">
            <h4 class="mb-1 font-semibold">{{ 'volt.demo.cardTitle' | translate }}</h4>
            <p class="text-sm text-white/50">{{ 'volt.demo.cardDescription' | translate }}</p>
          </volt-card>
        </app-demo-card>

        <app-demo-card [delay]="500">
          <h3 class="mb-4 text-lg font-semibold">{{ 'volt.demo.theming' | translate }}</h3>
          <p class="mb-4 text-sm text-white/60">
            {{ 'volt.demo.themingDescription' | translate }}
          </p>
          <app-vertex-editor [code]="themeExample" language="typescript" height="160px" />
        </app-demo-card>
      </app-demo-section>
    </app-demo-layout>
  `,
})
export default class VoltUiPage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'seo.volt.title',
      description: 'seo.volt.description',
    });
  }

  readonly themeExample = `provideVoltTheme({
  color: 'volt',    // volt | emerald | amber | rose | sky
  style: 'soft',    // soft | solid | outline
  dark: true
})`;
}
