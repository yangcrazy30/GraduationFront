<template>
  <div class="box">
    <main>
      <h3>
        <span>{{ homework.name }}</span>
      </h3>
      <p>
        <span>开始时间 {{ homework.startTime }}</span>
      </p>
      <p>
        <span>结束时间 {{ homework.endTime }}</span>
      </p>
      <p>
        <span>状态 {{ grade.status }}</span>
      </p>
    </main>
    <footer class="foot">
      <span>{{ grade.status === "未完成" ? "未完成" : grade.grade }}</span>
      <el-button type="primary" @click="doHomework">查看</el-button>
    </footer>
  </div>
</template>

<script>
import { getHomeWorkSatus } from "api/homework/homework";
export default {
  props: {
    homework: Object
  },
  data() {
    return {
      grade: {
        status: ""
      }
    };
  },
  async mounted() {
    await this.getStatus();
  },
  methods: {
    doHomework() {
      const params = { id: this.homework.id, status: this.grade.status };
      this.$emit("dowork", params);
    },
    async getStatus() {
      const res = await getHomeWorkSatus(this.homework.id);
      this.grade = res.data.data;
    }
  }
};
</script>

<style scoped>
.box {
  border-radius: 2rem;
}

.foot {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

span {
  margin: 0.5rem;
}

main {
  background-color: rgb(243, 236, 236);
  padding: 0.5rem;
}

footer {
  background-color: white;
  padding: 0.5rem;
}
</style>
