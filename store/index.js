import Vue from 'vue'
import { courses } from '../coursekit.config.json'

export const state = () => ({
  courses: [],
})

export const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
}

export const actions = {
  init({ state, commit }, user) {
    commit(
      'setCourses',
      courses.map((course) => {
        Vue.set(course, 'enrolled', user.isCourseEnrolled(course.id))
        course.lessons = course.lessons.map((lesson) => {
          Vue.set(lesson, 'complete', user.isLessonComplete(course.id, lesson.id))
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
    const course = state.courses.find((course) => course.id === courseId)
    return course.lessons.find((lesson) => lesson.id === lessonId)
  },
}
