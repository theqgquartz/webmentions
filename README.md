# @theqgquartz/webmentions

Displays the count of webmention likes and reposts, plus any replies at the bottom of each page

## Installation

```bash
npx quartz plugin add github:theqgquartz/webmentions
```

## Usage

````yaml title="quartz.config.yaml"
plugins:
  - source: github:theqgquartz/webmentions
    enabled: true
    options:
      showLikes: true
      showReposts: true
      showRMentions: true
    layout:
      position: afterBody
      priority: 20
````

## License

MIT

