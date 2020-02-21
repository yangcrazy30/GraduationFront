<template>
  <li @click="download">
    <slot></slot>
  </li>
</template>

<script>
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
        "http://127.0.0.1:3000/resource/" +
        this.$route.params.id +
        "/" +
        this.file.path;
      console.log("handle download");
      console.log(path);
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
