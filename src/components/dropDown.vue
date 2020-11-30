<!--
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:47
 * @LastEditTime: 2020-11-25 16:27:36
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\components\dropDown.vue
-->
<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link dropspan" style="color:#FFF">
      {{userName}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
      <el-dropdown-item command="logout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'dropDown',
  data() {
    return {
      userName: '',
    };
  },
  computed: {
    ...mapState(['personName']),
  },
  created() {
    this.userName = this.personName;
  },
  methods: {
    ...mapMutations({
      setRoles: 'setRoles',
      setUserId: 'setUserId',
      setPersonName: 'setPersonName',
      setAsideInfoIds: 'setAsideInfoIds',
      setAsideInfo: 'setAsideInfo',
      setDropCol: 'setDropCol',
    }),
    
    handleCommand(command) {
      if (command === 'logout') {
        // 退出
        this.$confirm('是否确定退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 清除信息
            let url = common.logoutUrl;
            axios.post(url, {}).then(res => {
              if (res.ec === '0') {
                // 退出成功
                this.$router.push('/');
                // 清除sessionStorage 和 vuex 的sessionStorage, 避免切换用户获取菜单失败时，依然保留上个用户的菜单数据
                  sessionStorage.clear();
                  // localStorage.removeItem('tableHeader');
                  localStorage.removeItem('dropCol');
                  this.setRoles(null);
                  this.setUserId(null);
                  this.setPersonName(null);
                  this.setAsideInfoIds(null);
                  this.setAsideInfo(null);

                  // console.log(12345);

              } else {
                // this.$alert("退出失败，请联系管理员", "提示！", {
                //   confirmButtonText: "确定"
                // });
                this.$notify.error({
                  title: '温馨提示！',
                  message: '退出失败，请联系管理员!'
                });
              }
            });
          })
          .catch(() => {});
      }
      if (command === 'updatePassword') {
        this.$router.push({
          path: '/editPassword',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/mixin.scss';
</style>
