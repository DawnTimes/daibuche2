<template>
    <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link dropspan" style="color:#FFF">
            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import axios from "@/common/axios.js"
import common from "@/common/common.js";
import { mapState, mapMutations } from 'vuex';
export default{
    name:'dropDown',
    data() {
        return {
            userName:''
        }
    },
    computed: {
      ...mapState(['personName'])
    },  
    created() {
      this.userName = this.personName
    },      
    methods: {
      handleCommand(command) {
          if (command === 'logout') {
              // 退出
              // 清除信息
                let url = common.logoutUrl;
                axios.post(url, {}).then(res => {
                    if (res.ec === '0') {
                        // 退出成功
                        this.$router.push('/')
                    } else {
                        this.$alert('退出失败，请联系管理员', '提示！', {confirmButtonText: '确定'})
                    }
                })
                
          }
          if (command === 'updatePassword') {
            this.$router.push({
                path: "/editPassword"
            })           
          }
      }
    }    
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/mixin.scss";

</style>
