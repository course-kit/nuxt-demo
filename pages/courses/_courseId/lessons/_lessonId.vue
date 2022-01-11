<template>
  <div>
    <p class="text-yellow-900 mb-8 text-lg">
      <nuxt-link class="underline" :to="`/courses/${course.id}`">
        {{ course.title }}
      </nuxt-link>
      <span class="px-3">></span>
      <span class="font-bold">{{ lesson.title }}</span>
    </p>
    <client-only>
      <div class="max-w-video">
        <Player v-if="video" :state="state" :course="course" :lesson="lesson">
          <div id="video"></div>
        </Player>
        <Content :content="content" :state="state" :course="course" :lesson="lesson" />
        <div v-if="$user.isAuthenticated()" class="pt-8">
          <button
            class="bg-yellow-600 rounded py-2 px-4 text-white font-bold"
            @click="completeAndContinue">
            Complete and continue
          </button>
        </div>
      </div>
    </client-only>
  </div>
</template>
<script>
import { LessonLoader } from '@coursekit/client'

export default {
  data: () => ({
    course: {},
    lesson: {},
    state: 'loading',
    video: false,
    content: null,
  }),
  created() {
    const { courseId, lessonId } = this.$route.params
    this.course = this.$store.getters.getCourse(courseId)
    this.lesson = this.$store.getters.getLesson(courseId, lessonId)
  },
  async mounted() {
    const opts = {}
    if (process.env.NODE_ENV === 'development') {
      opts.baseUrl = process.env.API_URL
    }
    const loader = new LessonLoader(this.course.id, this.lesson.id, opts)

    const { status, player } = await loader.loadPlayer('#video')
    const { content } = await loader.loadContent()

    if (status === 200) {
      if (player) {
        player.addEventListener('ready', () => {
          this.state = 'ready'
        })
        player.addEventListener('ended', () => {
          this.completeAndContinue()
        })
      }
      if (content) {
        this.state = 'ready'
        this.content = content
      }
    }

    if (status === 401) {
      this.state = 'unauthenticated'
    }

    if (status === 403) {
      this.state = 'unauthorized'
    }

    if (status === 500) {
      this.state = 'error'
    }
  },
  methods: {
    async completeAndContinue() {
      await this.$user.markComplete(this.course.id, this.lesson.id)
      const nextLesson = this.$store.getters.getLesson(
        this.course.id,
        this.$user.getNextLessonId(this.course.id)
      )
      window.location.href = `/courses/${this.course.id}/lessons/${nextLesson.id}`
    },
  },
}
</script>
