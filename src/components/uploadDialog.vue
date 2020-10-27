<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 11:25:57
 * @LastEditTime: 2020-10-26 14:29:14
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
        action="uploadURL()"
        :on-remove="handleRemove"
        multiple
        :limit="1"
        accept=".xlsx, .xls"
        :auto-upload="false"
        :on-exceed="handleExceed"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :before-upload="beforeAvatarUpload"
        :on-change="onChange"
        :file-list="fileList"
        :http-request="uploadSectionFile"
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
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';

export default {
  name: '',
  props: {
    // fileList: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   },
    // },
    
    uploadURLStr: {
      type: String,
      default: () => {
        return ''
      }
    },

    // 上传成功的状态
  },
  components: {},
  data() {
    return {
      uploadFormVisible: false,
      loading: false,
      fileList: [],
      // 上传成功时设置状态
    };
  },
  computed: {
    // ...mapState({
    //   successStatus: store => store.successStatus
    // }),
    
  },
  watch: {
    uploadFormVisible(newVal) {
      if (newVal == false) {
        this.fileList = [];
      }
    }
  },
  created() {
    console.log(this.fileList);
  },
  mounted() {
    console.log(this.fileList);
  },
  methods: {
    ...mapMutations({
      setSuccessStatus: 'setSuccessStatus'
    }),

    // 上传URL
    uploadURL() {
      // const baseUrl = 'http://192.166.87.131:8083/api';
      // console.log(baseUrl + this.uploadURLStr);
      return '/api' + this.uploadURLStr
    },
    // 立即上传
    submitUpload() {
      // console.log(this.fileList);
      if (this.fileList.length === 0){
          this.$message.warning('请先上传文件');
        } else {
          this.loading = true;
          this.$refs.upload.submit();
        }
      
    },

    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, fileList) {
      // console.log(file, fileList);
      this.fileList = fileList;
    },

    // 上传成功
    handleAvatarSuccess(res, file, fileList) {
      // console.log(res, file, fileList);
      this.$message.success(res);
      this.loading = false;
      this.uploadFormVisible = false;
      // this.successStatus = true;
      // 更新上传成功的状态
      this.setSuccessStatus(true);
      // this.$store.commit('setSuccessStatus', true);

    },

    // 上传失败
    handleAvatarError(err, file, fileList) {
      // console.log(JSON.parse(err.message));
      this.loading = false;
      this.$message.error(JSON.parse(err.message) || '上传错误，请重试');
    },

    // 上传之前判断文件格式 大小
    beforeAvatarUpload(file) {
      // console.log(file);
      // 格式
      const isXLS = file.name.substring(file.name.lastIndexOf('.') + 1) === 'xls';
      const isXLSX = file.name.substring(file.name.lastIndexOf('.') + 1) === 'xlsx';

      // 大小
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isXLS && !isXLSX) {
        this.$message.error('上传的文件是能是xlsx或xls格式!');
        this.loading = false;
      }
      if (!isLt10M) {
        this.$message.error('上传的文件大小不能超过 10MB!');
        this.loading = false;
      }
      return (isXLS || isXLSX) && isLt10M;
    },

    // 删除
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.loading = false;
      this.fileList = fileList;
    },

    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$notify.warning({
        title: '温馨提示',
        message: '每次限制上传 1 个文件',
        duration: 2500
      });
    },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.uploadFormVisible = isVisible;
    },

    // 覆盖默认的上传行为，可以自定义上传的实现
    uploadSectionFile(params) {
      // console.log(params);
      const file = params.file;
        // fileType = file.type,
        // isImage = fileType.indexOf("image") != -1,
        // isLt2M = file.size / 1024 / 1024 < 2;
      // 这里常规检验，看项目需求而定
      // if (!isImage) {
      //   this.$message.error("只能上传图片格式png、jpg、gif!");
      //   return;
      // }
      // if (!isLt2M) {
      //   this.$message.error("只能上传图片大小小于2M");
      //   return;
      // }
      // 根据后台需求数据格式
      const form = new FormData();
      // 文件对象
      form.append("file", file);
      // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
      // form.append("clientType", 'xxx');
      // 项目封装的请求方法，下面做简单介绍
      const url = this.uploadURLStr;
      axios.post(url, form)
        .then(res => {
          // console.log(res);
          //自行处理各种情况
          if (res.ec === '0') {
            this.$notify.success({
              title: '温馨提示！',
              message: '上传成功!'
            });
            this.loading = false;
            this.uploadFormVisible = false;
            // this.fileList = [];
          } else {
            this.loading = false;
            this.$notify.error({
              title: '温馨提示！',
              message: res.em || res.error || res.message || '上传错误，请重试!'
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          // this.fileList = [];
          // console.log(err);
          this.$notify.error({
            title: '温馨提示！',
            message: err.em || err.error || err.message || '上传错误，请重试!'
          });
        });
    } 
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

