import BttvIntegration from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class BttvSettingTab extends PluginSettingTab {
  plugin: BttvIntegration;

  constructor(app: App, plugin: BttvIntegration) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Emote Size")
      .setDesc("Emote size, in pixels (equal to font).")
      .addSlider((Number) =>
        Number
            .setLimits(6, 100, 2)
            .setValue(20)
            .onChange(async (value) => {
                this.plugin.settings.emoteHeight = value;
                await this.plugin.saveSettings();
            }       
    ));
  }
}