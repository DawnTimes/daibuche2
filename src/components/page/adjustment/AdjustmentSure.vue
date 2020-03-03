<template>
  <div>
    <div class="userPage">
      <span>调剂确认 > 任务明细详情 > 调剂确认</span>
    </div>
    <p class="title">调剂任务明细</p>
    <div >
      <table id="tab" width="50%" cellspacing="0" cellpadding="0">
           <tr>
               <td class="name">经销商</td>
               <td class="value">{{list.agentShortName}}</td>
               <td class="name">调剂状态</td>
               <td class="value">{{list.adjustStatuView}}</td>                           

           </tr>
           <tr>
               <td class="name">调剂前车辆数</td>
               <td class="value">{{list.orgnCarNo}}</td>   
               <td class="name">调剂后车辆数</td>
               <td class="value">{{list.nowCarNo}}</td>                         
           </tr>
           <tr>
               <td class="name">调入车辆数</td>
               <td class="value">{{list.inCarNo}}</td>             
               <td class="name">调出车辆数量</td>
               <td class="value">{{list.outCarNo}}</td>             

           </tr>
      </table>
    </div>
    <p class="title">车辆详细信息</p>

      <el-table size="small" :data="tableData" stripe style="width: 100%" type="index" border :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}">
        <!-- 序号-调剂类型-调出经销商-调入经销商-车架号-发动机号码-车牌-批次起租日-租赁方式-牌照商-出租方-上牌地-是否限牌-合同生效时间-调剂时间 -->
        <el-table-column type="index" label="序号" :index="indexMethod" align="center"></el-table-column>
        <el-table-column prop="type" label="调剂类型" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="outAgentName" label="调出经销商" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="inAgentName" label="调入经销商"  :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="frameNumber" label="车架号"  :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="engineNumber" label="发动机号码" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="adjustType" label="调剂类型" :show-overflow-tooltip='true'></el-table-column>
				<el-table-column prop="adjustStatusView" label="调剂状态" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="plateNumber" label="车牌"  :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="atmt" label="手动/自动" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="carSeriesName" label="车系" :show-overflow-tooltip='true' ></el-table-column>
        <el-table-column prop="carModelName" label="车型"  :show-overflow-tooltip='true' ></el-table-column>    
        <el-table-column prop="batch" label="批次起租日"  :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="leaseWay" label="租赁方式"  :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="licenceName" label="牌照商" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="lessor" label="出租方" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="cityName" label="上牌地" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="isLimitLicence" label="是否限牌" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="contractValidTime" label="合同生效时间" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="createTime" label="调剂时间" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="note" label="备注" resizable :show-overflow-tooltip='true'></el-table-column>        
        <el-table-column label="操作" width="100" fixed="right" v-if="rolePermission.cancelAdjust">
          <template slot-scope="scope">
            <el-button size="mini" v-if="!(scope.row.adjustStatus === '2')" @click="canCelAdjust(scope.$index, scope.row)">取消调剂</el-button>
          </template>
        </el-table-column>        
      </el-table>
    <div class="return_btn">
      <el-button @click="doAdjust" type="primary" v-if="rolePermission.sureAdjust">确认调剂</el-button>
      <!-- <el-button @click="canCelAdjust" type="primary">取消调剂</el-button> -->
          <router-link to="/AdjustmentInfo">
              <el-button type="primary" style="margin-left:2%">返回</el-button>
          </router-link>      
    </div>
    <msg-box v-if="hidden" :msgBox="msgBox" @submitForm="submitForm"></msg-box>
  </div>
