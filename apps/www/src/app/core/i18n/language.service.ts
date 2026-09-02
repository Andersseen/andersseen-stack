import { computed, DOCUMENT, effect, inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { DEFAULT_LANGUAGE, isLanguage, Language, LANGUAGES, storeLanguage } from './i18n.config';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  readonly languages = LANGUAGES;

  /**
   * Reactive current language. `TranslateService.getCurrentLang()` is an
   * explicitly non-reactive snapshot, so it must not be read from a
   * `computed`/template — use this signal instead.
   */
  readonly current = computed<Language>(() => {
    const lang = this.translate.currentLang();
    return isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  });

  readonly currentLabel = computed(
    () => LANGUAGES.find((l) => l.code === this.current()) ?? LANGUAGES[0]
  );

  constructor() {
    // Keeps <html lang> in sync for screen readers, hyphenation and SEO.
    effect(() => {
      this.document.documentElement.lang = this.current();
    });
  }

  async use(lang: string): Promise<void> {
    if (!isLanguage(lang) || lang === this.current()) {
      return;
    }

    await firstValueFrom(this.translate.use(lang));
    storeLanguage(lang);
  }
}
