<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-12 10:02:45
 * @LastEditTime: 2020-08-14 18:32:08
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
    >
      <div class="table">
        <el-table
          :data="tableData"
          border
          stripe
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
          <el-table-column width="50" align="center" label="序号" type="index" fixed></el-table-column>
          <el-table-column align="center" prop="" label="经销店名称" show-overflow-tooltip width="100"></el-table-column>         
          <el-table-column align="center" prop label="牌照商名称" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column align="center" prop="id" label="合同编号" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="期数" show-overflow-tooltip width="80"></el-table-column>
          <el-table-column align="center" prop label="车型" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="车架号" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="车牌号" show-overflow-tooltip width="100"></el-table-column>
          <!-- <el-table-column align="center" prop label="发动机号" show-overflow-tooltip width="100"></el-table-column> -->
          <el-table-column align="center" prop label="上牌地" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="是否限牌" show-overflow-tooltip width="100"></el-table-column>

          <el-table-column align="center" prop label="核销状态" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <span
                :class="{greenStatus: scope.row.approvalStatus == '', redStatus: scope.row.approvalStatus == '', blueColor: scope.row.approvalStatus == '',
            yellowColor: scope.row.approvalStatus == ''}"
              >{{ formatStatus(scope.row.approvalStatus, dictTemp) }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop label="核销人" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="核销时间" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="银行单据号" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column align="center" prop label="支付日" show-overflow-tooltip width="100"></el-table-column>

          <el-table-column align="center" prop label="应收金额" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="应收本金" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="应收利息" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="应收管理费" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column align="center" prop label="应收手续费" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column align="center" prop label="已收金额" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="已收本金" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="已收利息" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="已收管理费" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column align="center" prop label="已收手续费" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column align="center" prop label="未收金额" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="未收本金" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="未收利息" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop label="未收管理费" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column align="center" prop label="未收手续费" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column align="center" prop="remark" label="备注" show-overflow-tooltip></el-table-column>
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
  props: {},
  components: {},
  data() {
    return {
      tableData: [{ id: '0001' }],

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
}
</style>
