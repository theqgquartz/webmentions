import type { QuartzComponentConstructor, QuartzComponentProps } from "@quartz-community/types";
import style from "./styles/WebmentionsContent.scss";
import { formatDate, formatTime } from "../utils/date";
import type { Webmention } from "../../types/webmention";

export interface WebmentionsContentOptions {
  showLikes: boolean;
  showReposts: boolean;
  showReplies: boolean;
}
const defaultOptions: WebmentionsContentOptions = {
  showLikes: true,
  showReposts: true,
  showReplies: true,
};

interface ProcessedWebMention {
  likes: number;
  reposts: number;
  mentions: Webmention[];
}

function WebmentionsList({ mentions }: { mentions: Webmention[] }) {
  if (!mentions) {
    return null;
  }

  if (mentions.length == 0) {
    return null;
  }

  return (
    <div id="webmentions" class="mentions hfeed">
      {mentions.map((wm: Webmention) => {
        const name = wm.data.author?.name ?? new URL(wm.source).hostname
        const photo = wm.data.author?.photo;
        const url = wm.data.author?.url ?? wm.source;
        return (
          <div class="h-entry mention">
            <div class="author u-author h-card">
              {photo && (
                <img src={photo} class="photo u-photo" />
              )}
              <a href={url ?? "#"} class="name u-url p-name">
                {name ?? "Unknown author"}
              </a>{" "}
              {url && (
                <a href={url} class="url">
                  {url}
                </a>
              )}
            </div>
            <div
              class="e-content html"
              dangerouslySetInnerHTML={{ __html: wm.data.content ?? "" }}
            ></div>
            <div class="metaline">
              <time class="dt-published" datetime={wm.verified_date}>
                <a href={wm.source} class="u-url">
                  {formatDate(new Date(wm.verified_date))}, {formatTime(new Date(wm.verified_date))}
                </a>
              </time>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ((opts?: Partial<WebmentionsContentOptions>) => {
  // Merge options with defaults
  const options: WebmentionsContentOptions = { ...defaultOptions, ...opts };

  function WebmentionsContent({ fileData }: QuartzComponentProps) {
    const wm = fileData.webmentions || undefined;

    if (Array.isArray(wm) && wm.length > 0) {
      const tally: ProcessedWebMention = {
        likes: 0,
        reposts: 0,
        mentions: [],
      };
      wm.forEach((mwm: Webmention) => {
        switch (mwm.activity.type) {
          case "like":
            tally.likes = (tally.likes ?? 0) + 1;
            break;
          case "repost":
            tally.reposts = (tally.reposts ?? 0) + 1;
            break;
          case "link":
          case "reply":
            (tally.mentions ??= []).push(mwm);
            break;
        }
      });
      return (
        <div id="webmentions">
          <div class="webmentions-header">
            <h3 class="webmentions-title">
              Webmentions{" "}
              <a href="/notes/webmentions" style="color:var(--secondary)">
                <i class="nf nf-fa-question_circle"></i>
              </a>
            </h3>
            {(((tally.likes ?? 0) > 0 && options.showLikes) ||
              ((tally.reposts ?? 0) > 0 && options.showReposts)) && (
              <div id="webmentioncounters">
                {tally.likes > 0 && (
                  <div class="webmention-likes">
                    <i class="nf nf-fa-heart"></i> {tally.likes} like{tally.likes === 1 ? "" : "s"}
                  </div>
                )}
                {tally.reposts > 0 && (
                  <div class="webmention-reposts">
                    <i class="nf nf-fa-repeat"></i> {tally.reposts} repost
                    {tally.reposts === 1 ? "" : "s"}
                  </div>
                )}{" "}
              </div>
            )}
          </div>
          {(tally.mentions?.length ?? 0) > 0 && options.showReplies && (
            <WebmentionsList mentions={tally.mentions} />
          )}
          <hr />
        </div>
      );
    } else {
      return null;
    }
  }

  WebmentionsContent.css = style;

  return WebmentionsContent;
}) satisfies QuartzComponentConstructor;
