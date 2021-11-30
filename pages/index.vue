<template>
  <article class="bg-gray-50 h-full container">
    <h1>Courses</h1>
    <div class="flex">
      <course-card v-for="course in courses" :key="course.id" :course="course" />
    </div>
  </article>
</template>

<script>
import { Client } from "../coursekit-client"
const schoolId = ''

export default {
  async asyncData ({ $content }) {
    let courses = await $content('courses').sortBy('order', 'asc').fetch()
    if (process.client) {
      const client = new Client(schoolId)
      const loggedIn = await client.isLoggedIn
      if (loggedIn) {
        courses = client.enrichCourses(courses)
      }
    }
    return {
      courses
    }
  }
}
</script>
