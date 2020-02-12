<template>
  <ul class="">
    <li v-for="video in videos" v-bind:key="video.id">
      <VideoItem
        v-title="video.title"
        v-duration="video.duration"
        v-poster="video.main_poster"
        v-preview="video.preview" 
      />
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

import VideoItem from './VideoItem.vue';

export default {
  name: 'VideoFeed',
  components: {
    VideoItem,
  },
  data() {
    return ({
      videos: [],
      error: null,
      loading: true,
    })
  },
  mounted() {
    this.loadVideos();
  },
  methods: {
    loadVideos: function() {
      this.loading = true;

      axios
        .get('https://fwfg.com/api/contents?category_id=23751')
        .then(response => {
          console.log(response.data);
          this.videos = response.data;
          this.loading = false;
        })
        .catch(err => {
          window.alert(err);
          this.loading = false;
        });
    }
  }
}
</script>

<style scoped>
  
</style>
