import { describe, it, expect } from "vitest";
import WebmentionsContent from "../src/components/WebmentionsContent";
import type { QuartzComponentProps, FullSlug } from "@quartz-community/types";

const baseProps: QuartzComponentProps = {
  cfg: {
    locale: "en-AU",
    defaultDateType: "created",
  },
  allFiles: [],
  fileData: {
    slug: "my-note" as FullSlug,
    text: "This is a test note with enough words to count.",
    dates: {
      created: new Date("2024-01-01"),
      modified: new Date("2024-01-01"),
      published: new Date("2024-01-01"),
    },
    defaultDateType: "modified",
    frontmatter: {
      title: "Test note",
    },
  },
  ctx: {},
  externalResources: {
    css: [],
    js: [],
    additionalHead: [],
  },
  children: [],
  tree: {},
};

interface VNodeCriteria {
  type?: string;
  classes?: string[];
  props?: Record<string, unknown>;
}

export function findVNode(
  node: unknown,
  predicate: (n: VNodeCriteria) => boolean,
): VNodeCriteria | null {
  // Narrow: node must be an object
  if (!node || typeof node !== "object") return null;

  const vnode = node as VNodeCriteria;

  // Check the predicate
  if (predicate(vnode)) return vnode;

  // Now it's safe to access props
  const children = vnode.props?.children;

  if (Array.isArray(children)) {
    for (const child of children) {
      const found = findVNode(child, predicate);
      if (found) return found;
    }
  } else if (children) {
    const found = findVNode(children, predicate);
    if (found) return found;
  }

  return null;
}

export function matchVNode(node: unknown, criteria: VNodeCriteria): boolean {
  // Narrow: node must be an object
  if (!node || typeof node !== "object") return false;

  const vnode = node as VNodeCriteria;

  // Type match
  if (criteria.type && vnode.type !== criteria.type) return false;

  // Class match
  if (criteria.classes) {
    const cls =
      (vnode.props?.class as string | undefined) ??
      (vnode.props?.className as string | undefined) ??
      "";

    const classSet = new Set(cls.split(/\s+/));

    for (const c of criteria.classes) {
      if (!classSet.has(c)) return false;
    }
  }

  // Props match
  if (criteria.props) {
    for (const [key, value] of Object.entries(criteria.props)) {
      if (vnode.props?.[key] !== value) return false;
    }
  }

  return true;
}

