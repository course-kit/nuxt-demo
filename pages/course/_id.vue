<template>
  <div>
    <Alert v-if="enrolmentSuccess">
      <h3 class="font-medium text-green-800">Purchase successful! Now, one more thing...</h3>
      <div class="mt-2 text-sm text-green-700">
        <p>
          To complete your enrolment, check your email and activate your
          account.
        </p>
      </div>
    </Alert>
    <Alert v-if="registrationSuccess">
      <h3 class="font-medium text-green-800">Thanks for registering</h3>
      <div class="mt-2 text-sm text-green-700">
        <p>
          Now you can get started on your course.
        </p>
      </div>
    </Alert>
    <h1 class="text-4xl mb-8 font-bold text-yellow-900">
      {{ course.title }}
    </h1>
    <NuxtContent class="prose prose-sm sm:prose" :document="course" />
    <a :href="course.enrolUrl" class="inline-block mt-6 text-lg font-bold rounded py-3 px-6 bg-yellow-600 text-white">Enrol now</a>
    <h2 class="mt-12 text-yellow-900 text-2xl font-bold">Lessons</h2>
    <div class="mt-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
      <Card
        v-for="lesson in lessons"
        :key="lesson.id"
        :title="lesson.title"
        :description="lesson.description"
        :thumb="lesson.thumb"
        :path="`/lesson/${lesson.id}`"
      />
    </div>
  </div>
</template>

<script>
import { Client } from '../../coursekit-client'
const schoolId = ''

export default {
  async asyncData({ params, $content }) {
    let courses = await $content('courses')
      .where({ id: parseInt(params.id) })
      .fetch()
    const course = courses[0]
    let lessons = await $content('lessons')
      .where({ course: parseInt(params.id) })
      .sortBy('order', 'asc')
      .fetch()
    if (process.client) {
      const client = new Client(schoolId)
      const loggedIn = await client.isLoggedIn
      if (loggedIn) {
        courses = client.enrichCourses(courses)
        lessons = client.enrichLessons(params.id, lessons)
      }
    }
    return {
      course,
      lessons,
    }
  },
  data: () => ({
    enrolmentSuccess: false,
    registrationSuccess: false
  }),
  mounted() {
    if (this.$route.query.sale) {
      this.enrolmentSuccess = true
    }
    if (this.$route.query.registered) {
      this.registrationSuccess = true
    }
  },
}
</script>
