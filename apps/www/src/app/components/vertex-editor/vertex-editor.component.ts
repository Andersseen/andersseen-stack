import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vertex-editor',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <vertex-editor
      #editor
      [attr.value]="code"
      [attr.language]="language"
      [attr.theme]="theme"
      [attr.readonly]="readOnly ? 'true' : null"
      [attr.lineNumbers]="lineNumbers ? 'true' : 'false'"
      [attr.height]="height"
      [attr.wordWrap]="wordWrap ? 'true' : 'false'"
      style="display: block; border-radius: 8px; overflow: hidden;"
    ></vertex-editor>
  `,
  styles: [`
    :host {
      display: block;
      /* Without this the editor's intrinsic width pushes the page wider on mobile. */
      max-width: 100%;
      min-width: 0;
      overflow-x: auto;
    }
    vertex-editor {
      --vertex-editor-font-size: 13px;
      display: block;
      max-width: 100%;
    }
  `]
})
export class VertexEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editor', { static: true }) editorRef!: ElementRef<HTMLElement>;

  private readonly translate = inject(TranslateService);
  private contentObserver: MutationObserver | null = null;

  @Input() code = '';
  @Input() language: 'typescript' | 'javascript' | 'html' | 'css' | 'json' | 'markdown' = 'typescript';
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() readOnly = true;
  @Input() lineNumbers = true;
  @Input() height = '200px';
  @Input() wordWrap = true;

  private scriptLoaded = false;
  private static scriptPromise: Promise<void> | null = null;

  ngOnDestroy() {
    this.contentObserver?.disconnect();
  }

  /**
   * CodeMirror renders a `role="textbox"` contenteditable with no accessible
   * name, which fails WCAG "ARIA input fields must have an accessible name".
   * The editor mounts asynchronously after its bundle loads, so watch for it.
   */
  private labelEditableRegion(): void {
    const host = this.editorRef.nativeElement;

    const apply = (): boolean => {
      const editable = host.querySelector('[contenteditable]');
      if (!editable) {
        return false;
      }
      editable.setAttribute('aria-label', this.translate.instant('common.codeExample') as string);
      if (this.readOnly) {
        editable.setAttribute('aria-readonly', 'true');
      }
      return true;
    };

    if (apply()) {
      return;
    }

    this.contentObserver = new MutationObserver(() => {
      if (apply()) {
        this.contentObserver?.disconnect();
        this.contentObserver = null;
      }
    });
    this.contentObserver.observe(host, { childList: true, subtree: true });
  }

  ngAfterViewInit() {
    this.labelEditableRegion();
    void this.loadScript();
  }

  private loadScript(): Promise<void> {
    if (VertexEditorComponent.scriptPromise) {
      return VertexEditorComponent.scriptPromise;
    }

    if (document.querySelector('script[data-vertex-editor]')) {
      return Promise.resolve();
    }

    VertexEditorComponent.scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/web-editor.min.js';
      script.defer = true;
      script.setAttribute('data-vertex-editor', 'true');
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return VertexEditorComponent.scriptPromise;
  }
}
