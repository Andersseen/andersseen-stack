export type DashboardNavIcon = 'dashboard' | 'projects' | 'settings';

export interface DashboardNavItem {
  readonly label: string;
  readonly route: string;
  readonly icon: DashboardNavIcon;
}

export interface DashboardNavGroup {
  readonly label: string;
  readonly items: readonly DashboardNavItem[];
}

export const DASHBOARD_NAVIGATION: readonly DashboardNavGroup[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
      { label: 'Projects', route: '/projects', icon: 'projects' },
    ],
  },
  {
    label: 'Workspace',
    items: [{ label: 'Settings', route: '/settings', icon: 'settings' }],
  },
];

export const DASHBOARD_NAV_ITEMS: readonly DashboardNavItem[] = DASHBOARD_NAVIGATION.flatMap((group) => group.items);
