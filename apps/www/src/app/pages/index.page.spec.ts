import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { testTranslationProviders } from '../testing/translate-testing';
import HomePage from './index.page';

describe('HomePage', () => {
  it('should render main heading', async () => {
    await render(HomePage, {
      providers: [
        provideRouter([]),
        ...testTranslationProviders,
        { provide: SeoService, useValue: { update: vi.fn() } },
      ],
    });
    expect(screen.getByText('Andersseen')).toBeInTheDocument();
    expect(screen.getByText('Stack')).toBeInTheDocument();
  });

  it('should render all library cards', async () => {
    await render(HomePage, {
      providers: [
        provideRouter([]),
        ...testTranslationProviders,
        { provide: SeoService, useValue: { update: vi.fn() } },
      ],
    });

    expect(screen.getByText('Volt UI')).toBeInTheDocument();
    expect(screen.getByText('Quartz')).toBeInTheDocument();
    expect(screen.getByText('Angular Movement')).toBeInTheDocument();
    expect(screen.getByText('Lumen Icons')).toBeInTheDocument();
  });

  it('should link the ecosystem tools out to their official sites', async () => {
    await render(HomePage, {
      providers: [
        provideRouter([]),
        ...testTranslationProviders,
        { provide: SeoService, useValue: { update: vi.fn() } },
      ],
    });

    const expected: Record<string, [string, string]> = {
      doqs: ['Doqs', 'https://doqs.andersseen.dev'],
      strata: ['Strata', 'https://strata.andersseen.dev'],
      etyma: ['Etyma', 'https://etyma.andersseen.dev'],
      forge: ['Forge CMS', 'https://forgecms.dev'],
    };
    for (const [id, [name, href]] of Object.entries(expected)) {
      const card = screen.getByTestId(`eco-${id}`);
      expect(card).toHaveAttribute('href', href);
      expect(card).toHaveAttribute('target', '_blank');
      expect(card).toHaveAttribute('rel', expect.stringContaining('noopener'));
      expect(card).toHaveTextContent(name);
    }
  });

  it('should make the hovered or focused ecosystem card the active one', async () => {
    await render(HomePage, {
      providers: [
        provideRouter([]),
        ...testTranslationProviders,
        { provide: SeoService, useValue: { update: vi.fn() } },
      ],
    });

    expect(screen.getByTestId('eco-doqs')).toHaveAttribute('data-active', 'true');

    fireEvent.mouseEnter(screen.getByTestId('eco-etyma'));
    expect(await screen.findByTestId('eco-etyma')).toHaveAttribute('data-active', 'true');
    expect(screen.getByTestId('eco-doqs')).toHaveAttribute('data-active', 'false');

    fireEvent.focus(screen.getByTestId('eco-forge'));
    await screen.findByTestId('eco-forge');
    expect(screen.getByTestId('eco-forge')).toHaveAttribute('data-active', 'true');
    expect(screen.getByTestId('eco-etyma')).toHaveAttribute('data-active', 'false');
  });

  it('should call seo.update on init', async () => {
    const seoUpdate = vi.fn();
    await render(HomePage, {
      providers: [
        provideRouter([]),
        ...testTranslationProviders,
        { provide: SeoService, useValue: { update: seoUpdate } },
      ],
    });
    expect(seoUpdate).toHaveBeenCalledOnce();
  });
});
