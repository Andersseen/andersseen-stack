import { Component, ElementRef, Input, ViewChild, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
    }
    vertex-editor {
      --vertex-editor-font-size: 13px;
    }
  `]
})
export class VertexEditorComponent implements AfterViewInit {
  @ViewChild('editor', { static: true }) editorRef!: ElementRef;

  @Input() code = '';
  @Input() language: 'typescript' | 'javascript' | 'html' | 'css' | 'json' | 'markdown' = 'typescript';
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() readOnly = true;
  @Input() lineNumbers = true;
  @Input() height = '200px';
  @Input() wordWrap = true;

  private scriptLoaded = false;
  private static scriptPromise: Promise<void> | null = null;

  ngAfterViewInit() {
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
