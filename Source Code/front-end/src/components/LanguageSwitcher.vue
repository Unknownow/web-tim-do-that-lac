<template>
  <div style="position: relative">
    <!-- <button
      id="buttonSwitch"
      href="#"
      class="flex items-center"
      @click="toggleVisibility"
      @keydown.space.exact.prevent="toggleVisibility"
      @keydown.esc.exact="hideDropdown"
      @keydown.shift.tab="hideDropdown"
      @keydown.up.exact.prevent="startArrowKeys"
      @keydown.down.exact.prevent="startArrowKeys"
    >
      <img :src="`/flag_${$i18n.locale}.svg`" alt="flag" id="iconFlag" />
      <span class="ml-2">{{ $i18n.locale.toUpperCase() }}</span>
      <svg
        style="padding-top: 8px"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          class="heroicon-ui"
          d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
        />
      </svg>
    </button>-->
    <!-- <transition name="dropdown-fade"> -->
    <!-- <ul style="margin-left: -50px; background: red; width: 350px;"> -->
    <div id="formLanguage">
      <span>
        <a href="#" @click.prevent="setLocale('en')">
          <img src="/flag_en.svg" alt="english flag" id="iconFlag" />
          <span id="englishLanguage" class="ml-2" style="color: white"
            >English</span
          >
        </a>
      </span>
      <span>
        <a href="#" @click.prevent="setLocale('vi')">
          <img src="/flag_vi.svg" alt="english flag" id="iconFlag" />
          <span id="vietnamLanguage" class="ml-2" style="color: white"
            >Tiếng việt</span
          >
        </a>
      </span>
    </div>
    <!-- </ul> -->
    <!-- </transition> -->
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  data() {
    return {
      isVisible: false,
      focusedIndex: 0
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    hideDropdown() {
      this.isVisible = false;
      this.focusedIndex = 0;
    },
    startArrowKeys() {
      if (this.isVisible) {
        // this.$refs.account.focus()
        this.$refs.dropdown.children[0].children[0].focus();
      }
    },
    focusPrevious(isArrowKey) {
      this.focusedIndex = this.focusedIndex - 1;
      if (isArrowKey) {
        this.focusItem();
      }
    },
    focusNext(isArrowKey) {
      this.focusedIndex = this.focusedIndex + 1;
      if (isArrowKey) {
        this.focusItem();
      }
    },
    focusItem() {
      this.$refs.dropdown.children[this.focusedIndex].children[0].focus();
    },
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.$router.push({
        params: { lang: locale }
      });
      //set color text language
      if (this.$i18n.locale == "en") {
        document.getElementById("englishLanguage").style.color = "#5bc0de";
        document.getElementById("vietnamLanguage").style.color = "white";
      } else {
        document.getElementById("englishLanguage").style.color = "white";
        document.getElementById("vietnamLanguage").style.color = "#5bc0de";
      }

      // this.hideDropdown();
    }
  }
};
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.1s ease-in-out;
}
.dropdown-fade-enter,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
#iconFlag {
  width: 25px;
  height: 25px;
  margin-right: 8px;
  margin-left: 15px;
}
#formLanguage {
  float: right;
  margin-right: 20px;
  margin-top: 22px;
}
</style>
