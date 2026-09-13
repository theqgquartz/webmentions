export default {
  components: {
    WebmentionsContent: {
      readingTime: ({ minutes }: { minutes: number }) => `زمان تقریبی مطالعه: ${minutes} دقیقه`,
    },
  },
};
