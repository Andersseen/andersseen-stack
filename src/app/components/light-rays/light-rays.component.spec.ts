import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/angular';
import { LightRaysComponent } from './light-rays.component';

describe('LightRaysComponent', () => {
  // The exact count is tuning, not behaviour — assert the fan exists and each
  // beam carries its geometry, so retuning the rays does not break the test.
  it('should render the ray fan', async () => {
    const { container } = await render(LightRaysComponent);
    const rays = Array.from(container.querySelectorAll<HTMLElement>('.ray'));

    expect(rays.length).toBeGreaterThan(1);
    for (const ray of rays) {
      expect(ray.style.getPropertyValue('--ray-angle')).toMatch(/deg$/);
    }
  });

  it('should be hidden from assistive technology', async () => {
    const { fixture } = await render(LightRaysComponent);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('should expose colour and intensity as custom properties', async () => {
    const { fixture } = await render(LightRaysComponent, {
      inputs: { color: 'rgb(1 2 3)', intensity: 0.5 },
    });
    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--ray-color')).toBe('rgb(1 2 3)');
    expect(host.style.getPropertyValue('--ray-gain')).toBe('0.5');
  });
});
