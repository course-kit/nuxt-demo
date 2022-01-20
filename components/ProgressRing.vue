<template>
  <div
    class="relative flex justify-center content-center"
    :style="{ height: `${size * 2 + 10}px`, width: `${size * 2 + 10}px` }">
    <svg>
      <circle :cx="size" :cy="size" :r="size" class="stroke-current text-gray-600"></circle>
      <circle
        :cx="size"
        :cy="size"
        :r="size"
        class="stroke-current text-yellow-400"
        :style="{
          'stroke-dashoffset': `calc(410 - (410 * ${percentage}) / 100)`,
        }"></circle>
    </svg>
    <div class="absolute center flex flex-col justify-center content-center">
      <h2 class="text-yellow-900 text-2xl font-bold text-center">
        {{ percentage }}
        <span class="text-lg">%</span>
      </h2>
      <span class="text-yellow-900 text-sm">progress</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 50,
    },
    size: {
      type: Number,
      default: 65,
    },
  },
}
</script>
<style>
.center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

circle {
  fill: none;
  stroke-width: 10;
  transform: translate(5px, 5px);
  stroke-dasharray: 410;
  stroke-linecap: butt;
}
</style>
