<template>
  <div class="bbsitem" @click="handleClick">
    <div class="item">
      <h2>{{ data.title }}</h2>
    </div>
    <div class="item">
      <span>{{ data.littleD }}</span>
    </div>
    <div class="item">
      <i
        class="iconfont icon-diancai1-copy-copy"
        :style="{ color: like ? 'red' : 'gray' }"
        @click.stop="handleLike"
      ></i>
      <span v-show="data.like !== 0">{{ data.like }}</span>
      <span>{{ data.username }}</span>
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
    },
    handleClick() {
      this.$router.push({
        name: "bbsdetail",
        params: { postid: this.data.id }
      });
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
