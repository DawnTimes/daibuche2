<template>
  <div>
    <div class="userPage" style="margin-top:-1.6%">
      <span>
        调剂确认 > 任务明细详情
      </span>
    </div>
    <p class="title">调剂任务明细</p>
    <div class="taskDetail">
      
      <table id="tab" width="100%" cellspacing="0" cellpadding="0">
           <tr>
               <td class="name">经销商名称</td>
               <td>{{list.agentShortName}}</td>
               <td class="name">调入车数量</td>
               <td>{{list.inCarNo}}</td>
           </tr>
           <tr>
               <td class="name">调出车数量</td>
               <td>{{list.outCarNo}}</td>
               <td class="name">原车数量</td>
               <td>{{list.orgnCarNo}}</td>
           </tr>
           <tr>
               <td class="name">现车数量</td>
               <td>{{list.nowCarNo}}</td>
               <td class="name">调剂状态</td>
               <td>{{list.adjustStatu}}</td>
           </tr>
       </table>
    </div>
    
    <div class="return_btn">
      <router-link to="/AdjustmentInfo">
        <el-button type="primary">返回</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from "@/common/axios.js";
export default {
  data() {
    return {
      list:{}
    };
  },
  methods: {
    
  },
  created() {
   
  },
   mounted(){
    this.list=this.$route.query.type
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
.title{
  line-height: 60px;
}
.taskDetail{
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
#tab{
    border:1px solid #aaa;
    border-bottom: none
}
#tab td{
    height: 40px;
    line-height:40px;
    font-size: 14px;
    color: #666;
    border:1px solid #aaa;
    text-indent: 10px;
    border-top: none;
}

#tab td.name{
    width: 120px;
    background: #eee;
}
.back{
    text-align: center;
    margin-top:30px;
}
</style>