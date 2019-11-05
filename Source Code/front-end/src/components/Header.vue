<template>
  <div>
    <div id="headerBar">
      <div id="nameWebsite">ReturnMe</div>
      <!-- <label >Đăng nhập</label> -->
      <router-link
        :to="{ name: 'login' }"
        style="float: right;margin-top: 22px; margin-right: 50px; margin-left: 15px; color:white"
      >{{$t('login')}}</router-link>
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
export default {
  components: {
    languageSwitch: LanguageSwitcher,
    navbar: NavBar
  }
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
