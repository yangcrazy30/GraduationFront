<template>
  <div class="content">
    <header>
      <el-button type="primary" @click="upload">上传</el-button>
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
    }
  }
};
</script>

<style scoped>
.el-button--primary /deep/ {
  margin: 0.5rem;
}

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
