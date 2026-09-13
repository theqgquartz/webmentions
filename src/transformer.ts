import type { QuartzTransformerPlugin } from "@quartz-community/types";
import fs from "fs";

const lookup = JSON.parse(fs.readFileSync("data/webmentions.json", "utf8"));

export const WebmentionTransformer: QuartzTransformerPlugin = () => {
  return {
    name: "WebmentionTransformer",
    htmlPlugins() {
      return [
        () => (tree, file) => {
          const slug = file.data.slug as string;
          file.data.webmentions = lookup.map[slug] ?? [];
        },
      ];
    },
  };
};
