<template>
  <article class="video">
    <div class="video__image" />

    <div class="info">
      <div class="info__duration" />
      <div class="info__title" />

      <div class="info__like-button" />
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
  width: 250px;
}

.video__image {
  flex: 0 0 auto;
  width: 250px;
  padding-bottom: 25.25%;
  background-color: #6a725d;
}

.info {
  display: grid;
  grid-template-rows: 50% 25% 25%;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "title title"
    ". ."
    "duration like-button";
  width: 100%;
  padding: 0 20px 20px; 
}

.info__title {
  grid-area: title;
  justify-self: start;
  align-self: start;
  width: 80%;
  height: 25px;
  background-color: #6a725d;
}

.info__duration {
  grid-area: duration;
  justify-self: start;
  align-self: end;
  width: 60px;
  height: 25px;
  background-color: #6a725d;
}

.info__like-button {
  grid-area: like-button;
  justify-self: end;
  align-self: end;
  width: 50px;
  height: 20px;
  background-color: #6a725d;
}

@media (min-width: 1220px) {
  .video {
    display: flex;
  }
}
</style>
