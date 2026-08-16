import { PluginSettingTab, Setting } from 'obsidian';
import type ObsidianOfMistPlugin from './main';
import { System } from './types/types';

export interface ObsidianOfMistPluginSettings {
  defaultSystem: System;
}

export const DEFAULT_SETTINGS: ObsidianOfMistPluginSettings = {
  defaultSystem: System.city,
};

export class MyPluginSettingsTab extends PluginSettingTab {
  plugin: ObsidianOfMistPlugin;

  constructor(plugin: ObsidianOfMistPlugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Default System')
      .setDesc(
        'The default system to use for elements when none is specified.' +
        'Changing this will require you to reopen any files to take effect.')
      .addDropdown((dropdown) => {
        dropdown
          .addOption(System.city, 'City of Mist')
          .addOption(System.otherscape, ':Otherscape')
          .addOption(System.legend, 'Legend in the Mist')
          .setValue(this.plugin.settings.defaultSystem)
          .onChange(async (value) => {
            this.plugin.settings.defaultSystem = value as System;
            await this.plugin.saveSettings();
          });
      });
  }
}
