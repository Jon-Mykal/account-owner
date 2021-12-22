<template>
  <Navbar />
  <section class="container">
    <router-view />
  </section>
  <!-- <section class="gsap-box"></section>
  <section class="animejs-box"></section>

  <button class="btn btn-primary" @click="initGSAP()">GSAP</button>
  <button class="btn btn-primary" @click="initAnimeJS()">AnimeJS</button> -->
</template>

<script>
import Navbar from "@/components/general/Navbar.vue";
import { gsap } from "gsap";
import anime from "animejs/lib/anime.es.js";
export default {
  components: {
    Navbar,
  },
  setup() {
    const throwError = () => {
      throw new Error("Sentry Error");
    };

    const initGSAP = () => {
      gsap.to(".gsap-box", {
        duration: 1,
        opacity: 1,
        scale: 0.5,
        translateX: 100
      });
    };

    const initAnimeJS = () => {
      anime({
        targets: ".animejs-box",
        translateX: 250,
        rotate: "1turn",
        duration: 2000,
      });
    };

    return { throwError, initGSAP, initAnimeJS };
  },
};
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

.gsap-box,
.animejs-box {
  height: 100px;
  width: 100px;
}

.gsap-box {
  background-color: blue;
  opacity: 0;
}

.animejs-box {
  background-color: chartreuse;
}
</style>
