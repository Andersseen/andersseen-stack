import { routeMeta } from './index.page';

describe('index route', () => {
  it('redirects to the dashboard', () => {
    expect(routeMeta).toEqual({ redirectTo: '/dashboard', pathMatch: 'full' });
  });
});
