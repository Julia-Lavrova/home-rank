<template>
  <div>
    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="!loading && !error" class="votes">
      <p class="votes_info">
        Availible votes: {{ 50 - totalVotes }}
      </p>

      <button
        class="votes_reset-button"
        @click="handleResetClick"
      >
        reset all
      </button>

      <button
        class="votes_filter-button"
        @click="handleFilterClick"
      >
        filter by votes
      </button>
    </div>

    <ul class="video-list" v-if="!loading">
      <li v-for="video in videos" v-bind:key="video.id" class="video-list__item">
        <VideoItem
          :id="video.id"
          :title="video.title"
          :duration="video.duration"
          :poster="video.main_poster_hybrid"
          :preview="video.gif_preview"
          :canVote="totalVotes < 50"
          :votes="votes[video.id] || 0"
          :onVoteClick="handleVoteClick"
          :onResetVotesClick="handleResetVotesClick"
        />
      </li>
    </ul>

    <ul class="video-list" v-if="loading">
      <li v-for="item in 6" v-bind:key="item" class="video-list__item">
        <Stub />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

import VideoItem from './VideoItem.vue';
import Stub from './Stub.vue';

export default {
  name: 'VideoFeed',
  components: {
    VideoItem,
    Stub,
  },
  data() {
    return {
      videos: [],
      error: null,
      loading: true,
      votes: {},
    };
  },
  mounted() {
    this.loadVideos();
    this.checkSession();
  },
  computed: {
    totalVotes() {
      return Object.keys(this.votes).reduce((acc, item) => {
        const result = acc + this.votes[item];

        return result;
      }, 0);
    },
  },
  methods: {
    async loadVideos() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(
          'https://fwfg.com/api/contents?category_id=23751',
        );

        if (response && response.data) {
          this.sortList(response.data);
        }

        this.loading = false;
      } catch (err) {
        this.error = err;
        this.loading = false;
      }
    },
    sortList(list) {
      this.videos = list.sort((a, b) => {
        const aVotes = this.votes[a.id] || 0;
        const bVotes = this.votes[b.id] || 0;

        return (bVotes - aVotes || b.position - a.position);
      });
    },
    checkSession() {
      const lastSessionDay = new Date(window.localStorage.getItem('lastSessionDay'));

      if (!lastSessionDay || (lastSessionDay < new Date() && lastSessionDay.getDate() !== new Date().getDate())) {
        window.localStorage.setItem('lastSessionDay', new Date());
        window.localStorage.setItem(
          'votes',
          JSON.stringify({}),
        );

        return;
      }

      this.votes = JSON.parse(window.localStorage.getItem('votes'));
    },
    handleVoteClick(id) {
      if (this.totalVotes === 50) {
        window.alert('Too many votes');

        return;
      }

      if (!this.votes[id]) {
        this.votes = { ...this.votes, [id]: 1 };
      } else {
        this.votes = { ...this.votes, [id]: this.votes[id] + 1 };
      }

      this.updateVotes();
    },
    handleResetVotesClick(id) {
      this.votes = { ...this.votes, [id]: 0 };
      this.updateVotes();
    },
    handleResetClick() {
      this.votes = {};

      this.updateVotes();
    },
    updateVotes() {
      window.localStorage.setItem('votes', JSON.stringify(this.votes));
    },
    handleFilterClick() {
      this.sortList(this.videos);
    },
  },
};
</script>

<style scoped>
.votes {
  margin-bottom: 20px;
}

.votes_info {
  font-size: 25px;
}

.votes_reset-button {
  height: fit-content;
}

.votes_filter-button {
  margin-left: 10px;
}

.video-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 50px 20px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.video-list__item {
  justify-self: center;
}

@media (min-width: 660px) {
  .votes {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .votes_info {
    margin-right: 20px;
  }

  .video-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1220px) {
  .video-list {
    grid-template-columns: 1fr 1fr;
    max-width: 1200px;
    margin: 0 auto;
  }

  .video-list__item {
    width: 550px;
  }
}
</style>
