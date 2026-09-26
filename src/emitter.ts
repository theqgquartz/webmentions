import path from "node:path";
import fs from "node:fs/promises";
import type {
  //  GlobalConfiguration,
  QuartzEmitterPlugin,
  BuildCtx,
  FilePath,
  ProcessedContent,
  QuartzPluginData,
} from "@quartz-community/types";
import { toHtml } from "hast-util-to-html";
import type { Webmention } from "../types/webmention";

interface Options {
  enableWebmentionsOutput: boolean;
}

const defaultOptions: Options = {
  enableWebmentionsOutput: true,
};

const WEBMENTIONS_FILE = "data/webmentions.json"

interface WebmentionsFile {
  lastFetched: string | null;
  mentions: Webmention[];   // or your real incoming type
  map: Record<string, Webmention>;
  generated?: string;
  outgoing?: OutgoingWebmention[];
}

type OutgoingWebmention = {
  url: string;
  modified: string | null;
  outbound: string[];
};

const read = async (args: { file: string }): Promise<WebmentionsFile | null> => {
  const fullPath = path.resolve(args.file);

  try {
    const data = await fs.readFile(fullPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
};


const write = async (args: { file: string; content: string }): Promise<FilePath> => {
  const fullPath = path.resolve(args.file);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, args.content, "utf8");
  return fullPath as FilePath;
};

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  const options = { ...defaultOptions, ...opts };
  const emitAll = async (ctx: BuildCtx, content: ProcessedContent[]): Promise<FilePath[]> => {

    const outputs: FilePath[] = [];

    if (options.enableWebmentionsOutput) {
      const outgoing: OutgoingWebmention[] = [];

      for (const [tree, file] of content) {
        const data = file.data as QuartzPluginData;

        if (data.unlisted === true) continue;

        const slug = data.slug;
        const created = data.dates?.created ?? null;

        const richContent = toHtml(tree, { allowDangerousHtml: true });

        // Skip pages with no HTML (encrypted, empty, etc.)
        if (!richContent) continue;

        const externalLinks: string[] = [];
        const regex = /href="(https?:\/\/[^"]+)"/g;

        let match;
        while ((match = regex.exec(richContent)) !== null) {
          const url = match[1];
          if (url) {
            externalLinks.push(url);
          }
        }

        if (externalLinks.length === 0) continue;

        const absoluteUrl = `https://${ctx.cfg.configuration.baseUrl}/${encodeURI(slug as string)}`;

        outgoing.push({
          url: absoluteUrl,
          modified: created ? created.toISOString() : null,
          outbound: externalLinks,
        });
      }

      const existing = (await read({file: WEBMENTIONS_FILE})) ?? {
        lastFetched: null,
        mentions: [],
        map: {}
      }

      existing.generated = new Date().toISOString()
      existing.outgoing = outgoing
     
      outputs.push(
        await write({
          content: JSON.stringify(existing, null, 2),
          file: WEBMENTIONS_FILE,
        }),
      );
    }

    return outputs;
  };

  return {
    name: "ContentIndex",
    emit: (ctx, content) => emitAll(ctx, content),
    // RSS auto-discovery link tag should be added via a component plugin or manually in the layout.
    partialEmit: (ctx, content) => emitAll(ctx, content),
  };
};
