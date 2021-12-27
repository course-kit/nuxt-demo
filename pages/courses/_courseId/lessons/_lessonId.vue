<template>
  <div class="max-w-video">
    <Player v-if="lesson" :course="course" :lesson="lesson" />
    <div class="pt-8" v-if="$user.isAuthenticated()">
      <nuxt-link class="bg-yellow-600 rounded py-2 px-4 text-white font-bold" v-if="nextLesson" :to="`/courses/${course.id}/lessons/${nextLesson.id}`">
        Complete and continue
      </nuxt-link>
      <nuxt-link class="bg-yellow-600 rounded py-2 px-4 text-white font-bold" v-else to="/" >
        Back to courses
      </nuxt-link>
    </div>
    <NuxtContent :document="lesson" class="mt-8"></NuxtContent>
  </div>
</template>
<script>
export default {
  asyncData({ params, store }) {
    const course = store.getters.getCourse(params.courseId)
    const lesson = store.getters.getCourse(params.lessonId)
    const nextLesson = store.getters.getNextLesson(params.courseId, params.lessonId)
    return {
      course,
      lesson,
      nextLesson,
    }
  },
}
</script>
