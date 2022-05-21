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
        id: Number,
        name: String,
        avatar: "/img/avatar1.jpeg",
        itsMe: Number,
      },
      slug: "1"
    }
  },
  async mounted() {
    //set idUser cookie
    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    //get idUser cookie
    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    //check isset idUser
    if (document.cookie.indexOf('idUser') == -1 ) {
      setCookie("idUser", Math.floor(Math.random() * 90000) + 10000, 365);
      setCookie("nameUser", createNameUser(5), 365);
    }

    //assign id
    this.user.id = getCookie("idUser");
    this.user.itsMe = getCookie("idUser");
    this.user.name = getCookie("nameUser");

    //Create User name
    function createNameUser(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
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
