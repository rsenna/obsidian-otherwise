import {Editor, MarkdownView, Notice, Plugin,} from 'obsidian';
import {DEFAULT_SETTINGS, SupernotesPluginSettings, SupernotesSettingTab} from "./settings";
import {addLinkCurrentWordSelection, editLink} from "./commands";

// REMEMBER to run during development: npm run dev

export default class OtherWisePlugin extends Plugin {
  settings: SupernotesPluginSettings;

  async onload() {
    await this.loadSettings();

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
      id: 'otherwise-add-link-word-selection',
      name: 'Add link to current word/selection',
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) =>
        addLinkCurrentWordSelection(this.app, editor, view, this.settings, checking)
    });

    this.addCommand({
      id: 'otherwise-edit-link',
      name: 'Edit Link',
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) =>
        editLink(this.app, editor, view, this.settings, checking)
    });

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new SupernotesSettingTab(this.app, this));

    // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
    // Using this function will automatically remove the event listener when this plugin is disabled.
    this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
      console.log('click', evt);
    });

    // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
    this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
  }

  onunload() {
    // TODO
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
