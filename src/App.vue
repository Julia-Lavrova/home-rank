<template>
  <div id="app">
    <header>
      <Logo />
    </header>

    <VideoFeed />
  </div>
</template>

<script>
import VideoFeed from "./components/VideoFeed.vue";
import Logo from "./components/icons/Logo.vue";

export default {
  name: "App",
  components: {
    VideoFeed,
    Logo
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  padding: 30px;
}
</style>
