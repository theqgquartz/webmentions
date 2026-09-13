export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} menit baca`,
    },
  },
};
