<template>
  <div class="secondarea">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的作业" name="first" v-if="!isCourseTeacher">
        <div class="homeworks">
          <div style="width:25%;padding:0.5rem;" v-for="homework in homeworks" :key="homework.id">
            <HomeworkItem :homework="homework" @dowork="doHomework"></HomeworkItem>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="发布作业" name="second" v-if="isCourseTeacher">
        <el-form :model="homeworkForm" ref="homeworkForm" label-width="80px">
          <el-form-item label="作业名称">
            <el-input v-model="homeworkForm.name" placeholder="作业名称"></el-input>
          </el-form-item>
          <el-form-item label="作业时间">
            <el-date-picker
              v-model="homeworkForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            v-for="(question, index) in homeworkForm.questions"
            :label="'问题' + (index + 1)"
            :key="question.id"
          >
            <el-input v-model="question.value" placeholder="问题描述"></el-input>
            <el-input v-model="question.options" placeholder="选项（4个选项之间使用‘/’分隔，如'A/B/C/D'）"></el-input>
            <div>
              <el-select v-model="question.answer" placeholder="正确答案">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button @click.prevent="removeQuestion(question)">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addHomeWork">发布</el-button>
            <el-button type="primary" @click="addQuestion">新增问题</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCourseById } from "api/course/course";
import { addNewHomeWork, getHomework } from "api/homework/homework";
import uuid from "uuid-random";
import HomeworkItem from "components/homeworkitem.vue";
export default {
  components: {
    HomeworkItem
  },
  data() {
    return {
      isCourseTeacher: false,
      homeworkForm: {
        questions: [],
        time: [],
        name: ""
      },
      options: [
        { value: 0, label: "A" },
        { value: 1, label: "B" },
        { value: 2, label: "C" },
        { value: 3, label: "D" }
      ],
      homeworks: []
    };
  },
  async mounted() {
    await this.checkCourseTeacher();
    await this.getHomework();
  },
  methods: {
    handleClick(tab, event) {},
    async addHomeWork() {
      const res = await addNewHomeWork({
        name: this.homeworkForm.name,
        questions: this.homeworkForm.questions,
        startTime: this.homeworkForm.time[0],
        endTime: this.homeworkForm.time[1],
        courseId: this.$route.params.id
      });
      if (res.data.success) {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.homeworkForm = {
          questions: [],
          time: [],
          name: ""
        };
      }
    },
    async checkCourseTeacher() {
      const res = await getCourseById(this.$route.params.id);
      let result = res.data.data.teacher === this.$store.state.account.email;
      this.isCourseTeacher = result;
    },
    addQuestion() {
      this.homeworkForm.questions.push({
        id: uuid(),
        value: "",
        options: "",
        answer: 1
      });
    },
    removeQuestion(question) {
      const index = this.homeworkForm.questions.indexOf(question);
      if (index !== -1) {
        this.homeworkForm.questions.splice(index, 1);
      }
    },
    doHomework(p) {
      this.$router.push({
        name: "homeworkdetail",
        params: p
      });
    },
    async getHomework() {
      const res = await getHomework(this.$route.params.id);
      this.homeworks = res.data.data;
    }
  },
  computed: {
    role() {
      return this.$store.state.account.role;
    },
    activeName() {
      return this.isCourseTeacher ? "second" : "first";
    }
  }
};
</script>

<style scoped>
.el-input {
  margin: 0.5rem 0;
  width: 60%;
}

.secondarea {
  min-height: calc(100vh - 270px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.homeworks {
  display: flex;
  flex-direction: row;
}

.el-tabs,
.el-tabs--top {
  height: 100%;
  width: 100%;
}
</style>
