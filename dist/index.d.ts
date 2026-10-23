export { WebmentionsContent, WebmentionsContentOptions } from './components/index.js';
import { QuartzTransformerPlugin, QuartzEmitterPlugin } from '@quartz-community/types';
export { QuartzComponent, QuartzComponentProps, QuartzEmitterPlugin, QuartzTransformerPlugin, StringResource } from '@quartz-community/types';
import 'preact';

declare const WebmentionTransformer: QuartzTransformerPlugin;

interface Options {
    enableWebmentionsOutput: boolean;
}
declare const WebMentionContentIndex: QuartzEmitterPlugin<Partial<Options>>;

export { WebMentionContentIndex, WebmentionTransformer };
