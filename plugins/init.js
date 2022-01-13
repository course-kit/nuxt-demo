import { User } from '@coursekit/client'

export default async function ({ store, app }, inject) {
  const opts = {}
  if (process.env.NODE_ENV === 'development') {
    opts.baseUrl = process.env.API_URL
  }
  const { user } = await new User(opts).load()
  await store.dispatch('init', user)
  inject('user', user)
}
