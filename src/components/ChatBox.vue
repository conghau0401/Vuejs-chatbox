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
    <chat-list :msgs="msgData"></chat-list>
    <chat-form @submitMessage="sendMessage"></chat-form>
  </div>
</template>

<script>
import ChatList from "@/components/ChatList";
import ChatForm from "@/components/ChatForm";
export default {
  components: {
    ChatList,
    ChatForm,
  },
  data() {
    return {
      myAvatar: "/img/avatar1.jpeg",
      msgData: [
        {
          from: {
            id: 1,
            name: "John",
            avatar: "/img/avatar2.jpeg",
          },
          msg: "Hi, How are you!",
        },
        {
          from: {
            id: 0,
            name: "me",
            avatar: "/img/avatar1.jpeg",
          },
          msg: "Welcome!!",
        },
        {
          from: {
            id: 2,
            name: "Marry",
            avatar: "/img/avatar3.jpeg",
          },
          msg: "Nice to meet u!",
        },
        {
          from: {
            id: 2,
            name: "Marry",
            avatar: "/img/avatar3.jpeg",
          },
          msg: "Nice to meet u!",
        },
      ],
    };
  },
  methods: {
    sendMessage(msg) {
      this.msgData.push({
        from: {
          id: 0,
          name: "me",
          avatar: this.myAvatar,
        },
        msg,
      });
      setTimeout(() => {
        var element = document.getElementById("chat-box__body");
        element.scrollTop = element.scrollHeight;
      }, 0);
    },
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