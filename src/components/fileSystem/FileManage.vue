<template>
  <div class="content">
    <header>
      <el-button type="primary" @click="upload">上传</el-button>
      <el-button type="primary" @click="download">下载</el-button>
    </header>
    <ul class="main">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FileManage",
  data() {
    return {
      currentPath: "全部"
    };
  },
  methods: {
    upload() {
      this.$emit("upload");
    },
    download() {
      console.log("downlaod");
    }
  }
};
</script>

<style scoped>
ul {
  margin-block-start: 0;
}
.content {
  margin: 1rem;
}

.main {
  border: 1px solid rgb(224, 209, 209);
}

header {
  border: 1px solid rgb(224, 209, 209);
}
</style>
