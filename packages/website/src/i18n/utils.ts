import { getCollection } from "astro:content";
import { compareEntriesByDate } from "../utils";

import {
  defaultLang,
  ui,
  locations,
  tags,
  recentTalks,
  languages,
  type Tags,
} from "./i18n";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function getLocale(lang: keyof typeof languages) {
  switch (lang) {
    case "ru":
      return "ru_RU";
    case "en":
      return "en_US";
    default:
      throw "Unkown language";
  }
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useLocations(lang: keyof typeof locations) {
  return function l(key: keyof (typeof locations)[typeof defaultLang]) {
    return locations[lang][key] || locations[defaultLang][key];
  };
}

export function useTags(lang: keyof typeof tags) {
  return function l(key: keyof Tags) {
    return tags[lang][key] || tags[defaultLang][key];
  };
}

export function getRecentTalks(lang: keyof typeof recentTalks) {
  return recentTalks[lang];
}

export async function getNotesSortedByDate(lang: keyof typeof languages) {
  return await getCollection("notes", ({ id }) => {
    return id.startsWith(lang);
  }).then((collection) => {
    return collection.sort(compareEntriesByDate);
  });
}

export function getNoteUrl(lang: keyof typeof languages, slug: string) {
  return `/${lang}/blog/${slug.substring(lang.length + 1)}/`;
}

export function getTagUrl(lang: keyof typeof languages, tag: keyof Tags) {
  return `/${lang}/blog/tag/${tag}/`;
}

export function sortTagsByPriority(
  lang: keyof typeof languages,
  tagsList: (keyof Tags)[],
) {
  return tagsList.sort((a, b): number => {
    return (
      Object.keys(tags[lang]).indexOf(String(a)) -
      Object.keys(tags[lang]).indexOf(String(b))
    );
  });
}
