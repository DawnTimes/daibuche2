<template>
  <div>
    <!-- <header class="car-management-header">
      <span class="icon iconfont iconcheliangguanli"></span>车型管理
    </header>-->

    <!-- <header class="car-management-header">车 辆 类 型 管 理</header> -->
    <el-row type="flex" class="row-bg" justify="end">
      <el-button icon="el-icon-search" type="primary" plain round @click="searchCarType">查询</el-button>
      <!-- <el-button icon="el-icon-plus" type="primary" plain round @click="addCarTypeInfo" v-if="showAddButton">增加车型信息</el-button> -->
      <el-button
        icon="el-icon-plus"
        type="primary"
        plain
        round
        @click="addCarTypeInfo"
        v-show="rolePermission.addCarType"
      >增加车型信息</el-button>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style
      size="medium"
      border
      :height="GLOBAL.height"
      :cell-style="{'text-align': 'center', 'height': '40px'}"
      :header-cell-style="{
    'text-align':'center',
    'font-weight':'bold',  
    'background':'#627CAF',    
    'color': '#fff',
}"
    >
      <el-table-column
        fixed
        type="index"
        label="序号"
        :index="indexMethod"
        resizable
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="carBrand" label="品牌" resizable></el-table-column>
      <el-table-column prop="carSeries" label="车系" resizable></el-table-column>
      <el-table-column prop="carModel" label="车型" resizable></el-table-column>
      <el-table-column prop="carModelName" label="车型名" resizable></el-table-column>
      <!-- <el-table-column label="操作" v-if="showEditButton"> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            v-show="rolePermission.editCarType"
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
      :page-sizes="[10, 30, 50, 100]"
      :page-size="pageSize"
      layout="prev, pager, next, sizes, jumper"
      :total="totalCount"
    ></el-pagination>
    <div v-if="showCarTypeSearch" class="showCarInfo">
      <div class="msgbody">
        <header>
          {{showSearchText}}
          <i
            class="el-icon-close icon-right"
            @click="closeWindow"
            style="cursor:pointer;"
          ></i>
        </header>
        <div class="main-body">
          <el-form ref="form" :model="params" label-width="100px" :rules="rules">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="品牌" prop="carBrand">
                    <el-select
                      :disabled="carModelDisable"
                      v-model="params.carBrand"
                      placeholder="请选择"
                      style="width:100%"
                      @change="carBrandChange"
                      clearable
                    >
                      <el-option
                        v-for="item in beforeSearchData.carBrandData"
                        :key="item.carBrand"
                        :label="item.carBrandName"
                        :value="item.carBrand"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="车系" prop="carSeries">
                    <el-select
                      :disabled="carModelDisable"
                      v-model="params.carSeries"
                      placeholder="请选择"
                      style="width:100%"
                      @change="carSeriesChange"
                      clearable
                    >
                      <el-option
                        v-for="item in beforeSearchData.carSeriesData"
                        :key="item.carSeries"
                        :label="item.carSeriesName"
                        :value="item.carSeries"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="车型" v-if="this.params.operation !== '3'" prop="carModel">
                    <el-input
                      v-model="params.carModel"
                      placeholder="请输入"
                      :disabled="carModelDisable"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="车型" v-if="this.params.operation === '3'" prop="carModel">
                    <el-select
                      v-model="params.carModel"
                      placeholder="请选择"
                      style="width:100%"
                      clearable
                    >
                      <el-option
                        v-for="item in beforeSearchData.carModelData"
                        :key="item.carModel"
                        :label="item.carModel"
                        :value="item.carModel"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="车型名" prop="carModelName">
                    <el-input v-model="params.carModelName" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">提交</el-button>
              <el-button @click="closeWindow">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/common/axios.js';
