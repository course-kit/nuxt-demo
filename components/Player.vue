<template>
  <div class="aspect-w-16 aspect-h-9">
    <slot v-show="state === 'ready'" />
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
        <a :href="course.enrollUrl" class="btn-sm bg-blue-500 border-blue-500 border-2 text-white">
          Enroll
        </a>
        <button
          v-if="state === 'unauthenticated'"
          class="btn-sm bg-transparent border-blue-500 border-2 text-white"
          @click="$user.login({ courseId: course.id })">
          Log in
        </button>
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
      required: true,
    },
  },
}
</script>
