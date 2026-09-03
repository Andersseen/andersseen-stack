import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import HomePage from './index.page';

describe('HomePage', () => {
  it('renders the primary heading and the feature section', async () => {
    await render(HomePage, { routes: [] });

    expect(screen.getByRole('heading', { level: 1, name: /build your next application/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /a foundation, not a framework/i })).toBeInTheDocument();
  });

  it('gives the primary and secondary CTA correct semantics', async () => {
    const user = userEvent.setup();
    await render(HomePage, { routes: [] });

    const primaryCta = screen.getByRole('button', { name: /start building/i });
    const secondaryCta = screen.getByRole('link', { name: /learn more/i });

    expect(secondaryCta).toHaveAttribute('href', '#features');

    await user.click(primaryCta);
    expect(screen.getByText(/ready when you are/i)).toBeInTheDocument();
  });
});
