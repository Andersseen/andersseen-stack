import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-public-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer id="footer" class="border-t border-border">
      <div
        class="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between"
      >
        <a routerLink="/" class="font-semibold text-foreground">__PROJECT_NAME__</a>

        <nav aria-label="Footer">
          <a href="#features" class="hover:text-foreground">Features</a>
        </nav>

        <p>&copy; {{ year }} __PROJECT_NAME__. Built with Andersseen Stack.</p>
      </div>
    </footer>
  `,
})
export class PublicFooter {
  protected readonly year = new Date().getFullYear();
}
