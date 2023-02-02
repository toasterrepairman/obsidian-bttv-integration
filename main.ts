import { Editor, Plugin } from "obsidian";
import { InsertEmoteModal as InsertEmoteModal } from "./modal";
import { BttvSettingTab } from "./settings";


interface BttvIntegrationSettings {
	emoteHeight: number;
}

const DEFAULT_SETTINGS: Partial<BttvIntegrationSettings> = {
	emoteHeight: 20,
};

export default class BttvIntegration extends Plugin {	
	settings: BttvIntegrationSettings;
	// Loads plugin
	async onload() {
		// Load settings (or defaults)
		await this.loadSettings();
		// Recieves and organizes data
		const response = await fetch("https://api.betterttv.net/3/cached/emotes/global");
		const emotes = await response.json();
		const emoteMap = new Map();
		// Maps emotes to relevent data
		emotes.forEach((emote: { code: any; id: any; }) => {
			emoteMap.set(`${emote.code}`, `${emote.id}`);
		});
		// Adds command for generating BTTV emotes
		this.addCommand({
			id: "insert-emote",
			name: "Insert Emote",
			editorCallback: (editor: Editor) => {
				const selectedText = editor.getCursor();
		
				const onSubmit = (emote_name: string) => {
					editor.replaceSelection(
						`<img src="https://cdn.betterttv.net/emote/${emoteMap.get(emote_name)}/2x.png" alt="${emote_name}" height="${this.settings.emoteHeight}" />`
					);
				};
		
				new InsertEmoteModal(this.app, onSubmit).open();
			},
		});
		this.addSettingTab(new BttvSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

