<template>
  <div>
    <!-- <header class="car-management-header">车 辆 信 息 管 理</header> -->
    <el-row type="flex" class="row-bg" justify="end">
      <el-button icon="el-icon-search" type="primary" plain round @click="searchCarInfo">查询</el-button>
      <!-- <el-button icon="el-icon-plus" type="primary" plain round @click="addCarInfo" v-show= 'rolePermission.addCar'>增加车辆信息</el-button> -->
      <!-- <el-button
        icon="el-icon-upload2"
        type="primary"
        plain
        round
        @click="showUpload = true;"
      >批量导入车辆信息</el-button>-->
      <el-button
        icon="el-icon-download"
        type="primary"
        plain
        round
        @click="exportExcel"
        v-show="rolePermission.exportCar"
      >批量导出车辆信息</el-button>
    </el-row>
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      size="medium"
      :height="GLOBAL.height"
      border
      :cell-style="{'text-align': 'center', 'height': '40px'}"
      :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}"
    >
      <el-table-column fixed type="index" label="序号" :index="indexMethod" width="50" align="center"></el-table-column>
      <el-table-column
        fixed
        prop="frameNumber"
        label="车辆识别代号/车架号码"
        width="170"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="engineNumber"
        label="发动机号码"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column prop="batch" label="批次" :show-overflow-tooltip="true" resizable></el-table-column>
      <el-table-column
        prop="batchExpiryDate"
        label="批次到期日"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="batchStartingDate"
        label="批次起租日"
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
        prop="totalMonthlyRent"
        label="月租金合计"
        width="100"
        :show-overflow-tooltip="true"
        resizable
        align="right"
      ></el-table-column>
      <el-table-column
        prop="monthlyRent"
        label="月租金"
        :show-overflow-tooltip="true"
        resizable
        align="right"
      ></el-table-column>
      <el-table-column
        prop="rentCardFee"
        label="租牌费"
        :show-overflow-tooltip="true"
        resizable
        align="right"
      ></el-table-column>
      <el-table-column
        prop="carBrand"
        label="品牌"
        width="200"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="carSeries"
        label="车系"
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
      <el-table-column prop="msrp" label="MSRP" :show-overflow-tooltip="true" resizable></el-table-column>
      <el-table-column prop="atmt" label="手动/自动" width="90" :show-overflow-tooltip="true" resizable></el-table-column>
      <el-table-column
        prop="finalPayment"
        label="尾款"
        :show-overflow-tooltip="true"
        resizable
        align="right"
      ></el-table-column>
      <el-table-column
        prop="carUseView"
        label="车用途类型"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="agentCode"
        label="店代码"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="agentFullName"
        label="经销商名称（承租方）"
        width="250"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="licenceName"
        label="牌照商"
        width="250"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column prop="isLimitLicence" label="是否限牌" :show-overflow-tooltip="true" resizable></el-table-column>
      <el-table-column prop="provinceName" label="省份" :show-overflow-tooltip="true" resizable></el-table-column>
      <el-table-column prop="cityName" label="城市" :show-overflow-tooltip="true" resizable></el-table-column>
      <el-table-column prop="leaseWay" label="租赁方式" :show-overflow-tooltip="true" resizable></el-table-column>
      <el-table-column prop="reservoirView" label="蓄水池" :show-overflow-tooltip="true" resizable></el-table-column>
      <el-table-column
        prop="insuranceCompany"
        label="保险承保公司"
        width="110"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="insuranceNo"
        label="商业险保单号"
        width="110"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="insuranceEndDate"
        label="商业险到期日"
        width="110"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="compulsoryInsuranceNo"
        label="交强险保单号"
        width="110"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="compulsoryInsuranceEndDate"
        label="交强险到期日"
        width="110"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column prop="rentState" label="租金状态" :show-overflow-tooltip="true" resizable></el-table-column>
      <el-table-column
        prop="carStatus"
        label="处置状态"
        width="90"
        :show-overflow-tooltip="true"
        align="right"
        resizable
      ></el-table-column>
      <el-table-column prop="note" label="备注" :show-overflow-tooltip="true" resizable></el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            v-show="rolePermission.editCar"
          >编辑</el-button>
        </template>
      </el-table-column>
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
    <div v-if="showCarInfo" class="showCarInfo">
      <div class="msgbody">
        <header>
          {{showSearch}}
          <i class="el-icon-close icon-right" @click="showCarInfo=false"></i>
        </header>
        <div class="main-body">
          <CarInfoSearch
            ref="carInfo"
            :showMsg="currentMsg"
            :msgType="msgType"
            :showSearch="showSearch"
            :agentFullNameViewForSearchFather="agentFullNameViewForSearch"
            :agentCodeArrayFather="agentCodeArray"
            @onSearchSubmit="SearchInfoSubmit"
            @onCancel="onCancelClick"
            v-if="msgType=='search'"
          ></CarInfoSearch>
          <CarInfoAdd
            ref="carInfo"
            :showMsg="currentMsg"
            :msgType="msgType"
            :showSearch="showSearch"
            @onAddSubmit="AddInfoSubmit"
            @onCancel="onCancelClick"
            v-if="msgType=='add'"
          ></CarInfoAdd>
          <CarInfoEdit
            ref="carInfo"
            :showMsg="tempRow"
            :msgType="msgType"
            :showSearch="showSearch"
            @onEditSubmit="EditInfoSubmit"
            @onCancel="onCancelClick"
            v-if="msgType=='edit'"
          ></CarInfoEdit>
        </div>
      </div>
    </div>
    <!-- <div v-if="showUpload" class="showCarInfo showUpload">
      <div class="msgbody">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://192.166.88.8:88888/carmanage-admin/excel/importCars"
          accept="xls, xlsx"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button  size="small" type="primary" @click="batchesDownload">下载模板</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过5Mb</div>
        </el-upload>
        <i class="el-icon-close icon-right" @click="showUpload=false"></i>
      </div>
    </div>-->
  </div>
