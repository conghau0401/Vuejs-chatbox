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
    <chat-list :msgs="msgsData" :itsMe="this.user.itsMe" :roomId="roomId" ref="messages"></chat-list>
    <chat-form @submitMessage="sendMessage"></chat-form>
    <p class="icon-loading" v-if="loading"><img src="/img/loading.gif" alt="Loading"></p>
  </div>
</template>

<script>
import $ from "jquery"
import ChatList from "@/components/ChatList";
import ChatForm from "@/components/ChatForm";
import TutorialDataService from "../services/TutorialDataService";

export default {
  components: {
    ChatList,
    ChatForm,
  },
  props: {
    roomId: Number,
    user: Object,
  },
  data() {
    this.firebaseService = new TutorialDataService(this.roomId);
    return {
      date: Date(),
      msgsData: [],
      loading: false,
      currentHeight: Number
    };
  },
  unmounted () {
    let element = document.querySelector(".chat-box__body")
    element.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      let offsetTop = $(".chat-box__body").scrollTop();
      this.loading = false
      if (offsetTop <= 10) {
        this.loading = true
        this.firebaseService.getAll().limitToLast(20).on("value", this.onDataChange1);
      }
    },
    sendMessage(msg) {
      var data = {
        from: {
          id: this.user.id,
          name: this.user.name,
          avatar: this.user.avatar
        },
        date: this.date,
        status: 1,
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
    onDataChange1(items) {
      setTimeout(() => {
        let _msgs = [];
        items.forEach((item) => {
          let data = item.val();
          _msgs.push({
            from: {
              key: item.key,
              id: data.from.id,
              name: data.from.name,
              avatar: data.from.avatar
            },
            status: data.status,
            date: data.date,
            msg: data.msg
          });
        });
        this.loading = false
        this.msgsData = _msgs;
        var element = document.getElementById("chat-box__body");
        element.scrollTop = element.scrollHeight - (this.currentHeight + element.offsetHeight)
      }, 2000);
    },
    onDataChange(items) {
      let _msgs = [];
      items.forEach((item) => {
        let data = item.val();
        _msgs.push({
          from: {
            key: item.key,
            id: data.from.id,
            name: data.from.name,
            avatar: data.from.avatar
          },
          status: data.status,
          date: data.date,
          msg: data.msg
        });
      });
      setTimeout(() => {
        var element = document.getElementById("chat-box__body");
        element.scrollTop = element.scrollHeight;
        this.currentHeight = element.scrollHeight;
      }, 0);

      this.msgsData = _msgs;
    },
  },
  mounted() {
    //call response to API
    this.firebaseService.getAll().limitToLast(10).on("value", this.onDataChange);
    
    //scroll top
    setTimeout(() => {
      let element = document.querySelector(".chat-box__body")
      element.addEventListener('scroll', this.handleScroll);
    }, 2000);
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
  position: relative;
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
  .icon-loading {
    width: 100%;
    position: absolute;
    top: 25px;
    left: 0;
    margin: 0;
    img {
      width: 165px;
    }
  }
}
</style>