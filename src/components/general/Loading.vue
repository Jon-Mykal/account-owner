<template>
    <div>
        <section id="overlay" :style="{ 'display': isLoading ? 'flex': 'none'}">
            <!-- <section id="loader"></section> -->
            <ProgressSpinner style="margin: auto auto;" />
        </section>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            required: true
        }
    },
    name: 'Loading',
    setup (props) {
        
        return {}
    }
}
</script>

<style scoped>
#overlay {
 position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.781); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}

#loader {
  border: .5em solid #f3f3f3; /* Light grey */
  border-top: .5em solid #3498db; /* Blue */
  border-radius: 50%;
  width: 3em;
  height: 3em;
  margin: auto auto;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>