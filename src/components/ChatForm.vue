<template>
  <div class="chat-box__form">
    <div class="chat-box__form__top d-flex align-items-center justify-content-between position-relative">
      <div class="chat-box__form__option d-inline-block">
        Everyone
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="arrow-right"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M10.46 18a2.23 2.23 0 0 1-.91-.2 1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46z"/></g></g></svg>
      </div>
      <ul class="d-flex align-items-center justify-content-end">
        <li>
          <input type="file" class="chat-box__form__file" id="choose-file" multiple="multiple" 
            @change.prevent="chooseFile"
          >
          <label for="choose-file">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.27 122.88"><title>paperclip</title><path d="M11.1,67.22a4.09,4.09,0,1,1-5.79-5.79L58,8.75a30.77,30.77,0,0,1,43.28,43.74L38.05,115.74l-.33.3c-4.77,4.21-9.75,6.59-15,6.82s-10.62-1.77-15.89-6.34h0l-.07-.06h0l-.15-.15a23.21,23.21,0,0,1-5.34-8A18.84,18.84,0,0,1,.14,99.16a22.87,22.87,0,0,1,4-10.47,51.46,51.46,0,0,1,6.43-7.35l58.68-58.7a13.05,13.05,0,0,1,18.34-.09l.09.09a13,13,0,0,1,.24,18.15l-.24.27L37.14,91.58a4.09,4.09,0,0,1-5.79-5.79L82,35.12a4.89,4.89,0,0,0-.13-6.67l0,0a4.84,4.84,0,0,0-6.83,0L16.33,87.12a46,46,0,0,0-5.45,6.17,15,15,0,0,0-2.62,6.83,10.92,10.92,0,0,0,.64,5.25,15.28,15.28,0,0,0,3.42,5.07c3.56,3.06,6.91,4.4,10.09,4.26s6.51-1.81,9.88-4.79l63.2-63.2A22.59,22.59,0,0,0,63.75,14.57L11.1,67.22Z"/></svg>
          </label>
        </li>
        <li @click="toggleEmoji">
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><title>happy</title><path d="M45.54,2.1A61.48,61.48,0,1,1,8.25,30.74,61.26,61.26,0,0,1,45.54,2.1ZM30.61,70.3a38,38,0,0,0,8.34,8,40.39,40.39,0,0,0,23.58,7.1A38.05,38.05,0,0,0,85.3,77.68a33.56,33.56,0,0,0,7.08-7.42.22.22,0,0,1,.3-.06L95,72.49a.21.21,0,0,1,0,.27A43.47,43.47,0,0,1,81.7,87.08a35.7,35.7,0,0,1-19,6,36.82,36.82,0,0,1-19.53-5.25A47.5,47.5,0,0,1,27.87,72.9a.23.23,0,0,1,0-.27l2.38-2.36a.22.22,0,0,1,.3,0l0,0ZM76.23,33.89c4.06,0,7.35,4.77,7.35,10.65s-3.29,10.64-7.35,10.64-7.35-4.77-7.35-10.64,3.29-10.65,7.35-10.65Zm-29.58,0c4.06,0,7.35,4.77,7.35,10.65s-3.29,10.64-7.35,10.64S39.3,50.41,39.3,44.54s3.29-10.65,7.35-10.65Zm42.1-19.75A54.64,54.64,0,1,0,114.18,47.3,54.46,54.46,0,0,0,88.75,14.14Z"/></svg>
        </li>
        <EmojiPicker @select="onSelectEmoji" v-show="showEmoji" />
      </ul>
    </div>
    <div class="chat-box__form__bottom d-flex align-items-center justify-content-between">
      <textarea
        class="chat-box__form__input"
        type="text"
        placeholder="Type your message"
        v-model.trim="msg"
        @keydown.enter.exact.prevent="submitMessage"
      />
      <div @click="submitMessage" class="chat-box__form__submit">
        <svg
          viewBox="0 0 68 68"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_26_10)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M48.0833 19.799C48.619 20.3347 48.806 21.127 48.5665 21.8457L35.8385 60.0294C35.5946 60.7614 34.9513 61.2877 34.1855 61.382C33.4198 61.4763 32.6681 61.1217 32.2539 60.4707L22.593 45.2893L7.41158 35.6285C6.76065 35.2142 6.40604 34.4625 6.50031 33.6968C6.59458 32.931 7.12092 32.2878 7.85287 32.0438L46.0366 19.3159C46.7553 19.0763 47.5476 19.2633 48.0833 19.799ZM26.5903 44.1204L33.3726 54.7782L42.0926 28.6181L26.5903 44.1204ZM39.2642 25.7897L23.7619 41.292L13.1041 34.5097L39.2642 25.7897Z"
              fill=""
            />
          </g>
          <defs>
            <clipPath id="clip0_26_10">
              <rect
                width="48"
                height="48"
                fill="white"
                transform="translate(33.9412) rotate(45)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
    <div v-if="showFile" class="attachment-file">
      <div class="d-table">
        <div class="d-flex align-items-center">
          <p class="img" v-if="fileImage != ''"><img :src="fileImage" alt=""></p>
          <p class="img" v-else><img src="/img/file.png" alt=""></p>
          <p class="name">{{ fileName }} nguyenconghau.rar</p>
          <p class="icon-close" @click="removeFile">
            <img src="/img/icons8-close-24.svg" alt="">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmojiPicker from 'vue3-emoji-picker'
