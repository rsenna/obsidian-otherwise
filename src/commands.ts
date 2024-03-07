import {App, Editor, MarkdownView} from "obsidian";
import {SupernotesPluginSettings} from "./settings";
import {EditLinkModal} from "./modals/EditLinkModal";

export const addLinkCurrentWordSelection = (
  app: App,
  editor: Editor,
  view: MarkdownView,
  settings: SupernotesPluginSettings,
  checking: boolean
) => {
  const result = true;

  const head = editor.getCursor('head')
  const wordRange = editor.wordAt(head)

  if (!wordRange || checking) {
    return !!wordRange;
  }

  const selection = editor.getRange(wordRange.from, wordRange.to);
  editor.replaceRange('[[' + selection + ']]', wordRange.from, wordRange.to);

  return result;
};

export const editLink = (
  app: App,
  editor: Editor,
  view: MarkdownView,
  settings: SupernotesPluginSettings,
  checking: boolean
) => {
  const result = true;

  if (checking) {
    return result;
  }

  // TODO:
  // 1. Get the link under the cursor
  //   - It can be difficult to get the link under the cursor, because
  //     1. The cursor can be in any part of the link
  //     2. The link can be a wikilink or a markdown link
  //     3. The link can have an alias or not
  //     4. The link can have a link address or not
  //     5. ~The link can have multiple lines of text~ (not true)
  // 2. Open a modal with the link's text and address
  // 3. Update the link's text and address when the modal is closed
  //
  // Notes:
  // From the Obsidian console, you can get the editor and cursor with:
  // const editor = this.app.workspace.activeEditor.editor;
  // const cursor = editor.getCursor();

  const editLinkModal = new EditLinkModal(app, editor, () => {});
  editLinkModal.open();

  return result;
};
