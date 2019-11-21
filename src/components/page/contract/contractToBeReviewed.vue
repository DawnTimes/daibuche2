<template>
  <div class="main">
    <div class="userPage">
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="合同编号">
          <el-input class="inputSelectClass2" v-model="params.contractNumber" placeholder="请填写合同编号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="经销商">
          <el-input class="inputSelectClass2" v-model="params.agentName" placeholder="请填写经销商" size="small"></el-input>
        </el-form-item>
        <el-form-item label="牌照商">
          <el-input class="inputSelectClass2" v-model="params.licenceName" placeholder="请填写牌照商" size="small"></el-input>
        </el-form-item>
        <el-form-item label="租赁方式">
          <el-select class="inputSelectClass2" v-model="params.leaseWay" placeholder="请选择租赁方式" clearable size="small">
            <!-- 与经销店的租赁方式，1/直租、2/回租、3/经租。租赁方式可以确定合同类型 -->
            <el-option label="直租" value="LEASE"></el-option>
            <el-option label="回租" value="BACK-LEASE"></el-option>
            <el-option label="经租" value="OPERATING-LEASE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%" stripe border :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}"
 :height="GLOBAL.height">
      <el-table-column fixed type="index" label="序号" :index="indexMethod" resizable width="100"></el-table-column>
      <el-table-column prop="contractNumber" label="合同编号" width="220" fixed :show-overflow-tooltip='true' resizable>
        <template slot-scope="scope">
          <el-link type="primary" @click="contractNumberCick(scope.$index, scope.row)">{{scope.row.contractNumber}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="manageNumber" label="管理编号" width="150" fixed :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="contractName" label="合同名称" width="350" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="contractType" label="合同类型" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="contractNormalStatus" label="合同状态异常" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="agentFullName" label="经销商" width="250" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="licenceName" label="牌照商" width="250" :show-overflow-t-tooltip='true' resizable></el-table-column>
      <el-table-column prop="cityName" label="上牌城市" width="120" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="carCount" label="台数" width="80" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <!-- <el-table-column prop="monthlyRentAmout" label="月租金" width="150" :show-overflow-tooltip='true' resizable align="right"></el-table-column> -->
      <!-- <el-table-column prop="contractVersion" label="合同版本" width="100" :show-overflow-tooltip='true' resizable></el-table-column> -->
      <el-table-column prop="managementFeeAmout" label="管理费" width="100" :show-overflow-tooltip='true' resizable align="right"></el-table-column>
      <el-table-column prop="contractValidTime" label="合同生效时间" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="leaseWay" label="租赁方式" width="120" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="contractPath" label="合同下载" width="150" :show-overflow-tooltip='true' resizable>
         <template slot-scope="scope">
          <!-- <a :href='scope.row.contractPath' target="_Blank" v-if="scope.row.contractPath">{{scope.row.contractName}}</a> -->
          <el-button size="mini" @click="downLoad(scope.row.contractPath)" type="text" v-if="scope.row.contractPath">{{scope.row.contractName}}</el-button>
          <span v-if="!scope.row.contractPath">暂无</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOperation(scope.$index, scope.row, 'approvalContract')">审批</el-button>
          <el-button size="mini" @click="handleOperation(scope.$index, scope.row, 'viewTheRepaymentPlan')">查看还款计划</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      :height="GLOBAL.height"    
      background
      class="paginationClass"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="prev, pager, next, sizes, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>
<script>
import axios from "@/common/axios.js";
import common from "@/common/common.js";
import bus from "@/common/eventBus.js";

export default {
  data() {
    return {
      totalCount: 0,
      currentPage: 1, //初始页
      pageSize: 10, //    每页的数据
      tableData: [],
      params: {
        contractFlowStatus:[],
        contractNumber: "",
        agentFullName: "",
        licenceName: "",
        leaseWay: "",
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 10
      },
      realParams: {
        contractNumber: "",
        agentFullName: "",
        licenceName: "",
        leaseWay: "",
        contractFlowStatus:[]
      }
    };
  },
  created() {
    this.initData();
        bus.$on('forInitData', () => {
      this.initData()
    })
  },
  mounted() {
    this.initData();
  },
  methods: {
    downLoad(contractPath) {
      //  window.location.href = `http://192.166.87.119:8899/api/carmanage-admin/contract/downloadContract?fileName=${contractNumber}.pdf`
      //  window.location.href = `/api/carmanage-admin/contract/downloadContract?fileName=${contractNumber}.pdf`
       window.open(contractPath)
    },
    contractNumberCick(index, row) {
      let toPlan = false;
      let toApproval = false;
      this.$store.state.asideInfoIds.forEach((item,index,array)=>{
          if(item == 165){
            toPlan = true;
          }
          if(item == 162 || item == 163 ||item == 164 ){
            toApproval = true;  
          }    
      })
      if(toPlan){
        this.handleOperation(index, row, 'viewTheRepaymentPlan')
      }
      if(toApproval){
        this.handleOperation(index, row, 'approvalContract')
      }
    },
    handleOperation(index, row, name) {
        this.$emit('handleOperation', {contractNumber: row.contractNumber,contractPath:row.contractPath, flag:name, contractFlowStatus:row.contractFlowStatus})
    },
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1);
      return index + order + 1;
    },
    initData() {
      let url = common.findCarContractApprUrl;
      common.checkConstractFlow(162,this.$store.state.asideInfoIds,'1',this.params.contractFlowStatus);
      common.checkConstractFlow(163,this.$store.state.asideInfoIds,'2',this.params.contractFlowStatus);
      common.checkConstractFlow(164,this.$store.state.asideInfoIds,'3',this.params.contractFlowStatus);

       if (this.params.contractFlowStatus.length === 0) {
         this.params.contractFlowStatus.push('5')
       }      

      axios.post(url, this.params).then(res => {
        if (res.em === 'Success!') {
          this.tableData = res.data.contractApprList;
          this.totalCount = parseInt(res.data.turnPageTotalNum);
          this.tableData.forEach((obj, index) => {
            if (obj.contractValidTime) {
              obj.contractValidTime = obj.contractValidTime.substr(0, 10);
            }
            if (obj.createTime) {
              obj.createTime = obj.createTime.substr(0, 19);
            }            
              if (obj.leaseWay) {
                // LEASE-直租/BACK-LEASE-回租/OPERATING-LEASE - 经租
                if (obj.leaseWay === 'LEASE') {
                  obj.leaseWay = '直租'
                } 
                if (obj.leaseWay === 'BACK-LEASE') {
                  obj.leaseWay = '回租'
                } 
                if (obj.leaseWay === 'OPERATING-LEASE') {
                  obj.leaseWay = '经租'
                } 
              } 
                if (obj.contractNormalStatus) {
                    if (obj.contractNormalStatus === "Y") {
                        obj.contractNormalStatus = '正常'
                    } 
                    if (obj.contractNormalStatus === "N") {
                        obj.contractNormalStatus = '异常'
                    } 
                }              
              if (obj.contractType) {
                // LEASE-直租/BACK-LEASE-回租/OPERATING-LEASE - 经租
                if (obj.contractType === 'LEASE') {
                  obj.contractType = '直租合同'
                } 
                if (obj.contractType === 'BACK-LEASE') {
                  obj.contractType = '回租合同'
                } 
                if (obj.contractType === 'OPERATING-LEASE') {
                  obj.contractType = '经租合同'
                } 
                if (obj.contractType === 'LEASE-CHANGE') {
                  obj.contractType = '直租变更协议'
                } 
                if (obj.contractType === 'BACK-LEASE-CHANGE') {
                  obj.contractType = '回租变更协议'
                } 
                if (obj.contractType === 'OPERATING-LEASE-CHANGE') {
                  obj.contractType = '经租变更协议'
                } 
                if (obj.contractType === 'END_CHANGE') {
                  obj.contractType = '终止协议'
                } 
                if (obj.contractType === 'reservoir') {
                  obj.contractType = '合同补充协议'
                } 
              } 
          });
           
        }        
      });
    },
    initData2() {
      this.realParams.turnPageBeginPos = this.params.turnPageBeginPos
      this.realParams.turnPageShowNum = this.params.turnPageShowNum      
      let url = common.findCarContractApprUrl
      common.checkConstractFlow(162,this.$store.state.asideInfoIds,'1',this.realParams.contractFlowStatus);
      common.checkConstractFlow(163,this.$store.state.asideInfoIds,'2',this.realParams.contractFlowStatus);
      common.checkConstractFlow(164,this.$store.state.asideInfoIds,'3',this.realParams.contractFlowStatus);
      axios.post(url, this.realParams).then(res => {
        if (res.em === 'Success!') {
          this.tableData = res.data.contractApprList;
          this.totalCount = parseInt(res.data.turnPageTotalNum);
          this.tableData.forEach((obj, index) => {
            if (obj.contractValidTime) {
              obj.contractValidTime = obj.contractValidTime.substr(0, 10);
            }
            if (obj.createTime) {
              obj.createTime = obj.createTime.substr(0, 19);
            }   
              if (obj.leaseWay) {
                // LEASE-直租/BACK-LEASE-回租/OPERATING-LEASE - 经租
                if (obj.leaseWay === 'LEASE') {
                  obj.leaseWay = '直租'
                } 
                if (obj.leaseWay === 'BACK-LEASE') {
                  obj.leaseWay = '回租'
                } 
                if (obj.leaseWay === 'OPERATING-LEASE') {
                  obj.leaseWay = '经租'
                } 
              } 
              if (obj.contractType) {
                // LEASE-直租/BACK-LEASE-回租/OPERATING-LEASE - 经租
                if (obj.contractType === 'LEASE') {
                  obj.contractType = '直租合同'
                } 
                if (obj.contractType === 'BACK-LEASE') {
                  obj.contractType = '回租合同'
                } 
                if (obj.contractType === 'OPERATING-LEASE') {
                  obj.contractType = '经租合同'
                } 
                if (obj.contractType === 'LEASE-CHANGE') {
                  obj.contractType = '直租变更协议'
                } 
                if (obj.contractType === 'BACK-LEASE-CHANGE') {
                  obj.contractType = '回租变更协议'
                } 
                if (obj.contractType === 'OPERATING-LEASE-CHANGE') {
                  obj.contractType = '经租变更协议'
                } 
                if (obj.contractType === 'END_CHANGE') {
                  obj.contractType = '终止协议'
                } 
                if (obj.contractType === 'reservoir') {
                  obj.contractType = '合同补充协议'
                }                 
              } 
          });
           
        }        
      });
    },
    handleSizeChange(pageSize) {
      this.currentPage = 1;
      this.params.turnPageBeginPos = 1;
      this.pageSize = pageSize;
      this.params.turnPageShowNum = pageSize;
      this.initData2();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.params.turnPageBeginPos = (currentPage - 1) * this.pageSize + 1;
      this.initData2();
    },


    onSubmit() {
      this.params.turnPageBeginPos = 1
      this.currentPage = 1
      this.initData();
      Object.assign(this.realParams, this.params)      
    }
  }
};
</script>

<style lang="scss" scoped>

.el-form-item {
    margin: 2px 0 10px 0;
}
.main {
  background: #fff;
  padding:  0;
}
.userPage {
  overflow: hidden;
  padding-left: 10px;
  & > span {
    display: inline-block;
    height: 62px;
    line-height: 62px;
    width: 200px;
    color: red;
    font-size: 24px;
    i {
      font-size: 40px;
      margin-right: 10px;
    }
  }
}
/* .el-row {
  margin-bottom: 20px;
  padding-right: 40px;
  .el-button.is-round {
    padding: 12px 40px;
  }
} */
.el-form-item {
    margin: 0;
}
.paginationClass {
  margin: 1% 1% 0 0;
  text-align: right;
}
a{
      color: #409EFF;
}
.el-tabs__content{
  margin-bottom:50px;
}
</style>
