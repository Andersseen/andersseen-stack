import { inject, provideAppInitializer } from '@angular/core';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { lastValueFrom } from 'rxjs';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, resolveInitialLanguage } from './i18n.config';
import { LanguageService } from './language.service';

export const i18nProviders = [
  provideTranslateService({
    lang: DEFAULT_LANGUAGE,
    fallbackLang: DEFAULT_LANGUAGE,
  }),
  provideTranslateHttpLoader({
    prefix: '/i18n/',
    suffix: '.json',
  }),
  provideAppInitializer(() => {
    const translate = inject(TranslateService);
    // Instantiating the service here starts the <html lang> sync effect.
    inject(LanguageService);

    translate.addLangs([...AVAILABLE_LANGUAGES]);
    return lastValueFrom(translate.use(resolveInitialLanguage()));
  }),
];
