<template>
  <div class="mainarea">
    <header>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="bbs">BBS</el-menu-item>
        <el-menu-item index="resource">Resource</el-menu-item>
        <el-menu-item index="homework">Homework</el-menu-item>
      </el-menu>
    </header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: null,
      activeIndex: "main"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({ name: key });
    },
    getCourseInfo() {
      const id = this.$route.params.id;
      this.course = {
        id: this.$route.params.id,
        imgurl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Kamehameha_DB_scheme.svg/500px-Kamehameha_DB_scheme.svg.png",
        title: "Kame Hame Ha"
      };
    }
  }
};
</script>

<style scoped>
.mainarea {
  min-height: calc(100vh - 209px);
}
</style>
