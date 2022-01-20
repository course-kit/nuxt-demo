<template>
  <div class="rounded-md p-4 mb-8" :class="{ 'bg-green-100' : type === 'success', 'bg-red-100' : type === 'error' }">
    <div class="flex">
      <div class="ml-3">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success'
    }
  }
}
</script>
