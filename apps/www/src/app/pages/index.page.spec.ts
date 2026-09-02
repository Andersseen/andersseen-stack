import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/angular';
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
