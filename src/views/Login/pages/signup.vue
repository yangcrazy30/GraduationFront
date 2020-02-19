<template>
  <div class="loginlayout">
    <header>
      <strong>Student Login</strong>
    </header>
    <div class="lcontent">
      <div class="flexitem">
        <div class="topbar">
          <span>I have an account already</span>
        </div>
        <div class="disrible">
          <span> Log in using your existing account information. </span>
        </div>
        <div class="operate">
          <el-button type="primary" @click="Login">CONTINUE</el-button>
        </div>
      </div>
      <div class="flexitem">
        <div class="topbar">
          <span>I am a new user</span>
        </div>
        <div class="disrible">
          <span>A user name and password will be emailed to you on completion of
            this transaction. Please enter your primary email to continue.</span>
        </div>
        <div class="operate">
          <el-input placeholder="请输入内容" v-model="email">
            <template slot="prepend">Email</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="password" type="password">
            <template slot="prepend">Password</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="username">
            <template slot="prepend">Username</template>
          </el-input>
          <el-radio v-model="role" label="student"">学生</el-radio>
          <el-radio v-model=" role" label="teacher">教师</el-radio>
          <el-button type="primary" @click="Signup">SIGNUP</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { signup } from "@/api/account/account";
  export default {
    data() {
      return {
        email: "",
        password: "",
        username: "",
        role: 'student'
      };
    },
    methods: {
      Login() {
        this.$router.push({ path: "/login" });
      },
      async Signup() {
        await signup({ username: this.username, email: this.email, role: this.role, password: this.password });
        this.Login();
      }
    }
  };
</script>

<style scoped>
  .loginlayout {
    margin: 2rem 5rem;
    height: calc(100vh - 250px);
  }

  .lcontent {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
  }

  .topbar {
    background-color: #5f574f;
    color: white;
    height: 50px;
    border-radius: 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem 1rem;
    padding: 0 1rem;
  }

  .topbar>span {
    font-size: 1.2rem;
  }

  .disrible {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem 1rem;
  }

  .operate {
    margin: 0 1rem;
  }

  .el-input {
    margin: 0.5rem 0;
  }

  .el-button--primary,
  .el-button--primary:hover {
    float: right;
    background: #8c1515;
    color: white;
  }

  .flexitem {
    flex-grow: 1;
    flex-basis: 60rem;
  }
</style>