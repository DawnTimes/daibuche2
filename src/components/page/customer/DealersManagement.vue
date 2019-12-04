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
      <el-row type="flex" class="row-bg" justify="end" style="margin-bottom:10px">
        <el-button icon="el-icon-plus" type="primary" plain round @click="addInfo"  v-show="rolePermission.agentAdd">新增</el-button>
        <!-- <el-button icon="el-icon-upload2" type="primary" plain round @click="batchesimport">导入</el-button> -->
        <el-button icon="el-icon-download" type="primary" plain round @click="batchesDownload">导出</el-button>
      </el-row>      
    </div>

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
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button size="mini">查看</el-button> -->
          <el-button size="mini" @click="editAgent(scope.$index, scope.row)" v-show="rolePermission.agentEdit">修改</el-button>
        </template>

      </el-table-column>
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
    <div v-if="showAddAgent" class="showAddAgentInfo">
      <div class="msgbody">
        <header>
          新增经销商
          <i
            class="el-icon-close icon-right"
            @click="closeWindow"
            style="cursor:pointer;"
          ></i>
        </header>
        <div class="main-body controlDivClass">
          <el-form ref="form" :model="divParams" label-width="140px">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="经销商代码">
                    <el-input v-model="divParams.agentCode"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="经销商简称">
                    <el-input v-model="divParams.agentShortName"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="经销店名称">
                    <el-input v-model="divParams.agentFullName"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="社会统一信用代码">
                    <el-input v-model="divParams.socialCreditCode"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="是否商贸店">
                    <el-select
                      v-model="divParams.isGacShop"
                      style="width:100%"
                      clearable
                    >
                      <!-- AT--自动/MT--手动 -->
                      <el-option label="是" value="Y"></el-option>
                      <el-option label="否" value="N"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="邮寄地址">
                    <el-input v-model="divParams.mailingAddress"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="注册地址">
                    <el-input v-model="divParams.registerAddress"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="纳税人类型">
                    <el-input v-model="divParams.taxPaverType"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="开票地址">
                    <el-input v-model="divParams.billingAddress"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="开票电话">
                    <el-input v-model="divParams.billingTelephone"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="开户银行名称">
                    <el-input v-model="divParams.bankAccountName"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="开户银行账户">
                    <el-input v-model="divParams.bankAccountNo"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="法定代表人">
                    <el-input v-model="divParams.legalRepresentative"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="法定代表人电话">
                    <el-input v-model="divParams.legalTelephone"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="负责人">
                    <el-input v-model="divParams.responsiblePerson"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="负责人电话">
                    <el-input v-model="divParams.responsibleTelephone"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="客服经理">
                    <el-input v-model="divParams.customerManager"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="客服经理电话">
                    <el-input v-model="divParams.customerManagerTelephone"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="服务经理">
                    <el-input v-model="divParams.serviceManager"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="服务经理电话">
                    <el-input v-model="divParams.serviceManagerTelephone"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="状态">
                    <el-select
                      v-model="divParams.status"
                      style="width:100%"
                      clearable
                    >
                      <!-- AT--自动/MT--手动 -->
                      <el-option label="有效" value="Y"></el-option>
                      <el-option label="无效" value="N"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="所属地区">
                      <el-select v-model="divParams.areaCode" placeholder="所属地区" style="width:100%" @change="areaChange">
                        <el-option label="台湾" value="007"></el-option>
                        <el-option label="华北" value="003"></el-option>
                        <el-option label="华中" value="006"></el-option>
                        <el-option label="华东" value="004"></el-option>
                        <el-option label="东北" value="002"></el-option>
                        <el-option label="华南" value="005"></el-option>
                        <el-option label="西部" value="009"></el-option>
                        <el-option label="香港" value="008"></el-option>
                        <el-option label="澳门" value="001"></el-option>
                      </el-select>               
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="省份">
                    <el-select
                      v-model="divParams.provinceCode"
                      style="width:100%"
                      @change="provinceChange"
                    >
                    <el-option
                      v-for="item in provinceList"
                      :key="item.provinceCode"
                      :label="item.provinceName"
                      :value="item.provinceCode"
                    ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="城市">
                    <el-select v-model="divParams.cityCode" style="width:100%" 
            @change="selectDisposeCode">
                      <el-option
                        v-for="item in cityList"
                        :key="item.cityCode"
                        :label="item.cityName"
                        :value="item.cityCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>  
                                  
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="closeWindow">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>     
  </div>
