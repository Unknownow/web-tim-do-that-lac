import Vue from "vue";
import App from "./App.vue";
import { DatePicker } from "ant-design-vue";
import AntDesignVue from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import i18n from "./i18n";
import { store } from "./store/store";
const VueScrollTo = require('vue-scrollto')
Vue.use(VueScrollTo)

Vue.use(AntDesignVue);
Vue.use(DatePicker);

Vue.config.productionTip = false;

//use before routing each page to set language
router.beforeEach((to, from, next) => {
  //set title for page
  document.title = to.meta.title;
  let language = to.params.lang;

  //set default languege if not param language in link
  // console.log(language);
  if (!language) {
    language = "vi";
  }
  //set current language
  i18n.locale = language;
  // console.log(i18n.locale);
  next();
});

export const bus = new Vue();

new Vue({
  el: "#app",
  store,
  router,
  i18n,
  render: h => h(App)
});
