import { Component, inject, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { VoltButton } from '@voltui/components';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { DialogRef, DialogService, ToastService, ToastContainerComponent, TooltipDirective } from 'quartz-headless';
import {
  DemoCardComponent,
  DemoHeaderComponent,
  DemoLayoutComponent,
  DemoSectionComponent,
} from '../../components/demo';
import { VertexEditorComponent } from '../../components/vertex-editor/vertex-editor.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-quartz-page',
  imports: [
    MOVEMENT_DIRECTIVES,
    VoltButton,
    ToastContainerComponent,
    TooltipDirective,
    DemoLayoutComponent,
    DemoHeaderComponent,
    DemoCardComponent,
    DemoSectionComponent,
    VertexEditorComponent,
  ],
  template: `
    <app-demo-layout accentRgb="16 185 129">
      <app-demo-header
        title="Quartz"
        description="Primitivas UI headless para Angular. Lógica compleja sin opiniones de estilo."
        packageName="quartz-headless"
        githubUrl="https://github.com/Andersseen/quartz"
        demoUrl="https://quartz-ui.andersseen.dev"
      />

      <qz-toast-container />

      <ng-template #dialogTemplate>
        <div class="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">
          <h3 class="mb-2 text-xl font-semibold">Quartz Dialog</h3>
          <p class="mb-6 text-sm text-white/60">
            Este dialog está renderizado a través del Overlay System de Quartz. Portales, posicionamiento
            y focus trap manejados automáticamente.
          </p>
          <div class="flex justify-end gap-3">
            <volt-button variant="ghost" (click)="closeDialog()">Cancelar</volt-button>
            <volt-button variant="solid" (click)="confirmDialog()">Aceptar</volt-button>
          </div>
        </div>
      </ng-template>

      <app-demo-section>
        <app-demo-card [isDestination]="true" [delay]="100">
          <h3 class="mb-4 text-lg font-semibold">Toast Service</h3>
          <p class="mb-4 text-sm text-white/60">
            Dispara notificaciones programáticamente con Quartz ToastService.
          </p>
          <div class="flex flex-wrap gap-3">
            <volt-button variant="solid" (click)="showSuccess()">Success</volt-button>
            <volt-button variant="outline" (click)="showError()">Error</volt-button>
            <volt-button variant="ghost" (click)="showInfo()">Info</volt-button>
          </div>
        </app-demo-card>

        <app-demo-card [delay]="200">
          <h3 class="mb-4 text-lg font-semibold">Dialog & Overlay System</h3>
          <p class="mb-4 text-sm text-white/60">
            Sistema de portales y posicionamiento para dialogs, modales y overlays.
          </p>
          <volt-button variant="outline" (click)="openDialog()">Open Dialog</volt-button>
        </app-demo-card>

        <app-demo-card [delay]="300">
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
        </app-demo-card>

        <app-demo-card [delay]="400">
          <h3 class="mb-4 text-lg font-semibold">Installation</h3>
          <app-vertex-editor [code]="installExample" language="typescript" height="120px" />
        </app-demo-card>
      </app-demo-section>
    </app-demo-layout>
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
