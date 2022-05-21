<template>
  <div class="chat-box position-relative flex-column">
    <div class="chat-box__header">
      <ul class="d-flex flex-wrap align-items-center m-0 p-0">
        <li>Private</li>
        <li class="active">
          Streaming <span class="d-block font-weight-bold">2</span>
        </li>
        <li>Matching</li>
      </ul>
    </div>
    <chat-list :msgs="msgsData" :itsMe="itsMe"></chat-list>
    <chat-form @submitMessage="sendMessage"></chat-form>
  </div>
</template>

<script>
import ChatList from "@/components/ChatList";
import ChatForm from "@/components/ChatForm";
import TutorialDataService from "../services/TutorialDataService";

export default {
  components: {
    ChatList,
    ChatForm,
  },
  data() {

    this.firebaseService = new TutorialDataService(this.roomId);

    return {
      id: Number,
      name: String,
      myAvatar: "/img/avatar1.jpeg",
      itsMe: Number,
      date: Date(),
      msgsData: [],
      startDay: new Date('2022-01-01'),
    };
  },
  props: {
    roomId: Number,
  },
  methods: {
    sendMessage(msg) {
      var data = {
        from: {
          id: this.id,
          name: this.name,
          avatar: this.myAvatar
        },
        date: this.date,
        msg: msg
      };
      this.firebaseService.create(data)
        .then(() => {
          setTimeout(() => {
            var element = document.getElementById("chat-box__body");
            element.scrollTop = element.scrollHeight;
          }, 0);
        })
        .catch(e => {
          console.log(e);
      });
    },
    onDataChange(items) {
      let _msgs = [];
      items.forEach((item) => {
        let data = item.val();
        _msgs.push({
          from: {
            id: data.from.id,
            name: data.from.name,
            avatar: data.from.avatar
          },
          date: data.date,
          msg: data.msg
        });
      });
      setTimeout(() => {
        var element = document.getElementById("chat-box__body");
        element.scrollTop = element.scrollHeight;
      }, 0);

      this.msgsData = _msgs;
    },
  },
  watch: {
    user: function(user) {
      this.msgsData = { ...user };
    },
  },
  async mounted() {
    //call response to API
    this.firebaseService.getAll().on("value", this.onDataChange);

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
    this.id = this.itsMe = getCookie("idUser");
    this.name = getCookie("nameUser");

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

<style lang="scss" scoped>
.chat-box {
  width: 360px;
  background: #fff;
  border: 1px solid var(--bs-gray-300);
  font-size: 16px;
  margin: 0 auto;
  &__header {
    background: #ffffff;
    font-size: 16px;
    font-weight: 700;
    border-bottom: 1px solid var(--bs-gray-300);
    ul {
      list-style: none;
      li {
        color: var(--bs-gray-500);
        font-size: 16px;
        padding: 15px 0;
        margin: 0 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        &.active {
          color: var(--bs-blue);
          border-bottom: 2px solid rgba(59, 137, 253, 0.6);
        }
        span {
          width: 25px;
          height: 25px;
          line-height: 25px;
          border-radius: 50%;
          background: var(--bs-blue);
          color: #fff;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>