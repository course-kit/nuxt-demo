<template>
  <div class="max-w-video">
    <Player
      v-if="lesson"
      :course="course"
      :lesson="lesson"
      @ended="completeAndContinue"
    />
    <div v-if="$user.isAuthenticated()" class="pt-8">
      <button
        class="bg-yellow-600 rounded py-2 px-4 text-white font-bold"
        @click="completeAndContinue"
      >
        Complete and continue
      </button>
    </div>
    <nuxt-content :document="lesson" class="mt-8" />
  </div>
</template>
<script>
export default {
  asyncData({ params, store }) {
    const course = store.getters.getCourse(params.courseId)
    const lesson = store.getters.getLesson(params.courseId, params.lessonId)
    return {
      course,
      lesson,
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
