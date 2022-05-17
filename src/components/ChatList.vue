<template>
  <div class="chat-box__body" id="chat-box__body">
    <div
      v-for="(msg, index) in msgs"
      :key="index"
      :msg="msg"
      :class="['chat-box__message d-flex align-items-start', msg.from.id == itsMe ? 'chat-box__me justify-content-end' : '']">
      <p class="chat-box__avartar">
        <img :src="msg.from.avatar" alt="" class="chat-box__img" />
      </p>
      <div class="chat-box__content">
        <p class="chat-box__user">from <span>{{ msg.from.name }}</span> to <span>Everyone</span></p>
        <p class="chat-box__paragraph d-inline-block">{{ msg.msg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      msgs: [],
      itsMe: Number
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
      background-color: #CFD7E2;
      font-size: 14px;
      padding: 8px 15px;
      border-radius: 10px;
      margin: 0;
      text-align: left;
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
      background: #E4F2FF;
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
