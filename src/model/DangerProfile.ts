import type ObsidianOfMistPlugin from '@src/main';
import {
  TagType,
  type System,
  type YamlSource,
} from '@src/types/types';

import { Tag } from '@model/Tag';
import { CustomMove } from '@model/CustomMove';

import { validateModelDataWithSchema } from '@utils/ValidateModelData';
import { CommonElementFields } from '@model/CommonElementFields';

import schema from '@schemas/baseSchemas/DangerProfile.yaml';

export class DangerProfile extends CommonElementFields {
  name: string;
  danger_rating: Array<number>;
  is_mythos_power: boolean;
  description: string;
  spectrums: Array<Tag>;
  custom_moves: Array<CustomMove>;
  hard_moves: Array<string>;
  soft_moves: Array<string>;

  public static parseYaml(
    plugin: ObsidianOfMistPlugin,
    source: YamlSource,
  ): DangerProfile {
    const data = validateModelDataWithSchema(source, schema);
    return DangerProfile.parse(plugin, data);
  }

  public static parse(
    plugin: ObsidianOfMistPlugin,
    data: any,
  ): DangerProfile {
    const spectrum_type =
      data.spectrums !== undefined
        ? TagType.spectrum
        : TagType.limit;

    const danger_rating = Array.isArray(data["danger-rating"])
        ? data["danger-rating"]
        : [data["danger-rating"]];

    const spectrums = Tag.parseArray(
      plugin,
      data.spectrums ?? data.limits ?? [],
      {
        system: data.system,
        type: spectrum_type,
      },
    );

    const custom_moves = CustomMove.parseArray(
      plugin,
      data['custom-moves'] ?? [],
      data,
    );

    return new DangerProfile(
      plugin,
      data.system,
      data.name,
      danger_rating,
      data["is-mythos-power"],
      data.description,
      spectrums,
      custom_moves,
      data['hard-moves'],
      data['soft-moves'],
    );
  }

  constructor(
    plugin: ObsidianOfMistPlugin,
    system?: System,
    name?: string,
    danger_rating?: Array<number>,
    is_mythos_power?: boolean,
    description?: string,
    spectrums?: Array<Tag>,
    custom_moves?: Array<CustomMove>,
    hard_moves?: Array<string>,
    soft_moves?: Array<string>,
  ) {
    super(plugin, system);

    this.name = name ?? '';
    this.danger_rating = danger_rating ?? [];
    this.is_mythos_power = is_mythos_power ?? false;
    this.description = description ?? '';
    this.spectrums = spectrums ?? [];
    this.custom_moves = custom_moves ?? [];
    this.hard_moves = hard_moves ?? [];
    this.soft_moves = soft_moves ?? [];
  }
}