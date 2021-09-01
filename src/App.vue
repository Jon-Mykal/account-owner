<template>
  <Navbar />
  <section class="container">
    <router-view/>
  </section>
  
</template>

<script>
import Navbar from '@/components/general/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>
<style>
  .w-25 {
    width: 25% !important;
  }
</style>
