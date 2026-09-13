export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) =>
        minutes == 1 ? `lectură de 1 minut` : `lectură de ${minutes} minute`,
    },
  },
};
