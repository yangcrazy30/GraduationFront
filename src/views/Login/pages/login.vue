<template>
  <div class="loginlayout">
    <div class="operate">
      <header class="litem">Student Login</header>
      <el-input placeholder="请输入内容" v-model="email">
        <template slot="prepend">Email</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="password" show-password>
        <template slot="prepend">Password</template>
      </el-input>
      <div class="btnarea">
        <el-checkbox v-model="Remember" label="Don't Remember Login"></el-checkbox>
        <el-button type="primary" @click="Login">Login</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/account/account";
export default {
  data() {
    return {
      Remember: false,
      email: "",
      password: ""
    };
  },
  async created() {
    await this.$store.dispatch("login", {});
    this.$route.query.redirect && this.$router.push(this.$route.query.redirect);
  },
  methods: {
    async Login() {
      this.$store
        .dispatch("login", { email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ path: "/profile" });
        })
        .catch(error => {
          this.$message({
            message: error,
            type: "error"
          });
        });
    }
  }
};
</script>

<style scoped>
.litem {
  margin: 1rem 0;
}

.el-input {
  margin: 0.5rem 0;
}

.el-button,
.el-button:hover {
  background-color: #8c1515;
}

.loginlayout {
  margin: 2rem 5rem;
  height: calc(100vh - 250px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.operate {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 30%;
}

.btnarea {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
a
