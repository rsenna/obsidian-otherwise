import OtherWisePlugin from 'src/main';

import {PluginSettingTab, App, Setting} from "obsidian";
export interface GlobalSettings {
  useMarkdownLinks: boolean
}
export interface OtherWisePluginSettings {
  basic: {
    fuzzySearch: boolean,
    alwaysShowSearchModal: boolean
  }
}
export const DEFAULT_SETTINGS: OtherWisePluginSettings = {
  basic: {
    fuzzySearch: true,
    alwaysShowSearchModal: false
  }
};
export interface HasSettings {
  getGlobalSettings(): GlobalSettings
  loadLocalSettings(): Promise<OtherWisePluginSettings>
  saveLocalSettings(): Promise<void>
}
export class OtherWiseSettingTab extends PluginSettingTab {
  plugin: OtherWisePlugin;
  constructor(app: App, plugin: OtherWisePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  async display(): Promise<void> {
    const {containerEl} = this;
    containerEl.empty();
    const createHeader = (text: string, desc?: string) => {
      const header = this.containerEl.createDiv({cls: 'setting-item setting-item-heading'});
      header.createDiv({text, cls: 'setting-item-name'})
      header.ariaLabel = desc ?? null
    };

    createHeader('OtherWise', 'Required OtherWise settings');

    new Setting(containerEl)
      .setName('Fuzzy Search')
      .setDesc('If link address searches should be fuzzy or not')
      .addToggle(it => it
        .setValue(this.plugin.localSettings.basic.fuzzySearch)
        .onChange(async (value: boolean): Promise<void> => {
          this.plugin.localSettings.basic.fuzzySearch = value;
          await this.plugin.saveLocalSettings();
        }));

    new Setting(containerEl)
      .setName('Always Show Search Modal')
      .setDesc('If queries with 1 or no results should still be presented to the user; if false, first query result is chosen by default')
      .addToggle(it => it
        .setValue(this.plugin.localSettings.basic.alwaysShowSearchModal)
        .onChange(async (value: boolean): Promise<void> => {
          this.plugin.localSettings.basic.alwaysShowSearchModal = value;
          await this.plugin.saveLocalSettings();
        }));
  }
}
