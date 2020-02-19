<template>
  <div class="layout">
    <div class="homeImg"></div>
    <header>
      <div class="ctitle">
        <strong>Fetured Course</strong>
        <strong class="all" @click="JumpTOALLCourse">BROWE ALL COURSES></strong>
      </div>
    </header>
    <div class="courses">
      <div style="width:25%" v-for="course in courses" :key="course.id">
        <courseItem :course="course"></courseItem>
      </div>
    </div>
  </div>
</template>

<script>
import courseItem from "components/courseItem";
import { getCourse } from "api/course/course";
export default {
  components: {
    courseItem
  },
  data() {
    return {
      courses: []
    };
  },
  async mounted() {
    await this.getHomeCourse();
  },
  methods: {
    async getHomeCourse() {
      const res = await getCourse({ page: 1, size: 4 });
      this.courses = res.data.data;
    },
    JumpTOALLCourse() {
      this.$router.push({ path: "/allcourse" });
    }
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.homeImg {
  height: calc(100vh - 100px);
  width: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: left;
  background-image: url("../../../assets/home-bg.jpg");
}

.ctitle {
  font-size: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.ctitle > strong {
  display: block;
  padding: 0 0;
}

.all {
  font-size: 1rem;
}

.courses {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
