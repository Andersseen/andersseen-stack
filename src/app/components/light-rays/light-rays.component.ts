import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  NgZone,
} from '@angular/core';

interface Ray {
  /** Rotation from vertical, in degrees. Negative leans left. */
  readonly angle: number;
  /** Cone width at its base, as a percentage of the host. */
  readonly width: number;
  /** Cone length, as a percentage of the host height. */
  readonly length: number;
  readonly blur: number;
  readonly opacity: number;
  /** Degrees the beam swings either side of `angle`. */
  readonly swing: number;
  /** Sway cycle in seconds. */
  readonly duration: number;
  /** Brightness cycle in seconds. Kept coprime-ish with `duration` so the two
      never fall into step and the fan avoids a visible metronome beat. */
  readonly flicker: number;
  /** Negative, so every beam starts mid-cycle instead of all at rest. */
  readonly delay: number;
}

/**
 * Decorative light rays fanning out from the top of the containing section.
 *
 * The WebGL originals (ngxui / omnedia) drive this from a fragment shader, which
 * costs a renderer dependency (~an OGL bundle), a GPU context and a per-frame
 * JS loop for what is the first thing on the page. This builds the same look out
 * of blurred gradient cones: the sweep, breathing and flicker are all CSS
 * animations on `transform`/`opacity`, so they run on the compositor with no
 * script at all.
 *
 * The only JavaScript is the optional pointer tilt, which leans the whole fan
 * toward the cursor — the one part of the effect CSS cannot express. It runs
 * outside the Angular zone, writes a single custom property, and never starts on
 * touch devices or under `prefers-reduced-motion`.
 *
 * The host is absolutely positioned, so it needs a `relative` ancestor with
 * `overflow-hidden`.
 */
