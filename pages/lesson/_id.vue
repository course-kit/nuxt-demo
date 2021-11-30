<template>
  <div class="max-w-video">
    <Player v-if="lesson" :course="course" :lesson="lesson"/>
    <nuxt-link v-if="nextLesson" :to="`/lesson/${nextLesson.id}`">Next lesson</nuxt-link>
    <nuxt-link v-else to="/">Back to courses</nuxt-link>
  </div>
</template>
<script>
export default {
  async asyncData ({ params, $content }) {
    const lessons = await $content('lessons').where({ id: parseInt(params.id) }).fetch()
    const nextLessons = await $content('lessons').where({ id: parseInt(params.id) + 1 }).fetch()
    const lesson = lessons[0]
    const courses = await $content('courses').where({ id: lesson.course }).fetch()
    const course = courses[0]
    const nextLesson = nextLessons[0]
    return {
      course,
      lesson,
      nextLesson
    }
  }
}
</script>
