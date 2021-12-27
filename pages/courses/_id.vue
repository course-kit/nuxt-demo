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
      <h3 class="font-medium text-green-800">Thanks for registering!</h3>
      <div class="mt-2 text-sm text-green-700">
        <p>
          Now you can get started on your course.
        </p>
      </div>
    </Alert>
    <h1 class="text-4xl mb-8 font-bold text-yellow-900">
      {{ course.title }}
    </h1>
    <div class="flex flex-row" v-if="course.enrolled">
      <div>
        <ProgressRing :percentage="$user.getProgress() * 100" class="mr-8" />
      </div>
      <div>
        <NuxtContent class="prose prose-sm sm:prose" :document="course" />
        <nuxt-link :to="`/${course.id}/${$user.getNextLessonId()}`" class="inline-block mt-6 text-lg font-bold rounded py-3 px-6 bg-yellow-600 text-white">
          <span v-if="$user.getNextLessonId() === course.lessons[0].id">Get started</span>
          <span v-else>Continue with lesson 2</span>
        </nuxt-link>
      </div>
    </div>
    <div v-else>
      <NuxtContent class="prose prose-sm sm:prose" :document="course" />
      <a :href="course.enrolUrl" class="inline-block mt-6 text-lg font-bold rounded py-3 px-6 bg-yellow-600 text-white">Enrol now</a>
    </div>
    <h2 class="mt-12 text-yellow-900 text-2xl font-bold">Lessons</h2>
    <div class="mt-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
      <Card
        v-for="lesson in course.lessons"
        :key="lesson.id"
        :title="lesson.title"
        :description="lesson.description"
        :thumb="lesson.thumb"
        :path="`/courses/${course.id}/lessons/${lesson.id}`"
      >

        <template #overlay>
          <div class="flex justify-end">
            <div class="flex gap-1 items-center py-1 px-2 rounded-md bg-yellow-100" v-if="lesson.complete">
              <span>
                <CheckCircleIcon class="h-6 w-6 text-yellow-700"/>
              </span>
              <span class="text-sm font-bold uppercase text-yellow-700">
                Watched
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
import ProgressRing from "../../components/ProgressRing";

export default {
  components: {
    ProgressRing,
    CheckCircleIcon
  },
  asyncData({ params, store }) {
    const course = store.getters.getCourse(params.id)
    return {
      course
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
