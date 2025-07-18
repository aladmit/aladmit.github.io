import generateOgImage, { type OgData } from "../../utils/openGraph.tsx";
import type { APIRoute, GetStaticPaths, GetStaticPathsItem } from "astro";

import {
  useTranslations,
  getNotesSortedByDate,
  getNoteUrl,
} from "../../i18n/utils";
const tRU = useTranslations("ru");
const tEN = useTranslations("en");

interface StaticPaths extends OgData {
  slug: string;
}

const STATIC_PATH: StaticPaths[] = [
  {
    slug: "aleksandrov",
    title: tRU("title"),
    author: tRU("title"),
    lang: "ru",
    date: "",
  },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const result: GetStaticPathsItem[] = [];

  // static path
  STATIC_PATH.forEach((item) =>
    result.push({
      params: { slug: item.slug },
      props: {
        title: item.title,
        author: item.author,
        lang: item.lang,
        date: item.date,
      },
    }),
  );

  // blog
  const ruCollection = await getNotesSortedByDate("ru");
  const enCollection = await getNotesSortedByDate("en");

  ruCollection.forEach((entry) =>
    result.push({
      params: { slug: getNoteUrl("ru", entry.slug) },
      props: {
        title: entry.data.title,
        author: tRU("title"),
        lang: "ru",
        date: entry.data.updated
          ? entry.data.updated
          : entry.data.published,
      },
    }),
  );
  enCollection.forEach((entry) =>
    result.push({
      params: { slug: getNoteUrl("en", entry.slug) },
      props: {
        title: entry.data.title,
        author: tEN("title"),
        lang: "en",
        date: entry.data.updated
          ? entry.data.updated
          : entry.data.published,
      },
    }),
  );

  return result;
};

export const GET: APIRoute = async ({ props }) => {
  const response = await generateOgImage(props as OgData);
  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};
