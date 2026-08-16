import type ObsidianOfMistPlugin from '@src/main';
import {
  type System,
  type YamlSource,
} from '@src/types/types';

import { validateModelDataWithSchema } from '@utils/ValidateModelData';
import { CommonElementFields } from './CommonElementFields';

import schema from '@schemas/EvaluatedThemeCollection.yaml';
import { Theme } from './Theme';

export class ThemeCollection extends CommonElementFields {
  themes?: Array<Theme>;

  public static parseYaml(
    plugin: ObsidianOfMistPlugin,
    source: YamlSource,
  ): ThemeCollection {
    const data = validateModelDataWithSchema(source, schema);
    return ThemeCollection.parse(plugin, data);
  }

  public static parse(plugin: ObsidianOfMistPlugin, data: any): ThemeCollection {
    // `data` is a single theme's fields, a `{ themes: [...] }` collection, or a bare list of themes
    const raw_themes: Array<any> = Array.isArray(data) ? data : (data.themes ?? [data]);
    const theme_list = raw_themes.map((raw_theme) => Theme.parse(plugin, raw_theme));
    return new ThemeCollection(plugin, data.system, theme_list);
  }

  constructor(
    plugin: ObsidianOfMistPlugin,
    system?: System,
    themes?: Array<Theme>
  ) {
    super(plugin, system);
    this.themes = themes;
  }
}
