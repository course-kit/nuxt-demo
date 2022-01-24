<template>
  <div>
    <div v-if="state === 'loading'">Loading content...</div>
    <div v-else-if="state === 'ready'">
      <div v-html="content" />
    </div>
    <div v-else-if="state === 'unauthorized'">
      <span v-if="loading">Loading...</span>
      <span v-else>
        You'll need to
        <stripe-purchase-button
          class="underline cursor-pointer"
          :price-id="course.meta.stripePriceId"
          @loading="loading = true"
          >enroll</stripe-purchase-button
        >
        in this course to see this lesson.</span
      >
    </div>
    <div v-else-if="state === 'unauthenticated'" class="italic">
      You'll need to
      <span class="underline cursor-pointer" @click="$user.loginRedirect({ courseId: course.id })"
        >log in</span
      >
      or
      <stripe-purchase-button
        class="underline cursor-pointer"
        :price-id="course.meta.stripePriceId"
        @loading="loading = true"
        >enroll</stripe-purchase-button
      >
      to see this lessons.
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
