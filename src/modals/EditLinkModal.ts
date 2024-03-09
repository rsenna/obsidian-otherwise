import {Link, LinkType} from "src/link";
import {App, Editor, Modal, Setting} from "obsidian";

type Action = () => void;

export class EditLinkModal extends Modal {
  editor: Editor;
  onSubmit: Action;

  constructor(app: App, editor: Editor, onSubmit: Action) {
    super(app);

    this.editor = editor;
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const link = this.getLinkUnderCursor();

    const {contentEl} = this;
    contentEl.createEl('h1', {text: 'Edit Link'});

    new Setting(contentEl)
      .setName('Link Text/Alias')
      .addText(text =>
        text.onChange(async (value) => {
            if (link) {
              link.alias = value;
              this.editor.replaceRange(link.text, this.editor.getCursor('head'));
            }
          }
        ));

    new Setting(contentEl)
      .setName('Link Address')
      .addText(text =>
        text.onChange(async (value) => {
            if (link) {
              link.address = value;
              this.editor.replaceRange(link.text, this.editor.getCursor('head'));
            }
          }
        ));

    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            this.onSubmit();
          }));
  }

  onClose() {
    const {contentEl} = this;
    contentEl.empty();
  }

  // TODO: Delete
  getLinkUnderCursor(): Link | undefined {
    const cursor = this.editor.getCursor();
    const currentLine = this.editor.getLine(cursor.line);

    let linkType: LinkType | undefined = undefined
    let linkStart = cursor.ch
    let linkEnd = cursor.ch
    let foundStart = false
    let foundEnd = false
    let markdownFoundOpenParenthesis = false

    while (linkStart >= 0 && linkEnd <= currentLine.length) {
      if (!foundStart) {
        if (currentLine[linkStart] === '[') {
          if (currentLine[linkStart - 1] === '[') {
            linkStart--;
            linkType = 'wikilink';
            foundStart = true;
          } else if (currentLine[linkStart + 1] === '[') {
            linkType = 'wikilink';
            foundStart = true;
          } else {
            linkType = 'markdown';
            foundStart = true;
          }
        } else {
          linkStart--;
        }
      }

      if (foundStart && !foundEnd) {
        if (linkType == 'markdown') {
          if (currentLine[linkEnd] === ']' && currentLine[linkEnd + 1] === '(') {
            linkEnd += 2;
            markdownFoundOpenParenthesis = true;
          }

          if (markdownFoundOpenParenthesis && currentLine[linkEnd] === ')') {
            foundEnd = true;
            break;
          }
        } else if (linkType == 'wikilink') {
          if (currentLine[linkEnd] === ']' && currentLine[linkEnd + 1] === ']') {
            linkEnd++;
            foundEnd = true;
            break;
          }
        }

        linkEnd++;
      }
    }

    const text = foundStart && foundEnd
      ? currentLine.slice(linkStart, linkEnd + 1)
      : ''

    const link = text
      ? new Link(text, linkType || 'markdown') // TODO: read from global settings
      : undefined

    return link
  }
}
