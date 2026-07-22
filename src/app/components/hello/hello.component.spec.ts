import { render, screen } from '@testing-library/angular';
import { testTranslationProviders } from '../../testing/translate-testing';
import { HelloComponent } from './hello.component';

describe('HelloComponent', () => {
  it('should render default greeting', async () => {
    await render(HelloComponent, {
      providers: [...testTranslationProviders],
    });
    expect(screen.getByTestId('greeting')).toHaveTextContent('Hello, World!');
  });

  it('should render custom name', async () => {
    await render(HelloComponent, {
      providers: [...testTranslationProviders],
      inputs: { name: 'Andersseen Stack' },
    });
    expect(screen.getByTestId('greeting')).toHaveTextContent(
      'Hello, Andersseen Stack!'
    );
  });
});
