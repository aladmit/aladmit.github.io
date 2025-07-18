import { allowedTags } from "../content/config";
export const defaultLang = "ru";

export const languages = {
  en: "English",
  ru: "Русский",
};

export const locations = {
  en: {
    main: "/en/",
    articles: "/en/blog/",
    author: "/en/author/",
    rss: "/en/blog/feed.xml",
  },
  ru: {
    main: "/ru/",
    articles: "/ru/blog/",
    author: "/ru/avtor/",
    rss: "/ru/blog/feed.xml",
  },
};

export type Tags = { [K in (typeof allowedTags)[number]]: string };
export type i18nTags = {
  en: Tags;
  ru: Tags;
};

// Order is important!
// RightSidebar renders tag list in exactly the same order
export const tags: i18nTags = {
  en: {
    talk: "Talks",
    tbd: "Trunk-Based Development",
    platform: "Platform Engineering",
    iac: "Infrastructure as Code",
    km: "Knowledge Management",
    process: "Processes",
    review: "Reviews",
    other: "Other",
  },
  ru: {
    talk: "Доклады",
    tbd: "Trunk-Based Development",
    platform: "Platform Engineering",
    iac: "Infrastructure as Code",
    km: "Управление знаниями",
    process: "Процессы",
    review: "Обзоры",
    other: "Другое",
  },
};

export const ui = {
  en: {
    title: "Andrei Aleksandrov",
    description: "Platform engineering and Developer Experience",
    "expert.name": "Andrei Aleksandrov",
    "expert.title": "Expert in engineering practices",
    "expert.description":
      "For over 7 years, I have been helping companies develop engineering culture, processes, and practices. I work with product, platform, and enabling teams.",
    "404.title": "404: Not published",
    "404.description":
      "This article has not yet been published from my knowledge base",
    "nav.main": "main",
    "nav.articles": "notes",
    "nav.author": "author",
    "nav.contact": "How to contact",
    "nav.relevant": "Current content",
    "nav.recent-talks": "Recent talks",
    "nav.recent-notes": "Recent notes",
    "nav.notes-by-tag": "Notes",
    "article.published": "published",
    "article.updated": "updated",
    "article.quote-1":
      "Need help? Message me via telegram ",
    "article.quote-2": " or via email ",
    "article.subscribe-1": "Subscribe to",
    or: "or",
    "article.subscribe-2": " so you don`t miss new articles",
    "links.email": "aleksandrov@hey.com",
    "links.tgchannel": "https://t.me/aladmit_world",
    "links.tgchannel_text": "Tg channel",
    "links.tg": "https://t.me/aladmit",
    "links.github": "https://github.com/aladmit",
    "links.linkedin": "https://www.linkedin.com/in/aladmit/",
  },
  ru: {
    title: "Александров Андрей",
    description: "Platform engineering и Developer Experience",
    "expert.name": "Александров Андрей",
    "expert.title": "Эксперт по инженерным практикам",
    "expert.description":
      "Более 7 лет помогаю компаниям развивать инженерную культуру, процессы и практики. Работаю с продуктовыми, плафторменными и enabling командами.",
    "404.title": "404: Не опубликовано",
    "404.description": "Эта статья еще не опубликована из моей базы знаний",
    "nav.main": "главная",
    "nav.articles": "заметки",
    "nav.author": "автор",
    "nav.contact": "Как связаться",
    "nav.relevant": "Актуальные материалы",
    "nav.recent-talks": "Последние выступления",
    "nav.recent-notes": "Последние заметки",
    "nav.notes-by-tag": "Заметки",
    "article.published": "опубликовано",
    "article.updated": "обновлено",
    "article.quote-1":
      "Нужна помощь? Напиши мне в telegram ",
    "article.quote-2": " или на почту ",
    "article.subscribe-1": "Подпишись на",
    or: "или",
    "article.subscribe-2": ", чтобы не пропустить новые статьи",
    "links.email": "aleksandrov@hey.com",
    "links.tgchannel": "https://t.me/aladmit_world",
    "links.tgchannel_text": "Tg канал",
    "links.tg": "https://t.me/aladmit",
    "links.github": "https://github.com/aladmit",
    "links.linkedin": "https://www.linkedin.com/in/aladmit/",
  },
} as const;

export const recentTalks = {
  en: [
    {
      title: "Team dysfunctions and Team Topologies (RU)",
      link: "https://github.com/aladmit/public/blob/main/pdfs/%D0%9A%D0%B5%D0%B9%D1%81%20%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%B0%20%D0%B4%D0%B8%D1%81%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B9%20%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%20%D0%B8%20%D0%B8%D1%85%20%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%81%20Team%20Topologies.pdf",
    },
    {
      title: "Team Topologies Workshop (RU)",
      link: "https://enabling.team/team-topologies-workshop",
    },
    {
      title: "Workshop team topology for platform teams (RU)",
      link: "https://enabling.team/team-topologies-for-platform-teams",
    },
    {
      title: "Pulumi. Strengths and weaknesses (RU)",
      link: "https://github.com/aladmit/public/blob/main/pdfs/%D0%9F%D0%BE%D1%87%D0%B5%D0%BC%D1%83%20Pulumi%20%D1%8D%D1%82%D0%BE%20%D0%BE%D1%85%D1%80%D0%B5%D0%BD%D0%B5%D0%BD%D0%BD%D0%BE%2C%20%D0%BD%D0%BE%20%D0%BF%D1%80%D0%B8%20%D1%8D%D1%82%D0%BE%D0%BC%20%D0%BF%D0%BE%D0%BB%D0%BD%D0%BE%D0%B5%20%D0%B3%D0%BE%D0%B2%D0%BD%D0%BE.pdf",
    },
    {
      title: "Calico internals. Architecture and capabilities (RU)",
      link: "https://github.com/aladmit/public/blob/main/pdfs/Calico%20%D0%B8%D0%B7%D0%BD%D1%83%D1%82%D1%80%D0%B8.%20%D0%90%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0%20%D0%B8%20%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B8.pdf",
    },
  ],
  ru: [
    {
      title: "Разблокирование команд с Team Topologies",
      link: "/ru/blog/poisk-disfunkciy-komand-i-ih-resheniya-s-team-topologies/",
    },
    {
      title: "Воркшоп по командным топологиям",
      link: "https://enabling.team/team-topologies-workshop",
    },
    {
      title: "Топологии платформенных команд",
      link: "https://enabling.team/team-topologies-for-platform-teams",
    },
    {
      title: "Pulumi. Сильные и слабые стороны",
      link: "https://github.com/aladmit/public/blob/main/pdfs/%D0%9F%D0%BE%D1%87%D0%B5%D0%BC%D1%83%20Pulumi%20%D1%8D%D1%82%D0%BE%20%D0%BE%D1%85%D1%80%D0%B5%D0%BD%D0%B5%D0%BD%D0%BD%D0%BE%2C%20%D0%BD%D0%BE%20%D0%BF%D1%80%D0%B8%20%D1%8D%D1%82%D0%BE%D0%BC%20%D0%BF%D0%BE%D0%BB%D0%BD%D0%BE%D0%B5%20%D0%B3%D0%BE%D0%B2%D0%BD%D0%BE.pdf",
    },
    {
      title: "Calico изнутри. Архитектура и возможности",
      link: "https://github.com/aladmit/public/blob/main/pdfs/Calico%20%D0%B8%D0%B7%D0%BD%D1%83%D1%82%D1%80%D0%B8.%20%D0%90%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0%20%D0%B8%20%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B8.pdf",
    },
  ],
};
