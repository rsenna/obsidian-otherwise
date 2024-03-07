import {Editor, MarkdownView, Notice, Plugin, Vault} from 'obsidian';
import {
  DEFAULT_SETTINGS,
  GlobalSettings,
  HasSettings,
  OtherWisePluginSettings,
  OtherWiseSettingTab
} from "./settings";
import {makeLink, editLink} from "./commands";

// REMEMBER to run during development: npm run dev

export default class OtherWisePlugin extends Plugin implements HasSettings {
  localSettings: OtherWisePluginSettings;

  onload = async () => {
    await this.loadLocalSettings();

    // This creates an icon in the left ribbon.
    const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
      // Called when the user clicks the icon.
      new Notice('This is a notice!');
    });

    // Perform additional things with the ribbon
    ribbonIconEl.addClass('my-plugin-ribbon-class');

    // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText('Status Bar Text');

    this.addCommand({
      id: 'otherwise-make-link',
      name: 'Make link: Turn current word, link or selection into a link, using the default link format',
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) =>
        makeLink(this.app, editor, this.getGlobalSettings, this.localSettings, checking)
    });

    this.addCommand({
      id: 'otherwise-edit-link',
      name: 'Edit link',
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) =>
        editLink(this.app, editor, view, this.localSettings, checking)
    });

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new OtherWiseSettingTab(this.app, this));

    // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
    // Using this function will automatically remove the event listener when this plugin is disabled.
    this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
      console.log('click', evt);
    });

    // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
    this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
  }

  onunload = () => {
    // TODO
  }

  getGlobalSettings = (): GlobalSettings => {
    // @ts-ignore
    const userMarkdownLinks = this.app.vault.getConfig('useMarkdownLinks') as boolean

    return {
      useMarkdownLinks: userMarkdownLinks
    }
  }

   loadLocalSettings = async (): Promise<OtherWisePluginSettings> => {
    return this.localSettings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

   saveLocalSettings = async () => {
    await this.saveData(this.localSettings);
  }
}
