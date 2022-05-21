<template>
  <ChatBox :user="user" :room-id="slug" />
</template>

<script>
import ChatBox from "./components/ChatBox.vue";

export default {
  name: "App",
  components: {
    ChatBox
  },
  data() {
    return {
      user: {
        id: 10,
        name: "Cong Hau",
        avatar_url: "https://fdsfds.com/fdf.png"
      },
      slug: "1"
    }
  }
};
</script>

<style>
  #app {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--bs-gray-700);
    margin-top: 60px;
  }
</style>
