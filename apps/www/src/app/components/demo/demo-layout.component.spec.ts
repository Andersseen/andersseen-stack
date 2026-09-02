import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/angular';
import { DemoLayoutComponent } from './demo-layout.component';

describe('DemoLayoutComponent', () => {
  it('should render content', async () => {
    await render('<app-demo-layout accentRgb="255 0 0"><div data-testid="content">Hello</div></app-demo-layout>', {
      imports: [DemoLayoutComponent],
    });

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
