import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import HomePage from './index.page';

describe('HomePage', () => {
  it('renders the starter and responds to the primary action', async () => {
    const user = userEvent.setup();

    await render(HomePage);

    expect(screen.getByRole('heading', { name: /your application is ready/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /start building/i }));

    expect(screen.getByText(/ready when you are/i)).toBeInTheDocument();
  });
});
