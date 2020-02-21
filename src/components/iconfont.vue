<template>
  <div class="iconbody">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconTag ? iconTag : 'unknow'"></use>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "iconSymbol",
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconTag() {
      return `#icon-${this.iconClass}`;
    }
  }
};
</script>

<style scoped>
.iconbody {
  margin: 0.5rem;
}
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
