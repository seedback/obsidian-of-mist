import { parseYaml } from 'obsidian';
import {
  validateDataWithSchema,
  type ValidationError,
} from '@utils/JsonSchemaValidator';

export function validateModelDataWithSchema(
  source: string | Record<string, any> | Array<any> | null | undefined,
  schema: Record<string, any>,
) {
  try {
    const parsedData =
      typeof source === 'string'
        ? source.trim()
          ? parseYaml(source)
          : {}
        : source ?? {};

    if (parsedData === null || parsedData === undefined) {
      return {};
    }

    // Validate YAML content against YAML schema (all dependencies pre-registered)
    const validation = validateDataWithSchema(parsedData, schema);
    if (!validation.valid) {
      const errorMessages = validation.errors
        .map((error: ValidationError) => `${error.path}: ${error.message}`)
        .join(', ');
      throw new Error('Schema validation failed: ' + errorMessages);
    }

    return parsedData;
  } catch (error: any) {
    throw new Error(
      'Invalid YAML format: ' + (error?.message ?? String(error)),
    );
  }
}
