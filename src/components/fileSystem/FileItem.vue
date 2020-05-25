<template>
  <li @click="download">
    <slot></slot>
  </li>
</template>

<script>
import config from "../../utils/config";
export default {
  name: "FileItem",
  props: {
    file: Object
  },
  data() {
    return {};
  },
  methods: {
    download() {
      let path =
        config.baseURL +
        "/resource/" +
        this.$route.params.id +
        "/" +
        this.file.path;
      window.open(path);
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
  border-bottom: 1px solid rgb(224, 209, 209);
}
</style>