</template>
<script>
import axios from "@/common/axios.js"
import common from "@/common/common.js";
export default {
  data() {
    return {
      rolePermission:{
        'agentAdd': false,
        'agentEdit': false,
      },
      rolePermissionArray:[102,103],
      provinceList: [],
      cityList: [],      
      divParams:{
        agentCode: "",
        agentShortName: "",
        agentFullName: "",
        socialCreditCode: "",
        isGacShop: "",
        mailingAddress: "",
        taxPaverType: "",
        billingAddress: "",
        billingTelephone: "",
        bankAccountName: "",
        bankAccountNo: "",
        legalRepresentative: "",
        legalTelephone: "",
        responsiblePerson: "",
        responsibleTelephone: "",
        customerManager: "",
        customerManagerTelephone: "",
        serviceManager: "",
        serviceManagerTelephone: "",
        status: "",
        registerAddress: "",
        areaCode: "",
        provinceCode: "",
        cityCode: "",
      },
      showAddAgent: false,
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
    
 selectDisposeCode(){
      this.$forceUpdate();
    },
    areaChange(areaCode) {
      this.divParams.provinceCode = "";
      this.divParams.cityCode = "";
      // 给省份 赋值
        let url = common.findProviInfoUrl
        axios.post(url, {areaCode:areaCode}).then(res => {
          if (res.em === "Success!") {
            this.provinceList = res.data.provinceList
          }
        })       
    },
    provinceChange() {
      this.divParams.cityCode = "";
        let url = common.findCityInfoUrl
        axios.post(url, { provinceCode: this.divParams.provinceCode }).then(res => {
          if (res.em === "Success!") {
            this.cityList = res.data.cityList
          }
        })      
    },    
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
      this.showAddAgent = true;
    },
    batchesimport() {
      console.log("batchesimport!");
    },
    batchesDownload() {
      console.log("batchesDownload!");
    },
 closeWindow() {
      this.showAddAgent = false;
      // this.setValueForCurd();
    },
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1)
      return index + order + 1
    },
    onSubmit() {
      let url = common.addOrUpdateAgentUrl
      axios2.post(url, this.divParams).then(res => {
        console.log(res)
        if (res.data.status === 'SUCCEED') {
          let _this = this
          _this.$message({message: "操作成功!",type: "success",duration: 1500})
          showAddAgent: false
        } else {
          this.$alert('添加失败，请联系管理员!', '提示', {confirmButtonText: '确定'})
        }
      }).catch(error => {
        if (error.message.includes('ORA-00001')) {
          this.$alert('用户名必须唯一，请重新填写!', '提示', {confirmButtonText: '确定'})
        }
      }) 
    }
  },

  created() {
    debugger
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
  mounted(){
    let that = this;

    that.rolePermissionArray.forEach((item,index,array)=>{
    common.checkRolePermission(item,this.$store.state.asideInfoIds,Object.keys(that.rolePermission)[index],that.rolePermission);

    })
  }, 
  editAgent(index,row){
      this.$router.push({
        path: "/editusermanage",
        query:{
          row:row
        }
      });
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
    align-items: flex-end;
    justify-content: space-between;  
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
.showAddAgentInfo, .showAdjust {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.showAddAgentInfo header,
.showAdjust header {
  text-align: center;
  font-size: 28px;
  padding: 0 20px 20px;
}
header .icon-right {
  float: right;
}
.showAddAgentInfo .msgbody {
  padding: 20px;
  background: #ffffff;
  width: 50%;
  border-radius: 10px;
}
.showAddAgentInfo .el-col {
  width: 48%;
}
.showAddAgentInfo .el-col:nth-child(2n) {
  padding-right: 4%;
}
.controlDivClass {
  height:400px;
  overflow:scroll;
}
</style>