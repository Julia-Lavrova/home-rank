<template>
  <article class="video">
    <div class="preview">
      <img
        v-bind:src="poster"
        v-bind:alt="title"
        class="preview__image preview__image_poster"
      >

      <img
        v-bind:src="preview"
        v-bind:alt="title"
        class="preview__image preview__image_gif"
      >
    </div>

    <div class="info">
      <h3 class="info__title">{{ title }}</h3>

      <time class="info__duration">{{ duration }}</time>
      <button v-on:click="like = !like" class="info__like-button">
        {{ like ? 'unlike' : 'like'}}
      </button>
    </div>
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
  data() {
    return ({
      like: false,
    })
  }
}
</script>

<style scoped>
.video {
  display: flex;
}

.preview {
  position: relative;
  flex: 0 0 auto;
  width: 250px;
  padding-bottom: 25.25%;
}

.preview__image {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}

.preview__image_poster {
  opacity: 1;
  transition: opacity 0.25s ease-out;
}

.preview__image_gif {
  opacity: 0;
  transition: opacity 0.25s ease-out;
}

.preview:hover .preview__image_poster {
  opacity: 0;
}

.preview:hover .preview__image_gif {
  opacity: 1;
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
  margin: 0;
  text-align: start;
}
.info__duration {
  grid-area: duration;
  justify-self: start;
  align-self: end;
}
.info__like-button {
  grid-area: like-button;
  justify-self: end;
  align-self: end;
}
</style>
