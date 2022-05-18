<template>
  <ChatBoxLogin />
</template>

<script>
// import ChatBox from "./components/ChatBox.vue";
import ChatBoxLogin from "./components/ChatBoxLogin.vue";

export default {
  name: "App",
  components: {
    // ChatBox,
    ChatBoxLogin
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
