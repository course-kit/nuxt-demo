// https://github.com/apivideo/api.video-player-sdk/blob/master/index.ts

import { PlayerSdk } from '@api.video/player-sdk'

const baseUrl = 'https://api.coursekit.dev'

class VideoLoader {

  courseId
  lessonId
  baseUrl

  constructor(courseId, lessonId, opts = {}) {
    this.courseId = courseId
    this.lessonId = lessonId
    this.baseUrl = opts.baseUrl || baseUrl
  }

  async createPlayer(targetSelector, playerOptions = {}) {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.courseId}/${this.lessonId}`,
        {
          method: 'POST',
          credentials: 'include'
        }
      )
      if (response.status === 200) {
        const { id, token } = await response.json()
        playerOptions.id = id
        playerOptions.token = token
        return { status: response.status, player: new PlayerSdk(targetSelector, playerOptions) }
      }
      if (response.status === 401) {
        const { loginUrl } = await response.json()
        return { status: response.status, loginUrl }
      }
      return { status: response.status }
    } catch (err) {
      console.log(err)
    }

  }
}

const userUnauthenticated = {
  isAuthenticated() {
    return false
  },
  getName() {
    return null
  },
  getAccountUrl() {
    return null
  },
  async markComplete(courseId, lessonId) {
    await false
  },
  async markIncomplete(courseId, lessonId) {
    await false
  },
  isLessonComplete(courseId, lessonId) {
    return false
  },
  isCourseEnrolled(courseId) {
    return false
  },
  getNextLessonId(courseId) {
    return null
  },
  getProgress(courseId) {
    return null
  }
}

const userAuthenticated = {
  isAuthenticated() {
    return true
  },
  getName() {
    return 'Kilgore Trout'
  },
  getAccountUrl() {
    return 'https://test.com'
  },
  async markComplete(courseId, lessonId) {
    await true
  },
  async markIncomplete(courseId, lessonId) {
    await true
  },
  isLessonComplete(courseId, lessonId) {
    return lessonId === '1'
  },
  isCourseEnrolled(courseId) {
    return courseId === '1'
  },
  getNextLessonId(courseId) {
    return '2'
  },
  getProgress(courseId) {
    return 0.25
  }
}

class UserLoader {
  async createUser () {
    const status = 200
    const loginUrl = 'https://test.com'
    // const user = userAuthenticated
    const user = userUnauthenticated
    await true
    return { status, loginUrl, user }
  }
}

export { UserLoader, VideoLoader }
