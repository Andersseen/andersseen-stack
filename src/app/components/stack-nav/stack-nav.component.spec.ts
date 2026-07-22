import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
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

  it('should toggle the mobile menu', async () => {
    await render(StackNavComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
    });

    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.querySelector('#mobile-menu')).toBeNull();

    await userEvent.click(toggle);

    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(document.querySelector('#mobile-menu')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(document.querySelector('#mobile-menu')).toBeNull();
  });

  it('should render exactly one language switcher', async () => {
    await render(StackNavComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
    });
    expect(document.querySelectorAll('app-language-switcher')).toHaveLength(1);
  });
});
