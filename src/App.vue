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

  .w-30 {
    width: 30% !important;
  }

  .w-35 {
    width: 35% !important;
  }

  .w-40 {
    width: 40% !important;
  }
</style>
