import type { CollectionEntry } from "astro:content";

export function compareEntriesByDate(
  entryA: CollectionEntry<"notes">,
  entryB: CollectionEntry<"notes">,
) {
  return entryUpdatedDate(entryB) - entryUpdatedDate(entryA);
}

function entryUpdatedDate(entry: CollectionEntry<"notes">) {
  if (entry.data.updated) {
    return entry.data.updated.valueOf();
  } else {
    return entry.data.published.valueOf();
  }
}
