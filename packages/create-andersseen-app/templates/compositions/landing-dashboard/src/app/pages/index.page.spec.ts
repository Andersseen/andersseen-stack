import { render, screen } from '@testing-library/angular';
import HomePage from './index.page';

describe('HomePage', () => {
  it('renders the primary heading and the feature section', async () => {
    await render(HomePage, { routes: [] });

    expect(screen.getByRole('heading', { level: 1, name: /build your next application/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /a foundation, not a framework/i })).toBeInTheDocument();
  });

  it('sends the primary CTA into the dashboard application shell', async () => {
    await render(HomePage, { routes: [] });

    const primaryCta = screen.getByRole('link', { name: /start building/i });
    const secondaryCta = screen.getByRole('link', { name: /learn more/i });

    expect(primaryCta).toHaveAttribute('href', '/dashboard');
    expect(secondaryCta).toHaveAttribute('href', '#features');
  });
});
