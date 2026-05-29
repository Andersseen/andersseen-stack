import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/angular';
import { GithubIconComponent } from './github-icon.component';

describe('GithubIconComponent', () => {
  it('should render svg with default size', async () => {
    const { container } = await render(GithubIconComponent);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
  });

  it('should render svg with custom size', async () => {
    const { container } = await render(GithubIconComponent, {
      componentInputs: { size: 24 },
    });

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });
});
