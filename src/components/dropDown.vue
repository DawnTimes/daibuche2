<!--
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:47
 * @LastEditTime: 2020-11-06 14:02:54
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
                  // localStorage.clear();
                  this.setRoles(null);
                  this.setUserId(null);
                  this.setPersonName(null);
                  this.setAsideInfoIds(null);
                  this.setAsideInfo(null);

                  let dropCol = [
                    { label: '承租人/牌照商', prop: 'name' },
                    { label: '合同编号', prop: 'contractNumber'},
                    { label: '合同名称', prop: 'contractName' },
                    { label: '合同状态', prop: 'contractNormalStatus' },
                    { label: '合同类型', prop: 'contractType' },
                    { label: '上牌地', prop: 'cityName' },
                    { label: '是否限牌', prop: 'isLimitLicence' },
                    { label: '是否租赁公司', prop: 'isGalcCompany' },
                    { label: '期数', prop: 'nper' },
                    { label: '租赁方式', prop: 'leaseWay' },
                    { label: '车辆数量', prop: 'num' },
                    { label: '起租日', prop: 'batchStartingDate' },
                    { label: '支付日', prop: 'payDate' },
                    { label: '核销状态', prop: 'repaymentStatus' },
                    { label: '应收金额', prop: 'dueAmount' },
                    { label: '应收本金', prop: 'duePrincipal' },
                    { label: '应收利息', prop: 'dueinterest' },
                    { label: '应收管理费', prop: 'dueManagementFee' },
                    { label: '应收手续费', prop: 'dueCommission' },
                    { label: '已收金额', prop: 'receivedAmount' },
                    { label: '已收本金', prop: 'receivedPrincipal' },
                    { label: '已收利息', prop: 'receivedInterest' },
                    { label: '已收管理费', prop: 'receivedManagementFee' },
                    { label: '已收手续费', prop: 'receivedCommission' },
                    { label: '未收金额', prop: 'outstandingAmount' },
                    { label: '未收本金', prop: 'outstandingPrincipal' },
                    { label: '未收利息', prop: 'outstandingInterest' },
                    { label: '未收管理费', prop: 'outstandingManagementFee' },
                    { label: '未收手续费', prop: 'outstandingCommission' },
                  ];
                  this.setDropCol(dropCol);
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
