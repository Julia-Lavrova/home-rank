<template>
  <div>
    <ul class="videoList" v-if="!loading">
      <li v-for="video in videos" v-bind:key="video.id">
        <VideoItem
          :title="video.title"
          :duration="video.duration"
          :poster="video.main_poster"
          :preview="video.gif_preview"
        />
      </li>
    </ul>

    <ul class="videoList" v-if="loading">
      <li v-for="item in 6" v-bind:key="item">
        <Stub />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

import VideoItem from "./VideoItem.vue";
import Stub from "./Stub";

export default {
  name: "VideoFeed",
  components: {
    VideoItem,
    Stub
  },
  data() {
    return {
      videos: [],
      error: null,
      loading: true
    };
  },
  mounted() {
    this.loadVideos();
  },
  methods: {
    async loadVideos() {
      this.loading = true;

      try {
        const { data } = await axios.get(
          "https://fwfg.com/api/contents?category_id=23751"
        );

        this.videos = data.sort((a, b) => b.position - a.position);
        this.loading = false;
      } catch (err) {
        window.alert(err);
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.videoList {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;
  list-style: none;
}
</style>
