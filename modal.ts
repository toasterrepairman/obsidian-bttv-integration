import { App, Modal, Setting } from "obsidian";
import { text } from "stream/consumers";

export class InsertEmoteModal extends Modal {
  linkText: string;

  onSubmit: (linkText: string) => void;

  constructor(
    app: App,
    onSubmit: (linkText: string) => void
  ) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;

    contentEl.createEl("h1", { text: "Insert Emote" });

    new Setting(contentEl).setName("Emote Name").addText((text) =>
      text.setValue(this.linkText).onChange((value) => {
        this.linkText = value;
      })
    );

    new Setting(contentEl).addTextArea((text) =>
      text
        .setPlaceholder("See `https://betterttv.com/emotes/global` for global emotes")
    )

    new Setting(contentEl).addButton((btn) =>
      btn
        .setButtonText("Insert")
        .setCta()
        .onClick(() => {
          this.close();
          this.onSubmit(this.linkText);
        })
    );
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}