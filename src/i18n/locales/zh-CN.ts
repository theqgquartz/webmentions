export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes}分钟阅读`,
    },
  },
};
