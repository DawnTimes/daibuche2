<!--
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:48
 * @LastEditTime: 2020-09-01 17:02:47
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\system\editPassword.vue
-->
<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="18" :md="16" :lg="12" :xl="10">

        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户原密码" prop="oldPassword">
            <el-input maxlength="30" type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户新密码" prop="newPassword">
            <el-input maxlength="30" type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input
              maxlength="30"
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="loginLoading">提交</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import _ from 'lodash';

import { mapState, mapMutations } from "vuex";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loginLoading: false,
      ruleForm: {
        newPassword: '',
        oldPassword: '',
        checkPass: ''
      },
      rules: {
        oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },

  computed: {
    // 从store中获取用户名
    ...mapState({
      userId: store => store.userId,
      // 菜单列表
      menuList: store => store.asideInfo,
    })
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formDatas = new FormData();
          formDatas.append('newPassword', this.ruleForm.newPassword);
          formDatas.append('oldPassword', this.ruleForm.oldPassword);
          formDatas.append('userName', this.userId);

          let url = common.editPasswordUrl;
          this.loginLoading = true;

          axios.post(url, formDatas).then(res => {
              if (res.status === 'SUCCEED') {
                this.$notify.success({
                  title: '温馨提示！',
                  message: '密码修改成功！',
                  duration: 1500,
                });
                this.loginLoading = false;

                // 跳转页面,重新登录
                // const path = () => {
                //   if (this.menuList.length > 0 && this.menuList[0].children.length > 0) {
                //     return this.menuList[0].children[0].path
                //   } else {
                //     return '/common'
                //   }
                // }
                
                setTimeout(() => {
                  this.$router.push({
                  // path: path()
                  path: '/'
                })
                }, 2500);
                
              } else {
                this.loginLoading = false;
                this.$notify.error({
                  title: '温馨提示！',
                  message: res.errorMessage || '密码修改失败!',
                  duration: 1500,
                });
              }
            })
            .catch(error => {
              this.loginLoading = false;
              this.$notify.error({
                title: '温馨提示！',
                message: '密码修改失败!',
                duration: 3000,
              });
            });
        } else {
          this.$notify.warning({
            title: '温馨提示',
            message: '请正确填写表单!',
            duration: 1500,
          });
          return;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 20px;
  margin-left: 20px;
}
// .el-button {
//   margin-left: 30%;
// }
.el-input {
  width: calc(100% - 120px);
}

.btnClass {
  text-align: center;
  display: flex;
  justify-content: center;
  .el-button {
    margin: 0px 15px;
  }
}
</style>