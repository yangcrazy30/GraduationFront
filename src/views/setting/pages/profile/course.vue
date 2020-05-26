<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我学的课" name="first" v-if="role === 'student'">
        <div class="course">
          <div style="width:30%;" v-for="course in courses" :key="course.id">
            <courseItem :course="course" class="courseitem"></courseItem>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我教的课" name="second" v-if="role === 'teacher'">
        <div class="course">
          <div style="width:30%;" v-for="course in teachCourse" :key="course.id">
            <courseItem class="course-item" :course="course"></courseItem>
            <p class="hoverbar">
              <span class="bar" @click="removeCourse(course)">
                <Icon iconClass="shanchu"></Icon>
              </span>
              <span class="bar" @click="editCourse(course)">
                <Icon iconClass="bianji"></Icon>
              </span>
            </p>
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
    <el-dialog title="编辑课程" :visible.sync="editdialogVisible">
      <el-form :model="editcourseForm">
        <el-form-item label="课程名称">
          <el-input v-model="editcourseForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程日期">
          <el-date-picker type="date" placeholder="开始时间" v-model="editcourseForm.startDay"></el-date-picker>-
          <el-date-picker placeholder="结束时间" v-model="editcourseForm.endDay"></el-date-picker>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="editcourseForm.description" placeholder></el-input>
        </el-form-item>
        <el-form-item label="课程图片地址">
          <el-input v-model="editcourseForm.imageUrl" placeholder></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import courseItem from "components/courseItem";
import {
  addCourse,
  getTeacherCourse,
  getSubsCourse,
  removeCourse,
  editCourse
} from "api/course/course";
export default {
  components: {
    courseItem
  },
  data() {
    return {
      activeName: "",
      courses: [],
      teachCourse: [],
      dialogFormVisible: false,
      editdialogVisible: false,
      courseform: {
        name: "",
        description: "",
        imageUrl: "",
        startDay: "",
        endDay: ""
      },
      editcourseForm: {
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
    this.checkRole();
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
      this.courseform = {
        name: "",
        description: "",
        imageUrl: "",
        startDay: "",
        endDay: ""
      };
      await this.getTeacherCourse();
    },
    async handleEdit() {
      await editCourse(this.editcourseForm);
      await this.getTeacherCourse();
      this.editdialogVisible = false;
    },
    async getTeacherCourse() {
      const res = await getTeacherCourse();
      this.teachCourse = res.data.data.courses;
    },
    async getSubCourse() {
      const res = await getSubsCourse();
      this.courses = res.data.data.courses;
    },
    async removeCourse(course) {
      await removeCourse(course.id);
      await this.getTeacherCourse();
    },
    async editCourse(course) {
      this.editcourseForm = course;
      this.editdialogVisible = true;
    },
    checkRole() {
      this.activeName = this.role === "student" ? "first" : "second";
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

.course-item:hover + .hoverbar {
  visibility: visible;
}

.hoverbar {
  display: flex;
  position: relative;
  left: 80%;
  bottom: 10px;
  visibility: hidden;
  transition: visibility 0.7s;
}

.bar {
  margin: 0 2px;
  padding: 1px;
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
