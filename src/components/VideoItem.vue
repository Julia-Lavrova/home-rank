<template>
  <article class="">
    <img v-bind:src="poster" alt="preview">
    
    <time>{{ duration }}</time>
    <h3>{{ title }}</h3>

    <button>like</button>
  </article>
</template>

<script>
export default {
  name: 'VideoItem',
  props: {
    poster: String,
    title: String,
    likeCount: String,
    preview: String,
    duration: String,
  },
}
</script>

<style scoped>
  
</style>
