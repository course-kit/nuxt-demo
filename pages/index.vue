<template>
  <article class="bg-gray-50 h-full container">
    <h1>Courses</h1>
    <div class="flex">
      <course-card v-for="course in courses" :key="course.id" :course="course" />
    </div>
  </article>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const courses = await $content('courses').fetch()
    return {
      courses
    }
  }
}
</script>
