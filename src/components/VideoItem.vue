<template>
  <article class="video">
    <div class="preview">
      <img
        v-if="Boolean(poster)"
        :src="poster"
        :alt="title"
        class="preview__image preview__image_poster"
        @mouseenter="showPreview = true"
      />

      <img
        v-if="showPreview && Boolean(preview)"
        :src="preview"
        :alt="title"
        class="preview__image preview__image_gif"
        @mouseleave="showPreview = false"
      />
    </div>

    <div class="info">
      <h3 class="info__title">{{ title }}</h3>

      <time class="info__duration">{{ duration }}</time>

      <button
        @click="handleResetVotesClick"
        :disabled="votes === 0"
        class="info__reset-button"
      >
        reset votes
      </button>

      <button
        @click="handleVoteClick"
        :disabled="!canVote"
        class="info__like-button"
      >
        {{ `votes ${votes || ''}` }}
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'VideoItem',
  props: {
    id: Number,
    poster: String,
    title: String,
    preview: String,
    duration: String,
    votes: Number,
    canVote: Boolean,
    onVoteClick: Function,
    onResetVotesClick: Function,
  },
  data() {
    return {
      showPreview: false,
    };
  },
  methods: {
    handleResetVotesClick() {
      this.onResetVotesClick(this.id);
    },
    handleVoteClick() {
      this.onVoteClick(this.id);
    },
  },
};
</script>

<style scoped>
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.video {
  width: 250px;
}

.preview {
  position: relative;
  width: 250px;
  padding-bottom: 57.25%;
  background-color: #75796f;
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
  z-index: 1;
  animation: show 0.5s ease;
}

.preview:hover .preview__image_poster {
  opacity: 0;
}

.info {
  display: grid;
  grid-template-rows: 50% 25% 25%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "title title title"
    ". . ."
    "duration reset-button like-button";
  min-height: 100px;
  padding: 10px;
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

.info__reset-button {
  grid-area: reset-button;
  justify-self: center;
  align-self: end;
}

@media (min-width: 1220px) {
  .video {
    display: flex;
    width: auto;
  }

  .preview {
    flex: 0 0 auto;
    padding-bottom: 25.25%;
  }

  .info {
    width: 100%;
    padding: 0 20px 20px;
  }
}
</style>
