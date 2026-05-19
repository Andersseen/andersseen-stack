import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SeoService } from './seo.service';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

describe('SeoService', () => {
  let service: SeoService;
  let title: Title;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoService, Title, Meta],
    });
    service = TestBed.inject(SeoService);
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  it('should set the page title with suffix', () => {
    const setTitleSpy = vi.spyOn(title, 'setTitle');
    service.update({
      title: 'Volt UI',
      description: 'Componentes UI estilizados',
    });
    expect(setTitleSpy).toHaveBeenCalledWith('Volt UI | Andersseen Stack');
  });

  it('should update meta description', () => {
    const updateTagSpy = vi.spyOn(meta, 'updateTag');
    service.update({
      title: 'Quartz',
      description: 'Primitivas UI headless',
    });
    expect(updateTagSpy).toHaveBeenCalledWith({
      name: 'description',
      content: 'Primitivas UI headless',
    });
  });

  it('should update Open Graph tags', () => {
    const updateTagSpy = vi.spyOn(meta, 'updateTag');
    service.update({
      title: 'Angular Movement',
      description: 'Animaciones declarativas',
    });
    expect(updateTagSpy).toHaveBeenCalledWith({
      property: 'og:title',
      content: 'Angular Movement | Andersseen Stack',
    });
    expect(updateTagSpy).toHaveBeenCalledWith({
      property: 'og:description',
      content: 'Animaciones declarativas',
    });
  });

  it('should create or update canonical link', () => {
    service.update({
      title: 'Lumen Icons',
      description: 'Iconos SVG',
      canonical: 'https://example.com/lumen-icons',
    });
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).not.toBeNull();
    expect(canonical!.getAttribute('href')).toBe('https://example.com/lumen-icons');
  });
});
