export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `閱讀時間約 ${minutes} 分鐘`,
    },
  },
};
