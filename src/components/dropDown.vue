<!--
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:47
 * @LastEditTime: 2020-11-09 14:15:23
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
                  localStorage.removeItem('rowCol');
                  localStorage.removeItem('dropCol');
                  this.setRoles(null);
                  this.setUserId(null);
                  this.setPersonName(null);
                  this.setAsideInfoIds(null);
                  this.setAsideInfo(null);

                  // let dropCol = [
                  //   { label: '承租人/牌照商', prop: 'name', width: '200px' },
                  //   { label: '合同编号', prop: 'contractNumber', width: '160px' },
                  //   { label: '合同名称', prop: 'contractName', width: '150px' },
                  //   { label: '合同状态', prop: 'contractNormalStatus', width: '80px' },
                  //   { label: '合同类型', prop: 'contractType', width: '100px' },
                  //   { label: '上牌地', prop: 'cityName', width: '80px' },
                  //   { label: '是否限牌', prop: 'isLimitLicence', width: '80px' },
                  //   { label: '是否租赁公司', prop: 'isGalcCompany', width: '100px' },
                  //   { label: '期数', prop: 'nper', width: '80px' },
                  //   { label: '租赁方式', prop: 'leaseWay', width: '80px' },
                  //   { label: '车辆数量', prop: 'num', width: '80px' },
                  //   { label: '起租日', prop: 'batchStartingDate', width: '150px' },
                  //   { label: '支付日', prop: 'payDate', width: '150px' },
                  //   { label: '核销状态', prop: 'repaymentStatus', width: '80px' },
                  //   { label: '应收金额', prop: 'dueAmount', width: '160px' },
                  //   { label: '应收本金', prop: 'duePrincipal', width: '160px' },
                  //   { label: '应收利息', prop: 'dueinterest', width: '160px' },
                  //   { label: '应收管理费', prop: 'dueManagementFee', width: '160px' },
                  //   { label: '应收手续费', prop: 'dueCommission', width: '160px' },
                  //   { label: '已收金额', prop: 'receivedAmount', width: '160px' },
                  //   { label: '已收本金', prop: 'receivedPrincipal', width: '160px' },
                  //   { label: '已收利息', prop: 'receivedInterest', width: '160px' },
                  //   { label: '已收管理费', prop: 'receivedManagementFee', width: '160px' },
                  //   { label: '已收手续费', prop: 'receivedCommission', width: '160px' },
                  //   { label: '未收金额', prop: 'outstandingAmount', width: '160px' },
                  //   { label: '未收本金', prop: 'outstandingPrincipal', width: '160px' },
                  //   { label: '未收利息', prop: 'outstandingInterest', width: '160px' },
                  //   { label: '未收管理费', prop: 'outstandingManagementFee', width: '160px' },
                  //   { label: '未收手续费', prop: 'outstandingCommission', width: '160px' },
                  // ];
                  // this.setDropCol(dropCol);
                  console.log(12345);

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
