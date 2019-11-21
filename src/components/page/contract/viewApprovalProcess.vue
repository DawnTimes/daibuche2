<template>
  <div>
    <div class="userPage" style="margin-top:-1.6%">
      <span>
        合同审批 > 审批记录
      </span>
    </div>
    <div class="taskDetail" v-for="item in tableData">
      <div class="item">
        <label>合同编号</label>
        <span>{{item.contractNumber}}</span>
      </div>
      <div class="item">
        <label>审批环节</label>
        <span>{{item.preStatus}}</span>
      </div>
      <div class="item">
        <label>审批操作</label>
        <span>{{item.approvalOperation}}</span>
      </div>
      <div class="item">
        <label>审批人</label>
        <span>{{item.approvalPerson}}</span>
      </div>
      <div class="item">
        <label>审批时间</label>
        <span>{{item.approvalTime}}</span>
      </div>
      <div class="item">
        <label>审批意见</label>
        <span>{{item.approvalOpinion}}</span>
      </div>      
    </div>
  </div>
</template>
<script>
import axios from "@/common/axios.js";
import common from "@/common/common.js";
export default {
  props:['dataParams'],
  data() {
    return {
        tableData:[]
    };
  },
  methods: {
    initData() {
      let url = common.findContractRecordUrl
      axios.post(url, {contractNumber:this.dataParams.contractNumber}).then(res => {
        if (res.em === 'Success!') {
            this.$emit('getContractApprOp', res.data.contractRecordsList)
            this.tableData = res.data.contractRecordsList
            this.tableData.forEach((obj,index) => {
               if (obj.approvalTime) obj.approvalTime = obj.approvalTime.substr(0, 10);
               if (obj.approvalOperation) {
                 if (obj.approvalOperation === 'Y') {
                    obj.approvalOperation = '批准'
                 } else {
                    obj.approvalOperation = '拒绝'
                 }
               }
              //  1生成合同（待会计审批）2会计审批（待财务负责人审批）3财务负责人审批（待业务审批）4业务审批（生效
               if(obj.preStatus) {
                 if (obj.preStatus === '1') {
                   obj.preStatus = '待会计审批'
                 } else if(obj.preStatus === '2') {
                   obj.preStatus = '待财务负责人审批'
                 } else if(obj.preStatus === '3') {
                    obj.preStatus = '待业务审批'
                 } else {
                    obj.preStatus = '生效'
                 }
               }
            }) 
        }          
      });
    },      
  },
  created() {
      this.initData()
  }
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
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.userPage span {
  color: #666;
  font-size: 18px;
  line-height:80px;
}
.taskDetail{
  margin-bottom: 3%;
  display: flex;
  flex-wrap: wrap;
}
.taskDetail .item{
  box-sizing: border-box;
  border: solid #F0F0F2 1px;
  width: 50%;
  height: 50px;
  line-height: 50px;
}
.taskDetail .item label{
  background: #F8F8F9;
  display: inline-block;
  width: 150px;
  text-align: center;
}
.taskDetail .item span{
  text-indent: 30px;
}
.return_btn{
  margin-top: 60px;
  text-align: center;
}
</style>