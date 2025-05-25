import { Editor, addIcon, MarkdownView, Plugin } from 'obsidian';
import { SnippetSettingTab } from 'settings';

interface MobileSnippetSettings {
	snippets: string[];
}

// The default list includes a bunch of common Markdown characters
const DEFAULT_SETTINGS: MobileSnippetSettings = {
	snippets: []
}

export default class MobileSnippet extends Plugin {
	settings: MobileSnippetSettings;

	async onload() {
		await this.loadSettings();

		this.settings.snippets.map( (snippet, index) => {
			const identifier = `${index}-${snippet}`;

			// The icon for each snippet is defined by the first character of the string
			addIcon(`icon-${identifier}`, `<text \
				x="50%" \
				y="50%" \
				text-anchor="middle" \
				dominant-baseline="middle" \
				font-size="100px" \
				text-align="center" \
				fill="currentColor"\
				>\
				${snippet[0]}\
			</text>`);
	
			// Add a command that can be added to the mobile toolbar
			this.addCommand({
				id: `macro-${identifier}`,
				name: snippet,
				icon: `icon-${identifier}`,
				mobileOnly: true,
				editorCallback: (editor: Editor, view: MarkdownView) => {
					console.log(editor.getSelection());
					editor.replaceSelection(snippet);
				}
			});
		// }
		});

		// Add a settings tab
		this.addSettingTab(new SnippetSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}