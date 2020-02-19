<template>
  <div class="secondarea">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待做作业" name="first" v-if="role === 'student'">
        <div>13</div>
      </el-tab-pane>
      <el-tab-pane label="发布作业" name="second" v-if="role === 'teacher'">
        <el-button type="primary" @click="">add</el-button>
      </el-tab-pane>
      <el-tab-pane
        label="待批作业"
        name="third"
        v-if="role === 'teacher'"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {}
  },
  computed: {
    role() {
      return this.$store.state.account.role;
    }
  }
};
</script>

<style scoped>
.secondarea {
  min-height: calc(100vh - 270px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-tabs,
.el-tabs--top {
  height: 100%;
}
</style>
