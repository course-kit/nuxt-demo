<template>
  <div class="max-w-video">
    <div id="responsiveVideoWrapper" class="aspect-w-16 aspect-h-9">
      <iframe
        class=""
        v-if=url
        v-show="iframeLoaded"
        :src="`http://localhost:8080/s/${school_id}/${lesson.video_id}/?redirect=${encodeURIComponent(url)}`"
        @load="iframeLoaded = true"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      ></iframe>
      <div v-if="!iframeLoaded" class="w-full h-full bg-gray-200">

      </div>
    </div>

    <nuxt-link v-if="nextLesson" :to="`/lesson/${nextLesson.id}`">Next lesson</nuxt-link>
    <nuxt-link v-else to="/">Back to courses</nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $content }) {
    const lessons = await $content('lessons').where({ id: parseInt(params.id) }).fetch()
    const nextLessons = await $content('lessons').where({ id: parseInt(params.id) + 1 }).fetch()
    const lesson = lessons[0]
    const nextLesson = nextLessons[0]
    return {
      lesson,
      nextLesson
    }
  },
  data: () => ({
    school_id: 1,
    url: null,
    iframeLoaded: false
  }),
  mounted () {
    this.url = window.location
  }
}
</script>
