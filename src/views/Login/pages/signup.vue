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
          <span>Log in using your existing account information.</span>
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
          <span>
            A user name and password will be emailed to you on completion of
            this transaction. Please enter your primary email to continue.
          </span>
        </div>
        <div class="operate">
          <el-form :model="form" ref="form" :rules="rules">
            <el-form-item prop="email">
              <el-input placeholder="请输入邮箱" v-model="form.email">
                <template slot="prepend">Email</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入密码" v-model="form.password" type="password">
                <template slot="prepend">Password</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入用户名" v-model="form.username">
                <template slot="prepend">Username</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-radio v-model="form.role" label="student">学生</el-radio>
              <el-radio v-model="form.role" label="teacher">教师</el-radio>
              <el-button type="primary" @click="Signup">SIGNUP</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signup } from "@/api/account/account";
import { validateEmail } from "@/utils/utils";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        username: "",
        role: "student"
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    Login() {
      this.$router.push({ path: "/login" });
    },
    async Signup() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          const res = await signup({
            username: this.form.username,
            email: this.form.email,
            role: this.form.role,
            password: this.form.password
          });
          this.Login();
        } else {
          return false;
        }
      });
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

.topbar > span {
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