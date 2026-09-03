import { render, screen } from '@testing-library/angular';
import DashboardPage from './dashboard.page';

describe('DashboardPage', () => {
  it('renders the dashboard home heading', async () => {
    await render(DashboardPage);

    expect(screen.getByRole('heading', { name: /build your product/i })).toBeInTheDocument();
  });
});
