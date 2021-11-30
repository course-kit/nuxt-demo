<template>
  <div>
    <OrderAlert v-if="enrolmentSuccess" />
    <h1>{{ courses[0].title }}</h1>
    <ul>
      <li v-for="lesson in lessons" :key="lesson.id">
        <nuxt-link :to="`/lesson/${lesson.id}`">{{ lesson.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import OrderAlert from "../../components/OrderAlert";
import { Client } from "../../coursekit-client"
const schoolId = ''

export default {
  components: {OrderAlert},
  async asyncData ({ params, $content }) {
    let courses = await $content('courses').where({ id: parseInt(params.id) }).fetch()
    let lessons = await $content('lessons').where({ course: parseInt(params.id) }).sortBy('order', 'asc').fetch()
    if (process.client) {
      const client = new Client(schoolId)
      const loggedIn = await client.isLoggedIn
      if (loggedIn) {
        courses = client.enrichCourses(courses)
        lessons = client.enrichLessons(params.id, lessons)
      }
    }
    return {
      courses,
      lessons
    }
  },
  data: () => ({
    enrolmentSuccess: false
  }),
  mounted () {
    if (this.$route.query.sale) {
      this.enrolmentSuccess = true
    }
  }
}
</script>
