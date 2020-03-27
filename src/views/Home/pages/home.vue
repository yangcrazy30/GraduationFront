<template>
  <div class="layout" id="layout">
    <div class="homeImg"></div>
    <div class="droparrow" @click="dropToBottom(50)">
      <Icon class="droparrow" iconClass="zhixiangjiantou-copy"></Icon>
    </div>
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
    },
    dropToBottom(i) {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      let height = scrollHeight - clientHeight; //超出窗口上界的值就是底部的scrolTop的值
      document.documentElement.scrollTop += i;
      if (document.documentElement.scrollTop < height) {
        let c = setTimeout(() => this.dropToBottom(i), 16);
      } else {
        clearTimeout(c);
      }
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

.droparrow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  font-size: 50px;
  color: white;
  animation: flow 1.5s infinite ease-in-out;
}

@keyframes flow {
  0% {
    opacity: 0.1;
    transform: translate3d(0, -16px, 0);
  }
  50% {
    opacity: 1;
    transform: translate3d(0, -8px, 0);
  }
  100% {
    opacity: 0.1;
    transform: translate3d(0, 8px, 0);
  }
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
