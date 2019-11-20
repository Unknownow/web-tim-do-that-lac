<template>
  <div>
    <div id="headerBar">
      <div id="nameWebsite">
        <!-- <a href="/home" style="color: #ffffff">ReturnMe</a> -->
        <router-link :to="{ name: 'home' }" style="color: #ffffff"
          >ReturnMe</router-link
        >
      </div>
      <!-- <label >Đăng nhập</label> -->
      <a-button
        v-if="!this.$store.state.loginState"
        style="float: right;margin-top: 19px; margin-right: 50px; margin-left: 15px;
         color:white;  background: pink; border: none"
      >
        <router-link :to="{ name: 'login' }">{{ $t("login") }}</router-link>
      </a-button>
      <a-button
        v-if="this.$store.state.loginState"
        v-on:click="LogoutFunction"
        style="float: right;margin-top: 19px; margin-right: 50px; margin-left: 15px;
         color:white; background: pink; border: none"
      >
        <router-link :to="{ name: 'login' }">{{ $t("logout") }}</router-link>
      </a-button>
      <span
        v-if="this.$store.state.loginState"
        style="float: right; margin-top: 23px"
        >{{ this.$store.state.nameCurrentUser }}</span
      >
      <languageSwitch></languageSwitch>
    </div>
    <div>
      <navbar></navbar>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";
import NavBar from "./NavBar.vue";
import { CookieFunctions } from "../functions/CookieFunctions";
export default {
  data() {
    return {};
  },
  created: function() {
    // `this` points to the vm instance
    if (CookieFunctions.readCookie("sessionId") !== null) {
      // this.$store.state.loginState = true;
    } else {
      this.$store.state.loginState = false;
    }
  },
  components: {
    languageSwitch: LanguageSwitcher,
    navbar: NavBar
  },
  methods: {
    LogoutFunction: function() {
      // this.$store.commit("changeStateLogin");
      CookieFunctions.deleteCookie("sessionId");
      CookieFunctions.deleteCookie("sessionUserName");
      this.$store.state.loginState = false;
      this.$router.push("/login");
    }
  },
  computed: {}
};
</script>

<style scoped>
#headerBar {
  background: pink;
  height: 80px;
  color: white;
  position: relative;
}
#nameWebsite {
  float: left;
  font-size: 30px;
  margin-left: 80px;
  position: absolute;
  bottom: 0px;
}
</style>
