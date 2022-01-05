<template>
  <div class="aspect-w-16 aspect-h-9">
    <div v-show="state === 'ready'" id="video" />
    <PlayerLoading v-if="state === 'loading'" />
    <PlayerControls v-else-if="state !== 'ready'" :thumb="lesson.thumb">
      <div>
        <div v-if="state === 'error'" class="text-center">
          <p class="font-bold text-white text-xl">Network error.</p>
          <p class="text-white text-lg">Please reload to view this video.</p>
        </div>
        <div v-else class="text-center">
          <p class="font-bold text-white text-lg">
            Please enroll in
            <a class="underline" :href="course.enrollUrl">{{ course.title }}</a>
            to see this video.
          </p>
        </div>
      </div>
      <div class="mt-4 flex gap-4">
        <a
          :href="course.enrollUrl"
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
          >Enroll</a
        >
        <a
          v-if="state === 'unauthenticated'"
          :href="$store.state.loginUrl"
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
    </PlayerControls>
  </div>
</template>
<script>
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
    state: {
      type: String,
      required: true
    }
  },
  mounted () {
    // const player = createPlayer()
    // player.addEventListener('ready', () => {
    //   this.$emit('ready')
    // })
    // player.addEventListener('ended', () => {
    //   this.$emit('ended')
    // })
  }
}
</script>
