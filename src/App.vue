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
            <span>my</span><strong>UJSOnline</strong><span>connection</span>
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
      menus: [{}]
    };
  },
  methods: {
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

<style scoped>
@import "common/css/reset.css";
body {
  font-family: "Source Sans Pro", Tahoma, Verdana, sans-serif;
}

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
