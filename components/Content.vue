<template>
  <div>
    <div v-if="state === 'loading'">Loading content...</div>
    <div v-else-if="state === 'ready'" v-html="content" />
    <div v-else-if="state === 'unauthorized'">
      You'll need to enroll in this course to see this lesson.
    </div>
    <div v-else-if="state === 'unauthenticated'" class="italic">
      You'll need to
      <span class="underline cursor-pointer" @click="$user.loginRedirect({ courseId: course.id })">
        log in
      </span>
      or
      <a class="underline" :href="course.enrollUrl">enroll</a>
      to see this content.
    </div>
    <div v-else>Sorry, there's been an error.</div>
  </div>
</template>
<script>
export default {
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
    content: {
      type: String,
      default: '',
    },
  },
}
</script>
