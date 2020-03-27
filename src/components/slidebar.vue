<template>
  <div>
    <div class="top" v-for="(item, index) in kwords" :key="index" @click="show(index)">
      <div class="stitle" :style="{ 'background-color': item.open ? '#2e2d29' : '#77766c' }">
        <span>{{ item.title }}</span>
        <i v-if="!item.open" class="iconfont icon-plus" style="font-size: 20px"></i>
        <i v-else class="iconfont icon--hao"></i>
      </div>
      <div v-show="item.open">
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange"
        ></el-tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keywords: Array
  },
  computed: {
    Data() {
      return this.keywords;
    }
  },
  data() {
    return {
      props: {
        label: "name",
        children: "zones"
      },
      count: 1,
      kwords: this.keywords
    };
  },
  mounted() {},
  methods: {
    show(index) {
      this.kwords[index].open = !this.kwords[index].open;
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "Math" }, { name: "English" }]);
      }
    }
  }
};
</script>

<style>
.top {
  margin: 0.5rem 1rem;
}

.stitle {
  font-size: 20px;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
