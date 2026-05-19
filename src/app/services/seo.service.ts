import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

export interface PageMetadata {
  title: string;
  description: string;
  image?: string;
  type?: string;
  canonical?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly baseUrl = 'https://andersseen-stack.pages.dev';

  update(metaData: PageMetadata) {
    const fullTitle = `${metaData.title} | Andersseen Stack`;
    const canonical = metaData.canonical ?? this.baseUrl;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: metaData.description });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: metaData.description });
    this.meta.updateTag({ property: 'og:type', content: metaData.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonical });

    if (metaData.image) {
      this.meta.updateTag({ property: 'og:image', content: metaData.image });
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: metaData.description });

    if (metaData.image) {
      this.meta.updateTag({ name: 'twitter:image', content: metaData.image });
    }

    if (isPlatformBrowser(this.platformId)) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }
  }
}
