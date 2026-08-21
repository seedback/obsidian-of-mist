import type ObsidianOfMistPlugin from '@src/main';
import {
  TagType,
  ThemeType,
  type System,
  type YamlSource,
} from '@src/types/types';
import { Tag } from '@model/Tag';

import { validateModelDataWithSchema } from '@utils/ValidateModelData';
import { CommonElementFields } from './CommonElementFields';

import schema from '@schemas/baseSchemas/Theme.yaml';

export class Theme extends CommonElementFields {
  type?: ThemeType;
  themebook?: string;
  title?: string;
  tags?: Array<Tag>;
  identity?: string;
  improve?: number; // Pulls double duty for attention and upgrade too
  decay?: number; // Pulls double duty for crack, fade and abandon too
  milestone?: number;
  slow_and_steady?: boolean;

  public static parseYaml(
    plugin: ObsidianOfMistPlugin,
    source: YamlSource,
  ): Theme {
    const data = validateModelDataWithSchema(source, schema);
    return Theme.parse(plugin, data);
  }

  public static parse(plugin: ObsidianOfMistPlugin, data: any): Theme {
    let tag_list = Tag.parseArray(plugin, data.tags ?? [], {
      system: data.system,
    });

    tag_list = tag_list.concat(
      Tag.parseArray(plugin, data['power-tags'] ?? [], {
        system: data.system,
        type: TagType.power,
      }),
    );

    tag_list = tag_list.concat(
      Tag.parseArray(plugin, data['weakness-tags'] ?? [], {
        system: data.system,
        type: TagType.weakness,
      }),
    );

    tag_list = tag_list.concat(
      Tag.parseArray(plugin, data['story-tags'] ?? [], {
        system: data.system,
        type: TagType.story,
      }),
    );

    const improve: number | undefined =
      data.attention ?? data.upgrade ?? data.improve;
    const decay: number | undefined = data.crack ?? data.fade ?? data.decay;
    const milestone: number | undefined = data.milestone;

    return new Theme(
      plugin,
      data.system,
      data.type,
      data.title,
      data.themebook,
      tag_list,
      data.identity,
      improve,
      decay,
      milestone,
      data['slow-and-steady'],
    );
  }

  constructor(
    plugin: ObsidianOfMistPlugin,
    system?: System,
    type?: ThemeType,
    title?: string,
    themebook?: string,
    tags?: Array<Tag>,
    identity?: string,
    improve?: number,
    decay?: number,
    milestone?: number,
    slow_and_steady?: boolean,
  ) {
    super(plugin, system);
    this.type = type as ThemeType;
    this.title = title;
    this.themebook = themebook;
    this.tags = tags ?? [];
    this.identity = identity;
    this.improve = improve;
    this.decay = decay;
    this.milestone = milestone;
    this.slow_and_steady = slow_and_steady;
  }
}
