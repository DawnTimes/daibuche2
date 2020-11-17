<!--
 * @Author: 廖亿晓
 * @Date: 2020-11-05 13:58:19
 * @LastEditTime: 2020-11-16 20:33:07
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\verification\sortable.vue
-->

<template>
  <div style="sortable">
    <el-button type="primary" @click="queryForm">查询</el-button>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      border
      stripe
      show-summary
      :summary-method="getSummaries"
      ref="table"
      style="width: 100%"
      :header-cell-style="{
        'text-align': 'center',
        'font-weight': 'bold',
        background: '#627CAF',
        color: '#fff',
      }"
      align="left"
      
    >
      <el-table-column
        v-for="(item, index) in rowCol"
        :key="`rowCol_${index}`"
        :prop="dropCol[index].prop"
        :label="item.label"
        show-overflow-tooltip
        :width="item.width"
      >
        <template slot-scope="scope">
          <span v-if="dropCol[index].prop != 'num'">{{ scope.row[dropCol[index].prop] }}</span>
          <!-- <span v-if="dropCol[index].prop == 'num'">{{ scope.row[dropCol[index].prop] }}</span> -->
          <el-tooltip content="点击查询" placement="top" effect="light" v-if="dropCol[index].prop == 'num'">
            <el-link type="primary" @click="queryCar(scope.row)">{{ scope.row.num }}</el-link>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pre style="text-align: left">
      {{dropCol}}
    </pre>
    <hr>
    <pre style="text-align: left">
      {{tableData}}
    </pre> -->
  </div>
</template>
<script>
import Sortable from 'sortablejs';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import writeOffDialog from './components/writeOffDialog';
import nperCarList from './components/nperCarList';

import { mapState, mapMutations } from 'vuex';

import { moneyFormat } from '@/common/moneyFormat.js';

import draggable from "vuedraggable";

export default {
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
        cityName: '',
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

  created() {
    // console.log(this.dropCol);
  },

  computed: {
    ...mapState({
      dropCol: store => store.dropCol,
    })
  },

  mounted() {
    this.getContractRepayListData();
    this.rowDrop();
    this.columnDrop();
  },
  methods: {
    ...mapMutations({
      setDropCol: 'setDropCol',
    }),

    queryForm() {
      this.getContractRepayListData();
    },
    
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody');
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow);
        },
      });
    },
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr');
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          const oldItem = this.dropCol[evt.oldIndex];
          this.dropCol.splice(evt.oldIndex, 1);
          this.dropCol.splice(evt.newIndex, 0, oldItem);
          // localStorage.setItem('dropCol', JSON.stringify(this.dropCol))
          // 保存修改的列排序
          this.setDropCol(this.dropCol);
          // console.log(this.dropCol);
          // console.log(localStorage.getItem('dropCol'));
        },
      });
      
    },

    // 查询分页列表
    getContractRepayListData() {
      const url = common.queryContractRepayUrl;
      const params = {
        // name: this.formData.name,
        name: '佛山市南海狮山申联汽车销售服务有限公司',
        cityName: this.formData.cityName,
        repaymentStatus: this.formData.repaymentStatus,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };
      this.tableLoading = true;

      axios
        .post(url, params)
        .then((res) => {
          if (res.ec === '0') {
            const data = res.data;
            this.tableData = data.contRepayList;
            this.total = data.turnPageTotalNum * 1;
            this.tableLoading = false;

            this.tableData.forEach((item, index) => {
              // console.log(item);
            })
          } else {
            this.tableLoading = false;
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    
    // 合同状态
    contractNormalStatus(val) {
      if (val == 'Y') {}
    },

    // 车辆清单
    queryCar(row) {
      // this.carTableLoading = true;
      this.carTableData = [];
      const url = common.selectCarRepayListUrl;
      const params = {
        nper: row.nper,
        oldContractId: row.contractId,
      };
      // axios.post(url, params).then((res) => {
      //   if (res.ec === '0') {
      //     this.carTableData = res.data.carRepList;
      //     this.carTableLoading = false;
      //   } else {
      //     this.carTableLoading = false;
      //   }
      // }).catch(() => {
      //   this.carTableLoading = false;
      // })
      // this.$refs.nperCarListDialog.isShow(true);
    },

    // 合计
    getSummaries(param) {
      // console.log(param);
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }

        // if (column.property == 'nper' || column.property == 'num') {
        //   sums[index] = moneyFormat(sums[index]);
        //   return
        // }
        
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // 千分位格式化金额
          if (column.property == 'nper' || column.property == 'num') {
            sums[index] = moneyFormat(sums[index], 0);
          } else {
            sums[index] = moneyFormat(sums[index]);
          }
          
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    }
  },

  destroyed() {
    // localStorage.removeItem('rowCol');
    // localStorage.removeItem('dropCol');
    // console.log(123);
  }
};
</script>

<style lang="scss">
  // .el-table__footer-wrapper {
  //   font-size: 12px;
  // }

</style>
