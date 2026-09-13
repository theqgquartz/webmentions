export { WebmentionsContent, WebmentionsContentOptions } from './components/index.js';
import { QuartzTransformerPlugin } from '@quartz-community/types';
export { QuartzComponent, QuartzComponentProps, QuartzTransformerPlugin, StringResource } from '@quartz-community/types';
import 'preact';

declare const WebmentionTransformer: QuartzTransformerPlugin;

export { WebmentionTransformer };
