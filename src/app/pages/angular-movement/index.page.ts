import { Component, inject } from '@angular/core';
import { VoltButton } from '@voltui/components';
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
  selector: 'app-movement-page',
  imports: [
    MOVEMENT_DIRECTIVES,
    VoltButton,
    DemoLayoutComponent,
    DemoHeaderComponent,
    DemoCardComponent,
    DemoSectionComponent,
    DemoCodeBlockComponent,
  ],
  template: `
    <app-demo-layout accentRgb="245 158 11">
      <app-demo-header
        title="Angular Movement"
        description="Animaciones declarativas con WAAPI y springs."
        packageName="angular-movement"
        githubUrl="https://github.com/Andersseen/angular-movement"
        demoUrl="https://angular-movement.andersseen.dev"
      />

      <app-demo-section>
        <app-demo-card [isDestination]="true" [delay]="100">
          <h3 class="mb-4 text-lg font-semibold">Entrance Animations</h3>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div
              class="flex h-20 items-center justify-center rounded-lg bg-[var(--primary)]/20"
              [move]="'fade-up'"
            >
              fade-up
            </div>
            <div
              class="flex h-20 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400"
              [move]="'fade-down'"
              [moveDelay]="100"
            >
              fade-down
            </div>
            <div
              class="flex h-20 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400"
              [move]="'fade-left'"
              [moveDelay]="200"
            >
              fade-left
            </div>
            <div
              class="flex h-20 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400"
              [move]="'fade-right'"
              [moveDelay]="300"
            >
              fade-right
            </div>
          </div>
        </app-demo-card>

        <app-demo-card [delay]="200">
          <h3 class="mb-4 text-lg font-semibold">Hover & Tap</h3>
          <div class="flex flex-wrap gap-4">
            <volt-button variant="solid" [moveWhileHover]="hoverScale">Scale Hover</volt-button>
            <volt-button variant="outline" [moveWhileTap]="tapScale">Tap Me</volt-button>
            <div
              class="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/30"
              [moveWhileHover]="hoverRotate"
            >
              <span class="text-xl">↻</span>
            </div>
          </div>
        </app-demo-card>

        <app-demo-card [delay]="300">
          <h3 class="mb-4 text-lg font-semibold">In View</h3>
          <p class="mb-4 text-sm text-white/60">
            Scroll down para ver animaciones trigger al entrar en viewport.
          </p>
          <div class="space-y-4 overflow-hidden">
            @for (item of items; track item.id) {
              <div
                class="flex h-16 items-center rounded-lg bg-white/5 px-4"
                [moveInView]="'fade-up'"
                [moveDelay]="item.delay"
              >
                {{ item.label }}
              </div>
            }
          </div>
        </app-demo-card>

        <app-demo-card [delay]="400">
          <h3 class="mb-4 text-lg font-semibold">Setup</h3>
          <app-demo-code-block [code]="setupExample" />
        </app-demo-card>
      </app-demo-section>
    </app-demo-layout>
  `,
})
export default class MovementPage {
  private readonly seo = inject(SeoService);
  constructor() {
    this.seo.update({
      title: 'Angular Movement',
      description: 'Sistema declarativo de animaciones para Angular con WAAPI y springs. Scroll, hover, parallax y presencia.',
    });
  }

  readonly hoverScale = { scale: [1, 1.1] as [number, number] };
  readonly tapScale = { scale: [0.95, 1] as [number, number] };
  readonly hoverRotate = { rotate: [0, 15] as [number, number] };

  readonly items = [
    { id: 1, label: 'Item 1', delay: 100 },
    { id: 2, label: 'Item 2', delay: 200 },
    { id: 3, label: 'Item 3', delay: 300 },
  ];

  readonly setupExample = `import { provideMovement } from 'angular-movement';

providers: [
  provideMovement({
    duration: 320,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
  })
]`;
}
