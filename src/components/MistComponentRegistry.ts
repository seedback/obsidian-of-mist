import {
  Decoration,
  type DecorationSet,
  EditorView,
  ViewPlugin,
  WidgetType,
  type ViewUpdate,
} from '@codemirror/view';
import { RangeSetBuilder } from '@codemirror/state';

export type MistEditorComponentMode = 'rendered' | 'yaml';

export interface MistEditorComponentRenderer {
  regex: RegExp;
  createWidget(content: string, mode: MistEditorComponentMode): WidgetType;
  hiddenClass?: string;
}

const renderers: MistEditorComponentRenderer[] = [];

export function registerMistEditorComponent(renderer: MistEditorComponentRenderer): void {
  renderers.push(renderer);
}

export const mistEditorComponentsExtension = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.buildDecorations(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.buildDecorations(update.view);
      }
    }

    buildDecorations(view: EditorView): DecorationSet {
      const builder = new RangeSetBuilder<Decoration>();
      const text = view.state.doc.toString();
      const mode: MistEditorComponentMode = 'rendered';

      for (const renderer of renderers) {
        const regex = new RegExp(renderer.regex, 'g');
        let match: RegExpExecArray | null;

        while ((match = regex.exec(text)) !== null) {
          const start = match.index;
          const end = start + match[0].length;
          const content = match[1] ?? '';

          builder.add(
            start,
            start,
            Decoration.widget({
              widget: renderer.createWidget(content, mode),
              side: 1,
            }),
          );

          if (renderer.hiddenClass) {
            builder.add(
              start,
              end,
              Decoration.mark({ class: renderer.hiddenClass }),
            );
          }
        }
      }

      return builder.finish();
    }
  },
  {
    decorations: (value) => value.decorations,
  },
);
