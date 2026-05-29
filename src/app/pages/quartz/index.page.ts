import { Component, inject, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { VoltButton, VoltCard } from '@voltui/components';
import { DialogRef, DialogService, ToastService, ToastContainerComponent, TooltipDirective } from 'quartz-headless';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-quartz-page',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton, VoltCard, ToastContainerComponent, TooltipDirective],
  template: `
    <div class="relative min-h-screen overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(16,185,129,0.08),transparent)]"
      ></div>
      <div class="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <div class="mb-8" [move]="'fade-up'">
          <a routerLink="/" class="text-sm text-white/50 transition-colors hover:text-white">← Volver</a>
          <h1 class="mt-4 mb-2 text-4xl font-bold">Quartz</h1>
          <p class="text-white/60">Primitivas UI headless. Lógica compleja sin opiniones de estilo.</p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <div
              class="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-white/70"
            >
              <span class="text-white/40">$</span>
              <span>npm install quartz-headless</span>
            </div>
            <a
              href="https://github.com/Andersseen/quartz"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                />
              </svg>
              GitHub
            </a>
            <a
              href="https://quartz-ui.andersseen.dev"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20"
            >
              Live Demo
              <span>→</span>
            </a>
          </div>
        </div>

        <qz-toast-container />

        <ng-template #dialogTemplate>
          <div
            class="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl"
          >
            <h3 class="mb-2 text-xl font-semibold">Quartz Dialog</h3>
            <p class="mb-6 text-sm text-white/60">
              Este dialog está renderizado a través del Overlay System de Quartz. Portales,
              posicionamiento y focus trap manejados automáticamente.
            </p>
            <div class="flex justify-end gap-3">
              <volt-button variant="ghost" (click)="closeDialog()">Cancelar</volt-button>
              <volt-button variant="solid" (click)="confirmDialog()">Aceptar</volt-button>
            </div>
          </div>
        </ng-template>

        <section class="space-y-8">
          <volt-card class="vt-destination-card p-6" [move]="'fade-up'" [moveDelay]="100">
            <h3 class="mb-4 text-lg font-semibold">Toast Service</h3>
            <p class="mb-4 text-sm text-white/60">
              Dispara notificaciones programáticamente con Quartz ToastService.
            </p>
            <div class="flex flex-wrap gap-3">
              <volt-button variant="solid" (click)="showSuccess()">Success</volt-button>
              <volt-button variant="outline" (click)="showError()">Error</volt-button>
              <volt-button variant="ghost" (click)="showInfo()">Info</volt-button>
            </div>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="200">
            <h3 class="mb-4 text-lg font-semibold">Dialog & Overlay System</h3>
            <p class="mb-4 text-sm text-white/60">
              Sistema de portales y posicionamiento para dialogs, modales y overlays.
            </p>
            <volt-button variant="outline" (click)="openDialog()">Open Dialog</volt-button>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="300">
            <h3 class="mb-4 text-lg font-semibold">Tooltip</h3>
            <p class="mb-4 text-sm text-white/60">
              Tooltips posicionados automáticamente vía el overlay system.
            </p>
            <div class="flex flex-wrap gap-4">
              <volt-button variant="outline" qzTooltip="Tooltip arriba" tooltipPlacement="top">
                Hover me
              </volt-button>
              <volt-button variant="outline" qzTooltip="Tooltip a la derecha" tooltipPlacement="right">
                Right
              </volt-button>
            </div>
          </volt-card>

          <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="400">
            <h3 class="mb-4 text-lg font-semibold">Installation</h3>
            <pre
              class="overflow-x-auto rounded-lg bg-black/40 p-4 text-sm text-white/80"
            ><code>{{ installExample }}</code></pre>
          </volt-card>
        </section>
      </div>
    </div>
  `,
})
export default class QuartzPage {
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(DialogService);
  private readonly vcr = inject(ViewContainerRef);
  private readonly seo = inject(SeoService);

  @ViewChild('dialogTemplate', { read: TemplateRef }) dialogTemplate!: TemplateRef<unknown>;
  private dialogRef: DialogRef | null = null;

  constructor() {
    this.seo.update({
      title: 'Quartz',
      description: 'Primitivas UI headless para Angular. Overlays, dialogs, drag-drop, toast, virtual scroll y más.',
    });
  }

  showSuccess() {
    this.toast.success('Operación completada con éxito.', 'Quartz Toast');
  }

  showError() {
    this.toast.error('Algo salió mal.', 'Error');
  }

  showInfo() {
    this.toast.info('Este es un toast informativo.', 'Info');
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.dialogTemplate, this.vcr, {
      position: 'center',
      backdrop: true,
    });
  }

  closeDialog() {
    this.dialogRef?.close();
    this.dialogRef = null;
  }

  confirmDialog() {
    this.toast.success('Dialog confirmado.', 'Quartz');
    this.closeDialog();
  }

  readonly installExample = `import { provideQuartz } from 'quartz-headless';

providers: [
  provideQuartz()
]`;
}
