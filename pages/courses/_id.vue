<template>
  <div>
    <Alert v-if="sale">
      <h3 class="font-medium text-green-800">Purchase successful! Now, one more thing...</h3>
      <div class="mt-2 text-sm text-green-700">
        <p>To complete your enrollment, check your email and activate your account.</p>
      </div>
    </Alert>
    <Alert v-if="registered">
      <h3 class="font-medium text-green-800">Thanks for registering!</h3>
      <div class="mt-2 text-sm text-green-700">
        <p>Now you can get started on your course.</p>
      </div>
    </Alert>
    <h1 class="text-4xl mb-8 font-bold text-yellow-900">
      {{ course.title }}
    </h1>
    <client-only>
      <div v-if="course.enrolled" class="flex flex-row">
        <div>
          <ProgressRing :percentage="$user.getProgress(course.id) * 100" class="mr-8" />
        </div>
        <div>
          <nuxt-content class="prose prose-sm sm:prose" :document="course" />
          <nuxt-link
            :to="`/courses/${course.id}/lessons/${nextLesson.id}`"
            class="inline-block mt-6 text-lg font-bold rounded py-3 px-6 bg-yellow-600 text-white">
            <span v-if="nextLesson === course.lessons[0]">Get started</span>
            <span v-else>Continue with lesson {{ nextLesson.order }}</span>
          </nuxt-link>
        </div>
      </div>
      <div v-else>
        <nuxt-content class="prose prose-sm sm:prose" :document="course" />
        <a
          :href="course.productUrl"
          class="inline-block mt-6 text-lg font-bold rounded py-3 px-6 bg-yellow-600 text-white">
          Enroll now
        </a>
      </div>
    </client-only>

    <h2 class="mt-12 text-yellow-900 text-2xl font-bold">Lessons</h2>
    <div class="mt-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
      <Card
        v-for="lesson in course.lessons"
        :key="lesson.id"
        :title="lesson.title"
        :description="lesson.description"
        :thumb="lesson.thumb"
        :path="`/courses/${course.id}/lessons/${lesson.id}`">
        <template #overlay>
          <client-only>
            <div class="flex justify-end">
              <div
                v-if="lesson.complete"
                class="flex gap-1 items-center py-1 px-2 rounded-md bg-yellow-100">
                <span>
                  <CheckCircleIcon class="h-6 w-6 text-yellow-700" />
                </span>
                <span class="text-sm font-bold uppercase text-yellow-700">Complete</span>
              </div>
            </div>
          </client-only>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon } from '@vue-hero-icons/solid'
import ProgressRing from '../../components/ProgressRing'
export default {
  components: {
    ProgressRing,
    CheckCircleIcon,
  },
  data: () => ({
    course: {},
    nextLesson: {},
    sale: false,
    registered: false,
  }),
  created() {
    const courseId = this.$route.params.id
    const course = this.$store.getters.getCourse(courseId)
    const nextLesson = this.$store.getters.getLesson(
      course.id,
      this.$user.getNextLessonId(course.id)
    )
    this.course = course
    this.nextLesson = nextLesson
  },
  mounted() {
    if (this.$route.query.sale) {
      this.sale = true
    }
    if (this.$route.query.registered) {
      this.registered = true
    }
  },
}
</script>
