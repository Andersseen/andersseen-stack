import { Component, inject, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { VoltButton } from '@voltui/components';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
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
    TranslatePipe,
  ],
  template: `
    <app-demo-layout accentRgb="16 185 129">
      <app-demo-header
        [title]="'quartz.title' | translate"
        [description]="'quartz.description' | translate"
        packageName="quartz-headless"
        githubUrl="https://github.com/Andersseen/quartz"
        demoUrl="https://quartz-ui.andersseen.dev"
      />

      <qz-toast-container />

      <ng-template #dialogTemplate>
        <div class="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">
          <h3 class="mb-2 text-xl font-semibold">{{ 'quartz.demo.dialogTitle' | translate }}</h3>
          <p class="mb-6 text-sm text-white/60">
            {{ 'quartz.demo.dialogDescription' | translate }}
          </p>
          <div class="flex justify-end gap-3">
            <volt-button variant="ghost" (click)="closeDialog()">{{ 'common.cancel' | translate }}</volt-button>
            <volt-button variant="solid" (click)="confirmDialog()">{{ 'common.confirm' | translate }}</volt-button>
          </div>
        </div>
      </ng-template>

      <app-demo-section>
        <app-demo-card [isDestination]="true" [delay]="100">
          <h2 class="mb-4 text-lg font-semibold">{{ 'quartz.demo.toastService' | translate }}</h2>
          <p class="mb-4 text-sm text-white/60">
            {{ 'quartz.demo.toastDescription' | translate }}
          </p>
          <div class="flex flex-wrap gap-3">
            <volt-button variant="solid" (click)="showSuccess()">Success</volt-button>
            <volt-button variant="outline" (click)="showError()">Error</volt-button>
            <volt-button variant="ghost" (click)="showInfo()">Info</volt-button>
          </div>
        </app-demo-card>

        <app-demo-card [delay]="200">
          <h2 class="mb-4 text-lg font-semibold">{{ 'quartz.demo.dialogOverlay' | translate }}</h2>
          <p class="mb-4 text-sm text-white/60">
            {{ 'quartz.demo.dialogOverlayDescription' | translate }}
          </p>
          <volt-button variant="outline" (click)="openDialog()">{{ 'quartz.demo.openDialog' | translate }}</volt-button>
        </app-demo-card>

        <app-demo-card [delay]="300">
          <h2 class="mb-4 text-lg font-semibold">{{ 'quartz.demo.tooltip' | translate }}</h2>
          <p class="mb-4 text-sm text-white/60">
            {{ 'quartz.demo.tooltipDescription' | translate }}
          </p>
          <div class="flex flex-wrap gap-4">
            <volt-button variant="outline" qzTooltip="Tooltip arriba" tooltipPlacement="top">
              {{ 'quartz.demo.hoverMe' | translate }}
            </volt-button>
            <volt-button variant="outline" qzTooltip="Tooltip a la derecha" tooltipPlacement="right">
              {{ 'quartz.demo.right' | translate }}
            </volt-button>
          </div>
        </app-demo-card>

        <app-demo-card [delay]="400">
          <h2 class="mb-4 text-lg font-semibold">{{ 'quartz.demo.installation' | translate }}</h2>
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
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);

  @ViewChild('dialogTemplate', { read: TemplateRef }) dialogTemplate!: TemplateRef<unknown>;
  private dialogRef: DialogRef | null = null;

  constructor() {
    this.seo.update({
      title: 'seo.quartz.title',
      description: 'seo.quartz.description',
    });
  }

  showSuccess() {
    this.toast.success(this.translate.instant('quartz.toast.successMessage') as string, this.translate.instant('quartz.toast.successTitle') as string);
  }

  showError() {
    this.toast.error(this.translate.instant('quartz.toast.errorMessage') as string, this.translate.instant('quartz.toast.errorTitle') as string);
  }

  showInfo() {
    this.toast.info(this.translate.instant('quartz.toast.infoMessage') as string, this.translate.instant('quartz.toast.infoTitle') as string);
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
    this.toast.success(this.translate.instant('quartz.toast.confirmed') as string, this.translate.instant('quartz.title') as string);
    this.closeDialog();
  }

  readonly installExample = `import { provideQuartz } from 'quartz-headless';

providers: [
  provideQuartz()
]`;
}
