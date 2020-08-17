<template>
  <div class="main">
    <div>
      <el-form :inline="true" :model="params" class="demo-form-inline" label-width="120px">
        <el-form-item label="经销商简称">
          <el-input
            class="inputSelectClass"
            v-model="params.agentShortName"
            placeholder="请填写"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="牌照商名称">
          <el-input
            class="inputSelectClass"
            v-model="params.licenceName"
            placeholder="请填写"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="租赁方式">
          <el-select
            class="inputSelectClass"
            v-model="params.leaseWay"
            placeholder="请选择租赁方式"
            clearable
            size="small"
          >
            <!-- 与经销店的租赁方式，1/直租、2/回租、3/经租。租赁方式可以确定合同类型 -->
            <el-option label="直租" value="LEASE"></el-option>
            <el-option label="回租" value="BACK-LEASE"></el-option>
            <el-option label="经租" value="OPERATING-LEASE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="限牌与否">
          <el-select
            class="inputSelectClass"
            v-model="params.isLimitLicence"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理编号">
          <el-input
            class="inputSelectClass"
            v-model="params.manageNumber"
            placeholder="请填写"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="上牌地">
          <el-input
            class="inputSelectClass"
            v-model="params.cityName"
            placeholder="请填写"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input
            class="inputSelectClass"
            v-model="params.contractNumber"
            placeholder="请填写"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="合同审核状态">
          <el-select
            class="inputSelectClass"
            v-model="params.contractFlowStatus"
            placeholder="请选择"
            clearable
            size="small"
          >
            <!-- 1生成合同（待会计审批）2会计审批（待财务负责人审批）3财务负责人审批（待业务审批）4业务审批（生效 -->
            <el-option label="待会计审批" value="1"></el-option>
            <el-option label="待财务负责人审批" value="2"></el-option>
            <el-option label="待业务审批" value="3"></el-option>
            <el-option label="生效" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否已寄合同">
          <el-select
            class="inputSelectClass"
            v-model="params.isSend"
            placeholder="请选择"
            clearable
            size="small"
          >
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style=" margin-top:10px"
      stripe
      border
      :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}"
      :height="GLOBAL.height"
    >
      <el-table-column fixed type="index" label="序号" :index="indexMethod" resizable width="100"></el-table-column>
      <el-table-column
        prop="contractNumber"
        label="合同编号"
        width="200"
        fixed
        :show-overflow-tooltip="true"
        resizable
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="contractNumberCick(scope.$index, scope.row)"
          >{{scope.row.contractNumber}}</el-link>
        </template>
      </el-table-column>

      <el-table-column
        prop="manageNumber"
        label="管理编号"
        width="150"
        fixed
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="cityName"
        label="上牌地"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="agentShortName"
        label="经销商简称"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="agentCode"
        label="经销商代码"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="agentFullName"
        label="经销商名称"
        width="250"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="licenceName"
        label="牌照商名称"
        width="250"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="contractType"
        label="合同类型"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="contractNormalStatus"
        label="合同状态异常"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="leaseWay"
        label="租赁方式"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="carCount"
        label="台数"
        width="100"
        :show-overflow-tooltip="true"
        resizable
        align="right"
      ></el-table-column>
      <!-- <el-table-column prop="monthlyRentAmout" label="月租金" width="150" :show-overflow-tooltip='true' resizable align="right"></el-table-column> -->
      <el-table-column
        prop="contractVersion"
        label="合同版本"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="isLimitLicence"
        label="限牌与否"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="contractFlowStatus"
        label="合同审核状态"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="isSend"
        label="是否已寄合同"
        width="120"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="contractPath"
        label="合同下载"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      >
        <template slot-scope="scope">
          <!-- <a :href='scope.row.contractPath' target="_Blank" v-if="scope.row.contractPath">{{scope.row.contractName}}</a> -->
          <el-button
            size="mini"
            @click="downLoad(scope.row.contractPath)"
            type="text"
            v-if="scope.row.contractPath"
          >点击下载</el-button>
          <span v-if="!scope.row.contractPath">暂无</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="250" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOperation(scope.$index, scope.row, 'viewApprovalProcess')">查看审批记录</el-button>
          <el-button size="mini" @click="handleOperation(scope.$index, scope.row, 'viewTheRepaymentPlan')">查看还款计划</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-pagination
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
import axios from '@/common/axios.js';
import common from '@/common/common.js';

