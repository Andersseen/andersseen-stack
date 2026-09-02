import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { withViewTransitions } from '@angular/router';
import { provideMovement } from 'angular-movement';
import { provideVoltTheme } from '@voltui/components';
import { i18nProviders } from './core/i18n';
import { configureViewTransition } from './view-transition.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(
      withViewTransitions({
        onViewTransitionCreated: configureViewTransition,
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
    provideClientHydration(withEventReplay()),
    provideMovement({ duration: 320, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }),
    provideVoltTheme({ color: 'volt', style: 'soft', dark: true }),
    ...i18nProviders,
  ],
};
