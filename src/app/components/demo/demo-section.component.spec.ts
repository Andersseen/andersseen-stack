import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/angular';
import { DemoSectionComponent } from './demo-section.component';

describe('DemoSectionComponent', () => {
  it('should render content inside section', async () => {
    await render('<app-demo-section><div data-testid="section-content">Section Content</div></app-demo-section>', {
      imports: [DemoSectionComponent],
    });

    expect(screen.getByTestId('section-content')).toBeInTheDocument();
  });
});
