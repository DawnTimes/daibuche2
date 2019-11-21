<template>
  <div>
    <div class="userPage">
    </div>
    <el-table size="medium" :data="tableData" stripe style="width: 100%" type="index" border  :height="GLOBAL.height" :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}">
      <el-table-column fixed type="index" label="序号" :index="indexMethod" resizable width="100" align="center"></el-table-column>
      <el-table-column fixed prop="contractNumber" label="合同编号" width="200" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column fixed prop="Nper" label="期数" width="80" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column fixed prop="payDay" label="支付日" width="150"></el-table-column>
      <el-table-column prop="dueAmount" label="应收金额" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="duePrincipal" label="应收本金" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="dueInterest" label="应收利息" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="dueManagementFee" label="应收管理费" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="dueCommission" label="应收手续费" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="receivedAmount" label="已收金额" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="receivedPrincipal" label="已收本金" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="receivedInterest" label="已收利息" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="receivedManagementFee" label="已收管理费" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="receivedCommission" label="已收手续费" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="outstandingAmount" label="剩余金额" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="outstandingPrincipal" label="剩余本金" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="outstandingInterest" label="剩余利息" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="outstandingManagementFee" label="剩余管理费" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="outstandingCommission" label="剩余手续费" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "@/common/axios.js"
import common from "@/common/common.js";
export default {
  props:['dataParams'],
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    initData() {
      let url = common.findRepaymentPlanInfoUrl
      axios.post(url, {contractNumber:this.dataParams.contractNumber}).then(res => {
        if (res.em === 'Success!') {
            this.tableData = res.data.repaymentPlanList
            this.tableData.forEach((obj, index) => {
              if (obj.payDay) {
                obj.payDay = obj.payDay.substr(0, 10)
              }
            });            
        }          
      });
    }, 
    indexMethod(index) {
      return index + 1
    }
  },

  created() {
    this.initData();
  },
  mounted(){
    setTimeout(function(){
      let height = document.getElementsByClassName('el-table__fixed')[1].style.height
      height = height.replace('px', '')
      height = parseInt(height); // 234
      height = (height - 10) + 'px'
      let height2 = document.getElementsByClassName('el-table__fixed')[2].style.height
      height2 = height2.replace('px', '')
      height2 = parseInt(height2); // 234
      height2 = (height2 - 10) + 'px'



      document.getElementsByClassName('el-table__fixed')[1].style.height = height
      document.getElementsByClassName('el-table__fixed')[2].style.height = height2
      
     }, 1000);
  },  
}
</script>

<style scoped>
.paginationClass {
  margin-top: 1%;
  float: right;
}
.userPage {
  overflow: hidden;
  padding: 0 0 0 20px;
}
.userPage span {
  display: inline-block;
  /* height: 62px;
      line-height: 62px;
      width: 200px; */
  color: #d42027;
  font-size: 24px;
}
.userPage span i {
  font-size: 32px;
  margin-right: 10px;
}
.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
}
.el-button.is-round {
  border-radius: 20px;
  padding: 10px 35px;
}
</style>