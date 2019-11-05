<template style="width:2000px">
  <div>
    <header-app></header-app>
    <!-- <div>{{$t('message')}}</div> -->
    <!-- router view is content -->
    <router-view />
    <footer-app id="footer"></footer-app>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    "header-app": Header,
    "footer-app": Footer,
  }
};
</script>

<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0
}
#footer {
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
