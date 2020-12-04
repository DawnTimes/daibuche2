<!--
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:47
 * @LastEditTime: 2020-12-04 09:55:22
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
      <el-dropdown-item command="initFieldSort" v-if="rightControl.bankWater || rightControl.writeOff">重置拖动</el-dropdown-item>
      <el-dropdown-item command="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import { mapState, mapMutations } from 'vuex';
import _ from 'lodash';

export default {
  name: 'dropDown',
  data() {
    return {
      userName: '',
      // 按钮权限
      rightArray: [971, 9714],
      rightControl: {
        bankWater: false,
        writeOff: false,
      },
    };
  },
  computed: {
    ...mapState(['personName', 'asideInfoIds']),
  },
  created() {
    this.userName = this.personName;
    
  },

  mounted() {
    setTimeout(() => {
      if (!_.isEmpty(this.asideInfoIds)) {
        // 判断权限
        this.rightArray.forEach((item, index, array) => {
          common.checkRolePermission(
            item,
            this.asideInfoIds,
            Object.keys(this.rightControl)[index],
            this.rightControl
          );
        })
      }
    }, 1000);
  },

  methods: {
    ...mapMutations({
      setRoles: 'setRoles',
      setUserId: 'setUserId',
      setPersonName: 'setPersonName',
      setAsideInfoIds: 'setAsideInfoIds',
      setAsideInfo: 'setAsideInfo',
      setTableHeader: 'setTableHeader',
      setBankWaterHeader: 'setBankWaterHeader',
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

      if (command === 'initFieldSort') {
        const initNerHeader = [
      { label: '承租人/牌照商', prop: 'name', minWidth: '200px' },
      { label: '合同编号', prop: 'contractNumber', minWidth: '160px' },
      { label: '主合同编号', prop: 'parentContractNumber', minWidth: '160px' },
      { label: '合同名称', prop: 'contractName', minWidth: '150px' },
      { label: '合同状态', prop: 'contractNormalStatusText', minWidth: '80px' },
      { label: '合同类型', prop: 'contractTypeText', minWidth: '100px' },
      { label: '期数', prop: 'nper', minWidth: '80px' },
      { label: '租赁方式', prop: 'leaseWayText', minWidth: '80px' },
      { label: '上牌地', prop: 'cityName', minWidth: '80px' },
      { label: '是否限牌', prop: 'isLimitLicenceText', minWidth: '80px' },
      { label: '是否租赁公司', prop: 'isGalcCompanyText', minWidth: '120px' },
      { label: '车辆数量', prop: 'num', minWidth: '80px' },
      { label: '核销状态', prop: 'repaymentStatusText', minWidth: '80px' },
      { label: '起租日', prop: 'batchStartingDate', minWidth: '120px' },
      { label: '支付日', prop: 'payDate', minWidth: '120px' },
      { label: '应收金额', prop: 'dueAmount', minWidth: '120px' },
      { label: '应收本金', prop: 'duePrincipal', minWidth: '120px' },
      { label: '应收利息', prop: 'dueinterest', minWidth: '120px' },
      { label: '应收管理费', prop: 'dueManagementFee', minWidth: '120px' },
      { label: '应收手续费', prop: 'dueCommission', minWidth: '120px' },
      { label: '已收金额', prop: 'receivedAmount', minWidth: '120px' },
      { label: '已收本金', prop: 'receivedPrincipal', minWidth: '120px' },
      { label: '已收利息', prop: 'receivedInterest', minWidth: '120px' },
      { label: '已收管理费', prop: 'receivedManagementFee', minWidth: '120px' },
      { label: '已收手续费', prop: 'receivedCommission', minWidth: '120px' },
      { label: '未收金额', prop: 'outstandingAmount', minWidth: '120px' },
      { label: '未收本金', prop: 'outstandingPrincipal', minWidth: '120px' },
      { label: '未收利息', prop: 'outstandingInterest', minWidth: '120px' },
      { label: '未收管理费', prop: 'outstandingManagementFee', minWidth: '120px' },
      { label: '未收手续费', prop: 'outstandingCommission', minWidth: '120px' },
    ];
    const initBankWaterHeader = [
      { label: '交易时间', prop: 'tradeDate', minWidth: '110px', sortable: true },
      { label: '银行单据号', prop: 'serialNumber', minWidth: '160px', sortable: true },
      { label: '收款金额', prop: 'income', minWidth: '120px' },
      { label: '收款账户名称', prop: 'companyName', minWidth: '200px' },
      { label: '收款账号', prop: 'bankAccountNo', minWidth: '150px' },
      { label: '收款账户开户行', prop: 'bankAccountName', minWidth: '150px' },
      { label: '汇款账户名称', prop: 'sideAccountName', minWidth: '200px' },
      { label: '汇款账号', prop: 'sideAccount', minWidth: '150px' },
      { label: '核销状态', prop: 'verStateText', minWidth: '80px' },
      { label: '摘要', prop: 'digest', minWidth: '150px' },
      { label: '代付标志', prop: 'paidLogo', minWidth: '150px' },
      { label: '项目类别', prop: 'projectCategory', minWidth: '100px' },
      { label: '已核销金额', prop: 'haveVerLines', minWidth: '150px' },
      { label: '未核销金额', prop: 'notVerLines', minWidth: '150px' },
      { label: '退款金额', prop: 'refund', minWidth: '150px' },
      { label: '台账标志', prop: 'newLedgerLogo', minWidth: '120px' },
      { label: '备注', prop: 'remark', minWidth: '100px' },
    ];
        this.setTableHeader(initNerHeader);
        this.setBankWaterHeader(initBankWaterHeader);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/mixin.scss';
</style>
