import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n';

let nextId = 0;

/**
 * Native `<select>` kept as the real control (free keyboard support and the
 * platform picker on mobile), rendered transparent on top of a compact pill
 * so the trigger can show a short code on small screens.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 py-1.5 pr-2 pl-2.5 text-sm text-white/80 transition focus-within:border-white/30 hover:bg-white/10 sm:gap-2 sm:pr-2.5 sm:pl-3"
    >
      <svg
        class="h-4 w-4 shrink-0 text-white/50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20a15.3 15.3 0 0 1 0-20" />
      </svg>

      <span aria-hidden="true" class="font-medium sm:hidden">{{ languageService.currentLabel().short }}</span>
      <span
        data-testid="active-language"
        aria-hidden="true"
        class="hidden whitespace-nowrap sm:inline"
        >{{ languageService.currentLabel().label }}</span
      >

      <svg
        class="h-3 w-3 shrink-0 text-white/40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>

      <label [attr.for]="selectId" class="sr-only">{{ 'language.select' | translate }}</label>
      <select
        [id]="selectId"
        (change)="onChange($event)"
        class="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-md bg-transparent text-transparent opacity-0 outline-none"
      >
        <!-- Selection is marked per option: [value] on the <select> is applied
             before the options exist, so the browser resets it back to the first one. -->
        @for (lang of languageService.languages; track lang.code) {
          <option [value]="lang.code" [selected]="lang.code === languageService.current()">
            {{ lang.label }}
          </option>
        }
      </select>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
      option {
        background-color: #0a0a0a;
        color: #e5e5e5;
      }
    `,
  ],
})
export class LanguageSwitcherComponent {
  protected readonly languageService = inject(LanguageService);

  /** Unique per instance so the label stays correctly associated if the nav renders more than one. */
  protected readonly selectId = `language-switcher-${nextId++}`;

  protected onChange(event: Event): void {
    void this.languageService.use((event.target as HTMLSelectElement).value);
  }
}
