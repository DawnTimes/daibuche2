<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-12 10:02:45
 * @LastEditTime: 2020-08-12 16:51:01
 * @LastEditors: your name
 * @Description: 根据银行流水单的付款名称查询合同
 * @FilePath: \webcode2\src\views\verification\writeOffContractList.vue
-->
<template>
  <div class="writeOffContractList">
    <div class="backButton">
      <el-button plain @click="handleBack" size="medium">返回</el-button>
    </div>

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
        <el-table-column
          width="50"
          align="center"
          label="序号"
          type="index"
          fixed
        ></el-table-column>
        <el-table-column align="center" prop="id" label="合同编号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="id" label="经销店名称" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="牌照商名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="上牌地" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="是否限牌" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="合同状态" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span
            :class="{greenStatus: scope.row.approvalStatus == '', redStatus: scope.row.approvalStatus == '', blueColor: scope.row.approvalStatus == '',
            yellowColor: scope.row.approvalStatus == ''}"
            >{{ formatStatus(scope.row.approvalStatus, dictTemp) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="合同类型" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="租赁方式" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="车辆数量" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="月租金" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="月牌照费" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="月租金合计" show-overflow-tooltip width="120"></el-table-column>  
        <el-table-column align="center" prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="150"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleNper(scope.row)">选择期数</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  props: {

  },
  components: {

  },
  data() {
    return {
      tableData: [
        { id: '0001' }
      ],

      // 数据字典
      dictTemp: [],
    };
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
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
        
      })
    },

    // 格式化状态
    formatStatus(type, dictTemp = []) {      
      let columnValueDesc = '';
      dictTemp.forEach((v) => {
        if ( type === v.columnValueCode) {
          return columnValueDesc = v.columnValueDesc
        }
      })
      return columnValueDesc;
          
    },

    // 返回
    handleBack() {
      this.$router.push({
        path: '/bankWaterList',
      });
    },

    // 选择期数
    handleNper(row) {
      this.$router.push({
        path: '/contractListNper',
      });
    },
  },
  filters: {
    function() {

    },
  },
};
</script>

<style scoped lang="scss">
  .writeOffContractList {
    .backButton {
      padding: 20px;
    }
  }
</style>