import "../../node_modules/vue3-emoji-picker/dist/style.css";

export default {
  data() {
    return {
      msg: "",
      showEmoji: false,
      showFile: false,
      fileImage: '',
      fileName: ''
    };
  },
  components: {
    EmojiPicker: EmojiPicker,
  },
  methods: {
    submitMessage() {
      if (this.msg) {
        this.$emit("submitMessage", this.msg);
        this.msg = "";
      }
      return;
    },
    toggleEmoji() {
      this.showEmoji = !this.showEmoji
    },
    onSelectEmoji(emoji) {
      this.showEmoji = !this.showEmoji
      this.msg += (emoji.i + ' ')
    },
    chooseFile(event) {
      var fileName = event.target.files[0].name;
      this.fileName = fileName;
      // this.msg += fileName;
      this.showFile = true
      //Todo
      const format = ['png', 'jpeg', 'jpg', 'webp', 'svg'];
      let fileExtensions = fileName.split(".");
      let checkType = format.indexOf(fileExtensions[fileExtensions.length-1]);
      if (checkType == 0) {
        const file = event.target.files[0];
        this.fileImage = URL.createObjectURL(file);
      }
    },
    removeFile() {
      document.getElementById('choose-file').value = "";
      this.showFile = false
    }
  }
};
</script>

<style lang="scss" scoped>
.attachment-file {
  border: 1px solid #ccc;
  padding: 2px 5px;
  border-radius: 5px;
  margin-top: 10px;
  position: relative;
  p {
    margin: 0;
    &.icon-close {
      position: absolute;
      right: -7px;
      top: -12px;
      width: 14px;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
    &.img {
      width: 75px;
      height: auto;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    &.name {
      margin-left: 10px;
      font-size: 13px;
    }
  }
}
.chat-box {
  &__form {
    padding: 15px 15px;
    border-top: 1px solid var(--bs-gray-300);
    &__top {
      text-align: left;
      margin-bottom: 10px;
      .v3-emoji-picker {
        position: absolute;
        bottom: 30px;
        right: 0;
      }
      ul {
        list-style: none;
        margin: 0;
        li {
          width: 15px;
          margin-left: 20px;
          cursor: pointer;
          svg {
            fill: var(--bs-gray-500);
          }
        }
      }
    }
    &__file {
      display: none;
      & + label {
        width: 15px;
        cursor: pointer;
      }
    }
    &__option {
      background: var(--bs-gray-500);
      color: #fff;
      padding: 4px 7px;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        opacity: 0.8;
      }
      svg {
        width: 20px;
        fill: #fff;
        width: 13px;
      }
    }
    &__input {
      width: calc(100% - 50px);
      height: 40px;
      border: none;
      background: var(--bs-gray-300);
      border-radius: 5px;
      padding-left: 15px;
      font-size: 14px;
      padding-top: 12px;
      line-height: 15px;
      scroll-behavior: smooth;
      resize: none;
      &::-webkit-scrollbar {
        display: none;
      }
      img {
        padding: 0 10px;
      }
      &:focus {
        outline: none;
      }
      &::-webkit-input-placeholder {
        color: var(--bs-gray-500);
      }

      &:-ms-input-placeholder {
        color: var(--bs-gray-500);
      }
      &::placeholder {
        color: var(--bs-gray-500);
      }
    }
    &__submit {
      width: 40px;
      height: 40px;
      background: var(--bs-blue);
      border-radius: 5px;
      cursor: pointer;
      text-align: center;
      svg {
        transition: 0.3s;
        fill: #fff;
        width: 25px;
        margin-top: 5px;
      }
    }
  }
}
</style>
