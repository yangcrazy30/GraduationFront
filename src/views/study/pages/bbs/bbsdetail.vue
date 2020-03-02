<template>
  <div class="secondarea">
    <div class="maincotent">
      <h1 style="margin: 0.5rem">{{ post.title }}</h1>
      <p style="margin:0.5rem">{{post.username}}</p>
      <span style="margin:0.5rem" class="contentwrap">{{ post.content }}</span>
    </div>
    <el-divider></el-divider>
    <div class="replybutton">
      <el-button
        style="float:right;margin:0.5rem"
        type="primary"
        @click="handleReply(post.userId)"
      >Reply</el-button>
    </div>
    <div class="reply">
      <ReplyItem
        v-for="item in replys"
        :key="item.id"
        :data="item"
        v-on:click.native="handleReply(item.fromId)"
      ></ReplyItem>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      :total="total"
    ></el-pagination>
    <el-dialog title="Reply" :visible.sync="replyDialog" width="30%">
      <el-form :model="form">
        <el-form-item label="回复">
          <el-input v-model="form.content" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="replyDialog = false">取 消</el-button>
        <el-button type="primary" @click="sendReply">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ReplyItem from "components/replyitem";
import { getPostById } from "api/bbs/post";
import { replyPost, getReplyCount, getReply } from "api/bbs/postreply";
export default {
  components: {
    ReplyItem
  },
  data() {
    return {
      replyDialog: false,
      post: {
        username: "",
        title: "",
        content: ""
      },
      currentReply: "",
      form: {
        content: ""
      },
      replys: [],
      currentPage: 1,
      total: 0,
      pageSize: 4
    };
  },
  async mounted() {
    await this.getPostInfo();
    await this.updateCount();
    await this.updateReply({ page: 1, size: this.pageSize });
  },
  methods: {
    handleReply(from) {
      this.currentReply = from;
      this.replyDialog = true;
    },
    async getPostInfo() {
      const res = await getPostById(this.$route.params.postid);
      this.post = res.data.data;
    },
    async handleCurrentChange() {
      await this.updateReply(
        { page: this.currentPage, size: this.pageSize },
        this.post.id
      );
    },
    async updateReply(config) {
      const res = await getReply(config, this.post.id);
      this.replys = res.data.data;
    },
    async updateCount() {
      const res = await getReplyCount(this.post.id);
      this.total = res.data.data;
    },
    async sendReply() {
      const res = await replyPost({
        postId: this.post.id,
        toId: this.currentReply,
        content: this.form.content
      });
      await this.updateReply({ page: 1, size: this.pageSize });
      await this.updateCount();
      this.form.content = "";
      this.replyDialog = false;
    }
  }
};
</script>

<style scoped>
.secondarea {
  min-height: calc(100vh - 270px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contentwrap {
  white-space: normal;
  text-overflow: ellipsis;
}

.maincotent {
  flex-shrink: 0;
  width: 100%;
  margin: 0.5rem;
  padding: 0.5rem;
}

.reply {
  flex-shrink: 0;
  width: 100%;
}

.replybutton {
  flex-shrink: 0;
  width: 100%;
}
</style>
