<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 11:25:57
 * @LastEditTime: 2020-08-19 15:23:05
 * @LastEditors: your name
 * @Description: 文件上传弹窗
 * @FilePath: \webcode2\src\components\uploadDialog.vue
-->

<template>
  <div class="uploadDialog">
    <el-dialog
      width="30%"
      :close-on-click-modal="false"
      title="上传文件"
      :visible.sync="uploadFormVisible"
    >
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="uploadURL()"
        :on-remove="handleRemove"
        multiple
        :limit="1"
        accept=".xlsx, .xls"
        :auto-upload="true"
        :on-exceed="handleExceed"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">选取文件</el-button>
        <span slot="tip" class="el-upload__tip" style="padding-left: 10px; color: red">提示：只能上传xlsx/xls文件，且不超过10M</span>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadFormVisible = false" plain size="medium">取 消</el-button>
        <el-button type="primary" @click="submitUpload" :loading="loading" size="medium">立即上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    fileList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {},
  data() {
    return {
      uploadFormVisible: false,
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 上传URL
    uploadURL() {
      return ''
    },
    // 立即上传
    submitUpload() {
      if (this.fileList.length === 0){
          this.$message.warning('请先上传文件');
        } else {
          this.$refs.upload.submit();
        }
      
    },

    // 上传成功
    handleAvatarSuccess(res, file) {
      
    },

    // 上传之前判断文件格式 大小
    beforeAvatarUpload(file) {
      // 格式
      const isXLS = file.name.substring(file.name.lastIndexOf('.') + 1) === 'xls';
      const isXLSX = file.name.substring(file.name.lastIndexOf('.') + 1) === 'xlsx';

      // 大小
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isXLS && !isXLSX) {
        this.$message.error('上传的文件是能是xlsx或xls格式!');
      }
      if (!isLt10M) {
        this.$message.error('上传的文件大小不能超过 10MB!');
      }
      return (isXLS || isXLSX) && isLt10M;
    },

    // 删除
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },

    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$notify.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.uploadFormVisible = isVisible;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
  .uploadDialog {
    .el-dialog {
      min-height: 100px;
      
      .el-dialog__body {
        padding: 10px 20px 30px 10px;
      }

      .dialog-footer {
        text-align: center;
      }
    }
  }
</style>

