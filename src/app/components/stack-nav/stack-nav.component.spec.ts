import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { testTranslationProviders } from '../../testing/translate-testing';
import { StackNavComponent } from './stack-nav.component';

describe('StackNavComponent', () => {
  it('should render the brand name', async () => {
    await render(StackNavComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
    });
    expect(screen.getByText('Andersseen Stack')).toBeInTheDocument();
  });

  it('should render all navigation links', async () => {
    await render(StackNavComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
    });

    expect(screen.getByText('Volt UI')).toBeInTheDocument();
    expect(screen.getByText('Quartz')).toBeInTheDocument();
    expect(screen.getByText('Movement')).toBeInTheDocument();
    expect(screen.getByText('Lumen')).toBeInTheDocument();
  });

  it('should have a link to home', async () => {
    await render(StackNavComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
    });
    const homeLink = screen.getByText('Andersseen Stack').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  // Opening the drawer cannot be exercised here: ng-primitives resolves the host
  // ViewContainerRef from `applicationRef.components[0]`, which TestBed never
  // populates, so the overlay fails to attach. The open drawer (dialog role,
  // focus trap, scroll lock, close paths) is covered in e2e/landing.spec.ts.
  it('should render a drawer trigger that is hidden on desktop', async () => {
    await render(StackNavComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
    });

    const trigger = screen.getByRole('button', { name: 'Open menu' });
    expect(trigger).toHaveClass('md:hidden');
    expect(screen.queryByTestId('mobile-menu')).toBeNull();
  });

  it('should render exactly one language switcher', async () => {
    await render(StackNavComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
    });
    expect(document.querySelectorAll('app-language-switcher')).toHaveLength(1);
  });
});
