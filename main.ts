import { Console } from "console";
import { Editor, Plugin } from "obsidian";
import { InsertEmoteModal as InsertEmoteModal } from "./modal";


export default class MyPlugin extends Plugin {	
	async onload() {
		const response = await fetch("https://api.betterttv.net/3/cached/emotes/global");
		const emotes = await response.json();
		const emoteMap = new Map();

		emotes.forEach((emote: { code: any; id: any; }) => {
			emoteMap.set(`${emote.code}`, `${emote.id}`);
		});

		this.addCommand({
			id: "insert-emote",
			name: "Insert Emote",
			editorCallback: (editor: Editor) => {
				const selectedText = editor.getCursor();
		
				const onSubmit = (url: string) => {
					editor.replaceSelection(`<img src="https://cdn.betterttv.net/emote/${emoteMap.get(url)}/1x.png"/>`);
				};
		
				new InsertEmoteModal(this.app, onSubmit).open();
			},
		});	
	  }
	  
	}
