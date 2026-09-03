import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { buttonVariants } from '@voltui/components';
import { LmnBoltIcon } from 'lumen-icons/bolt';
import { LmnEyeIcon } from 'lumen-icons/eye';
import { LmnPuzzlePieceIcon } from 'lumen-icons/puzzle-piece';
import { PublicLayout } from '../layouts/public/public-layout';

interface FeatureItem {
  readonly icon: 'eye' | 'bolt' | 'puzzle';
  readonly title: string;
  readonly description: string;
}

const FEATURES: readonly FeatureItem[] = [
  {
    icon: 'eye',
    title: 'Accessible by default',
    description: 'Landmarks, focus management and semantic markup out of the box.',
  },
  {
    icon: 'bolt',
    title: 'Modern Angular',
    description: 'Standalone components, signals and zoneless change detection.',
  },
  {
    icon: 'puzzle',
    title: 'Composable stack',
    description: 'Quartz behavior, Volt UI visuals and Lumen icons, wired together.',
  },
];

@Component({
  selector: 'app-home-page',
  imports: [PublicLayout, RouterLink, LmnBoltIcon, LmnEyeIcon, LmnPuzzlePieceIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-public-layout>
      <section class="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
        <h1 class="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Build your next application.
        </h1>
        <p class="max-w-xl text-lg text-muted-foreground">
          A clean Angular + Analog foundation using Andersseen Stack.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3">
          <a routerLink="/dashboard" [class]="primaryCtaClass">Start building</a>
          <a href="#features" [class]="secondaryCtaClass">Learn more</a>
        </div>
      </section>

      <section id="features" aria-labelledby="features-heading" class="border-t border-border">
        <div class="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 id="features-heading" class="text-center text-2xl font-semibold text-foreground">
            A foundation, not a framework
          </h2>

          <div class="mt-10 grid gap-8 sm:grid-cols-3">
            @for (feature of features; track feature.title) {
              <div class="flex flex-col items-center gap-3 text-center">
                @switch (feature.icon) {
                  @case ('eye') {
                    <lmn-eye [size]="24" class="text-primary" aria-hidden="true" />
                  }
                  @case ('bolt') {
                    <lmn-bolt [size]="24" class="text-primary" aria-hidden="true" />
                  }
                  @case ('puzzle') {
                    <lmn-puzzle-piece [size]="24" class="text-primary" aria-hidden="true" />
                  }
                }
                <h3 class="text-base font-semibold text-foreground">{{ feature.title }}</h3>
                <p class="text-sm text-muted-foreground">{{ feature.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>
    </app-public-layout>
  `,
})
export default class HomePage {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly features = FEATURES;
  protected readonly primaryCtaClass = buttonVariants();
  protected readonly secondaryCtaClass = buttonVariants({ variant: 'outline' });

  constructor() {
    this.title.setTitle('__PROJECT_NAME__');
    this.meta.updateTag({
      name: 'description',
      content: 'A clean Angular + Analog foundation using Andersseen Stack.',
    });
  }
}
