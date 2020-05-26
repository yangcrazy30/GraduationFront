<template>
  <div id="app">
    <header class="head">
      <div class="topmenu">
        <div @click="jumpToHome">
          <strong style="padding:0 1rem">UJSOnline</strong>
        </div>
        <div class="login">
          <i class="iconfont icon-touxiang1" @click="jumpToProfile"></i>
          <span @click="jumpToLogin" v-if="username === ''">
            <span>my</span>
            <strong>UJSOnline</strong>
            <span>connection</span>
          </span>
          <span v-else @click="jumpToProfile">
            <strong>{{ username }}</strong>
            <i @click="logout" class="iconfont icon-log-out"></i>
          </span>
        </div>
      </div>
      <nav>
        <el-menu
          mode="horizontal"
          :default-active="avtiveIndex"
          @select="handleNavSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="allcourse">Course</el-menu-item>
        </el-menu>
      </nav>
    </header>
    <router-view></router-view>
    <footer class="footer">
      <div class="botLogo">
        <span>University Of</span>
        <span>JiangSu</span>
      </div>
      <div class="botMessage"></div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      avtiveIndex: "0",
      menus: [{}],
      _beforeUnload_time: 0,
      _gap_time: 0
    };
  },
  mounted() {
    window.addEventListener("beforeunload", e => {
      this.beforeunloadHandler(e);
      let userAgent = navigator.userAgent;
      let isOpera = userAgent.indexOf("Opera") > -1;
      if (isOpera) {
        //判断是否Opera浏览器
        return "Opera";
      }
      if (userAgent.indexOf("Firefox") > -1) {
        this.unloadHandler();
      } else if (
        userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1 &&
        !isOpera
      ) {
        e = e ? e : window.event ? window.event : null;
        var cy = e.clientY || e.target.event.clientY;
        var ak = e.altKey || e.target.event.altKey;
        if (cy < 0 || ak) {
          this.unloadHandler();
        }
      }
    });
    window.addEventListener("unload", async e => {
      this.unloadHandler(e);
    });
  },
  destroyed() {
    window.removeEventListener("beforeunload", e =>
      this.beforeunloadHandler(e)
    );
    window.removeEventListener("unload", e => this.unloadHandler(e));
  },
  methods: {
    beforeunloadHandler(e) {
      this._beforeUnload_time = new Date().getTime();
    },
    unloadHandler(e) {
      this._gap_time = new Date().getTime() - this._beforeUnload_time;

      //判断是窗口关闭还是刷新
      localStorage.setItem("time", this._gap_time);
      if (this._gap_time <= 5) {
        localStorage.removeItem("ujs");
      }
    },
    handleNavSelect(key, keyPath) {
      this.$router.push({ name: key });
    },
    jumpToLogin() {
      this.$router.push({ path: "/signup" });
    },
    jumpToProfile() {
      this.$router.push({ path: "/profile" });
    },
    jumpToHome() {
      if (this.$route.path !== "/") this.$router.push({ path: "/" });
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    username() {
      return this.$store.state.account.username;
    }
  }
};
</script>


<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Source Sans Pro", Tahoma, Verdana, sans-serif;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f4f4f4;
}

.head {
  min-height: 100px;
}

body {
  flex: 1;
  overflow: auto;
}

.footer {
  min-height: 100px;
  background: #81221c;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.topmenu {
  background: #81221c;
  height: 3rem;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
}

.login {
  text-align: center;
  padding: 10px;
}

.el-menu--horizontal > .el-menu-item {
  float: right;
  font-size: 1rem;
  margin-right: 1rem;
}

.botLogo {
  width: 150px;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 5px;
}

.botLogo > span {
  margin: 5px;
}
</style>
