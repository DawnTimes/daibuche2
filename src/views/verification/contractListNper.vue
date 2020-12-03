<!--
 * @Author: 廖亿晓
 * @Date: 2020-11-13 14:25:38
 * @LastEditTime: 2020-12-03 19:35:30
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\verification\contractListNper.vue
-->


<template>
  <div class="contractListNper">
    <div class="baseInfo">
      <el-row :gutter="0">
        <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="4">
          <span>银行单据号：</span>
          <span>{{ baseFrom.serialNumber }}</span>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="6">
          <span>收款账户：</span>
          <span>{{ baseFrom.companyName }}</span>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="4">
          <span>收款金额：</span>
          <span>{{ baseFrom.income | moneyFormat }}</span>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="8" :xl="4">
          <span>已核金额：</span>
          <span>{{ baseFrom.haveVerLines | moneyFormat }}</span>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="10" :xl="3">
          <span>未核金额：</span>
          <span>{{ baseFrom.notVerLines | moneyFormat }}</span>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="3">
          <span>退款金额：</span>
          <span>{{ baseFrom.refund | moneyFormat }}</span>
        </el-col>
      </el-row>
    </div>

    <div class="hearderBox hearderBoxNerp">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width=""
        size="mini"
        ref="ruleForm"
      >
        <el-form-item label="承租人/牌照商" prop="">
          <el-input maxlength="50" v-model="formData.name" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="合同编号" prop="contractNumber">
          <el-input maxlength="50" v-model="formData.contractNumber" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="期数" prop="nper">
          <el-input maxlength="3" v-model="formData.nper" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="上牌地" prop="cityName">
          <el-input maxlength="30" v-model="formData.cityName" placeholder></el-input>
        </el-form-item>

        <el-form-item label="核销状态" prop="repaymentStatus">
          <el-select v-model="formData.repaymentStatus" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in this.$options.filters.verState([])"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item label>
          <el-button @click="backButton" plain>返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <wTable :data="tableData" :header="tableHeader" :option="tableOption" :tableLoading="tableLoading" ref="table">
      <el-table-column slot="fixed" fixed="left" align="center" label="序号" type="index" :index="indexMethod" width="50">
      </el-table-column>
      <el-table-column slot="fixed" fixed="right" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <!-- 未核金额未0时禁用按钮 -->
          <el-button size="mini" type="primary" @click="handleWriteOff(scope.row)" :disabled="scope.row.repaymentStatus == 'FULL'|| baseFrom.notVerLines == '0'">核销</el-button>
          <!-- <el-button size="mini" type="primary" @click="handleWriteOff(scope.row)" :disabled="scope.row.repaymentStatus == 'FULL'">核销</el-button> -->
        </template>
      </el-table-column>
    </wTable>

    <div class="page-layer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <writeOff-dialog
      ref="writeOffDialog"
      :writeOffForm="writeOffForm"
      :loading="status.loading"
      v-on:formDataSubmit="formDataSubmit"
    ></writeOff-dialog>
    
    
  </div>
</template>

<script>
import wTable from './components/dragNer.vue';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import writeOffDialog from './components/writeOffDialog';
import nperCarList from './components/nperCarList';

import { mapState, mapMutations } from 'vuex';
import { moneyFormat } from '@/common/moneyFormat.js';

import moment from 'moment';

