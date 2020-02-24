import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index";

/**
 * 模块的路由配置
 */
import homeRouterConfig from "views/home/homeRouterConfig";
import courseRouterConfig from "views/course/courseRouterConfig";
import loginRouterConfig from "views/login/loginRouterConfig";
import studyRouterConfig from "views/study/studyRouterConfig";
import settingRouterConfig from "views/setting/settingRouterConfig";

Vue.use(Router);

const whiteList = new Set(["/login", "/signup", "/"]);

const router = new Router({
  routes: [
    ...homeRouterConfig,
    ...courseRouterConfig,
    ...loginRouterConfig,
    settingRouterConfig,
    studyRouterConfig
  ]
});

router.beforeEach((to, from, next) => {
  if (whiteList.has(to.path)) {
    next();
    return;
  }

  if (!store.getters.isLoggedIn) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
    return;
  }

  next();
});

export default router;
