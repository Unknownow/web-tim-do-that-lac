import Vue from "vue";
import Router from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import i18n from "./i18n";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: `/${i18n.locale}`
    },
    {
      path: "/:lang",
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children: [
        {
          path: "/register",
          redirect: `/${i18n.locale}/register`
        },
        {
          path: "register",
          meta: { title: "Register" },
          name: "register",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Register.vue")
        },
        {
          path: "/login",
          redirect: `/${i18n.locale}/login`
        },
        {
          path: "login",
          name: "login",
          meta: { title: "Login" },
          // redirect: `/${i18n.locale}/login`,
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Login.vue")
        },
        {
          path: "/header",
          name: "header",
          component: Header
        },
        {
          path: "/footer",
          name: "footer",
          component: Footer
        }
      ]
    }
  ]
});
