<template>
  <div class="max-w-video">
<!--    <Player-->
<!--      v-if="lesson"-->
<!--      :course="course"-->
<!--      :lesson="lesson"-->
<!--      :state="state"-->
<!--      @ready="state = 'ready'"-->
<!--      @ended="completeAndContinue"-->
<!--    />-->
    <div v-if="$user.isAuthenticated()" class="pt-8">
      <button
        class="bg-yellow-600 rounded py-2 px-4 text-white font-bold"
        @click="completeAndContinue"
      >
        Complete and continue
      </button>
    </div>
    <nuxt-content :document="content" class="mt-8" />
  </div>
</template>
<script>
import { LessonLoader } from '@coursekit/client'

export default {
  data: () => ({
    course: {},
    lesson: {},
    state: 'loading',
    content: null
  }),
  created() {
    const { courseId, lessonId } = this.$route.params
    this.course = this.$store.getters.getCourse(courseId)
    this.lesson = this.$store.getters.getLesson(courseId, lessonId)
  },
  async mounted() {
    const opts = {}
    if (process.env.NODE_ENV === 'development') {
      opts.baseUrl = process.env.API_URL
    }
    const loader = new LessonLoader(this.course.id, this.lesson.id, opts)

    const { status, lesson, player } = await loader.load('#video')

    this.content = lesson.content

    if (status === 200) {
      this.state = 'success'
    }

    if (status === 401) {
      this.state = 'unauthenticated'
    }

    if (status === 403) {
      this.state = 'unauthorized'
    }

    if (status === 500) {
      this.state = 'error'
    }
  },
  methods: {
    async completeAndContinue() {
      const nextLesson = await this.$user.markComplete(
        this.course.id,
        this.lesson.id
      )
      this.$router.push(`/courses/${this.course.id}/lessons/${nextLesson.id}`)
    },
  },
}
</script>
