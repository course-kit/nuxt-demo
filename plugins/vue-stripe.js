import Vue from 'vue'
import { StripePlugin, StripeCheckout } from '@vue-stripe/vue-stripe'

export default () => {
  Vue.component('StripeCheckout', StripeCheckout)
  if (process.env.STRIPE_PUBLIC_KEY) {
    Vue.use(StripePlugin, { pk: process.env.STRIPE_PUBLIC_KEY })
  }
}
