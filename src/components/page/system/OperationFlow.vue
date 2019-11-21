<template>
  <div class="main">
    <div class="userPage">
      <el-form :inline="true" :model="formInline" class="demo-form-inline fr" id="form" label-width="100px">
        <el-form-item label="操作菜单">
          <el-input class="inputSelectClass" v-model="formInline.operationMenu" placeholder="操作菜单" size="small"></el-input>
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select class="inputSelectClass" v-model="formInline.operationType" placeholder="请选择操作类型" clearable size="small">
            <el-option label="新增" value="新增"></el-option>
            <el-option label="修改" value="修改"></el-option>
            <el-option label="删除" value="删除"></el-option>
            <el-option label="导入" value="导入"></el-option>
            <el-option label="导出" value="导出"></el-option>
            <el-option label="审批" value="审批"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input class="inputSelectClass" v-model="formInline.operationUser" placeholder="操作人" size="small"></el-input>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker
          style="width:515px"
           @change=timeChange
           size="small"
            v-model="value3"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            unlink-panels
            value-format='yyyy-MM-dd HH:mm:ss'
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="操作内容">
          <el-input class="inputSelectClass" v-model="formInline.operationContent" placeholder="操作内容" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border :data="tableData" style="width: 100%" stripe  :height="GLOBAL.height" :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}">
      <el-table-column fixed type="index" label="序号" width="100" :index="indexMethod" resizable align="center"></el-table-column>
      <el-table-column prop="operationMenu" label="操作菜单" width resizable></el-table-column>
      <el-table-column prop="operationUser" label="操作人" width resizable></el-table-column>
      <el-table-column prop="operationType" label="操作类型" width resizable></el-table-column>
      <el-table-column prop="operationTime" label="操作时间" width resizable></el-table-column>
      <el-table-column prop="operationResult" label="操作结果" width resizable></el-table-column>
      <el-table-column prop="operationContent" label="操作内容" width resizable></el-table-column>
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
import axios from "@/common/axios.js";
import common from "@/common/common.js";
export default {
  data() {
    return {
      totalCount: 0,
      currentPage: 1, //初始页
      pageSize: 10, //    每页的数据
      tableData: [],
      formInline: {
        operationMenu: "",
        operationType: "",
        operationTime: "",
        operationResult: "",
        operationContent: "",
        turnPageBeginPos: "1",
        turnPageShowNum: "10",
        operationTimefm:"",
        operationTimeto:"",
      },
      realFormInline: {
        operationMenu: "",
        operationType: "",
        operationTime: "",
        operationResult: "",
        operationContent: "",
        operationTimefm:"",
        operationTimeto:"",
      },
      value3: [ ]
    };
  },
  created() {
    this.initData();
  },
  methods: {
    timeChange(data) {
      if (data == null) {
        this.formInline.operationTimefm = ''
        this.formInline.operationTimeto = ''
        this.realFormInline.operationTimefm = ''
        this.realFormInline.operationTimeto = ''
       }
    },
    initData() {
      let url = common.findOperationLogUrl;
      if(this.value3){
        this.formInline.operationTime = this.value3;
        this.formInline.operationTimefm = this.value3[0];
        this.formInline.operationTimeto = this.value3[1];
      }
      
      // let newformInline = this.formInline; 
      axios.post(url, this.formInline).then(res => {
        this.tableData = res.data.operationLogList;
        this.totalCount = parseInt(res.data.turnPageTotalNum)
      });
    },
    initData2() {
      this.realFormInline.turnPageBeginPos = this.formInline.turnPageBeginPos
      this.realFormInline.turnPageShowNum = this.formInline.turnPageShowNum
      let url = common.findOperationLogUrl;
      this.realFormInline.operationTime = this.value3;
      axios.post(url, this.realFormInline).then(res => {
        this.tableData = res.data.operationLogList;
        this.totalCount = parseInt(res.data.turnPageTotalNum)
      });
    },
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1);
      return index + order + 1;
    },
    handleSizeChange(pageSize) {
      this.currentPage = 1;
      this.formInline.turnPageBeginPos = 1;
      this.pageSize = pageSize;
      this.formInline.turnPageShowNum = pageSize;
      this.initData2();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.formInline.turnPageBeginPos = (currentPage - 1) * this.pageSize + 1;
      this.initData2();
    },
    onSubmit() {
      this.formInline.turnPageBeginPos = 1
      this.currentPage = 1      
      this.initData();
      Object.assign(this.realFormInline, this.formInline)      
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  background: #fff;
  padding: 20px 0;
}
.userPage {
  overflow: hidden;
  padding: 0 40px 0 0;
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
.el-form--inline  {
  margin-right: 5px;
}
#form{
  margin-left: 20px;
}
.el-form-item {
    margin-bottom: 0;
}
</style>
