<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我学的课" name="first">
        <div class="course">
          <div style="width:30%;" v-for="course in courses" :key="course.id">
            <courseItem :course="course"></courseItem>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我教的课" name="second" v-if="role === 'teacher'">
        <div class="course">
          <div style="width:30%;" v-for="course in teachCourse" :key="course.id">
            <courseItem :course="course"></courseItem>
          </div>
          <div class="newcourse" @click="addCourse">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="新建课程" :visible.sync="dialogFormVisible">
      <el-form :model="courseform">
        <el-form-item label="课程名称">
          <el-input v-model="courseform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程日期">
          <el-date-picker type="date" placeholder="开始时间" v-model="courseform.startDay"></el-date-picker>-
          <el-date-picker placeholder="结束时间" v-model="courseform.endDay"></el-date-picker>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="courseform.description" placeholder></el-input>
        </el-form-item>
        <el-form-item label="课程图片地址">
          <el-input v-model="courseform.imageUrl" placeholder></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import courseItem from "components/courseItem";
import { addCourse, getTeacherCourse, getSubsCourse } from "api/course/course";
export default {
  components: {
    courseItem
  },
  data() {
    return {
      activeName: "first",
      courses: [],
      teachCourse: [],
      dialogFormVisible: false,
      courseform: {
        name: "",
        description: "",
        imageUrl: "",
        startDay: "",
        endDay: ""
      }
    };
  },
  computed: {
    role() {
      return this.$store.state.account.role;
    }
  },
  async mounted() {
    await this.getTeacherCourse();
    await this.getSubCourse();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addCourse() {
      this.dialogFormVisible = true;
    },
    async handleAdd() {
      const res = await addCourse({
        ...this.courseform,
        teacher: this.$store.state.account.email
      });
      this.dialogFormVisible = false;
      await this.getTeacherCourse();
    },
    async getTeacherCourse() {
      const res = await getTeacherCourse();
      this.teachCourse = res.data.data.courses;
    },
    async getSubCourse() {
      const res = await getSubsCourse();
      this.courses = res.data.data.courses;
    }
  }
};
</script>

<style scoped>
.course {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.newcourse {
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  background-color: white;
  margin: 1rem;
}
</style>
