<template>
  <li>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "MenuItem",
  data() {
    return {};
  }
};
</script>

<style scoped>
li {
  list-style: none;
  border-bottom: 1px solid rgb(224, 209, 209);
}
</style>
