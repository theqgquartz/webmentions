export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => {
        if (minutes === 1) {
          return "1 min read";
        }
        return `${minutes} min read`;
      },
    },
  },
};
