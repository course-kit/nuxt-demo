<template>
  <nuxt-link
    class="bg-yellow-100 rounded-lg overflow-hidden"
    :to="path"
  >
    <div
      class="bg-cover bg-center h-60 p-4"
      :style="{ 'background-image': `url(${thumb})` }"
    >
      <slot name="overlay"></slot>
    </div>
    <div class="p-4 py-5">
      <h3
        class="
          text-yellow-900
          font-bold
          pb-1
          text-xl
          leading-6
          font-medium
          text-gray-900
        "
      >
        {{ title }}
      </h3>
      <p class="text-sm">{{ description }}</p>
      <slot name="buttons"></slot>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    thumb: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>
