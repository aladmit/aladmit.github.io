import rss from "@astrojs/rss";
import {
  useTranslations,
  getNotesSortedByDate,
  getNoteUrl,
} from "../../../i18n/utils";
import type { APIRoute } from "astro";

const lang = "ru";
const t = useTranslations(lang);
const notes = await getNotesSortedByDate(lang);

export const GET: APIRoute = async (context) => {
  return rss({
    title: t("title"),
    description: t("description"),
    site: context.site!,
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.published,
      description: note.data.description,
      link: getNoteUrl(lang, note.slug),
    })),
  });
};
