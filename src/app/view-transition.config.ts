import { ViewTransitionInfo } from '@angular/router';

type TransitionDirection = 'expand' | 'retract' | 'slide-left' | 'slide-right' | 'fade';

const LIB_PAGES = ['/volt-ui', '/quartz', '/angular-movement', '/lumen-icons'];

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
  // Home -> Lib: expand card
  if (isHome(fromUrl) && isLibPage(toUrl)) {
    return 'expand';
  }

  // Lib -> Home: retract
  if (isLibPage(fromUrl) && isHome(toUrl)) {
    return 'retract';
  }

  // Lib -> Lib: slide lateral según orden
  if (isLibPage(fromUrl) && isLibPage(toUrl)) {
    const fromIdx = LIB_PAGES.findIndex((p) => fromUrl.startsWith(p));
    const toIdx = LIB_PAGES.findIndex((p) => toUrl.startsWith(p));
    return toIdx > fromIdx ? 'slide-left' : 'slide-right';
  }

  return 'fade';
}

export function configureViewTransition({ transition, from, to }: ViewTransitionInfo): void {
  const fromUrl = urlString(from.url);
  const toUrl = urlString(to.url);
  const direction = getDirection(fromUrl, toUrl);

  document.documentElement.dataset['vt'] = direction;

  void transition.finished.finally(() => {
    delete document.documentElement.dataset['vt'];
  });
}
