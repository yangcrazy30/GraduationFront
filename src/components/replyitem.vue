<template>
  <div class="bbsitem">
    <div class="item">
      <span>{{ data.fromId }}</span> To
      <span>{{ data.toId }}</span>
    </div>
    <div class="item">
      <span>{{ data.content }}</span>
    </div>
    <div class="item">
      <i
        class="iconfont icon-diancai1-copy-copy"
        :style="{ color: like ? 'red' : 'gray' }"
        @click="handleLike"
      ></i>
      <span v-show="data.like !== 0">{{ data.like }}</span>
      <span>{{ data.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      like: false
    };
  },
  methods: {
    getLikeNum() {},
    handleLike() {
      this.like = !this.like;
      if (this.like) {
        this.data.like = this.data.like + 1;
      } else {
        this.data.like = this.data.like - 1;
      }
    }
  }
};
</script>

<style>
.bbsitem {
  border: 1px gray solid;
  border-radius: 5px;
  margin: 0.5rem;
}
.item {
  margin: 0.5rem;
}
</style>
