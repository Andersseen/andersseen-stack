import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/angular';
import { DemoCardComponent } from './demo-card.component';

describe('DemoCardComponent', () => {
  it('should render content', async () => {
    await render('<app-demo-card><div data-testid="card-content">Card Content</div></app-demo-card>', {
      imports: [DemoCardComponent],
    });

    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('should apply vt-destination-card class when isDestination is true', async () => {
    const { container } = await render(
      '<app-demo-card [isDestination]="true"><div>Content</div></app-demo-card>',
      { imports: [DemoCardComponent] }
    );

    const card = container.querySelector('volt-card');
    expect(card?.classList.contains('vt-destination-card')).toBe(true);
  });
});
