import type { AppShape } from './options.js';

/**
 * A shape overlay is one reusable composition unit (an existing shell's
 * template pieces). Shapes are the user-facing presets; overlays are the
 * internal units a shape composes onto the base template. Adding an overlay
 * to `SHAPE_OVERLAYS` is what "composes" it into a shape — nothing here
 * duplicates the overlay's own files.
 */
export type ShapeOverlay = 'dashboard' | 'landing';

/**
 * Which overlays make up each shape, in application order. `landing-dashboard`
 * reuses the same `dashboard` and `landing` overlays as the standalone shapes
 * — it does not get its own copy of their files.
 */
export const SHAPE_OVERLAYS: Readonly<Record<AppShape, readonly ShapeOverlay[]>> = {
  minimal: [],
  dashboard: ['dashboard'],
  landing: ['landing'],
  'landing-dashboard': ['landing', 'dashboard'],
};

/**
 * Relative (POSIX) template paths that more than one overlay writes, mapped
 * to the overlay that owns that path when both are active together. This is
 * what stands in for "last overlay copied wins": composing `landing` and
 * `dashboard` both produce `src/app/pages/index.page.ts` (a real hero page vs.
 * a redirect to `/dashboard`) and only one can occupy `/`. Landing owns it, so
 * the public site keeps `/` and Dashboard's root redirect is skipped — it
 * isn't needed once `/` already resolves to a real page. The check is
 * order-independent: it looks at which overlays are active, not which one
 * copies last.
 */
const OVERLAY_FILE_OWNERSHIP: Readonly<Record<string, ShapeOverlay>> = {
  'src/app/pages/index.page.ts': 'landing',
  'src/app/pages/index.page.spec.ts': 'landing',
};

export function ownerOverlayFor(relativePath: string): ShapeOverlay | undefined {
  return OVERLAY_FILE_OWNERSHIP[relativePath];
}
