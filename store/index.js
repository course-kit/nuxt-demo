export const state = () => ({
  loginUrl: null,
  courses: [],
})

export const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
  setLoginUrl(state, loginUrl) {
    state.loginUrl = loginUrl
  },
}

export const actions = {
  async init({ state, commit }, user) {
    const courses = await this.$content('courses').fetch()
    const lessons = await this.$content('lessons')
      .sortBy('order', 'asc')
      .fetch()
    commit(
      'setCourses',
      courses.map((course) => {
        course.enrolled = user.isCourseEnrolled(course.id)
        course.lessons = lessons
          .filter((lesson) => lesson.course === course.id)
          .map((lesson) => {
            lesson.complete = user.isLessonComplete(course.id, lesson.id)
            return lesson
          })
        return course
      })
    )
  },
}

export const getters = {
  getCourses: (state) => () => {
    return state.courses
  },
  getCourse: (state) => (courseId) => {
    return state.courses.find((course) => course.id === courseId)
  },
  getLesson: (state) => (courseId, lessonId) => {
    return state.courses
      .find((course) => course.id === courseId)
      .lessons.find((lesson) => lesson.id === lessonId)
  },
}
