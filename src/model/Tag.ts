import type ObsidianOfMistPlugin from '@src/main';
import { TagType, type System, type YamlSource } from '@src/types/types';

import { validateModelDataWithSchema } from '@utils/ValidateModelData';
import { CommonElementFields } from '@model/CommonElementFields';

import schema from '@schemas/EvaluatedTag.yaml';

export class Tag extends CommonElementFields {
  text: string;
  type?: TagType;
  question?: string;
  burned?: boolean;
  tier?: number;
  sub_tier?: number;

  public static parseYaml(
    plugin: ObsidianOfMistPlugin,
    source: YamlSource,
  ): Tag {
    const data = validateModelDataWithSchema(Tag.normalizeSource(source), schema);
    return Tag.parse(plugin, data);
  }

  // Supports shorthand tag YAML: a plain string (just the tag text) or a
  // single-key mapping where the key is the text and the value holds the rest of the fields.
  private static normalizeSource(source: YamlSource): YamlSource {
    if (typeof source === 'string') {
      return { text: source };
    }

    if (
      source !== null &&
      typeof source === 'object' &&
      !Array.isArray(source)
    ) {
      const keys = Object.keys(source);
      const value = keys.length === 1 ? source[keys[0]] : undefined;
      if (keys.length === 1 && (value === null || typeof value === 'object')) {
        return { text: keys[0], ...(value ?? {}) };
      }
    }

    return source;
  }

  public static parse(plugin: ObsidianOfMistPlugin, data: any): Tag {
    console.log(data);
    
    return new Tag(
      plugin,
      data.text,
      data.system,
      data.type,
      data.question,
      data.burned,
      data.tier,
      data.sub_tier
    );
  }

  public static parseArray(plugin: ObsidianOfMistPlugin, data: Array<any>, type?: TagType): Array<Tag> {
    let output: Array<Tag> = [];

    console.log(data);

    data.forEach(tag => {
      const parsedTag = Tag.parseYaml(plugin, tag);
      if (type !== undefined) {
        parsedTag.type = type;
      }
      output.push(parsedTag);
    });

    return output;
  }

  constructor(
    plugin: ObsidianOfMistPlugin,
    text: string,
    system?: System,
    type?: TagType,
    question?: string,
    burned?: boolean,
    tier?: number,
    sub_tier?: number,
  ) {
    super(plugin, system);
    this.text = text;
    this.type = type;
    this.question = question;
    this.burned = burned;
    this.tier = tier;
    this.sub_tier = sub_tier;
  }
}
