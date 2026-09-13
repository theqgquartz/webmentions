export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `อ่านราว ${minutes} นาที`,
    },
  },
};