</template>

<script>
import CarInfoSearch from './carInfoSearch';
import CarInfoAdd from './carInfoAdd';
import CarInfoEdit from './carInfoEdit';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
export default {
  components: { CarInfoSearch, CarInfoAdd, CarInfoEdit },

  data() {
    return {
      temDataForSearch: {},
      tempRow: {},
      agentFullNameViewForSearch: [],
      agentCodeArray: [],
      rolePermission: {
        addCar: false,
        editCar: false,
        importCar: false,
        exportCar: false,
      },
      rolePermissionArray: [122, 123, 124, 125],
      sonData: {},
      fileList: [],
      showUpload: false,
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      showCarInfo: false,
      showSearch: '',
      tableData: [],
      currentMsg: {},
      msgType: '',
      hei: '',
      params: {
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 10, // 每页展示的条数
      },
      searchParams: {
        batch: '',
        msrp: '',
        frameNumber: '',
        factoryMatchesModel: '',
        plateNumber: '',
        engineNumber: '',
        monthlyRent: '',
        atmt: '',
        carUse: '',
        isLimitLicence: '',
        rentState: '',
      },
    };
  },
  created() {
    this.getCarInfo(this.params);
  },
  mounted() {
    let that = this;
    that.rolePermissionArray.forEach((item, index, array) => {
      common.checkRolePermission(
        item,
        this.$store.state.asideInfoIds,
        Object.keys(that.rolePermission)[index],
        that.rolePermission
      );
    });
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
    tableRowClassName(row) {
      if (row.row.carStatus == '已处置' || row.row.carStatus == 'Y') {
        return 'info-row';
      }
      return '';
    },
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1);
      return index + order + 1;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    batchesDownload() {},
    exportExcel() {
      // 导出
      // window.location.href = `http://192.166.88.8:88888/carmanage-admin/excel/exportCars?agentCode=${this.sonData.agentCode?this.sonData.agentCode:""}&atmt=${this.sonData.atmt?this.sonData.atmt:""}&batch=${this.sonData.batch?this.sonData.batch:""}&carUse=${this.sonData.carUse?this.sonData.carUse:""}&engineNumber=${this.sonData.engineNumber?this.sonData.engineNumber:""}&factoryMatchesModel=${this.sonData.factoryMatchesModel?this.sonData.factoryMatchesModel:""}&frameNumber=${this.sonData.frameNumber?this.sonData.frameNumber:""}&isLimitLicence=${this.sonData.isLimitLicence?this.sonData.isLimitLicence:""}&monthlyRent=${this.sonData.monthlyRent?this.sonData.monthlyRent:""}&msrp=${this.sonData.msrp?this.sonData.msrp:""}&plateNumber=${this.sonData.plateNumber?this.sonData.plateNumber:""}`
      window.location.href = `/api/carmanage-admin/excel/exportCars?agentCode=${
        this.sonData.agentCode ? this.sonData.agentCode : ''
      }&atmt=${this.sonData.atmt ? this.sonData.atmt : ''}&batch=${
        this.sonData.batch ? this.sonData.batch : ''
      }&carUse=${this.sonData.carUse ? this.sonData.carUse : ''}&engineNumber=${
        this.sonData.engineNumber ? this.sonData.engineNumber : ''
      }&factoryMatchesModel=${
        this.sonData.factoryMatchesModel ? this.sonData.factoryMatchesModel : ''
      }&frameNumber=${
        this.sonData.frameNumber ? this.sonData.frameNumber : ''
      }&isLimitLicence=${
        this.sonData.isLimitLicence ? this.sonData.isLimitLicence : ''
      }&monthlyRent=${
        this.sonData.monthlyRent ? this.sonData.monthlyRent : ''
      }&msrp=${this.sonData.msrp ? this.sonData.msrp : ''}&plateNumber=${
        this.sonData.plateNumber ? this.sonData.plateNumber : ''
      }`;
      // window.location.href = `http://192.166.87.119:8899/api/carmanage-admin/excel/exportCars`
    },
    AddInfoSubmit(data) {
      console.log(data);
      let addUrl = common.addOrUpdateCarUrl;
      data.operationType = '1';
      axios.post(addUrl, data).then((res) => {
        if (res.em === 'Success!') {
          this.$message({
            message: '操作成功!',
            type: 'success',
            duration: 1500,
          });
          this.tableData = res.data;
          this.showCarInfo = false;
          this.getCarInfo(this.params);
        } else {
          this.$alert('添加失败，请联系管理员!', '提示', {
            confirmButtonText: '确定',
          });
        }
      });
    },
    EditInfoSubmit(data) {
      let addUrl = common.addOrUpdateCarUrl;
      data.operationType = '2';
      console.log('hehe');
      console.log(data);
      axios.post(addUrl, data).then((res) => {
        console.log(res);
        if (res.em === 'Success!') {
          this.$message({
            message: '操作成功!',
            type: 'success',
            duration: 1500,
          });
          // this.tableData=res.data
          // this.getCarInfo({turnPageBeginPos: 1, turnPageShowNum: 10})

          console.log(this.temDataForSearch);
          console.log(this.agentFullNameViewForSearch);
          console.log(this.agentCodeArray);
          this.SearchInfoSubmit(
            this.temDataForSearch,
            this.agentFullNameViewForSearch,
            this.agentCodeArray
          );
          this.showCarInfo = false;
        } else {
          this.$alert('添加失败，请联系管理员!', '提示', {
            confirmButtonText: '确定',
          });
        }
      });
    },
    SearchInfoSubmit(data, agentFullNameViewForSearch, agentCodeArray) {
      this.temDataForSearch = data;
      this.agentFullNameViewForSearch = agentFullNameViewForSearch;
      this.agentCodeArray = agentCodeArray;
      Object.assign(this.sonData, data);
      data = Object.assign(data, this.params);
      // this.searchParams=data
      data = Object.assign(this.searchParams, data);
      this.params.turnPageBeginPos = 1;
      data.turnPageBeginPos = 1;
      this.currentPage = 1;
      let searchUrl = common.findCarPageUrl;
      axios.post(searchUrl, data).then((res) => {
        if (res.em === 'Success!') {
          this.tableData = res.data.carInfoList;
          this.tableData.forEach((obj, index) => {
            if (obj.isLimitLicence) {
              if (obj.isLimitLicence === 'Y') {
                obj.isLimitLicence = '是';
              }
              if (obj.isLimitLicence === 'N') {
                obj.isLimitLicence = '否';
              }
            }

            if (obj.atmt) {
              if (obj.atmt === 'AT') {
                obj.atmt = '自动';
              }
              if (obj.atmt === 'MT') {
                obj.atmt = '手动';
              }
            }

            if (obj.carUse) {
              // SUBCAR-代步车/HELPCAR-救援车
              if (obj.carUse === 'SUBCAR') {
                obj.carUseView = '代步车';
              }
              if (obj.carUse === 'HELPCAR') {
                obj.carUseView = '救援车';
              }
            }
            if (obj.reservoir) {
              // Y-是/N-否/S-自用
              if (obj.reservoir === 'Y') {
                obj.reservoirView = '是';
              }
              if (obj.reservoir === 'N') {
                obj.reservoirView = '否';
              }
              if (obj.reservoir === 'S') {
                obj.reservoirView = '自用';
              }
            }
            if (obj.compulsoryInsuranceEndDate)
              obj.compulsoryInsuranceEndDate = obj.compulsoryInsuranceEndDate.substr(
                0,
                10
              );
            if (obj.batchStartingDate)
              obj.batchStartingDate = obj.batchStartingDate.substr(0, 10);
            if (obj.batchExpiryDate)
              obj.batchExpiryDate = obj.batchExpiryDate.substr(0, 10);
            if (obj.insuranceEndDate)
              obj.insuranceEndDate = obj.insuranceEndDate.substr(0, 10);
            if (obj.rentState) {
              // 0空/1生效/2待会计审核/3待财务负责人审核
              if (obj.rentState === '0') {
                obj.rentState = '空';
              }
              if (obj.rentState === '1') {
                obj.rentState = '生效';
              }
              if (obj.rentState === '2') {
                obj.rentState = '待会计审核';
              }
              if (obj.rentState === '3') {
                obj.rentState = '待财务负责人审核';
              }
            }
            if (obj.carStatus) {
              if (obj.carStatus === 'Y') {
                obj.carStatus = '已处置';
              }
              if (obj.carStatus === 'N') {
                obj.carStatus = '未处置';
              }
            }
            if (obj.leaseWay) {
              // LEASE-直租/BACK-LEASE-回租/OPERATING-LEASE - 经租
              if (obj.leaseWay === 'LEASE' || obj.leaseWay === '1') {
                obj.leaseWay = '直租';
              }
              if (obj.leaseWay === 'BACK-LEASE' || obj.leaseWay === '2') {
                obj.leaseWay = '回租';
              }
              if (obj.leaseWay === 'OPERATING-LEASE' || obj.leaseWay === '3') {
                obj.leaseWay = '经租';
              }
            }
          });
          this.totalCount = parseInt(res.data.turnPageTotalNum);
          this.showCarInfo = false;
        } else {
          this.$alert('操作失败，请联系管理员!', '提示', {
            confirmButtonText: '确定',
          });
        }
      });
    },
    onCancelClick() {
      this.showCarInfo = false;
    },
    handleClick(row) {
      this.showCarInfo = true;
      this.showSearch = '编辑';
      //this.currentMsg = row;

      Object.assign(this.tempRow, row);

      this.msgType = 'edit';
    },
    addCarInfo(tableData) {
      this.showCarInfo = true;
      this.showSearch = '新增';
      this.msgType = 'add';
      this.currentMsg = {};
    },
    searchCarInfo() {
      Object.assign(this.currentMsg, this.searchParams);
      // console.log(this.currentMsg);
      this.showCarInfo = true;
      this.showSearch = '查询';
      this.msgType = 'search';

      // this.currentMsg = this.searchParams;
    },
    handleSizeChange(pageSize) {
      this.currentPage = 1;
      this.params.turnPageBeginPos = 1;
      this.searchParams.turnPageBeginPos = 1;
      this.pageSize = pageSize;
      this.params.turnPageShowNum = pageSize;
      this.searchParams.turnPageShowNum = pageSize;
      if (this.msgType == 'search') {
        this.searchParams.turnPageBeginPos =
          (this.currentPage - 1) * this.pageSize + 1;
        this.searchParams.turnPageShowNum = this.params.turnPageShowNum;
        this.getCarInfo(this.searchParams);
      } else {
        this.getCarInfo(this.params);
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.params.turnPageBeginPos = (currentPage - 1) * this.pageSize + 1;
      console.log(this.msgType);
      if (this.msgType == 'search') {
        this.searchParams.turnPageBeginPos =
          (currentPage - 1) * this.pageSize + 1;
        this.searchParams.turnPageShowNum = this.params.turnPageShowNum;
        this.getCarInfo(this.searchParams);
      } else {
        this.getCarInfo(this.params);
      }
    },
    getCarInfo(params) {
      let url = common.findCarPageUrl;
      params.status = '0';
      axios.post(url, params).then((res) => {
        if (res.em === 'Success!') {
          this.tableData = res.data.carInfoList;
          this.tableData.forEach((obj, index) => {
            if (obj.isLimitLicence) {
              if (obj.isLimitLicence === 'Y') {
                obj.isLimitLicence = '是';
              }
              if (obj.isLimitLicence === 'N') {
                obj.isLimitLicence = '否';
              }
            }

            if (obj.atmt) {
              if (obj.atmt === 'AT') {
                obj.atmt = '自动';
              }
              if (obj.atmt === 'MT') {
                obj.atmt = '手动';
              }
            }

            if (obj.carUse) {
              // SUBCAR-代步车/HELPCAR-救援车
              if (obj.carUse === 'SUBCAR') {
                obj.carUseView = '代步车';
              }
              if (obj.carUse === 'HELPCAR') {
                obj.carUseView = '救援车';
              }
            }
            if (obj.reservoir) {
              // Y-是/N-否/S-自用
              if (obj.reservoir === 'Y') {
                obj.reservoirView = '是';
              }
              if (obj.reservoir === 'N') {
                obj.reservoirView = '否';
              }
              if (obj.reservoir === 'S') {
                obj.reservoirView = '自用';
              }
            }
            if (obj.compulsoryInsuranceEndDate)
              obj.compulsoryInsuranceEndDate = obj.compulsoryInsuranceEndDate.substr(
                0,
                10
              );
            if (obj.batchStartingDate)
              obj.batchStartingDate = obj.batchStartingDate.substr(0, 10);
            if (obj.batchExpiryDate)
              obj.batchExpiryDate = obj.batchExpiryDate.substr(0, 10);
            if (obj.insuranceEndDate)
              obj.insuranceEndDate = obj.insuranceEndDate.substr(0, 10);
            if (obj.rentState) {
              // 0空/1生效/2待会计审核/3待财务负责人审核
              if (obj.rentState === '0') {
                obj.rentState = '空';
              }
              if (obj.rentState === '1') {
                obj.rentState = '生效';
              }
              if (obj.rentState === '2') {
                obj.rentState = '待会计审核';
              }
              if (obj.rentState === '3') {
                obj.rentState = '待财务负责人审核';
              }
            }
            if (obj.carStatus) {
              if (obj.carStatus === 'Y') {
                obj.carStatus = '已处置';
              }
              if (obj.carStatus === 'N') {
                obj.carStatus = '未处置';
              }
            }
            if (obj.leaseWay) {
              // LEASE-直租/BACK-LEASE-回租/OPERATING-LEASE - 经租
              if (obj.leaseWay === 'LEASE' || obj.leaseWay === '1') {
                obj.leaseWay = '直租';
              }
              if (obj.leaseWay === 'BACK-LEASE' || obj.leaseWay === '2') {
                obj.leaseWay = '回租';
              }
              if (obj.leaseWay === 'OPERATING-LEASE' || obj.leaseWay === '3') {
                obj.leaseWay = '经租';
              }
            }
          });

          this.totalCount = parseInt(res.data.turnPageTotalNum);
        }
      });
    },
  },
};
</script>
<style>
.el-table .info-row {
  background: #e4e4e4;
}
</style>
<style scoped>
.car-management-header {
  width: 100%;
  height: 40px;
  font-size: 22px;
  color: #666;
  position: absolute;
  left: 0;
  top: 10px;
  padding: 10px 0 0 20px;
  box-sizing: border-box;
}
.car-management-header .iconfont {
  font-size: 32px;
}
.el-row {
  margin: 10px 0;
}
.showCarInfo {
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
.showCarInfo header {
  text-align: center;
  font-size: 28px;
  padding: 0 20px 20px;
}
.showCarInfo header .icon-right {
  float: right;
}
.showCarInfo .msgbody {
  padding: 20px;
  background: #ffffff;
  width: 80%;
  border-radius: 10px;
}
.showUpload .msgbody {
  width: 40%;
  display: flex;
  align-items: flex-start;
}
.showUpload .msgbody .upload-demo {
  flex: 1;
}

.el-pagination {
  margin-top: 1%;
  display: flex;
  justify-content: flex-end;
}
.el-table_1_column_4 {
  text-align: center !important;
}
</style>