</template>
<script>
import axios from "@/common/axios.js";
import msgBox from "@/components/page/common/msgBox";
import common from "@/common/common.js";
export default {
  name: "Header",
  components: {
    msgBox
  },
  data() {
    return {
      rolePermission:{
        'cancelAdjust':false,
        'sureAdjust':false
      },
      rolePermissionArray:[143,152],
      list: {},
      msgBox: {
        confirst: "调剂方案生效！",
        consecond: "稍后在调剂列表中查看结果",
        icon: "iconchenggong-",
        btncontant: "确定"
      },
      hidden: false,
      tableData: [],
      carList: {
        agentId: this.$route.query.type.agentId,
        carAdjustDetail: []
      }
    };
  },
  updated(){
    let that = this;
    that.rolePermissionArray.forEach((item,index,array)=>{
    common.checkRolePermission(item,this.$store.state.asideInfoIds,Object.keys(that.rolePermission)[index],that.rolePermission);
    })
  },
  methods: {
    indexMethod(index) {
      return index  + 1
    },    
    initData() {
      let url = common.carAdjustDetailUrl;
      let params = { agentId: this.$route.query.type.agentId };
      axios.post(url, params).then(res => {
        if (res.em === "Success!") {
          this.tableData = res.data.carAdjustDetail;
          if (this.tableData.length == 0) {
            this.$router.push({
              path: "/AdjustmentInfo"
            });
          }
          this.tableData.forEach((obj, index) => {
            if (obj.batch) {
              obj.batch = obj.batch.substr(0, 10)
            }
            if (obj.contractValidTime) {
              obj.contractValidTime = obj.contractValidTime.substr(0, 10)
            }
            if (obj.createTime) {
              obj.createTime = obj.createTime.substr(0, 19)
            }
						
						if (obj.adjustType) {
						  if (obj.adjustType === '1') {
						    obj.adjustType = '处置流程'
						  } else {
						    obj.adjustType = '调剂流程'
						  }
						}
            if (obj.adjustStatus) {
              if (obj.adjustStatus === '2') {
                obj.adjustStatusView = '已确认调剂'
              } else {
                obj.adjustStatusView = '预调剂'
              }
            }
          })
        }
      });
    },
    doAdjust() {
      let url = common.carAdjustConfirmUrl;

        this.$confirm('本次调剂该经销商的调剂是否全部调剂完成?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           axios.post(url, {"agentId": this.$route.query.type.agentId}).then(res => {
        if (res.em === "Success!") {
          this.hidden = true
          this.msgBox = {
            flag:'success',
            confirst: "调剂方案生效！",
            consecond: "稍后在调剂列表中查看结果",
            icon: "iconchenggong-",
            btncontant: "确定"
          };
        } else {
          this.hidden = true
          this.msgBox = {
            flag:'fail',
            confirst: "调剂失败！",
            consecond: res.em,
            icon: "iconshibai",
            btncontant: "确定"
          };
        }
      });
        }).catch(() => {
                  
        });

     
    },
    canCelAdjust(index, rowData) {
          this.$confirm('请确认是否取消调剂', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params2 = {}
          params2.carPreAdjust = []
          let temp = {}
          temp.subcarAgentCompanyId = this.$route.query.type.agentCode
          temp.carInfoId = rowData.carInfoId
          temp.adjustTaskNo = rowData.adjustTaskNo
          temp.adjustStatus = '1'
          params2.carPreAdjust.push(temp)
          // 发送请求
          let url = common.deleteCarPreAdjustUrl
          axios.post(url, params2).then(res => {
            if (res.em === 'Success!') {
                this.$message({message: res.em,type: "success",duration: 1500})
                this.initData();
            } else {
                this.$alert(res.em, '提示', {confirmButtonText: '确定'})
            }
          }) 
        }).catch(() => {
                  
        });
    },
    submitForm(flag) {
      this.hidden = false;
      // 如果调剂成功刷新数据
      if (flag === 'success') {
        this.initData();
      }
    }
  },
  created() {
    this.initData();
  },
  mounted() {
    this.list = this.$route.query.type;
  }
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
  line-height: 30px;
}
.title {
  color: #666;
  line-height: 60px;
  font-size: 16px;
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
  text-align: center;
}
.taskDetail .item span {
  text-indent: 30px;
}
.return_btn {
  margin-top: 60px;
  text-align: center;
}
#tab {
  border: 1px solid #aaa;
  border-bottom: none;
}
#tab td {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #666;
  border: 1px solid #aaa;
  text-indent: 10px;
  border-top: none;
}

#tab td.name {
  width: 200px;
  background: #eee;
}
#tab td.value {
  width: 500px;
}
.back {
  text-align: center;
  margin-top: 30px;
}
</style>