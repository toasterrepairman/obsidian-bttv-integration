import { App, Modal, Setting } from "obsidian";

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

    contentEl.createEl("h1", { text: "Insert link" });

    new Setting(contentEl).setName("Link text").addText((text) =>
      text.setValue(this.linkText).onChange((value) => {
        this.linkText = value;
      })
    );

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