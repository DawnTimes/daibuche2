<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120">
      <el-form-item label="用户原密码" prop="pass">
        <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="用户新密码" prop="newpass">
        <el-input v-model="ruleForm.newpass" placeholder="请输入新密码" id="newkey" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码" prop="checknewpass">
        <el-input
          v-model="ruleForm.checknewpass"
          placeholder="请再次输入新密码"
          id="newkey1"
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form>
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import axios2 from 'axios';

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.newpass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        newpass: '',
        checknewpass: '',
      },
      params: {
        newPassword: '',
        oldPassword: '',
        userName: '',
      },
      rules: {
        pass: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newpass: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        checknewpass: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formDatas = new FormData();
          formDatas.append('newPassword', this.ruleForm.newpass);
          formDatas.append('oldPassword', this.ruleForm.pass);
          formDatas.append('userName', this.$store.state.userId);

          let url = common.editPasswordUrl;

          axios2
            .post(url, formDatas)
            .then((res) => {
              console.log(res);
              if (res.data.status === 'SUCCEED') {
                this.$alert('修改成功!', '提示', { confirmButtonText: '确定' });
              } else {
                console.log(res.errorMessage);
                this.$alert(res.data.errorMessage, '提示', {
                  confirmButtonText: '确定',
                });
              }
            })
            .catch((error) => {
              this.$alert('修改失败，请联系管理员', '提示', {
                confirmButtonText: '确定',
              });
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
.el-form {
  margin-top: 20px;
  margin-left: 20px;
}
.el-button {
  margin-left: 30%;
}
.el-input {
  width: 30%;
}
</style>