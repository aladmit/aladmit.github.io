import { App, CachedMetadata, TFile } from "obsidian";
import * as asyncfs from "fs/promises";
import * as path from "path";
import { slugify } from "transliteration";
import { ExporterSettings } from "./main";

import assert from "node:assert/strict";

export type Note = {
	Slug: string;
	Content: string;
	TFile: TFile;
	Meta: CachedMetadata;
};

export async function exportNotes(app: App, settings: ExporterSettings) {
	if (typeof settings.contentPath != 'string') {
		throw new Error("Can't export. Content path is not set in settings");
	}
	if (typeof settings.assetsPath != 'string') {
		throw new Error("Can't export. Assets path is not set in settings");
	}
	if (typeof settings.assetsURLPrefix != 'string') {
		throw new Error("Can't export. Assets URL prefix is not set in settings");
	}

	const notes = await getNotes(app);

	await Promise.all(
		notes.map((note) => {
			transformLinks(note, settings.assetsURLPrefix!);
			transformFrontmatter(note);

			asyncfs.writeFile(
				path.join(settings.contentPath as string, note.Slug + ".md"),
				note.Content,
			);
		}),
	);

	await Promise.all(
		notes.map(async (note) => {
			const fsPromises: Promise<void>[] = [];

			if (note.Meta.embeds) {
				for (const embed of note.Meta.embeds) {
					const tfile = app.metadataCache.getFirstLinkpathDest(
						embed.link,
						note.TFile.path,
					);

					if (tfile instanceof TFile) {
						const data = Buffer.from(
							await app.vault.readBinary(tfile),
						);
						fsPromises.push(
							asyncfs.writeFile(
								path.join(settings.assetsPath as string, slugify(embed.link)),
								data,
							),
						);
					}
				}
			}

			return fsPromises;
		}),
	);
}

export async function getNotes(app: App): Promise<Note[]> {
	const allTFiles = app.vault.getMarkdownFiles();

	const filteredTFiles = allTFiles.filter((tfile) => {
		const meta = app.metadataCache.getFileCache(tfile);
		return meta?.frontmatter?.published != null;
	});

	const notes = await Promise.all(
		filteredTFiles.map(async (tfile) => {
			return {
				TFile: tfile,
				Content: await app.vault.cachedRead(tfile),
				Meta: app.metadataCache.getFileCache(tfile),
			} as Note;
		}),
	);

	notes.forEach((note) => {
		if (note.Meta.frontmatter?.title) {
			note.Slug = slugify(note.Meta.frontmatter.title);
		} else {
			note.Slug = slugify(note.TFile.basename);
		}
	});

	return notes;
}

// transform wiki-links to images into regular md links
// replaces wiki links to notes with bold title
export function transformLinks(note: Note, assetsURLPrefix: string): Note {
	const embeds = note.Meta.embeds;
	const links = note.Meta.links;

	if (!embeds && !links) {
		return note;
	}

	if (embeds) {
		embeds.forEach((link) => {
			// TODO check file extension
			const newLink = `![${link.displayText}](${path.join(assetsURLPrefix, slugify(link.link))})`;
			note.Content = note.Content.replace(link.original, newLink);
		});
	}

	if (links) {
		links.forEach((link) => {
			const newLink = link.displayText ? link.displayText : link.link;
			note.Content = note.Content.replace(
				link.original,
				`**${newLink}**`,
			);
		});
	}

	return note;
}

export function transformFrontmatter(note: Note): Note {
	if (note.Meta.frontmatter?.title) {
		return note;
	}

	const splits = note.Content.split("---\n");

	assert.ok(
		splits[0] == "",
		"File should start with ---\n because there is a frontmatter",
	);
	assert.ok(
		splits.length >= 3,
		`Expected at leat 3 elements after splitting content by ---\n, because its used only in frontmatter. But got ${splits.length} in "${note.TFile.name}"`,
	);

	splits[1] = splits[1].concat(`title: ${note.TFile.basename}\n`);

	note.Content = splits.join("---\n");
	return note;
}
