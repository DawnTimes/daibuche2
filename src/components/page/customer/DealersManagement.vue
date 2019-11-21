<template>
  <div>
    <div class="userPage">
      <!-- <span>
        <i class="iconfont iconkehuguanli"></i>经销商信息管理
      </span> -->
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="经销商">
          <el-input class="inputSelectClass" v-model="params.agentName" placeholder="经销商" size="small"></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码">
          <el-input class="inputSelectClass" v-model="params.socialCreditCode" placeholder="社会统一信用代码" size="small"></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-select class="inputSelectClass" v-model="params.status" placeholder="状态" size="small" clearable>
              <el-option label="有效" value="Y"></el-option>
              <el-option label="无效" value="N"></el-option>
            </el-select>          
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSearch" style="width:80px">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <el-row type="flex" class="row-bg" justify="end" style="margin-bottom:10px">
      <el-button icon="el-icon-plus" type="primary" plain round @click="addInfo">新增</el-button>
      <el-button icon="el-icon-upload2" type="primary" plain round @click="batchesimport">导入</el-button>
      <el-button icon="el-icon-download" type="primary" plain round @click="batchesDownload">导出</el-button>
    </el-row> -->
    <el-table size="medium" :data="tableData" stripe style="width: 100%" type="index" border  :height="GLOBAL.height" :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}">
      <el-table-column fixed type="index" label="序号" :index="indexMethod" resizable width="50" align="center"></el-table-column>
      <el-table-column fixed prop="agentCode" label="经销商代码" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column fixed prop="agentShortName" label="经销商简称" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="agentFullName" label="经销店名称" width="300" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="socialCreditCode" label="社会统一信用代码" width="200" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column fixed prop="isGacShop" label="商贸店" width="80"></el-table-column>
      <el-table-column prop="areaName" label="区域" width="50" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="provinceName" label="省份" width="80" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="cityName" label="城市" width="80" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="taxPayerType" label="纳税人类型" width="120" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="billingAddress" label="开票地址" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="billingTelephone" label="开票电话" width="150" :show-overflow-tooltip='true' resizable ></el-table-column>
      <el-table-column prop="bankAccountName" label="开户银行名称" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="legalRepresentative" label="法定代表人" width="100" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="legalTelephone" label="法定代表人联系电话" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="responsiblePerson" label="负责人" width="100" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="responsibleTelephone" label="负责人联系电话" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="customerManager" label="客服经理" width="100" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="customerManagerTelephone" label="客服经理联系电话" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="serviceManager" label="服务经理" width="100" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="serviceManagerTelephone" label="服务经理联系电话" width="150" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="status" label="状态" width="50" :show-overflow-tooltip='true' resizable></el-table-column>
      <el-table-column prop="mailingAddress" label="邮寄地址" width="500" :show-overflow-tooltip='true' resizable></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" style="color:#F00">删除</el-button>
        </template>
      </el-table-column> -->
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
import axios from "@/common/axios.js"
import common from "@/common/common.js";
export default {
  data() {
    return {
      totalCount: 0,
      currentPage: 1, //初始页
      pageSize: 10, //    每页的数据
      tableData: [],
      params: {
        agentName: "",
        socialCreditCode: "",
        status:"",
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 10,  // 每页展示的条数
      },
      realParams: {
        agentName: "",
        socialCreditCode: "",
        status:"",
      }
    };
  },
  methods: {
    initData() {
      let url = common.agentListUrl
      axios.post(url, this.params).then(res => {
        if (res.em === 'Success!') {
          this.tableData = res.data.agentList
          this.tableData.forEach((obj, index) => {
            if (obj.isGacShop) {
              if (obj.isGacShop === 'Y') {
                obj.isGacShop = '是'
              } 
              if (obj.isGacShop === 'N') {
                obj.isGacShop = '否'
              } 
            }
            if (obj.status) {
              if (obj.status === 'Y') {
                obj.status = '有效'
              } 
              if (obj.status === 'N') {
                obj.status = '无效'
              } 
            }

            // 0一般纳税人/1小规模纳税人/2个人
            if (obj.taxPayerType) {
              if (obj.taxPayerType === '0') {
                obj.taxPayerType = '一般纳税人'
              } 
              if (obj.taxPayerType === '1') {
                obj.taxPayerType = '小规模纳税人'
              } 
              if (obj.taxPayerType === '2') {
                obj.taxPayerType = '个人'
              } 
            }            
          })
          this.totalCount = parseInt(res.data.turnPageTotalNum)
        }
      })
    },
    initData2() {
      console.log(this.realParams)
      let url = common.agentListUrl
      this.realParams.turnPageBeginPos = this.params.turnPageBeginPos
      this.realParams.turnPageShowNum = this.params.turnPageShowNum

      axios.post(url, this.realParams).then(res => {
        if (res.em === 'Success!') {
          this.tableData = res.data.agentList
          this.tableData.forEach((obj, index) => {
            if (obj.isGacShop) {
              if (obj.isGacShop === 'Y') {
                obj.isGacShop = '是'
              } 
              if (obj.isGacShop === 'N') {
                obj.isGacShop = '否'
              } 
            }
            if (obj.status) {
              if (obj.status === 'Y') {
                obj.status = '有效'
              } 
              if (obj.status === 'N') {
                obj.status = '无效'
              } 
            }

            // 0一般纳税人/1小规模纳税人/2个人
            if (obj.taxPayerType) {
              if (obj.taxPayerType === '0') {
                obj.taxPayerType = '一般纳税人'
              } 
              if (obj.taxPayerType === '1') {
                obj.taxPayerType = '小规模纳税人'
              } 
              if (obj.taxPayerType === '2') {
                obj.taxPayerType = '个人'
              } 
            }            
          })
          this.totalCount = parseInt(res.data.turnPageTotalNum)
        }
      })
    },
    handleSizeChange(pageSize) {
      this.currentPage = 1
      this.params.turnPageBeginPos = 1
      this.pageSize = pageSize
      this.params.turnPageShowNum = pageSize
      this.initData2()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.params.turnPageBeginPos = ((currentPage-1) * this.pageSize) + 1
      this.initData2()
    },
    onSearch() {
      this.params.turnPageBeginPos = 1
      this.currentPage = 1      
      this.initData()
      // 然后赋值给realParams
      Object.assign(this.realParams, this.params)
    },
    addInfo() {
      console.log("addInfo!");
    },
    batchesimport() {
      console.log("batchesimport!");
    },
    batchesDownload() {
      console.log("batchesDownload!");
    },
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1)
      return index + order + 1
    }
  },

  created() {
    this.initData();
  },
  mounted(){
    setTimeout(function(){
      let height = document.getElementsByClassName('el-table__fixed')[0].style.height
      height = height.replace('px', '')
      height = parseInt(height); // 234
      height = (height - 14) + 'px'
      document.getElementsByClassName('el-table__fixed')[0].style.height = height
      
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

.el-form-item {
  margin:10px 0;
}
</style>