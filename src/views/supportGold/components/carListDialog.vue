<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-20 10:23:26
 * @LastEditTime: 2020-09-21 18:52:53
 * @LastEditors: your name
 * @Description: 车辆支援金清单
 * @FilePath: \webcode2\src\views\supportGold\components\carListDialog.vue
-->

<template>
  <div class="carListDialog">
    <el-dialog width="90%" :close-on-click-modal="false" :visible.sync="carDialogVisible">
      <div class="table">
        <el-table
          :data="paramsForm.tableData"
          border
          stripe
          show-summary
          :summary-method="getSummaries"
          ref="table"
          style="width: 100%"
          :header-cell-style="{
        'text-align':'center',
        'font-weight':'bold',  
        'background':'#627CAF',    
        'color': '#fff',
      }"
        >
          <el-table-column width="50" align="center" label="序号" type="index" fixed></el-table-column>
          <el-table-column prop label="经销店名称" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column prop label="车架号" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop label="车牌号" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="车型" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="上牌地" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="批次" show-overflow-tooltip></el-table-column>

          <el-table-column prop="rent" label="租金" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.rent }}</span>
            </template>
          </el-table-column>
          <el-table-column prop label="牌照费" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="租金合计" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="车型支援金" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop label="牌照支援" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="总支援金" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="当期/总期数" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop label="剩余期数" show-overflow-tooltip></el-table-column>
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
  },
  components: {},
  data() {
    return {
      tableData: [
        { id: '0001', rent: '8888' },
        { id: '0002', rent: '3522' },
      ],

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
          sums[index] += ' 元';
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

<style scoped lang="scss">
.carListDialog {
  .backButton {
    padding: 20px;
  }

  .dialog-footer {
    text-align: center;
  }
}
</style>