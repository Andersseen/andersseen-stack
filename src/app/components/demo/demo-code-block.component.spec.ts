import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/angular';
import { DemoCodeBlockComponent } from './demo-code-block.component';

describe('DemoCodeBlockComponent', () => {
  it('should render code content', async () => {
    await render(DemoCodeBlockComponent, {
      componentInputs: {
        code: 'npm install @test/lib',
      },
    });

    expect(screen.getByText('npm install @test/lib')).toBeInTheDocument();
  });
});
