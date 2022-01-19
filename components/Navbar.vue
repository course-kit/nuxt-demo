<template>
  <nav class="border-b-2 border-yellow-600 fixed z-50 w-full bg-yellow-50">
    <div class="container mx-auto">
      <div class="px-6 sm:px-12">
        <div class="flex justify-between py-4">
          <div class="flex space-x-8">
            <nuxt-link to="/" class="flex items-center">
              <!--<img src="logo.png" alt="Logo" class="h-8 w-8 mr-2 bg-gray-50" />-->
              <span class="font-bold text-gray-500 py-2">CourseKit Demo</span>
            </nuxt-link>
            <div class="hidden md:flex space-x-7 text-yellow-600 font-bold">
              <nuxt-link
                v-for="link in links"
                :key="link.to"
                :to="link.to"
                class="py-2"
                :class="link.active ? 'text-yellow-900' : ''">
                {{ link.text }}
              </nuxt-link>
            </div>
          </div>
          <div>
            <button
              v-if="$user.isAuthenticated()"
              class="text-white bg-blue-400 btn-sm"
              @click="$user.logoutRedirect()">
              Log out
            </button>
            <a
              v-else
              class="bg-transparent border-blue-500 border-2 text-blue-500 btn-sm"
              @click="$user.loginRedirect()">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    links() {
      return [].map((link) => {
        link.active = this.$route.path === link.to
        return link
      })
    },
  },
}
</script>
