import Vue from "vue";
import Router from "vue-router";
import Footer from "./components/Footer.vue";
import Home from "./views/Home.vue";
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
      meta: { title: "Home" },
      component: {
        render(c) {
          // console.log(c("router-view").tag);
          if (c("router-view").tag === undefined) {
            return c(Home);
          }
          return c("router-view");
        }
      },
      children: [
        // {
        //   path: "/",
        //   redirect: `/${i18n.locale}/`
        // },
        // {
        //   path: "home",
        //   meta: { title: "Home" },
        //   name: "home",
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () =>
        //     import(/* webpackChunkName: "about" */ "./views/Home.vue")
        // },
        {
          path: "/home",
          redirect: `/${i18n.locale}/home`
        },
        {
          path: "home",
          meta: { title: "Home" },
          name: "home",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Home.vue")
        },
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
          path: "/detail/:idPost",
          redirect: `/${i18n.locale}/detail/:idPost`
        },
        {
          path: "detail/:idPost",
          name: "detail",
          meta: { title: "Post" },
          // redirect: `/${i18n.locale}/login`,
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Detail.vue")
        },
        {
          path: "/post",
          redirect: `/${i18n.locale}/post`
        },
        {
          path: "post",
          name: "post",
          meta: { title: "Post News" },
          // redirect: `/${i18n.locale}/login`,
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/PostNews.vue")
        },
        {
          path: "/test",
          redirect: `/${i18n.locale}/test`
        },
        {
          path: "test",
          name: "test",
          meta: { title: "Test" },
          // redirect: `/${i18n.locale}/login`,
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Test.vue")
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
