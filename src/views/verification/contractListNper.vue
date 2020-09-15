<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-12 10:02:45
 * @LastEditTime: 2020-09-14 17:29:42
 * @LastEditors: your name
 * @Description: 查询合同下所有期数
 * @FilePath: \webcode2\src\views\verification\contractListNper.vue
-->
<template>
  <div class="contractListNper">
    <div class="baseInfo">
      <el-row :gutter="0">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="4">
          <span>银行单据号：</span>
          <span>{{ baseFrom.serialNumber }}</span>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="4">
          <span>收款金额：</span>
          <span>{{ baseFrom.income || 0 }} 元</span>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="4">
          <span>已核金额：</span>
          <span>{{ baseFrom.haveVerLines || 0 }} 元</span>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="4">
          <span>未核金额：</span>
          <span>{{ baseFrom.notVerLines || 0 }} 元</span>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="4">
          <span>退款金额：</span>
          <span>{{ baseFrom.refund || 0 }} 元</span>
        </el-col>
      </el-row>
    </div>

    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="110px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="经销店/牌照商:" prop="name">
          <el-input maxlength="30" clearable v-model="formData.name" placeholder></el-input>
        </el-form-item>
        <!-- <el-form-item label="牌照商名称:" prop="systemName">
          <el-input maxlength="30" clearable v-model="formData.systemName" placeholder=""></el-input>
        </el-form-item>-->

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
        <el-form-item label>
          <el-button @click="backButton" plain>返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        ref="table"
        style="width: 100%"
        :max-height="tableHeight"
        :header-cell-style="{
        'text-align':'center',
        'font-weight':'bold',  
        'background':'#627CAF',    
        'color': '#fff',
      }"
      >
        <el-table-column width="50" align="center" label="序号" type="index" :index="indexMethod" fixed></el-table-column>
        <el-table-column prop="contractNumber" label="合同编号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="contractName" label="合同名称" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="contractNormalStatus" label="合同状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :class="{greenStatus: scope.row.contractNormalStatus == 'Y', redStatus: scope.row.contractNormalStatus == 'N'}"
            >{{ scope.row.contractNormalStatus | contractStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contractType" label="合同类型" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span
              :class="{greenStatus: scope.row.contractType == '', redStatus: scope.row.contractType == '', blueColor: scope.row.contractType == '',
            yellowColor: scope.row.contractType == ''}"
            >{{ scope.row.contractType | contractType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="经销店/牌照商" show-overflow-tooltip width="120"></el-table-column>
        <!-- <el-table-column prop="id"  label="牌照商名称" show-overflow-tooltip width="120"></el-table-column> -->
        <el-table-column prop="cityName" label="上牌地" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isLimitLicence" label="是否限牌" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :class="{ greenStatus: scope.row.isLimitLicence == 'Y' , redStatus: scope.row.isLimitLicence == 'N' }">{{ scope.row.isLimitLicence | flagValue }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isGalcCompany" label="是否广汽租赁" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span :class="{ greenStatus: scope.row.isGalcCompany == 'Y' , redStatus: scope.row.isGalcCompany == 'N' }">{{ scope.row.isGalcCompany | flagValue }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nper" label="期数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="leaseWay" label="租赁方式" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.leaseWay | leaseWay }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="车辆数量" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link type="primary" @click="queryCar(scope.row.num)">{{ scope.row.num }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="batchStartingDate" label="起租日" show-overflow-tooltip width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.batchStartingDate | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payDate" label="支付日" show-overflow-tooltip width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.payDate | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        
        
        <el-table-column prop="dueAmount" label="应收金额" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="duePrincipal" label="应收本金" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="dueinterest" label="应收利息" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="dueManagementFee" label="应收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="dueCommission" label="应收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="receivedAmount" label="已收金额" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="receivedPrincipal" label="已收本金" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="receivedInterest" label="已收利息" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="receivedManagementFee" label="已收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="receivedCommission" label="已收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="outstandingAmount" label="未收金额" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="outstandingPrincipal" label="未收本金" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.outstandingPrincipal || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="outstandingInterest" label="未收利息" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="outstandingManagementFee" label="未收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="outstandingCommission" label="未收手续费" show-overflow-tooltip width="120"></el-table-column>
        <!-- <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleWriteOff(scope.row)">核销</el-button>
            <!-- <el-button size="mini" plain @click="queryCar(scope.row)">车辆清单</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page-layer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100, 500]"
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
    
    <nperCarList ref="nperCarListDialog"></nperCarList>
  </div>
</template>

<script>
import { queryDict } from '@/api/index.js';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import writeOffDialog from './components/writeOffDialog';
import nperCarList from './components/nperCarList';

import { mapState, Store } from 'vuex';

export default {
  name: '',
  props: {},
  components: {
    writeOffDialog,
    nperCarList,
  },
  data() {
    return {
      baseFrom: {
        serialNumber: '',
        income: '',
        notVerLines: '',
        haveVerLines: '',
        refund: '',
      },
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        name: '',
        pageSize: 10,
        pageNum: 1,
      },
      tableData: [],

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
    };
  },
  computed: {
    ...mapState({
      userId: store => store.userId
    })
  },
  watch: {},
  created() {
    this.formData.name = this.$route.query.name;
    this.baseFrom.serialNumber = this.$route.query.serialNumber;
    
    this.$nextTick(function () {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 120;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 120;
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
      const params = {
        name: this.formData.name,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };

      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.contRepayList;
          this.total = data.turnPageTotalNum * 1;
        }
      })
    },

    // 获取状态数据字典
    getDictStatus(columnName, tabName) {
      const data = {
        columnName: columnName,
        tabName: tabName,
      };
      queryDict(data).then((res) => {
        if (res.code === '0') {
          const arrData = res.data.dictList;
        }
      });
    },

    // 格式化状态
    formatStatus(type, dictTemp = []) {
      let columnValueDesc = '';
      dictTemp.forEach((v) => {
        if (type === v.columnValueCode) {
          return (columnValueDesc = v.columnValueDesc);
        }
      });
      return columnValueDesc;
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

    // 返回
    handleBack() {
      this.$router.push({
        path: '/writeOffContractList',
      });
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

    // 车辆清单
    queryCar(row) {
      // this.$router.push({
      //   path: '/nperCarList',
      // });
      this.$refs.nperCarListDialog.isShow(true);
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
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.contractListNper {
  .backButton {
    // padding: 20px;
  }

  .baseInfo {
    padding: 10px 0 10px 20px;
    border-bottom: 1px solid #eee;

    span {
      line-height: 40px;
      font-weight: bold;
    }
  }
}
</style>
