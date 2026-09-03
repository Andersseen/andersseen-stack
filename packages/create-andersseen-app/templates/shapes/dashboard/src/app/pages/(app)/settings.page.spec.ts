import { render, screen } from '@testing-library/angular';
import SettingsPage from './settings.page';

describe('SettingsPage', () => {
  it('renders the settings heading', async () => {
    await render(SettingsPage);

    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
  });
});
