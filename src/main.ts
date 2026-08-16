import { Plugin } from 'obsidian';

import {
  type ObsidianOfMistPluginSettings,
  DEFAULT_SETTINGS,
  MyPluginSettingsTab,
} from '@src/settings';
import { tagEngine } from '@src/tagEngine/TagEngine';
import '@styles/main.scss';
import { registerElements } from '@utils/RegisterElements';
import {
  initializeSchemaRegistry,
  resetSchemaRegistry,
} from '@utils/JsonSchemaValidator';

import commonElementFieldsSchema from '@schemas/baseSchemas/CommonElementFields.yaml';
import questionLetterSchema from '@schemas/baseSchemas/QuestionLetter.yaml';
import simplifiedTagSchema from '@schemas/baseSchemas/SimplifiedTag.yaml';
import tagSchema from '@schemas/baseSchemas/Tag.yaml';
import themeSchema from '@schemas/baseSchemas/Theme.yaml';

export default class ObsidianOfMistPlugin extends Plugin {
  settings: ObsidianOfMistPluginSettings = DEFAULT_SETTINGS;

  async onload() {
    console.log('Obsidian of Mist Plugin.');

    // Initialize schema registry with all common schemas
    this.initializeSchemas(); // Not implemented (copying from DSE)

    await this.loadSettings();
    this.addSettingTab(new MyPluginSettingsTab(this));

    registerElements(this);

    this.registerMarkdownPostProcessor((element) => {
      tagEngine.applyPowerTagToElement(element);
    });
    this.registerEditorExtension(tagEngine.extension);
  }

  /**
   * Initialize all JSON schemas for validation
   * This registers only dependency schemas that other schemas reference
   */
  private initializeSchemas() {
    const dependencySchemas = [
      this.createSchemaInitializer(commonElementFieldsSchema),
      this.createSchemaInitializer(questionLetterSchema),
      this.createSchemaInitializer(simplifiedTagSchema),
      this.createSchemaInitializer(tagSchema),
      this.createSchemaInitializer(themeSchema),
      // Add more dependency schemas here as needed
      // Note: Don't register main schemas that are only being validated directly
    ];

    initializeSchemaRegistry(dependencySchemas);
  }

  private createSchemaInitializer(schema: Record<string, any>): {
    id: string;
    schema: Record<string, any>;
  } {
    return {
      id: schema.$id ?? '',
      schema: schema,
    };
  }

  onunload() {
    resetSchemaRegistry();
    console.log('Obsidian of Mist Plugin unloaded and schema registry reset');
  }

  async loadSettings() {
    this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async activateView() {}
}
