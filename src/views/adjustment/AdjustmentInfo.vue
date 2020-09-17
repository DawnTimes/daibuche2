<template>
  <div>
    <div class="userPage">
      <!-- <span> -->
      <!-- <i class="iconfont iconkehuguanli"></i>调剂确认 -->
      <!-- </span> -->
      <!-- <header class="car-management-header">调 剂 确 认</header> -->
      <el-form :inline="true" :model="params" class="demo-form-inline" label-width="100px">
        <!-- <el-form-item class="page-form-item" label="经销商名称">
          <el-select v-model="agentFullNameViewForSearch" placeholder="请选择经销商" multiple @remove-tag="removeTag" style="width:600px">
            <el-option value="" label="" style="height:200px;overflow: auto;background-color:#fff">
              <el-tree
                @node-click="nodeClick2"
                :load="loadNode"
                lazy
                :props="defaultProps"
                node-key="id"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="经销商">
          <el-input v-model="params.agentShortName" placeholder="请填写经销商" size="small"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      size="small"
      :data="tableData"
      stripe
      style="width: 100%"
      type="index"
      border
      :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}"
      :height="GLOBAL.height"
    >
      <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>

      <!-- <el-table-column prop="agentShortName" label="经销商简称" resizable>
        <template slot-scope="scope">
          <router-link :to="{path:'/TaskDetail',query:{type:scope.row.agentShortName}}">
            <el-button type="text" size="small">{{scope.row.agentShortName}}</el-button>
          </router-link>
        </template>
      </el-table-column> -->
      <!-- 经销商-调剂后车辆数-调剂前车辆数-调入车辆数-调出车辆数-调剂状态 -->
      <!-- 调剂后车辆数 新车辆数量
      调剂前车辆数 原车辆数量-->
      <el-table-column prop="agentShortName" label="经销商" resizable></el-table-column>
      <el-table-column prop="orgnCarNo" label="调剂前车辆数" resizable align="right"></el-table-column>
      <el-table-column prop="nowCarNo" label="调剂后车辆数" resizable align="right"></el-table-column>
      <el-table-column prop="inCarNo" label="调入车辆数" resizable align="right"></el-table-column>
      <el-table-column prop="outCarNo" label="调出车辆数量" resizable align="right"></el-table-column>
      <el-table-column prop="adjustStatu" label="调剂状态" width="160" resizable>
        <template slot-scope="scope">
          <router-link
            :to="{path:scope.row.adjustStatu=='2'?'/TaskDetail':'/AdjustmentSure',query:{type:scope.row}}"
          >
            <!-- <el-button type="text" size="small">{{scope.row.adjustStatu=='2' ? scope.row.adjustStatu='已确认' : scope.row.adjustStatu='待确认'}}</el-button> -->
            <el-button type="text" size="small">{{scope.row.adjustStatuView}}</el-button>
          </router-link>
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
  </div>