export default {
  name: 'contractListNper',
  components: {
    wTable,
    writeOffDialog,
    nperCarList,
  },
  data() {
    return {
      tableOption: {
        border: true,
        maxHeight: 500,
      },
      baseFrom: {
        serialNumber: '',
        income: '',
        notVerLines: '',
        haveVerLines: '',
        companyName: '',
        refund: '',
      },
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        name: '',
        cityName: '',
        nper: '',
        contractNumber: '',
        repaymentStatus: '',
        pageSize: 10,
        pageNum: 1,
      },
      tableData: [],
      tableLoading: false,

      // 数据字典
      dictTemp: [],
      tableHeight: 0,

      writeOffForm: {
        replanId: '',
        contractId: '',
        oldContractId: '',
        debtIdentification: '',
        isDebt: 'N',
        nper: '',
        remark: '',
        serialNumber: '',
        userId: '',
        contractNumber: '',
        name: '',
      },
      status: {
        loading: false,
      },

      carTableData: [],
      carTableLoading: false,
    };
  },

  computed: {
    ...mapState({
      userId: store => store.userId,
      tableHeader: store => store.tableHeader,
    }),
  },

  created() {
    this.formData.name = this.$route.query.name;
    this.baseFrom.serialNumber = this.$route.query.serialNumber;
    this.baseFrom.companyName = this.$route.query.companyName;
    
    this.$nextTick(function () {
      this.tableOption.maxHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 110;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function () {
        self.tableOption.maxHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 110;
      };
    });

    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },

  // 添加组件内的导航钩子，在跳转路由前，将监听窗口大小变化的函数清空
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.tableHeight = 500
    window.onresize = function () {
      // console.log('离开了')
    };
    next();
  },

  mounted() {
    this.getBySerialNumberData();
    this.getContractRepayListData();
  },

  methods: {
    ...mapMutations({
      setRowCol: 'setRowCol',
      // setDropCol: 'setDropCol',
    }),

    // 查询
    queryForm() {
      // 重置当前页
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getContractRepayListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getContractRepayListData();
    },

    // 返回
    backButton() {
      this.$router.push({
        path: '/bankWaterList',
      });
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 查询收入已核销未核销退款
    getBySerialNumberData() {
      const url = common.queryBySerialNumberUrl;
      const params = {
        serialNumber: this.baseFrom.serialNumber,
      };

      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          Object.assign(this.baseFrom, data);
        }
      })
    },

    // 查询分页列表
    getContractRepayListData() {
      const url = common.queryContractRepayUrl;
      this.tableData = [];
      const params = {
        name: this.formData.name.trim(),
        // name: '佛山市南海狮山申联汽车销售服务有限公司',
        // name: '重庆广汽长冠汽车销售有限公司',
        cityName: this.formData.cityName.trim(),
        nper: this.formData.nper.trim(),
        contractNumber: this.formData.contractNumber.trim(),
        repaymentStatus: this.formData.repaymentStatus,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };
      this.tableLoading = true;

      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.contRepayList;
          this.total = data.turnPageTotalNum * 1;
          this.tableLoading = false;

          if (!_.isEmpty(this.tableData)) {
            this.tableData.forEach((item, index) => {
              // 文本转义
              item.isGalcCompanyText = '';  // 是否广汽租赁
              item.isLimitLicenceText = ''; // 是否限牌
              item.leaseWayText = ''; // 租赁方式
              item.contractTypeText = ''; // 合同类型
              item.repaymentStatusText = ''; // 核销状态
              // item.repaymentStatusColor = ''; // 核销状态
              item.contractNormalStatusText = ''; // 合同状态

              if (item.isGalcCompany == 'Y') {
                item.isGalcCompanyText = '是';
              } else {
                item.isGalcCompanyText = '否';
              }

              if (item.isLimitLicence == 'Y') {
                item.isLimitLicenceText = '是';
              } else {
                item.isLimitLicenceText = '否';
              }
              
              if (item.contractNormalStatus == 'Y') {
                item.contractNormalStatusText = '正常';
              } else {
                item.contractNormalStatusText = '异常';
              }

              if (item.leaseWay == 'LEASE') {
                item.leaseWayText = '直租';
              } else if (item.leaseWay == 'BACK-LEASE') {
                item.leaseWayText = '回租';
              } else {
                item.leaseWayText = '经租';
              }

              if (item.repaymentStatus == 'FULL') {
                item.repaymentStatusText = '已核销';
                // item.repaymentStatusColor = ' #67C23A';
              } else if (item.repaymentStatus == 'PART') {
                item.repaymentStatusText = '部分核销';
                // item.repaymentStatusColor = '#F56C6C';
              } else if (item.repaymentStatus == 'NOT') {
                item.repaymentStatusText = '未核销';
                // item.repaymentStatusColor = '#409EFF';
              } else {
                item.repaymentStatusText = '';
              }

              if (item.contractType == 'LEASE') {
                item.contractTypeText = '直租合同';
              } else if (item.contractType == 'BACK-LEASE') {
                item.contractTypeText = '回租合同';
              } else if (item.contractType == 'OPERATING-LEASE') {
                item.contractTypeText = '经租合同';
              } else if (item.contractType == 'LEASE-CHANGE') {
                item.contractTypeText = '直租变更协议';
              } else if (item.contractType == 'BACK-LEASE-CHANGE') {
                item.contractTypeText = '回租变更协议';
              } else if (item.contractType == 'OPERATING-LEASE-CHANGE') {
                item.contractTypeText = '经租变更协议';
              } else if (item.contractType == 'END_CHANGE') {
                item.contractTypeText = '终止协议';
              } else if (item.contractType == 'BUY_OUT') {
                item.contractTypeText = '买断';
              } else {
                item.contractTypeText = ''
              }

              // item.batchStartingDate
              item.batchStartingDate = moment(item.batchStartingDate).format('YYYY-MM-DD');
              item.payDate           = moment(item.payDate).format('YYYY-MM-DD');

            })
          }
        } else {
          this.tableLoading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '承租人或牌照商不能为空！'
          });
        }
      }).catch(() => {
        this.tableLoading = false;
      })
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
      this.getContractRepayListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = this.pageSize * (val - 1) + 1;
      this.getContractRepayListData();
    },

    // 核销弹框
    handleWriteOff(row) {
      this.writeOffForm.replanId = row.replanId;
      this.writeOffForm.contractId = row.contractId;
      this.writeOffForm.oldContractId = row.oldContractId;
      this.writeOffForm.nper = row.nper;
      this.writeOffForm.serialNumber = this.baseFrom.serialNumber;
      this.writeOffForm.userId = this.userId;
      this.writeOffForm.contractNumber = row.contractNumber;
      this.writeOffForm.name = row.name;
      this.$refs.writeOffDialog.isShow(true);
    },

    // 核销确定
    formDataSubmit(obj) {
      const url = common.verContractReyPayUrl;
      const params = obj.data;
      this.status.loading = true;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          this.$notify.success({
            title: '温馨提示！',
            message: '核销成功！'
          });
          this.status.loading = false;
          this.$refs.writeOffDialog.isShow(false);
          this.writeOffForm.isDebt = 'N';
          this.getBySerialNumberData();
          this.getContractRepayListData();
        } else {
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '核销失败！'
          });
          this.status.loading = false;
        }
      }).catch((err) => {
        this.status.loading = false;
        this.$notify.error({
            title: '温馨提示！',
            message: err.em || '核销失败！'
          });
      })
      
    },
  },
  
};
</script>

<style scoped lang="scss">
.contractListNper {
  .backButton {
    // padding: 20px;
  }

  .baseInfo {
    padding: 5px 0 5px 10px;
    border-bottom: 1px solid #eee;
    font-size: 13px;

    span {
      line-height: 30px;
      font-weight: bold;
    }
  }
}
</style>

<style lang="scss">
.hearderBoxNerp .el-form-item__label, .hearderBoxNerp .el-input__inner {
  font-size: 12px;
}
.contractListNper .el-table .cell {
  font-size: 12px;
}
.contractListNper .el-table th>.cell {
  font-size: 13px;
}
</style>
