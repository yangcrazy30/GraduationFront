<template>
  <div>
    <header>
      <h3>{{ homework.name }}</h3>
    </header>
    <main>
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item
          v-for="(question, index) in form.questions"
          :key="question.id"
          :label="'问题' + (index + 1)"
          :prop="'questions.' + index + '.myanswer'"
          :rules="{
            required: true,
            message: '答案不能为空',
            trigger: 'blur'
          }"
        >
          <p>
            <span>{{ question.value }}</span>
          </p>
          <el-radio-group v-model="question.myanswer" :disabled="disable">
            <el-radio :label="0">A: {{ question.options[0] }}</el-radio>
            <el-radio :label="1">B: {{ question.options[1] }}</el-radio>
            <el-radio :label="2">C: {{ question.options[2] }}</el-radio>
            <el-radio :label="3">D: {{ question.options[3] }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="finishHomework">提交</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script>
import { getHomeworkById, submitHomework } from "api/homework/homework";
export default {
  data() {
    return {
      homework: { name: "" },
      form: {
        questions: []
      },
      disable: false
    };
  },
  async mounted() {
    await this.getHomeWork();
  },
  methods: {
    async getHomeWork() {
      const res = await getHomeworkById(this.$route.params.homeworkid);
      this.homework = res.data.data;
      this.disable =
        new Date(this.homework.endTime).getTime() < new Date().getTime();
      for (let i = 0; i < this.homework.questions.length; i++) {
        let question = this.homework.questions[i];
        this.form.questions.push({
          options: question.options.split("/"),
          myanswer: "",
          answer: question.answer,
          id: question.id,
          value: question.value
        });
      }
    },
    async finishHomework() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          let grade = this.getGrade();
          const res = await submitHomework({
            homeworkId: this.$route.params.homeworkid,
            grade: grade
          });
        } else {
          return false;
        }
      });
    },
    getGrade() {
      let number = 0;
      for (let i = 0; i < this.form.questions.length; i++) {
        if (this.form.questions[i].answer === this.form.questions[i].myanswer)
          number++;
      }
      return number;
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
</style>
