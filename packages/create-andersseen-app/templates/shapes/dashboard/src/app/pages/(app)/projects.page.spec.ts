import { render, screen } from '@testing-library/angular';
import ProjectsPage from './projects.page';

describe('ProjectsPage', () => {
  it('renders the projects heading', async () => {
    await render(ProjectsPage);

    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
  });
});
