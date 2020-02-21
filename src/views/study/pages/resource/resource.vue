<template>
  <div>
    <FileManage @upload="upload">
      <template v-for="file in fileList">
        <FileItem :file="file" :key="file.id" v-if="!file.children">
          <div>
            <Icon :iconClass="file.type"> {{ file.name }}</Icon>
          </div>
        </FileItem>
        <ReSubItem v-else :key="file.id" :data="file"></ReSubItem>
      </template>
    </FileManage>
    <el-dialog
      title="上传文件"
      :visible.sync="uploadDialog"
      width="80%"
      @open="doFilter"
    >
      <div>
        <div style="padding:0.5rem;">
          <p>
            <span>当前路径: {{ currentPath }}</span>
          </p>
          <el-tree
            :data="fileList"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            ref="tree"
          >
          </el-tree>
        </div>
        <div style="padding:0.5rem;">
          <el-upload
            action="/resource"
            :http-request="uploadFile"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :before-upload="BeforeUpload"
            :file-list="uploadFiles"
            :limit="1"
            multiple
          >
            <el-button size="small" type="primary">上传文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="primary"
              @click.stop="openFolderDialog"
              >新建文件夹</el-button
            >
          </el-upload>
        </div>
        <div>
          <el-dialog
            title="新建文件夹"
            :visible.sync="folderDiaglog"
            width="80%"
            append-to-body
          >
            <el-form :model="form" ref="form">
              <el-form-item label="文件夹名">
                <el-input v-model="form.folderName"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer">
              <el-button @click="folderDiaglog = false">取 消</el-button>
              <el-button type="primary" @click="addNewFoler">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="uploadDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmupload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FileManage from "components/fileSystem/FileManage";
import FileItem from "components/fileSystem/FileItem";
import ReSubItem from "components/fileSystem/ReSubItem";
import Icon from "components/iconfont";
import {
  getResourceTree,
  addNewFolder,
  preUpload,
  preRemove
} from "api/resource/resource";
import { uploadResource } from "api/upload/upload";
export default {
  components: {
    FileManage,
    FileItem,
    ReSubItem,
    Icon
  },
  data() {
    return {
      fileList: [],
      uploadFiles: [],
      uploadDialog: false,
      folderDiaglog: false,
      form: {
        folderName: ""
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      currentPath: "",
      currentFile: null
    };
  },
  async mounted() {
    await this.getResource();
  },
  methods: {
    async getResource() {
      const res = await getResourceTree(this.$route.params.id);
      this.fileList = res.data.data.resourceTree;
    },
    upload() {
      this.uploadDialog = true;
    },
    download(file) {
      console.log(file);
    },
    async confirmupload() {
      await uploadResource(
        this.currentFile,
        this.$route.params.id,
        this.currentPath
      );
      await this.getResource();
      this.uploadDialog = false;
    },
    doFilter() {
      this.$nextTick(function() {
        this.$refs.tree.filter();
      });
    },
    handleNodeClick(data) {
      this.currentPath = data.path;
    },
    filterNode(value, data) {
      return data.type === "folder";
    },
    async uploadFile(file) {
      this.currentFile = file;
      let type = file.file.name;
      type = type.replace(/.+\./, "");
      const res = await preUpload({
        courseId: this.$route.params.id,
        fileName: file.file.name,
        path: this.currentPath,
        type: type
      });
    },
    async addNewFoler() {
      const res = await addNewFolder({
        courseId: this.$route.params.id,
        folderName: this.form.folderName,
        path: this.currentPath
      });
      if (res.data.success) {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        await this.getResource();
      }
      this.folderDiaglog = false;
      this.uploadDialog = false;
    },
    openFolderDialog() {
      if (this.currentPath === "") {
        this.$message({
          message: "当前路径为空",
          type: "warning"
        });
      } else {
        this.folderDiaglog = true;
      }
    },
    async handleRemove(file, fileList) {
      const res = await preRemove({
        path: this.currentPath,
        fileName: file.name,
        courseId: this.$route.params.id
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    BeforeUpload(file) {
      const canResolve = new Set([
        "image/png",
        "image/jpg",
        "image/gif",
        "text/plain"
      ]);
      if (this.currentPath === "") {
        this.$message({
          message: "当前路径为空",
          type: "warning"
        });
      }
      if (canResolve.has(file.type)) {
        this.$message({
          message: "不支持所选类型",
          type: "warning"
        });
      }
      return this.currentPath !== "" && !canResolve.has(file.type);
    }
  }
};
</script>

<style></style>