</template>
<script>
import common from '@/common/common.js';
import axios from '@/common/axios.js';
export default {
  data() {
    return {
      rolePermission: {
        sureAdjust: false,
        adjustInfo: false,
      },
      rolePermissionArray: [152, 153],
      agentFullNameViewForSearch: [],
      agentCodeArray: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
      },
      totalCount: 0,
      currentPage: 1, //初始页
      pageSize: 10, //    每页的数据
      tableData: [],
      params: {
        operationType: '2',
        agentCode: [],
        agentShortName: '',
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 10, // 每页展示的条数
        adjustStatu: '1',
      },
      pageUrl: '',
    };
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
  },
  methods: {
    removeTag(data) {
      for (let i = this.agentCodeArray.length - 1; i > 0; i--) {
        if (this.agentCodeArray[i].agentFullName === data) {
          this.agentCodeArray.splice(i, 1);
        }
      }
      console.log(this.agentCodeArray);
    },
    nodeClick2(data, node, component) {
      let flag = true;
      if (this.agentFullNameViewForSearch.length > 0) {
        this.agentFullNameViewForSearch.forEach((obj, index) => {
          if (obj === data.agentFullName) {
            flag = false;
          }
        });
      }
      if (flag) {
        this.agentFullNameViewForSearch.push(data.agentFullName);
        this.agentCodeArray.push(data);
      }
    },
    // 懒加载，加载树
    loadNode(node, resolve) {
      if (node.level === 0) {
        // 查询区域
        let url = common.findAreaInfoUrl;
        axios.post(url, {}).then((res) => {
          if (res.em === 'Success!') {
            res.data.areaList.forEach((obj, index) => {
              obj.name = obj.areaName;
            });
            return resolve(res.data.areaList);
          }
        });
      } else if (node.level === 1) {
        // 查询省份
        let url = common.findProviInfoUrl;
        axios.post(url, { areaCode: node.data.areaCode }).then((res) => {
          if (res.em === 'Success!') {
            res.data.provinceList.forEach((obj, index) => {
              obj.name = obj.provinceName;
            });
            return resolve(res.data.provinceList);
          }
        });
      } else if (node.level === 2) {
        // 查询城市
        let url = common.findCityInfoUrl;
        axios
          .post(url, { provinceCode: node.data.provinceCode })
          .then((res) => {
            if (res.em === 'Success!') {
              res.data.cityList.forEach((obj, index) => {
                obj.name = obj.cityName;
              });
              return resolve(res.data.cityList);
            }
          });
      } else {
        // 查询供应商
        let url = common.findCityAgentUrl;
        axios.post(url, { cityCode: node.data.cityCode }).then((res) => {
          // agentCode、agentFullName、agentShortName
          if (res.em === 'Success!') {
            res.data.cityAgent.forEach((obj, index) => {
              obj.name = obj.agentFullName;
              obj.leaf = true;
            });
            return resolve(res.data.cityAgent);
          }
        });
      }
    },

    initData() {
      let url = common.carAdjustlistUrl;
      axios.post(url, this.params).then((res) => {
        console.log(res);
        if (res.em === 'Success!') {
          this.tableData = res.data.carAdjustList;
          this.tableData.forEach((obj, index) => {
            if (obj.adjustStatu) {
              if (obj.adjustStatu === '1') {
                obj.adjustStatuView = '预调剂';
              }
              if (obj.adjustStatu === '2') {
                obj.adjustStatuView = '调剂已确认';
              }
            }
          });
          this.totalCount = parseInt(res.data.turnPageTotalNum);
        }
      });
    },

    handleSizeChange(pageSize) {
      this.currentPage = 1;
      this.params.turnPageBeginPos = 1;
      this.pageSize = pageSize;
      this.params.turnPageShowNum = pageSize;

      this.initData();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.params.turnPageBeginPos = (currentPage - 1) * this.pageSize + 1;
      this.initData();
    },
    onSearch() {
      this.params.agentCode = [];
      this.params.turnPageBeginPos = 1;
      this.currentPage = 1;
      console.log(this.agentCodeArray);

      if (this.agentCodeArray.length > 0) {
        this.params.operationType = '1';
        this.agentCodeArray.forEach((obj, index) => {
          this.params.agentCode.push(obj.agentCode);
        });
      }

      for (var i = this.params.agentCode.length - 1; i >= 0; i--) {
        if (!this.params.agentCode[i]) this.params.agentCode.splice(i, 1);
      }
      this.initData();
    },
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1);
      return index + order + 1;
    },
    filterTag(value, row) {
      return row.sureState === value;
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style  lang="scss" scoped>
.userPage {
  overflow: hidden;
  padding: 0;
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
.paginationClass {
  margin-top: 1%;
  float: right;
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

.car-management-header {
  margin-left: 20px;
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

.el-form-item {
  margin: 15px 0;
}
</style>