<template>
  <div>
    <div id="headerBar">
      <div id="nameWebsite">
        <!-- <a href="/home" style="color: #ffffff">ReturnMe</a> -->
        <router-link
          :to="{ name: 'home' }"
          style="color: #ffffff; font-size: 48px"
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
      <div
        v-if="this.$store.state.loginState"
        style=" width: 12%;float: right; margin-top: 23px; cursor: pointer;text-overflow: ellipsis; overflow: hidden;"
        v-on:click="routeToProfile"
      >
        {{ this.$store.state.nameCurrentUser }}
      </div>
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
    return {
      nameCurrentUser: null
    };
  },
  beforeCreate() {
    if (
      CookieFunctions.readCookie("sessionUserName") !== null &&
      CookieFunctions.readCookie("sessionUserName") !== ""
    ) {
      this.$store.state.nameCurrentUser = CookieFunctions.readCookie(
        "sessionUserName"
      );
    }
  },
  created: function() {
    // `this` points to the vm instance
    if (
      CookieFunctions.readCookie("sessionId") !== null &&
      CookieFunctions.readCookie("sessionId") !== ""
    ) {
      this.$store.state.loginState = true;
      this.$store.state.token = CookieFunctions.readCookie("sessionId");
    } else {
      this.$store.state.loginState = false;
      this.$store.state.token = CookieFunctions.readCookie("sessionId");
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
      this.$store.state.token = null;
      this.$router.push("/login");
    },
    routeToProfile: function() {
      this.$router.push({
        name: "profile"
      });
    }
  },
  computed: {}
};
</script>

<style scoped>
#headerBar {
  background: #e66767;
  height: 120px;
  color: white;
  position: relative;
  width: 100%;
  /* max-width: 100%;
  min-width: 600px; */
}
#nameWebsite {
  float: left;
  font-size: 30px;
  margin-left: 80px;
  position: absolute;
  bottom: 0px;
}
</style>
