import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { testTranslationProviders } from '../../testing/translate-testing';
import { DemoHeaderComponent } from './demo-header.component';

describe('DemoHeaderComponent', () => {
  it('should render title and description', async () => {
    await render(DemoHeaderComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
      componentInputs: {
        title: 'Test Lib',
        description: 'A test description',
      },
    });

    expect(screen.getByText('Test Lib')).toBeInTheDocument();
    expect(screen.getByText('A test description')).toBeInTheDocument();
  });

  it('should render back link', async () => {
    await render(DemoHeaderComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
      componentInputs: {
        title: 'Test Lib',
        description: 'A test description',
      },
    });

    const backLink = screen.getByText('← Back');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('should render install pill when packageName is provided', async () => {
    await render(DemoHeaderComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
      componentInputs: {
        title: 'Test Lib',
        description: 'A test description',
        packageName: '@test/lib',
      },
    });

    expect(screen.getByText('npm install @test/lib')).toBeInTheDocument();
  });

  it('should render GitHub link when githubUrl is provided', async () => {
    await render(DemoHeaderComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
      componentInputs: {
        title: 'Test Lib',
        description: 'A test description',
        githubUrl: 'https://github.com/test/lib',
      },
    });

    const githubLink = screen.getByText('GitHub').closest('a');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/lib');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('should render Live Demo link when demoUrl is provided', async () => {
    await render(DemoHeaderComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
      componentInputs: {
        title: 'Test Lib',
        description: 'A test description',
        demoUrl: 'https://demo.example.com',
      },
    });

    const demoLink = screen.getByText('Live Demo').closest('a');
    expect(demoLink).toHaveAttribute('href', 'https://demo.example.com');
    expect(demoLink).toHaveAttribute('target', '_blank');
  });

  it('should not render optional elements when not provided', async () => {
    await render(DemoHeaderComponent, {
      providers: [provideRouter([]), ...testTranslationProviders],
      componentInputs: {
        title: 'Test Lib',
        description: 'A test description',
      },
    });

    expect(screen.queryByText(/npm install/)).not.toBeInTheDocument();
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
    expect(screen.queryByText('Live Demo')).not.toBeInTheDocument();
  });
});
