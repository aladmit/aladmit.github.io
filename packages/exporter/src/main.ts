import { App, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { exportNotes } from './exporter';

export interface ExporterSettings {
	contentPath?: string | null;
	assetsPath?: string | null;
	assetsURLPrefix?: string | null;
}

const DEFAULT_SETTINGS: ExporterSettings = {}

export default class Exporter extends Plugin {
	settings: ExporterSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('dice', 'Sample Plugin', async (_: MouseEvent) => {
			try {
				await exportNotes(this.app, this.settings);
				new Notice('Notes and assets were exported!');
			} catch (e) {
				if (e instanceof Error) {
					new Notice(e.message);
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ExporterSettingTab(this.app, this));
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

class ExporterSettingTab extends PluginSettingTab {
	plugin: Exporter;

	constructor(app: App, plugin: Exporter) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Content path')
			.setDesc('Absolute path to export notes to')
			.addText(text => text
				.setPlaceholder('/home/user/dir/content/')
				.setValue(this.plugin.settings.contentPath ? this.plugin.settings.contentPath : '')
				.onChange(async (value) => {
					this.plugin.settings.contentPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Assets path')
			.setDesc('Absolute path to export assets to')
			.addText(text => text
				.setPlaceholder('/home/user/dir/assets/')
				.setValue(this.plugin.settings.assetsPath ? this.plugin.settings.assetsPath : '')
				.onChange(async (value) => {
					this.plugin.settings.assetsPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Assets URL prefix')
			.setDesc('URL Prefix or path to use as path in notes to assets')
			.addText(text => text
				.setPlaceholder('/public/assets/')
				.setValue(this.plugin.settings.assetsURLPrefix ? this.plugin.settings.assetsURLPrefix : '')
				.onChange(async (value) => {
					this.plugin.settings.assetsURLPrefix = value;
					await this.plugin.saveSettings();
				}));
	}
}
