<template>
  <ChatBox />
</template>

<script>
import ChatBox from "./components/ChatBox.vue";

export default {
  name: "App",
  components: {
    ChatBox,
  },
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
