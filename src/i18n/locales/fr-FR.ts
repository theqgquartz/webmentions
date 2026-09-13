export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} min de lecture`,
    },
  },
};
