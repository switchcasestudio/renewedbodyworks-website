import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "healcode-widget": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        "data-type"?: string;
        "data-widget-partner"?: string;
        "data-widget-id"?: string;
        "data-widget-version"?: string;
      };
    }
  }
}
