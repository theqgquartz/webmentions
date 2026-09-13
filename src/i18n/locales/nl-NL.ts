export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) =>
        minutes === 1 ? "1 minuut leestijd" : `${minutes} minuten leestijd`,
    },
  },
};
