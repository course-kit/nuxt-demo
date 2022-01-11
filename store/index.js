import Vue from 'vue'

export const state = () => ({
  courses: [],
})

export const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
}

export const actions = {
  async init({ state, commit }, user) {
    const courses = await this.$content('courses').fetch()
    const lessons = await this.$content('lessons').sortBy('order', 'asc').fetch()
    const mappedCourses = courses.map((course) => {
      Vue.set(course, 'enrolled', user.isCourseEnrolled(course.id))
      Vue.set(
        course,
        'lessons',
        lessons
          .filter((lesson) => lesson.course === course.id)
          .map((lesson) => {
            lesson.complete = user.isLessonComplete(course.id, lesson.id)
            return lesson
          })
      )
      return course
    })
    commit('setCourses', mappedCourses)
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
    const course = state.courses.find((course) => course.id === courseId)
    return course.lessons.find((lesson) => lesson.id === lessonId)
  },
}
