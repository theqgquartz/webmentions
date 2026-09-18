import { createRequire } from 'module';
import fs from 'fs';

createRequire(import.meta.url);

// src/components/styles/WebmentionsContent.scss
var WebmentionsContent_default = "#webmentions .webmentions-header {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  padding-bottom: 0.25rem;\n}\n#webmentions .webmentions-title {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  margin-top: 0rem;\n}\n#webmentions .webmentions-title a {\n  color: var(--secondary);\n  text-decoration: none;\n}\n#webmentions .webmentions-title a:hover {\n  text-decoration: underline;\n}\n#webmentions #webmentioncounters {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n#webmentions #webmentioncounters .webmention-likes,\n#webmentions #webmentioncounters .webmention-reposts {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.95rem;\n  white-space: nowrap;\n}\n#webmentions #webmentioncounters .webmention-likes i,\n#webmentions #webmentioncounters .webmention-reposts i {\n  font-size: 1rem;\n  line-height: 1;\n}\n#webmentions #webmentioncounters .webmention-likes i {\n  color: red;\n}\n#webmentions #webmentioncounters .webmention-reposts i {\n  color: goldenrod;\n}\n#webmentions .mentions {\n  margin-top: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n#webmentions {\n  /* --- Individual mention card --- */\n}\n#webmentions .mention {\n  padding: 0.75rem 1rem;\n  border-radius: 0.5rem;\n  background: var(--light);\n  border: 1px solid var(--gray);\n}\n#webmentions {\n  /* --- Author block --- */\n}\n#webmentions .author {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n#webmentions .author .photo {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n#webmentions .author .name {\n  font-weight: 600;\n}\n#webmentions .author .url {\n  font-size: 0.85rem;\n  color: var(--secondary);\n}\n#webmentions {\n  /* --- Content block --- */\n}\n#webmentions .e-content {\n  margin-bottom: 0.5rem;\n}\n#webmentions .e-content p {\n  margin: 0;\n  line-height: 1.5;\n}\n#webmentions {\n  /* --- Timestamp --- */\n}\n#webmentions .metaline {\n  font-size: 0.8rem;\n  color: var(--secondary);\n}\n#webmentions .metaline a {\n  color: var(--secondary);\n  text-decoration: none;\n}\n#webmentions .metaline a:hover {\n  text-decoration: underline;\n}";
"function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// ../utils/date.tsx
function formatDate(d3, locale = "en-AU") {
  return d3.toLocaleDateString(locale, {
    dateStyle: "long"
  });
}
function formatTime(d3, locale = "en-AU") {
  return d3.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
var l2;
l2 = { __e: function(n3, l3, u5, t3) {
  for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
    if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n3)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n3, t3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
  } catch (l4) {
    n3 = l4;
  }
  throw n3;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f3 = 0;
function u4(e3, t3, n3, o3, i3, u5) {
  t3 || (t3 = {});
  var a3, c3, p3 = t3;
  if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
  var l3 = { type: e3, props: p3, key: n3, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i3, __self: u5 };
  if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
  return l2.vnode && l2.vnode(l3), l3;
}

// src/components/WebmentionsContent.tsx
var defaultOptions = {
  showLikes: true,
  showReposts: true,
  showReplies: true
};
function WebmentionsList({ mentions }) {
  if (!mentions) {
    return null;
  }
  if (mentions.length == 0) {
    return null;
  }
  return /* @__PURE__ */ u4("div", { id: "webmentions", class: "mentions hfeed", children: mentions.map((wm) => /* @__PURE__ */ u4("div", { class: "h-entry mention", children: [
    /* @__PURE__ */ u4("div", { class: "author u-author h-card", children: [
      /* @__PURE__ */ u4("img", { src: wm.data.author.photo, class: "photo u-photo" }),
      /* @__PURE__ */ u4("a", { href: wm.data.author.url, class: "name u-url p-name", children: wm.data.author.name }),
      " ",
      /* @__PURE__ */ u4("a", { href: wm.data.author.url, class: "url", children: wm.data.author.url })
    ] }),
    /* @__PURE__ */ u4(
      "div",
      {
        class: "e-content html",
        dangerouslySetInnerHTML: { __html: wm.data.content ?? "" }
      }
    ),
    /* @__PURE__ */ u4("div", { class: "metaline", children: /* @__PURE__ */ u4("time", { class: "dt-published", datetime: wm.verified_date, children: /* @__PURE__ */ u4("a", { href: wm.source, class: "u-url", children: [
      formatDate(new Date(wm.verified_date)),
      ", ",
      formatTime(new Date(wm.verified_date))
    ] }) }) })
  ] })) });
}
var WebmentionsContent_default2 = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  function WebmentionsContent({ fileData }) {
    const wm = fileData.webmentions || void 0;
    if (Array.isArray(wm) && wm.length > 0) {
      const tally = {
        likes: 0,
        reposts: 0,
        mentions: []
      };
      wm.forEach((mwm) => {
        switch (mwm.activity.type) {
          case "like":
            tally.likes = (tally.likes ?? 0) + 1;
            break;
          case "repost":
            tally.reposts = (tally.reposts ?? 0) + 1;
            break;
          case "reply":
            (tally.mentions ??= []).push(mwm);
            break;
        }
      });
      return /* @__PURE__ */ u4("div", { id: "webmentions", children: [
        /* @__PURE__ */ u4("div", { class: "webmentions-header", children: [
          /* @__PURE__ */ u4("h3", { class: "webmentions-title", children: [
            "Webmentions",
            " ",
            /* @__PURE__ */ u4("a", { href: "/notes/webmentions", style: "color:var(--secondary)", children: /* @__PURE__ */ u4("i", { class: "nf nf-fa-question_circle" }) })
          ] }),
          ((tally.likes ?? 0) > 0 && options.showLikes || (tally.reposts ?? 0) > 0 && options.showReposts) && /* @__PURE__ */ u4("div", { id: "webmentioncounters", children: [
            tally.likes > 0 && /* @__PURE__ */ u4("div", { class: "webmention-likes", children: [
              /* @__PURE__ */ u4("i", { class: "nf nf-fa-heart" }),
              " ",
              tally.likes,
              " like",
              tally.likes === 1 ? "" : "s"
            ] }),
            tally.reposts > 0 && /* @__PURE__ */ u4("div", { class: "webmention-reposts", children: [
              /* @__PURE__ */ u4("i", { class: "nf nf-fa-repeat" }),
              " ",
              tally.reposts,
              " repost",
              tally.reposts === 1 ? "" : "s"
            ] }),
            " "
          ] })
        ] }),
        (tally.mentions?.length ?? 0) > 0 && /* @__PURE__ */ u4(WebmentionsList, { mentions: tally.mentions }),
        /* @__PURE__ */ u4("hr", {})
      ] });
    } else {
      return null;
    }
  }
  WebmentionsContent.css = WebmentionsContent_default;
  return WebmentionsContent;
});
var lookup = JSON.parse(fs.readFileSync("data/webmentions.json", "utf8"));
var WebmentionTransformer = () => {
  return {
    name: "WebmentionTransformer",
    htmlPlugins() {
      return [
        () => (tree, file) => {
          const slug = file.data.slug;
          file.data.webmentions = lookup.map[slug] ?? [];
        }
      ];
    }
  };
};

export { WebmentionTransformer, WebmentionsContent_default2 as WebmentionsContent };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map