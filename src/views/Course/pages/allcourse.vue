<template>
  <div class="alayout">
    <h1>Search Course</h1>
    <div class="box">
      <div class="left">
        <div class="search">
          <el-input placeholder="Please Input" prefix-icon="el-icon-search" v-model="input"></el-input>
        </div>
        <div class="filter">
          <SlideBar :keywords="keywords"></SlideBar>
        </div>
      </div>
      <div class="right">
        <div style="width: 25%;" v-for="course in courses" :key="course.id">
          <courseItem :course="course"></courseItem>
        </div>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlideBar from "components/slidebar.vue";
import CourseItem from "components/courseItem.vue";
import { getCourse } from "api/course/course";
export default {
  components: {
    SlideBar,
    CourseItem
  },
  data() {
    return {
      input: "",
      keywords: [
        { title: "topic", open: false },
        { title: "type", open: false }
      ],
      courses: [],
      currentPage: 1,
      total: 0,
      pageSize: 8
    };
  },
  async mounted() {
    await this.handleCurrentChange();
    this.checkIsTeacher();
  },
  methods: {
    async handleCurrentChange(current) {
      const res = await getCourse({
        page: this.currentPage,
        size: this.pageSize
      });
      this.courses = res.data.data;
    },
    checkIsTeacher() {
      if (this.$store.state.account.role === "teacher") {
        this.$router.push({ name: "mycourse" });
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 40px;
  margin: 1rem;
}

.box {
  display: flex;
  flex-direction: row;
  height: 1000px;
}

.left {
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
}

.search {
  margin: 0.5rem 1rem;
}

.right {
  flex-basis: 75%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
