<template>
  <div class="box">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="学生" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>ID: {{ scope.row.id }}</p>
            <p>邮箱: {{ scope.row.email }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="成绩" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.status" style="margin-left: 10px">{{ scope.row.grade }}</span>
          <span v-else style="margin-left: 10px">未评分</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">评分</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import {
  getCourseStudents,
  unSubsCourse,
  updateFinalGrade
} from "api/course/course";
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          email: "111@xx.com",
          username: "杨子瑶",
          grade: 0
        }
      ],
      currentPage: 1,
      total: 0,
      pageSize: 10
    };
  },
  async mounted() {
    await this.handleCurrentChange();
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm("此操作会将学生移除此课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await unSubsCourse(this.$route.params.id, row.id);
          await this.handleCurrentChange();

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(index, row) {
      this.$prompt("请输入成绩", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          await updateFinalGrade(this.$route.params.id, row.id, value);
          await this.handleCurrentChange();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    async handleCurrentChange() {
      const res = await getCourseStudents(
        {
          page: this.currentPage,
          size: this.pageSize
        },
        this.$route.params.id
      );
      this.tableData = res.data.data;
    }
  }
};
</script>


<style scoped>
.box {
  height: calc(100vh - 270px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>