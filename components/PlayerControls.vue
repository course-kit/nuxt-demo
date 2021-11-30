<template>
  <figure class="thumb">
    <img :src="thumb" alt="" />
    <div class="overlay">
      <div class="controls">
        <div class="controls-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </figure>
</template>
<script>
export default {
  props: {
    thumb: {
      type: String,
      required: true
    }
  }
}
</script>
<style>
  .thumb {
    padding-top: 56.25%;
    position: relative;
    display: block
  }

  .thumb > img {
    height: 100%;
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    filter: blur(1px);
  }

  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
  }
  .overlay::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: #000;
    opacity: 0.6;
    top: 0;
    left: 0;
  }
  .controls {
    z-index: 11;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%
  }
  .controls-content {
    z-index: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
