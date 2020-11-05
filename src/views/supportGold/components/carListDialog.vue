<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-20 10:23:26
 * @LastEditTime: 2020-10-22 17:26:49
 * @LastEditors: your name
 * @Description: 车辆支援金清单
 * @FilePath: \webcode2\src\views\supportGold\components\carListDialog.vue
-->

<template>
  <div class="carListDialog">
    <el-dialog width="90%" :close-on-click-modal="false" :visible.sync="carDialogVisible" :title="paramsForm.agentName + '支援金车辆清单'">
      <div class="table">
        <el-table
          :data="paramsForm.tableData"
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          border
          stripe
          show-summary
          :summary-method="getSummaries"
          ref="table"
          style="width: 100%"
          max-height="430px"
          :header-cell-style="{
        'text-align':'center',
        'font-weight':'bold',  
        'background':'#627CAF',    
        'color': '#fff',
      }"
        >
          <el-table-column width="50" align="center" label="序号" type="index" fixed></el-table-column>
          <el-table-column prop="agentName" label="经销店名称" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column prop="frameNumber" label="车架号" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.frameNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="plateNumber" label="车牌号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="modelCode" label="车型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cityName" label="上牌地" show-overflow-tooltip></el-table-column>
          <el-table-column prop="batch" label="批次" show-overflow-tooltip></el-table-column>

          <el-table-column prop="monthlyRent" label="租金" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.monthlyRent | moneyFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="rentCardFee" label="牌照费" show-overflow-tooltip>
            <template slot-scope="scope">
            <span>{{ scope.row.rentCardFee | moneyFormat}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="totalMonthlyRent" label="租金合计" show-overflow-tooltip>
            <template slot-scope="scope">
            <span>{{ scope.row.totalMonthlyRent | moneyFormat}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="supportFund" label="车型支援金" show-overflow-tooltip width="100">
            <template slot-scope="scope">
            <span>{{ scope.row.supportFund | moneyFormat}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="licenceFund" label="牌照支援金" show-overflow-tooltip>
            <template slot-scope="scope">
            <span>{{ scope.row.licenceFund | moneyFormat}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="totalFund" label="总支援金" show-overflow-tooltip>
            <template slot-scope="scope">
            <span>{{ scope.row.totalFund | moneyFormat}}</span>
          </template>
          </el-table-column>
          <el-table-column prop="currentTotal" label="当期/总期数" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop="surplus" label="剩余期数" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="carDialogVisible = false" size="medium" plain>关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import { moneyFormat } from '@/common/moneyFormat.js';

export default {
  name: '',
  props: {
    // getSummaries: {
    //   type: Function,
    //   default: (res) => {
    //     return {
    //       res: '',
    //     }
    //   }
    // },
    paramsForm: {
      type: Object,
      default: () => {
        return {}
      }
    },

    tableLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      tableData: [],

      // 数据字典
      dictTemp: [],

      carDialogVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    // this.getCarListData();
  },
  methods: {
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index >= 7 && index <= 12) {
            // 千分位格式化金额
            sums[index] = moneyFormat(sums[index]);
          } else {
            sums[index] = '';
          }
          
        } else {
          sums[index] = '';
        }
      });

      return sums;
    },

    // 获取车辆数据
    getCarListData(batchNumber = '', agId = '') {
      const url = common.supportCarListByAgIdUrl;
      const params = {
        batchNumber: batchNumber,
        agId: agId,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.supportCarList;
        }
      })
    },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.carDialogVisible = isVisible;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.carListDialog {
  .backButton {
    padding: 20px;
  }

  .dialog-footer {
    text-align: center;
  }

  .el-dialog__body {
    padding: 10px 20px 10px 10px;
  }

  .el-dialog__title {
    font-weight: bold;
  }
}
</style>