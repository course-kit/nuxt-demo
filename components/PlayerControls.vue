<template>
  <div class="aspect-w-16 aspect-h-9 bg-cover bg-center thumb" :style="{ 'background-image': `url(${thumb})` }">
    <div class="absolute w-full h-full z-10 overlay">
      <div class="controls z-20 flex flex-col h-full justify-center">
        <div class="controls-content flex items-center flex-col z-10">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    thumb: {
      type: String,
      required: true,
    },
  },
}
</script>
<style>
.overlay::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: #000;
  opacity: 0.6;
  top: 0;
  left: 0;
}
</style>