import { mapState, mapMutations } from 'vuex';
import common from '@/common/common.js';
export default {
  name: 'addCarType',
  data() {
    return {
      rolePermission: {
        addCarType: false,
        editCarType: false,
      },
      rolePermissionArray: [132, 133],
      rules: {
        carBrand: [
          { required: true, message: '请输入车的品牌', trigger: 'blur' },
        ],
        carSeries: [{ required: true, message: '请输入车系', trigger: 'blur' }],
        carModel: [{ required: true, message: '请输入车型', trigger: 'blur' }],
        carModelName: [
          { required: true, message: '请输入车型名', trigger: 'blur' },
        ],
      },
      showEditButton: false,
      showAddButton: false,
      carModelDisable: false,
      tableData: [],
      showSearchText: '',
      showCarTypeSearch: false,
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      params: {
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 10, // 每页展示的条数
        carBrand: '',
        carSeries: '',
        carModel: '',
        carModelName: '',
        // 操作类型(1:新增 2:修改 3:查询)
        operation: '3',
      },
      realParams: {
        carBrand: '',
        carSeries: '',
        carModel: '',
        carModelName: '',
        operation: '3',
      },
      crudParams: {
        carBrandAdd: '',
        carSeriesAdd: '',
        carModelAdd: '',
        carModelNameAdd: '',

        carBrandSearch: '',
        carSeriesSearch: '',
        carModelSearch: '',
        carModelNameSearch: '',
      },
      beforeSearchData: {
        carBrandData: [],
        carSeriesData: [],
        carModelData: [],
      },
    };
  },
  computed: {
    ...mapState(['asideInfo']),
  },
  created() {
    // this.initPermission()
    this.getCarTypeInfo();
    // 去查品牌然后把数据塞入下拉框中
    if (this.beforeSearchData.carBrandData.length === 0) {
      // 调用接口加载数据
      let url = common.carBrandOperationUrl;
      axios.post(url, {}).then((res) => {
        if (res.em === 'Success!') {
          this.beforeSearchData.carBrandData = res.data.carBrankList;
        }
      });
    }
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
    /*     initPermission() {
      let permissionArray = this.asideInfo[3].children[1].children
      console.log(permissionArray)
      permissionArray.forEach((obj, index) => {
        if (obj.label === 'add') this.showAddButton = true
        if (obj.label === 'update') this.showAddButton = true
      })
    }, */
    carBrandChange(carBrand) {
      if (carBrand === '') {
        this.params.carSeries = '';
        this.params.carModel = '';
        return;
      }
      // 去查车系然后把数据塞入下拉框中
      // 调用接口加载数据
      let url = common.carSeriesOperationUrl;
      axios.post(url, { carBrand }).then((res) => {
        console.log(res);
        if (res.em === 'Success!') {
          this.beforeSearchData.carSeriesData = res.data.carSeriesList;
        }
      });
    },
    carSeriesChange(carSeries) {
      if (carSeries === '') {
        this.params.carModel = '';
        return;
      }
      // 去查车系然后把数据塞入下拉框中
      // 调用接口加载数据
      let url = common.carModelOperationUrl;
      axios
        .post(url, {
          carSeries: carSeries,
          turnPageBeginPos: 1,
          turnPageShowNum: 10000,
        })
        .then((res) => {
          console.log(res);
          if (res.em === 'Success!') {
            this.beforeSearchData.carModelData = res.data.carModelList;
          }
        });
    },
    closeWindow(data) {
      this.showCarTypeSearch = false;
      this.setValueForCurd(data);
    },
    setValueForCurd(data) {
      if (this.params.operation === '1') {
        this.crudParams.carBrandAdd = this.params.carBrand;
        this.crudParams.carSeriesAdd = this.params.carSeries;
        this.crudParams.carModelAdd = this.params.carModel;
        this.crudParams.carModelNameAdd = this.params.carModelName;
        this.params.operation = '3';
      } else if (this.params.operation === '3') {
        this.crudParams.carBrandSearch = this.params.carBrand;
        this.crudParams.carSeriesSearch = this.params.carSeries;
        this.crudParams.carModelSearch = this.params.carModel;
        this.crudParams.carModelNameSearch = this.params.carModelName;
        this.params.operation = '3';
      } else {
        this.params.carBrand = '';
        this.params.carSeries = '';
        this.params.carModel = '';
        this.params.carModelName = '';
        this.params.operation = '3';
      }

      if (!data) {
        this.realParams.carBrand = '';
        this.realParams.carSeries = '';
        this.realParams.carModel = '';
        this.realParams.carModelName = '';
        this.realParams.operation = '3';
      }
    },
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1);
      return index + order + 1;
    },
    onSubmit(formName) {
      if (this.params.operation === '1') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.params.turnPageBeginPos = 1;
            this.currentPage = 1;
            this.getCarTypeInfo();
            Object.assign(this.realParams, this.params);
          } else {
            return false;
          }
        });
      } else {
        this.params.turnPageBeginPos = 1;
        this.currentPage = 1;
        this.getCarTypeInfo();
        Object.assign(this.realParams, this.params);
      }

      // console.log(this.realParams);
    },
    getCarTypeInfo() {
      // 可能是增、删、改
      let url = common.carModelOperationUrl;
      console.log(this.params);
      axios.post(url, this.params).then((res) => {
        if (res.em === 'Success!') {
          if (this.params.operation != '3') {
            this.$message({
              message: '操作成功!',
              type: 'success',
              duration: 1500,
            });

            // 置空参数
            this.params.carBrand = '';
            this.params.carSeries = '';
            this.params.carModel = '';
            this.params.carModelName = '';
            this.params.operation = '3';
            this.realParams.carBrand = '';
            this.realParams.carSeries = '';
            this.realParams.carModel = '';
            this.realParams.carModelName = '';
            this.realParams.operation = '3';
            axios.post(url, this.params).then((res) => {
              if (res.em === 'Success!') {
                this.tableData = res.data.carModelList;
                this.totalCount = parseInt(res.data.turnPageTotalNum);
                this.closeWindow('search');
              }
            });
          } else {
            this.tableData = res.data.carModelList;
            this.totalCount = parseInt(res.data.turnPageTotalNum);
            this.closeWindow('search');
          }
        } else if (res.em.includes('ORA-00001')) {
          // 车型不唯一
          this.$alert('操作失败，输入车型不唯一，请重新输入！', '提示', {
            confirmButtonText: '确定',
          });
        }
      });
    },
    getCarTypeInfo2() {
      this.realParams.turnPageBeginPos = this.params.turnPageBeginPos;
      this.realParams.turnPageShowNum = this.params.turnPageShowNum;
      // 可能是增、删、改
      let url = common.carModelOperationUrl;
      console.log(this.params);
      axios.post(url, this.realParams).then((res) => {
        if (res.em === 'Success!') {
          if (this.params.operation != '3') {
            this.$message({
              message: '操作成功!',
              type: 'success',
              duration: 1500,
            });

            // 置空参数
            this.params.carBrand = '';
            this.params.carSeries = '';
            this.params.carModel = '';
            this.params.carModelName = '';
            this.params.operation = '3';
            axios.post(url, this.params).then((res) => {
              if (res.em === 'Success!') {
                this.tableData = res.data.carModelList;
                this.totalCount = parseInt(res.data.turnPageTotalNum);
                this.closeWindow('search');
              }
            });
          } else {
            this.tableData = res.data.carModelList;
            this.totalCount = parseInt(res.data.turnPageTotalNum);
            this.closeWindow('search');
          }
        } else if (res.em.includes('ORA-00001')) {
          // 车型不唯一
          this.$alert('操作失败，输入车型不唯一，请重新输入！', '提示', {
            confirmButtonText: '确定',
          });
        }
      });
    },

    searchCarType() {
      // 当一打开查询框的时候，赋值
      this.params.carBrand = this.crudParams.carBrandSearch;
      this.params.carSeries = this.crudParams.carSeriesSearch;
      this.params.carModel = this.crudParams.carModelSearch;
      this.params.carModelName = this.crudParams.carModelNameSearch;

      this.carModelDisable = false;
      this.showSearchText = '查询车型';
      this.params.operation = '3';
      this.showCarTypeSearch = true;
    },

    addCarTypeInfo() {
      // 当一打开增加框的时候，赋值
      this.params.carBrand = this.crudParams.carBrandAdd;
      this.params.carSeries = this.crudParams.carSeriesAdd;
      this.params.carModel = this.crudParams.carModelAdd;
      this.params.carModelName = this.crudParams.carModelNameAdd;

      this.carModelDisable = false;
      this.showSearchText = '添加车型';
      this.params.operation = '1';
      this.showCarTypeSearch = true;
    },
    handleClick(row) {
      this.carModelDisable = true;
      this.showSearchText = '编辑车型';
      this.params.operation = '2';
      this.showCarTypeSearch = true;
      this.params.carBrand = row.carBrand;
      this.params.carSeries = row.carSeries;
      this.params.carModel = row.carModel;
      this.params.carModelName = row.carModelName;
    },
    handleSizeChange(pageSize) {
      this.currentPage = 1;
      this.params.turnPageBeginPos = 1;
      this.pageSize = pageSize;
      this.params.turnPageShowNum = pageSize;
      this.getCarTypeInfo2();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.params.turnPageBeginPos = (currentPage - 1) * this.pageSize + 1;
      this.getCarTypeInfo2();
    },
  },
};
</script>

<style scoped>
/* .car-management-header {
  width: 100%;
  height: 40px;
  font-size: 32px;
  color: red;
} */
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
.el-form {
  /* margin-top: 20px; */
  padding: 20px;
}
.el-pagination {
  margin-top: 1%;
  display: flex;
  justify-content: flex-end;
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
  width: 40%;
  border-radius: 10px;
}
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
</style>