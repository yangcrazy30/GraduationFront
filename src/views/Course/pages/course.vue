<template>
  <div class="mainarea">
    <header class="ct">
      <h1>{{ course.name }}</h1>
      <div>
        <el-button type="primary" @click="handleUnSubs" v-if="isSubscribe">
          <span>UnSubscribe</span>
        </el-button>
        <el-button type="primary" @click="jumpToStudy">
          <span v-if="!isSubscribe">Subscribe</span>
          <div v-else>
            <span>Learn</span>
          </div>
        </el-button>
      </div>
    </header>
    <div class="box">
      <div class="left">
        <div class="courseImg" :style="{ backgroundImage: 'url(' + course.imageUrl + ')' }"></div>
        <h2>Description</h2>
        <div>
          <span style="font-size: 20px">{{ course.description }}</span>
        </div>
      </div>
      <div class="right">
        <div class="righttop">
          <span>{{ course.id }}</span>
          <span>{{ course.name }}</span>
          <span>Online</span>
        </div>
        <div class="rightcenter">
          <div>
            <span style="font-size: 1.2rem">teacher:{{ course.teacher }}</span>
          </div>
          <el-divider></el-divider>
          <div>
            <span style="font-size: 1.2rem">Time: {{ course.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCourseById,
  getStudentCoursesIds,
  updateStudenCourse,
  unSubsCourse
} from "api/course/course";
import { tranformDate } from "@/utils/utils";
export default {
  data() {
    return {
      course: {
        name: "",
        description: "",
        id: "",
        name: "",
        teacher: "",
        time: ""
      },
      isSubscribe: false
    };
  },
  methods: {
    async getCourseInfo() {
      const res = await getCourseById(this.$route.params.id);
      const course = res.data.data;
      let time = tranformDate(course.startDay, course.endDay);
      this.course = course;
      this.course.time = time;
    },
    async jumpToStudy() {
      await this.setStudentSubs();
      this.$router.push({ name: "study", params: { id: this.course.id } });
    },
    async getStudentSubs() {
      const res = await getStudentCoursesIds();
      this.isSubscribe = res.data.data.courseIds.includes(
        this.$route.params.id
      );
    },
    async setStudentSubs() {
      await updateStudenCourse(this.$route.params.id);
    },
    async handleUnSubs() {
      await unSubsCourse(this.course.id);
      await this.getStudentSubs();
    },
    checkIsTeacher() {
      if (this.$store.state.account.role === "teacher") {
        this.$router.push({ name: "study", params: { id: this.course.id } });
      }
    }
  },
  created() {},
  async mounted() {
    await this.getStudentSubs();
    await this.getCourseInfo();
    this.checkIsTeacher();
  }
};
</script>

<style scoped>
.mainarea {
  min-height: calc(100vh - 209px);
}
.ct {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}
h1 {
  margin: 1rem;
}

h2 {
  margin: 1rem 0;
}

.box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1rem;
}

.courseImg {
  height: 330px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.left {
  flex-basis: 50%;
  padding: 0 2rem;
}

.right {
  flex-basis: 50%;
  padding: 0 2rem;
}

.righttop {
  background-color: #2e2d2a;
  color: white;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.righttop > span {
  padding: 0.5rem;
}

.rightcenter {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.rightcenter > div {
  margin: 24px;
}

.el-button,
.el-button:hover {
  background-color: #8c1515;
  margin: 0 1rem;
}
</style>
