import Vue from "vue";
import App from "./App.vue";
import router from "router/router";
import store from "store/index";
import fastClick from 'fastclick';
import rem from "js/rem.js";
import 'common/stylus/index.styl';

Vue.config.productionTip = false;

router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth) { //判断该页面是否需要先登录
    if(store.state.user&&store.state.token){ //判断是否已登录
      next();
      return false;
    }
    next({path:'/login'}) //未登录时跳转至登录页
  }else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
