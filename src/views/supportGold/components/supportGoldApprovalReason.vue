<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 17:08:12
 * @LastEditTime: 2020-08-28 15:19:06
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\components\supportGoldApprovalReason.vue
-->

<template>
  <div class="supportGoldApprovalReason">
    <div class="approvalTitle">
      <span>2020年{{ currentMonth }}月{{ batch }}支援金原因说明</span>
    </div>

    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="80px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="经销店:" prop="interfaceName">
          <el-input maxlength="50" v-model="formData.interfaceName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="是否收齐:" prop="interfaceName">
          <el-select v-model="formData.value" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in limitStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否商贸:" prop="interfaceName">
          <el-select v-model="formData.value" clearable placeholder="请选择" style="width: 100%">
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
        border
        stripe
        @sort-change="sortChange"
        show-summary
        :summary-method="getSummaries"
        :max-height="tableHeight"
        ref="table"
        style="width: 100%"
        :cell-style="{'text-align': 'center', 'height': '40px'}"
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
        <el-table-column align="center" prop="" label="经销店代码" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="id" label="经销店名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="支援金金额" sortable="custom" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="num" label="车辆数" sortable="custom" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <el-link type="primary" @click="queryCar(scope.row)">{{ scope.row.num }}</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="是否商贸" show-overflow-tooltip></el-table-column>
        
        <el-table-column align="center" prop="" label="是否收齐" show-overflow-tooltip></el-table-column> -->
        <!-- <el-table-column align="center" prop="" label="数据来源" show-overflow-tooltip></el-table-column> -->
        <el-table-column align="center" prop="reason" label="申请原因" sortable show-overflow-tooltip  width="160"></el-table-column>
        <el-table-column
            align="center"
            prop="rent"
            :label="setMonthTotal(2)"
            show-overflow-tooltip
            width="140"
            sortable
          ></el-table-column>
          <el-table-column
            align="center"
            prop
            :label="setMonthTotal(3)"
            show-overflow-tooltip
            width="140"
            sortable
          ></el-table-column>
          <el-table-column
            align="center"
            prop
            :label="setMonth(2)"
            show-overflow-tooltip
            width="120"
            sortable
          ></el-table-column>
          <el-table-column
            align="center"
            prop
            :label="setMonth(3)"
            show-overflow-tooltip
            width="120"
            sortable
          ></el-table-column>
          <el-table-column
            align="center"
            prop
            :label="setMonth(4)"
            show-overflow-tooltip
            width="120"
            sortable
          ></el-table-column>
          <el-table-column
            align="center"
            prop
            :label="setMonth(5)"
            show-overflow-tooltip
            width="120"
            sortable
          ></el-table-column>
      </el-table>
      <p class="tipText">备注：金额负号表示已收齐，正号表示还尚欠额；金额单位：元。</p>
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
    
    <carList-dialog ref="carListDialog"></carList-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import carListDialog from './carListDialog';

export default {
  name: '',
  props: {
    currentMonth: {
      type: String,
      default: '',
    },
    batch: {
      type: String,
      default: '',
    }
  },
  components: {
    carListDialog,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        
      },

      tableData: [
        { id: '经销店1', num: 88, rent: 9999, reason: '特殊原因' },
        { id: '经销店2', num: 68, rent: 6909 },
        { id: '经销店3', num: 98, rent: 3979 },
      ],
      tableHeight: 100,
      appravolStatus: [],
      limitStatus: [
        { value: 'Y', label: '是' },
        { value: 'N', label: '否' },
      ],
      isCommerce: [
        { value: 'Y', label: '非商贸' },
        { value: 'N', label: '商贸全资' },
        { value: 'R', label: '商贸非全资' },
      ],

    };
  },
  computed: {

  },
  watch: {

  },
  created() {
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

  },
  methods: {
    // 查询
    queryForm() {},

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },
    
    //监听排序
    sortChange(column, prop, order) {
      console.log(column, prop, order);
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
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 4) {
            // 合计车辆数
            sums[index] += '辆';
          } else {
            sums[index] += '元';
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
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
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
