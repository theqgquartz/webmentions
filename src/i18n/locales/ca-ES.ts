export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `Es llegeix en ${minutes} min`,
    },
  },
};
