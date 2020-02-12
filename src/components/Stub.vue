<template>
  <article class="video">
    <div class="img" />

    <div>
      <div class="duration" />
      <div class="title" />

      <div class="like-button" />
    </div>
  </article>
</template>

<script>
export default {
  name: "Stub",
  props: {
    poster: String,
    name: String,
    likeCount: String,
    preview: String
  }
};
</script>

<style scoped>
.video {
  display: flex;
}

.img {
  width: 266px;
  height: 150px;
  background-color: #eee;
}

.title {
  width: 100px;
  height: 5px;
  background-color: #eee;
}

.duration {
  width: 30px;
  height: 5px;
  background-color: #eee;
}

.like-button {
  width: 50px;
  height: 30px;
  background-color: #eee;
}
</style>
