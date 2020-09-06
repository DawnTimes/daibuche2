<template>
  <div class="addmain">
    <p class="title">新增用户</p>
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
              <el-form-item label="登录名" prop="username">
                <el-input type="age" v-model="numberValidateForm.username" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item label="姓名" prop="label">
                <el-input type="age" v-model="numberValidateForm.label" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item label="角色" prop="role">
                <el-select v-model="numberValidateForm.role" placeholder="请选择角色" multiple clearable>
                  <el-option
                    v-for="item in options"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item label="状态" prop="delFlag">
                <el-select
                  v-model="numberValidateForm.delFlag"
                  placeholder="请选择状态"
                  clearable
                  value="0"
                >
                  <el-option label="有效" value="0"></el-option>
                  <el-option label="无效" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
              <!-- <div style="clear:both"></div> -->
              <el-form-item class="btnitem">
                <el-button type="primary" @click="comfirmbtn" :loading="loading">确定</el-button>
                <router-link to="/uermanage">
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
import axios2 from 'axios';
export default {
  components: {},
  data() {
    return {
      options: [],
      options2: [],
      numberValidateForm: {
        username: '',
        label: '',
        // phone: '',
        // deptName: '',
        role: [],
        delFlag: '',
      },
      loading: false,

      rules: {
        username: [
          { required: true, message: '登录名不能为空', trigger: 'blur' },
        ],
        label: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        role: [{ required: true, message: '角色不能为空', trigger: 'change' }],
        delFlag: [{ required: true, message: '状态不能为空', trigger: 'blur' }],
      },
    };
  },
  methods: {
    comfirmbtn() {
      this.$refs['numberValidateForm'].validate((valid) => {
        if (valid) {
          // 验证通过
          // 提交数据
          //   增加：/user Post请求
          let url = common.userUrl;
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
                    username: '',
                    label: '',
                    role: [],
                    delFlag: '',
                  });
                  _this.$router.push({ path: '/uermanage' });
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
                this.$alert('新增失败，该用户名已存在，请重新填写!', '提示', {
                  confirmButtonText: '确定',
                });
              }
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getDropDownData() {
      // 获取部门和角色下拉框中的数据
      /*         axios.get(common.treeUrl, {}).then(res => {
            this.options2 = res[0].children
        })   */

      axios.get(common.allRoleUrl, {}).then((res) => {
        this.options = res;
      });
    },
  },

  created() {
    this.getDropDownData();
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
  margin-top: 5%;
  width: 100% !important;
  text-align: center;
}
.addmain .btnitem .el-form-item__content {
  margin-left: 0 !important;
}
</style>
