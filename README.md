---
tags:
  - type/note
  - locale/en/gb
  - status/wip
aliases:
  - 
created: 2023-11-08T10:44:57+02:00
updated: 2024-03-05T23:08:59+01:00
---
> [!danger] Note to myself: README.md IS A HARD LINK TO AN OBSIDIAN NOTE!
## Description

OtherWise: Aliases and links

## Current Goal

- [x] First step: create new repo from template ✅ 2023-10-30
- [ ] Add a link to a word, search by title

## Features

- [ ] Add a link to a word, search by title
    - [ ] If there is only 1 hit, use it; if there are more, make user choose
    - [ ] Same for selection (multiple/partial words)
        - Condition: Cannot have line breaks
    - [ ] Use [[OmniSearch]] if it's available
- [ ] Add a link to a word, search by alias
    - [ ] If there is only 1 hit, use it; if there are more, make user choose
    - [ ] Use [[OmniSearch]] if it's available
- [ ] Find all aliases in use for a page
    - [ ] Option to add all of them to frontmatter 
- [ ] Edit link
    - [ ] Dialog with link text, link address, toggle between wiki-link and markdown link, delete link, ...
- [ ] All links in page
    - [ ] See all links in page | all selected links in a dialog
    - [ ] Options to open all links, or open them individually
- [ ] Find broken wiki links/local markdown links
- [ ] Redirect/Alias Notes!
    - [ ] Support pages with only a title, a link, and (maybe) frontmatter
    - [ ] Ideally these pages should *not* be open by default, they should open their target page instead
    - They would work very similarly to [[Logseq]] aliases
    - [ ] Consider creating Alias Notes as a different file type (not .md)
        - That could make it easier to implement the redirect
        - See [MeepTech/obsidian-custom-file-extensions-plugin](https://github.com/MeepTech/obsidian-custom-file-extensions-plugin)
    - [ ] Check impact on other OtherWise proposed features
        - Something similar could be used to *[[#^cache|cache]]* external links! But then they would have content
- [ ] Update links with alias
    - [ ] From a note A, user can choose which alias should be used for A, in each note referencing A
        - Batch change all references to A
    - [ ] Also choose a different alias for each link
- [ ] Default alias
    - [ ] Mark one alias as the default on Note A, which will be used whenever a link is created to Note A
        - Might be limited only to OtherWise commands
- [ ] Archive external link(s)
    - See legacy plugin [GitHub - tomzorz/obsidian-link-archive: Link Archive plugin for Obsidian](https://github.com/tomzorz/obsidian-link-archive)
    - [ ] Add commands to
        - [ ] archive 1 link
        - [ ] all links in page
        - [ ] all links in folder
        - [ ] all links in vault
    - Use a smarter method - maybe an internal link ^cache
- 2024-03-01T10:26:40+01:00 
- [ ] VIM Surround support!
    - Can be used WITH or WITHOUT vim bindings
    - Should support everything that vim surround does, including removing surrounds
    - Be aware of Obsidian peculiarities, specially the wiki-link format
    - [!] 2024-03-01T10:25:54+01:00 I don't think this has much to do with [[OtherWise]] though... Should be in a separate plugin

## Similar Plugins

- Check out [Metadata Menu](https://mdelobelle.github.io/metadatamenu/), pay attention about opportunities/feature conflicts
- 

## References
<!-- Links to pages not referenced in the content -->
- 
