<template>
  <div class="w-full h-full bg-yellow-100 flex items-center justify-center">
    <FadeLoader height="20px" width="7px" radius="30px" color="#b45309" />
  </div>
</template>
<script>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
export default {
  components: {
    FadeLoader,
  },
}
</script>
<style>
.v-spinner {
  transform: translate(-6px, -13px);
}
</style>
