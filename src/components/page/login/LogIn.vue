<template>
    <div class="login">
        <div class="top"></div>
        <div class="box">
             <img src="~@/assets/images/logo1.png" />
            <p class="title">代步车运营管理系统</p>
            <div class="other">
                 <input type="text" id="uname" class="username" v-model="loginForm.userName" placeholder="请输入账号"/>
                 <i class="icon iconfont iconyonghuming"></i>
             </div>
             <div class="other">
                 <input type="password" id="pword" class="password" v-model="loginForm.password" placeholder="请输入密码"/>
                 <i class="icon iconfont iconmima"></i>
             </div>
             <!-- <div class="other">
                 <input type="text" class="yzm fl" v-model="loginForm.yzm" placeholder="请输入验证码"/>
                <div class="pic fr" @click="getIdentifyingCode">
                  <img id="imgIdentifyingCode"  alt="点击更换" title="点击更换" style="cursor: pointer"/>
                </div>                 
             </div> -->
             <button class="btn" @click="login()" id="tlogin">登录</button>
        </div>
       
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import common from "@/common/common.js";
import axios from 'axios'
import axios2 from "@/common/axios.js"
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        password: '',
        yzm:''
      },
      // userToken:""
      deviceID: ''
    };
  },
  created(){
    document.addEventListener('keydown', this.whenKeyDown)
  },  

  destroyed() {
    document.removeEventListener('keydown', this.whenKeyDown)
  },
  methods: {
    ...mapMutations(['changeLogin','setRoles', 'setUserId','setPersonName']),
    whenKeyDown(event) {
      if (event.keyCode === 13) {
        this.login()
      }
    },
    login () {
      let formData = new FormData()
      formData.append('userName', this.loginForm.userName)
      formData.append('password', this.loginForm.password)
      formData.append('client', 'client1')
      formData.append('client-secret', '123456')
      formData.append('deviceID', this.loginForm.deviceID)
      formData.append('authtype', 'pc')
      formData.append('validCode', this.loginForm.yzm)
      formData.append('currentBusinessCode', '1234321')
      let url = common.loginUrl
      axios.post(url, formData).then(res => {
        console.log(res)
        if (res.data.ec === '1002') {
            this.$alert(res.data.em, '登录失败', {confirmButtonText: '确定'})
            // 错误之后刷新一下验证码
            this.getIdentifyingCode()
        } else {
          // 把角色的值存进去
          let roles = []
          res.data.roles.forEach((obj, index) => {
            roles.push(obj.roleName)
          })
          roles = roles.join()

          this.setRoles(roles)
          this.setUserId(res.data.userId)
          this.setPersonName(res.data.session_customerNameCN)
          this.$router.push('/common')
        }
      })      

    },
    getIdentifyingCode() {
      this.loginForm.deviceID = common.guid()
      let objs = document.getElementById("imgIdentifyingCode")
      objs.src = 'http://192.166.87.119:8888/carmanage-auth/code/' + this.loginForm.deviceID        
    },    
  },
  mounted() {
    // this.getIdentifyingCode()
  }
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/mixin.scss';
.login{
    height: 100%;
    width: 100%;
    .top{
        height: 480px;
        background: url('~@/assets/images/login.png') no-repeat center;
        background-size: cover;
        text-align: center;
    }
    .box{
        width: 360px;
        height: 250px;
        background: #fff;
        padding: 15px;
        position:absolute;
        border: 1px solid #eee;
        border-radius: 10px;
        box-shadow: 2px 2px 6px rgba(136,136,136,.5);
        top: 50%;
        left: 50%;
        margin-top: -185px;
        margin-left: -180px;
        text-align: center;
        & > img{
            position:absolute;
            top: -160px;
            left: 50%;
            margin-left: -75px;
            width: 200px;
        }
        .title{
            height: 60px;
            line-height: 60px;
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 22px;
        }
        .username,.password,.yzm{
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
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;
            margin-bottom: 22px;
            text-indent: 15px;
        }
        .yzm{
            width: 60%;
            text-indent: 0
        }
        .other{
           overflow: hidden;
           position: relative;
           .pic{
               display: inline-block;
               width:35%;
               height: 40px;
           }
           .iconyonghuming,.iconmima{
               left: 10px;
                position: absolute;
                top: 12px;
           }
        }
        .btn{
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
            transition: .1s;
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
