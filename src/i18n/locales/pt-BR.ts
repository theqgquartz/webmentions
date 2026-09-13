export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `Leitura de ${minutes} min`,
    },
  },
};
