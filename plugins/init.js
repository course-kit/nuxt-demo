import { UserLoader } from '@coursekit/client'

export default async function ({ store, app }, inject) {
  const opts = {}
  if (process.env.NODE_ENV === 'development') {
    opts.baseUrl = process.env.API_URL
  }
  const userLoader = new UserLoader(opts)
  const { loginUrl, user } = await userLoader.loadUser()
  store.commit('setLoginUrl', loginUrl)
  await store.dispatch('init', user)
  inject('user', user)
}
