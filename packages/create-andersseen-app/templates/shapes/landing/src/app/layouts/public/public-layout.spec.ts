import { TestBed } from '@angular/core/testing';
import { ViewportService } from '@quartz-headless/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { PublicLayout } from './public-layout';

describe('PublicLayout', () => {
  it('renders the primary navigation and the footer landmark', async () => {
    await render(PublicLayout, { routes: [] });

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Features' }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('opens the mobile menu from the navbar trigger and closes it on Escape', async () => {
    const user = userEvent.setup();
    await render(PublicLayout, { routes: [] });

    // Force the responsive breakpoint down to mobile — `ViewportService.setSize`
    // is the primitive Quartz ships specifically for tests (production reads the
    // real window size).
    TestBed.inject(ViewportService).setSize(360, 720);

    const trigger = await screen.findByRole('button', { name: 'Toggle menu' });

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    await user.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
