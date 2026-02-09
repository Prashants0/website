import type { Config, Slot } from "@puckeditor/core";
import type { ReactNode } from "react";

export type CmsPuckProps = {
  Heading: {
    text: ReactNode;
    level: "h1" | "h2" | "h3";
    align: "left" | "center";
  };
  RichText: {
    body: ReactNode;
  };
  Image: {
    url: string;
    alt: string;
    caption?: ReactNode;
  };
  Quote: {
    quote: ReactNode;
    author?: ReactNode;
  };
  Callout: {
    tone: "info" | "warning" | "success";
    title?: ReactNode;
    body: ReactNode;
  };
  Divider: {};
  Section: {
    tone: "plain" | "muted";
    padding: "sm" | "md" | "lg";
    content: Slot;
  };
  Columns: {
    ratio: "1/1" | "2/1" | "1/2";
    gap: "md" | "lg";
    left: Slot;
    right: Slot;
  };
};

export type CmsPuckConfig = Config<CmsPuckProps>;
