import { AnyARecord } from "dns";
import { Editor, Plugin } from "obsidian";
import { InsertEmoteModal as InsertEmoteModal } from "./modal";
import { BttvSettingTab } from "./settings";


interface BttvIntegrationSettings {
	emoteHeight: number;
	channels: Array<String>;
}

const DEFAULT_SETTINGS: Partial<BttvIntegrationSettings> = {
	emoteHeight: 20,
	channels: [""],
};

export default class BttvIntegration extends Plugin {	
	settings: BttvIntegrationSettings;
	// Loads plugin
	async onload() {
		// Load settings (or defaults)
		await this.loadSettings();
		// Recieves and organizes data
		this.getChannelEmotes

		this.settings.channels.forEach(async channel => {
			let allEmotes = this.mergeLists(allEmotes, )
		});

		const allEmotes = await this.mergeLists(this.getGlobalEmotes, this.getChannelEmotes(await this.getChannelId(channel)));

		// Adds command for generating BTTV emotes
		this.addCommand({
			id: "insert-emote",
			name: "Insert Emote",
			editorCallback: (editor: Editor) => {
				const onSubmit = (emote_name: string) => {
					editor.replaceSelection(
						`<img src="https://cdn.betterttv.net/emote/${allEmotes.get(emote_name)}/2x.png" alt="${emote_name}" height="${this.settings.emoteHeight}" />`
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

	async getChannelId(channel: String) {
		const response = await fetch(`https://decapi.me/twitch/id/${channel}`);
	if (!response.ok) {
		  throw new Error("Network response was not ok");
		}
		const text = await response.text();
		return text;
	}

	async getGlobalEmotes() {
		let response = await fetch("https://api.betterttv.net/3/cached/emotes/global");
		let emotes = await response.json();
		let emoteMap = new Map();

		emotes.forEach((emote: { code: any; id: any; }) => {
			emoteMap.set(`${emote.code}`, `${emote.id}`);
		})
		return emoteMap
	}

	async getChannelEmotes(channelId: string) {
		let response = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${channelId}`);
		let channelEmotes = await response.json();
		
		let emoteMap = new Map();

		channelEmotes.forEach((emote: { code: any; id: any; }) => {
			emoteMap.set(`${emote.code}`, `${emote.id}`);
		})
		return emoteMap
	}

	async mergeLists(map1: Map<any, any>, map2: Map<any, any>) {
		return new Map(...map1, ...map2)
	}
	  
}

