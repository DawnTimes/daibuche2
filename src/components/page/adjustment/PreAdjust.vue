<template>
  <div>
    <div class="userPage" style="margin-top:-1.6%">
      <span>
        车辆调剂 > 车辆调剂详情 > 预调剂
      </span>
    </div>
    <p class="title">预调剂</p>
    <div class="taskDetail">
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="任务编号">
          <el-input v-model="params.areaName" placeholder="任务编号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="调剂车辆">
          <el-select v-model="params.status" placeholder="调剂车辆" size="small" clearable>
            <el-option label="手动" value="Y"></el-option>
            <el-option label="自动" value="N"></el-option>
          </el-select>          
        </el-form-item>
        <el-form-item label="调入经销商">
          <el-select v-model="params.status" placeholder="调入经销商" size="small" clearable>
            <el-option label="手动" value="Y"></el-option>
            <el-option label="自动" value="N"></el-option>
          </el-select>          
        </el-form-item>
        <el-form-item label="合同生效日">
          <el-datePicker  v-model="params.socialCreditCode" type="date" placeholder="合同生效日" size="small"></el-datePicker>
        </el-form-item>
      </el-form>
      
    </div>
    
    <div class="return_btn">
      <el-button @click="doSure" type="primary">确定</el-button>
    </div>
    <msg-box v-if="hidden" :msgBox="msgBox" @submitForm="submitForm"></msg-box>
  </div>
</template>
<script>
import axios from "@/common/axios.js";
import msgBox from "@/components/page/common/msgBox";
export default {
  
  components:{
    msgBox
  },
  data() {
    return {
      list:{},
      hidden:false,
      msgBox:{confirst:"调剂方案生效！",consecond:"稍后在调剂列表中查看结果",icon:"iconchenggong-",btncontant:"确定"},
      params: {
        areaName : '',
        licenceName : '',
        status : '',
        lessor : '',
        socialCreditCode : '',
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 9,  // 每页展示的条数
      }
    };
  },
  methods: {
    doSure() {
      console.log(this.$route.query.type)
      let url = "http://localhost:8080/static/adjustment/vehicleDetail.json";
      let params = {"type":this.$route.query.type};
      axios.get(url, params).then(res => {
        console.log(res.data)
        this.hidden = true;
        if (res.em === 'Success!') {
          this.msgBox = {confirst:"预调剂成功！",consecond:"稍后在用户列表中查看结果",icon:"iconchenggong-",btncontant:"确定"};
        }else{
          this.msgBox = {confirst:"预调剂失败！",consecond:"您可以稍后重新操作",icon:"iconshibai",btncontant:"再次提交"};
        }
      })
    },
    submitForm(){
      this.hidden = false;
    }
  },
  created() {
    //this.initData();
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
</style>