export default {
  data() {
    return {
      totalCount: 0,
      currentPage: 1, //初始页
      pageSize: 10, //    每页的数据
      tableData: [],
      params: {
        licenceName: '',
        leaseWay: '',
        agentShortName: '',
        cityName: '',
        contractFlowStatus: '',
        contractNumber: '',
        isLimitLicence: '',
        isSend: '',
        manageNumber: '',
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 10,
      },
      realParams: {
        agentCode: '',
        agentShortName: '',
        cityName: '',
        contractFlowStatus: '',
        contractNumber: '',
        isLimitLicence: '',
        isSend: '',
        manageNumber: '',
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    downLoad(contractPath) {
      //  window.location.href = `http://192.166.87.119:8899/api/carmanage-admin/contract/downloadContract?fileName=${contractNumber}.pdf`
      //  window.location.href = `/api/carmanage-admin/contract/downloadContract?fileName=${contractNumber}.pdf`
      //  window.location.href = contractPath
      window.open(contractPath);
    },
    contractNumberCick(index, row) {
      this.handleOperation(index, row, 'viewApprovalProcess');
      /*       let flag = common.checkRolePermission2(165,this.$store.state.asideInfoIds);
      if (flag) {
        
      } */
      this.handleOperation(index, row, 'viewTheRepaymentPlan');
    },
    handleOperation(index, row, name) {
      this.$emit('handleOperation', {
        contractNumber: row.contractNumber,
        flag: name,
      });
    },
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1);
      return index + order + 1;
    },
    initData() {
      let url = common.findCarContractInfoUrl;
      axios.post(url, this.params).then((res) => {
        if (res.em === 'Success!') {
          this.tableData = res.data.contractInfoList;
          this.totalCount = parseInt(res.data.turnPageTotalNum);
          this.tableData.forEach((obj, index) => {
            if (obj.createTime) {
              obj.createTime = obj.createTime.substr(0, 19);
            }
            if (obj.contractType) {
              // LEASE-直租/BACK-LEASE-回租/OPERATING-LEASE - 经租
              if (obj.contractType === 'LEASE') {
                obj.contractType = '直租合同';
              }
              if (obj.contractType === 'BACK-LEASE') {
                obj.contractType = '回租合同';
              }
              if (obj.contractType === 'OPERATING-LEASE') {
                obj.contractType = '经租合同';
              }
              if (obj.contractType === 'LEASE-CHANGE') {
                obj.contractType = '直租变更协议';
              }
              if (obj.contractType === 'BACK-LEASE-CHANGE') {
                obj.contractType = '回租变更协议';
              }
              if (obj.contractType === 'OPERATING-LEASE-CHANGE') {
                obj.contractType = '经租变更协议';
              }
              if (obj.contractType === 'END_CHANGE') {
                obj.contractType = '终止协议';
              }
              if (obj.contractType === 'reservoir') {
                obj.contractType = '合同补充协议';
              }
            }
            if (obj.isSend) {
              if (obj.isSend === 'Y') {
                obj.isSend = '已寄出';
              }
              if (obj.isSend === 'N') {
                obj.isSend = '未寄出';
              }
            }
            if (obj.leaseWay) {
              if (obj.leaseWay == 'LEASE') {
                obj.leaseWay = '直租';
              }
              if (obj.leaseWay == 'BACK-LEASE') {
                obj.leaseWay = '回租';
              }
              if (obj.leaseWay == 'OPERATING-LEASE') {
                obj.leaseWay = '经租';
              }
            }
            if (obj.isLimitLicence) {
              if (obj.isLimitLicence === 'Y') {
                obj.isLimitLicence = '是';
              }
              if (obj.isLimitLicence === 'N') {
                obj.isLimitLicence = '否';
              }
            }
            if (obj.contractNormalStatus) {
              if (obj.contractNormalStatus === 'Y') {
                obj.contractNormalStatus = '正常';
              }
              if (obj.contractNormalStatus === 'N') {
                obj.contractNormalStatus = '异常';
              }
            }
            if (obj.contractNormalStatus) {
              if (obj.contractNormalStatus === 'Y') {
                obj.contractNormalStatus = '正常';
              }
              if (obj.contractNormalStatus === 'N') {
                obj.contractNormalStatus = '异常';
              }
            }
            if (obj.contractFlowStatus) {
              if (obj.contractFlowStatus === '1') {
                obj.contractFlowStatus = '待会计审批';
              } else if (obj.contractFlowStatus === '2') {
                obj.contractFlowStatus = '待财务负责人审批';
              } else if (obj.contractFlowStatus === '3') {
                obj.contractFlowStatus = '待业务审批';
              } else {
                obj.contractFlowStatus = '生效';
              }
            }
          });
        }
      });
    },
    initData2() {
      this.realParams.turnPageBeginPos = this.params.turnPageBeginPos;
      this.realParams.turnPageShowNum = this.params.turnPageShowNum;
      let url = common.findCarContractInfoUrl;
      axios.post(url, this.realParams).then((res) => {
        if (res.em === 'Success!') {
          this.tableData = res.data.contractInfoList;
          this.totalCount = parseInt(res.data.turnPageTotalNum);
          this.tableData.forEach((obj, index) => {
            if (obj.createTime) {
              obj.createTime = obj.createTime.substr(0, 19);
            }
            if (obj.isSend) {
              if (obj.isSend === 'Y') {
                obj.isSend = '已寄出';
              }
              if (obj.isSend === 'N') {
                obj.isSend = '未寄出';
              }
            }
            if (obj.leaseWay) {
              if (obj.leaseWay == 'LEASE') {
                obj.leaseWay = '直租';
              }
              if (obj.leaseWay == 'BACK-LEASE') {
                obj.leaseWay = '回租';
              }
              if (obj.leaseWay == 'OPERATING-LEASE') {
                obj.leaseWay = '经租';
              }
            }
            if (obj.contractNormalStatus) {
              if (obj.contractNormalStatus === 'Y') {
                obj.contractNormalStatus = '正常';
              }
              if (obj.contractNormalStatus === 'N') {
                obj.contractNormalStatus = '异常';
              }
            }
            if (obj.isLimitLicence) {
              if (obj.isLimitLicence === 'Y') {
                obj.isLimitLicence = '是';
              }
              if (obj.isLimitLicence === 'N') {
                obj.isLimitLicence = '否';
              }
            }
            if (obj.contractType) {
              // LEASE-直租/BACK-LEASE-回租/OPERATING-LEASE - 经租
              if (obj.contractType === 'LEASE') {
                obj.contractType = '直租合同';
              }
              if (obj.contractType === 'BACK-LEASE') {
                obj.contractType = '回租合同';
              }
              if (obj.contractType === 'OPERATING-LEASE') {
                obj.contractType = '经租合同';
              }
              if (obj.contractType === 'LEASE-CHANGE') {
                obj.contractType = '直租变更协议';
              }
              if (obj.contractType === 'BACK-LEASE-CHANGE') {
                obj.contractType = '回租变更协议';
              }
              if (obj.contractType === 'OPERATING-LEASE-CHANGE') {
                obj.contractType = '经租变更协议';
              }
              if (obj.contractType === 'END_CHANGE') {
                obj.contractType = '终止协议';
              }
              if (obj.contractType === 'reservoir') {
                obj.contractType = '合同补充协议';
              }
            }
            if (obj.contractNormalStatus) {
              if (obj.contractNormalStatus === 'Y') {
                obj.contractNormalStatus = '正常';
              }
              if (obj.contractNormalStatus === 'N') {
                obj.contractNormalStatus = '异常';
              }
            }
            if (obj.contractFlowStatus) {
              if (obj.contractFlowStatus === '1') {
                obj.contractFlowStatus = '待会计审批';
              } else if (obj.contractFlowStatus === '2') {
                obj.contractFlowStatus = '待财务负责人审批';
              } else if (obj.contractFlowStatus === '3') {
                obj.contractFlowStatus = '待业务审批';
              } else {
                obj.contractFlowStatus = '生效';
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
      this.params.turnPageBeginPos = 1;
      this.currentPage = 1;
      this.initData();
      Object.assign(this.realParams, this.params);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #fff;
  padding: 0;
}
.userPage {
  overflow: hidden;
  padding: 0 20px;
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
.el-row {
  margin-bottom: 20px;
  padding-right: 40px;
  .el-button.is-round {
    padding: 12px 40px;
  }
}
.paginationClass {
  margin: 1% 1% 0 0;
  text-align: right;
}
.el-form-item {
  margin-bottom: 0;
}
.el-form-item {
  margin: 2px 0 0px 0;
}
.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
}
/* .el-form{
  width: 1920px;
}
.el-button{
  margin-left: 40px
} */
</style>
