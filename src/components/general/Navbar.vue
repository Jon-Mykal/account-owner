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
      <section class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
              <li class="nav-item">
                  <router-link to="/" class="nav-link">Account</router-link>
            </li>
          </ul>
      </section>
    </section>
  </nav>
</template>

<script>
export default {
  setup() {}
}
</script>

<style></style>
