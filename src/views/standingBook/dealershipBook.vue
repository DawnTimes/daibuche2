<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-17 15:04:15
 * @LastEditTime: 2020-11-04 14:56:06
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\standingBook\dealershipBook.vue
-->

<template>
  <div class="dealershipBook">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="120px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="承租人/牌照商" prop="name">
          <el-input maxlength="30" v-model="formData.name" clearable placeholder></el-input>
        </el-form-item>
        <!-- <el-form-item label="牌照商" prop="interfaceName">
          <el-input maxlength="30" v-model="formData.interfaceName" placeholder></el-input>
        </el-form-item> -->
        <el-form-item label="合同编号" prop="contractNumber">
          <el-input maxlength="30" v-model="formData.contractNumber" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="期数" prop="nper">
          <el-input maxlength="10" v-model="formData.nper" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="上牌地" prop="cityName">
          <el-input maxlength="10" v-model="formData.cityName" clearable placeholder></el-input>
        </el-form-item>

        <el-form-item label="是否限牌" prop="isLimitLicence">
          <el-select v-model="formData.isLimitLicence" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in this.$options.filters.flagValue([])"
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

        <el-form-item label="">
          <el-button icon="el-icon-download" type="primary" @click="exportButton" v-show="rightControl.export">导出经销店台账</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        border
        stripe
        :max-height="tableHeight"
        ref="table"
        style="width: 100%"
        :header-cell-style="{
        'text-align':'center',
        'font-weight':'bold',  
        'background':'#627CAF',    
        'color': '#fff',
      }"
      >
        <el-table-column
          width="80"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <!-- <el-table-column prop="" label="所属期间" show-overflow-tooltip width="100"></el-table-column> -->
        <el-table-column prop="name" label="承租人/牌照商" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="parentContractNumber" label="主合同编号" show-overflow-tooltip width="160"></el-table-column>
        <el-table-column prop="contractNumber" label="合同编号" show-overflow-tooltip width="160"></el-table-column>
        <el-table-column prop="nper" label="期数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isLimitLicence" label="是否限牌" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :class="{ blueColor: scope.row.isLimitLicence == 'Y' , redStatus: scope.row.isLimitLicence == 'N' }">{{ scope.row.isLimitLicence | flagValue}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isGacShop" label="是否商贸店" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span :class="{ blueColor: scope.row.isGacShop == 'Y' , redStatus: scope.row.isGacShop == 'N' }">{{ scope.row.isGacShop | flagValue}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isGalcCompany" label="是否租赁公司" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span :class="{ blueColor: scope.row.isGalcCompany == 'Y' , redStatus: scope.row.isGalcCompany == 'N' }">{{ scope.row.isGalcCompany | flagValue}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cityName" label="上牌地" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="num" label="车辆数量" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="leaseWay" label="租赁方式" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.leaseWay | leaseWay }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="batchStartingDate" label="起租日" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.batchStartingDate | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payDay" label="支付日" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.payDay | timeFormat }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="payStatus" label="支援金状态" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span
              :class="{greenStatus: scope.row.payStatus == '', redStatus: scope.row.payStatus == '', blueColor: scope.row.payStatus == ''}"
            >{{ formatStatus(scope.row.payStatus, paidTemp) }}</span>
          </template>
        </el-table-column> -->

        <!-- <el-table-column prop="" label="本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="" label="利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="" label="管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="" label="手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="" label="应收租金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="" label="已收租金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="" label="未收租金" show-overflow-tooltip width="100"></el-table-column> -->

        <el-table-column prop="dueAmount" label="应收金额" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.dueAmount | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="duePrincipal" label="应收本金" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.duePrincipal | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="dueInterest" label="应收利息" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.dueInterest | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="dueManagementFee" label="应收管理费" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.dueManagementFee | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="dueCommission" label="应收手续费" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.dueCommission | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="receivedAmount" label="已收金额" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.receivedAmount | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="receivedPrincipal" label="已收本金" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.receivedPrincipal | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="receivedInterest" label="已收利息" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.receivedInterest | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="receivedManagementFee" label="已收管理费" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.receivedManagementFee | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="receivedCommission" label="已收手续费" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.receivedCommission | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="outstandingAmount" label="未收金额" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.outstandingAmount | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="outstandingPrincipal" label="未收本金" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.outstandingPrincipal | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="outstandingInterest" label="未收利息" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.outstandingInterest | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="outstandingManagementFee" label="未收管理费" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.outstandingManagementFee | moneyFormat}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="outstandingCommission" label="未收手续费" show-overflow-tooltip width="120">
          <template slot-scope="scope">
          <span>{{ scope.row.outstandingCommission | moneyFormat}}</span>
        </template>
        </el-table-column>
        
        <!-- <el-table-column prop="" label="支援金" show-overflow-tooltip width="100"></el-table-column> -->
        <!-- <el-table-column prop="" label="差额" show-overflow-tooltip width="100"></el-table-column> -->
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
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
  </div>
</template>

<script>
import { queryDict } from '@/api/index.js';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      tableLoading: false,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        cityCode: '',
        cityName: '',
        contractNumber: '',
        name: '',
        nper: '',
        isLimitLicence: '',
        pageSize: 10,
        pageNum: 1,
      },
      appravolStatus: [
        {
          value: '1',
          label: '全部核销',
        },
        {
          value: '2',
          label: '未核销',
        },
        {
          value: '3',
          label: '部分核销',
        },
      ],

      // 按钮权限控制
      bankPermission: {
        add: true,
        edit: true,
        detail: true,
        delete: true,
      },
      tableData: [],
      tableLoading: false,
      tableHeight: 100,
      // 数据字典
      paidTemp: [],

      limitStatus: [
        { value: 'Y', label: '是' },
        { value: 'N', label: '否' },
      ],

      // 按钮权限
      rightArray: [9811],
      rightControl: {
        export: false,
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    // 判断权限
    this.rightArray.forEach((item, index, array) => {
      common.checkRolePermission(
        item,
        this.$store.state.asideInfoIds,
        Object.keys(this.rightControl)[index],
        this.rightControl
      );
    });

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
    this.getDealerBookListData();
  },
  methods: {
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getDealerBookListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getDealerBookListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 查询分页列表
    getDealerBookListData() {
      this.tableLoading = true;
      const url = common.queryAgentStandingBookUrl;
      const params = {
        nper            : this.formData.nper,
        cityCode        : this.formData.cityCode,
        contractNumber  : this.formData.contractNumber,
        name            : this.formData.name,
        isLimitLicence  : this.formData.isLimitLicence,
        cityName        : this.formData.cityName,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum : this.formData.pageSize,
      };

      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          this.tableLoading = false;
          const data = res.data;
          this.tableData = data.standingBookList;
          this.total = data.turnPageTotalNum * 1;
        } else {
          this.tableLoading = false;
        }
      }).catch(() => {
        this.tableLoading = false;
      })
    },

    // 导出经销店台账 isLimitLicence cityName
    exportButton() {
      window.location.href = `/api${
        common.exportAgentSBUrl
      }?name=${
        this.formData.name ? this.formData.name : ''
      }&contractNumber=${
        this.formData.contractNumber ? this.formData.contractNumber : ''
      }&nper=${
        this.formData.nper ? this.formData.nper : ''
      }&isLimitLicence=${
        this.formData.isLimitLicence ? this.formData.isLimitLicence : ''
      }&cityName=${
        this.formData.cityName ? this.formData.cityName : ''}`;
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
      this.getDealerBookListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getDealerBookListData();
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
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
</style>

