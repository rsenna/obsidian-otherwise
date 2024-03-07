import SupernotesPlugin from 'src/main';

import {PluginSettingTab, App, Setting} from "obsidian";

export interface SupernotesPluginSettings {
  basic: {
    bla: string
  }
}

export const DEFAULT_SETTINGS: SupernotesPluginSettings = {
  basic: {
    bla: 'bla-bla'
  }
};

export interface HasSettings {
  loadSettings(): Promise<SupernotesPluginSettings>

  saveSettings(): Promise<void>
}

export class SupernotesSettingTab extends PluginSettingTab {
  plugin: SupernotesPlugin

  constructor(app: App, plugin: SupernotesPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  async display(): Promise<void> {
    const {containerEl} = this
    containerEl.empty()

    const createHeader = (text: string, desc?: string) => {
      const header = this.containerEl.createDiv({cls: 'setting-item setting-item-heading'});
      header.createDiv({text, cls: 'setting-item-name'})
      header.ariaLabel = desc ?? null
    }

    createHeader('Basic', 'Required information when connecting with Supernotes')

    new Setting(containerEl)
      .setName('Bla')
      .setDesc('Bla bla?')
      .setClass('bla')
      .addText(text => text
        .setPlaceholder('Enter your API Key')
        .setValue(this.plugin.settings.basic.bla)
        .onChange(async (value) => {
          this.plugin.settings.basic.bla = value;
          await this.plugin.saveSettings();
        }))
  }
}
