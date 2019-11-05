import Vue from "vue";
import App from "./App.vue";
import { DatePicker } from "ant-design-vue";
import AntDesignVue from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import i18n from "./i18n";

Vue.use(AntDesignVue);
Vue.use(DatePicker);

Vue.config.productionTip = false;

//use before routing each page to set language
router.beforeEach((to, from, next) => {
  //set title for page
  document.title = to.meta.title;

  //set default languege if not param language in link
  if (!language) {
    language = "vi";
  }

  //set current language
  let language = to.params.lang;
  i18n.locale = language;
  next();
});

new Vue({
  el: "#app",
  router,
  i18n,
  render: h => h(App)
});
