import {App, FuzzySuggestModal} from "obsidian";
import {OtherWisePluginSettings} from "../settings";

export interface SelectorListItem {
  name: string,
  path: string
}

export type MaybeSearchResult = string | undefined;
export type OnSearchSubmit = (result: MaybeSearchResult) => void;
export class SearchNoteModal extends FuzzySuggestModal<SelectorListItem> {
  private items: SelectorListItem[];
  private result: MaybeSearchResult;
  private onSubmit: OnSearchSubmit;

  constructor(app: App, items: SelectorListItem[], onSubmit: OnSearchSubmit) {
    super(app);

    this.items = items;
    this.onSubmit = onSubmit;
  }

  getItems = (): SelectorListItem[] => this.items;

  getItemText = (item: SelectorListItem): string => item.name

  onChooseItem = (item: SelectorListItem, _: MouseEvent | KeyboardEvent | undefined): void => {
    if (`${item.name}.md` === item.path) {
      this.result = item.name;
    } else {
      this.result = item.path;
    }

    this.onSubmit(this.result)
  }
}

export const searchNoteModal = async (app: App, localSettings: OtherWisePluginSettings, query: string, onSubmit: OnSearchSubmit) => {
  const omnisearch = await (app as any).plugins.getPlugin('omnisearch');
  const searchResult = await omnisearch.api.search(query);

  const selectorListItems: SelectorListItem[] = searchResult
    .map((it: { basename: string, score: number, path: string }) => <SelectorListItem>{
      name: it.basename,
      path: it.path
    });

  const selectorModal = new SearchNoteModal(app, selectorListItems, onSubmit);

  if (!localSettings.basic.alwaysShowSearchModal && selectorListItems.length <= 1) {
    selectorModal.onChooseItem(selectorListItems[0], undefined);
  } else {
    selectorModal.open();
  }
}
