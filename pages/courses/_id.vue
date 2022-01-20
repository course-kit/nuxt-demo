<template>
  <div>
    <Alert v-if="sale">
      <h3 class="font-medium text-green-800">Purchase successful! Now, one more thing...</h3>
      <div class="mt-2 text-sm text-green-700">
        <p>To complete your enrollment, check your email and activate your account.</p>
      </div>
    </Alert>
    <Alert v-if="error" type="error">
      <h3 class="font-medium text-red-800">Purchase unsuccessful...</h3>
      <div class="mt-2 text-sm text-red-700">
        <p>To complete your enrollment you'll need to retry your purchase.</p>
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

    <div v-if="course.enrolled" class="flex flex-row flex-wrap items-center">
      <div>
        <ProgressRing :percentage="course.progress * 100" class="mr-8 mb-6" />
      </div>
      <div>
        <nuxt-link
          :to="`/courses/${course.id}/lessons/${nextLesson.id}`"
          class="inline-block bg-yellow-600 text-white btn-lg mb-6">
          <span v-if="course.nextLessonId && nextLesson.id === course.lessons[0].id">Get started</span>
          <span v-else>Continue with lesson {{ nextLesson.order }}</span>
        </nuxt-link>
      </div>
    </div>
    <div v-else>
      <a @click="enroll" class="inline-block my-6 btn-lg bg-yellow-600 text-white">
        Enroll now
      </a>
      <stripe-checkout
        ref="checkoutRef"
        mode="payment"
        :pk="pk"
        :line-items=" [{ price: course.meta.stripePriceId, quantity: 1 }]"
        :success-url="successURL"
        :cancel-url="cancelURL"
        @loading="v => loading = v"
      />
    </div>
    <h2 class="mt-6 text-yellow-900 text-2xl font-bold">Lessons</h2>
    <div v-if="course" class="mt-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
      <Card
        v-for="lesson in course.lessons"
        :key="lesson.id"
        :title="lesson.title"
        :description="lesson.meta.description"
        :thumb="lesson.meta.thumb"
        :path="`/courses/${course.id}/lessons/${lesson.id}`">
        <template #overlay>
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
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon } from '@vue-hero-icons/solid'
import ProgressRing from '@/components/ProgressRing'

export default {
  components: {
    ProgressRing,
    CheckCircleIcon
  },
  async asyncData({ app, params, error }) {
    const { id } = params
    const { $ck } = app
    const course = await $ck.loadCourse(id)
    if (course.status === 404) {
      return error({ statusCode: 404, message: 'Course not found' })
    }
    const lessonId = course.course.nextLessonId ? course.course.nextLessonId : course.course.lessons[0].id
    const lesson = await $ck.loadLesson(id, lessonId)
    return { course: course.course, nextLesson: lesson.lesson }
  },
  data: () => ({
    course: {},
    nextLesson: {},
    sale: false,
    error:false,
    registered: false,
    loading: false,
    successURL: process.client ? `${window.location.origin}${window.location.pathname}?sale=true` : null,
    cancelURL: process.client ? `${window.location.origin}${window.location.pathname}?error=true` : null,
    pk: process.env.STRIPE_PUBLIC_KEY
  }),
  async created() {
    const courseId = this.$route.params.id
    const course = await this.$ck.loadCourse(courseId)
    if (course.status === 404) {
      return this.$nuxt.error({ statusCode: 404, message: 'Course not found' })
    }
    const lessonId = course.course.nextLessonId ? course.course.nextLessonId : course.course.lessons[0].id
    const lesson = await this.$ck.loadLesson(courseId, lessonId)
    this.course = course.course
    this.nextLesson = lesson.lesson
  },
  methods: {
    enroll () {
      this.$refs.checkoutRef.redirectToCheckout()
    }
  },
  mounted() {
    if (this.$route.query.sale) {
      this.sale = true
    }
    if (this.$route.query.error) {
      this.error = true
    }
    if (this.$route.query.registered) {
      this.registered = true
    }
  },
}
</script>
