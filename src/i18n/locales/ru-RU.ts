export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `время чтения ~${minutes} мин.`,
    },
  },
};
