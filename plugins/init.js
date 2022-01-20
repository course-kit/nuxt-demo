import { CourseKitClient } from '@coursekit/client'

export default async function ({ store, app }, inject) {
  const opts = {
    schoolId: process.env.SCHOOL_ID
  }
  const ck = new CourseKitClient(opts)
  inject('ck', ck)
  const { user } = await ck.loadUser()
  inject('user', user)
}
