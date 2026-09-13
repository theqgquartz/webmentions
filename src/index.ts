export { default as WebmentionsContent } from "./components/WebmentionsContent";
export type { WebmentionsContentOptions } from "./components/WebmentionsContent";
export { WebmentionTransformer } from "./transformer";

// Re-export shared types from @quartz-community/types
export type {
  QuartzComponent,
  QuartzTransformerPlugin,
  QuartzComponentProps,
  StringResource,
} from "@quartz-community/types";
