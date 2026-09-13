export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} мин оқу`,
    },
  },
};
