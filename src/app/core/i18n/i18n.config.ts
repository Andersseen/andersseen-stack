/**
 * Single source of truth for the supported locales. `code` must match the
 * file name under `public/i18n/<code>.json`.
 */
export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'uk', label: 'Українська', short: 'UK' },
] as const;

export type Language = (typeof LANGUAGES)[number]['code'];

export const AVAILABLE_LANGUAGES = LANGUAGES.map((l) => l.code) as readonly Language[];

export const DEFAULT_LANGUAGE: Language = 'en';
export const LANGUAGE_STORAGE_KEY = 'language';

export function isLanguage(value: string | null | undefined): value is Language {
  return !!value && (AVAILABLE_LANGUAGES as readonly string[]).includes(value);
}

/** localStorage throws in Safari private mode and is absent while prerendering. */
export function readStoredLanguage(): Language | null {
  try {
    const stored = globalThis.localStorage?.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function storeLanguage(lang: Language): void {
  try {
    globalThis.localStorage?.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    /* storage unavailable — the language still applies for this session */
  }
}

/**
 * Stored preference wins, then the browser language (`es-ES` -> `es`),
 * then the default. On the server/prerender both are absent, so the
 * default language is rendered.
 */
export function resolveInitialLanguage(): Language {
  const stored = readStoredLanguage();
  if (stored) {
    return stored;
  }

  const browser = globalThis.navigator?.language?.split('-')[0];
  return isLanguage(browser) ? browser : DEFAULT_LANGUAGE;
}
