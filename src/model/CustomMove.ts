import type ObsidianOfMistPlugin from '@src/main';
import { type System, type YamlSource } from '@src/types/types';

import { validateModelDataWithSchema } from '@utils/ValidateModelData';
import { CommonElementFields } from '@model/CommonElementFields';

import schema from '@schemas/baseSchemas/NamedFeature.yaml';

export class CustomMove extends CommonElementFields {
  title: string;
  description: string;

  public static parseYaml(
    plugin: ObsidianOfMistPlugin,
    source: YamlSource,
  ): CustomMove {
    const data = validateModelDataWithSchema(
      CustomMove.normalizeSource(source),
      schema,
    );

    return CustomMove.parse(plugin, data);
  }

  /*
   * Supports shorthand Custom Move YAML:
   *
   * Taste for Blood: |
   *   Become relentless when blood is spilled.
   *
   * becomes:
   *
   * title: Taste for Blood
   * description: |
   *   Become relentless when blood is spilled.
   */
  private static normalizeSource(source: YamlSource): YamlSource {
    if (
      source !== null &&
      typeof source === 'object' &&
      !Array.isArray(source)
    ) {
      const keys = Object.keys(source);
      const value = keys.length === 1 ? source[keys[0]] : undefined;

      if (keys.length === 1) {
        if (typeof value === 'string') {
          return {
            title: keys[0],
            description: value,
          };
        }

        if (value === null || typeof value === 'object') {
          return {
            title: keys[0],
            ...(value ?? {}),
          };
        }
      }
    }

    return source;
  }

  public static parseArray(
    plugin: ObsidianOfMistPlugin,
    data: Array<any>,
    parentData?: any,
  ): Array<CustomMove> {
    const output: Array<CustomMove> = [];
  
    data.forEach((move) => {
      let source = CustomMove.normalizeSource(move);
  
      if (
        parentData?.system !== undefined &&
        typeof source === 'object' &&
        source !== null &&
        !Array.isArray(source)
      ) {
        source = {
          ...source,
          system: parentData.system,
        };
      }
  
      output.push(CustomMove.parseYaml(plugin, source));
    });
  
    return output;
  }

  public static parse(plugin: ObsidianOfMistPlugin, data: any): CustomMove {
    return new CustomMove(plugin, data.title, data.system, data.description);
  }

  constructor(
    plugin: ObsidianOfMistPlugin,
    title: string,
    system?: System,
    description?: string,
  ) {
    super(plugin, system);
    this.title = title;
    this.description = description ?? '';
  }
}
