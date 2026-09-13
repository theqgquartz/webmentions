export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `Se lee en ${minutes} min`,
    },
  },
};
