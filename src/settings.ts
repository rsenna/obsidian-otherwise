import OtherWisePlugin from 'src/main';

import {PluginSettingTab, App, Setting} from "obsidian";

export interface GlobalSettings {
  useMarkdownLinks: boolean
}

export interface OtherWisePluginSettings {
  basic: {
    bla: string
  }
}

export const DEFAULT_SETTINGS: OtherWisePluginSettings = {
  basic: {
    bla: 'bla-bla'
  }
};

export interface HasSettings {
  getGlobalSettings(): GlobalSettings
  loadLocalSettings(): Promise<OtherWisePluginSettings>
  saveLocalSettings(): Promise<void>
}

export class OtherWiseSettingTab extends PluginSettingTab {
  plugin: OtherWisePlugin

  constructor(app: App, plugin: OtherWisePlugin) {
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

    createHeader('Basic', 'Required information when connecting with OtherWise')

    new Setting(containerEl)
      .setName('Bla')
      .setDesc('Bla bla?')
      .setClass('bla')
      .addText(text => text
        .setPlaceholder('Enter your API Key')
        .setValue(this.plugin.localSettings.basic.bla)
        .onChange(async (value) => {
          this.plugin.localSettings.basic.bla = value;
          await this.plugin.saveLocalSettings();
        }))
  }
}
