<template>
  <div>
    <li @click="openSub">
      <slot name="title"></slot>
    </li>
    <ul v-show="showSub">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSub: false
    };
  },
  methods: {
    openSub() {
      this.showSub = !this.showSub;
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
