<template>
  <nav class="border-b-2 border-yellow-600">
    <div class="container mx-auto">
      <div class="px-12">
        <div class="flex space-x-8 py-4">
          <nuxt-link to="/" class="flex items-center">
<!--            <img src="logo.png" alt="Logo" class="h-8 w-8 mr-2 bg-gray-50" />-->
            <span class="font-bold text-gray-500">MyCourses</span>
          </nuxt-link>
          <div class="hidden md:flex space-x-7 text-yellow-600 font-bold">
            <nuxt-link v-for="link in links" :key="link.to" :to="link.to" class="py-2" :class="link.active ? 'text-yellow-900' : ''">
              {{ link.text }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    links () {
      return [
        { text: 'Courses', to: '/' },
        { text: 'About', to: '/about' }
      ].map(link => {
        link.active = this.$route.path === link.to
        return link
      })
    }
  }
}
</script>
