import ExamplePlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class BttvSettingTab extends PluginSettingTab {
  plugin: ExamplePlugin;

  constructor(app: App, plugin: ExamplePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Date format")
      .setDesc("Default date format")
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