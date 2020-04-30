<template>
  <div class="setting">
    <div class="settingbox">
      <div class="left">
        <div class="topbar">
          <div class="avatar" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"></div>
          <div style="margin:0.5rem">{{ username }}</div>
        </div>
        <el-menu :default-active="activeIndex" @select="handleSelect">
          <el-menu-item index="setting">
            <i class="el-icon-setting"></i>
            <span slot="title">Setting</span>
          </el-menu-item>
          <el-menu-item index="chat">
            <i class="el-icon-message"></i>
            <span slot="title">Chat</span>
          </el-menu-item>
          <el-menu-item index="mycourse">
            <i class="el-icon-menu"></i>
            <span slot="title">Course</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "",
      userInfo: { username: "Zeo" }
    };
  },
  methods: {
    handleSelect(key) {
      this.$router.push({ name: key });
    }
  },
  computed: {
    username() {
      return this.$store.state.account.username;
    },
    avatarUrl() {
      return this.$store.state.account.avatar;
    }
  }
};
</script>

<style scoped>
.setting {
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 209px);
  justify-content: center;
}

.settingbox {
  display: flex;
  flex-direction: row;
  width: 80%;
}

.left {
  flex-basis: 25%;
}

.topbar {
  height: 20%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  margin: 0.2rem;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.el-menu {
  height: 80%;
}

.right {
  flex-basis: 75%;
  padding: 2rem 1rem;
}
</style>
