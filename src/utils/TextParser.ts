import type ObsidianOfMistPlugin from '@src/main';
import type { TFile } from 'obsidian';

export type ParsedTextToken =
  | {
      type: 'newline';
    }
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'power';
      text: string;
    }
  | {
      type: 'weakness';
      text: string;
    }
  | {
      type: 'status';
      text: string;
    }
  | {
      type: 'limit';
      text: string;
    }
  | {
      type: 'story';
      text: string;
    }
  | {
      type: 'wikilink';
      text: string;
      target: string;
      alias?: string;
      subpath?: string;
      resolvedPath?: string;
      resolvedLink?: string;
      file?: TFile;
    };

const TYPE_BY_MARKER = {
  '+': 'power',
  '-': 'weakness',
  '%': 'status',
  '@': 'limit',
  '#': 'story',
} as const;

export function parseText(
  plugin: ObsidianOfMistPlugin,
  source: string,
  sourcePath: string,
): ParsedTextToken[] {
  const tokens: ParsedTextToken[] = [];

  const pattern = /==([+\-%#@])([\s\S]*?)==|\[\[([^\]]+?)\]\]|(\\n)/g;

  let lastIndex = 0;

  for (const match of source.matchAll(pattern)) {
    const index = match.index;

    if (index > lastIndex) {
      tokens.push({
        type: 'text',
        text: source.slice(lastIndex, index),
      });
    }

    if (match[1] !== undefined) {
      const marker = match[1] as keyof typeof TYPE_BY_MARKER;

      tokens.push({
        type: TYPE_BY_MARKER[marker],
        text: match[2],
      });
    } else if (match[3] !== undefined) {
      tokens.push(parseWikilink(plugin, match[3], sourcePath));
    } else {
      tokens.push({
        type: 'newline',
      });
    }

    lastIndex = index + match[0].length;
  }

  if (lastIndex < source.length) {
    tokens.push({
      type: 'text',
      text: source.slice(lastIndex),
    });
  }

  return tokens;
}

function parseWikilink(
  plugin: ObsidianOfMistPlugin,
  linktext: string,
  sourcePath: string,
): ParsedTextToken {
  const pipeIndex = linktext.indexOf('|');

  const target = pipeIndex === -1 ? linktext : linktext.slice(0, pipeIndex);

  const alias = pipeIndex === -1 ? undefined : linktext.slice(pipeIndex + 1);

  const hashIndex = target.indexOf('#');

  const linkpath = hashIndex === -1 ? target : target.slice(0, hashIndex);

  const subpath = hashIndex === -1 ? undefined : target.slice(hashIndex);

  const file = plugin.app.metadataCache.getFirstLinkpathDest(
    linkpath,
    sourcePath,
  );

  return {
    type: 'wikilink',
    text: linktext,
    target,
    alias,
    subpath,
    file: file ?? undefined,
    resolvedPath: file?.path,
    resolvedLink: file !== null ? `${file.path}${subpath ?? ''}` : undefined,
  };
}
