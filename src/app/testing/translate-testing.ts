import { inject, provideAppInitializer } from '@angular/core';
import { provideTranslateService, TranslateService, type TranslationObject } from '@ngx-translate/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';
import { DEFAULT_LANGUAGE, type Language } from '../core/i18n/i18n.config';

function loadTestTranslations(lang: Language): TranslationObject {
  const path = join(process.cwd(), 'public', 'i18n', `${lang}.json`);
  return JSON.parse(readFileSync(path, 'utf-8')) as TranslationObject;
}

/**
 * Loads the shipped locale files from `public/i18n`, so specs assert against
 * the real copy instead of a hand-maintained stub.
 */
export function provideTestTranslations(lang: Language = DEFAULT_LANGUAGE) {
  return [
    provideTranslateService({
      lang,
      fallbackLang: DEFAULT_LANGUAGE,
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      translate.setTranslation(DEFAULT_LANGUAGE, loadTestTranslations(DEFAULT_LANGUAGE));
      if (lang !== DEFAULT_LANGUAGE) {
        translate.setTranslation(lang, loadTestTranslations(lang));
      }
      return lastValueFrom(translate.use(lang));
    }),
  ];
}

export const testTranslationProviders = provideTestTranslations();
