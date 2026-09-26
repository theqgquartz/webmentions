# @theqgquartz/webmentions

This plugin handles two aspects of [Webmentions](https://indieweb.org/Webmention)

1. A PageComponent that displays the number of likes, reposts and content of reply-to/links
2. An emitter that produces a .json file for later submission of webmentions outside of the Quartz build.

> **Warning**
> This plugin is not publicly maintained. It is being shared primarily for those who wish to employ webmentions in their own Quartz build, or to better understand how they work. For more information about my full end-to-end process visit [Enabling webmentions](https://quantumgardener.info/notes/enabling-webmentions).

## Installation


```bash
git clone https://github.com/theqgquartz/webmentions.git
npm i
npm run build
npx quartz plugin add <path to webmentions>
```

## Building
```bash
npm run build
```

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: github:theqgquartz/webmentions (or local path set when you added the plugin)
    enabled: true
    options:
      showLikes: true
      showReposts: true
      showRMentions: true
      enableWebmentionsOutput: true
    layout:
      position: afterBody
      priority: 20
```

## License

MIT
