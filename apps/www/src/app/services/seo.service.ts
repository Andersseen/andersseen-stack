import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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
  private readonly translate = inject(TranslateService);

  private readonly baseUrl = 'https://andersseen-stack.pages.dev';
  private readonly siteName = 'Andersseen Stack';
  private lastMetadata: PageMetadata | null = null;
  private langChangeSub: Subscription | null = null;

  update(metaData: PageMetadata): void {
    this.lastMetadata = metaData;
    this.applyMetadata(metaData);

    this.langChangeSub?.unsubscribe();
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      if (this.lastMetadata) {
        this.applyMetadata(this.lastMetadata);
      }
    });
  }

  private applyMetadata(metaData: PageMetadata): void {
    const title = this.translate.instant(metaData.title) as string;
    const description = this.translate.instant(metaData.description) as string;
    // The home page title is already the site name — don't render "X | X".
    const fullTitle = title === this.siteName ? title : `${title} | ${this.siteName}`;
    const canonical = metaData.canonical ?? this.baseUrl;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: metaData.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonical });

    if (metaData.image) {
      this.meta.updateTag({ property: 'og:image', content: metaData.image });
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });

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
