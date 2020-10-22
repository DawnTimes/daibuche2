<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 17:08:12
 * @LastEditTime: 2020-10-21 15:58:10
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\components\supportGoldApprovalReason.vue
-->

<template>
  <div class="supportGoldApprovalReason">
    <div class="approvalTitle">
      <span>{{ currentYear }}年{{ currentMonth }}月{{ batch | batchFormat }}支援金原因说明</span>
    </div>

    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="reasonForm"
        class="demo-form-inline"
        label-width="90px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="经销店名称:" prop="agentName">
          <el-input maxlength="50" v-model="reasonForm.agentName" clearable placeholder></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否收齐:" prop="interfaceName">
          <el-select v-model="reasonForm.value" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in limitStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="是否商贸:" prop="isGacShop">
          <el-select v-model="reasonForm.isGacShop" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in isCommerce"
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
      </el-form>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        border
        stripe
        @sort-change="sortChange"
        :default-sort="defaultSort"
        show-summary
        :summary-method="getSummaries"
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
          width="50"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <el-table-column prop="agentCode" label="经销店代码" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="agentName" label="经销店名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="carNum" label="车辆数" sortable show-overflow-tooltip width="90" :sort-method="(row1, row2) => sortMethod(row1, row2, 'carNum')">
          <template slot-scope="scope">
            <el-tooltip content="点击查询" placement="top" effect="light">
              <el-link type="primary" @click="queryCar(scope.row)">{{ scope.row.carNum }}</el-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="supportFund" label="支援金" sortable show-overflow-tooltip width="120" :sort-method="(row1, row2) => sortMethod(row1, row2, 'supportFund')">
          <template slot-scope="scope">
            <span>{{ scope.row.supportFund | moneyFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="licenceFund" label="牌照费" sortable show-overflow-tooltip width="120" :sort-method="(row1, row2) => sortMethod(row1, row2, 'licenceFund')">
          <template slot-scope="scope">
            <span>{{ scope.row.licenceFund | moneyFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalFund" label="支援金总额" sortable show-overflow-tooltip width="120" :sort-method="(row1, row2) => sortMethod(row1, row2, 'totalFund')">
          <template slot-scope="scope">
            <span>{{ scope.row.totalFund | moneyFormat}}</span>
          </template>
        </el-table-column>
        
        <el-table-column prop="isGacShop" label="是否商贸" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.isGacShop | flagValue }}</span>
          </template>
        </el-table-column>
        
        <!-- <el-table-column prop="" label="是否收齐" show-overflow-tooltip></el-table-column> --> -->
        <!-- <el-table-column prop="" label="数据来源" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="remark" label="申请原因" show-overflow-tooltip></el-table-column>
        <el-table-column
            prop="twoN"
            :label="setMonthTotal(2)"
            show-overflow-tooltip
            width="140"
            sortable
            :sort-method="(row1, row2) => sortMethod(row1, row2, 'twoN')"
          >
          <template slot-scope="scope">
            <span>{{ scope.row.twoN | moneyFormat}}</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="threeN"
            :label="setMonthTotal(3)"
            show-overflow-tooltip
            width="140"
            sortable
            :sort-method="(row1, row2) => sortMethod(row1, row2, 'threeN')"
          >
          <template slot-scope="scope">
            <span>{{ scope.row.threeN | moneyFormat}}</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="two"
            :label="setMonth(2)"
            show-overflow-tooltip
            width="120"
            sortable
            :sort-method="(row1, row2) => sortMethod(row1, row2, 'two')"
          >
          <template slot-scope="scope">
            <span>{{ scope.row.two | moneyFormat}}</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="three"
            :label="setMonth(3)"
            show-overflow-tooltip
            width="120"
            sortable
            :sort-method="(row1, row2) => sortMethod(row1, row2, 'three')"
          >
          <template slot-scope="scope">
            <span>{{ scope.row.three | moneyFormat}}</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="four"
            :label="setMonth(4)"
            show-overflow-tooltip
            width="120"
            sortable
            :sort-method="(row1, row2) => sortMethod(row1, row2, 'four')"
          >
          <template slot-scope="scope">
            <span>{{ scope.row.four | moneyFormat}}</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="five"
            :label="setMonth(5)"
            show-overflow-tooltip
            width="120"
            sortable
            :sort-method="(row1, row2) => sortMethod(row1, row2, 'five')"
          >
          <template slot-scope="scope">
            <span>{{ scope.row.five | moneyFormat}}</span>
          </template>
          </el-table-column>
      </el-table>
      <p class="tipText">备注：欠款金额负号表示已收齐，正号表示还尚欠额；金额单位：元。</p>
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
    
    <carList-dialog ref="carListDialog" :paramsForm="paramsForm" :tableLoading="carTableLoading"></carList-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import { mapState } from 'vuex';
import moment from 'moment';

import carListDialog from './carListDialog';

import { moneyFormat } from '@/common/moneyFormat.js';

export default {
  name: '',
  props: {
    // currentMonth: {
    //   type: String,
    //   default: '',
    // },
    // currentYear: {
    //   type: String,
    //   default: '',
    // },
    // batch: {
    //   type: String,
    //   default: '',
    // },
    // reasonForm: {
    //   type: Object,
    //   default: () => {
    //     return {}
    //   }
    // },
  },
  components: {
    carListDialog,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      reasonForm: {
        agentName: '',
        applyDate: '',
        id: '',
        isGacShop: '',
        pageSize: 10,
        pageNum: 1,
      },
      currentMonth: '',
      currentYear: '',
      batch: '',
      batchNumber: '',

      tableData: [],
      tableHeight: 100,
      tableLoading: false,
      
      appravolStatus: [],
      limitStatus: [
        { value: 'Y', label: '是' },
        { value: 'N', label: '否' },
      ],
      isCommerce: [
        { value: 'Y', label: '是' },
        { value: 'N', label: '否' },
      ],

      paramsForm: {
        tableData: [],
      },
      carTableLoading: false,

      defaultSort: {
        // prop: 'supportFund',
        order: 'ascending',
      },

    };
  },
  computed: {
    
  },
  watch: {

  },
  created() {
    const params = this.$route.query;
    this.reasonForm.id = params.id;
    this.reasonForm.applyDate = params.applyDate;
    this.batch = params.batch;
    this.currentMonth = params.month;
    this.currentYear = params.year;
    this.batchNumber = params.batchNumber;

    this.$nextTick(function () {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 120;
      
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 120
      }
    })
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },

  // 添加组件内的导航钩子，在跳转路由前，将监听窗口大小变化的函数清空
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.tableHeight = 500
    window.onresize = function() {
      // console.log('离开了')
    }
    next()
  },
  
  mounted() {
    this.getSupportGoldReasonListData();
  },
  methods: {
    // 查询
    queryForm() {
      this.pageNum = 1;
      this.reasonForm.pageNum = 1;
      this.getSupportGoldReasonListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getSupportGoldReasonListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getSupportGoldReasonListData() {
      this.tableLoading = true;
      const url = common.supportAgListUrl;
      const params = {
        agentName: this.reasonForm.agentName,
        isGacShop: this.reasonForm.isGacShop,
        id: this.reasonForm.id,
        applyDate: this.reasonForm.applyDate,
        turnPageBeginPos: this.reasonForm.pageNum,
        turnPageShowNum: this.reasonForm.pageSize,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.agSuppList;
          this.total = data.turnPageTotalNum * 1;
          this.tableLoading = false;
        } else {
          this.tableLoading = false;
        }
      }).catch(() => {
        this.tableLoading = false;
      })
    },
    
    //监听排序
    sortChange(column, prop, order) {
      // console.log(column, prop, order);
    },

    // 自定义排序
    sortMethod(row1, row2, prop) {
      // console.log(row1, row2, prop);
      const at = row1[prop] * 1;
      const bt = row2[prop] * 1;
      if (at > bt) {
        return 1
      } else {
        return -1
      }
    },


    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        // 统计经销店数量
        if (index === 2) {
          sums[index] = data.length;
          return;
        }
        // 统计金额
        // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。map() 方法按照原始数组元素顺序依次处理元素。map() 不会改变原始数组。
        // Number() 函数把对象的值转换为数字。
        // every() 方法使用指定函数检测数组中的所有元素, 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。如果所有元素都满足条件，则返回 true。
        const values = data.map((item) => Number(item[column.property]));
        // isNaN() 函数用于检查其参数是否是非数字值。如果参数值为 NaN 或字符串、对象、undefined等非数字值则返回 true, 否则返回 false。
        if (!values.every((value) => isNaN(value))) {
          // reduce() 方法接收一个函数作为累加器
          sums[index] = values.reduce((prev, curr) => {
            // console.log(prev, curr);
            const value = Number(curr);
            if (!isNaN(value)) {
              // 千分位格式化金额
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 3) {
            // 合计车辆数
            sums[index] += '辆';
          } else if (index === 8) {
            sums[index] = '';
          } 
          else {
            sums[index] = moneyFormat(sums[index]);
          }
        } else {
          sums[index] = '';
        }
      });

      return sums;
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.reasonForm.pageNum = 1;
      this.pageSize = val;
      this.reasonForm.pageSize = val;
      this.getSupportGoldReasonListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.reasonForm.pageNum = (val - 1) * this.pageSize + 1;
      this.getSupportGoldReasonListData();
    },

    // 设置截止月份总欠款
    setMonthTotal(num) {
      // 判断this.currentMonth - num 是否小于等于 0，小于等于则是上一年，需 +12
      return this.currentMonth
        ? '截止' +
            (this.currentMonth - num <= 0
              ? this.currentMonth - num + 12
              : this.currentMonth - num) +
            '月总欠款'
        : `截止n-${num}月总欠款`;
    },

    // 设置欠款月份
    setMonth(num) {
      // 判断this.currentMonth - num 是否小于等于 0，小于等于则是上一年，需 +12
      return this.currentMonth
        ? (this.currentMonth - num <= 0
            ? this.currentMonth - num + 12
            : this.currentMonth - num) + '月欠款'
        : `n-${num}月欠款`;
    },

    // 查询车辆清单
    queryCar(row) {
      this.$refs.carListDialog.isShow(true);
      this.carTableLoading = true;
      const url = common.supportCarListByAgIdUrl;
      const params = {
        batchNumber: this.batchNumber,
        agId: row.agId,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.paramsForm.tableData = data.supportCarList;
          this.carTableLoading = false;
        } else {
          this.carTableLoading = false;
        }
      }).catch(() => {
        this.carTableLoading = false;
      })
    },


  },
  filters: {
    function() {

    },
  },
};
</script>

<style scoped lang="scss">
  .supportGoldApprovalReason {
    .approvalTitle {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0 30px 0;
      border-bottom: 1px solid #eee;
      span {
        color: #000;
        font-weight: bold;
        font-size: 24px;
      }
    }

    
  }
</style>
