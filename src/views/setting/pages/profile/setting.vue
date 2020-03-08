<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本资料" name="first">
        <el-form :model="basicform" ref="basic" label-width="80px">
          <el-form-item label="Edit">
            <el-button type="primary" @click="disabled = !disabled">Edit</el-button>
          </el-form-item>
          <el-form-item label="UserName">
            <el-input v-model="basicform.username" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="basicform.email" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item v-show="!disabled">
            <el-button type="primary" @click="updateForm('basic')">Update</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="密码管理" name="second">
        <el-form :model="passwordform" :rules="passwordrules" ref="passform" label-width="200px">
          <el-form-item label="Old Password" prop="oldpass">
            <el-input v-model="passwordform.oldpass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="New Password" prop="pass">
            <el-input v-model="passwordform.pass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="Confirm New Password" prop="checkpass">
            <el-input v-model="passwordform.checkpass" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateForm('passform')">Update</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="头像管理" name="third">
        <div class="avataredit">
          <el-upload
            class="avatar-uploader"
            action="/profile"
            :http-request="upload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { baseUrl } from "@/utils/config";
import { uploadAvatar } from "api/upload/upload";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.passwordform.checkpass !== "") {
          this.$refs.passform.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordform.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      disabled: true,
      passwordform: {
        oldpass: "",
        pass: "",
        checkpass: ""
      },
      activeName: "first",
      imageUrl: "",
      baseUrl: baseUrl,
      passwordrules: {
        oldpass: [{ validator: validatePass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkpass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  computed: {
    basicform() {
      return this.$store.state.account;
    }
  },
  methods: {
    handleClick(tab, event) {},
    async updateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userinfo = null;
          userinfo =
            formName === "basic"
              ? this.basicform
              : { password: this.passform.pass };
          this.$store.dispatch("changeUserInfo", userinfo);
          this.disabled = true;
        }
      });
    },
    async upload(file) {
      const res = await uploadAvatar(file);
      console.log(res);
      this.imageUrl = res.data.data + "?r=" + Math.random();
      await this.$store.dispatch("updateAvatar", {});
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avataredit {
  display: flex;
  flex-direction: row;
}

.avatar {
  height: 200px;
  width: 200px;
}
</style>
