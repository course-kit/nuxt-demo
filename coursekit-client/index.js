// https://github.com/apivideo/api.video-player-sdk/blob/master/index.ts

import { PlayerSdk } from '@api.video/player-sdk'

class VideoLoader {

  courseId
  lessonId

  constructor(courseId, lessonId) {
    this.courseId = courseId
    this.lessonId = lessonId
  }

  async createPlayer(targetSelector, playerOptions = {}) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/${this.courseId}/${this.lessonId}`,
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

class Client {

}

export { Client, VideoLoader }
