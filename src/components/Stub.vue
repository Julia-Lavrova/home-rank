<template>
  <article class="">
    <img src="" alt="preview">

    <h3>Название видео</h3>

    <button>like</button>
  </article>
</template>

<script>
export default {
  name: 'VideoItem',
  props: {
    poster: String,
    name: String,
    likeCount: String,
    preview: String,
  },
}
</script>

<style scoped>
  
</style>
