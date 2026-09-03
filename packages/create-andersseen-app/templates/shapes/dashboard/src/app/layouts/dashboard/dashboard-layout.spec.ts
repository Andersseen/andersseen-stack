import { TestBed } from '@angular/core/testing';
import type { Routes } from '@angular/router';
import { ViewportService } from '@quartz-headless/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import DashboardPage from '../../pages/(app)/dashboard.page';
import ProjectsPage from '../../pages/(app)/projects.page';
import SettingsPage from '../../pages/(app)/settings.page';
import { DashboardLayout } from './dashboard-layout';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'projects', component: ProjectsPage },
  { path: 'settings', component: SettingsPage },
];

describe('DashboardLayout', () => {
  it('renders every navigation item and marks the current route as active', async () => {
    await render(DashboardLayout, { routes, initialRoute: 'projects' });

    expect(await screen.findByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute('aria-current');
  });

  it('collapses and expands the sidebar from its own toggle', async () => {
    const user = userEvent.setup();
    await render(DashboardLayout, { routes });

    expect(await screen.findByText('Overview')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    await waitFor(() => {
      expect(screen.queryByText('Overview')).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'Expand sidebar' }));
    await waitFor(() => {
      expect(screen.getByText('Overview')).toBeInTheDocument();
    });
  });

  it('opens the mobile sidebar overlay from the navbar trigger and closes it on Escape', async () => {
    const user = userEvent.setup();
    await render(DashboardLayout, { routes });

    // Force the responsive breakpoint down to mobile — `ViewportService.setSize`
    // is the primitive Quartz ships specifically for tests (production reads the
    // real window size).
    TestBed.inject(ViewportService).setSize(360, 720);

    const trigger = await screen.findByRole('button', { name: 'Toggle navigation' });

    // Quartz's `autoCloseOnMobile` (on by default) closes the sidebar the moment
    // it becomes a mobile overlay.
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
