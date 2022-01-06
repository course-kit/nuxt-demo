<template>
  <div>
    <template lang="md">
      {{ content }}
    </template>
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
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
}
</script>
