import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';
import { VoltButton, VoltCard } from '@voltui/components';
import { ToastService, ToastContainerComponent } from 'quartz-headless';

@Component({
  selector: 'app-quartz-page',
  imports: [RouterLink, MOVEMENT_DIRECTIVES, VoltButton, VoltCard, ToastContainerComponent],
  template: `
    <div class="mx-auto max-w-3xl px-6 py-12">
      <div class="mb-8" [move]="'fade-up'">
        <a routerLink="/" class="text-sm text-white/50 transition-colors hover:text-white"
          >← Volver</a
        >
        <h1 class="mt-4 mb-2 text-4xl font-bold">Quartz</h1>
        <p class="text-white/60">
          Primitivas UI headless. Lógica compleja sin opiniones de estilo.
        </p>
      </div>

      <qz-toast-container />

      <section class="space-y-8">
        <volt-card class="p-6" [move]="'fade-up'" [moveDelay]="100">
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
          <h3 class="mb-4 text-lg font-semibold">Overlay System</h3>
          <p class="mb-4 text-sm text-white/60">
            Sistema de portales y posicionamiento para tooltips, popovers y dropdowns.
          </p>
          <volt-button variant="outline">Trigger Overlay</volt-button>
        </volt-card>
      </section>
    </div>
  `,
})
export default class QuartzPage {
  private toast = inject(ToastService);

  showSuccess() {
    this.toast.success('Operación completada con éxito.', 'Quartz Toast');
  }

  showError() {
    this.toast.error('Algo salió mal.', 'Error');
  }

  showInfo() {
    this.toast.info('Este es un toast informativo.', 'Info');
  }
}
