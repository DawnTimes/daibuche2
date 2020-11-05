<template>
  <div>
    <div class="userPage" style="margin-top:-1.6%">
      <span>调剂确认 > 任务明细详情</span>
    </div>
    <p class="title">调剂任务明细</p>
    <div class="taskDetail">
      <div class="item" v-for="(val,index) in list.adjustmentInfo" :key="index">
        <label>{{val.key}}</label>
        <span>{{val.value}}</span>
      </div>
      <div class="item">
        <label></label>
        <span></span>
      </div>
      <div class="remark">
        <label>备注</label>
        <span>{{remark}}</span>
      </div>
    </div>

    <div class="return_btn">
      <router-link to="/VehicleAdjust">
        <el-button type="primary">返回</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from '@/common/axios.js';
export default {
  data() {
    return {
      list: {},
      remark: '',
    };
  },
  methods: {
    initData() {
      console.log(this.$route.query.type);
      let url = 'http://localhost:8080/static/adjustment/vehicleDetail.json';
      let params = { type: this.$route.query.type };
      axios.get(url, params).then((res) => {
        console.log(res.data);
        if (res.em === 'Success!') {
          this.list = res.data;
          this.remark = res.data.remark;
        }
      });
    },
  },
  created() {
    this.initData();
  },
};
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
  line-height: 80px;
}
.title {
  line-height: 60px;
}
.taskDetail {
  display: flex;
  flex-wrap: wrap;
}
.taskDetail .item {
  box-sizing: border-box;
  border: solid #f0f0f2 1px;
  width: 50%;
  height: 50px;
  line-height: 50px;
}
.taskDetail .item label {
  background: #f8f8f9;
  display: inline-block;
  width: 150px;
  height: 50px;
  text-align: center;
}
.taskDetail span {
  text-indent: 30px;
  display: inline-block;
  width: 70%;
}
.return_btn {
  margin-top: 60px;
  text-align: center;
}
.remark {
  width: 100%;
  height: 128px;
  box-sizing: border-box;
  border: solid #f0f0f2 1px;
  line-height: 128px;
}
.remark label {
  background: #f8f8f9;
  display: inline-block;
  width: 150px;
  text-align: center;
}
</style>