// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://127.0.0.1:3000',
}))

Vue.use(ElementUI);
Vue.config.productionTip = false;

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
