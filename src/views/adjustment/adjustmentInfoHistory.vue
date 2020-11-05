<template>
  <div class="main">
    <!-- <div style="margin:10px 0"> -->
    <!-- 查询条件：车架号、牌照商、出租方、租赁方式、调剂时间（起、至） -->
    <el-form :inline="true" :model="params" class="demo-form-inline" label-width="100px" size="small">
      <el-form-item label="车架号">
        <el-input
          class="inputSelectClass"
          v-model="params.frameNumber"
          placeholder="请填写"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="牌照商">
        <el-input
          class="inputSelectClass"
          v-model="params.licenceName"
          placeholder="请填写"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="出租方">
        <el-input class="inputSelectClass" v-model="params.lessor" placeholder="请填写" size="small"></el-input>
      </el-form-item>
      <el-form-item label="租赁方式">
        <el-select class="inputSelectClass" v-model="params.leaseWay" placeholder="请选择" clearable>
          <el-option label="直租" value="LEASE"></el-option>
          <el-option label="回租" value="BACK-LEASE"></el-option>
          <el-option label="经租" value="OPERATING-LEASE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="调出经销商">
        <el-input
          class="inputSelectClass"
          v-model="params.outAgentName"
          placeholder="请填写"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="调入经销商">
        <el-input
          class="inputSelectClass"
          v-model="params.inAgentName"
          placeholder="请填写"
          size="small"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="调剂时间(起)">
            <el-date-picker format="yyyy-MM-dd" type="date" value-format='yyyy-MM-dd' placeholder="选择日期" v-model="params.createTimeBegin" style="width: 100%;" size="small"></el-date-picker>         
      </el-form-item>-->
      <el-form-item label="调剂时间">
        <el-date-picker
          @change="timeChage"
          size="small"
          v-model="createTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-form :inline="true" :model="params" class="demo-form-inline">
          <el-form-item label="调剂时间(止)" label-width="100px">
              <el-date-picker format="yyyy-MM-dd" value-format='yyyy-MM-dd' type="date" placeholder="选择日期" v-model="params.createTimeEnd" style="width: 100%;" size="small"></el-date-picker>         
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
          </el-form-item>        
    </el-form>-->
    <!-- </div>         -->
    <el-table
      :data="tableData"
      style="width: 100%"
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
      <el-table-column fixed type="index" label="序号" :index="indexMethod" resizable width="80"></el-table-column>
      <!-- 调剂任务编号、车架号、牌照商、出租方、租赁方式、车牌、上牌地、主机厂匹配车型、调出经销商、调入经销商、调剂时间、合同生效时间、调剂状态 -->
      <el-table-column
        prop="adjustTaskNo"
        label="调剂任务编号"
        width="150"
        fixed
        :show-overflow-tooltip="true"
        resizable
        align="right"
      ></el-table-column>
      <el-table-column
        prop="frameNumber"
        label="车架号"
        width="200"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column prop="adjustType" label="调剂类型" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        prop="licenceName"
        label="牌照商"
        width="250"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="lessor"
        label="出租方"
        width="250"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="outAgentName"
        label="调出经销商"
        width="120"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="inAgentName"
        label="调入经销商"
        width="120"
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
        prop="plateNumber"
        label="车牌"
        width="120"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="cityName"
        label="上牌地"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="factoryMatchesModel"
        label="主机厂匹配车型"
        width="250"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="调剂时间"
        width="200"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="contractValidTime"
        label="合同生效时间"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="adjustStatuView"
        label="调剂状态"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column prop="note" label="备注" :show-overflow-tooltip="true" resizable></el-table-column>
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
      createTime: [],
      totalCount: 0,
      currentPage: 1, //初始页
      pageSize: 10, //    每页的数据
      tableData: [],
      params: {
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 10,
        createTimeBegin: '',
        createTimeEnd: '',
        frameNumber: '',
        leaseWay: '',
        lessor: '',
        licenceName: '',
      },
      realParams: {
        createTimeBegin: '',
        createTimeEnd: '',
        frameNumber: '',
        leaseWay: '',
        lessor: '',
        licenceName: '',
      },
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    setTimeout(function () {
      let height = document.getElementsByClassName('el-table__fixed')[0].style
        .height;
      height = height.replace('px', '');
      height = parseInt(height); // 234
      height = height - 14 + 'px';
      document.getElementsByClassName(
        'el-table__fixed'
      )[0].style.height = height;
    }, 1000);
  },
  methods: {
    timeChage(data) {
      if (data == null) {
        this.params.createTimeBegin = '';
        this.params.createTimeEnd = '';
        this.realParams.createTimeBegin = '';
        this.realParams.createTimeEnd = '';
      }
    },

    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1);
      return index + order + 1;
    },
    initData() {
      if (this.createTime) {
        this.params.createTimeBegin = this.createTime[0];
        this.params.createTimeEnd = this.createTime[1];
      }
      let url = common.carAdjustHistoryListUrl;
      axios.post(url, this.params).then((res) => {
        console.log(res);
        if (res.em === 'Success!') {
          this.tableData = res.data.carAdjustHistoryList;
          this.totalCount = parseInt(res.data.turnPageTotalNum);
          this.tableData.forEach((obj, index) => {
            if (obj.contractValidTime) {
              obj.contractValidTime = obj.contractValidTime.substr(0, 10);
            }
            if (obj.adjustStatu) {
              if (obj.adjustStatu === '1') {
                obj.adjustStatuView = '预调剂';
              }
              if (obj.adjustStatu === '2') {
                obj.adjustStatuView = '调剂已确认';
              }
            }
            if (obj.adjustType) {
              if (obj.adjustType === '1') {
                obj.adjustType = '处置流程';
              } else {
                obj.adjustType = '调剂流程';
              }
            }
            if (obj.leaseWay) {
              // LEASE-直租/BACK-LEASE-回租/OPERATING-LEASE - 经租
              if (obj.leaseWay === 'LEASE') {
                obj.leaseWay = '直租';
              }
              if (obj.leaseWay === 'BACK-LEASE') {
                obj.leaseWay = '回租';
              }
              if (obj.leaseWay === 'OPERATING-LEASE') {
                obj.leaseWay = '经租';
              }
            }
          });
        }
      });
    },
    initData2() {
      if (this.createTime) {
        this.realParams.createTimeBegin = this.createTime[0];
        this.realParams.createTimeEnd = this.createTime[1];
      }
      this.realParams.turnPageBeginPos = this.params.turnPageBeginPos;
      this.realParams.turnPageShowNum = this.params.turnPageShowNum;
      let url = common.carAdjustHistoryListUrl;
      axios.post(url, this.realParams).then((res) => {
        console.log(res);
        if (res.em === 'Success!') {
          this.tableData = res.data.carAdjustHistoryList;
          this.totalCount = parseInt(res.data.turnPageTotalNum);
          this.tableData.forEach((obj, index) => {
            if (obj.contractValidTime) {
              obj.contractValidTime = obj.contractValidTime.substr(0, 10);
            }
            if (obj.adjustStatu) {
              if (obj.adjustStatu === '1') {
                obj.adjustStatuView = '预调剂';
              }
              if (obj.adjustStatu === '2') {
                obj.adjustStatuView = '调剂已确认';
              }
            }
            if (obj.leaseWay) {
              // LEASE-直租/BACK-LEASE-回租/OPERATING-LEASE - 经租
              if (obj.leaseWay === 'LEASE') {
                obj.leaseWay = '直租';
              }
              if (obj.leaseWay === 'BACK-LEASE') {
                obj.leaseWay = '回租';
              }
              if (obj.leaseWay === 'OPERATING-LEASE') {
                obj.leaseWay = '经租';
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
      if (this.value3) {
        this.formInline.operationTime = this.value3;
        this.formInline.operationTimefm = this.value3[0];
        this.formInline.operationTimeto = this.value3[1];
      }
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
  padding: 20px 0 0 20px
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
  // margin: 0;
}
</style>
