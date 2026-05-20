import { ViewTransitionInfo } from '@angular/router';

type TransitionDirection = 'expand' | 'retract' | 'slide-left' | 'slide-right' | 'fade';

const LIB_PAGES = ['/volt-ui', '/quartz', '/angular-movement', '/lumen-icons'];

const PAGE_COLORS: Record<string, string> = {
  '/volt-ui': 'volt',
  '/quartz': 'quartz',
  '/angular-movement': 'movement',
  '/lumen-icons': 'lumen',
};

function urlString(url: { path: string }[]): string {
  return '/' + url.map((s) => s.path).join('/');
}

function isHome(url: string): boolean {
  return url === '/' || url === '';
}

function isLibPage(url: string): boolean {
  return LIB_PAGES.some((p) => url.startsWith(p));
}

function getDirection(fromUrl: string, toUrl: string): TransitionDirection {
  if (isHome(fromUrl) && isLibPage(toUrl)) {
    return 'expand';
  }
  if (isLibPage(fromUrl) && isHome(toUrl)) {
    return 'retract';
  }
  if (isLibPage(fromUrl) && isLibPage(toUrl)) {
    const fromIdx = LIB_PAGES.findIndex((p) => fromUrl.startsWith(p));
    const toIdx = LIB_PAGES.findIndex((p) => toUrl.startsWith(p));
    return toIdx > fromIdx ? 'slide-left' : 'slide-right';
  }
  return 'fade';
}

function getPageColor(url: string): string {
  return PAGE_COLORS[url] || 'default';
}

export function configureViewTransition({ transition, from, to }: ViewTransitionInfo): void {
  const fromUrl = urlString(from.url);
  const toUrl = urlString(to.url);
  const direction = getDirection(fromUrl, toUrl);
  const color = getPageColor(toUrl);

  document.documentElement.dataset['vt'] = direction;
  document.documentElement.style.setProperty('--vt-accent', color);

  void transition.finished.finally(() => {
    delete document.documentElement.dataset['vt'];
    document.documentElement.style.removeProperty('--vt-accent');
  });
}
