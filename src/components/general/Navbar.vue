/* eslint-disable vue/valid-template-root */
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <section class="container-fluid">
      <router-link to="/" class="navbar-brand">Account Owner</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <section class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul v-if="!isLoggedIn" class="navbar-nav mr-5 pr-5">
            <li class="nav-item">
              <router-link :to="{name: 'Register'}" class="nav-link mr-3">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Login' }" class="btn btn-primary px-4">Login</router-link>
            </li>
          </ul>
          <ul class="navbar-nav" v-if="isLoggedIn">
            <li class="nav-item">
                  <router-link :to="{name: 'OwnersList'}" class="nav-link">Owners</router-link>
            </li>
            <li class="nav-item">
                  <a href= "javascript:void(0)" @click="logout()" class="nav-link">Logout</a>
            </li>
          </ul>
      </section>
    </section>
  </nav>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const storeName = 'authStore';
    const store = useStore();

    const logout = () => {
      store.dispatch(`${storeName}/logout`);
    }

    const isLoggedIn = computed(() => {
      console.log("working");
      return store.getters[`${storeName}/isAuthenticated`];
    });


    onMounted(() => {
      //isLoggedIn.value = store.getters[`${storeName}/isAuthenticated`];
    });

    return { isLoggedIn, logout, onMounted }
  }
}
</script>

<style></style>
