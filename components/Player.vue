<template>
  <div id="responsiveVideoWrapper" class="aspect-w-16 aspect-h-9">
    <div v-show="state === 'ready'" id="video" />
    <PlayerControls v-if="state === 'unauthorized'" :thumb="lesson.thumb">
      <p class="font-bold text-white">
        You'll need to enrol in this course to see this video.
      </p>
      <div class="mt-2">
        <a
          :href="course.enrolUrl"
          class="
            bg-blue-500
            hover:bg-blue-600
            border-blue-500 border-2
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
          >Enrol</a
        >
      </div>
    </PlayerControls>
    <PlayerControls
      v-else-if="state === 'unauthenticated'"
      :thumb="lesson.thumb"
    >
      <p class="font-bold text-white">
        You'll need to enrol in this course to see this video.
      </p>
      <div class="mt-2">
        <a
          :href="course.enrolUrl"
          class="
            bg-blue-500
            hover:bg-blue-600
            border-blue-500 border-2
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
          >Enrol</a
        >
        <a
          :href="loginUrl"
          class="
            bg-transparent
            border-blue-500 border-2
            hover:bg-blue-600
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
          >Log in</a
        >
      </div>
    </PlayerControls>
    <PlayerLoading v-else-if="state === 'loading'" />
  </div>
</template>
<script>
import { VideoLoader } from '../coursekit-client'
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
    loginUrl: null,
  }),
  async created() {
    if (process.client) {
      const loader = new VideoLoader(this.course.id, this.lesson.id)

      const { status, loginUrl, player } = await loader.createPlayer('#video')

      if (status === 200) {
        player.addEventListener('ready', () => {
          this.state = 'ready'
        })
      }

      if (status === 401) {
        this.state = 'unauthenticated'
        this.loginUrl = loginUrl
      }

      if (status === 403) {
        this.state = 'unauthorized'
      }
    }
  },
}
</script>
