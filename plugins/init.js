import { UserLoader } from '../coursekit-client/index'
const userLoader = new UserLoader()

export default async function ({ store }, inject) {
  const { loginUrl, user } = await userLoader.createUser()
  store.commit('setLoginUrl', loginUrl)
  inject('user', user)
  await store.dispatch('init', user)
}
