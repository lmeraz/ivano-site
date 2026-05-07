import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const json = (base: string) =>
  defineCollection({ loader: glob({ pattern: "**/*.json", base }), schema: z.any() });

export const collections = {
  workshops: json("./src/content/workshops"),
  "past-workshops": json("./src/content/past-workshops"),
  singletons: json("./src/content/singletons"),
};
