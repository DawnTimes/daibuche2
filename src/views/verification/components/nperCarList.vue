<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-12 10:02:45
 * @LastEditTime: 2020-11-10 17:40:41
 * @LastEditors: your name
 * @Description: 查询期数下所有车辆
 * @FilePath: \webcode2\src\views\verification\components\nperCarList.vue
-->
<template>
  <div class="nperCarList">
    <!-- <div class="backButton">
      <el-button plain @click="handleBack" size="medium">返回</el-button>
    </div>-->
    <el-dialog
      width="90%"
      :close-on-click-modal="false"
      :visible.sync="carFormVisible"
      title="车辆还款计划"
    >
      <div class="table">
        <el-table
          :data="carTableData"
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          border
          stripe
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
          <!-- <el-table-column prop="" label="承租人/牌照商" show-overflow-tooltip width="150"></el-table-column>          -->
          <el-table-column prop="contractNumber" label="合同编号" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop="nper" label="期数" show-overflow-tooltip width="60"></el-table-column>
          <el-table-column prop="modelCode" label="车型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="frameNumber" label="车架号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="plateNumber" label="车牌号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="engineNumber" label="发动机号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cityName" label="上牌地" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isLimitLicence" label="是否限牌" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.isLimitLicence | flagValue }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="leaseWay" label="租赁方式" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.leaseWay | leaseWay }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="" label="是否租赁公司" show-overflow-tooltip width="110"></el-table-column> -->

          <!-- <el-table-column prop="" label="核销状态" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <span
                :class="{greenStatus: scope.row.approvalStatus == '', redStatus: scope.row.approvalStatus == '', blueColor: scope.row.approvalStatus == '',
            yellowColor: scope.row.approvalStatus == ''}"
              >{{ formatStatus(scope.row.approvalStatus, dictTemp) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="核销人" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop="" label="核销时间" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop="" label="银行单据号" show-overflow-tooltip width="120"></el-table-column>-->
          <el-table-column prop="payDate" label="支付日" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.payDate | timeFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="principal" label="本金" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.principal | moneyFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="interest" label="利息" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.interest | moneyFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="rentCardFee" label="管理费" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.rentCardFee | moneyFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="commission" label="手续费" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.commission | moneyFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalMonthlyRent" label="月租合计" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.totalMonthlyRent | moneyFormat}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="" label="已收金额" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop="" label="已收本金" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop="" label="已收利息" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop="" label="已收管理费" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop="" label="已收手续费" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop="" label="未收金额" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop="" label="未收本金" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop="" label="未收利息" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop="" label="未收管理费" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop="" label="未收手续费" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop=""="remark" label="备注" show-overflow-tooltip></el-table-column>-->
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="carFormVisible = false" size="medium" plain>关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryDict } from '@/api/index.js';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

export default {
  name: '',
  props: {
    carTableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      // 数据字典
      dictTemp: [],

      carFormVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
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

    // 查询车辆
    queryCarListData() {
      const url = common.selectCarRepayListUrl;
      const params = {
        nper: '',
        oldContractId: '',
      };
    },

    // 返回
    // handleBack() {
    //   this.$router.push({
    //     path: '/contractListNper',
    //   });
    // },

    // 关闭
    // handleColse() {
    //   this.writeOffFormVisible = false;
    // },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.carFormVisible = isVisible;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.nperCarList {
  .backButton {
    padding: 20px;
  }

  .dialog-footer {
    text-align: center;
  }

  .el-dialog__title {
    font-weight: bold;
  }
}
</style>

<style>
.nperCarList .el-dialog__body {
  padding: 0 15px 15px !important;
}
</style>
