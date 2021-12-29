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
        :path="`/courses/${course.id}`"
      >
        <template #buttons>
          <button
            class="
              text-sm
              mt-6
              px-4
              py-2
              rounded
              text-white
              font-bold
              text-yellow-600
              border-2 border-yellow-600
              bg-transparent
            "
          >
            <span v-if="course.enrolled">
              <span v-if="getNextLesson(course.id) === course.lessons[0]">
                Get started
              </span>
              <span v-else>
                Continue course
              </span>
            </span>
            <span v-else>Learn more</span>
          </button>
        </template>
        <template #overlay>
          <div class="flex justify-end">
            <div
              v-if="course.enrolled"
              class="flex gap-1 items-center py-1 px-2 rounded-md bg-yellow-100"
            >
              <span>
                <CheckCircleIcon class="h-6 w-6 text-yellow-700" />
              </span>
              <span class="text-sm font-bold uppercase text-yellow-700">
                Enrolled
              </span>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon } from '@vue-hero-icons/solid'
import Card from '../components/Card'
export default {
  components: { Card, CheckCircleIcon },
  asyncData({ store }) {
    const courses = store.getters.getCourses()
    return {
      courses,
    }
  },
  methods: {
    getNextLesson(courseId) {
      return this.$store.getters.getLesson(
        courseId,
        this.$user.getNextLessonId()
      )
    },
  },
}
</script>
