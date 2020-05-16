# emojifier

A Visual Studio Code extension to turn text emojis into real emojis.

**Right now, enabled to work with Markdown files only**

## How to install

Easiest route would be through the ways suggested on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=devenbansodbits.emojifier)

## How to use

### Convert in selected text

- Select the text which you want to turn to emojis
- Right click and select 'Convert to Emoji'
- If the selected text consists of any emoji patterns, they will be replaced with their equivalent emojis.

![Demo](https://raw.githubusercontent.com/devenbansod/vscode-emojifier/master/demo/changeSelection.gif)


### Convert across the document

- Right click and select 'Convert Emojis across document'
- If the text in the document consists of any emoji patterns, they will be replaced with their equivalent emojis.

![Demo](https://raw.githubusercontent.com/devenbansod/vscode-emojifier/master/demo/changeAcrossDocument.gif)

### Add ignore patterns

- If you want to specifically ignore some patterns (for ex. ':/' *without quotes*), select one such pattern
- Right click and select 'Ignore pattern for Emojis'
- This will disable this pattern to be matched for emojis for this VS Code session

![Demo](https://raw.githubusercontent.com/devenbansod/vscode-emojifier/master/demo/addIgnorePattern.gif)
