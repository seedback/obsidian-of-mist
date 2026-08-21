import type ObsidianOfMistPlugin from '@src/main';
import type { System, YamlSource } from '@src/types/types';

import { CommonElementFields } from '@model/CommonElementFields';
import { DangerProfile } from '@model/DangerProfile';

import { validateModelDataWithSchema } from '@utils/ValidateModelData';

import schema from '@schemas/EvaluatedDangerProfile.yaml';

export class DangerProfileCollection extends CommonElementFields {
  danger_profiles?: Array<DangerProfile>;

  public static parseYaml(
    plugin: ObsidianOfMistPlugin,
    source: YamlSource,
  ): DangerProfileCollection {
    const data = validateModelDataWithSchema(source, schema);
    return DangerProfileCollection.parse(plugin, data);
  }

  public static parse(
    plugin: ObsidianOfMistPlugin,
    data: any,
  ): DangerProfileCollection {
    const raw_profiles: Array<any> = Array.isArray(data)
      ? data
      : (data['danger-profiles'] ?? data.profiles ?? [data]);

    const danger_profile_list = raw_profiles.map((raw_profile) =>
      DangerProfile.parse(plugin, raw_profile),
    );

    return new DangerProfileCollection(
      plugin,
      Array.isArray(data) ? undefined : data.system,
      danger_profile_list,
    );
  }

  constructor(
    plugin: ObsidianOfMistPlugin,
    system?: System,
    danger_profiles?: Array<DangerProfile>,
  ) {
    super(plugin, system);
    this.danger_profiles = danger_profiles;
  }
}