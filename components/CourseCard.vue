<template>
  <nuxt-link class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6" :to="`/course/${course.id}`">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      {{ course.title }}
    </h3>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    course: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
