<template>
  <div class="chat-box__body" id="chat-box__body">
    <div
      v-for="(msg, index) in msgs"
      :key="index"
      @mouseover="showMessageRecall" @mouseleave="hideMessageRecall"
      :class="['chat-box__message d-flex align-items-start', msg.from.id == itsMe ? 'chat-box__me justify-content-end' : '']">
      <p class="chat-box__avartar">
        <img :src="msg.from.avatar" alt="" class="chat-box__img" />
      </p>
      <div class="chat-box__content">
        <p class="chat-box__user">from <span>{{ msg.from.name }}</span> to <span>Everyone</span></p>
        <div class="chat-box__paragraph d-inline-block">
          <p class="message" v-if="msg.status === 1">{{ msg.msg }}</p>
          <p class="message recall" v-else>Tin nhắn đã được thu hồi</p>
          <p class="message-recall" v-if="msg.from.id == itsMe && msg.status === 1">
            <span class="message-recall__choose" @click="messageRecall(msg)">
              <svg fill="#999" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg>Message recall</span>
            <span class="message-recall__icon" @click="toggleChoose">&#8943;</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import TutorialDataService from "../services/TutorialDataService";
  export default {
    props: {
      msgs: Array,
      itsMe: Number,
      roomId: Number
    },
    data() {
      this.firebaseService = new TutorialDataService(`${this.roomId}`)
      return {
        currentTutorial: null
      };
    },
    watch: {
      tutorial: function(tutorial) {
        this.currentTutorial = { ...tutorial };
      },
    },
    methods: {
      showMessageRecall(e) {
        e.stopPropagation();
        let _this = $(e.target)
        _this.find(".message-recall").stop().fadeIn();
      },
      hideMessageRecall(e) {
        e.stopPropagation();
        let _this = $(e.target)
        _this.find(".message-recall").stop().fadeOut();
        _this.find(".message-recall__choose").hide();
        if (_this.find(".message-recall__icon").hasClass("active")) {
          _this.find(".message-recall__icon").toggleClass("active");
        }
      },
      toggleChoose(e) {
        e.stopPropagation();
        let _this = $(e.target)
        _this.toggleClass("active");
        if (_this.hasClass("active")) {
          _this.prev(".message-recall__choose").css('display', 'block');
        } else {
          _this.prev(".message-recall__choose").hide();
        }
      },
      messageRecall(msg) {
        console.log(msg)
        var data = {
          from: {
            id: msg.from.id,
            name: msg.from.name,
            avatar: msg.from.avatar
          },
          status: 0,
          date: msg.date,
          msg: msg.msg,
        };
        this.firebaseService.update(msg.from.key, data)
          .then(() => {
            console.log("The tutorial was updated successfully!")
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.currentTutorial = { ...this.tutorial }
    },
  };
</script>

<style lang="scss" scoped>
  .chat-box {
    &__body {
      overflow-y: auto;
      scroll-behavior: smooth;
      height: 350px;
      padding: 15px;
      &::-webkit-scrollbar-track
      {
        background-color: var(--bs-gray-100);;
      }

      &::-webkit-scrollbar
      {
        width: 3px;
        background-color: var(--bs-gray-100);
      }

      &::-webkit-scrollbar-thumb
      {
        background-color: var(--bs-gray-300);
      }
    }
    &__message {
      margin: 0 0 15px 0;
      min-height: 40px;
      line-break: anywhere;
    }
    &__content {
      max-width: 180px;
      text-align: left;
    }
    &__paragraph {
        position: relative;
      p {
        margin: 0;
        &.message {
          background-color: #CFD7E2;
          font-size: 14px;
          padding: 8px 15px;
          border-radius: 10px;
          margin: 0;
          text-align: left;
          &.recall {
            color: rgba(0,0,0,0.25);
            font-size: 13px;
          }
        }
        &.message-recall {
          width: 120px;
          position: absolute;
          right: calc(100% + 15px);
          bottom: 0%;
          display: none;
          span {
            display: block;
          }
        }
        span.message-recall__icon {
          display: block;
          font-size: 16px;
          color: #a5a5a5;
          font-weight: bold;
          cursor: pointer;
        }
        span.message-recall__choose {
          background: #fff;
          box-shadow: 0 12px 28px 0 #ccc;
          padding: 5px 5px;
          font-size: 12px;
          color: #999;
          border-radius: 3px;
          cursor: pointer;
          display: none;
          svg {
            width: 14px;
            margin-right: 3px;
            margin-top: -2px;
          }
        }
      }
    }
    &__avartar  {
      width: 40px;
      margin: 0 10px 0 0;
    }
    &__img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
      margin: 0;
    }
    &__user {
      font-size: 14px;
      color: var(--bs-gray-600);
      margin: 0 0 3px 0;
      span {
        color: var(--bs-blue);
      }
    }
  }
  .chat-box__me {
    .chat-box__paragraph {
      p.message {
        background: #E4F2FF;
      }
      span.message-recall__choose {
        text-align: left;
      }
    }
    .chat-box__avartar {
      order: 1;
      margin-left: 10px;
      margin-right: 0;
    }
    .chat-box__content {
      order: 0;
      text-align: right;
    }
  }
</style>
