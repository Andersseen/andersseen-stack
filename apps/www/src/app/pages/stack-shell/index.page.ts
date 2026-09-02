import { Component, signal } from '@angular/core';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { VoltBadge, VoltButton, VoltCard } from '@voltui/components';
import {
  NavbarDirective,
  NavbarMenuDirective,
  NavbarTriggerDirective,
  SidebarContentDirective,
  SidebarDirective,
  SidebarPanelDirective,
  SidebarTriggerDirective,
} from '@quartz-headless/primitives';
import { LmnChartBarIcon } from 'lumen-icons/chart-bar';
import { LmnChevronLeftIcon } from 'lumen-icons/chevron-left';
import { LmnCommandLineIcon } from 'lumen-icons/command-line';
import { LmnHomeIcon } from 'lumen-icons/home';
import { LmnMenuIcon } from 'lumen-icons/menu';
import { LmnServerStackIcon } from 'lumen-icons/server-stack';
import { LmnSparklesIcon } from 'lumen-icons/sparkles';
import { LmnSunIcon } from 'lumen-icons/sun';
import { LmnXMarkIcon } from 'lumen-icons/x-mark';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-stack-shell-page',
  imports: [
    MOVEMENT_DIRECTIVES,
    VoltBadge,
    VoltButton,
    VoltCard,
    NavbarDirective,
    NavbarMenuDirective,
    NavbarTriggerDirective,
    SidebarDirective,
    SidebarPanelDirective,
    SidebarTriggerDirective,
    SidebarContentDirective,
    LmnChartBarIcon,
    LmnChevronLeftIcon,
    LmnCommandLineIcon,
    LmnHomeIcon,
    LmnMenuIcon,
    LmnServerStackIcon,
    LmnSparklesIcon,
    LmnSunIcon,
    LmnXMarkIcon,
  ],
  styles: [
    `
      :host {
        display: block;
      }

      .stack-shell-theme {
        --stack-shell-accent: #22d3ee;
        --stack-shell-accent-strong: #0e7490;
        --stack-shell-surface: color-mix(in oklab, var(--background) 88%, white);
        --stack-shell-muted: color-mix(in oklab, var(--foreground) 58%, transparent);
      }

      .stack-shell-grid {
        --qz-sidebar-size: 17rem;
        --qz-sidebar-collapsed-size: 4.5rem;
        display: grid;
        min-height: 44rem;
        overflow: hidden;
      }

      .stack-shell-panel {
        min-width: 0;
        overflow: hidden;
        border-right: 1px solid rgb(255 255 255 / 0.08);
        background:
          linear-gradient(180deg, rgb(34 211 238 / 0.12), transparent 32%),
          color-mix(in oklab, var(--background) 94%, white);
        transition: inline-size 180ms ease;
      }

      .stack-shell-panel[data-state='closed'] {
        border-right-color: transparent;
      }

      .stack-shell-content {
        min-width: 0;
        background: color-mix(in oklab, var(--background) 97%, white);
      }

      .stack-shell-nav {
        border-bottom: 1px solid rgb(255 255 255 / 0.08);
        background: color-mix(in oklab, var(--background) 90%, white);
      }

      .stack-shell-mobile-menu {
        border-bottom: 1px solid rgb(255 255 255 / 0.08);
        background: color-mix(in oklab, var(--background) 92%, white);
      }
    `,
  ],
  template: `
    <section class="stack-shell-theme px-4 py-10 sm:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="mb-6" [move]="'fade-up'">
          <volt-badge variant="outline">Integration spike</volt-badge>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">AppShell foundation</h1>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            Quartz controls sidebar and navbar state. Volt carries the visual language. Lumen renders icons.
            Movement animates the shell entrance. The accent tokens mirror a generated Volt-compatible theme.
          </p>
        </div>

        <div
          qzSidebar
          #shell="qzSidebar"
          [open]="sidebarOpen()"
          (openChange)="sidebarOpen.set($event)"
          [collapsed]="sidebarCollapsed()"
          (collapsedChange)="sidebarCollapsed.set($event)"
          desktopMode="push"
          mobileMode="overlay"
          [breakpoint]="768"
          focusMode="trap"
          [scrollLock]="true"
          class="stack-shell-grid rounded-2xl border border-white/10 shadow-2xl shadow-cyan-950/20"
          [style.grid-template-columns]="shell.gridTemplateColumns()"
          [move]="'fade-up'"
          [moveDelay]="120"
          data-testid="stack-shell-spike"
        >
          <aside
            id="stack-shell-sidebar"
            qzSidebarPanel
            #panel="qzSidebarPanel"
            class="stack-shell-panel"
            [style.grid-column]="panel.gridColumn()"
            [style.inline-size]="panel.inlineSize()"
            (keydown)="shell.handlePanelKeydown($event)"
          >
            <div class="flex h-full flex-col gap-3 p-3">
              <div class="flex items-center gap-3 rounded-lg px-2 py-2">
                <lmn-server-stack [size]="24" tone="primary" background="soft" [animate]="true" />
                @if (!sidebarCollapsed()) {
                  <div class="min-w-0">
                    <div class="truncate text-sm font-semibold text-white">Andersseen App</div>
                    <div class="truncate text-xs text-white/45">Quartz + Volt shell</div>
                  </div>
                }
              </div>

              <nav class="flex flex-1 flex-col gap-1" aria-label="Spike navigation">
                @for (item of navItems; track item.label) {
                  <button
                    type="button"
                    class="flex h-10 items-center gap-3 rounded-md px-3 text-left text-sm text-white/62 transition hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                    [class.justify-center]="sidebarCollapsed()"
                  >
                    @switch (item.icon) {
                      @case ('home') {
                        <lmn-home [size]="20" />
                      }
                      @case ('chart') {
                        <lmn-chart-bar [size]="20" />
                      }
                      @case ('command') {
                        <lmn-command-line [size]="20" />
                      }
                    }
                    @if (!sidebarCollapsed()) {
                      <span class="truncate">{{ item.label }}</span>
                    }
                  </button>
                }
              </nav>

              <volt-button
                variant="outline"
                size="sm"
                class="w-full"
                (click)="toggleCollapsed()"
                [attr.aria-expanded]="!sidebarCollapsed()"
                aria-controls="stack-shell-sidebar"
              >
                <lmn-chevron-left slot="leading" [size]="16" [class.rotate-180]="sidebarCollapsed()" />
                @if (!sidebarCollapsed()) {
                  Collapse
                }
              </volt-button>
            </div>
          </aside>

          <div
            qzSidebarContent
            #content="qzSidebarContent"
            class="stack-shell-content flex min-h-0 flex-col"
            [style.grid-column]="content.gridColumn()"
          >
            <header
              qzNavbar
              #navbar="qzNavbar"
              sticky="false"
              [breakpoint]="768"
              [scrollLock]="true"
              [trapFocus]="true"
              class="stack-shell-nav"
            >
              <div class="flex min-h-14 items-center justify-between gap-3 px-4">
                <button
                  type="button"
                  qzSidebarTrigger
                  class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="Toggle sidebar"
                  data-testid="stack-shell-sidebar-trigger"
                >
                  <lmn-menu [size]="20" />
                </button>

                <div class="hidden items-center gap-2 text-sm text-white/58 sm:flex">
                  <lmn-sparkles [size]="16" tone="primary" />
                  <span>Palette Crafter fixture: cyan Volt theme</span>
                </div>

                <button
                  type="button"
                  qzNavbarTrigger
                  class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white md:hidden"
                  aria-label="Toggle top navigation"
                >
                  @if (navbar.menuOpen()) {
                    <lmn-x-mark [size]="20" />
                  } @else {
                    <lmn-menu [size]="20" />
                  }
                </button>

                <volt-button variant="ghost" size="icon" aria-label="Theme action">
                  <lmn-sun [size]="20" />
                </volt-button>
              </div>

              <div qzNavbarMenu class="stack-shell-mobile-menu grid gap-2 px-4 py-3 md:hidden">
                <a class="rounded-md px-3 py-2 text-sm text-white/68 hover:bg-white/8" href="/stack-shell">Overview</a>
                <a class="rounded-md px-3 py-2 text-sm text-white/68 hover:bg-white/8" href="/quartz">Quartz primitives</a>
              </div>
            </header>

            <main class="grid flex-1 gap-4 p-4 sm:grid-cols-[1.4fr_0.9fr] sm:p-5">
              <volt-card class="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-xs font-medium uppercase tracking-wider text-cyan-300">Runtime composition</p>
                    <h2 class="mt-2 text-xl font-semibold text-white">No source aliases, no copied primitives</h2>
                  </div>
                  <lmn-command-line [size]="24" tone="primary" />
                </div>
                <p class="mt-4 text-sm leading-6 text-white/58">
                  This route consumes the published packages exactly like an external app:
                  <code>@quartz-headless/primitives</code>, <code>@voltui/components</code>,
                  <code>angular-movement</code> and <code>lumen-icons</code>.
                </p>
              </volt-card>

              <volt-card class="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <p class="text-xs font-medium uppercase tracking-wider text-cyan-300">Shell state</p>
                <dl class="mt-4 grid gap-3 text-sm">
                  <div class="flex items-center justify-between">
                    <dt class="text-white/50">Sidebar</dt>
                    <dd class="font-medium text-white" data-testid="stack-shell-sidebar-state">{{ shell.state() }}</dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-white/50">Mode</dt>
                    <dd class="font-medium text-white">{{ shell.currentMode() }}</dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-white/50">Navbar menu</dt>
                    <dd class="font-medium text-white">{{ navbar.menuOpen() ? 'open' : 'closed' }}</dd>
                  </div>
                </dl>
              </volt-card>

              <div class="grid gap-3 sm:col-span-2 md:grid-cols-3">
                @for (capability of capabilities; track capability.title) {
                  <div class="rounded-lg border border-white/8 bg-white/[0.025] p-4">
                    <div class="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-300">
                      @switch (capability.icon) {
                        @case ('server') {
                          <lmn-server-stack [size]="20" />
                        }
                        @case ('sparkles') {
                          <lmn-sparkles [size]="20" />
                        }
                        @case ('sun') {
                          <lmn-sun [size]="20" />
                        }
                      }
                    </div>
                    <h3 class="text-sm font-semibold text-white">{{ capability.title }}</h3>
                    <p class="mt-2 text-sm leading-5 text-white/52">{{ capability.description }}</p>
                  </div>
                }
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  `,
})
export default class StackShellPage {
  protected readonly sidebarOpen = signal(false);
  protected readonly sidebarCollapsed = signal(false);

  protected readonly navItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Analytics', icon: 'chart' },
    { label: 'Developer tools', icon: 'command' },
  ];

  protected readonly capabilities = [
    {
      title: 'Quartz behavior',
      description: 'Sidebar, mobile overlay dismissal, focus trap and navbar menu state.',
      icon: 'server',
    },
    {
      title: 'Volt visuals',
      description: 'Buttons, badges, cards and semantic theme tokens stay visual-only.',
      icon: 'sparkles',
    },
    {
      title: 'Lumen + Movement',
      description: 'Icons are imported from published subpaths and animated declaratively.',
      icon: 'sun',
    },
  ];

  constructor(seo: SeoService) {
    seo.update({
      title: 'AppShell foundation | Andersseen Stack',
      description: 'Integration spike for composing Quartz, Volt UI, Lumen Icons and Angular Movement.',
    });
  }

  protected toggleCollapsed(): void {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }
}
