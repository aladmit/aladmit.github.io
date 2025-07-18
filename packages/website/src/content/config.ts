import { z, defineCollection } from "astro:content";

export const allowedTags = [
  "talk",
  "tbd",
  "iac",
  "km",
  "platform",
  "process",
  "other",
  "review",
] as const;

const notesCollection = defineCollection({
  schema: z.object({
    description: z.string().min(65).max(150),
    published: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.enum(allowedTags)).nonempty(),
    title: z.string(),
  }),
});

export const collections = {
  notes: notesCollection,
};
