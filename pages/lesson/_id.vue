<template>
  <div class="max-w-video">
    <Player v-if="lesson" :course="course" :lesson="lesson" />
    <div class="pt-8">
      <nuxt-link class="bg-yellow-600 rounded py-2 px-4 text-white font-bold" v-if="nextLesson" :to="`/lesson/${nextLesson.id}`">
        Next lesson
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
  async asyncData({ params, $content }) {
    const lessons = await $content('lessons').fetch()
    const lesson = lessons.find(lesson => lesson.id === parseInt(params.id))
    const courses = await $content('courses')
      .where({ id: lesson.course })
      .fetch()
    const course = courses[0]
    const nextLesson = lessons
      .filter(l => l.course === course.id)
      .find(l => l.order === (lesson.order + 1))
    return {
      course,
      lesson,
      nextLesson,
    }
  },
}
</script>
