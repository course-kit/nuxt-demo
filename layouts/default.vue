<template>
  <div class="h-full w-full">
    <Navbar />
    <div class="container mx-auto">
      <div class="px-12 py-12">
        <Nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";
export default {
  components: {Footer, Navbar },
  mounted() {
    document.body.classList.add('bg-yellow-50')
  },
}
</script>
