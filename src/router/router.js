import Vue from "vue";
import Router from "vue-router";
import index from "views/index.vue";
import Login from "views/login.vue";
import TabSlide from "components/tab-slide/tab-slide.vue";
import Recharge from "components/recharge.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      component: index,
      meta: {
        requireAuth: true,
        keepAlive: true
      },
      children: [
        {
          path: "/",
          redirect: "/tabSlide"
        },
        {
          path: "/tabSlide",
          name: "tabSlide",
          component: TabSlide,
          meta: {
            requireAuth: true
          }
        },
        {
          path: "/recharge",
          name: "recharge",
          component: Recharge,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
