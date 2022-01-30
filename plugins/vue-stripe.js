import Vue from 'vue'
import { StripePlugin, StripeCheckout } from '@vue-stripe/vue-stripe'

export default () => {
  Vue.component('StripeCheckout', StripeCheckout)
  if (process.env.STRIPE_PUBLISHABLE_KEY) {
    Vue.use(StripePlugin, {
      testMode: process.NODE_ENV === 'development',
      pk: process.env.STRIPE_PUBLISHABLE_KEY,
    })
  }
}
