import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TranslateService, type TranslationObject } from '@ngx-translate/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AVAILABLE_LANGUAGES } from '../../core/i18n/i18n.config';
import { testTranslationProviders } from '../../testing/translate-testing';
import { LanguageSwitcherComponent } from './language-switcher.component';

function loadLocale(lang: string): TranslationObject {
  return JSON.parse(
    readFileSync(join(process.cwd(), 'public', 'i18n', `${lang}.json`), 'utf-8')
  ) as TranslationObject;
}

describe('LanguageSwitcherComponent', () => {
  it('should offer every available language', async () => {
    await render(LanguageSwitcherComponent, { providers: [...testTranslationProviders] });

    const select = screen.getByLabelText<HTMLSelectElement>('Select language');
    expect(Array.from(select.options).map((o) => o.value)).toEqual([...AVAILABLE_LANGUAGES]);
  });

  it('should show the active language and switch on selection', async () => {
    const { fixture } = await render(LanguageSwitcherComponent, {
      providers: [...testTranslationProviders],
    });
    const translate = fixture.debugElement.injector.get(TranslateService);
    translate.setTranslation('es', loadLocale('es'));

    const select = screen.getByLabelText<HTMLSelectElement>('Select language');
    expect(select.value).toBe('en');
    expect(screen.getByTestId('active-language')).toHaveTextContent('English');

    await userEvent.selectOptions(select, 'es');
    await fixture.whenStable();

    expect(translate.getCurrentLang()).toBe('es');
    // The trigger must follow the service, not just the user's click.
    expect(screen.getByTestId('active-language')).toHaveTextContent('Español');
    expect(document.documentElement.lang).toBe('es');
  });
});
