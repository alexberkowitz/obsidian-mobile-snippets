import MobileSnippets from 'main';
import { App, PluginSettingTab, Setting, setIcon } from 'obsidian';

export class SnippetSettingTab extends PluginSettingTab {
	plugin: MobileSnippets;

	constructor(app: App, plugin: MobileSnippets) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

    // The user can choose to reset their snippets to the default, which
    // includes several characters commonly used in Markdown.
    const defaultSnippets = [
      "*",
      "_",
      "!",
      "#",
      "(",
      ")",
      "[",
      "]",
      "~"
    ];

		containerEl.empty();

    // Title
    containerEl.createEl('h1', {
      text: 'Mobile Snippets'
    });

    // Add button
    new Setting(containerEl)
      .setName('Add text snippets here to make them available in the mobile toolbar. Icons are automatically generated from the first character in the string.')
      .addButton(button => {
        button.setButtonText('Add')
          .onClick(async () => {
            this.plugin.settings.snippets.push('');
            await this.plugin.saveSettings();
            this.display();
          })
          .setTooltip('Add a snippet')
          .setIcon('plus')
          .setCta()
      })

    // Render an input with a delete button for a given snippet
    const addSnippetEntry = (snippet: string, index: number) => {
      const entryEl = containerEl.createDiv('snippet-item');

      const settingInput = entryEl.createEl('input', {
        type: 'text',
        cls: 'mobile-snippet-input',
        value: snippet
      })

      settingInput.onchange = async () => {
        this.plugin.settings.snippets[index] = 'sdf';
        await this.plugin.saveSettings();
      }
      
      const removeButton = entryEl.createEl('button', 'remove-button');
      setIcon(removeButton, 'trash');

      removeButton.onclick = async () => {
        this.plugin.settings.snippets.splice(index, 1);
        await this.plugin.saveSettings();
        this.display();
      }
    }

    // Render an entry for each snippet in the list
		this.plugin.settings.snippets.map( (snippet, index) => {
      addSnippetEntry(snippet, index);
		});

    const resetContainer = containerEl.createDiv('setting-item reset-container');

    const resetButton = resetContainer.createEl('button', {
      text: 'Reset to default snippets',
      cls: 'reset-button'
    });

    resetButton.onclick = async () => {
      this.plugin.settings.snippets = [...defaultSnippets];
      await this.plugin.saveSettings();
      this.display();
    }

	}
}