@Component({
  selector: 'app-light-rays',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[style.--ray-color]': 'color()',
    '[style.--ray-gain]': 'intensity()',
  },
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        /* Rays dissolve into the page before they reach the section edges. */
        mask-image: radial-gradient(115% 105% at 50% -12%, #000 0%, #000 52%, transparent 100%);
        /* Overwritten by the pointer tilt; the fan is upright without it. */
        --ray-tilt: 0deg;
      }

      /* Blur radii are tuned for a desktop-width hero; at phone widths the same
         values smear the fan into a single wash. */
      :host {
        --ray-blur-scale: 0.55;
      }
      @media (min-width: 640px) {
        :host {
          --ray-blur-scale: 1;
        }
      }

      /* The glow the rays appear to emanate from. Kept tight — a wide one flattens
         the fan back into a single wash. */
      .origin {
        position: absolute;
        top: -46%;
        left: 50%;
        width: 34%;
        height: 46%;
        transform: translateX(-50%);
        background: radial-gradient(
          ellipse at 50% 35%,
          color-mix(in srgb, var(--ray-color) 30%, transparent) 0%,
          transparent 70%
        );
        filter: blur(26px);
        animation: origin-breathe 9s ease-in-out infinite alternate;
      }

      .ray {
        position: absolute;
        /* The apex sits above the section: light entering the frame already
           spread, rather than a spotlight bulb pinned to the top edge. */
        top: -32%;
        left: 50%;
        width: var(--ray-width);
        height: var(--ray-length);
        margin-left: calc(var(--ray-width) / -2);
        transform-origin: 50% 0;
        transform: rotate(calc(var(--ray-angle) + var(--ray-tilt)));
        opacity: calc(var(--ray-opacity) * var(--ray-gain));
        filter: blur(calc(var(--ray-blur) * var(--ray-blur-scale)));
        /* Additive over the near-black page: overlapping cones brighten each
           other the way real light does, rather than stacking as flat veils. */
        mix-blend-mode: screen;
        animation: ray-sway var(--ray-duration) var(--ray-delay) ease-in-out infinite alternate;
      }

      /* Shape lives on the pseudo-element so the parent's blur softens the cut
         edges — a filter on the clipped element itself would be re-clipped. It
         also carries the brightness cycle, keeping it independent of the sweep. */
      .ray::before {
        content: '';
        position: absolute;
        inset: 0;
        clip-path: polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%);
        background: linear-gradient(
          to bottom,
          var(--ray-color) 0%,
          color-mix(in srgb, var(--ray-color) 72%, transparent) 30%,
          color-mix(in srgb, var(--ray-color) 26%, transparent) 62%,
          transparent 100%
        );
        /* Falloff across the beam, not just along it. Without this the cone is a
           flat fill and blur only rounds its outline, which still reads as a
           hard-edged stripe — the brightest part has to be the centre line. */
        mask-image: linear-gradient(
          to right,
          transparent 0%,
          rgb(0 0 0 / 0.15) 20%,
          rgb(0 0 0 / 0.65) 38%,
          #000 50%,
          rgb(0 0 0 / 0.65) 62%,
          rgb(0 0 0 / 0.15) 80%,
          transparent 100%
        );
        animation: ray-flicker var(--ray-flicker) var(--ray-delay) ease-in-out infinite alternate;
      }

      /* Sweeping and widening together reads as a beam raking across the scene;
         rotation alone reads as a rotating graphic. */
      @keyframes ray-sway {
        0% {
          transform: rotate(calc(var(--ray-angle) + var(--ray-tilt) - var(--ray-swing)))
            scaleX(0.85) scaleY(0.94);
        }
        55% {
          transform: rotate(calc(var(--ray-angle) + var(--ray-tilt) + var(--ray-swing) * 0.3))
            scaleX(1.15) scaleY(1.04);
        }
        100% {
          transform: rotate(calc(var(--ray-angle) + var(--ray-tilt) + var(--ray-swing)))
            scaleX(0.93) scaleY(0.98);
        }
      }

      @keyframes ray-flicker {
        from {
          opacity: 0.35;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes origin-breathe {
        from {
          opacity: 0.55;
          transform: translateX(-50%) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) scale(1.1);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ray,
        .ray::before,
        .origin {
          animation: none;
        }
      }
    `,
  ],
  template: `
    <div class="origin"></div>
    @for (ray of rays; track ray.angle) {
      <span
        class="ray"
        [style.--ray-angle.deg]="ray.angle"
        [style.--ray-width.%]="ray.width"
        [style.--ray-length.%]="ray.length"
        [style.--ray-blur.px]="ray.blur"
        [style.--ray-opacity]="ray.opacity"
        [style.--ray-swing.deg]="ray.swing"
        [style.--ray-duration.s]="ray.duration"
        [style.--ray-flicker.s]="ray.flicker"
        [style.--ray-delay.s]="ray.delay"
      ></span>
    }
  `,
})
export class LightRaysComponent {
  /** Any CSS colour. `color-mix` derives the falloff stops from it. */
  readonly color = input<string>('rgb(165 180 252)');

  /** Multiplies every ray's opacity — 0 hides the effect, 1 is the tuned default. */
  readonly intensity = input<number>(1);

  /** Whether the fan leans toward the pointer. */
  readonly followMouse = input<boolean>(true);

  /** Maximum degrees the pointer can tilt the fan. Small on purpose: the fan is
      meant to drift with the cursor, not track it. */
  readonly mouseInfluence = input<number>(3.5);

  /* Beams stay narrow relative to the gaps between them: widen them and the fan
     merges back into a single wash. Deliberately asymmetric, since an even fan
     reads as a graphic and an uneven one as light — the centre beams are the
     tightest and brightest, the outer ones widen, dim and blur out. */
  protected readonly rays: readonly Ray[] = [
    { angle: -54, width: 17, length: 185, blur: 46, opacity: 0.17, swing: 9, duration: 11, flicker: 6.5, delay: -4 }, // prettier-ignore
    { angle: -41, width: 13, length: 198, blur: 36, opacity: 0.22, swing: 7, duration: 7, flicker: 4.5, delay: -9 }, // prettier-ignore
    { angle: -31, width: 10, length: 190, blur: 27, opacity: 0.28, swing: 5.5, duration: 13, flicker: 5.5, delay: -2 }, // prettier-ignore
    { angle: -21, width: 14, length: 208, blur: 31, opacity: 0.24, swing: 7.5, duration: 8.5, flicker: 3.5, delay: -7 }, // prettier-ignore
    { angle: -12, width: 8, length: 212, blur: 21, opacity: 0.34, swing: 4.5, duration: 10, flicker: 6, delay: -12 }, // prettier-ignore
    { angle: -4, width: 11, length: 218, blur: 23, opacity: 0.31, swing: 6, duration: 14, flicker: 4, delay: -6 }, // prettier-ignore
    { angle: 6, width: 8, length: 214, blur: 19, opacity: 0.36, swing: 5, duration: 9, flicker: 5, delay: -5 }, // prettier-ignore
    { angle: 15, width: 13, length: 205, blur: 29, opacity: 0.25, swing: 7, duration: 12, flicker: 3.8, delay: -10 }, // prettier-ignore
    { angle: 26, width: 10, length: 195, blur: 25, opacity: 0.29, swing: 6.5, duration: 7.5, flicker: 5.8, delay: -14 }, // prettier-ignore
    { angle: 38, width: 17, length: 188, blur: 42, opacity: 0.19, swing: 8.5, duration: 10.5, flicker: 4.2, delay: -3 }, // prettier-ignore
    { angle: 51, width: 20, length: 180, blur: 50, opacity: 0.15, swing: 10, duration: 13.5, flicker: 6.8, delay: -8 }, // prettier-ignore
  ];

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.trackPointer());
  }

  private trackPointer(): void {
    const element = this.host.nativeElement;
    const view = element.ownerDocument.defaultView;

    if (
      !view ||
      !this.followMouse() ||
      view.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      // Without a hovering pointer there is nothing to follow, and the listener
      // would only cost work during scroll-momentum pointer events.
      !view.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    let target = 0;
    let current = 0;
    let frame = 0;

    /** Eases toward the pointer instead of snapping, so the fan drifts. */
    const step = (): void => {
      current += (target - current) * 0.07;

      if (Math.abs(target - current) < 0.01) {
        current = target;
        frame = 0;
      } else {
        frame = view.requestAnimationFrame(step);
      }

      element.style.setProperty('--ray-tilt', `${current.toFixed(2)}deg`);
    };

    const onPointerMove = (event: PointerEvent): void => {
      const { left, width } = element.getBoundingClientRect();
      if (!width) return;

      const fromCentre = (event.clientX - (left + width / 2)) / (width / 2);
      target = Math.max(-1, Math.min(1, fromCentre)) * this.mouseInfluence();

      // The loop parks itself once settled, so it needs restarting on new input.
      if (!frame) frame = view.requestAnimationFrame(step);
    };

    // Pointer moves must not schedule change detection: nothing in the template
    // depends on them, the tilt is written straight to a custom property.
    this.zone.runOutsideAngular(() =>
      view.addEventListener('pointermove', onPointerMove, { passive: true })
    );

    this.destroyRef.onDestroy(() => {
      view.removeEventListener('pointermove', onPointerMove);
      if (frame) view.cancelAnimationFrame(frame);
    });
  }
}
