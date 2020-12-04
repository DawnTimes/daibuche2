<template>
  <div class="login">
    <div class="top"></div>
    <div class="box">
      <img src="~@/assets/images/logo1.png" />
      <p class="title">代步车运营管理系统</p>
      <!-- <div class="other">
        <input
          type="text"
          id="uname"
          class="username"
          v-model="loginForm.userName"
          placeholder="请输入账号"
        />
        <i class="icon iconfont iconyonghuming"></i>
        <i class="icon iconfont icon-yonghuming"></i>
      </div>
      <div class="other">
        <input
          type="password"
          id="pword"
          class="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
        />
        <i class="icon iconfont iconmima"></i>
        <i class="icon iconfont icon-ziyuanxhdpi"></i>
      </div>-->
      <!-- <div class="other">
                 <input type="text" class="yzm fl" v-model="loginForm.yzm" placeholder="请输入验证码"/>
                <div class="pic fr" @click="getIdentifyingCode">
                  <img id="imgIdentifyingCode"  alt="点击更换" title="点击更换" style="cursor: pointer"/>
                </div>                 
      </div>-->
      <!-- <el-button class="btn" @click="loginSubmit()" id="tlogin" :loading="loginLoading">登录</el-button> -->

      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="rules"
        class="demo-ruleForm"
        size="medium"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            maxlength="30"
            prefix-icon="iconfont icon-yonghuming"
            placeholder="请输入账号"
            @keyup.enter.native="loginSubmit('loginForm')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            maxlength="30"
            prefix-icon="iconfont icon-ziyuanxhdpi"
            placeholder="请输入密码"
            @keyup.enter.native="loginSubmit('loginForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="loginSubmit('loginForm')"
            :loading="loginLoading"
            style="width: 100%;"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import common from '@/common/common.js';
// import axios from 'axios';
import axios from '@/common/axios.js';
import _ from 'lodash';

export default {
  data() {
    return {
      loginLoading: false,
      loginForm: {
        userName: '',
        password: '',
        yzm: '',
        deviceID: '',
      },
      // userToken:""
      deviceID: '',

      rules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },

      menuList: [],
    };
  },
  created() {
    // 进入登录时清除掉原有的tabs导航标签
    sessionStorage.removeItem('tagsArr');

    document.addEventListener('keydown', this.whenKeyDown);
  },

  destroyed() {
    document.removeEventListener('keydown', this.whenKeyDown);
  },
  methods: {
    ...mapMutations(['changeLogin', 'setRoles', 'setUserId', 'setPersonName', 'setAsideInfo', 'setAsideInfoIds']),
    whenKeyDown(event) {
      if (event.keyCode === 13) {
        this.loginSubmit();
      }
    },
    loginSubmit(formName) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let formData = new FormData();
          formData.append('userName', this.loginForm.userName);
          formData.append('password', this.loginForm.password);
          formData.append('client', 'client1');
          formData.append('client-secret', '123456');
          formData.append('deviceID', this.loginForm.deviceID);
          formData.append('authtype', 'pc');
          formData.append('validCode', this.loginForm.yzm);
          formData.append('currentBusinessCode', '1234321');
          let url = common.loginUrl;
          this.loginLoading = true;
          axios
            .post(url, formData)
            .then((res) => {
              // console.log(res);
              if (res.ec === '1002') {
                this.loginLoading = false;
                this.$notify.error({
                  title: '温馨提示',
                  message: res.em || '登录失败，请重新登录！',
                  duration: 3000,
                });
                // 错误之后刷新一下验证码
                // this.getIdentifyingCode();
              } else if (res.ec === 'H00766') {
                this.loginLoading = false;
                this.$notify.error({
                  title: '温馨提示',
                  message: '登录失败，用户名或密码错误，请重新登录！',
                  duration: 3000,
                });
              } else {
                this.$notify.success({
                  title: '温馨提示',
                  message: '登录成功！',
                  duration: 1500,
                });
                this.loginLoading = false;
                // 把角色的值存进去
                let roles = [];
                if (res.roles) {
                  res.roles.forEach((obj, index) => {
                    roles.push(obj.roleName);
                  });
                }
                roles = roles.join();

                this.setRoles(roles);
                this.setUserId(res.userId);
                this.setPersonName(res.session_customerNameCN);

                // 登录成功是清除掉原有的tabs导航标签
                sessionStorage.removeItem('tagsArr');

                // this.getUserMenuList();

                this.$router.push('/common');
              }
            })
            .catch((err) => {
              this.loginLoading = false;
              this.$notify.error({
                title: '温馨提示',
                message: err.em || err.error || '登录失败，请重新登录！',
                duration: 3000,
              });
            });
        }
      });
    },
    getIdentifyingCode() {
      this.loginForm.deviceID = common.guid();
      let objs = document.getElementById('imgIdentifyingCode');
      objs.src =
        'http://192.166.87.119:8888/carmanage-auth/code/' +
        this.loginForm.deviceID;
    },

    // 获取用户菜单
    getUserMenuList() {
      let url = '';
      if (this.userId === 'admin') {
        url = common.allTreeUrl;
      } else {
        url = common.userMenuUrl;
      }

      const roles = {
        roles: this.roles
      };
      axios.get(url, roles).then(res => {
        // console.log(res)
        // this.setAsideInfo(res.menus)
        // this.setAsideInfoIds(res.ids)

        // 对菜单数据根据id进行排序
        const menusArr = res.menus;
        if (!_.isEmpty(menusArr)) {
          this.menuList = menusArr.sort(this.sortUp);

          this.menuList.forEach(val => {
            if (!_.isEmpty(val.children)) {
              val = val.children.sort(this.sortUp);
            }
          });
        }
        // console.log(this.menuList);

        // this.$store.commit('setAsideInfo', this.menuList);
        // this.$store.commit('setAsideInfoIds', res.ids);

        this.setAsideInfo(this.menuList);
        this.setAsideInfoIds(res.ids);
        // console.log(123333);

        // sessionStorage.setItem('asideInfo', JSON.stringify(res.data.menus));
        // sessionStorage.setItem('asideInfoIds', JSON.stringify(res.data.ids));

        // this.menuList = res.menus
      });
    },

    // 升序排序
    sortUp(x, y) {
      return x.sort - y.sort;
    }
  },
  mounted() {
    // this.getIdentifyingCode()
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/mixin.scss';
.login {
  height: 100%;
  width: 100%;
  .top {
    height: 480px;
    background: url('~@/assets/images/login.png') no-repeat center;
    background-size: cover;
    text-align: center;
  }
  .box {
    width: 360px;
    height: 250px;
    background: #fff;
    padding: 15px;
    position: absolute;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 2px 2px 6px rgba(136, 136, 136, 0.5);
    top: 50%;
    left: 50%;
    margin-top: -185px;
    margin-left: -180px;
    text-align: center;
    & > img {
      position: absolute;
      top: -160px;
      left: 50%;
      margin-left: -75px;
      width: 200px;
    }
    .title {
      height: 60px;
      line-height: 60px;
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 22px;
    }
    .username,
    .password,
    .yzm {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 1;
      outline: none;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
      margin-bottom: 22px;
      text-indent: 15px;
    }
    .yzm {
      width: 60%;
      text-indent: 0;
    }
    .other {
      overflow: hidden;
      position: relative;
      .pic {
        display: inline-block;
        width: 35%;
        height: 40px;
      }
      .icon-yonghuming,
      .icon-ziyuanxhdpi {
        left: 10px;
        position: absolute;
        top: 12px;
      }
    }
    .btn {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      border-color: #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: 0.1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>
