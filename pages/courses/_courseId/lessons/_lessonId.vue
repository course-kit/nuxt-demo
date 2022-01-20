<template>
  <div>
    <p class="text-yellow-900 mb-8 text-lg">
      <nuxt-link class="underline" :to="`/courses/${course.id}`">
        {{ course.title }}
      </nuxt-link>
      <span class="px-3">></span>
      <span class="font-bold">{{ lesson.title }}</span>
    </p>
    <div>
      <Content :content="lesson.html" :state="state" :course="course" :lesson="lesson" />
      <div v-if="course.enrolled" class="pt-8">
        <button
          class="bg-yellow-600 rounded py-2 px-4 text-white font-bold"
          @click="completeAndContinue">
          Complete and continue
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ app, params, error }) {
    const { courseId, lessonId } = params
    const { $ck } = app
    const course = await $ck.loadCourse(courseId)
    const lesson = await $ck.loadLesson(courseId, lessonId)
    if (course.status === 404 || lesson.status === 404) {
      return error({ statusCode: 404, message: 'Lesson not found' })
    }
    return { course: course.course, lesson: lesson.lesson }
  },
  data: () => ({
    course: {},
    lesson: {},
    state: 'loading',
    content: null,
  }),
  async created() {
    const { courseId, lessonId } = this.$route.params
    const { course } = await this.$ck.loadCourse(courseId)
    const { lesson, status } = await this.$ck.loadLesson(courseId, lessonId)
    this.course = course
    this.lesson = lesson
    this.setState(status)
  },
  methods: {
    setState(status) {
      switch(status) {
        case 200:
          this.state = 'ready'
          break
        case 401:
          this.state = 'unauthenticated'
          break
        case 403:
          this.state = 'unauthorized'
          break
        case 500:
          this.state = 'error'
          break
        default:
          this.state ='loading'
      }
    },
    async completeAndContinue() {
      await this.lesson.markComplete()
      const courseId = this.course.id
      const { course } = await this.$ck.loadCourse(courseId)
      if (course.nextLessonId) {
        window.location.href = `/courses/${courseId}/lessons/${course.nextLessonId}`
      } else {
        window.location.href = `/courses/${courseId}`
      }
    },
  },
}
</script>
