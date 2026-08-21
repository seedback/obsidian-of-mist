import type ObsidianOfMistPlugin from '@src/main';
import type { System, YamlSource } from '@src/types/types';

import { CommonElementFields } from '@model/CommonElementFields';
import { Theme } from '@model/Theme';

import { validateModelDataWithSchema } from '@utils/ValidateModelData';

import schema from '@schemas/EvaluatedTheme.yaml';

export class ThemeCollection extends CommonElementFields {
  themes?: Array<Theme>;

  public static parseYaml(
    plugin: ObsidianOfMistPlugin,
    source: YamlSource,
  ): ThemeCollection {
    const data = validateModelDataWithSchema(source, schema);
    return ThemeCollection.parse(plugin, data);
  }

  public static parse(
    plugin: ObsidianOfMistPlugin,
    data: any,
  ): ThemeCollection {
    const raw_themes: Array<any> = Array.isArray(data)
      ? data
      : (data.themes ?? [data]);

    const theme_list = raw_themes.map((raw_theme) =>
      Theme.parse(plugin, raw_theme),
    );

    return new ThemeCollection(
      plugin,
      Array.isArray(data) ? undefined : data.system,
      theme_list,
    );
  }

  constructor(
    plugin: ObsidianOfMistPlugin,
    system?: System,
    themes?: Array<Theme>,
  ) {
    super(plugin, system);
    this.themes = themes;
  }
}