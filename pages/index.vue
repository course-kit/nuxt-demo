<template>
  <div>
    <h1 class="text-4xl mb-8 font-bold text-yellow-900">Courses</h1>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
      <Card
        v-for="course in courses"
        :key="course.id"
        :title="course.title"
        :description="course.description"
        :thumb="course.thumb"
        :path="`/course/${course.id}`"
      />
    </div>
  </div>
</template>

<script>
import { Client } from '../coursekit-client'
import Card from '../components/Card'
const schoolId = ''

export default {
  components: { Card },
  async asyncData({ $content }) {
    let courses = await $content('courses').sortBy('order', 'asc').fetch()
    if (process.client) {
      const client = new Client(schoolId)
      const loggedIn = await client.isLoggedIn
      if (loggedIn) {
        courses = client.enrichCourses(courses)
      }
    }
    return {
      courses,
    }
  },
}
</script>
