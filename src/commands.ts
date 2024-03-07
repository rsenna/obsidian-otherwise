import {App, Editor, MarkdownView} from "obsidian";
import {GlobalSettings, OtherWisePluginSettings} from "./settings";
import {EditLinkModal} from "./modals/EditLinkModal";
import {getAnyLinkUnderCursor, getSelection, getWordUnderCursor, Link, LinkType, MaybeEditorToken} from "./link";

export const makeLink = (
  editor: Editor,
  globalSettings: () => GlobalSettings,
  localSettings: OtherWisePluginSettings,
  checking: boolean
) => {
  const globalLinkType: LinkType = globalSettings().useMarkdownLinks ? 'markdown' : 'wikilink'

  const token: MaybeEditorToken =
    getAnyLinkUnderCursor(editor) ||
    getSelection(editor) ||
    getWordUnderCursor(editor)

  if (!token || !token.range) {
    return false;
  }

  if (!checking) {
    const link = new Link(token.text, globalLinkType)
    link.linkType = globalLinkType; // replace link type
    editor.replaceRange(link.text, token.range.from, token.range.to);
  }

  return true;
};

export const editLink = (
  app: App,
  editor: Editor,
  view: MarkdownView,
  localSettings: OtherWisePluginSettings,
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
