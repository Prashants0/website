import type { CmsPuckConfig } from "./types";

export const cmsPuckConfigServer: CmsPuckConfig = {
  components: {
    Heading: {
      fields: {
        text: { type: "richtext" },
        level: {
          type: "select",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
          ],
        },
        align: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
          ],
        },
      },
      defaultProps: {
        text: null as any,
        level: "h2",
        align: "left",
      },
      render: ({ text, level, align }) => {
        const Tag = level;
        const cls =
          level === "h1"
            ? "text-4xl md:text-5xl font-display font-black tracking-tight"
            : level === "h2"
              ? "text-3xl md:text-4xl font-display font-extrabold tracking-tight"
              : "text-2xl md:text-3xl font-display font-bold tracking-tight";

        return (
          <Tag
            className={`cms-inline-heading ${cls} ${align === "center" ? "text-center" : "text-left"}`}
          >
            {text}
          </Tag>
        );
      },
    },

    RichText: {
      fields: {
        body: {
          type: "richtext",
        },
      },
      defaultProps: {
        body: null as any,
      },
      render: ({ body }) => {
        return <div className="cms-richtext">{body}</div>;
      },
    },

    Image: {
      fields: {
        url: { type: "text" },
        alt: { type: "text" },
        caption: { type: "richtext" },
      },
      defaultProps: {
        url: "",
        alt: "",
        caption: null as any,
      },
      render: ({ url, alt, caption }) => {
        if (!url) return <></>;
        return (
          <figure className="my-8">
            <div className="overflow-hidden rounded-2xl border bg-muted/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={alt} className="h-auto w-full" />
            </div>
            {caption ? (
              <figcaption className="mt-2 text-sm text-muted-foreground cms-richtext">{caption}</figcaption>
            ) : null}
          </figure>
        );
      },
    },

    Quote: {
      fields: {
        quote: { type: "richtext" },
        author: { type: "richtext" },
      },
      defaultProps: {
        quote: null as any,
        author: null as any,
      },
      render: ({ quote, author }) => {
        if (!quote) return <></>;
        return (
          <blockquote className="my-10 rounded-2xl border bg-muted/30 p-7">
            <div className="text-lg leading-relaxed cms-richtext">{quote}</div>
            {author ? <footer className="mt-3 text-sm text-muted-foreground cms-richtext">{author}</footer> : null}
          </blockquote>
        );
      },
    },

    Callout: {
      fields: {
        tone: {
          type: "select",
          options: [
            { label: "Info", value: "info" },
            { label: "Warning", value: "warning" },
            { label: "Success", value: "success" },
          ],
        },
        title: { type: "richtext" },
        body: { type: "richtext" },
      },
      defaultProps: {
        tone: "info",
        title: null as any,
        body: null as any,
      },
      render: ({ tone, title, body }) => {
        const toneClass =
          tone === "warning"
            ? "border-amber-500/30 bg-amber-500/10"
            : tone === "success"
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-sky-500/30 bg-sky-500/10";

        return (
          <div className={`my-8 rounded-2xl border p-6 ${toneClass}`}>
            {title ? <div className="mb-2 text-sm font-semibold cms-richtext">{title}</div> : null}
            <div className="cms-richtext">{body}</div>
          </div>
        );
      },
    },

    Divider: {
      fields: {},
      defaultProps: {},
      render: () => <hr className="my-10 border-border/60" />,
    },

    Section: {
      fields: {
        tone: {
          type: "select",
          options: [
            { label: "Plain", value: "plain" },
            { label: "Muted", value: "muted" },
          ],
        },
        padding: {
          type: "select",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
          ],
        },
        content: { type: "slot" },
      },
      defaultProps: {
        tone: "plain",
        padding: "md",
        content: [] as any,
      },
      render: ({ tone, padding, content: Content }) => {
        const pad = padding === "sm" ? "py-8" : padding === "lg" ? "py-16" : "py-12";
        const bg = tone === "muted" ? "bg-muted/30" : "bg-transparent";
        return (
          <section className={`${bg} ${pad}`}>
            <div className="mx-auto max-w-[920px] px-6">
              <Content />
            </div>
          </section>
        );
      },
    },

    Columns: {
      fields: {
        ratio: {
          type: "select",
          options: [
            { label: "1 / 1", value: "1/1" },
            { label: "2 / 1", value: "2/1" },
            { label: "1 / 2", value: "1/2" },
          ],
        },
        gap: {
          type: "select",
          options: [
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
          ],
        },
        left: { type: "slot" },
        right: { type: "slot" },
      },
      defaultProps: {
        ratio: "1/1",
        gap: "lg",
        left: [] as any,
        right: [] as any,
      },
      render: ({ ratio, gap, left: Left, right: Right }) => {
        const gapCls = gap === "md" ? "gap-6" : "gap-10";
        const cols =
          ratio === "2/1"
            ? "lg:grid-cols-[2fr_1fr]"
            : ratio === "1/2"
              ? "lg:grid-cols-[1fr_2fr]"
              : "lg:grid-cols-2";

        return (
          <div className={`grid grid-cols-1 ${gapCls} ${cols} my-10`}>
            <div>
              <Left />
            </div>
            <div>
              <Right />
            </div>
          </div>
        );
      },
    },
  },
};
