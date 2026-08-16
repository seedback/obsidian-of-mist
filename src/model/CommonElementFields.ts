import type ObsidianOfMistPlugin from '@src/main';
import type { System, YamlSource } from '@src/types/types';

import { validateModelDataWithSchema } from '@utils/ValidateModelData';

import schema from '@schemas/baseSchemas/CommonElementFields.yaml';

export class CommonElementFields {
  system: System;

  public static parseYaml(
    plugin: ObsidianOfMistPlugin,
    source: YamlSource,
  ): CommonElementFields {
    const data = validateModelDataWithSchema(source, schema);
    return CommonElementFields.parse(plugin, data);
  }

  public static parse(
    plugin: ObsidianOfMistPlugin,
    data: any,
  ): CommonElementFields {
    return new CommonElementFields(plugin, data?.system);
  }

  constructor(plugin: ObsidianOfMistPlugin, system?: System) {
    this.system = system ?? plugin?.settings?.defaultSystem;
  }
}
