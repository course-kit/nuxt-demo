<template>
  <div class="aspect-w-16 aspect-h-9">
    <div v-show="state === 'ready'" id="video" />
    <PlayerLoading v-if="state === 'loading'" />
    <PlayerControls v-else-if="state !== 'ready'" :thumb="lesson.thumb">
      <div v-if="state === 'error'" class="text-center">
        <p class="font-bold text-white text-xl">Network error.</p>
        <p class="text-white text-lg">Please reload to view this video.</p>
      </div>
      <div v-else>
        <p class="font-bold text-white text-lg">
          <span>
            Please enrol in
            <a class="underline" :href="course.enrolUrl">{{ course.title }}</a>
            to see this video.
          </span>
        </p>
        <div class="mt-4 flex gap-4">
          <a
            :href="course.enrolUrl"
            class="
              bg-blue-500
              border-blue-500 border-2
              text-white
              font-bold
              py-2
              px-4
              rounded
              text-sm
            "
            >Enrol</a
          >
          <a
            v-if="state === 'unauthenticated'"
            :href="store.state.loginUrl"
            class="
              cursor-pointer
              bg-transparent
              border-blue-500 border-2
              text-white
              font-bold
              py-2
              px-4
              rounded
              text-sm
            "
            >Log in</a
          >
        </div>
      </div>
    </PlayerControls>
  </div>
</template>
<script>
import { VideoLoader } from '@coursekit/client'
import PlayerControls from './PlayerControls'
import PlayerLoading from './PlayerLoading'

export default {
  components: { PlayerLoading, PlayerControls },
  props: {
    course: {
      type: Object,
      required: true,
    },
    lesson: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    state: 'loading',
  }),
  async created() {
    if (process.client) {
      const opts = {}
      if (process.env.NODE_ENV === 'development') {
        opts.baseUrl = process.env.API_URL
      }
      const loader = new VideoLoader(this.course.id, this.lesson.id, opts)

      const { status, loginUrl, player } = await loader.createPlayer('#video')

      if (status === 200) {
        player.addEventListener('ready', () => {
          this.state = 'ready'
        })
        player.addEventListener('ended', () => {
          this.$emit('ended')
        })
      }

      if (status === 401) {
        this.state = 'unauthenticated'
        this.store.commit('setLoginUrl', loginUrl)
      }

      if (status === 403) {
        this.state = 'unauthorized'
      }

      if (status === 500) {
        this.state = 'error'
      }
    }
  },
}
</script>
