import * as preact from 'preact';
import { QuartzComponentProps } from '@quartz-community/types';

interface WebmentionsContentOptions {
    showLikes: boolean;
    showReposts: boolean;
    showReplies: boolean;
}
declare const _default: (opts?: Partial<WebmentionsContentOptions>) => {
    ({ fileData }: QuartzComponentProps): preact.JSX.Element | null;
    css: string;
};

export { _default as WebmentionsContent, type WebmentionsContentOptions };
