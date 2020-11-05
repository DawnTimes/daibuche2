<template>
  <div class="addmain">
    <p class="title">新增角色</p>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="16">
        <el-form
          :model="numberValidateForm"
          ref="numberValidateForm"
          label-width="100px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-row :gutter="0">
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item label="角色代码" prop="roleCode">
                <el-input v-model="numberValidateForm.roleCode" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="numberValidateForm.roleName" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="numberValidateForm.roleDesc" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
              <!-- <div style="clear:both"></div> -->
              <el-form-item class="btnitem">
                <el-button type="primary" @click="comfirmbtn" :loading="loading">确定</el-button>
                <router-link to="/authlist">
                  <el-button style="margin-left:2%" plain>返回</el-button>
                </router-link>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
export default {
  components: {},
  data() {
    return {
      numberValidateForm: {
        roleName: '',
        roleCode: '',
        roleDesc: '',
      },
      loading: false,
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
        ],
        roleCode: [
          { required: true, message: '角色代码不能为空', trigger: 'blur' },
        ],
        roleDesc: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    comfirmbtn() {
      this.$refs['numberValidateForm'].validate((valid) => {
        if (valid) {
          // 验证通过
          let url = common.roleUrl;
          this.loading = true;
          axios
            .post(url, this.numberValidateForm)
            .then((res) => {
              if (res.status === 'SUCCEED') {
                this.loading = false;
                let _this = this;
                _this.$message({
                  message: '操作成功!',
                  type: 'success',
                  duration: 1500,
                });

                setTimeout(function () {
                  Object.assign(_this.numberValidateForm, {
                    roleName: '',
                    roleCode: '',
                    roleDesc: '',
                  });
                  _this.$router.push({ path: '/authlist' });
                }, 1500);
              } else {
                this.loading = false;
                this.$alert('添加失败，请联系管理员!', '提示', {
                  confirmButtonText: '确定',
                });
              }
            })
            .catch((error) => {
              this.loading = false;
              if (error.message.includes('ORA-00001')) {
                this.$alert('新增失败，该角色已存在，请重新填写!', '提示', {
                  confirmButtonText: '确定',
                });
              }
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.addmain {
  padding: 30px;
  background: #fff;
}
.addmain .el-select {
  width: 100%;
}
.addmain .el-form-item {
  /* width: 34%; */
}
.addmain .title {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}
.addmain .el-form-item__label {
  text-align: center;
  background: #f8f8f9 !important;
}
.btnitem {
  width: 100% !important;
  text-align: center;
}
.addmain .btnitem .el-form-item__content {
  margin-left: 0 !important;
}
</style>