describe("WebmentionsContent", () => {
  it("render created date for an unmodified note and no †", () => {
    const Component = WebmentionsContent({});

    const vnode = Component(baseProps)!;

    const time = findVNode(vnode, (n) => matchVNode(n, { type: "time" }));
    expect(time).toBeTruthy();
    expect(time?.props?.datetime).toBe("2024-01-01T00:00:00.000Z");
    expect(time?.props?.children).toBe("1 January 2024");
    expect(JSON.stringify(vnode)).not.toContain("†");
  });

  it("render modified date for a modified note and †", () => {
    const Component = WebmentionsContent({});

    const vnode = Component({
      ...baseProps,
      fileData: {
        ...baseProps.fileData,
        dates: {
          created: new Date("2024-01-01"),
          modified: new Date("2024-01-02"),
          published: new Date("2024-01-02"),
        },
      },
    })!;

    const time = findVNode(vnode, (n) => matchVNode(n, { type: "time" }));

    expect(time?.props?.datetime).toBe("2024-01-02T00:00:00.000Z");
    expect(time?.props?.children).toBe("2 January 2024");
    expect(JSON.stringify(vnode)).toContain("†");
  });

  it("render normal time if not cmdrs-log", () => {
    const Component = WebmentionsContent({});

    const vnode = Component({
      ...baseProps,
      fileData: {
        ...baseProps.fileData,
        frontmatter: {
          ...baseProps.fileData.frontmatter,
          title: "3304-01-04",
          tags: ["not-cmdrs-log"],
        },
      },
    })!;

    const time = findVNode(vnode, (n) => matchVNode(n, { type: "time" }));

    expect(time?.props?.datetime).toBe("2024-01-01T00:00:00.000Z");
    expect(time?.props?.children).toBe("1 January 2024");
    expect(JSON.stringify(vnode)).not.toContain("†");
    expect(JSON.stringify(vnode)).not.toContain("Universal Galactic Time: ");
  });

  it("render Univerfsal Galactic time if cmdrs-log", () => {
    const Component = WebmentionsContent({});

    const vnode = Component({
      ...baseProps,
      fileData: {
        ...baseProps.fileData,
        frontmatter: {
          ...baseProps.fileData.frontmatter,
          title: "3304-01-04",
          tags: ["cmdrs-log"],
        },
      },
    })!;

    const time = findVNode(vnode, (n) => matchVNode(n, { type: "time" }));

    expect(time?.props?.datetime).toBe("3304-01-04T00:00:00.000Z");
    expect(time?.props?.children).toBe("4 January 3304");
    expect(JSON.stringify(vnode)).not.toContain("†");
    expect(JSON.stringify(vnode)).toContain("Universal Galactic Time: ");
  });

  it("unrated item", () => {
    const Component = WebmentionsContent({ showRatings: true });

    const vnode = Component(baseProps)!;

    expect(JSON.stringify(vnode)).not.toContain("⭐️");
  });

  it("rated item, show ratings enabled", () => {
    const Component = WebmentionsContent({ showRatings: true });

    const vnode = Component({
      ...baseProps,
      fileData: {
        ...baseProps.fileData,
        frontmatter: {
          ...baseProps.fileData.frontmatter,
          title: "Rated item",
          rating: 4,
        },
      },
    })!;

    expect(JSON.stringify(vnode)).toContain("⭐️⭐️⭐️⭐️");
  });

  it("rated item, show ratings disabled", () => {
    const Component = WebmentionsContent({ showRatings: false });

    const vnode = Component({
      ...baseProps,
      fileData: {
        ...baseProps.fileData,
        frontmatter: {
          ...baseProps.fileData.frontmatter,
          title: "Rated item",
          rating: 4,
        },
      },
    })!;

    expect(JSON.stringify(vnode)).not.toContain("⭐️⭐️⭐️⭐️");
  });

  it("no series", () => {
    const Component = WebmentionsContent({ showSeries: true });

    const vnode = Component(baseProps)!;
    expect(JSON.stringify(vnode)).not.toContain("The Dark Tower");
  });

  it("link to series if it exists", () => {
    const Component = WebmentionsContent({ showSeries: true });

    const vnode = Component({
      ...baseProps,
      allFiles: [
        {
          slug: "notes/the-dark-tower" as FullSlug,
          frontmatter: {
            title: "The Dark Tower",
          },
        },
      ],
      fileData: {
        ...baseProps.fileData,
        frontmatter: {
          ...baseProps.fileData.frontmatter,
          title: "The Wastelands",
          series: "The Dark Tower",
          sequence: 4,
        },
      },
    })!;

    expect(JSON.stringify(vnode)).toContain("/notes/the-dark-tower");
    expect(JSON.stringify(vnode)).toContain("The Dark Tower");
    expect(JSON.stringify(vnode)).toContain("(4)");
  });

  it("still show series if page missing", () => {
    const Component = WebmentionsContent({ showSeries: true });

    const vnode = Component({
      ...baseProps,
      fileData: {
        ...baseProps.fileData,
        frontmatter: {
          ...baseProps.fileData.frontmatter,
          title: "The Wastelands",
          series: "The Dark Tower",
          sequence: 4,
        },
      },
    })!;

    expect(JSON.stringify(vnode)).not.toContain("/notes/the-dark-tower");
    expect(JSON.stringify(vnode)).toContain("The Dark Tower");
    expect(JSON.stringify(vnode)).toContain("(4)");
  });

  it("no classes specified in tags", () => {
    const Component = WebmentionsContent({});

    const vnode = Component(baseProps)!;

    const link = findVNode(vnode, (n) =>
      matchVNode(n, {
        type: "a",
        classes: ["internal", "tag-link"],
        props: { href: "/blog/" },
      }),
    );

    const icon = findVNode(vnode, (n) =>
      matchVNode(n, {
        type: "i",
        classes: ["nf", "nf-fa-square_rss"],
      }),
    );

    expect(link).not.toBeTruthy();
    expect(icon).not.toBeTruthy();
  });

  it("blog class displayed with icon", () => {
    const Component = WebmentionsContent({});

    const vnode = Component({
      ...baseProps,
      fileData: {
        ...baseProps.fileData,
        frontmatter: {
          ...baseProps.fileData.frontmatter,
          title: "Blog post",
          tags: ["blog", "movie"],
        },
      },
    })!;

    const link = findVNode(vnode, (n) =>
      matchVNode(n, {
        type: "a",
        classes: ["internal", "tag-link"],
        props: { href: "/blog/" },
      }),
    );

    const icon = findVNode(vnode, (n) =>
      matchVNode(n, {
        type: "i",
        classes: ["nf", "nf-fa-square_rss"],
      }),
    );

    expect(icon).toBeTruthy();
    expect(link).toBeTruthy();
  });
});
