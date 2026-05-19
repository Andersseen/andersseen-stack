import { render, screen } from '@testing-library/angular';
import { StackNavComponent } from './stack-nav.component';
import { provideRouter } from '@angular/router';

describe('StackNavComponent', () => {
  it('should render the brand name', async () => {
    await render(StackNavComponent, {
      providers: [provideRouter([])],
    });
    expect(screen.getByText('Andersseen Stack')).toBeInTheDocument();
  });

  it('should render all navigation links', async () => {
    await render(StackNavComponent, {
      providers: [provideRouter([])],
    });

    expect(screen.getByText('Volt UI')).toBeInTheDocument();
    expect(screen.getByText('Quartz')).toBeInTheDocument();
    expect(screen.getByText('Movement')).toBeInTheDocument();
    expect(screen.getByText('Lumen')).toBeInTheDocument();
  });

  it('should have a link to home', async () => {
    await render(StackNavComponent, {
      providers: [provideRouter([])],
    });
    const homeLink = screen.getByText('Andersseen Stack').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
