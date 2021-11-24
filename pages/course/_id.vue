<template>
  <div>
    <h1>{{ courses[0].title }}</h1>
    <ul>
      <li v-for="lesson in lessons" :key="lesson.id">
        <nuxt-link :to="`/lesson/${lesson.id}`">{{ lesson.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $content }) {
    const courses = await $content('courses').where({ id: parseInt(params.id) }).fetch()
    const lessons = await $content('lessons').where({ course: parseInt(params.id) }).sortBy('id', 'asc').fetch()
    return {
      courses,
      lessons
    }
  }
}
</script>
