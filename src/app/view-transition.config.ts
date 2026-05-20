import { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';

type TransitionDirection = 'expand' | 'retract' | 'slide-left' | 'slide-right' | 'fade';

const LIB_PAGES = ['/volt-ui', '/quartz', '/angular-movement', '/lumen-icons'];
const LIB_ACCENTS = new Map([
  ['/volt-ui', '59 130 246'],
  ['/quartz', '16 185 129'],
  ['/angular-movement', '245 158 11'],
  ['/lumen-icons', '14 165 233'],
]);

function urlString(snapshot: ActivatedRouteSnapshot): string {
  const fromRoot = snapshot.pathFromRoot.flatMap(route => route.url.map(segment => segment.path));
  const fromChildren: string[] = [];
  let route: ActivatedRouteSnapshot | null = snapshot;

  while (route) {
    const urlSegments = route.url.map(segment => segment.path);
    const configSegments =
      urlSegments.length === 0 && route.routeConfig?.path
        ? route.routeConfig.path.split('/').filter(segment => segment && !segment.startsWith(':'))
        : [];

    fromChildren.push(...urlSegments, ...configSegments);
    route = route.firstChild;
  }

  const segments = fromRoot.length >= fromChildren.length ? fromRoot : fromChildren;
  return '/' + segments.join('/');
}

function isHome(url: string): boolean {
  return url === '/' || url === '';
}

function isLibPage(url: string): boolean {
  return LIB_PAGES.some(p => url.startsWith(p));
}

function accentForUrl(url: string): string {
  const path = LIB_PAGES.find(libPath => url.startsWith(libPath));
  return (path && LIB_ACCENTS.get(path)) || '59 130 246';
}

function getDirection(fromUrl: string, toUrl: string): TransitionDirection {
  if (isHome(fromUrl) && isLibPage(toUrl)) {
    return 'expand';
  }
  if (isLibPage(fromUrl) && isHome(toUrl)) {
    return 'retract';
  }
  if (isLibPage(fromUrl) && isLibPage(toUrl)) {
    const fromIdx = LIB_PAGES.findIndex(p => fromUrl.startsWith(p));
    const toIdx = LIB_PAGES.findIndex(p => toUrl.startsWith(p));
    return toIdx > fromIdx ? 'slide-left' : 'slide-right';
  }
  return 'fade';
}

export function configureViewTransition({ transition, from, to }: ViewTransitionInfo): void {
  const fromUrl = urlString(from);
  const toUrl = urlString(to);
  const direction = getDirection(fromUrl, toUrl);

  document.documentElement.dataset['vt'] = direction;
  let circleRing: HTMLDivElement | undefined;

  if (direction === 'retract') {
    document.documentElement.style.setProperty('--vt-x', '50vw');
    document.documentElement.style.setProperty('--vt-y', '50vh');
    document.documentElement.style.setProperty('--vt-start-radius', '2rem');
    document.documentElement.style.setProperty('--vt-accent', accentForUrl(fromUrl));

    circleRing = document.createElement('div');
    circleRing.className = 'vt-circle-ring';
    document.body.append(circleRing);
  }

  void transition.finished.finally(() => {
    delete document.documentElement.dataset['vt'];
    delete document.documentElement.dataset['vtCard'];
    circleRing?.remove();
    document
      .querySelector<HTMLElement>('[style*="view-transition-name: active-card"]')
      ?.style.removeProperty('view-transition-name');
  });
}
