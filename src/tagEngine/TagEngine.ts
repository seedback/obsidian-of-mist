import {
  Decoration,
  type DecorationSet,
  EditorView,
  ViewPlugin,
  WidgetType,
  type ViewUpdate,
} from '@codemirror/view';
import { RangeSetBuilder } from '@codemirror/state';
import { createApp } from 'vue';
import MistTag from '@components/tag/MistTag.vue';

export const MIST_TAG_REGEX =
  /==([\+\-\*@#%])([^\r\n:()]+?)(?::([\d-xX]))?(\([\d-xX]\))?==/g;
const MIST_TAG_TEXT_REGEX =
  /^([\+\-\*@#%])([^\r\n:()]+?)(?::([\d-xX]))?(\([\d-xX]\))?$/;

interface MistTagData {
  specifier: string;
  content: string;
  status_tier: string;
  limit_tier: string;
}

type MistTagMatch = RegExpMatchArray | RegExpExecArray;

function parseMistTagMatch(match: MistTagMatch): MistTagData | null {
  const content = match[2]?.trim();
  if (!content) {
    return null;
  }

  return {
    specifier: match[1],
    content,
    status_tier: match[3] ?? '',
    limit_tier: match[4]?.replace(/^\(/, '')?.replace(/\)$/, '') ?? '',
  };
}

function createMistTagElement(data: MistTagData, is_edit_mode: boolean): HTMLSpanElement {
  const container = document.createElement('span');
  container.className = 'mist-tag-wrapper';

  const app = createApp(MistTag, {
    is_edit_mode,
    ...data,
  });
  app.mount(container);

  return container;
}

class MistTagWidget extends WidgetType {
  constructor(
    private readonly is_edit_mode: boolean,
    private readonly specifier: string,
    private readonly content: string,
    private readonly status_tier: string,
    private readonly limit_tier: string,
    private readonly from: number,
    private readonly to: number,
  ) {
    super();
  }

  toDOM(view: EditorView): HTMLElement {
    const container = createMistTagElement(
      {
        specifier: this.specifier,
        content: this.content,
        status_tier: this.status_tier,
        limit_tier: this.limit_tier,
      },
      this.is_edit_mode,
    );

    container.addEventListener('mousedown', (event: MouseEvent) => {
      event.preventDefault();
      const position = this.getClickPosition(event, container);
      if (position !== null) {
        view.dispatch({
          selection: { anchor: Math.min(Math.max(position, this.from), this.to) },
          scrollIntoView: true,
        });
      }
    });

    return container;
  }

  private getClickPosition(event: MouseEvent, container: HTMLElement): number | null {
    const doc = container.ownerDocument as Document & {
      caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number };
      caretRangeFromPoint?: (x: number, y: number) => Range | null;
    };

    let node: Node | null = null;
    let offset = 0;

    if (doc.caretPositionFromPoint) {
      const caret = doc.caretPositionFromPoint(event.clientX, event.clientY);
      if (caret) {
        node = caret.offsetNode;
        offset = caret.offset;
      }
    } else if (doc.caretRangeFromPoint) {
      const range = doc.caretRangeFromPoint(event.clientX, event.clientY);
      if (range) {
        node = range.startContainer;
        offset = range.startOffset;
      }
    }

    if (!node) {
      return null;
    }

    const textNode = this.findTextNode(node);
    if (!textNode) {
      return this.from;
    }

    const localOffset = Math.min(offset, textNode.nodeValue?.length ?? 0);
    return this.from + localOffset;
  }

  private findTextNode(node: Node): Text | null {
    if (node.nodeType === Node.TEXT_NODE) {
      return node as Text;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      for (const child of Array.from(element.childNodes)) {
        const textNode = this.findTextNode(child);
        if (textNode) {
          return textNode;
        }
      }
    }

    return null;
  }
}

const tagEngineExtension = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.buildDecorations(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.selectionSet || update.viewportChanged) {
        this.decorations = this.buildDecorations(update.view);
      }
    }

    buildDecorations(view: EditorView) {
      const builder = new RangeSetBuilder<Decoration>();
      const text = view.state.doc.toString();
      const regex = new RegExp(MIST_TAG_REGEX);
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        const tag = parseMistTagMatch(match);
        if (!tag) {
          continue;
        }

        const start = match.index;
        const end = start + match[0].length;
        const selection = view.state.selection.main;
        const isEditing =
          selection.empty && selection.from >= start && selection.to <= end;

        if (isEditing) {
          builder.add(
            start,
            end,
            Decoration.mark({ class: 'mist-tag-editing-wrapper' }),
          );
          continue;
        }

        builder.add(
          start,
          start,
          Decoration.widget({
            widget: new MistTagWidget(
              true,
              tag.specifier,
              tag.content,
              tag.status_tier,
              tag.limit_tier,
              start,
              end,
            ),
            side: 1,
          }),
        );

        builder.add(
          start,
          end,
          Decoration.mark({ class: 'mist-tag-hidden-text' }),
        );
      }

      return builder.finish();
    }
  },
  {
    decorations: (value) => value.decorations,
  },
);

function applyPowerTagToElement(element: HTMLElement): void {
  const markElements = Array.from(element.querySelectorAll('mark'));
  for (const markElement of markElements) {
    const text = markElement.textContent?.trim() ?? '';
    const match = text.match(MIST_TAG_TEXT_REGEX);
    if (!match) {
      continue;
    }

    const tag = parseMistTagMatch(match);
    if (!tag) {
      continue;
    }

    markElement.replaceWith(createMistTagElement(tag, false));
  }

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const parent = node.parentElement;

    if (parent?.closest('pre, code')) {
      continue;
    }

    textNodes.push(node);
  }

  for (const node of textNodes) {
    const value = node.nodeValue ?? '';
    if (!value.includes('==')) {
      continue;
    }

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    const regex = new RegExp(MIST_TAG_REGEX);

    while ((match = regex.exec(value)) !== null) {
      const tag = parseMistTagMatch(match);
      if (!tag) {
        continue;
      }

      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(value.slice(lastIndex, match.index)),
        );
      }

      fragment.appendChild(createMistTagElement(tag, false));
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < value.length) {
      fragment.appendChild(document.createTextNode(value.slice(lastIndex)));
    }

    if (fragment.childNodes.length > 0 && node.parentNode) {
      node.parentNode.replaceChild(fragment, node);
    }
  }
}

export const tagEngine = {
  extension: tagEngineExtension,
  applyPowerTagToElement,
};
