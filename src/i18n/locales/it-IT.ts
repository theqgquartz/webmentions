export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) =>
        minutes === 1 ? "1 minuto" : `${minutes} minuti`,
    },
  },
};
