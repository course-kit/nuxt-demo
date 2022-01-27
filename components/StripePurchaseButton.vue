<template>
  <span>
    <stripe-checkout
      v-if="pk"
      ref="checkoutRef"
      class="inline-block"
      mode="payment"
      :pk="pk"
      :line-items="[{ price: priceId, quantity: 1 }]"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="$emit('loading')" />
    <span @click="enroll">
      <slot />
    </span>
  </span>
</template>
<script>
export default {
  props: {
    courseId: {
      type: String,
      required: true,
    },
    priceId: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: 'Enroll now',
    },
  },
  data: () => ({
    successURL: process.client
      ? `${window.location.origin}/courses/${this.courseId}?sale=true`
      : null,
    cancelURL: process.client
      ? `${window.location.origin}/courses/${this.courseId}?error=true`
      : null,
    pk: process.env.STRIPE_PUBLIC_KEY,
    loading: false,
  }),
  methods: {
    enroll() {
      if (this.pk) {
        this.$refs.checkoutRef.redirectToCheckout()
      } else {
        console.warn('Missing STRIPE_PUBLIC_KEY env variable.')
      }
    },
  },
}
</script>
