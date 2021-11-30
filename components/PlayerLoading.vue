<template>
  <div class="w-full h-full bg-yellow-100 flex items-center justify-center">
    <FadeLoader height="30px" width="10px" radius="40px" color="#b45309" />
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
  transform: translate(-7px, -17px);
}
</style>
