<template>
  <div class="secondarea">
    <div class="button">
      <el-input v-model="saerchkeyword" placeholder="请输入帖子名"></el-input>
      <el-button type="primary" @click>Search</el-button>
      <el-button style="float:right" type="primary" @click="dialogshow = true"
        >new</el-button
      >
    </div>
    <ul>
      <li
        class="post"
        v-for="item in posts"
        :key="item.id"
        :data-index="item.id"
      >
        <BbsItem :data="item"></BbsItem>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      :total="total"
    ></el-pagination>
    <el-dialog title="New Post" :visible.sync="dialogshow" width="30%">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="Title">
          <el-input v-model="form.title" placeholder></el-input>
        </el-form-item>
        <el-form-item label="Content">
          <el-input
            type="textarea"
            v-model="form.content"
            placeholder="Content"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogshow = false">取 消</el-button>
        <el-button type="primary" @click="handlePost">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BbsItem from "components/bbsitem";
import { getPost, newPost, getPostCount } from "api/bbs/post";
export default {
  components: {
    BbsItem
  },
  data() {
    return {
      posts: [],
      dialogshow: false,
      saerchkeyword: "",
      form: { title: "", content: "" },
      currentPage: 1,
      total: 0,
      pageSize: 4
    };
  },
  async mounted() {
    await this.handleCurrentChange();
    await this.getPostCount();
  },
  methods: {
    async handleCurrentChange(current) {
      const res = await getPost({
        page: this.currentPage,
        size: this.pageSize
      });
      this.posts = res.data.data;
    },
    async handlePost() {
      const res = await newPost({
        title: this.form.title,
        content: this.form.content
      });
      if (res.data.success) {
        this.dialogshow = false;
        const newpost = await getPost({
          page: 1,
          size: this.pageSize
        });
        this.posts = newpost.data.data;
      }
    },
    async getPostCount() {
      const res = await getPostCount();
      this.total = res.data.data;
    }
  }
};
</script>

<style></style>

<style scoped>
li {
  list-style: none;
}

ul {
  padding-inline-start: 0;
}

.el-input {
  width: auto;
}

.button {
  flex-shrink: 0;
  width: 100%;
  padding: 0.5rem;
}

.secondarea {
  min-height: calc(100vh - 270px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.secondarea > ul {
  flex-shrink: 0;
  width: 100%;
}
</style>
